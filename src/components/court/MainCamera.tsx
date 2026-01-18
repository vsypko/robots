import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';
import { useContext, useRef } from 'react';
import { CameraContext } from '../../context/CameraContext';

export default function MainCamera() {
  const controlsRef = useRef<OrbitControlsType | null>(null);
  const { selfCamera } = useContext(CameraContext);

  if (selfCamera === 0) {
    return (
      <>
        <PerspectiveCamera makeDefault={selfCamera === 0} position={[0, 10, 25]} fov={60} near={0.1} far={1000} />
        <OrbitControls ref={controlsRef} />
      </>
    )
  } else {
    return null
  }
}
