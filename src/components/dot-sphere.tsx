"use client";

// 3D sphere made of evenly spread dots, drawn with WebGL (OGL).
// - Dots are placed with a Fibonacci spiral (soft swirl pattern).
// - Depth: front dots are bigger and darker, back dots smaller and faint.
// - Spins slowly on its own (the mouse does not rotate it). No auto spin for
//   reduced motion.
// - Hover: the cursor sweeps dots aside like dragging through sand. Each dot
//   has its own small spring simulation (on the CPU), so pushed dots keep a
//   little momentum, curl into a wave, and glide back into the sphere when
//   the cursor moves on.
// - Reveal: on load the dots fade in one by one (random order) while the
//   sphere grows slightly into place.
// - Mobile: some dots take the brand colors (blue / purple / pink); set by
//   ACCENT_QUERY. Desktop stays grey.
// Pauses when off-screen or the tab is hidden.

import { useEffect, useRef } from "react";
import { Camera, Geometry, Mesh, Program, Renderer, Transform } from "ogl";
import { cn } from "@/lib/utils";

const DOTS = 4500; // fewer dots = more space between them
const DOT_SIZE = 2.2; // px when the canvas is 720px
const COLOR: [number, number, number] = [0.3, 0.33, 0.4]; // slate grey
const SPIN_SPEED = 0.08; // slow auto spin, radians per second
// Brand-colored dots, shown only when this media query matches (mobile).
const ACCENT_QUERY = "(max-width: 1023px)";
const ACCENT_SHARE = 0.22; // share of dots that get a brand color
const ACCENTS: [number, number, number][] = [
  [0.25, 0.37, 0.71], // blue   #3f5fb5
  [0.49, 0.36, 0.94], // purple #7c5cf0
  [0.86, 0.37, 0.66], // pink   #db5fa8
];

const REVEAL_DELAY = 0.4; // seconds before the reveal starts
const REVEAL_TIME = 1.8; // seconds the reveal takes

// Sweep simulation (screen units: 1 = half the canvas height)
const PUSH_RADIUS = 0.22; // how far around the cursor dots get pushed
const PUSH = 9; // push strength away from the cursor
const DRAG = 1.2; // how much dots are carried along with the mouse movement
const SPRING = 28; // pull back to the sphere (higher = snaps back faster)
const DAMPING = 9.5; // friction (lower = more wave/overshoot)

