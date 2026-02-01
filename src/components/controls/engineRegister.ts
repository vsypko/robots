// import { useCallback } from 'react';
import type { Other, RobotRegisterType } from '../../utils/types';
import type { RapierRigidBody } from '@react-three/rapier';
import type { Group } from 'three';

const objects = new Map<string, RobotRegisterType>();

// Registration hook.

export function useRegister() {
  const robotRegister = (object: RapierRigidBody | Group | Other, rotative: boolean, key: string) => {
    const reg: RobotRegisterType = {};
    if (rotative) {
      register({ ...reg, joint: object as Group }, key);
    } else {
      register({ ...reg, base: object as RapierRigidBody }, key);
    }
  };

  const register = (robot: RobotRegisterType, key: string) => {
    objects.set(key, robot);
  };

  // Cleanup function for unmount event
  const clearRegister = () => {
    objects.clear();
  };

  return {
    robotRegister,
    clearRegister,
  };
}

export const getObject = (key: string) => objects.get(key);
export const getObjects = () => objects;
