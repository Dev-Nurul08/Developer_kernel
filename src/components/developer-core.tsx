"use client";

import { Environment, Float, Stars, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════════
   DESK SURFACE & NEON DESKMAT
   ═══════════════════════════════════════════════════════ */
function DeskAndMat() {
  return (
    <group position={[0, -1.1, 0]}>
      {/* Main desk surface */}
      <mesh position={[0, -0.02, 0]} receiveShadow>
        <boxGeometry args={[5.2, 0.05, 2.6]} />
        <meshStandardMaterial color="#08080E" roughness={0.88} metalness={0.12} />
      </mesh>

      {/* Desk front edge bevel */}
      <mesh position={[0, -0.03, 1.28]} receiveShadow>
        <boxGeometry args={[5.2, 0.04, 0.05]} />
        <meshStandardMaterial color="#0c0c14" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Desk legs (visible at edges) */}
      {[
        [-2.3, -0.5, 1.1],
        [2.3, -0.5, 1.1],
        [-2.3, -0.5, -1.1],
        [2.3, -0.5, -1.1],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <boxGeometry args={[0.06, 1.0, 0.06]} />
          <meshStandardMaterial color="#0f0f18" roughness={0.5} metalness={0.7} />
        </mesh>
      ))}

      {/* Desk mat outer glow border */}
      <mesh position={[0, 0.001, 0.12]}>
        <boxGeometry args={[2.92, 0.006, 1.22]} />
        <meshStandardMaterial
          color="#7C3AED"
          emissive="#7C3AED"
          emissiveIntensity={2.2}
        />
      </mesh>

      {/* Desk mat inner border accent */}
      <mesh position={[0, 0.003, 0.12]}>
        <boxGeometry args={[2.88, 0.006, 1.18]} />
        <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={0.5} />
      </mesh>

      {/* Desk mat cloth surface */}
      <mesh position={[0, 0.007, 0.12]} receiveShadow>
        <boxGeometry args={[2.86, 0.01, 1.16]} />
        <meshStandardMaterial color="#0D0D1E" roughness={0.98} metalness={0.0} />
      </mesh>

      {/* Subtle mat-to-desk glow */}
      <pointLight position={[0, 0.05, 0.12]} intensity={0.6} color="#7C3AED" distance={1.8} />
    </group>
  );
}

/* ═══════════════════════════════════════════════════════
   ULTRAWIDE CURVED MONITOR
   ═══════════════════════════════════════════════════════ */