/** Even points on a unit sphere (Fibonacci / golden-angle spiral). */
function fibonacciSphere(count: number) {
  const positions = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (2 * (i + 0.5)) / count; // 1 .. -1
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    positions.set([Math.cos(theta) * r, y, Math.sin(theta) * r], i * 3);
  }
  return positions;
}

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec2 offset;  // screen-space push from the simulation
  attribute float seed;   // per-dot random 0..1 (reveal order)
  attribute vec3 tint;    // per-dot color (brand color, or the base grey)
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uSize;
  uniform float uAspect;
  uniform float uReveal;  // 0 = hidden, 1 = fully shown
  varying float vFacing;
  varying float vMoved;
  varying float vShow;
  varying vec3 vTint;

  void main() {
    vTint = tint;
    vec3 view = (modelViewMatrix * vec4(position, 1.0)).xyz;
    vec3 center = (modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
    // 1 = facing the camera, 0 = on the edge, -1 = back side.
    vFacing = normalize(view - center).z;

    // Reveal: each dot fades in at its own moment; the sphere grows into place.
    float t = clamp((uReveal * 1.6 - seed * 0.6), 0.0, 1.0);
    vShow = t * t * (3.0 - 2.0 * t);
    float grow = 1.0 - (1.0 - uReveal) * (1.0 - uReveal);
    view = center + (view - center) * mix(0.82, 1.0, grow);

    vec4 clip = projectionMatrix * vec4(view, 1.0);
    clip.xy += offset / vec2(uAspect, 1.0) * clip.w;
    gl_Position = clip;

    vMoved = clamp(length(offset) * 4.0, 0.0, 1.0);
    // Depth: front dots bigger, back dots smaller.
    gl_PointSize = uSize * mix(0.45, 1.15, vFacing * 0.5 + 0.5);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform vec3 uColor;
  uniform float uAccent;  // 1 = show brand-colored dots
  varying float vFacing;
  varying float vMoved;
  varying float vShow;
  varying vec3 vTint;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float circle = smoothstep(0.5, 0.3, d);
    float front = smoothstep(-0.7, 0.7, vFacing);
    // Swept dots show clearly even if they came from the back side.
    // Back dots: very light and faint.
    float alpha = circle * min(mix(0.05, 0.95, front) + 0.5 * vMoved, 1.0);
    vec3 base = mix(uColor, vTint, uAccent);
    vec3 color = mix(base, vec3(0.85, 0.87, 0.91), (1.0 - max(front, vMoved)) * 0.8);
    alpha *= vShow;
    gl_FragColor = vec4(color * alpha, alpha);
  }
`;

export function DotSphere({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const renderer = new Renderer({
      dpr,
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    container.appendChild(gl.canvas);

    const FOV = 30;
    const camera = new Camera(gl, { fov: FOV });
    camera.position.z = 5.4; // extra room around the sphere for swept dots
    const focal = 1 / Math.tan((FOV * Math.PI) / 360);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uSize: { value: DOT_SIZE },
        uColor: { value: COLOR },
        uAspect: { value: 1 },
        uReveal: { value: 0 },
        uAccent: { value: 0 },
      },
      transparent: true,
      depthTest: false, // back dots should show through
    });
    program.setBlendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    // Per-dot simulation state (screen units).
    const positions = fibonacciSphere(DOTS);
    const offsets = new Float32Array(DOTS * 2);
    const velocity = new Float32Array(DOTS * 2);

    const scene = new Transform();
    const tilt = new Transform();
    tilt.setParent(scene);
    // Per-dot color: a brand color for some dots, the base grey for the rest.
    const tints = new Float32Array(DOTS * 3);
    for (let i = 0; i < DOTS; i++) {
      const color =
        Math.random() < ACCENT_SHARE
          ? ACCENTS[Math.floor(Math.random() * ACCENTS.length)]
          : COLOR;
      tints.set(color, i * 3);
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      offset: { size: 2, data: offsets },
      seed: { size: 1, data: Float32Array.from({ length: DOTS }, Math.random) },
      tint: { size: 3, data: tints },
    });
    const sphere = new Mesh(gl, { mode: gl.POINTS, geometry, program });
    sphere.rotation.x = 0.35; // keep the spiral poles off center
    sphere.setParent(tilt);

    const render = () => renderer.render({ scene, camera });

    let aspect = 1;
    const resize = () => {
      const { clientWidth, clientHeight } = container;
      aspect = clientWidth / clientHeight;
      renderer.setSize(clientWidth, clientHeight);
      camera.perspective({ aspect });
      program.uniforms.uAspect.value = aspect;
      program.uniforms.uSize.value =
        DOT_SIZE * (Math.min(clientWidth, clientHeight) / 720) * dpr;
      render();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    // Brand colors only on small screens.
    const accentMedia = window.matchMedia(ACCENT_QUERY);
    const applyAccent = () => {
      program.uniforms.uAccent.value = accentMedia.matches ? 1 : 0;
    };
    applyAccent();
    accentMedia.addEventListener("change", applyAccent);

    // --- Mouse -------------------------------------------------------------
    // Mouse in screen units (x scaled by aspect so distances are round).
    const mouse = { x: 0, y: 0 };
    const mouseVel = { x: 0, y: 0 };
    let hovering = false;
    let hover = 0; // eased 0..1

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (((e.clientX - rect.left) / rect.width) * 2 - 1) * aspect;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      if (hovering) {
        mouseVel.x += x - mouse.x;
        mouseVel.y += y - mouse.y;
      }
      mouse.x = x;
      mouse.y = y;
      hovering = true;
    };
    const onPointerLeave = () => {
      hovering = false;
    };
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);

    // --- Simulation --------------------------------------------------------
    const step = (dt: number) => {
      scene.updateMatrixWorld();
      const m = sphere.worldMatrix;
      const camZ = camera.position.z;
      const r2 = PUSH_RADIUS * PUSH_RADIUS;
      // Mouse movement this frame -> per-second velocity.
      const mvx = dt > 0 ? mouseVel.x / dt : 0;
      const mvy = dt > 0 ? mouseVel.y / dt : 0;
      mouseVel.x = 0;
      mouseVel.y = 0;
      let moving = hover > 0.001;

      for (let i = 0; i < DOTS; i++) {
        const px = positions[i * 3];
        const py = positions[i * 3 + 1];
        const pz = positions[i * 3 + 2];
        // Rest position on screen (same projection as the camera).
        const wx = m[0] * px + m[4] * py + m[8] * pz + m[12];
        const wy = m[1] * px + m[5] * py + m[9] * pz + m[13];
        const wz = m[2] * px + m[6] * py + m[10] * pz + m[14];
        const depth = camZ - wz;
        const sx = (wx / depth) * focal; // already aspect-scaled units
        const sy = (wy / depth) * focal;

        const o = i * 2;
        let fx = -SPRING * offsets[o] - DAMPING * velocity[o];
        let fy = -SPRING * offsets[o + 1] - DAMPING * velocity[o + 1];

        if (hover > 0.001) {
          // Distance from the cursor to where the dot is now.
          const dx = sx + offsets[o] - mouse.x;
          const dy = sy + offsets[o + 1] - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < r2) {
            const d = Math.sqrt(d2) || 0.0001;
            const fall = 1 - d2 / r2;
            const k = fall * fall * hover;
            fx += (dx / d) * PUSH * k + mvx * DRAG * k;
            fy += (dy / d) * PUSH * k + mvy * DRAG * k;
          }
        }

        velocity[o] += fx * dt;
        velocity[o + 1] += fy * dt;
        offsets[o] += velocity[o] * dt;
        offsets[o + 1] += velocity[o + 1] * dt;
        if (
          !moving &&
          (Math.abs(offsets[o]) > 1e-4 || Math.abs(velocity[o]) > 1e-4)
        )
          moving = true;
      }
      geometry.attributes.offset.needsUpdate = true;
      return moving;
    };

    // --- Animation loop ----------------------------------------------------
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame = 0;
    let last = 0;
    let visible = true;
    let revealStart: number | null = null;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min((now - (last || now)) / 1000, 1 / 30);
      last = now;

      // Push strength fades in and out smoothly.
      const target = hovering ? 1 : 0;
      hover += (target - hover) * (1 - Math.pow(0.02, dt));

      // Reveal on load (eased in the shader).
      if (revealStart === null) revealStart = now;
      const r = (now - revealStart) / 1000 - REVEAL_DELAY;
      program.uniforms.uReveal.value = reduceMotion
        ? 1
        : Math.min(Math.max(r / REVEAL_TIME, 0), 1);

      // Slow auto spin only.
      if (!reduceMotion) sphere.rotation.y += SPIN_SPEED * dt;

      step(dt);
      render();
    };
    const play = () => {
      if (!frame && visible && !document.hidden) {
        last = 0;
        frame = requestAnimationFrame(tick);
      }
    };
    const pause = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else pause();
    });
    intersection.observe(container);
    const onVisibilityChange = () => (document.hidden ? pause() : play());
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      pause();
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      accentMedia.removeEventListener("change", applyAccent);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <div ref={containerRef} aria-hidden className={cn(className)} />;
}
