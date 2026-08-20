"use client";

import { useEffect, useRef } from "react";

/** Couple's photo behind the particles. Replace with the real one: drop it in
 *  /public (e.g. /public/cover.jpg) and set COVER_PHOTO = "/cover.jpg". */
const COVER_PHOTO = "/cover.jpeg";

const CHAPTERS = [
  "Our Story",
  "Details",
  "Registry",
  "RSVP",
  "Gallery",
  "FAQ",
  "Trivia",
];

/**
 * PROTOTYPE — "Gold Dust" cover.
 * A field of gold particles on deep navy that morphs between K & S → the
 * anchor → the date, with cursor parallax. three.js is loaded lazily; a
 * static fallback is shown for prefers-reduced-motion / no WebGL.
 */
export default function GoldDust() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let raf = 0;
    let disposed = false;
    let cleanup: () => void = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const width = () => mount.clientWidth;
      const height = () => mount.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        60,
        width() / height(),
        0.1,
        100,
      );
      camera.position.z = 15;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        return; // no WebGL — the static fallback beneath stays visible
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width(), height());
      mount.appendChild(renderer.domElement);
      renderer.domElement.style.display = "block";

      const N = 8000;

      /* ---- build morph targets by sampling shapes into point clouds ---- */
      function sample(draw: (ctx: CanvasRenderingContext2D) => void): Float32Array {
        const CW = 512;
        const CH = 256;
        const c = document.createElement("canvas");
        c.width = CW;
        c.height = CH;
        const ctx = c.getContext("2d")!;
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, CW, CH);
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "#fff";
        draw(ctx);
        const data = ctx.getImageData(0, 0, CW, CH).data;
        const pts: [number, number][] = [];
        for (let y = 0; y < CH; y += 2) {
          for (let x = 0; x < CW; x += 2) {
            if (data[(y * CW + x) * 4] > 128) pts.push([x, y]);
          }
        }
        const spread = 15;
        const out = new Float32Array(N * 3);
        for (let i = 0; i < N; i++) {
          const p = pts.length
            ? pts[(Math.random() * pts.length) | 0]
            : [CW / 2, CH / 2];
          out[i * 3] = ((p[0] - CW / 2) / CW) * spread;
          out[i * 3 + 1] = -((p[1] - CH / 2) / CH) * (spread * (CH / CW));
          out[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
        }
        return out;
      }

      const textTarget = (text: string, font: string) =>
        sample((ctx) => {
          ctx.font = font;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(text, 256, 132);
        });

      const anchorTarget = () =>
        sample((ctx) => {
          ctx.save();
          ctx.translate(256, 128);
          const s = 78;
          ctx.lineWidth = 15;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.beginPath();
          ctx.arc(0, -s * 0.92, s * 0.17, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(0, -s * 0.72);
          ctx.lineTo(0, s * 0.9);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(-s * 0.42, -s * 0.5);
          ctx.lineTo(s * 0.42, -s * 0.5);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(0, s * 0.15, s * 0.72, Math.PI * 0.12, Math.PI * 0.88, false);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(-s * 0.68, s * 0.4);
          ctx.lineTo(-s * 0.9, s * 0.16);
          ctx.moveTo(-s * 0.68, s * 0.4);
          ctx.lineTo(-s * 0.5, s * 0.64);
          ctx.moveTo(s * 0.68, s * 0.4);
          ctx.lineTo(s * 0.9, s * 0.16);
          ctx.moveTo(s * 0.68, s * 0.4);
          ctx.lineTo(s * 0.5, s * 0.64);
          ctx.stroke();
          ctx.restore();
        });

      const targets = [
        textTarget("K & S", "bold 150px Georgia, serif"),
        anchorTarget(),
        textTarget("21 · 11 · 2026", "bold 66px Georgia, serif"),
      ];

      /* ---- particle system ---- */
      const positions = Float32Array.from(targets[0]);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );

      // soft round gold sprite
      const sprite = document.createElement("canvas");
      sprite.width = sprite.height = 64;
      const sctx = sprite.getContext("2d")!;
      const grad = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255,236,180,1)");
      grad.addColorStop(0.4, "rgba(224,189,99,0.85)");
      grad.addColorStop(1, "rgba(224,189,99,0)");
      sctx.fillStyle = grad;
      sctx.fillRect(0, 0, 64, 64);
      const texture = new THREE.CanvasTexture(sprite);

      const material = new THREE.PointsMaterial({
        size: 0.17,
        map: texture,
        color: 0xe7c766,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      const points = new THREE.Points(geometry, material);
      points.position.y = -0.8; // sit the gold over the darker mid band (his blazer)
      scene.add(points);

      /* ---- interaction + animation ---- */
      let mouseX = 0;
      let mouseY = 0;
      const onMove = (e: PointerEvent) => {
        mouseX = (e.clientX / width()) * 2 - 1;
        mouseY = (e.clientY / height()) * 2 - 1;
      };
      window.addEventListener("pointermove", onMove);

      const onResize = () => {
        camera.aspect = width() / height();
        camera.updateProjectionMatrix();
        renderer.setSize(width(), height());
      };
      window.addEventListener("resize", onResize);

      const posAttr = geometry.attributes.position as import("three").BufferAttribute;

      if (reduce) {
        renderer.render(scene, camera);
      } else {
        let stage = 0;
        let last = performance.now();
        let acc = 0;
        const HOLD = 3600; // ms per shape

        const tick = (now: number) => {
          if (disposed) return;
          const dt = now - last;
          last = now;
          acc += dt;
          if (acc > HOLD) {
            acc = 0;
            stage = (stage + 1) % targets.length;
          }
          const tgt = targets[stage];
          const arr = posAttr.array as Float32Array;
          const t = now * 0.001;
          for (let i = 0; i < N; i++) {
            const ix = i * 3;
            arr[ix] += (tgt[ix] - arr[ix]) * 0.06;
            arr[ix + 1] += (tgt[ix + 1] - arr[ix + 1]) * 0.06;
            arr[ix + 2] += (tgt[ix + 2] - arr[ix + 2]) * 0.06;
            arr[ix + 2] += Math.sin(t * 1.4 + i * 0.35) * 0.0018;
          }
          posAttr.needsUpdate = true;

          // gentle parallax
          points.rotation.y += (mouseX * 0.35 - points.rotation.y) * 0.05;
          points.rotation.x += (mouseY * 0.2 - points.rotation.x) * 0.05;

          renderer.render(scene, camera);
          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      }

      cleanup = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("resize", onResize);
        geometry.dispose();
        material.dispose();
        texture.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      cleanup();
    };
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0b] text-paper">
      {/* couple's photo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${COVER_PHOTO})` }}
        aria-hidden
      />
      {/* neutral darken — keeps the photo black & white, just deeper */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.30)" }}
        aria-hidden
      />
      {/* vignette — darkens the edges (neutral) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 95% at 50% 38%, transparent 30%, rgba(0,0,0,0.72) 100%)",
        }}
        aria-hidden
      />
      {/* legibility gradient — faces readable up top, darker band where the gold sits */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.08) 32%, rgba(0,0,0,0.68) 64%, rgba(0,0,0,0.95) 100%)",
        }}
        aria-hidden
      />

      {/* three.js particles mount over the photo (transparent canvas) */}
      <div ref={mountRef} className="absolute inset-0" aria-hidden />

      {/* static fallback / accessible content underneath the canvas */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <h1 className="sr-only">Kwabena &amp; Sandra — 21 November 2026</h1>
      </div>

      {/* minimal overlay chrome */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-6 py-6 md:px-10">
        <span className="font-display text-lg tracking-[0.32em] text-[#e7c766]/90">
          K &amp; S
        </span>
        <span className="font-sans text-eyebrow uppercase tracking-[0.4em] text-paper/60">
          Menu
        </span>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-5 px-6 pb-8">
        <p className="font-sans text-eyebrow uppercase tracking-[0.4em] text-[#e7c766]/85">
          Anchored in Grace
        </p>

        {/* dotted chapter row — what's inside */}
        <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 font-sans text-[0.62rem] uppercase tracking-[0.28em] text-paper/65">
          {CHAPTERS.map((c, i) => (
            <span key={c} className="flex items-center gap-3">
              <span>{c}</span>
              {i < CHAPTERS.length - 1 ? (
                <span aria-hidden className="text-[#e7c766]/55">
                  ·
                </span>
              ) : null}
            </span>
          ))}
        </nav>

        {/* Contents button — the way in */}
        <span className="inline-flex items-center gap-3 border border-paper/45 px-8 py-3 font-sans text-eyebrow uppercase tracking-[0.35em] text-paper/90">
          Contents <span className="text-[#e7c766]">&rarr;</span>
        </span>
      </div>
    </main>
  );
}
