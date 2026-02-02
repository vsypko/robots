import { getObject } from "./engineRegister";
import { useFrame } from "@react-three/fiber";
import useJoystick from "../../context/useJoystick";
import { Vector3, Quaternion } from "three";
import { useRef } from "react";

export default function FrameEngine() {
  const joystickRef = useJoystick();
  const DRIVE_SPEED = 3;
  const TURN_SPEED = -1;
  const bodyXRotation = useRef(0);

  useFrame(() => {
    const { x, z } = joystickRef.current;
    const object = getObject("BB8");
    if (!object) return;
    const { base, body } = object;

    if (!base) return;
    base.setAngvel({ x: 0, y: x * TURN_SPEED, z: 0 }, true);

    const rotation = base.rotation();
    const quaternion = new Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);
    const direction = new Vector3(0, 0, -1).applyQuaternion(quaternion).normalize();

    const linvel = base.linvel();
    const currentVelocity = new Vector3(linvel.x, linvel.y, linvel.z).dot(direction);
    const delta = z * DRIVE_SPEED - currentVelocity;

    base.setLinvel(
      {
        x: direction.x * delta,
        y: linvel.y,
        z: direction.z * delta
      },
      true
    );

    if (!body) return;
    const targetRotation = bodyXRotation.current + -z * 0.2;
    bodyXRotation.current += (targetRotation - bodyXRotation.current) * 0.1;
    body.rotation.set(bodyXRotation.current, 0, 0);
  });

  return null;
}
