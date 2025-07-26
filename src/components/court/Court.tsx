import { Suspense, useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Field from './Field';
import { useRobots } from '../../context/RobotContext';
import Robot from '../robots/Robot';
import { Physics } from '@react-three/rapier';
import { CameraContext } from '../../context/CameraContext';

export default function Court() {
  const robots = useRobots();
  const { selfCamera } = useContext(CameraContext);
  return (
    <Canvas
      shadows
      gl={{ preserveDrawingBuffer: true }}
      camera={{ position: [0, 7, 20], fov: 60, near: 0.01, far: 100 }}
    >
      {!selfCamera && <OrbitControls />}

      <ambientLight intensity={2} />
      <directionalLight castShadow position={[40, 70, 30]} shadow-mapSize={[1024, 1024]} intensity={2}>
        <orthographicCamera attach="shadow-camera" args={[-50, 50, 50, -50, 0.01, 1000]} />
      </directionalLight>
      <Suspense fallback={null}>
        <Physics gravity={[0, 0, 0]}>
          <Field />
          {robots &&
            robots.map((robot) => (
              <Suspense fallback={null} key={robot.id}>
                <Robot robot={robot.name} />
              </Suspense>
            ))}
        </Physics>
      </Suspense>
    </Canvas>
  );
}
