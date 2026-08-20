"use client";

import { useEffect, useRef, useState } from "react";

const CHAPTERS = [
  ["01", "Our Story"],
  ["02", "Details"],
  ["03", "Registry"],
  ["04", "RSVP"],
  ["05", "Gallery"],
  ["06", "FAQ"],
  ["07", "Trivia"],
];

/**
 * PROTOTYPE — "Anchored Sea" cover.
 * A three.js golden sea with a bobbing anchor buoy and cursor ripples, plus
 * an on-cover Contents index. three.js is loaded lazily; a static fallback is
 * shown for prefers-reduced-motion / no WebGL.
 */
export default function AnchoredSea() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [contentsOpen, setContentsOpen] = useState(false);

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

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x0b1f2e, 12, 36);

      const camera = new THREE.PerspectiveCamera(55, W() / H(), 0.1, 100);
      camera.position.set(0, 3.2, 7.5);
      camera.lookAt(0, 0.3, 0);

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

      /* ---- the sea: a displaced plane with a custom gold-crest shader ---- */
      const uniforms = {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(999, 999) },
      };
      const seaGeo = new THREE.PlaneGeometry(60, 48, 200, 160);
      const seaMat = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: `
          uniform float uTime;
          uniform vec2 uMouse;
          varying float vH;
          float waves(vec2 p){
            float h = 0.0;
            h += sin(p.x*0.5 + uTime*0.9) * 0.34;
            h += sin(p.y*0.7 - uTime*1.05) * 0.26;
            h += sin((p.x+p.y)*0.35 + uTime*0.6) * 0.20;
            float d = distance(p, uMouse);
            h += sin(d*2.2 - uTime*3.2) * exp(-d*0.55) * 0.6;
            return h;
          }
          void main(){
            vec3 pos = position;
            float h = waves(pos.xy);
            pos.z += h;
            vH = h;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          varying float vH;
          void main(){
            vec3 deep = vec3(0.035, 0.105, 0.16);
            vec3 mid  = vec3(0.07, 0.20, 0.28);
            vec3 gold = vec3(0.91, 0.78, 0.40);
            float crest = smoothstep(0.12, 0.6, vH);
            vec3 col = mix(mix(deep, mid, 0.5), gold, crest*0.75);
            col += gold * pow(crest, 3.0) * 0.5;
            gl_FragColor = vec4(col, 1.0);
          }
        `,
      });
      const sea = new THREE.Mesh(seaGeo, seaMat);
      sea.rotation.x = -Math.PI / 2;
      scene.add(sea);

      /* ---- the golden anchor buoy ---- */
      scene.add(new THREE.AmbientLight(0x9fb4c8, 0.7));
      const key = new THREE.DirectionalLight(0xffffff, 1.1);
      key.position.set(3, 6, 4);
      scene.add(key);

      const gold = new THREE.MeshStandardMaterial({
        color: 0xe7c766,
        metalness: 0.85,
        roughness: 0.25,
      });
      const anchor = new THREE.Group();
      const shank = new THREE.Mesh(
        new THREE.CylinderGeometry(0.07, 0.07, 2.2, 20),
        gold,
      );
      shank.position.y = 0.1;
      anchor.add(shank);
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.2, 0.05, 16, 32),
        gold,
      );
      ring.position.y = 1.3;
      anchor.add(ring);
      const stock = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 1.1, 16),
        gold,
      );
      stock.rotation.z = Math.PI / 2;
      stock.position.y = 0.75;
      anchor.add(stock);
      const arc = new THREE.Mesh(
        new THREE.TorusGeometry(0.85, 0.09, 16, 48, Math.PI),
        gold,
      );
      arc.rotation.z = Math.PI;
      arc.position.y = -1.0;
      anchor.add(arc);
      const flukeGeo = new THREE.ConeGeometry(0.17, 0.42, 16);
      const f1 = new THREE.Mesh(flukeGeo, gold);
      f1.position.set(-0.85, -1.0, 0);
      f1.rotation.z = -Math.PI / 4;
      anchor.add(f1);
      const f2 = new THREE.Mesh(flukeGeo, gold);
      f2.position.set(0.85, -1.0, 0);
      f2.rotation.z = Math.PI / 4;
      anchor.add(f2);
      anchor.scale.setScalar(1.15);
      scene.add(anchor);

      /* ---- interaction ---- */
      let mx = 0;
      let my = 0;
      const onMove = (e: PointerEvent) => {
        const nx = (e.clientX / W()) * 2 - 1;
        const ny = (e.clientY / H()) * 2 - 1;
        mx = nx;
        my = ny;
        uniforms.uMouse.value.set(nx * 24, -ny * 12 + 6);
      };
      window.addEventListener("pointermove", onMove);
      const onResize = () => {
        camera.aspect = W() / H();
        camera.updateProjectionMatrix();
        renderer.setSize(W(), H());
      };
      window.addEventListener("resize", onResize);

      const start = performance.now();
      const render = (now: number) => {
        const t = (now - start) * 0.001;
        uniforms.uTime.value = t;
        anchor.position.y = 0.5 + Math.sin(t * 1.1) * 0.22;
        anchor.rotation.z = Math.sin(t * 0.7) * 0.09;
        anchor.rotation.y = t * 0.25;
        camera.position.x += (mx * 1.2 - camera.position.x) * 0.04;
        camera.position.y += (3.2 - my * 0.6 - camera.position.y) * 0.04;
        camera.lookAt(0, 0.4, 0);
        renderer.render(scene, camera);
        if (!reduce && !disposed) raf = requestAnimationFrame(render);
      };
      raf = requestAnimationFrame(render);

      cleanup = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("resize", onResize);
        seaGeo.dispose();
        seaMat.dispose();
        gold.dispose();
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
    <main
      className="relative min-h-screen w-full overflow-hidden text-paper"
      style={{
        background:
          "radial-gradient(120% 90% at 50% -10%, #16394f 0%, #0b1f2e 55%, #071722 100%)",
      }}
    >
      <div ref={mountRef} className="absolute inset-0" aria-hidden />

      {/* top chrome */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-6 py-6 md:px-10">
        <span className="font-display text-lg tracking-[0.32em] text-[#e7c766]/90">
          K &amp; S
        </span>
        <span className="font-sans text-eyebrow uppercase tracking-[0.4em] text-paper/60">
          Menu
        </span>
      </div>

      {/* masthead */}
      <div className="pointer-events-none absolute inset-x-0 top-[16%] flex flex-col items-center text-center">
        <p className="font-sans text-eyebrow uppercase tracking-[0.42em] text-paper/70">
          The Wedding of
        </p>
        <h1 className="mt-4 font-display text-6xl font-medium leading-[0.95] text-paper md:text-8xl">
          Kwabena
          <span className="mx-3 italic text-[#e7c766]">&amp;</span>
          Sandra
        </h1>
        <p className="mt-5 font-serif text-2xl italic text-[#e7c766] md:text-3xl">
          Anchored in Grace
        </p>
        <p className="mt-4 font-sans text-eyebrow uppercase tracking-[0.4em] text-paper/70">
          21 November 2026 &nbsp;·&nbsp; Accra · London
        </p>
      </div>

      {/* Contents index — a real, tappable way in, right on the cover */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-9">
        <button
          type="button"
          onClick={() => setContentsOpen((v) => !v)}
          className="pointer-events-auto flex items-center gap-3 font-sans text-eyebrow uppercase tracking-[0.4em] text-paper/85 transition-colors hover:text-[#e7c766]"
          aria-expanded={contentsOpen}
        >
          Contents
          <span
            className={`inline-block transition-transform ${contentsOpen ? "rotate-180" : ""}`}
            aria-hidden
          >
            ⌄
          </span>
        </button>

        <div
          className={`grid overflow-hidden transition-all duration-500 ${
            contentsOpen ? "mt-6 max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {CHAPTERS.map(([n, label]) => (
              <li key={n} className="flex items-baseline gap-2">
                <span className="font-sans text-[0.62rem] tracking-widest text-[#e7c766]/70">
                  {n}
                </span>
                <span className="font-display text-xl text-paper">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
