import { getEntity } from './entityRegister';
import { useFrame } from '@react-three/fiber';
import { Vector3, Quaternion } from 'three';
import { useRef } from 'react';
import { getActions } from './actionRegister';

export default function FrameEngine() {
  const DRIVE_SPEED = 3;
  const TURN_SPEED = -1;
  const bodyXRotation = useRef(0);

  useFrame((_, delta) => {
    const actions = getActions();
    if (!actions) return;

    for (const [key, action] of actions) {
      const entity = getEntity(key);
      if (!entity) continue;
      const { base, body } = entity;
      const { angvel, linvel } = action;

      if (!base) continue;
      base.setAngvel({ x: 0, y: angvel * TURN_SPEED, z: 0 }, true);

      const rotation = base.rotation();
      const baseQuat = new Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);
      const direction = new Vector3(0, 0, -1).applyQuaternion(baseQuat).normalize();

      const lv = base.linvel();
      const currentLinvel = new Vector3(lv.x, lv.y, lv.z).dot(direction);

      base.setLinvel(
        {
          x: direction.x * linvel * DRIVE_SPEED,
          y: lv.y,
          z: direction.z * linvel * DRIVE_SPEED,
        },
        true,
      );

      if (!body) continue;
      const restoringQuat = baseQuat.clone().invert();
      const RADIUS = 0.6;
      const rollDelta = (currentLinvel * delta) / RADIUS;
      bodyXRotation.current += rollDelta;
      const bodyQuat = new Quaternion().setFromAxisAngle(new Vector3(-1, 0, 0), bodyXRotation.current);
      body.quaternion.copy(restoringQuat.clone().premultiply(bodyQuat));
    }
  });

  return null;
}
