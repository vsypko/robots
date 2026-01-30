import { useCallback } from "react";
import { Group } from "three";
import type { RefObject } from "react";
import type { RapierRigidBody } from "@react-three/rapier";

// Define internal registries.

const objects = new Map<string, RefObject<RapierRigidBody | Group>>();
// const moveable = new Map<string, RefObject<Group>>();

// Registration hook.

export function useRegistry() {
  // Rotative parts registry
  const registerRotative = useCallback((objectRef: RefObject<RapierRigidBody | Group>, key: string) => {
    objects.set(key, objectRef);
  }, []);

  // Collision part registry
  // const registerRotationPart = useCallback((meshRef: RefObject<Mesh>, key: string) => {
  //   const list = collisionParts.get(key);

  //   if (list) {
  //     if (!list.includes(meshRef)) list.push(meshRef);
  //   } else {
  //     collisionParts.set(key, [meshRef]);
  //   }
  // }, []);

  // Cleanup function for unmount event
  const clearRegistry = useCallback(() => {
    objects.clear();
    // collisionParts.clear();
  }, []);

  return {
    registerRotative,
    // registerCollisionPart,
    clearRegistry
  };
}

// Read acces.

export const getRotative = () => objects;
// export const getCollisionParts = () => collisionParts;
