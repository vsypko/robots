import { Suspense, useContext, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import type { PerspectiveCamera as PerspectiveCameraType } from 'three';
import Field from './Field';
import { useRobots } from '../../context/RobotContext';
import Robot from '../robots/Robot';
import { Physics } from '@react-three/rapier';
import { CameraContext } from '../../context/CameraContext';
import MainCamera from './MainCamera';

function MultiCameraRender({
  mainCam,
  topCam,
  miniSize = 300,
}: {
  mainCam: React.RefObject<PerspectiveCameraType | null>;
  topCam: React.RefObject<PerspectiveCameraType | null>;
  miniSize?: number;
}) {
  const { gl, size, scene } = useThree();
  useEffect(() => {
    gl.autoClear = false;
  }, [gl]);

  useFrame(() => {
    const width = size.width;
    const height = size.height;

    gl.setScissorTest(true);

    gl.setViewport(0, 0, width, height);
    gl.setScissor(0, 0, width, height);
    gl.clear(true, true, true);
    if (mainCam.current) gl.render(scene, mainCam.current!);

    // gl.setViewport(10, height - miniSize - 10, miniSize, miniSize);
    // gl.setScissor(10, height - miniSize - 10, miniSize, miniSize);
    // gl.clear(true, true, true);
    // if (topCam.current) gl.render(scene, topCam.current!);

    gl.setScissorTest(false);
  });

  return null;
}

export default function Court() {
  const robots = useRobots();
  const { selfCamera } = useContext(CameraContext);
  const mainCamera = useRef<PerspectiveCameraType>(null);
  const topCamera = useRef<PerspectiveCameraType>(null);

  return (
    <>
      <Canvas shadows className="flex w-full h-full">
        {!selfCamera && (
          <>
            <PerspectiveCamera ref={mainCamera} makeDefault position={[0, 10, 25]} fov={60} near={0.01} far={1000} />
            <OrbitControls />
          </>
          // <MainCamera cameraRef={mainCamera} />
        )}
        <PerspectiveCamera
          ref={topCamera}
          position={[0, 40, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fov={60}
          near={0.01}
          far={100}
        />
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
        <MultiCameraRender mainCam={mainCamera} topCam={topCamera} />
      </Canvas>
    </>
  );
}
