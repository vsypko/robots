import type { Mesh, MeshPhysicalMaterial } from 'three';
import { PerspectiveCamera, useGLTF } from '@react-three/drei';
import type { GLTF } from 'three-stdlib';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import type { Robot } from '../../utils/types';
import { useEntityRegister } from '../../engine/entityRegister';
import useSettings from '../../context/useSettings';

type GLTFResult = GLTF & {
  nodes: {
    Body: Mesh;
    Wheel: Mesh;
  };
  materials: {
    d_0_material: MeshPhysicalMaterial;
  };
};

export default function DO({ robot }: { robot: Robot }) {
  const { nodes, materials } = useGLTF('/D-O.glb') as unknown as GLTFResult;
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
      mass={1}
    >
      <group dispose={null}>
        <PerspectiveCamera
          makeDefault={selected === robot.name && fpv}
          up={[0, 1, 0]}
          position={[0, 1.5, -1.5]}
          fov={60}
          near={0.01}
          far={100}
        />

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body.geometry}
          material={materials.d_0_material}
          position={[0.117, 1.092, -0.34]}
        >
          <mesh
            ref={(object: RapierRigidBody) => robotRegister(object, 'wheel', robot.name)}
            castShadow
            receiveShadow
            geometry={nodes.Wheel.geometry}
            material={materials.d_0_material}
            position={[-0.142, -0.955, 0.009]}
          />
        </mesh>
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/D-O.glb');
