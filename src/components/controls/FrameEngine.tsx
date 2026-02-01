import { getObject } from './engineRegister';
import { useFrame } from '@react-three/fiber';
import useJoystick from '../../context/useJoystick';
import type { RapierRigidBody } from '@react-three/rapier';
import { Vector3 } from 'three';

function FrameEngine() {
  const joystickRef = useJoystick();

  useFrame(() => {
    const { x, z } = joystickRef.current;
    const object = getObject('BB8');
    if (!object) return;
    const base = object.base as RapierRigidBody;
    if (!base) return;
    // const rot = base.rotation();
    // const cos = Math.cos(rot.y); // yaw
    // const sin = Math.sin(rot.y);
    const linearVelocity = new Vector3(x, 0, z);
    const angularVelocity = new Vector3(0, x * 0.7, 0);
    // const joint = objects.get("BB8")?.joint as Group;
    base.setLinvel(linearVelocity, true);
    base.setAngvel(angularVelocity, true);
  });

  return null;
}
export default FrameEngine;
