import { useFrame } from "@react-three/fiber";
import { memo, useEffect } from "react";
import * as THREE from "three";
import { getObject, getObjects, useRegister } from "./Register";
import { useRobots } from "../../context/RobotContext";

const frameEngine = memo(() => {
  const robots = useRobots();
  const robot = robots.find((r) => r.selected);

  const { clearRegister } = useRegister();
  const tempQuaternion = new THREE.Quaternion();

  useEffect(() => {
    return () => clearRegister();
  }, []);

  useFrame(({ clock }) => {
    if (!robot) return;
    const objectRef = getObject(`${robot.id}`);
    const rotativePertRef = getObject(`${robot.id}-rotative`);
  });

  return null;
});
export default frameEngine;
