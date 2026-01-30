import * as THREE from "three";
import { useRef, useState } from "react";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import type { CollisionTarget } from "@react-three/rapier";
import { useRobotsDispatch } from "../../context/RobotContext";
import type { Robot } from "../../utils/types";

type GLTFResult = GLTF & {
  nodes: {
    ["Object002_01_-_Default_0_1"]: THREE.Mesh;
    ["Object002_01_-_Default_0_2"]: THREE.Mesh;
    ["Object002_01_-_Default_0_3"]: THREE.Mesh;
    ["Object002_01_-_Default_0_4"]: THREE.Mesh;
    ["Object002_01_-_Default_0_5"]: THREE.Mesh;
    ["Sphere001_03_-_Default_0_1"]: THREE.Mesh;
    ["Sphere001_03_-_Default_0_2"]: THREE.Mesh;
    ["Sphere001_03_-_Default_0_3"]: THREE.Mesh;
  };
  materials: {
    ["01_-_Default"]: THREE.MeshStandardMaterial;
    ["07_-_Default"]: THREE.MeshStandardMaterial;
    ["02_-_Default"]: THREE.MeshStandardMaterial;
    ["03_-_Default"]: THREE.MeshStandardMaterial;
    ["08_-_Default"]: THREE.MeshStandardMaterial;
  };
};

const TOLERANCE = 0.01;

const isCloseToZero = (value: number): boolean => {
  return Math.abs(value) < TOLERANCE;
};

export default function BB9({ robot }: { robot: Robot }) {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const rotative = useRef<THREE.Group | null>(null);
  const { nodes, materials } = useGLTF("/bb9.glb") as unknown as GLTFResult;

  const dispatch = useRobotsDispatch();

  const [init] = useState({ x: robot!.x, y: robot!.y, z: robot!.z });
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

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

  useFrame(({ clock }) => {
    if (!rotative.current || !rigidBodyRef.current || !robot) return;

    const currentPosition = rigidBodyRef.current.translation();
    const dx = currentPosition.x - robot.x;
    const dz = currentPosition.z - robot.z;

    if (!isCloseToZero(dz)) rotative.current.rotation.x = -clock.getElapsedTime() * 4;
    if (!isCloseToZero(dx)) {
      if (currentPosition.x - robot.x > 0) rotative.current.rotation.z = -clock.getElapsedTime() * 4;
      if (currentPosition.x - robot.x < 0) rotative.current.rotation.z = clock.getElapsedTime() * 4;
    }

    const quaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, robot.angle, 0));
    rigidBodyRef.current.setRotation(quaternion, true);
    if (!isCloseToZero(dz) || !isCloseToZero(dx)) rotative.current.rotation.y = robot.angle;
    rigidBodyRef.current.setTranslation({ x: robot.x, y: robot.y, z: robot.z }, true);
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders="hull"
      onCollisionEnter={({ other }) => handleCollisionEnter(other)}
      position={[init.x, init.y, init.z]}
    >
      <group dispose={null}>
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault={robot?.selected}
          up={[0, 1, 0]}
          position={[0, 3.8, -0.9]}
          fov={60}
          near={0.01}
          far={100}
        />
        <group position={[0, 3.228, 0]} rotation={[-Math.PI / 2, 0, -Math.PI]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["Object002_01_-_Default_0_1"].geometry}
            material={materials["01_-_Default"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["Object002_01_-_Default_0_2"].geometry}
            material={materials["07_-_Default"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["Object002_01_-_Default_0_3"].geometry}
            material={materials["02_-_Default"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["Object002_01_-_Default_0_4"].geometry}
            material={materials["03_-_Default"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["Object002_01_-_Default_0_5"].geometry}
            material={materials["08_-_Default"]}
          />
        </group>
        <group position={[0, 1.674, 0]} ref={rotative}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["Sphere001_03_-_Default_0_1"].geometry}
            material={materials["03_-_Default"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["Sphere001_03_-_Default_0_2"].geometry}
            material={materials["01_-_Default"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["Sphere001_03_-_Default_0_3"].geometry}
            material={materials["02_-_Default"]}
          />
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload("/bb9.glb");