function CurvedScreen({ texture }: { texture: THREE.Texture }) {
  const geo = useMemo(() => {
    const radius = 3.5;
    const screenW = 2.22;
    const screenH = 0.76;
    const arcAngle = screenW / radius;
    const seg = 48;
    const g = new THREE.CylinderGeometry(radius, radius, screenH, seg, 1, true, -arcAngle / 2, arcAngle);
    // Rotate so the curved face points forward (+Z)
    g.rotateY(Math.PI);
    // Flip UV horizontal to fix horizontal mirroring caused by rotateY(Math.PI)
    const uv = g.attributes.uv;
    for (let i = 0; i < uv.count; i++) {
      uv.setX(i, 1.0 - uv.getX(i));
    }
    uv.needsUpdate = true;
    return g;
  }, []);

  return (
    <mesh geometry={geo} position={[0, 0.014, 0.03 + 3.5]}>
      <meshStandardMaterial
        map={texture}
        emissiveMap={texture}
        emissive={new THREE.Color(0.95, 0.95, 0.95)}
        emissiveIntensity={1.15}
        roughness={0.08}
        metalness={0.0}
        toneMapped={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function CurvedBezel() {
  const geo = useMemo(() => {
    const radius = 3.55;
    const arcAngle = 2.36 / radius;
    const g = new THREE.CylinderGeometry(radius, radius, 0.88, 48, 1, true, -arcAngle / 2, arcAngle);
    g.rotateY(Math.PI);
    return g;
  }, []);

  return (
    <mesh geometry={geo} position={[0, 0, 3.55]} castShadow receiveShadow>
      <meshStandardMaterial color="#111118" roughness={0.35} metalness={0.75} side={THREE.DoubleSide} />
    </mesh>
  );
}

function CurvedGlow() {
  const geo = useMemo(() => {
    const radius = 3.48;
    const arcAngle = 2.24 / radius;
    const g = new THREE.CylinderGeometry(radius, radius, 0.78, 48, 1, true, -arcAngle / 2, arcAngle);
    g.rotateY(Math.PI);
    return g;
  }, []);

  return (
    <mesh geometry={geo} position={[0, 0.014, 0.029 + 3.48]}>
      <meshStandardMaterial
        color="#818CF8"
        emissive="#818CF8"
        emissiveIntensity={0.15}
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Monitor() {
  const texture = useTexture("/screen.png");

  // Ensure texture displays correctly
  texture.flipY = true;
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <group position={[0, -0.05, -0.5]}>
      {/* ─── Curved Bezel Frame ─── */}
      <CurvedBezel />

      {/* Bezel inner recess */}
      <mesh position={[0, 0, 0.022]}>
        <boxGeometry args={[2.28, 0.8, 0.012]} />
        <meshStandardMaterial color="#090910" roughness={0.6} metalness={0.5} />
      </mesh>

      {/* ─── Curved LCD Screen Panel ─── */}
      <CurvedScreen texture={texture} />

      {/* Curved screen edge micro-glow */}
      <CurvedGlow />

      {/* ─── Logo on Bottom Bezel ─── */}
      <mesh position={[0, -0.4, 0.028]}>
        <boxGeometry args={[0.12, 0.008, 0.004]} />
        <meshStandardMaterial color="#555566" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Power indicator LED */}
      <mesh position={[0.9, -0.4, 0.029]}>
        <sphereGeometry args={[0.006, 8, 8]} />
        <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={3.0} />
      </mesh>

      {/* ─── Monitor Back Casing ─── */}
      <mesh position={[0, 0, -0.04]} castShadow>
        <boxGeometry args={[2.32, 0.84, 0.08]} />
        <meshStandardMaterial color="#0d0d14" roughness={0.55} metalness={0.65} />
      </mesh>

      {/* Back vent slots */}
      {[-0.4, -0.2, 0, 0.2, 0.4].map((x, i) => (
        <mesh key={i} position={[x, 0.1, -0.082]}>
          <boxGeometry args={[0.06, 0.4, 0.004]} />
          <meshStandardMaterial color="#070709" roughness={0.9} />
        </mesh>
      ))}

      {/* ─── Ambient RGB Bias Light strip on back ─── */}
      {/* Top strip */}
      <mesh position={[0, 0.44, -0.085]}>
        <boxGeometry args={[2.2, 0.012, 0.006]} />
        <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={3.0} />
      </mesh>
      {/* Bottom strip */}
      <mesh position={[0, -0.44, -0.085]}>
        <boxGeometry args={[2.2, 0.012, 0.006]} />
        <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={3.0} />
      </mesh>
      {/* Left strip */}
      <mesh position={[-1.17, 0, -0.085]}>
        <boxGeometry args={[0.012, 0.84, 0.006]} />
        <meshStandardMaterial color="#A78BFA" emissive="#A78BFA" emissiveIntensity={2.5} />
      </mesh>
      {/* Right strip */}
      <mesh position={[1.17, 0, -0.085]}>
        <boxGeometry args={[0.012, 0.84, 0.006]} />
        <meshStandardMaterial color="#A78BFA" emissive="#A78BFA" emissiveIntensity={2.5} />
      </mesh>

      {/* ─── Dual Arm Monitor Stand ─── */}
      {/* Monitor neck bracket */}
      <mesh position={[0, -0.2, -0.09]} castShadow>
        <boxGeometry args={[0.095, 0.12, 0.095]} />
        <meshStandardMaterial color="#1c1c28" metalness={0.88} roughness={0.2} />
      </mesh>

      {/* Upper arm segment */}
      <mesh position={[0, -0.46, -0.26]} rotation={[0.42, 0, 0]} castShadow>
        <cylinderGeometry args={[0.024, 0.028, 0.52, 14]} />
        <meshStandardMaterial color="#18182a" metalness={0.85} roughness={0.22} />
      </mesh>

      {/* Elbow joint */}
      <mesh position={[0, -0.64, -0.38]}>
        <sphereGeometry args={[0.036, 12, 12]} />
        <meshStandardMaterial color="#22223a" metalness={0.9} roughness={0.18} />
      </mesh>

      {/* Lower arm segment */}
      <mesh position={[0, -0.76, -0.40]} rotation={[-0.28, 0, 0]} castShadow>
        <cylinderGeometry args={[0.020, 0.020, 0.30, 14]} />
        <meshStandardMaterial color="#18182a" metalness={0.85} roughness={0.22} />
      </mesh>

      {/* Cable clip on arm */}
      <mesh position={[0, -0.56, -0.33]}>
        <torusGeometry args={[0.02, 0.006, 6, 12, Math.PI * 1.6]} />
        <meshStandardMaterial color="#07070d" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Desk clamp body */}
      <mesh position={[0, -0.98, -0.48]} castShadow>
        <boxGeometry args={[0.115, 0.18, 0.115]} />
        <meshStandardMaterial color="#0d0d16" metalness={0.75} roughness={0.38} />
      </mesh>
      {/* Clamp screw */}
      <mesh position={[0, -1.06, -0.42]}>
        <cylinderGeometry args={[0.012, 0.012, 0.06, 8]} />
        <meshStandardMaterial color="#aaaacc" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* ─── Lighting ─── */}
      {/* Screen-cast blue/purple glow on desk */}
      <pointLight position={[0, -0.25, 0.35]} intensity={2.5} color="#818CF8" distance={1.4} />
      {/* Back RGB ambient spill */}
      <pointLight position={[0, 0, -0.55]} intensity={3.0} color="#7C3AED" distance={1.8} />
    </group>
  );
}

/* ═══════════════════════════════════════════════════════
   MECHANICAL KEYBOARD — per-key rendering with RGB
   ═══════════════════════════════════════════════════════ */
function Keyboard() {
  const rgbRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (rgbRef.current) {
      const t = clock.getElapsedTime();
      const hue = (t * 0.08) % 1;
      const c = new THREE.Color().setHSL(hue, 0.9, 0.5);
      rgbRef.current.color = c;
      rgbRef.current.emissive = c;
    }
  });

  const keys = useMemo(() => {
    const list = [];
    const rows = 5;
    const cols = 17;
    const keyW = 0.04;
    const keyH = 0.018;
    const keyD = 0.04;
    const gapX = 0.009;
    const gapZ = 0.011;

    const rowStagger = [0, 0.005, 0.01, 0.015, 0.005];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (r === 4 && c >= 5 && c <= 11) {
          if (c === 5) {
            list.push({
              x: (7.5 - (cols - 1) / 2) * (keyW + gapX) + rowStagger[r],
              z: (r - (rows - 1) / 2) * (keyD + gapZ),
              w: 0.328,
              h: keyH,
              d: keyD,
              color: "#252535",
              emissive: null,
              type: "spacebar",
            });
          }
          continue;
        }

        const x = (c - (cols - 1) / 2) * (keyW + gapX) + rowStagger[r];
        const z = (r - (rows - 1) / 2) * (keyD + gapZ);

        let color = "#1c1c28";
        let emissive = null;

        if (r === 0 && c === 0) {
          color = "#9B1C1C";
          emissive = "#EF4444";
        } else if (r === 0 && c >= 1 && c <= 4) {
          color = "#1a1a2e";
          emissive = null;
        } else if (r === 0 && c >= 5 && c <= 8) {
          color = "#0f1a1a";
          emissive = null;
        } else if (r === 0 && c >= 9 && c <= 12) {
          color = "#1a0f2e";
          emissive = null;
        } else if (r === 2 && c === 16) {
          color = "#0c3340";
          emissive = "#06B6D4";
        } else if (r === 4 && (c < 3 || c > 13)) {
          color = "#1e1040";
          emissive = "#7C3AED";
        } else if (r === 0 && c >= 13) {
          color = "#1a1a2e";
        } else if (c === 0 && r > 0) {
          color = "#161626";
        }

        list.push({ x, z, w: keyW, h: keyH, d: keyD, color, emissive, type: "key" });
      }
    }
    return list;
  }, []);

  return (
    <group position={[-0.04, -1.065, 0.22]} rotation={[0.035, 0, 0]}>
      {/* Keyboard chassis - aluminum top plate */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.96, 0.028, 0.36]} />
        <meshStandardMaterial color="#0f0f18" roughness={0.28} metalness={0.9} />
      </mesh>

      {/* Side trim accents */}
      <mesh position={[0, 0.015, 0.177]}>
        <boxGeometry args={[0.96, 0.004, 0.003]} />
        <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[0, 0.015, -0.177]}>
        <boxGeometry args={[0.96, 0.004, 0.003]} />
        <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={1.5} />
      </mesh>

      {/* Keyboard underglow LED (cycles color) */}
      <mesh position={[0, -0.016, 0]}>
        <boxGeometry args={[0.94, 0.004, 0.34]} />
        <meshStandardMaterial
          ref={rgbRef}
          color="#06B6D4"
          emissive="#06B6D4"
          emissiveIntensity={2.5}
          transparent
          opacity={0.9}
        />
      </mesh>
      <pointLight position={[0, -0.04, 0]} intensity={2.8} color="#06B6D4" distance={0.55} />

      {/* Individual key caps */}
      {keys.map((k, i) => (
        <mesh key={i} position={[k.x, 0.024, k.z]} castShadow receiveShadow>
          <boxGeometry args={[k.w, k.h, k.d]} />
          <meshStandardMaterial
            color={k.color}
            emissive={k.emissive || "#000000"}
            emissiveIntensity={k.emissive ? 1.2 : 0}
            roughness={0.55}
            metalness={0.08}
          />
        </mesh>
      ))}

      {/* Key legends row 0 RGB shimmer dots */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={"dot" + i} position={[-0.42 + i * 0.095, 0.036, -0.155]}>
          <sphereGeometry args={[0.003, 6, 6]} />
          <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={2.0} />
        </mesh>
      ))}

      {/* USB-C port on back */}
      <mesh position={[-0.3, 0.008, -0.181]}>
        <boxGeometry args={[0.018, 0.007, 0.005]} />
        <meshStandardMaterial color="#333344" roughness={0.3} metalness={0.9} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════
   ERGONOMIC WIRELESS MOUSE
   ═══════════════════════════════════════════════════════ */
