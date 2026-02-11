import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import type { OrthographicCamera as OrthographicCameraType } from 'three';
import Field from './Field';
import Robot from '../robots/Robot';
import { Physics } from '@react-three/rapier';
import { LidarPoints } from './LidarPoints';
import MainCamera from './MainCamera';
import useSettings from '../../context/useSettings';
import FrameEngine from '../../engine/FrameEngine';
import { initRobots } from '../../utils/types';

function MultiCameraRender({
  topCam,
  miniSize = 180,
}: {
  topCam: React.RefObject<OrthographicCameraType | null>;
  miniSize?: number;
}) {
  const { map } = useSettings();

  useFrame(({ gl, size, scene, camera }) => {
    const { width, height } = size;
    scene.updateMatrixWorld(true);
    camera.updateMatrixWorld(true);
    camera.updateProjectionMatrix();
    gl.autoClear = false;
    gl.setViewport(0, 0, width, height);
    gl.setScissor(0, 0, width, height);
    gl.render(scene, camera);

    if (topCam.current && map) {
      scene.updateMatrixWorld(true);
      topCam.current.updateMatrixWorld(true);
      topCam.current.updateProjectionMatrix();
      gl.setScissorTest(true);
      gl.setViewport(8, height - miniSize - 8, miniSize, miniSize);
      gl.setScissor(8, height - miniSize - 8, miniSize, miniSize);
      gl.render(scene, topCam.current!);
      gl.setScissorTest(false);
    }
  });

  return null;
}

export default function Court() {
  const topCamera = useRef<OrthographicCameraType>(null);
  const { light } = useSettings();

  return (
    <Canvas shadows className="flex w-full h-full">
      <MainCamera />
      <OrthographicCamera
        ref={topCamera}
        position={[0, 20, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        left={-20}
        right={20}
        top={20}
        bottom={-20}
        makeDefault={false}
        near={0.1}
        far={50}
      />

      <MultiCameraRender topCam={topCamera} />

      {light && (
        <group>
          <ambientLight intensity={2} />
          <directionalLight castShadow position={[40, 70, 30]} shadow-mapSize={[1024, 1024]} intensity={2}>
            <orthographicCamera attach="shadow-camera" args={[-30, 30, 30, -30]} />
          </directionalLight>
        </group>
      )}
      <Suspense fallback={null}>
        <Suspense fallback={null}>
          <Physics gravity={[0, -9.81, 0]}>
            <Field />
            {initRobots &&
              initRobots.map((robot) => (
                <Suspense fallback={null} key={robot.name}>
                  <Robot robot={robot} />
                </Suspense>
              ))}
            <LidarPoints />
            <FrameEngine />
          </Physics>
        </Suspense>
      </Suspense>
    </Canvas>
  );
}
