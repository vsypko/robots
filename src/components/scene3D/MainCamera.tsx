import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useRobots } from "../../context/RobotContext";
import type { PerspectiveCamera as PerspectiveCameraType } from "three";
import type { OrbitControls as OrbitControlsType } from "three-stdlib";

const INITIAL_POSITION = [0, 5, 20] as const;

export default function MainCamera() {
  const mainCamRef = useRef<PerspectiveCameraType>(null);
  const controlsRef = useRef<OrbitControlsType>(null);
  const robots = useRobots();
  const isMainCamera = robots.every((r) => !r.selected);

  // Reset camera position when switching away from main camera
  useEffect(() => {
    if (!isMainCamera && mainCamRef.current && controlsRef.current) {
      mainCamRef.current.position.set(...INITIAL_POSITION);
      mainCamRef.current.rotation.set(0, 0, 0);
      controlsRef.current.reset();
    }
  }, [isMainCamera]);

  return (
    <>
      <PerspectiveCamera
        ref={mainCamRef}
        makeDefault={isMainCamera}
        position={INITIAL_POSITION}
        fov={60}
        near={0.1}
        far={100}
      />
      {isMainCamera && <OrbitControls ref={controlsRef} camera={mainCamRef.current!} makeDefault={isMainCamera} />}
    </>
  );
}
