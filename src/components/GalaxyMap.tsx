"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { locations } from "@/data/locations";
import Link from "next/link";

/* ─── Data ─── */

interface BodyDef {
  id: string;
  name: string;
  radius: number;
  orbitRadius: number;
  angle: number;
  tilt: number;
  texture: string;
  type: "star" | "planet" | "moon" | "belt";
  parent?: string;
  hasRing?: boolean;
  emissive?: boolean;
}

const bodies: BodyDef[] = [
  { id: "sun",      name: "Sol",      radius: 12, orbitRadius: 0,   angle: 0,   tilt: 7,    texture: "/textures/2k_sun.jpg",           type: "star",   emissive: true },
  { id: "mercury",  name: "Mercury",  radius: 1.8, orbitRadius: 28,  angle: 45,  tilt: 0.03, texture: "/textures/2k_mercury.jpg",       type: "planet" },
  { id: "venus",    name: "Venus",    radius: 2.5, orbitRadius: 44,  angle: 160, tilt: 177,  texture: "/textures/2k_venus_surface.jpg", type: "planet" },
  { id: "earth",    name: "Earth",    radius: 2.6, orbitRadius: 62,  angle: 220, tilt: 23.4, texture: "/textures/2k_earth_daymap.jpg",  type: "planet" },
  { id: "luna",     name: "Luna",     radius: 0.9, orbitRadius: 5.5, angle: 90,  tilt: 1.5,  texture: "/textures/2k_moon.jpg",          type: "moon", parent: "earth" },
  { id: "mars",     name: "Mars",     radius: 2.2, orbitRadius: 82,  angle: 310, tilt: 25,   texture: "/textures/2k_mars.jpg",          type: "planet" },
  { id: "phobos",   name: "Phobos",   radius: 0.5, orbitRadius: 4.5, angle: 200, tilt: 0,    texture: "/textures/2k_moon.jpg",          type: "moon", parent: "mars" },
  { id: "belt",     name: "Asteroid Belt", radius: 0, orbitRadius: 105, angle: 0, tilt: 0,   texture: "",                                type: "belt" },
  { id: "jupiter",  name: "Jupiter",  radius: 5.5, orbitRadius: 130, angle: 75,  tilt: 3.1,  texture: "/textures/2k_jupiter.jpg",       type: "planet" },
  { id: "europa",   name: "Europa",   radius: 0.8, orbitRadius: 8,   angle: 120, tilt: 0,    texture: "/textures/2k_moon.jpg",          type: "moon", parent: "jupiter" },
  { id: "ganymede", name: "Ganymede", radius: 1.0, orbitRadius: 10.5, angle: 280, tilt: 0,   texture: "/textures/2k_moon.jpg",          type: "moon", parent: "jupiter" },
  { id: "saturn",   name: "Saturn",   radius: 4.8, orbitRadius: 170, angle: 150, tilt: 26.7, texture: "/textures/2k_saturn.jpg",        type: "planet", hasRing: true },
];

interface LocDef {
  id: string;
  name: string;
  slug: string;
  bodyId: string;
  locIndex: number;
  offsetAngle: number;
  offsetPhi: number;
}

const locDefs: LocDef[] = [
  { id: "mercury-surface", name: "Mercury",       slug: "mercury",       bodyId: "mercury",  locIndex: 10, offsetAngle: 0,   offsetPhi: 20 },
  { id: "heliopolis",      name: "Heliopolis",     slug: "heliopolis",    bodyId: "mercury",  locIndex: 11, offsetAngle: 120, offsetPhi: -10 },
  { id: "earth-surface",   name: "Earth",          slug: "earth",         bodyId: "earth",    locIndex: 6,  offsetAngle: 30,  offsetPhi: 30 },
  { id: "luna-surface",    name: "Luna",           slug: "luna",          bodyId: "luna",     locIndex: 3,  offsetAngle: 0,   offsetPhi: 0 },
  { id: "lykos",           name: "Lykos",          slug: "lykos",         bodyId: "mars",     locIndex: 0,  offsetAngle: 0,   offsetPhi: -20 },
  { id: "institute",       name: "The Institute",  slug: "the-institute", bodyId: "mars",     locIndex: 1,  offsetAngle: 90,  offsetPhi: 30 },
  { id: "agea",            name: "Agea",           slug: "agea",          bodyId: "mars",     locIndex: 2,  offsetAngle: 180, offsetPhi: 10 },
  { id: "olympus-mons",    name: "Olympus Mons",   slug: "olympus-mons",  bodyId: "mars",     locIndex: 4,  offsetAngle: 270, offsetPhi: 50 },
  { id: "phobos-surface",  name: "Phobos",         slug: "phobos",        bodyId: "phobos",   locIndex: 8,  offsetAngle: 0,   offsetPhi: 0 },
  { id: "tinos",           name: "Tinos",          slug: "tinos",         bodyId: "belt",     locIndex: 9,  offsetAngle: 230, offsetPhi: 5 },
  { id: "the-rim",         name: "The Rim",        slug: "the-rim",       bodyId: "saturn",   locIndex: 5,  offsetAngle: 0,   offsetPhi: 40 },
  { id: "europa-surface",  name: "Europa",         slug: "europa",        bodyId: "europa",   locIndex: 12, offsetAngle: 0,   offsetPhi: 0 },
  { id: "ganymede-surface",name: "Ganymede",       slug: "ganymede",      bodyId: "ganymede", locIndex: 7,  offsetAngle: 0,   offsetPhi: 0 },
];

