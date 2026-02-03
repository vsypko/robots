import { getObject } from "./engineRegister";
import { useFrame } from "@react-three/fiber";
import useJoystick from "../../context/useJoystick";
import { Vector3, Quaternion } from "three";
import { useRef } from "react";
import useSettings from "../../context/useSettings";

export default function FrameEngine() {
  const joystickRef = useJoystick();
  const DRIVE_SPEED = 3;
  const TURN_SPEED = -1;
  const bodyXRotation = useRef(0);
  const { selected } = useSettings();

  useFrame((_, delta) => {
    const { x, z } = joystickRef.current;
    const object = getObject(selected);
    if (!object) return;
    const { base, body } = object;

    if (!base) return;
    base.setAngvel({ x: 0, y: x * TURN_SPEED, z: 0 }, true);

    const rotation = base.rotation();
    const baseQuat = new Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);
    const direction = new Vector3(0, 0, -1).applyQuaternion(baseQuat).normalize();

    const linvel = base.linvel();
    const currentLinvel = new Vector3(linvel.x, linvel.y, linvel.z).dot(direction);

    base.setLinvel(
      {
        x: direction.x * z * DRIVE_SPEED,
        y: linvel.y,
        z: direction.z * z * DRIVE_SPEED
      },
      true
    );

    if (!body) return;
    // body.quaternion.copy(baseQuat.clone().invert());

    const restoringQuat = baseQuat.clone().invert();
    const RADIUS = 0.6;
    const rollDelta = (currentLinvel * delta) / RADIUS;
    bodyXRotation.current += rollDelta;
    const bodyQuat = new Quaternion().setFromAxisAngle(new Vector3(-1, 0, 0), bodyXRotation.current);
    body.quaternion.copy(restoringQuat.clone().premultiply(bodyQuat));
  });

  return null;
}
