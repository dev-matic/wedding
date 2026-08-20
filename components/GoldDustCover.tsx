"use client";

import { useEffect, useRef } from "react";
import { couple } from "@/lib/content";

/** Couple's photo behind the particles (black & white). */
const COVER_PHOTO = "/cover.jpeg";

/** In-page section links (one-page scroll). */
const NAV = [
  { label: "Our Story", href: "#story" },
  { label: "The Wedding", href: "#details" },
  { label: "Gallery", href: "#gallery" },
  { label: "RSVP", href: "#rsvp" },
];

/**
 * The cover / hero — gold particles over the couple's black & white photo,
 * morphing between the monogram, the anchor and the date. three.js is loaded
 * lazily; a static frame is shown for prefers-reduced-motion / no WebGL. The
 * particle field scales to fit the viewport, so it reads on phones too.
 */
export default function GoldDustCover() {
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
      const W = () => mount.clientWidth;
      const H = () => mount.clientHeight;
      const isMobile = Math.min(window.innerWidth, window.innerHeight) < 640;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, W() / H(), 0.1, 100);
      camera.position.z = 15;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W(), H());
      mount.appendChild(renderer.domElement);
      renderer.domElement.style.display = "block";

      const N = isMobile ? 4500 : 8000;

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
        const spread = 18;
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
          const s = 84;
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

      const initials = `${couple.partnerA[0]} & ${couple.partnerB[0]}`;
      const [y, m, d] = couple.weddingDate.slice(0, 10).split("-");
      const dateStr = `${d} · ${m} · ${y}`;

      const targets = [
        textTarget(initials, "bold 150px Georgia, serif"),
        anchorTarget(),
        textTarget(dateStr, "bold 62px Georgia, serif"),
      ];

      const positions = Float32Array.from(targets[0]);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );

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
        size: isMobile ? 0.14 : 0.17,
        map: texture,
        color: 0xe7c766,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      const points = new THREE.Points(geometry, material);
      points.position.y = -0.8;
      scene.add(points);

      const fit = () => {
        const vFOV = (camera.fov * Math.PI) / 180;
        const visH = 2 * Math.tan(vFOV / 2) * camera.position.z;
        const visW = visH * camera.aspect;
        return Math.min(1, (visW * 0.82) / 15);
      };
      points.scale.setScalar(fit());

      let mx = 0;
      let my = 0;
      const onMove = (e: PointerEvent) => {
        mx = (e.clientX / W()) * 2 - 1;
        my = (e.clientY / H()) * 2 - 1;
      };
      window.addEventListener("pointermove", onMove);
      const onResize = () => {
        camera.aspect = W() / H();
        camera.updateProjectionMatrix();
        renderer.setSize(W(), H());
        points.scale.setScalar(fit());
      };
      window.addEventListener("resize", onResize);

      const posAttr = geometry.attributes.position as import("three").BufferAttribute;

      if (reduce) {
        renderer.render(scene, camera);
      } else {
        let stage = 0;
        let last = performance.now();
        let acc = 0;
        const HOLD = 3600;
        const tick = (now: number) => {
          if (disposed) return;
          acc += now - last;
          last = now;
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
          points.rotation.y += (mx * 0.35 - points.rotation.y) * 0.05;
          points.rotation.x += (my * 0.2 - points.rotation.x) * 0.05;
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
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0b] text-paper"
    >
      {/* couple's photo (black & white) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${COVER_PHOTO})` }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.30)" }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 95% at 50% 38%, transparent 30%, rgba(0,0,0,0.72) 100%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.08) 32%, rgba(0,0,0,0.68) 64%, rgba(0,0,0,0.95) 100%)",
        }}
        aria-hidden
      />

      {/* particles */}
      <div ref={mountRef} className="absolute inset-0" aria-hidden />

      <h1 className="sr-only">
        {couple.names} — {couple.weddingDay.date} {couple.weddingDay.year}.{" "}
        {couple.theme}.
      </h1>

      {/* monogram */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center px-5 py-5 md:px-10 md:py-6">
        <span className="font-display text-lg tracking-[0.3em] text-[#e7c766]/90">
          {couple.partnerA[0]} &amp; {couple.partnerB[0]}
        </span>
      </div>

      {/* bottom navigation — the sections */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 px-5 pb-7 md:gap-5 md:pb-9">
        <p className="font-sans text-eyebrow uppercase tracking-[0.4em] text-[#e7c766]/85">
          {couple.theme}
        </p>

        <nav className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 font-sans text-[0.6rem] uppercase tracking-[0.24em] text-paper/70 sm:gap-x-3 sm:text-[0.62rem] sm:tracking-[0.28em]">
          {NAV.map((c, i) => (
            <span key={c.href} className="flex items-center gap-2.5 sm:gap-3">
              <a
                href={c.href}
                className="pointer-events-auto transition-colors hover:text-[#e7c766]"
              >
                {c.label}
              </a>
              {i < NAV.length - 1 ? (
                <span aria-hidden className="text-[#e7c766]/55">
                  ·
                </span>
              ) : null}
            </span>
          ))}
        </nav>

        <a
          href="#story"
          aria-label="Scroll to explore"
          className="pointer-events-auto mt-1 animate-bounce text-[#e7c766]/80"
        >
          ↓
        </a>
      </div>
    </section>
  );
}
