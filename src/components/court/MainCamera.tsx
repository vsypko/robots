import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';
import { useRobots } from '../../context/RobotContext';
import { useRef } from 'react';


export default function MainCamera() {
  const robots = useRobots();
  const selfCamera = robots.some(robot => robot.selfCamera);
  const controlsRef = useRef<OrbitControlsType | null>(null);


  if (!selfCamera) {
    return (
      <>
        <PerspectiveCamera makeDefault position={[0, 10, 25]} fov={60} near={0.1} far={1000} />
        <OrbitControls ref={controlsRef} />
      </>
    )
  } else {
    return null
  }
}
