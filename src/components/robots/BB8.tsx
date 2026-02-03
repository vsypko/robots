import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import type { GLTF } from "three-stdlib";
import type { Robot } from "../../utils/types";
import { useRegister } from "../controls/engineRegister";
import type { Group, Mesh, MeshStandardMaterial } from "three";
import useSettings from "../../context/useSettings";

type GLTFResult = GLTF & {
  nodes: {
    Object_4: Mesh;
    Object_6: Mesh;
    Object_8: Mesh;
    Object_9: Mesh;
  };

  materials: {
    Material: MeshStandardMaterial;
    ["Material.001"]: MeshStandardMaterial;
    lentes: MeshStandardMaterial;
    plastico: MeshStandardMaterial;
  };
};

export default function BB8({ robot }: { robot: Robot }) {
  const { nodes, materials } = useGLTF("/bb8.glb") as unknown as GLTFResult;
  const { robotRegister } = useRegister();
  const { selected } = useSettings();

  return (
    <RigidBody
      ref={(object: RapierRigidBody) => robotRegister(object, "base", robot.name)}
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
      <group name="root" dispose={null}>
        <group name="GLTF_SceneRootNode" scale={[0.8, 0.8, 0.8]}>
          <group name="Cuerpo_1" ref={(object: Group) => robotRegister(object, "body", robot.name)}>
            <mesh
              name="Object_4"
              castShadow
              receiveShadow
              geometry={nodes.Object_4.geometry}
              material={materials.Material}
            />
          </group>
          <group
            name="Cabeza_3"
            rotation={[-Math.PI, 0.39, -Math.PI]}
            ref={(object: Group) => robotRegister(object, "head", robot.name)}
          >
            <PerspectiveCamera
              makeDefault={selected === robot.name}
              up={[0, 1, 0]}
              position={[0, 1.65, 0.8]}
              rotation={[0, 3.55, 0]}
              fov={60}
              near={0.01}
              far={100}
            />
            <mesh
              name="Object_6"
              castShadow
              receiveShadow
              geometry={nodes.Object_6.geometry}
              material={materials["Material.001"]}
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
    </RigidBody>
  );
}

useGLTF.preload("/bb8.glb");
