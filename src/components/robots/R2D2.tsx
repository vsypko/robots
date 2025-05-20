import * as THREE from "three";
import { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { useRobots } from "../../context/RobotContext";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import type { CollisionTarget } from "@react-three/rapier";
import { movement } from "../../utils/movement";
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
  const robot = useRobots().find((robot) => Number(robot.id) === 0);
  const dispatch = useRobotsDispatch();
  const [init] = useState({ x: robot!.x, z: robot!.z });

  const handleCollisionEnter = (other: CollisionTarget) => {
    if (!rigidBodyRef.current || !robot || !other.rigidBodyObject) return;
    rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    rigidBodyRef.current.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
    rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    rigidBodyRef.current.setTranslation({ x: 0, y: 0, z: 0 }, true);

    const position = other.rigidBodyObject.position;

    const { x, z, angle } = movement("collision", robot.x, robot.z, robot.angle, robot.id, {
      x: position.x,
      z: position.z,
    });

    dispatch({ ...robot, x, z, angle });
  };

  useFrame(() => {
    if (rigidBodyRef.current && robot) {
      const quaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, robot.angle, 0));
      rigidBodyRef.current.setRotation(quaternion, true);
      rigidBodyRef.current.setTranslation({ x: robot.x, y: -0.55, z: robot.z }, true);
    }
  });

  return (
    <group>
      <RigidBody
        ref={rigidBodyRef}
        colliders="hull"
        onCollisionEnter={({ other }) => handleCollisionEnter(other)}
        scale={[4, 4, 4]}
        position={[init.x, -0.55, init.z]}
      >
        <group dispose={null}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_2.geometry}
            material={materials.R2D2Tex}
            rotation={[0, Math.PI, 0]}
          />
        </group>
      </RigidBody>
    </group>
  );
}

useGLTF.preload("/r2d2.glb");
