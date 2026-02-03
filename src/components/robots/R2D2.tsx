import type { Mesh, MeshStandardMaterial } from 'three';
import { PerspectiveCamera, useGLTF } from '@react-three/drei';
import type { GLTF } from 'three-stdlib';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import type { Robot } from '../../utils/types';
import { useEntityRegister } from '../../engine/entityRegister';
import useSettings from '../../context/useSettings';

type GLTFResult = GLTF & {
  nodes: {
    Object_2: Mesh;
  };
  materials: {
    R2D2Tex: MeshStandardMaterial;
  };
};

export default function R2D2({ robot }: { robot: Robot }) {
  const { nodes, materials } = useGLTF('/r2d2.glb') as unknown as GLTFResult;
  const { robotRegister } = useEntityRegister();
  const { selected, fpv } = useSettings();

  return (
    <RigidBody
      ref={(object: RapierRigidBody) => robotRegister(object, 'base', robot.name)}
      type="dynamic"
      colliders="hull"
      position={[robot.x, robot.y, robot.z]}
      enabledRotations={[false, true, false]}
      restitution={0.1}
      friction={2}
      linearDamping={1.0}
      angularDamping={1.0}
      mass={6}
    >
      <group name="root" dispose={null}>
        <PerspectiveCamera
          makeDefault={selected === robot.name && fpv}
          position={[0, 3.7, -0.7]}
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

useGLTF.preload('/r2d2.glb');
