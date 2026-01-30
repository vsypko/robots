import { useCallback } from "react";
import { Group } from "three";
import type { RefObject } from "react";
import type { RapierRigidBody } from "@react-three/rapier";

const objects = new Map<string, RefObject<RapierRigidBody | Group>>();

// Registration hook.

export function useRegister() {
  const objectRegister = useCallback((objectRef: RefObject<RapierRigidBody | Group>, key: string) => {
    objects.set(key, objectRef);
  }, []);

  // Cleanup function for unmount event
  const clearRegister = useCallback(() => {
    objects.clear();
    // collisionParts.clear();
  }, []);

  return {
    objectRegister,
    clearRegister
  };
}

export const getObject = (key: string) => objects.get(key);
export const getObjects = () => objects;
