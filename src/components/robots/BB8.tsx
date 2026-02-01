import { PerspectiveCamera, useGLTF } from '@react-three/drei';
import { RapierRigidBody, RigidBody, type CollisionEnterPayload } from '@react-three/rapier';
import type { GLTF } from 'three-stdlib';
import type { Robot } from '../../utils/types';
import { useRegister } from '../controls/engineRegister';
import type { Group, Mesh, MeshStandardMaterial } from 'three';

type GLTFResult = GLTF & {
  nodes: {
    Object_4: Mesh;
    Object_6: Mesh;
    Object_8: Mesh;
    Object_9: Mesh;
  };

  materials: {
    Material: MeshStandardMaterial;
    ['Material.001']: MeshStandardMaterial;
    lentes: MeshStandardMaterial;
    plastico: MeshStandardMaterial;
  };
};

export default function BB8({ robot }: { robot: Robot }) {
  const { nodes, materials } = useGLTF('/bb8.glb') as unknown as GLTFResult;
  const { robotRegister } = useRegister();

  const handleCollision = (e: CollisionEnterPayload) => {
    const target = e.target.rigidBody as unknown as RapierRigidBody;
    const other = e.other.rigidBody as unknown as RapierRigidBody;

    if (!target || !other) return;

    const t = target.translation();
    const o = other.translation();

    const dir = {
      x: t.x - o.x,
      z: t.z - o.z,
    };

    const len = Math.hypot(dir.x, dir.z);
    if (len === 0) return;

    dir.x /= len;
    dir.z /= len;

    // const strength = 0.8;

    target.applyImpulse({ x: dir.x, y: 0, z: dir.z }, true);
    other.applyImpulse({ x: dir.x, y: 0, z: dir.z }, true);
  };

  return (
    <RigidBody
      ref={(object: RapierRigidBody) => robotRegister(object, false, robot.name)}
      colliders="hull"
      position={[robot.x, robot.y, robot.z]}
      rotation={[0, robot.angle, 0]}
      enabledTranslations={[true, false, true]}
      enabledRotations={[false, true, false]}
      restitution={0}
      friction={1.8}
      linearDamping={3}
      angularDamping={4}
      mass={5}
    >
      <group dispose={null}>
        <PerspectiveCamera
          makeDefault={robot?.selected}
          up={[0, 1, 0]}
          position={[0, 1.6, -0.6]}
          fov={60}
          near={0.01}
          far={100}
        />
        <group name="root" scale={[0.8, 0.8, 0.8]}>
          <group name="GLTF_SceneRootNode">
            <group name="Cuerpo_1" ref={(object: Group) => robotRegister(object, true, `${robot.name}-joint`)}>
              <mesh
                name="Object_4"
                castShadow
                receiveShadow
                geometry={nodes.Object_4.geometry}
                material={materials.Material}
              />
            </group>
            <group name="Cabeza_3" rotation={[-Math.PI, 0.39, -Math.PI]}>
              <mesh
                name="Object_6"
                castShadow
                receiveShadow
                geometry={nodes.Object_6.geometry}
                material={materials['Material.001']}
              />
              <group name="opticos_2" position={[-0.194, 1.141, -0.468]} rotation={[2.639, -0.346, 2.957]}>
                <mesh
                  name="Object_8"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_8.geometry}
                  material={materials.lentes}
                />
                <mesh
                  name="Object_9"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_9.geometry}
                  material={materials.plastico}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/bb8.glb');
