import { useCallback } from "react";
import { Group } from "three";
import type { RefObject } from "react";

// Define internal registries.

const rotative = new Map<string, RefObject<Group>>();
// const moveable = new Map<string, RefObject<Group>>();

// Registration hook.

export function useRegistry() {
  // Rotative parts registry
  const registerRotative = useCallback((groupRef: RefObject<Group>, key: string) => {
    rotative.set(key, groupRef);
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
    rotative.clear();
    // collisionParts.clear();
  }, []);

  return {
    registerRotative,
    // registerCollisionPart,
    clearRegistry
  };
}

// Read acces.

export const getRotative = () => rotative;
// export const getCollisionParts = () => collisionParts;
