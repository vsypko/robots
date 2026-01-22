import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import type { OrthographicCamera as OrthographicCameraType } from 'three';
import Field from './Field';
import { useRobots } from '../../context/RobotContext';
import Robot from '../robots/Robot';
import { Physics } from '@react-three/rapier';
import { LidarPoints } from './LidarPoints';
import MainCamera from './MainCamera';

function MultiCameraRender({
  topCam,
  miniSize = 300,
}: {
  topCam: React.RefObject<OrthographicCameraType | null>;
  miniSize?: number;
}) {
  useFrame(({ gl, size, scene, camera }) => {
    const height = size.height;
    gl.autoClear = false;
    gl.setViewport(0, 0, size.width, size.height);
    gl.setScissor(0, 0, size.width, size.height);
    gl.render(scene, camera);

    gl.clearDepth();

    if (topCam.current) {
      gl.setScissorTest(true);
      gl.setViewport(10, height - miniSize - 10, miniSize, miniSize);
      gl.setScissor(10, height - miniSize - 10, miniSize, miniSize);

      topCam.current.updateProjectionMatrix();
      gl.render(scene, topCam.current!);

      gl.setScissorTest(false);
    }
  });

  return null;
}

export default function Court() {
  const robots = useRobots();
  const topCamera = useRef<OrthographicCameraType>(null);

  return (
    <Canvas shadows className="flex w-full h-full">
      <MainCamera />
      <OrthographicCamera
        ref={topCamera}
        position={[0, 10, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        left={-20}
        right={20}
        top={20}
        bottom={-20}
        makeDefault={false}
      />
      <MultiCameraRender topCam={topCamera} />
      <LidarPoints />
      <ambientLight intensity={2} />
      <directionalLight castShadow position={[40, 70, 30]} shadow-mapSize={[1024, 1024]} intensity={2}>
        <orthographicCamera attach="shadow-camera" args={[-30, 30, 30, -30]} />
      </directionalLight>

      <Suspense fallback={null}>
        <Physics gravity={[0, 0, 0]}>
          <Field />
          {robots &&
            robots.map((robot) => (
              <Suspense fallback={null} key={robot.id}>
                <Robot key={robot.id} robot={robot.name} />
              </Suspense>
            ))}
        </Physics>

      </Suspense>

    </Canvas>
  );
}
