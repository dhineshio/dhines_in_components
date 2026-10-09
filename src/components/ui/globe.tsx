"use client";

// 3D globe with dotted countries and animated arcs. Based on Aceternity UI's
// "GitHub Globe" (three.js + three-globe + react-three-fiber), tidied for
// React 19 and strict TypeScript.

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Color,
  Fog,
  type Group,
  PerspectiveCamera,
  Scene,
  Vector3,
} from "three";
import ThreeGlobe from "three-globe";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";

const RING_PROPAGATION_SPEED = 3;
const ASPECT = 1.2;
const CAMERA_Z = 300;

export type GlobeArc = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  /** Wait between two passes of an arc, in arc lengths (smaller = more often). */
  arcGap?: number;
  rings?: number;
  maxRings?: number;
  autoRotateSpeed?: number;
};

type WorldProps = { globeConfig: GlobeConfig; data: GlobeArc[] };

function GlobeMesh({ globeConfig, data }: WorldProps) {
  const groupRef = useRef<Group | null>(null);
  const globeRef = useRef<ThreeGlobe | null>(null);
  const [ready, setReady] = useState(false);

  const cfg = useMemo(
    () => ({
      pointSize: 1,
      atmosphereColor: "#ffffff",
      showAtmosphere: true,
      atmosphereAltitude: 0.1,
      polygonColor: "rgba(255,255,255,0.7)",
      globeColor: "#1d072e",
      emissive: "#000000",
      emissiveIntensity: 0.1,
      shininess: 0.9,
      arcTime: 2000,
      arcLength: 0.9,
      arcGap: 15,
      rings: 1,
      maxRings: 3,
      ...globeConfig,
    }),
    [globeConfig],
  );

  // Create the globe once.
  useEffect(() => {
    if (globeRef.current || !groupRef.current) return;
    globeRef.current = new ThreeGlobe();
    groupRef.current.add(globeRef.current);
    setReady(true);
  }, []);

  // Material.
  useEffect(() => {
    if (!globeRef.current || !ready) return;
    const material = globeRef.current.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };
    material.color = new Color(cfg.globeColor);
    material.emissive = new Color(cfg.emissive);
    material.emissiveIntensity = cfg.emissiveIntensity;
    material.shininess = cfg.shininess;
  }, [ready, cfg]);

  // Countries, arcs, points and rings.
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe || !ready) return;

    // Arc end points, without duplicates.
    const seen = new Set<string>();
    const points = data
      .flatMap((arc) => [
        { lat: arc.startLat, lng: arc.startLng, color: arc.color },
        { lat: arc.endLat, lng: arc.endLng, color: arc.color },
      ])
      .filter((p) => {
        const key = `${p.lat},${p.lng}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

    globe
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(cfg.showAtmosphere)
      .atmosphereColor(cfg.atmosphereColor)
      .atmosphereAltitude(cfg.atmosphereAltitude)
      .hexPolygonColor(() => cfg.polygonColor);

    globe
      .arcsData(data)
      .arcStartLat((d) => (d as GlobeArc).startLat)
      .arcStartLng((d) => (d as GlobeArc).startLng)
      .arcEndLat((d) => (d as GlobeArc).endLat)
      .arcEndLng((d) => (d as GlobeArc).endLng)
      .arcColor((d: object) => (d as GlobeArc).color)
      .arcAltitude((d) => (d as GlobeArc).arcAlt)
      .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
      .arcDashLength(cfg.arcLength)
      .arcDashInitialGap((d) => (d as GlobeArc).order)
      .arcDashGap(cfg.arcGap)
      .arcDashAnimateTime(() => cfg.arcTime);

    globe
      .pointsData(points)
      .pointColor((d) => (d as { color: string }).color)
      .pointsMerge(true)
      .pointAltitude(0)
      .pointRadius(2);

    globe
      .ringsData([])
      .ringColor(() => cfg.polygonColor)
      .ringMaxRadius(cfg.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod((cfg.arcTime * cfg.arcLength) / cfg.rings);
  }, [ready, data, cfg]);

  // Pulse rings at random arc start points.
  useEffect(() => {
    if (!ready || !data.length) return;
    const interval = setInterval(() => {
      const picked = data.filter(() => Math.random() < 0.6);
      globeRef.current?.ringsData(
        picked.map((d) => ({
          lat: d.startLat,
          lng: d.startLng,
          color: d.color,
        })),
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [ready, data]);

  return <group ref={groupRef} />;
}

export function World(props: WorldProps) {
  const { globeConfig } = props;
  const { scene, camera } = useMemo(() => {
    const s = new Scene();
    s.fog = new Fog(0xffffff, 400, 2000);
    return { scene: s, camera: new PerspectiveCamera(50, ASPECT, 180, 1800) };
  }, []);

  return (
    <Canvas
      scene={scene}
      camera={camera}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        position={new Vector3(-400, 100, 400)}
      />
      <directionalLight
        color={globeConfig.directionalTopLight}
        position={new Vector3(-200, 500, 200)}
      />
      <pointLight
        color={globeConfig.pointLight}
        position={new Vector3(-200, 500, 200)}
        intensity={0.8}
      />
      <GlobeMesh {...props} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={CAMERA_Z}
        maxDistance={CAMERA_Z}
        autoRotate
        autoRotateSpeed={globeConfig.autoRotateSpeed ?? 1}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
}
