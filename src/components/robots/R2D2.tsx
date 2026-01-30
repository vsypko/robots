import * as THREE from "three";
import { useRef, useState } from "react";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { useRobots } from "../../context/RobotContext";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import type { CollisionTarget } from "@react-three/rapier";
import { useRobotsDispatch } from "../../context/RobotContext";

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
  };
  materials: {
    R2D2Tex: THREE.MeshStandardMaterial;
  };
};

export default function R2D2() {
  const { nodes, materials } = useGLTF("/r2d2.glb") as unknown as GLTFResult;
  const rigidBodyRef = useRef<RapierRigidBody | null>(null);

  //get robot data from context and rerender ---------------------------------
  const robots = useRobots();
  const robot = robots.find((robot) => Number(robot.id) === 1);
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

  useFrame(() => {
    if (rigidBodyRef.current && robot) {
      const quaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, robot.angle, 0));
      rigidBodyRef.current.setRotation(quaternion, true);
      rigidBodyRef.current.setTranslation({ x: robot.x, y: robot.y, z: robot.z }, true);
    }
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
          position={[0, 3.7, -0.5]}
          up={[0, 1, 0]}
          fov={60}
          near={0.01}
          far={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.R2D2Tex}
          rotation={[0, Math.PI, 0]}
          scale={[4, 4, 4]}
        />
      </group>
    </RigidBody>
  );
}

useGLTF.preload("/r2d2.glb");
