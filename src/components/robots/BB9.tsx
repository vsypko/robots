import * as THREE from "three";
import { useContext, useRef, useState } from "react";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { useRobots } from "../../context/RobotContext";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import type { CollisionTarget } from "@react-three/rapier";
import { movement } from "../../utils/movement";
import { useRobotsDispatch } from "../../context/RobotContext";
import type { PerspectiveCamera as PerspectiveCameraType } from "three";
import { CameraContext } from "../../context/CameraContext";
import { useMissions } from "../../context/MissionContext";

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

export default function BB9({ camera }: { camera: React.RefObject<PerspectiveCameraType | null> }) {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const rotative = useRef<THREE.Group | null>(null);
  const { nodes, materials } = useGLTF("/bb9.glb") as unknown as GLTFResult;

  const robots = useRobots();
  const dispatch = useRobotsDispatch();
  const { selfCamera } = useContext(CameraContext);
  const missions = useMissions();
  const mission = missions.find((mission) => mission.selected);
  const robot = robots.find((robot) => robot.id === 2);
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
    rigidBodyRef.current.setTranslation({ x: robot.x, y: -0.6, z: robot.z }, true);
  });

  return (
    <group>
      <RigidBody
        ref={rigidBodyRef}
        colliders="hull"
        onCollisionEnter={({ other }) => handleCollisionEnter(other)}
        position={[init.x, -0.6, init.z]}
      >
        <group dispose={null}>
          {selfCamera && mission?.robot_id === 2 && (
            <PerspectiveCamera ref={camera} makeDefault position={[0, 4.5, -0.75]} fov={60} near={0.01} far={100} />
          )}
          <group position={[0, 3.228, 0]} rotation={[-Math.PI / 2, 0, Math.PI]}>
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
    </group>
  );
}

useGLTF.preload("/bb9.glb");
