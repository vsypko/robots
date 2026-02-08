// import { useCallback } from 'react';
import type { EntityRegisterType } from '../utils/types';
import type { RapierRigidBody } from '@react-three/rapier';
import type { Group, Mesh } from 'three';

const entities = new Map<string, EntityRegisterType>();

// Registration hook.
export function useEntityRegister() {
  const robotRegister = (object: RapierRigidBody | Group | Mesh, part: string, key: string) => {
    const existing = entities.get(key) || {};
    register({ ...existing, [part]: object }, key);
  };

  const register = (robot: EntityRegisterType, key: string) => {
    entities.set(key, robot);
  };

  // Cleanup function for unmount event
  const clearRegister = () => {
    entities.clear();
  };

  return {
    robotRegister,
    clearRegister,
  };
}

export const getEntity = (key: string) => entities.get(key);
export const getEntities = () => entities;
