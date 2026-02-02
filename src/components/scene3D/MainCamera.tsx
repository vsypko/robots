import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useRef, useEffect } from "react";
import type { PerspectiveCamera as PerspectiveCameraType } from "three";
import { type OrbitControls as OrbitControlsType } from "three-stdlib";
import useSettings from "../../context/useSettings";

const INITIAL_POSITION = [0, 5, 20] as const;

export default function MainCamera() {
  const { selected } = useSettings();
  const mainCamRef = useRef<PerspectiveCameraType>(null);
  const controlsRef = useRef<OrbitControlsType>(null);

  // Reset camera position when switching away from main camera
  useEffect(() => {
    if (!selected && mainCamRef.current && controlsRef.current) {
      mainCamRef.current.position.set(...INITIAL_POSITION);
      mainCamRef.current.rotation.set(0, 0, 0);
      controlsRef.current.reset();
    }
  }, [selected]);

  return (
    <>
      <PerspectiveCamera
        ref={mainCamRef}
        makeDefault={!selected}
        position={INITIAL_POSITION}
        fov={60}
        near={0.1}
        far={1000}
      />
      {!selected && <OrbitControls ref={controlsRef} camera={mainCamRef.current!} />}
    </>
  );
}
