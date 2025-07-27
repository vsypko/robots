import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function MainCamera({ cameraRef }: { cameraRef: React.RefObject<THREE.PerspectiveCamera | null> }) {
  const controlsRef = useRef<OrbitControlsType | null>(null);

  useEffect(() => {
    if (cameraRef.current && controlsRef.current) {
      controlsRef.current.object = cameraRef.current;
    }
  }, [cameraRef]);

  return (
    <>
      <PerspectiveCamera ref={cameraRef} position={[0, 7, 20]} fov={60} near={0.1} far={1000} />
      <OrbitControls ref={controlsRef} />
    </>
  );
}
