import * as THREE from 'three';
import { useContext, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, useGLTF } from '@react-three/drei';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';

import { useRobots } from '../../context/RobotContext';
import { movement } from '../../utils/movement';
import { useRobotsDispatch } from '../../context/RobotContext';

import type { CollisionTarget } from '@react-three/rapier';
import type { GLTF } from 'three-stdlib';
import { CameraContext } from '../../context/CameraContext';

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh;
    Object_6: THREE.Mesh;
    Object_8: THREE.Mesh;
    Object_9: THREE.Mesh;
  };

  materials: {
    Material: THREE.MeshStandardMaterial;
    ['Material.001']: THREE.MeshStandardMaterial;
    lentes: THREE.MeshStandardMaterial;
    plastico: THREE.MeshStandardMaterial;
  };
};

const TOLERANCE = 0.01;

const isCloseToZero = (value: number): boolean => {
  return Math.abs(value) < TOLERANCE;
};

export default function BB8() {
  const robots = useRobots();
  const dispatch = useRobotsDispatch();
  const { selfCamera } = useContext(CameraContext);

  const robot = robots.find((robot) => robot.id === 1);
  const [init] = useState({ x: robot!.x, z: robot!.z });

  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const rotativObject = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF('/bb8.glb') as unknown as GLTFResult;

  const handleCollisionEnter = (other: CollisionTarget) => {
    if (!rigidBodyRef.current || !robot || !other.rigidBodyObject) return;
    rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    rigidBodyRef.current.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
    rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    rigidBodyRef.current.setTranslation({ x: 0, y: 0, z: 0 }, true);

    const position = other.rigidBodyObject.position;

    const { x, z, angle } = movement('collision', robot.x, robot.z, robot.angle, robot.id, {
      x: position.x,
      z: position.z,
    });
    dispatch({ ...robot, x, z, angle });
  };

  useFrame(({ clock }) => {
    if (!rotativObject.current || !rigidBodyRef.current || !robot) return;
    const currentPosition = rigidBodyRef.current.translation();
    const dx = currentPosition.x - robot.x;
    const dz = currentPosition.z - robot.z;

    if (!isCloseToZero(dz)) rotativObject.current.rotation.x = -clock.getElapsedTime() * 5;
    if (!isCloseToZero(dx)) {
      if (currentPosition.x - robot.x > 0) rotativObject.current.rotation.z = -clock.getElapsedTime() * 5;
      if (currentPosition.x - robot.x < 0) rotativObject.current.rotation.z = clock.getElapsedTime() * 5;
    }

    const quaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, robot.angle, 0));
    rigidBodyRef.current.setRotation(quaternion, true);

    if (!isCloseToZero(dz) || !isCloseToZero(dx)) rotativObject.current.rotation.y = robot.angle;
    rigidBodyRef.current.setTranslation({ x: robot.x, y: 0.45, z: robot.z }, true);
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders="hull"
      onCollisionEnter={({ other }) => handleCollisionEnter(other)}
      position={[init.x, 0.45, init.z]}
      scale={[0.8, 0.8, 0.8]}
    >
      <group dispose={null}>
        <group name="root">
          {selfCamera && <PerspectiveCamera makeDefault position={[0, 2.5, 0]} fov={60} near={0.01} far={100} />}
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
                material={materials['Material.001']}
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

useGLTF.preload('/bb8.glb');
