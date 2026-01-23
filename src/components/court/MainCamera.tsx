import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { useRef } from "react"
import { useRobots } from "../../context/RobotContext"

export default function MainCamera() {
  const mainCamRef = useRef(null)
  const robots = useRobots()

  return (
    <>
      <PerspectiveCamera
        ref={mainCamRef}
        makeDefault={robots.every((r) => !r.selected)}
        position={[0, 5, 20]}
        fov={60}
        near={0.1}
        far={100}
      />
      {robots.every((r) => !r.selected) && <OrbitControls />}
    </>
  )
}
