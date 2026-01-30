import * as THREE from "three";
import { useMemo, useRef } from "react";
// import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";

import { useRobotsDispatch } from "../../context/RobotContext";

import type { CollisionTarget } from "@react-three/rapier";
import type { GLTF } from "three-stdlib";
import type { Robot } from "../../utils/types";

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh;
    Object_6: THREE.Mesh;
    Object_8: THREE.Mesh;
    Object_9: THREE.Mesh;
  };

  materials: {
    Material: THREE.MeshStandardMaterial;
    ["Material.001"]: THREE.MeshStandardMaterial;
    lentes: THREE.MeshStandardMaterial;
    plastico: THREE.MeshStandardMaterial;
  };
};

// const TOLERANCE = 0.01;

// const isCloseToZero = (value: number): boolean => {
//   return Math.abs(value) < TOLERANCE;
// };

export default function BB8({ robot }: { robot: Robot }) {
  const dispatch = useRobotsDispatch();

  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const { x, y, z, angle } = robot;

  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const rotativObject = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF("/bb8.glb") as unknown as GLTFResult;

  const handleCollisionEnter = (other: CollisionTarget) => {
    if (!rigidBodyRef.current || !robot || !other.rigidBodyObject) return;
    rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    rigidBodyRef.current.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
    rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    rigidBodyRef.current.setTranslation({ x: 0, y: 0, z: 0 }, true);

    const position = other.rigidBodyObject.position;

    dispatch({
      type: "collision",
      payload: { id: robot.id, another: { x: position.x, y: position.y, z: position.z } }
    });
  };

  // useFrame(({ clock }) => {
  //   if (!rotativObject.current || !rigidBodyRef.current || !robot) return;
  //   const currentPosition = rigidBodyRef.current.translation();
  //   const dx = currentPosition.x - robot.x;
  //   const dz = currentPosition.z - robot.z;

  //   if (!isCloseToZero(dz)) rotativObject.current.rotation.x = -clock.getElapsedTime() * 5;
  //   if (!isCloseToZero(dx)) {
  //     if (currentPosition.x - robot.x > 0) rotativObject.current.rotation.z = -clock.getElapsedTime() * 5;
  //     if (currentPosition.x - robot.x < 0) rotativObject.current.rotation.z = clock.getElapsedTime() * 5;
  //   }

  //   const quaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, robot.angle, 0));
  //   rigidBodyRef.current.setRotation(quaternion, true);

  //   if (!isCloseToZero(dz) || !isCloseToZero(dx)) rotativObject.current.rotation.y = robot.angle;
  //   rigidBodyRef.current.setTranslation({ x: robot.x, y: robot.y, z: robot.z }, true);
  // });

  const position = useMemo(() => new THREE.Vector3(x, y, z), [x, y, z]);

  const originRotation = useMemo(
    () => new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, angle, "ZYX")),
    [angle]
  );

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders="hull"
      onCollisionEnter={({ other }) => handleCollisionEnter(other)}
      position={[x, y, z]}
    >
      <group dispose={null}>
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault={robot?.selected}
          up={[0, 1, 0]}
          position={[0, 1.6, -0.6]}
          fov={60}
          near={0.01}
          far={100}
        />
        <group name="root" scale={[0.8, 0.8, 0.8]}>
          <group name="GLTF_SceneRootNode">
            <group name="Cuerpo_1" ref={rotativObject}>
              <mesh
                name="Object_4"
                castShadow
                receiveShadow
                geometry={nodes.Object_4.geometry}
                material={materials.Material}
              />
            </group>
            <group name="Cabeza_3" rotation={[-Math.PI, 0.39, -Math.PI]}>
              <mesh
                name="Object_6"
                castShadow
                receiveShadow
                geometry={nodes.Object_6.geometry}
                material={materials["Material.001"]}
              />
              <group name="opticos_2" position={[-0.194, 1.141, -0.468]} rotation={[2.639, -0.346, 2.957]}>
                <mesh
                  name="Object_8"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_8.geometry}
                  material={materials.lentes}
                />
                <mesh
                  name="Object_9"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_9.geometry}
                  material={materials.plastico}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload("/bb8.glb");
