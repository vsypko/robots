import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Points } from "@react-three/drei";
import { useRapier } from "@react-three/rapier";
import { useMemo, useRef } from "react";
import { useRobots } from "../../context/RobotContext";

type LidarProps = {
  maxDistance?: number;
  fovDegHorizontal?: number;
  fovDegVertical?: number;
  horizontalResolution?: number;
  verticalResolution?: number;
};

export function LidarPoints({
  maxDistance = 20,
  fovDegHorizontal = 80,
  fovDegVertical = 45,
  horizontalResolution = 100,
  verticalResolution = 40
}: LidarProps) {
  const { rapier, world } = useRapier();

  const pointsRef = useRef<THREE.Points>(null!);
  const materialRef = useRef<THREE.PointsMaterial>(null!);
  const frameCounterRef = useRef(0);
  const robots = useRobots();

  const totalPoints = horizontalResolution * verticalResolution;
  const positions = useMemo(() => new Float32Array(totalPoints * 3), [totalPoints]);
  const colors = useMemo(() => new Float32Array(totalPoints * 3), [totalPoints]);

  useFrame(({ camera }) => {
    if (!pointsRef.current || !world || !rapier || !robots.some((r) => r.selected)) return;

    const geometry = pointsRef.current.geometry;

    // Ensure camera's world matrix is up to date
    camera.updateMatrixWorld(true);

    const origin = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    camera.getWorldPosition(origin);
    camera.getWorldQuaternion(quaternion);

    const halfFovRadHorizontal = THREE.MathUtils.degToRad(fovDegHorizontal / 2);
    const halfFovRadVertical = THREE.MathUtils.degToRad(fovDegVertical / 2);
    const tanHalfFovHorizontal = Math.tan(halfFovRadHorizontal);
    const tanHalfFovVertical = Math.tan(halfFovRadVertical);

    let idx = 0;

    // Only cast rays every 10th frame
    if (frameCounterRef.current % 10 === 0) {
      for (let y = 0; y < verticalResolution; y++) {
        for (let x = 0; x < horizontalResolution; x++) {
          const u = (x / (horizontalResolution - 1)) * 2 - 1;
          const v = (y / (verticalResolution - 1)) * 2 - 1 - 0.5;

          const dir = new THREE.Vector3(u * tanHalfFovHorizontal, v * tanHalfFovVertical, -1).normalize();
          dir.applyQuaternion(quaternion);

          const ray = new rapier.Ray({ x: origin.x, y: origin.y, z: origin.z }, { x: dir.x, y: dir.y, z: dir.z });

          const hit = world.castRay(ray, maxDistance, true);

          let distance: number;
          let p: { x: number; y: number; z: number };

          if (hit) {
            distance = hit.timeOfImpact;
            p = ray.pointAt(distance);
          } else {
            // No hit - place point at max distance
            distance = maxDistance;
            p = ray.pointAt(maxDistance);
          }

          // Calculate color gradient from green (0x00FF00) at distance 1 to blue (0x0000FF) at distance 20
          const minDist = 1;
          const t = Math.max(0, Math.min(1, (distance - minDist) / (maxDistance - minDist)));
          const r = 0;
          const g = 1 - t; // Green: 1 at distance 1, 0 at distance 20
          const b = t; // Blue: 0 at distance 1, 1 at distance 20

          positions[idx] = p.x;
          positions[idx + 1] = p.y;
          positions[idx + 2] = p.z;

          colors[idx] = r;
          colors[idx + 1] = g;
          colors[idx + 2] = b;

          idx += 3;
        }
      }

      const count = idx / 3;
      geometry.setDrawRange(0, count);
      geometry.attributes.position.needsUpdate = true;

      if (!geometry.attributes.color) {
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      } else {
        // Update the color data directly
        const colorAttribute = geometry.attributes.color as THREE.BufferAttribute;
        colorAttribute.array = colors;
        colorAttribute.needsUpdate = true;
      }
    }

    frameCounterRef.current++;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <pointsMaterial ref={materialRef} size={0.05} sizeAttenuation vertexColors depthWrite={false} />
    </Points>
  );
}
