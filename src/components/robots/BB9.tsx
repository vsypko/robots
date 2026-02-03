import * as THREE from "three";
import { useRef } from "react";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
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

export default function BB9({ robot }: { robot: Robot }) {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const rotative = useRef<THREE.Group | null>(null);
  const { nodes, materials } = useGLTF("/bb9.glb") as unknown as GLTFResult;

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders="hull"
      type="dynamic"
      position={[robot.x, robot.y, robot.z]}
      enabledTranslations={[true, false, true]}
      enabledRotations={[false, true, false]}
      restitution={0.1}
      friction={1.8}
      linearDamping={1.5}
      angularDamping={2}
      mass={9}
    >
      <group dispose={null}>
        <PerspectiveCamera
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
