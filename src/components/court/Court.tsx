import { Suspense, useContext, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import type { PerspectiveCamera as PerspectiveCameraType } from "three";
import Field from "./Field";
import { useRobots } from "../../context/RobotContext";
import Robot from "../robots/Robot";
import { Physics } from "@react-three/rapier";
import { CameraContext } from "../../context/CameraContext";

function MultiCameraRender({
  mainCam,
  topCam,
  robotCam,
  miniSize = 300,
}: {
  mainCam: React.RefObject<PerspectiveCameraType | null>;
  topCam: React.RefObject<PerspectiveCameraType | null>;
  robotCam: React.RefObject<PerspectiveCameraType | null>;

  miniSize?: number;
}) {
  const { gl, size, scene } = useThree();
  const { selfCamera } = useContext(CameraContext);
  useFrame(() => {
    const width = size.width;
    const height = size.height;
    gl.autoClear = true;

    gl.setViewport(0, 0, width, height);
    gl.setScissor(0, 0, width, height);
    gl.setScissorTest(true);
    if (mainCam.current && !selfCamera) gl.render(scene, mainCam.current!);
    if (robotCam.current && selfCamera) gl.render(scene, robotCam.current!);
    gl.autoClear = true;
    gl.clearDepth();

    gl.setViewport(10, height - miniSize - 10, miniSize, miniSize);
    gl.setScissor(10, height - miniSize - 10, miniSize, miniSize);
    gl.setScissorTest(true);
    if (topCam.current) {
      topCam.current.aspect = 1;
      // topCam.current.updateMatrixWorld();
      topCam.current.updateProjectionMatrix();
      gl.render(scene, topCam.current!);
    }
    gl.setScissorTest(false);
  }, 1);

  return null;
}

export default function Court() {
  const robots = useRobots();
  const { selfCamera } = useContext(CameraContext);
  const mainCamera = useRef<PerspectiveCameraType>(null);
  const topCamera = useRef<PerspectiveCameraType>(null);
  const robotCamera = useRef<PerspectiveCameraType>(null);

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
          position={[0, 35, 0]}
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
                  <Robot robot={robot.name} camera={robotCamera} />
                </Suspense>
              ))}
          </Physics>
        </Suspense>
        <MultiCameraRender mainCam={mainCamera} topCam={topCamera} robotCam={robotCamera} />
      </Canvas>
    </>
  );
}
