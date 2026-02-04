import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import type { GLTF } from 'three-stdlib';
import type { Robot } from '../../utils/types';

type GLTFResult = GLTF & {
  nodes: {
    defaultMaterial: THREE.Mesh;
    defaultMaterial_1: THREE.Mesh;
    defaultMaterial_2: THREE.Mesh;
    defaultMaterial_3: THREE.Mesh;
    defaultMaterial_4: THREE.Mesh;
    defaultMaterial_5: THREE.Mesh;
    defaultMaterial_6: THREE.Mesh;
    defaultMaterial_7: THREE.Mesh;
  };
  materials: {
    Droid: THREE.MeshStandardMaterial;
  };
};

export default function BB9({ robot }: { robot: Robot }) {
  const { nodes, materials } = useGLTF('/bb-9e_star_wars.glb') as unknown as GLTFResult;
  return (
    <group name={robot.name} dispose={null} position={[robot.x, robot.y, robot.z]} scale={[2, 2, 2]}>
      <mesh castShadow receiveShadow geometry={nodes.defaultMaterial.geometry} material={materials.Droid} />
      <mesh castShadow receiveShadow geometry={nodes.defaultMaterial_1.geometry} material={materials.Droid} />
      <mesh castShadow receiveShadow geometry={nodes.defaultMaterial_2.geometry} material={materials.Droid} />
      <mesh castShadow receiveShadow geometry={nodes.defaultMaterial_3.geometry} material={materials.Droid} />
      <mesh castShadow receiveShadow geometry={nodes.defaultMaterial_4.geometry} material={materials.Droid} />
      <mesh castShadow receiveShadow geometry={nodes.defaultMaterial_5.geometry} material={materials.Droid} />
      <mesh castShadow receiveShadow geometry={nodes.defaultMaterial_6.geometry} material={materials.Droid} />
      <mesh castShadow receiveShadow geometry={nodes.defaultMaterial_7.geometry} material={materials.Droid} />
    </group>
  );
}

useGLTF.preload('/bb-9e_star_wars.glb');