function Mouse() {
  const scrollWheelRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (scrollWheelRef.current) {
      scrollWheelRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.4) * 0.05;
    }
  });

  return (
    <group position={[0.66, -1.065, 0.26]} rotation={[0, -0.08, 0]}>
      {/* Mouse body - ergonomic shape via scaled sphere */}
      <mesh castShadow scale={[0.052, 0.032, 0.096]}>
        <sphereGeometry args={[1, 24, 20]} />
        <meshStandardMaterial color="#131320" roughness={0.42} metalness={0.22} />
      </mesh>

      {/* Right button */}
      <mesh position={[0.015, 0.027, -0.038]} castShadow>
        <boxGeometry args={[0.022, 0.006, 0.055]} />
        <meshStandardMaterial color="#0f0f1c" roughness={0.6} metalness={0.12} />
      </mesh>

      {/* Left button */}
      <mesh position={[-0.015, 0.027, -0.038]} castShadow>
        <boxGeometry args={[0.022, 0.006, 0.055]} />
        <meshStandardMaterial color="#0f0f1c" roughness={0.6} metalness={0.12} />
      </mesh>

      {/* Button divider line */}
      <mesh position={[0, 0.029, -0.038]}>
        <boxGeometry args={[0.001, 0.003, 0.058]} />
        <meshStandardMaterial color="#070712" />
      </mesh>

      {/* Scroll wheel */}
      <group ref={scrollWheelRef} position={[0, 0.028, -0.022]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.0065, 0.0065, 0.026, 12]} />
          <meshStandardMaterial
            color="#06B6D4"
            emissive="#06B6D4"
            emissiveIntensity={1.8}
            roughness={0.4}
          />
        </mesh>
        {/* Scroll wheel ridges */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, (i * Math.PI * 2) / 8]}>
            <boxGeometry args={[0.002, 0.026, 0.012]} />
            <meshStandardMaterial color="#1a3040" roughness={0.8} />
          </mesh>
        ))}
      </group>

      {/* DPI button */}
      <mesh position={[0, 0.029, -0.005]}>
        <cylinderGeometry args={[0.004, 0.004, 0.004, 8]} />
        <meshStandardMaterial color="#333348" metalness={0.8} roughness={0.25} />
      </mesh>

      {/* RGB side strip left */}
      <mesh position={[-0.026, 0.002, 0.01]} rotation={[0, 0, 0.22]}>
        <boxGeometry args={[0.004, 0.008, 0.055]} />
        <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={2.0} />
      </mesh>
      {/* RGB strip right */}
      <mesh position={[0.026, 0.002, 0.01]} rotation={[0, 0, -0.22]}>
        <boxGeometry args={[0.004, 0.008, 0.055]} />
        <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={2.0} />
      </mesh>

      {/* Wireless receiver dongle */}
      <mesh position={[0, -0.032, -0.08]}>
        <boxGeometry args={[0.012, 0.005, 0.022]} />
        <meshStandardMaterial color="#1a1a26" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* Optical sensor glow */}
      <mesh position={[0, -0.034, 0.01]}>
        <sphereGeometry args={[0.005, 8, 8]} />
        <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={3.5} />
      </mesh>

      {/* Point light for subtle mouse RGB */}
      <pointLight position={[0, -0.01, 0]} intensity={0.8} color="#7C3AED" distance={0.3} />
    </group>
  );
}

