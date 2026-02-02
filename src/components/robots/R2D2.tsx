import * as THREE from "three";
import { useRef } from "react";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import type { Robot } from "../../utils/types";

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
  };
  materials: {
    R2D2Tex: THREE.MeshStandardMaterial;
  };
};

export default function R2D2({ robot }: { robot: Robot }) {
  const { nodes, materials } = useGLTF("/r2d2.glb") as unknown as GLTFResult;
  const rigidBodyRef = useRef<RapierRigidBody | null>(null);

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders="hull"
      position={[robot.x, robot.y, robot.z]}
      enabledTranslations={[true, false, true]}
      enabledRotations={[false, true, false]}
      restitution={0.1}
      friction={1.8}
      linearDamping={1.5}
      angularDamping={2}
      mass={5}
    >
      <group dispose={null}>
        <PerspectiveCamera
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
