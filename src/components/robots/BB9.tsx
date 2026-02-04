import type { Group, Mesh, MeshStandardMaterial } from "three";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import type { Robot } from "../../utils/types";
import { useEntityRegister } from "../../engine/entityRegister";
import useSettings from "../../context/useSettings";

type GLTFResult = GLTF & {
  nodes: {
    ["Object002_01_-_Default_0_1"]: Mesh;
    ["Object002_01_-_Default_0_2"]: Mesh;
    ["Object002_01_-_Default_0_3"]: Mesh;
    ["Object002_01_-_Default_0_4"]: Mesh;
    ["Object002_01_-_Default_0_5"]: Mesh;
    ["Sphere001_03_-_Default_0_1"]: Mesh;
    ["Sphere001_03_-_Default_0_2"]: Mesh;
    ["Sphere001_03_-_Default_0_3"]: Mesh;
  };
  materials: {
    ["01_-_Default"]: MeshStandardMaterial;
    ["07_-_Default"]: MeshStandardMaterial;
    ["02_-_Default"]: MeshStandardMaterial;
    ["03_-_Default"]: MeshStandardMaterial;
    ["08_-_Default"]: MeshStandardMaterial;
  };
};

export default function BB9({ robot }: { robot: Robot }) {
  const { nodes, materials } = useGLTF("/bb9.glb") as unknown as GLTFResult;
  const { robotRegister } = useEntityRegister();
  const { selected, fpv } = useSettings();

  return (
    <RigidBody
      ref={(object: RapierRigidBody) => robotRegister(object, "base", robot.name)}
      colliders="hull"
      type="dynamic"
      position={[robot.x, robot.y, robot.z]}
      enabledRotations={[false, true, false]}
      restitution={0.1}
      friction={1.5}
      linearDamping={1.2}
      angularDamping={1.2}
      mass={9}
    >
      <group name="root" dispose={null}>
        <group position={[0, 3.25, 0]} rotation={[-Math.PI / 2, 0, -Math.PI]}>
          <PerspectiveCamera
            makeDefault={selected === robot.name && fpv}
            up={[0, 1, 0]}
            position={[0.0, -1, 0.6]}
            rotation={[Math.PI / 2, Math.PI, 0]}
            fov={60}
            near={0.01}
            far={100}
          />
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
        <group ref={(object: Group) => robotRegister(object, "body", robot.name)} position={[0, 1.674, 0]}>
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