interface SelectedLocation {
  name: string;
  slug: string;
  planet: string;
  description: string;
  notableEvents: string[];
  associatedCharacters: string[];
}

/* ─── Spaceship builder ─── */

const SHIP_MODEL_PATH = "/models/Intergalactic_Spaceships_Version_2/GLB/Intergalactic_Spaceships_Version_2.glb";
const SHIP_SCALE = 0.25;       // tune to fit the scene
const SHIP_NOSE_LOCAL_Z = -4;  // approx front of model in local space (adjusted after inspecting)

function createSpaceship(scene: THREE.Scene): THREE.Group {
  const ship = new THREE.Group();

  // Temporary placeholder while GLB loads — small translucent cone
  const placeholderGeom = new THREE.ConeGeometry(0.3, 1.5, 6);
  const placeholderMat = new THREE.MeshBasicMaterial({ color: 0x4488ff, transparent: true, opacity: 0.3, wireframe: true });
  const placeholder = new THREE.Mesh(placeholderGeom, placeholderMat);
  placeholder.rotation.x = Math.PI / 2;
  placeholder.name = "placeholder";
  ship.add(placeholder);

  // Load the GLB model
  const loader = new GLTFLoader();
  loader.load(
    SHIP_MODEL_PATH,
    (gltf) => {
      const model = gltf.scene;

      // Scale the model to fit the scene
      model.scale.setScalar(SHIP_SCALE);

      // The model faces +Z by default in many exports; rotate so nose points -Z (our forward)
      // We'll adjust after seeing orientation. Default: rotate 180 on Y so it faces forward.
      model.rotation.y = Math.PI;

      // Ensure all meshes receive light properly
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = false;
          mesh.receiveShadow = false;
          if ((mesh.material as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            mat.envMapIntensity = 1.0;
            mat.needsUpdate = true;
          }
        }
      });

      // Remove placeholder and add model
      const ph = ship.getObjectByName("placeholder");
      if (ph) ship.remove(ph);
      ship.add(model);
    },
    undefined,
    (error) => {
      console.error("Failed to load spaceship model:", error);
    }
  );

  // Ship-mounted lighting
  const cockpitLight = new THREE.PointLight(0x88bbff, 0.6, 4);
  cockpitLight.position.set(0, 0.2, -1.0);
  ship.add(cockpitLight);

  const engineLight = new THREE.PointLight(0x4488ff, 1.2, 6);
  engineLight.position.set(0, 0, 1.3);
  engineLight.userData.isEngineLight = true;
  ship.add(engineLight);

  return ship;
}

/* ─── Exhaust particle system ─── */

const PARTICLE_COUNT = 300;
const PARTICLE_LIFETIME = 0.6; // seconds

// Engine nozzle positions in ship-local space (+Z = behind after 180° rotation)
const ENGINE_NOZZLES = [
  new THREE.Vector3(-0.35, 0, 1.2),
  new THREE.Vector3(0.35, 0, 1.2),
  new THREE.Vector3(0, 0, 1.3),
];

interface ExhaustSystem {
  points: THREE.Points;
  positions: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
  ages: Float32Array;         // current age per particle
  lifetimes: Float32Array;    // max lifetime per particle
  velocities: Float32Array;   // world-space velocity xyz per particle
  alive: Uint8Array;          // 1 = alive, 0 = dead/available
  spawnIndex: number;         // round-robin index for spawning
}

