import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useRapier } from '@react-three/rapier';
import { useMemo, useRef } from 'react';
import useSettings from '../../context/useSettings';

type LidarProps = {
  maxDistance?: number;
  minDistance?: number;
  horizontal?: number;
  vertical?: number;
};

export function LidarPoints({ maxDistance = 30, minDistance = 1, horizontal = 75, vertical = 45 }: LidarProps) {
  const { rapier, world } = useRapier();
  const { selected, fpv } = useSettings();
  const pointsRef = useRef<THREE.Points>(null!);
  const materialRef = useRef<THREE.PointsMaterial>(null!);
  const frameCounterRef = useRef(0);

  const totalPoints = horizontal * vertical;
  const positions = useMemo(() => new Float32Array(totalPoints * 3), [totalPoints]);
  const colors = useMemo(() => new Float32Array(totalPoints * 3), [totalPoints]);
  const origin = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();

  const halfFovRadHorizontal = THREE.MathUtils.degToRad(horizontal / 2);
  const halfFovRadVertical = THREE.MathUtils.degToRad(vertical / 2);
  const tanHalfFovHorizontal = Math.tan(halfFovRadHorizontal);
  const tanHalfFovVertical = Math.tan(halfFovRadVertical);

  useFrame(({ camera }) => {
    if (!pointsRef.current || !world || !rapier) return;

    const geometry = pointsRef.current.geometry;

    if (!selected || !fpv) {
      geometry.setDrawRange(0, 0);
      return;
    }

    // Ensure camera's world matrix is up to date
    camera.getWorldPosition(origin);
    camera.getWorldQuaternion(quaternion);

    let idx = 0;

    for (let y = 1; y < vertical; y++) {
      for (let x = 1; x < horizontal; x++) {
        const u = (x / horizontal) * 2 - 1;
        const v = (y / vertical) * 2 - 1;

        const dir = new THREE.Vector3(u * tanHalfFovHorizontal, v * tanHalfFovVertical, -1).normalize();
        dir.applyQuaternion(quaternion);

        const ray = new rapier.Ray({ x: origin.x, y: origin.y, z: origin.z }, { x: dir.x, y: dir.y, z: dir.z });

        const hit = world.castRay(ray, maxDistance, true);
        if (!hit) continue;

        // let distance: number;
        // let p: { x: number; y: number; z: number };

        const distance = hit.timeOfImpact;
        const p = ray.pointAt(distance);

        // Calculate color gradient from green (0x00FF00) at distance 1 to blue (0x0000FF) at distance 20

        const t = Math.max(0, Math.min(1, (distance - minDistance) / (maxDistance - minDistance)));

        positions[idx] = p.x;
        positions[idx + 1] = p.y;
        positions[idx + 2] = p.z;

        colors[idx] = 0;
        colors[idx + 1] = 1 - t;
        colors[idx + 2] = t;

        idx += 3;
      }

      geometry.setDrawRange(0, idx / 3);

      if (!geometry.attributes.color) {
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;
    }

    frameCounterRef.current++;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial ref={materialRef} size={0.05} sizeAttenuation={true} vertexColors={true} depthWrite={false} />
    </Points>
  );
}