/* ═══════════════════════════════════════════════════════
   PC TOWER — RGB fans, glass panel, internals
   ═══════════════════════════════════════════════════════ */
function Fan({
  rotationSpeed = 14,
  color = "#06B6D4",
  accentColor = "#7C3AED",
}: {
  rotationSpeed?: number;
  color?: string;
  accentColor?: string;
}) {
  const bladeRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (bladeRef.current) {
      bladeRef.current.rotation.z = clock.getElapsedTime() * rotationSpeed;
    }
  });

  return (
    <group>
      {/* Fan frame */}
      <mesh>
        <torusGeometry args={[0.095, 0.01, 8, 28]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={1.6} />
      </mesh>
      {/* Fan hub */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.016, 0.016, 0.012, 12]} />
        <meshStandardMaterial color="#0f0f18" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Corner screws */}
      {[
        [-0.092, 0.092],
        [0.092, 0.092],
        [-0.092, -0.092],
        [0.092, -0.092],
      ].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.006, 0.006, 0.008, 8]} />
          <meshStandardMaterial color="#1c1c2c" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
      {/* Spinning blades */}
      <group ref={bladeRef}>
        {Array.from({ length: 9 }).map((_, i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI * 2) / 9]}>
            <boxGeometry args={[0.013, 0.175, 0.006]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.75}
              transparent
              opacity={0.7}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function PCTower() {
  return (
    <group position={[1.5, -0.44, -0.38]} rotation={[0, -0.32, 0]}>
      {/* ─── Main Chassis Skeleton ─── */}
      {/* Top panel */}
      <mesh position={[0, 0.58, 0]} castShadow>
        <boxGeometry args={[0.38, 0.022, 0.66]} />
        <meshStandardMaterial color="#0e0e16" roughness={0.45} metalness={0.85} />
      </mesh>
      {/* Bottom panel */}
      <mesh position={[0, -0.58, 0]} castShadow>
        <boxGeometry args={[0.38, 0.022, 0.66]} />
        <meshStandardMaterial color="#0e0e16" roughness={0.45} metalness={0.85} />
      </mesh>
      {/* Back panel */}
      <mesh position={[0, 0, -0.32]} castShadow>
        <boxGeometry args={[0.38, 1.14, 0.022]} />
        <meshStandardMaterial color="#09090f" roughness={0.6} metalness={0.92} />
      </mesh>
      {/* Left solid panel */}
      <mesh position={[-0.18, 0, 0]} castShadow>
        <boxGeometry args={[0.022, 1.14, 0.64]} />
        <meshStandardMaterial color="#0e0e16" roughness={0.45} metalness={0.85} />
      </mesh>

      {/* ─── Tempered Glass Right Panel ─── */}
      <mesh position={[0.18, 0, 0]}>
        <boxGeometry args={[0.01, 1.1, 0.62]} />
        <meshPhysicalMaterial
          color="#c8d0ff"
          transparent
          opacity={0.14}
          transmission={0.94}
          roughness={0.03}
          metalness={0.05}
          ior={1.52}
          thickness={0.012}
          reflectivity={0.5}
        />
      </mesh>

      {/* Glass panel edge trim */}
      <mesh position={[0.18, 0, 0]}>
        <boxGeometry args={[0.013, 1.12, 0.635]} />
        <meshStandardMaterial
          color="#1e1e30"
          roughness={0.3}
          metalness={0.8}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* ─── Front Mesh Panel ─── */}
      <mesh position={[0, 0.1, 0.323]}>
        <boxGeometry args={[0.34, 0.94, 0.016]} />
        <meshStandardMaterial
          color="#111118"
          roughness={0.7}
          metalness={0.5}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Front RGB accent strip */}
      <mesh position={[0, 0.1, 0.334]}>
        <boxGeometry args={[0.008, 0.9, 0.004]} />
        <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={3.0} />
      </mesh>

      {/* Power button */}
      <mesh position={[0.08, 0.52, 0.333]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.012, 12]} />
        <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={2.5} />
      </mesh>

      {/* ─── MOTHERBOARD & INTERNALS ─── */}
      {/* PCB board */}
      <mesh position={[-0.155, 0.02, 0]} castShadow>
        <boxGeometry args={[0.018, 0.92, 0.52]} />
        <meshStandardMaterial color="#081c12" roughness={0.96} metalness={0.08} />
      </mesh>

      {/* CPU Cooler – AIO liquid pump head */}
      <group position={[-0.13, 0.18, 0.05]}>
        <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.058, 0.058, 0.026, 18]} />
          <meshStandardMaterial color="#111118" roughness={0.55} metalness={0.5} />
        </mesh>
        {/* RGB ring around AIO head */}
        <mesh position={[0.016, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.042, 0.008, 8, 28]} />
          <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={2.8} />
        </mesh>
        {/* AIO logo plate */}
        <mesh position={[0.017, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.04, 0.04]} />
          <meshStandardMaterial color="#1a3040" emissive="#06B6D4" emissiveIntensity={0.4} />
        </mesh>
      </group>

      {/* AIO Radiator hoses */}
      <mesh position={[-0.1, 0.32, 0.04]} rotation={[0, 0, 0.4]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.12, 8]} />
        <meshStandardMaterial color="#1a1a26" roughness={0.7} metalness={0.4} />
      </mesh>
      <mesh position={[-0.12, 0.38, 0.06]} rotation={[0, 0, 0.2]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.1, 8]} />
        <meshStandardMaterial color="#1a1a26" roughness={0.7} metalness={0.4} />
      </mesh>

      {/* ─── GPU ─── */}
      <group position={[-0.02, -0.15, 0.05]}>
        {/* PCIe card body */}
        <mesh castShadow>
          <boxGeometry args={[0.2, 0.085, 0.4]} />
          <meshStandardMaterial color="#12121e" roughness={0.48} metalness={0.88} />
        </mesh>
        {/* Heatsink fins */}
        {[-0.08, -0.04, 0, 0.04, 0.08].map((z, i) => (
          <mesh key={i} position={[0.02, 0.022, z]}>
            <boxGeometry args={[0.12, 0.008, 0.006]} />
            <meshStandardMaterial color="#1a1a26" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}
        {/* GPU RGB bar */}
        <mesh position={[0.098, 0.012, 0]}>
          <boxGeometry args={[0.003, 0.01, 0.36]} />
          <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={3.0} />
        </mesh>
        {/* GPU fans */}
        {[-0.1, 0.1].map((z, i) => (
          <mesh key={i} position={[0, -0.044, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.034, 0.034, 0.004, 14]} />
            <meshStandardMaterial color="#0a0a14" roughness={0.8} />
          </mesh>
        ))}
        {/* PCIe bracket */}
        <mesh position={[-0.1, 0, 0.22]} castShadow>
          <boxGeometry args={[0.006, 0.08, 0.04]} />
          <meshStandardMaterial color="#07070d" metalness={0.9} roughness={0.3} />
        </mesh>
      </group>

      {/* ─── RAM Modules ─── */}
      <group position={[-0.13, 0.18, 0.18]}>
        {[0, 0.015, 0.03, 0.045].map((zOff, idx) => (
          <group key={idx} position={[0, 0, zOff]}>
            {/* PCB */}
            <mesh castShadow>
              <boxGeometry args={[0.012, 0.096, 0.006]} />
              <meshStandardMaterial color="#0a1510" roughness={0.9} metalness={0.1} />
            </mesh>
            {/* Heat spreader top */}
            <mesh position={[0, 0.042, 0]}>
              <boxGeometry args={[0.014, 0.016, 0.007]} />
              <meshStandardMaterial color="#1c1c2a" metalness={0.85} roughness={0.2} />
            </mesh>
            {/* RGB strip on top */}
            <mesh position={[0, 0.05, 0]}>
              <boxGeometry args={[0.012, 0.004, 0.008]} />
              <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={2.2} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ─── NVMe SSD ─── */}
      <mesh position={[-0.13, -0.28, 0.12]} castShadow>
        <boxGeometry args={[0.01, 0.018, 0.08]} />
        <meshStandardMaterial color="#0c1a18" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* ─── Power Supply Unit ─── */}
      <mesh position={[0, -0.46, -0.1]} castShadow>
        <boxGeometry args={[0.34, 0.18, 0.32]} />
        <meshStandardMaterial color="#0a0a10" roughness={0.6} metalness={0.9} />
      </mesh>
      <mesh position={[0, -0.46, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.055, 0.055, 0.008, 14]} />
          <meshStandardMaterial color="#070710" roughness={0.7} />
      </mesh>

      {/* ─── 3 Front Intake RGB Fans ─── */}
      <group position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <group position={[0, -0.28, 0]}>
          <Fan color="#06B6D4" accentColor="#7C3AED" rotationSpeed={13} />
        </group>
        <group position={[0, 0, 0]}>
          <Fan color="#A78BFA" accentColor="#7C3AED" rotationSpeed={14} />
        </group>
        <group position={[0, 0.28, 0]}>
          <Fan color="#06B6D4" accentColor="#7C3AED" rotationSpeed={12.5} />
        </group>
      </group>

      {/* ─── Top Exhaust Fan ─── */}
      <group position={[0, 0.57, -0.05]} rotation={[0, 0, 0]}>
        <Fan color="#7C3AED" accentColor="#6366F1" rotationSpeed={11} />
      </group>

      {/* ─── Cable management bundle ─── */}
      {[-0.05, 0, 0.05].map((z, i) => (
        <mesh key={i} position={[-0.08, -0.35, z]} rotation={[0.1, 0, 0]} castShadow>
          <cylinderGeometry args={[0.006, 0.006, 0.28, 6]} />
          <meshStandardMaterial color={i % 2 ? "#1a1a26" : "#0a0a14"} roughness={0.8} />
        </mesh>
      ))}

      {/* ─── Internal Ambient Lights ─── */}
      <pointLight position={[0, 0.15, 0.1]} intensity={3.5} color="#7C3AED" distance={0.75} />
      <pointLight position={[0, -0.2, 0.1]} intensity={2.8} color="#06B6D4" distance={0.7} />
      <pointLight position={[0.05, 0.05, 0.2]} intensity={1.5} color="#818CF8" distance={0.6} />
    </group>
  );
}

/* ═══════════════════════════════════════════════════════
   DESK ACCESSORIES — mug, plant, lightbar
   ═══════════════════════════════════════════════════════ */
function Accessories() {
  const steamRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (steamRef.current) {
      const t = clock.getElapsedTime();
      steamRef.current.position.y = 0.055 + Math.sin(t * 1.5) * 0.008;
      const mat = steamRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.opacity = 0.3 + Math.sin(t * 2.0) * 0.15;
      }
    }
  });

  return (
    <group>
      {/* ─── Succulent Plant ─── */}
      <group position={[-1.22, -1.05, 0.3]}>
        {/* Sleek slate pot */}
        <mesh castShadow>
          <cylinderGeometry args={[0.068, 0.052, 0.095, 8]} />
          <meshStandardMaterial color="#27272A" roughness={0.72} metalness={0.05} />
        </mesh>
        {/* Pot rim */}
        <mesh position={[0, 0.05, 0]}>
          <torusGeometry args={[0.068, 0.008, 6, 16]} />
          <meshStandardMaterial color="#18181B" roughness={0.7} />
        </mesh>
        {/* Soil */}
        <mesh position={[0, 0.046, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.006, 8]} />
          <meshStandardMaterial color="#2c1a0a" roughness={0.98} />
        </mesh>
        {/* Succulent leaves (cluster) */}
        {[-0.025, 0, 0.025].map((x, i) =>
          [-0.02, 0.02].map((z, j) => (
            <mesh
              key={`${i}-${j}`}
              position={[x, 0.074, z]}
              rotation={[j * 0.25, i * 1.4, 0.1]}
              castShadow
            >
              <sphereGeometry args={[0.022, 6, 6]} />
              <meshStandardMaterial color={i % 2 ? "#059669" : "#10B981"} roughness={0.78} />
            </mesh>
          )),
        )}
      </group>

      {/* ─── Developer Mug ─── */}
      <group position={[-0.8, -1.05, 0.46]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.052, 0.048, 0.112, 14]} />
          <meshStandardMaterial color="#1c2a3a" roughness={0.45} metalness={0.18} />
        </mesh>
        {/* Inner coffee shadow */}
        <mesh position={[0, 0.052, 0]}>
          <cylinderGeometry args={[0.044, 0.044, 0.008, 14]} />
          <meshStandardMaterial color="#3C210E" roughness={0.85} />
        </mesh>
        {/* Handle */}
        <mesh position={[0.057, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.03, 0.009, 8, 14, Math.PI]} />
          <meshStandardMaterial color="#1c2a3a" roughness={0.45} metalness={0.18} />
        </mesh>
        {/* White "dev" stripe on mug */}
        <mesh position={[0, 0.005, 0.052]}>
          <planeGeometry args={[0.065, 0.025]} />
          <meshStandardMaterial color="#E2E8F0" roughness={0.9} />
        </mesh>
        {/* Steam effect */}
        <mesh ref={steamRef} position={[0, 0.055, 0]}>
          <planeGeometry args={[0.036, 0.036]} />
          <meshStandardMaterial color="#aabbcc" transparent opacity={0.22} depthWrite={false} />
        </mesh>
      </group>

      {/* ─── Monitor Cable routing clip ─── */}
      <mesh position={[0, -0.72, -1.01]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.009, 0.009, 0.82, 8]} />
        <meshStandardMaterial color="#151520" roughness={0.88} />
      </mesh>

      {/* ─── Monitor Lightbar ─── */}
      <group position={[0, -0.02, -0.53]}>
        {/* Clamp attachment */}
        <mesh position={[0, 0, -0.048]} castShadow>
          <boxGeometry args={[0.055, 0.052, 0.088]} />
          <meshStandardMaterial color="#0f0f14" metalness={0.88} roughness={0.28} />
        </mesh>
        {/* Arm joint */}
        <mesh position={[0, -0.006, -0.022]}>
          <sphereGeometry args={[0.018, 10, 10]} />
          <meshStandardMaterial color="#1c1c2a" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* LED bar housing */}
        <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.015, 0.015, 1.14, 10]} />
          <meshStandardMaterial color="#222230" metalness={0.92} roughness={0.22} />
        </mesh>
        {/* Warm white emitter strip */}
        <mesh position={[0, -0.012, 0.006]}>
          <boxGeometry args={[1.1, 0.005, 0.01]} />
          <meshStandardMaterial color="#FFE8C0" emissive="#FFE8C0" emissiveIntensity={4.0} />
        </mesh>
        {/* Ambient cool back light strip */}
        <mesh position={[0, 0.012, -0.006]}>
          <boxGeometry args={[1.1, 0.004, 0.006]} />
          <meshStandardMaterial color="#C4B5FD" emissive="#C4B5FD" emissiveIntensity={2.2} />
        </mesh>
        {/* Downward workspace spotlight */}
        <spotLight
          position={[0, -0.015, 0.012]}
          angle={Math.PI / 3.2}
          penumbra={0.68}
          intensity={6.5}
          distance={1.6}
          color="#FFEAD0"
          castShadow
        />
      </group>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════
   CAMERA PARALLAX RIG — dramatic, responsive mouse tracking
   ═══════════════════════════════════════════════════════ */