function createExhaustSystem(scene: THREE.Scene): ExhaustSystem {
  // Particle texture — soft radial dot
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.2, "rgba(255,255,255,0.8)");
  grad.addColorStop(0.5, "rgba(255,255,255,0.25)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(canvas);

  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const sizes = new Float32Array(PARTICLE_COUNT);
  const ages = new Float32Array(PARTICLE_COUNT);
  const lifetimes = new Float32Array(PARTICLE_COUNT);
  const velocities = new Float32Array(PARTICLE_COUNT * 3);
  const alive = new Uint8Array(PARTICLE_COUNT);

  // Init all particles far away and dead
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = 0;
    positions[i * 3 + 1] = -9999;
    positions[i * 3 + 2] = 0;
    colors[i * 3] = 0.7;     // R
    colors[i * 3 + 1] = 0.85; // G
    colors[i * 3 + 2] = 1.0;  // B
    sizes[i] = 0;
    ages[i] = 0;
    lifetimes[i] = PARTICLE_LIFETIME;
    alive[i] = 0;
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geom.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

  const mat = new THREE.PointsMaterial({
    size: 0.3,
    map: tex,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexColors: true,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geom, mat);
  points.frustumCulled = false;
  scene.add(points);

  return { points, positions, colors, sizes, ages, lifetimes, velocities, alive, spawnIndex: 0 };
}

function updateExhaustSystem(
  system: ExhaustSystem,
  shipPosition: THREE.Vector3,
  shipQuaternion: THREE.Quaternion,
  delta: number,
  isThrusting: boolean,
  isBoosting: boolean,
) {
  const { positions, colors, sizes, ages, lifetimes, velocities, alive } = system;
  const posAttr = system.points.geometry.attributes.position as THREE.BufferAttribute;
  const colorAttr = system.points.geometry.attributes.color as THREE.BufferAttribute;
  const sizeAttr = system.points.geometry.attributes.size as THREE.BufferAttribute;

  // How many particles to spawn this frame
  const spawnRate = isThrusting ? (isBoosting ? 45 : 25) : 4; // particles per frame
  const spawnCount = Math.min(spawnRate, 10); // cap per frame

  // Spawn new particles
  if (true) {
    const backward = new THREE.Vector3(0, 0, 1).applyQuaternion(shipQuaternion); // ship's backward dir

    for (let s = 0; s < spawnCount; s++) {
      // Find a dead particle
      let found = false;
      for (let tries = 0; tries < 20; tries++) {
        const idx = system.spawnIndex % PARTICLE_COUNT;
        system.spawnIndex++;
        if (alive[idx] === 0) {
          // Pick a random nozzle
          const nozzle = ENGINE_NOZZLES[Math.floor(Math.random() * ENGINE_NOZZLES.length)];
          // Transform nozzle position to world space
          const worldNozzle = nozzle.clone().applyQuaternion(shipQuaternion).add(shipPosition);

          positions[idx * 3] = worldNozzle.x;
          positions[idx * 3 + 1] = worldNozzle.y;
          positions[idx * 3 + 2] = worldNozzle.z;

          // Velocity: backward + slight random spread
          const speed = (isThrusting ? (isBoosting ? 18 : 10) : 3) + Math.random() * 3;
          const spread = 0.5;
          velocities[idx * 3] = backward.x * speed + (Math.random() - 0.5) * spread;
          velocities[idx * 3 + 1] = backward.y * speed + (Math.random() - 0.5) * spread;
          velocities[idx * 3 + 2] = backward.z * speed + (Math.random() - 0.5) * spread;

          // Lifetime with variation
          lifetimes[idx] = PARTICLE_LIFETIME * (0.6 + Math.random() * 0.8);
          ages[idx] = 0;
          alive[idx] = 1;

          // Initial color: bright blue-white core
          colors[idx * 3] = 0.7 + Math.random() * 0.3;
          colors[idx * 3 + 1] = 0.85 + Math.random() * 0.15;
          colors[idx * 3 + 2] = 1.0;

          // Initial size
          sizes[idx] = (isThrusting ? 0.25 : 0.1) + Math.random() * 0.1;

          found = true;
          break;
        }
      }
      if (!found) break;
    }
  }

  // Update all living particles
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    if (alive[i] === 0) continue;

    ages[i] += delta;
    const t = ages[i] / lifetimes[i]; // 0 → 1 normalized age

    if (t >= 1) {
      // Kill particle
      alive[i] = 0;
      positions[i * 3 + 1] = -9999;
      sizes[i] = 0;
      continue;
    }

    // Move particle
    positions[i * 3] += velocities[i * 3] * delta;
    positions[i * 3 + 1] += velocities[i * 3 + 1] * delta;
    positions[i * 3 + 2] += velocities[i * 3 + 2] * delta;

    // Slow down slightly (drag)
    velocities[i * 3] *= 0.98;
    velocities[i * 3 + 1] *= 0.98;
    velocities[i * 3 + 2] *= 0.98;

    // Color transition: blue-white → blue → dark blue → fade
    if (t < 0.3) {
      colors[i * 3] = 0.7 * (1 - t / 0.3);       // R fades
      colors[i * 3 + 1] = 0.6 + 0.3 * (1 - t / 0.3); // G fades
      colors[i * 3 + 2] = 1.0;                     // B stays
    } else {
      const fadeT = (t - 0.3) / 0.7;
      colors[i * 3] = 0.05;
      colors[i * 3 + 1] = 0.2 * (1 - fadeT);
      colors[i * 3 + 2] = 0.8 * (1 - fadeT);
    }

    // Size: grow slightly then shrink
    const sizeCurve = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85;
    sizes[i] = sizeCurve * (0.3 + Math.random() * 0.05);
  }

  posAttr.needsUpdate = true;
  colorAttr.needsUpdate = true;
  sizeAttr.needsUpdate = true;
}

