"use client";

// Silk ribbons in the Threadstack brand colors, drawn with WebGL (OGL).
// A few soft, glossy bands flow diagonally and sway slowly; fine lines along
// each band give the silk texture, and a light streak gives the sheen.
// The canvas is transparent and fades out toward the left edge, so it can sit
// on the right side of a section. Pauses when off-screen or the tab is
// hidden; one still frame for reduced motion.

import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";
import { cn } from "@/lib/utils";

const SPEED = 0.35;

/** Ribbon colors, from the logo: bright blue -> royal blue -> violet. */
const COLORS = ["#0A84FF", "#2F5BFF", "#5B3BF0", "#7B61FF"];

const rgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

const vertex = /* glsl */ `
  attribute vec2 position;
  void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragment = /* glsl */ `
  precision highp float;

  uniform vec2 uResolution;
  uniform float uTime;
  uniform vec3 uColors[4];

  // One ribbon: returns premultiplied color + alpha at point p.
  vec4 ribbon(vec2 p, float base, float amp, float freq, float speed,
              float phase, float width, vec3 col, vec3 col2) {
    float t = uTime * speed;
    float center = base
      + amp * sin(p.x * freq + t + phase)
      + amp * 0.35 * sin(p.x * freq * 2.3 - t * 1.3 + phase * 1.7);
    // Width breathes along the ribbon, like cloth folding.
    float w = width * (0.75 + 0.35 * sin(p.x * freq * 0.7 + t * 0.6 + phase));
    float d = (p.y - center) / w;
    float body = exp(-d * d * 1.6);

    // Color across the ribbon, a soft sheen near the top edge and fine silk
    // threads running along it.
    vec3 c = mix(col, col2, smoothstep(-1.2, 1.2, d));
    float sheen = exp(-pow((d + 0.35) * 3.2, 2.0));
    c = mix(c, vec3(1.0), 0.45 * sheen);
    c *= 0.94 + 0.06 * sin(d * 42.0 + p.x * 3.0);

    float a = body * 0.85;
    return vec4(c * a, a);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);

    // Flow diagonally: rotate the space a little.
    float ang = -0.45;
    p = mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * p;

    vec4 acc = vec4(0.0);
    vec4 r;
    // Back to front; "over" blending with premultiplied colors.
    r = ribbon(p,  0.22, 0.10, 2.2, 0.9, 0.0, 0.11, uColors[3], uColors[2]);
    acc = r + acc * (1.0 - r.a);
    r = ribbon(p,  0.02, 0.13, 1.8, 0.7, 1.9, 0.15, uColors[0], uColors[1]);
    acc = r + acc * (1.0 - r.a);
    r = ribbon(p, -0.16, 0.11, 2.6, 1.1, 3.4, 0.10, uColors[1], uColors[2]);
    acc = r + acc * (1.0 - r.a);
    r = ribbon(p, -0.34, 0.09, 2.0, 0.8, 5.1, 0.08, uColors[2], uColors[0]);
    acc = r + acc * (1.0 - r.a);

    // Fade out toward the left and the top/bottom edges.
    float fade = smoothstep(0.05, 0.6, uv.x)
      * smoothstep(0.0, 0.12, uv.y) * smoothstep(1.0, 0.88, uv.y);
    gl_FragColor = acc * fade;
  }
`;

export function SilkWaves({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 1.5),
      alpha: true,
      premultipliedAlpha: true,
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    container.appendChild(gl.canvas);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uResolution: { value: [1, 1] },
        uTime: { value: 0 },
        uColors: { value: COLORS.flatMap(rgb) },
      },
      transparent: true,
      depthTest: false,
    });
    program.setBlendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    const render = () => renderer.render({ scene: mesh });

    const resize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      program.uniforms.uResolution.value = [
        gl.drawingBufferWidth,
        gl.drawingBufferHeight,
      ];
      render();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    // Animation loop: paused when off-screen, tab hidden, or reduced motion.
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame = 0;
    let visible = true;
    const start = performance.now();
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      program.uniforms.uTime.value = ((now - start) / 1000) * SPEED;
      render();
    };
    const play = () => {
      if (!frame && visible && !document.hidden && !reduceMotion) {
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
      container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn("pointer-events-none", className)}
    />
  );
}