function CameraRig() {
  const { camera } = useThree();
  useFrame(({ pointer }) => {
    // More dramatic parallax range + faster lerp for snappy feel
    const targetX = pointer.x * 1.6 + 0.05;
    const targetY = pointer.y * 0.7 - 0.02;
    camera.position.x += (targetX - camera.position.x) * 0.07;
    camera.position.y += (targetY - camera.position.y) * 0.07;
    camera.lookAt(0.1, -0.3, 0);
  });
  return null;
}

/* ═══════════════════════════════════════════════════════
   MOUSE-FOLLOW LIGHT — dynamic highlight that tracks cursor
   ═══════════════════════════════════════════════════════ */
function MouseFollowLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  useFrame(({ pointer }) => {
    if (!lightRef.current) return;
    const targetX = pointer.x * 2.5;
    const targetY = pointer.y * 1.5 + 0.5;
    lightRef.current.position.x += (targetX - lightRef.current.position.x) * 0.06;
    lightRef.current.position.y += (targetY - lightRef.current.position.y) * 0.06;
  });
  return (
    <pointLight
      ref={lightRef}
      position={[0, 0.5, 1.8]}
      intensity={3.5}
      color="#A78BFA"
      distance={4.0}
    />
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN SCENE / MODEL WRAPPER — mouse-driven 3D rotation
   ═══════════════════════════════════════════════════════ */
function WorkstationModel() {
  const groupRef = useRef<THREE.Group>(null);
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  useFrame(({ pointer }) => {
    if (!groupRef.current) return;

    // ── Hover scale ──
    const targetScale = hovered ? 1.06 : 1.0;
    const nextScale = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08);
    groupRef.current.scale.setScalar(nextScale);

    // ── Mouse-driven 3D rotation (tilt entire workstation) ──
    const targetRotY = pointer.x * 0.12;
    const targetRotX = -pointer.y * 0.08;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group
      ref={groupRef}
      onClick={() => router.push("/skills")}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      <group position={[0.02, 0.16, 0]}>
        <DeskAndMat />
        <Monitor />
        <Keyboard />
        <Mouse />
        <PCTower />
        <Accessories />
      </group>
    </group>
  );
}

export function DeveloperCore() {
  return (
    <div className="glass-panel relative h-[420px] overflow-hidden rounded-lg group/canvas">
      <Canvas
        shadows
        camera={{ position: [0.05, -0.02, 2.32], fov: 44 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        className="h-full w-full bg-transparent"
        dpr={[1, 2]}
      >
        {/* ─── Ambient & Global ─── */}
        <ambientLight intensity={0.25} color="#9090C0" />

        {/* ─── Key Light (warm, front-right upper) ─── */}
        <directionalLight
          position={[2.8, 4.2, 1.6]}
          intensity={2.8}
          color="#FFF5E4"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-near={0.5}
          shadow-camera-far={15}
          shadow-camera-left={-4}
          shadow-camera-right={4}
          shadow-camera-top={4}
          shadow-camera-bottom={-4}
        />

        {/* ─── Fill Light (cool, left side) ─── */}
        <directionalLight position={[-3.0, 2.0, 1.5]} intensity={0.8} color="#A5B4FC" />

        {/* ─── Rim / Backlight (purple, rear) ─── */}
        <pointLight position={[-2.0, 2.2, -2.8]} intensity={5.0} color="#6366F1" />

        {/* ─── Ground bounce light ─── */}
        <pointLight position={[0, -1.5, 0.5]} intensity={1.4} color="#7C3AED" />

        {/* ─── Mouse-following dynamic light ─── */}
        <MouseFollowLight />

        {/* ─── Background depth fog ─── */}
        <fog attach="fog" args={["#06060E", 4.5, 13]} />

        {/* ─── Environment for reflections ─── */}
        <Environment preset="city" />

        {/* ─── Starfield (denser) ─── */}
        <Stars
          radius={14}
          depth={32}
          count={1400}
          factor={1.7}
          saturation={0.6}
          fade
          speed={0.9}
        />

        {/* ─── Main Workstation Scene ─── */}
        <Suspense fallback={null}>
          <Float speed={0.8} rotationIntensity={0.03} floatIntensity={0.045}>
            <WorkstationModel />
          </Float>
        </Suspense>

        <CameraRig />
      </Canvas>
      <div className="pointer-events-none absolute bottom-4 left-4 rounded-lg border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_86%,transparent)] px-3 py-2 text-xs text-[var(--app-muted)] backdrop-blur transition-opacity duration-300 group-hover/canvas:opacity-100 opacity-70">
        Move mouse to explore · Click workstation → Skills
      </div>
    </div>
  );
}

