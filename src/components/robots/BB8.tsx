import { PerspectiveCamera, useGLTF } from '@react-three/drei';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import type { GLTF } from 'three-stdlib';
import type { Robot } from '../../utils/types';
import { useEntityRegister } from '../../engine/entityRegister';
import type { Group, Mesh, MeshStandardMaterial } from 'three';
import useSettings from '../../context/useSettings';

type GLTFResult = GLTF & {
  nodes: {
    Body: Mesh;
    Object_3: Mesh;
    Object_3_1: Mesh;
    Object_3_2: Mesh;
  };
  materials: {
    ['Material.001']: MeshStandardMaterial;
    plastico: MeshStandardMaterial;
    ['Material.002']: MeshStandardMaterial;
    lentes: MeshStandardMaterial;
  };
};

export default function BB8({ robot }: { robot: Robot }) {
  const { nodes, materials } = useGLTF('/bb8.glb') as unknown as GLTFResult;
  const { robotRegister } = useEntityRegister();
  const { selected, fpv } = useSettings();

  return (
    <RigidBody
      ref={(object: RapierRigidBody) => robotRegister(object, 'base', robot.name)}
      type="dynamic"
      colliders="hull"
      position={[robot.x, robot.y, robot.z]}
      rotation={[0, robot.angle, 0]}
      enabledRotations={[false, true, false]}
      restitution={0.1}
      friction={1}
      linearDamping={1}
      angularDamping={1.0}
      mass={5}
    >
      <group dispose={null}>
        <PerspectiveCamera
          makeDefault={selected === robot.name && fpv}
          up={[0, 1, 0]}
          position={[0, 1.4, -0.8]}
          fov={60}
          near={0.01}
          far={100}
        />
        <mesh
          ref={(object: Group) => robotRegister(object, 'body', robot.name)}
          name="body"
          castShadow
          receiveShadow
          geometry={nodes.Body.geometry}
          material={materials['Material.001']}
        />
        <group name="head" position={[0.001, 0.884, 0.393]}>
          <mesh
            name="Object_3"
            castShadow
            receiveShadow
            geometry={nodes.Object_3.geometry}
            material={materials.plastico}
          />
          <mesh
            name="Object_3_1"
            castShadow
            receiveShadow
            geometry={nodes.Object_3_1.geometry}
            material={materials['Material.002']}
          />
          <mesh
            name="Object_3_2"
            castShadow
            receiveShadow
            geometry={nodes.Object_3_2.geometry}
            material={materials.lentes}
          />
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/bb8.glb');