/* ─── Component ─── */

export default function GalaxyMap() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(null);
  const [nearbyLocation, setNearbyLocation] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [speed, setSpeed] = useState(0);

  const selectLocationRef = useRef(setSelectedLocation);
  selectLocationRef.current = setSelectedLocation;
  const nearbyRef = useRef(setNearbyLocation);
  nearbyRef.current = setNearbyLocation;
  const isLockedRef = useRef(setIsLocked);
  isLockedRef.current = setIsLocked;
  const speedRef = useRef(setSpeed);
  speedRef.current = setSpeed;

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    /* ─── Renderer ─── */
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    /* ─── Scene ─── */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030308);
    scene.fog = new THREE.FogExp2(0x030308, 0.0008);

    /* ─── Camera ─── */
    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 2000);

    /* ─── Lighting ─── */
    const pointLight = new THREE.PointLight(0xfff5e0, 2.5, 500, 0.5);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);
    scene.add(new THREE.AmbientLight(0x444455, 0.8));

    // Ship-local headlight — forward-facing spotlight
    const headlight = new THREE.SpotLight(0xaaccff, 2.5, 60, 0.6, 0.4);
    headlight.castShadow = false;
    scene.add(headlight);
    scene.add(headlight.target);

    // Ship fill light — always illuminates the ship from above-behind
    const shipFillLight = new THREE.PointLight(0xeeeeff, 1.8, 15);
    scene.add(shipFillLight);

    // Underside warm fill
    const shipUnderLight = new THREE.PointLight(0xffddaa, 0.6, 10);
    scene.add(shipUnderLight);

    /* ─── Starfield ─── */
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 8000;
    const sp = new Float32Array(starCount * 3);
    const sc = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 500 + Math.random() * 500;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      sp[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      sp[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      sp[i * 3 + 2] = r * Math.cos(phi);
      const t = 0.7 + Math.random() * 0.3;
      sc[i * 3] = t; sc[i * 3 + 1] = t; sc[i * 3 + 2] = 0.8 + Math.random() * 0.2;
    }
    starGeometry.setAttribute("position", new THREE.BufferAttribute(sp, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(sc, 3));
    scene.add(new THREE.Points(starGeometry, new THREE.PointsMaterial({ size: 0.6, vertexColors: true, transparent: true, opacity: 0.9 })));

    /* ─── Texture loader ─── */
    const textureLoader = new THREE.TextureLoader();

    /* ─── Build celestial bodies ─── */
    const bodyMeshes: Record<string, THREE.Mesh> = {};
    const bodyPositions: Record<string, THREE.Vector3> = {};

    function calcPosition(def: BodyDef): THREE.Vector3 {
      const rad = (def.angle * Math.PI) / 180;
      if (def.parent) {
        const pp = bodyPositions[def.parent] || new THREE.Vector3();
        return new THREE.Vector3(pp.x + Math.cos(rad) * def.orbitRadius, pp.y, pp.z + Math.sin(rad) * def.orbitRadius);
      }
      return new THREE.Vector3(Math.cos(rad) * def.orbitRadius, 0, Math.sin(rad) * def.orbitRadius);
    }

    bodies.forEach((def) => { bodyPositions[def.id] = calcPosition(def); });

    bodies.forEach((def) => {
      const pos = bodyPositions[def.id];

      if (def.type === "belt") {
        const beltGroup = new THREE.Group();
        const rockGeom = new THREE.SphereGeometry(0.15, 4, 4);
        const rockMat = new THREE.MeshStandardMaterial({ color: 0x8b7355, roughness: 0.9 });
        for (let i = 0; i < 600; i++) {
          const a = Math.random() * Math.PI * 2;
          const r = def.orbitRadius + (Math.random() - 0.5) * 8;
          const rock = new THREE.Mesh(rockGeom, rockMat);
          rock.position.set(Math.cos(a) * r, (Math.random() - 0.5) * 3, Math.sin(a) * r);
          const s = 0.3 + Math.random() * 1.2;
          rock.scale.set(s, s * 0.6, s);
          beltGroup.add(rock);
        }
        scene.add(beltGroup);
        return;
      }

      const segments = def.type === "star" ? 64 : def.type === "moon" ? 24 : 48;
      const geom = new THREE.SphereGeometry(def.radius, segments, segments);
      let mat: THREE.Material;

      if (def.emissive) {
        mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        if (def.texture) textureLoader.load(def.texture, (tex) => { (mat as THREE.MeshBasicMaterial).map = tex; (mat as THREE.MeshBasicMaterial).needsUpdate = true; });
      } else {
        const stdMat = new THREE.MeshStandardMaterial({ roughness: 0.85, metalness: 0.05 });
        if (def.texture) textureLoader.load(def.texture, (tex) => { stdMat.map = tex; stdMat.needsUpdate = true; });
        mat = stdMat;
      }

      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.copy(pos);
      mesh.rotation.z = (def.tilt * Math.PI) / 180;
      scene.add(mesh);
      bodyMeshes[def.id] = mesh;

      if (def.type === "star") {
        const gc = document.createElement("canvas");
        gc.width = 256; gc.height = 256;
        const gx = gc.getContext("2d")!;
        const gr = gx.createRadialGradient(128, 128, 0, 128, 128, 128);
        gr.addColorStop(0, "rgba(255,240,200,0.45)");
        gr.addColorStop(0.3, "rgba(255,200,80,0.18)");
        gr.addColorStop(0.7, "rgba(255,160,40,0.04)");
        gr.addColorStop(1, "rgba(255,120,0,0)");
        gx.fillStyle = gr; gx.fillRect(0, 0, 256, 256);
        const sm = new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(gc), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
        const sp = new THREE.Sprite(sm);
        sp.scale.set(def.radius * 5, def.radius * 5, 1);
        sp.position.copy(pos);
        scene.add(sp);
      }

      if (def.hasRing) {
        const ringGeom = new THREE.RingGeometry(def.radius * 1.3, def.radius * 2.2, 64);
        const uvs = ringGeom.attributes.uv;
        const pa = ringGeom.attributes.position;
        for (let i = 0; i < uvs.count; i++) {
          const x = pa.getX(i), z = pa.getY(i);
          uvs.setXY(i, (Math.sqrt(x * x + z * z) - def.radius * 1.3) / (def.radius * 0.9), 0.5);
        }
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xd4c090, transparent: true, opacity: 0.5, side: THREE.DoubleSide });
        textureLoader.load("/textures/2k_saturn_ring_alpha.png", (tex) => { ringMat.map = tex; ringMat.needsUpdate = true; });
        const ring = new THREE.Mesh(ringGeom, ringMat);
        ring.position.copy(pos);
        ring.rotation.x = -Math.PI / 2 + (def.tilt * Math.PI) / 180;
        scene.add(ring);
      }
    });

    /* ─── Orbit rings ─── */
    bodies.filter((b) => b.type === "planet").forEach((def) => {
      const curve = new THREE.EllipseCurve(0, 0, def.orbitRadius, def.orbitRadius, 0, Math.PI * 2, false, 0);
      const geom = new THREE.BufferGeometry().setFromPoints(curve.getPoints(128).map((p) => new THREE.Vector3(p.x, 0, p.y)));
      scene.add(new THREE.Line(geom, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.08 })));
    });

    bodies.filter((b) => b.type === "moon" && b.parent).forEach((def) => {
      const pp = bodyPositions[def.parent!];
      const curve = new THREE.EllipseCurve(0, 0, def.orbitRadius, def.orbitRadius, 0, Math.PI * 2, false, 0);
      const geom = new THREE.BufferGeometry().setFromPoints(curve.getPoints(64).map((p) => new THREE.Vector3(p.x + pp.x, pp.y, p.y + pp.z)));
      scene.add(new THREE.Line(geom, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.05 })));
    });

    /* ─── Location markers ─── */
    const markerPositions: { pos: THREE.Vector3; def: LocDef }[] = [];

    locDefs.forEach((loc) => {
      const body = bodies.find((b) => b.id === loc.bodyId);
      if (!body) return;
      const bodyPos = bodyPositions[loc.bodyId] || new THREE.Vector3();

      let markerPos: THREE.Vector3;
      if (body.type === "belt") {
        const a = (loc.offsetAngle * Math.PI) / 180;
        markerPos = new THREE.Vector3(Math.cos(a) * body.orbitRadius, loc.offsetPhi * 0.2, Math.sin(a) * body.orbitRadius);
      } else {
        const theta = (loc.offsetAngle * Math.PI) / 180;
        const phi = ((90 - loc.offsetPhi) * Math.PI) / 180;
        const surfR = body.radius + 0.6;
        markerPos = new THREE.Vector3(
          bodyPos.x + surfR * Math.sin(phi) * Math.cos(theta),
          bodyPos.y + surfR * Math.cos(phi),
          bodyPos.z + surfR * Math.sin(phi) * Math.sin(theta)
        );
      }

      // Outer glow
      const glowMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.6, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xdaa520, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending })
      );
      glowMesh.position.copy(markerPos);
      scene.add(glowMesh);

      // Inner dot
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffd700 }));
      dot.position.copy(markerPos);
      scene.add(dot);

      // Connection line
      if (body.type !== "belt") {
        const lg = new THREE.BufferGeometry().setFromPoints([bodyPos, markerPos]);
        scene.add(new THREE.Line(lg, new THREE.LineBasicMaterial({ color: 0xdaa520, transparent: true, opacity: 0.2 })));
      }

      markerPositions.push({ pos: markerPos, def: loc });
    });

    /* ─── Text label sprites ─── */
    function makeTextSprite(text: string, color: string): THREE.Sprite {
      const c = document.createElement("canvas");
      const ctx = c.getContext("2d")!;
      c.width = 256; c.height = 64;
      ctx.font = "bold 28px Inter, Arial, sans-serif";
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, 128, 32);
      const tex = new THREE.CanvasTexture(c);
      tex.minFilter = THREE.LinearFilter;
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0.85, depthWrite: false }));
      s.scale.set(8, 2, 1);
      return s;
    }

    bodies.forEach((def) => {
      if (def.type === "belt") return;
      const pos = bodyPositions[def.id];
      const color = def.type === "star" ? "#fdb813" : def.type === "moon" ? "#aaaacc" : "#ddd8c4";
      const label = makeTextSprite(def.name.toUpperCase(), color);
      label.position.set(pos.x, pos.y - def.radius - 1.5, pos.z);
      if (def.type === "star") { label.position.y = -14; label.scale.set(10, 2.5, 1); }
      if (def.type === "moon") label.scale.set(5, 1.3, 1);
      scene.add(label);
    });

    locDefs.forEach((loc) => {
      const mp = markerPositions.find((m) => m.def.id === loc.id);
      if (!mp) return;
      const label = makeTextSprite(loc.name, "#daa520");
      label.position.set(mp.pos.x, mp.pos.y + 1.5, mp.pos.z);
      label.scale.set(6, 1.5, 1);
      scene.add(label);
    });

    /* ─── Spaceship ─── */
    const ship = createSpaceship(scene);
    // Start near Mars
    const marsPos = bodyPositions["mars"];
    ship.position.set(marsPos.x + 8, 2, marsPos.z + 8);
    scene.add(ship);

    // Exhaust particle system
    const exhaust = createExhaustSystem(scene);

    /* ─── Flight state ─── */
    const keys: Record<string, boolean> = {};
    const velocity = new THREE.Vector3();
    let yaw = 0;          // horizontal rotation (radians)
    let pitch = 0;        // vertical look angle (radians)
    const MAX_SPEED = 1.2;
    const ACCELERATION = 0.035;
    const DRAG = 0.97;
    const MOUSE_SENSITIVITY = 0.002;
    const BOOST_MULTIPLIER = 2.5;
    let pointerLocked = false;

    function onKeyDown(e: KeyboardEvent) {
      // Don't capture keys when info panel is open and user might want to type
      keys[e.code] = true;
      // Prevent page scroll on space/arrows
      if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) e.preventDefault();
    }
    function onKeyUp(e: KeyboardEvent) { keys[e.code] = false; }

    function onMouseMove(e: MouseEvent) {
      if (!pointerLocked) return;
      yaw -= e.movementX * MOUSE_SENSITIVITY;
      pitch -= e.movementY * MOUSE_SENSITIVITY;
      pitch = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, pitch));
    }

    function onPointerLockChange() {
      pointerLocked = document.pointerLockElement === renderer.domElement;
      isLockedRef.current(pointerLocked);
    }

    function requestLock() {
      renderer.domElement.requestPointerLock();
    }

    // Click to interact with locations OR lock pointer
    function onClick(e: MouseEvent) {
      if (!pointerLocked) {
        // Check if clicking on a UI element — if not, lock
        const target = e.target as HTMLElement;
        if (target === renderer.domElement) {
          requestLock();
        }
        return;
      }
    }

    // ESC handling is automatic via pointer lock API

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("pointerlockchange", onPointerLockChange);
    renderer.domElement.addEventListener("click", onClick);

    /* ─── Animate ─── */
    let frameId: number;
    const clock = new THREE.Clock();
    const shipForward = new THREE.Vector3();
    const shipRight = new THREE.Vector3();
    const shipUp = new THREE.Vector3(0, 1, 0);
    const desiredCamPos = new THREE.Vector3();
    const desiredCamLook = new THREE.Vector3();

    // Initialize camera behind ship
    camera.position.set(ship.position.x, ship.position.y + 3, ship.position.z + 8);

    function animate() {
      frameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05); // cap for tab-switch
      const elapsed = clock.getElapsedTime();

      /* ─ Ship orientation from yaw/pitch ─ */
      const shipQuat = new THREE.Quaternion();
      const yawQuat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
      const pitchQuat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), pitch);
      shipQuat.multiplyQuaternions(yawQuat, pitchQuat);

      // Forward direction (ship nose)
      shipForward.set(0, 0, -1).applyQuaternion(shipQuat);
      shipRight.set(1, 0, 0).applyQuaternion(shipQuat);

      /* ─ WASD input → acceleration ─ */
      const boost = keys["ShiftLeft"] || keys["ShiftRight"] ? BOOST_MULTIPLIER : 1;
      const accel = ACCELERATION * boost;

      if (keys["KeyW"] || keys["ArrowUp"])    velocity.addScaledVector(shipForward, accel);
      if (keys["KeyS"] || keys["ArrowDown"])   velocity.addScaledVector(shipForward, -accel * 0.6);
      if (keys["KeyA"] || keys["ArrowLeft"])    velocity.addScaledVector(shipRight, -accel * 0.7);
      if (keys["KeyD"] || keys["ArrowRight"])   velocity.addScaledVector(shipRight, accel * 0.7);
      if (keys["Space"])                        velocity.y += accel * 0.5;
      if (keys["KeyC"] || keys["ControlLeft"])  velocity.y -= accel * 0.5;

      // Drag
      velocity.multiplyScalar(DRAG);

      // Clamp speed
      const maxSpd = MAX_SPEED * boost;
      if (velocity.length() > maxSpd) velocity.setLength(maxSpd);

      // Move ship
      ship.position.addScaledVector(velocity, 60 * delta);

      // Rotate ship mesh to face movement direction
      ship.quaternion.copy(shipQuat);

      // Add slight banking on A/D
      const bankAngle = ((keys["KeyA"] || keys["ArrowLeft"]) ? 0.3 : 0) - ((keys["KeyD"] || keys["ArrowRight"]) ? 0.3 : 0);
      const bankQuat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), bankAngle);
      ship.quaternion.multiply(bankQuat);

      // Update exhaust particle system
      const isThrusting = keys["KeyW"] || keys["ArrowUp"];
      updateExhaustSystem(exhaust, ship.position, shipQuat, delta, isThrusting, boost > 1);

      // Expose speed to React
      speedRef.current(Math.round(velocity.length() * 1000));

      /* ─ Third person camera ─ */
      const camOffset = new THREE.Vector3(0, 2.0, 5.5); // behind and above
      camOffset.applyQuaternion(shipQuat);
      desiredCamPos.copy(ship.position).add(camOffset);

      // Look-at point (ahead of ship)
      desiredCamLook.copy(ship.position).addScaledVector(shipForward, 5);

      // Smooth follow
      const camLerp = 1 - Math.pow(0.001, delta);
      camera.position.lerp(desiredCamPos, camLerp);
      camera.lookAt(desiredCamLook);

      // Update headlight
      headlight.position.copy(ship.position);
      headlight.target.position.copy(ship.position).addScaledVector(shipForward, 10);

      // Fill light — above and behind the ship
      const fillOffset = new THREE.Vector3(0, 3, 4);
      fillOffset.applyQuaternion(shipQuat);
      shipFillLight.position.copy(ship.position).add(fillOffset);

      // Under light — below ship
      const underOffset = new THREE.Vector3(0, -2, 1);
      underOffset.applyQuaternion(shipQuat);
      shipUnderLight.position.copy(ship.position).add(underOffset);

      // Engine light intensity based on thrust
      ship.children.forEach((child) => {
        if (child.userData.isEngineLight) {
          (child as THREE.PointLight).intensity = isThrusting ? 1.5 + Math.sin(elapsed * 12) * 0.5 + (boost > 1 ? 1.0 : 0) : 0.4;
        }
      });

      /* ─ Planet self-rotation ─ */
      bodies.forEach((def) => {
        const mesh = bodyMeshes[def.id];
        if (mesh) mesh.rotation.y = elapsed * (def.type === "star" ? 0.02 : 0.1);
      });

      /* ─ Proximity detection for locations ─ */
      let closestEntry: { pos: THREE.Vector3; def: LocDef } | null = null;
      let closestDist = Infinity;
      for (const entry of markerPositions) {
        const d = ship.position.distanceTo(entry.pos);
        if (d < closestDist) { closestDist = d; closestEntry = entry; }
      }

      if (closestDist < 4 && closestEntry) {
        nearbyRef.current(closestEntry.def.name);
        // Inspect on E press
        if (keys["KeyE"]) {
          const loc = closestEntry.def;
          const data = locations[loc.locIndex];
          selectLocationRef.current({
            name: loc.name,
            slug: loc.slug,
            planet: data.planet,
            description: data.description,
            notableEvents: data.notableEvents,
            associatedCharacters: data.associatedCharacters,
          });
          keys["KeyE"] = false;
        }
      } else {
        nearbyRef.current(null);
      }

      renderer.render(scene, camera);
    }
    animate();

    /* ─── Resize ─── */
    function onResize() {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", onResize);

    /* ─── Cleanup ─── */
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("pointerlockchange", onPointerLockChange);
      renderer.domElement.removeEventListener("click", onClick);
      if (document.pointerLockElement === renderer.domElement) document.exitPointerLock();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-[#030308]">
      {/* 3D Canvas */}
      <div ref={mountRef} className="h-full w-full" />

      {/* Click to start overlay */}
      {!isLocked && !selectedLocation && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div className="rounded-lg border border-gold/30 bg-obsidian-dark/90 px-8 py-6 text-center backdrop-blur-sm">
            <p className="mb-2 text-lg font-bold text-gold">Click to Pilot</p>
            <p className="text-sm text-gray-400">Take the helm and explore the solar system</p>
          </div>
        </div>
      )}

      {/* HUD — top center */}
      {isLocked && (
        <div className="pointer-events-none absolute left-1/2 top-4 z-10 -translate-x-1/2">
          <div className="flex items-center gap-6 rounded-lg border border-gold/20 bg-obsidian-dark/70 px-5 py-2 backdrop-blur-sm">
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-widest text-gray-500">Speed</p>
              <p className="font-mono text-sm font-bold text-gold">{speed} <span className="text-[10px] text-gray-400">m/s</span></p>
            </div>
            {nearbyLocation && (
              <div className="border-l border-gold/20 pl-6 text-center">
                <p className="text-[10px] uppercase tracking-widest text-gray-500">Approaching</p>
                <p className="text-sm font-bold text-gold">{nearbyLocation}</p>
                <p className="text-[10px] text-gray-400">Press E to inspect</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Crosshair */}
      {isLocked && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <svg width="24" height="24" viewBox="0 0 24 24" className="opacity-40">
            <circle cx="12" cy="12" r="3" fill="none" stroke="#DAA520" strokeWidth="1" />
            <line x1="12" y1="0" x2="12" y2="7" stroke="#DAA520" strokeWidth="1" />
            <line x1="12" y1="17" x2="12" y2="24" stroke="#DAA520" strokeWidth="1" />
            <line x1="0" y1="12" x2="7" y2="12" stroke="#DAA520" strokeWidth="1" />
            <line x1="17" y1="12" x2="24" y2="12" stroke="#DAA520" strokeWidth="1" />
          </svg>
        </div>
      )}

      {/* Controls legend */}
      <div className="absolute bottom-4 left-4 z-10 rounded-lg border border-gold/20 bg-obsidian-dark/80 p-3 backdrop-blur-sm">
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gold">Controls</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
          <span className="text-gray-500">W A S D</span><span className="text-gray-300">Fly</span>
          <span className="text-gray-500">Mouse</span><span className="text-gray-300">Look</span>
          <span className="text-gray-500">Shift</span><span className="text-gray-300">Boost</span>
          <span className="text-gray-500">Space / C</span><span className="text-gray-300">Up / Down</span>
          <span className="text-gray-500">E</span><span className="text-gray-300">Inspect location</span>
          <span className="text-gray-500">Esc</span><span className="text-gray-300">Release cursor</span>
        </div>
      </div>

      {/* Info Panel */}
      {selectedLocation && (
        <div className="absolute right-4 top-4 z-20 max-h-[80vh] w-80 overflow-y-auto rounded-lg border border-gold/30 bg-obsidian-dark/90 p-5 backdrop-blur-md">
          <button
            onClick={() => { setSelectedLocation(null); }}
            className="absolute right-3 top-3 text-lg text-gray-400 transition-colors hover:text-gold"
          >
            &#10005;
          </button>
          <h2 className="mb-1 text-lg font-bold text-gold">{selectedLocation.name}</h2>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400">{selectedLocation.planet}</p>
          <p className="mb-4 text-sm leading-relaxed text-gray-300">{selectedLocation.description}</p>

          {selectedLocation.notableEvents.length > 0 && (
            <div className="mb-4">
              <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-gold/80">Notable Events</h3>
              <ul className="space-y-1">
                {selectedLocation.notableEvents.map((event, i) => (
                  <li key={i} className="text-xs text-gray-400"><span className="mr-1 text-gold/50">&#9656;</span> {event}</li>
                ))}
              </ul>
            </div>
          )}

          {selectedLocation.associatedCharacters.length > 0 && (
            <div className="mb-4">
              <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-gold/80">Characters</h3>
              <div className="flex flex-wrap gap-1">
                {selectedLocation.associatedCharacters.map((char, i) => (
                  <span key={i} className="rounded border border-gold/20 bg-obsidian-light/50 px-2 py-0.5 text-xs text-gray-300">{char}</span>
                ))}
              </div>
            </div>
          )}

          <Link
            href={`/locations/${selectedLocation.slug}`}
            className="inline-block rounded border border-gold/30 px-3 py-1.5 text-xs font-medium text-gold transition-colors hover:bg-gold/10"
          >
            View Full Details &rarr;
          </Link>
        </div>
      )}

      {/* Attribution */}
      <div className="absolute bottom-4 right-4 z-10 text-[9px] text-gray-600">
        Planet textures: Solar System Scope (CC BY 4.0)
      </div>
    </div>
  );
}
