import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Points } from '@react-three/drei';
import { useRapier } from '@react-three/rapier';
import { useEffect, useMemo, useRef } from 'react';
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

  useEffect(() => {
    if (!pointsRef.current) return;
    const geometry = pointsRef.current.geometry;
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(({ camera }) => {
    if (!pointsRef.current || !world || !rapier) return;

    if (!selected || !fpv) {
      pointsRef.current.geometry.setDrawRange(0, 0);
      return;
    }

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

        const distance = hit.timeOfImpact;
        const p = ray.pointAt(distance);

        positions[idx] = p.x;
        positions[idx + 1] = p.y;
        positions[idx + 2] = p.z;

        const t = Math.max(0, Math.min(1, (distance - minDistance) / (maxDistance - minDistance)));
        colors[idx] = 1 - t;
        colors[idx + 1] = 1 - t;
        colors[idx + 2] = t;

        idx += 3;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.color.needsUpdate = true;
    pointsRef.current.geometry.setDrawRange(0, idx / 3);
    frameCounterRef.current++;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <pointsMaterial
        ref={materialRef}
        size={3}
        sizeAttenuation={false}
        vertexColors={true}
        depthWrite={false}
        color="white"
      />
    </Points>
  );
}
