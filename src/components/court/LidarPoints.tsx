import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import { Points } from '@react-three/drei'
import { useMemo, useRef } from 'react'

type LidarProps = {
  maxDistance?: number
  horizontalStepDeg?: number
  verticalAnglesDeg?: number[]
  frequencyHz?: number
}

export function LidarPoints({
  maxDistance = 15,
  horizontalStepDeg = 1,
  verticalAnglesDeg = [-40, -35, -30, -25, -20, -15, -10, -5, 0],
  frequencyHz = 5,
}: LidarProps) {
  const { scene, camera } = useThree()

  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const pointsRef = useRef<THREE.Points>(null!)

  const maxPoints = useMemo(
    () =>
      verticalAnglesDeg.length *
      Math.ceil(360 / horizontalStepDeg),
    [verticalAnglesDeg, horizontalStepDeg]
  )

  const positions = useMemo(
    () => new Float32Array(maxPoints * 3),
    [maxPoints]
  )

  const objects = useMemo(
    () => scene.children.filter(o => !o.userData?.isRobot),
    [scene]
  )

  const lastScanTime = useRef(0)
  const scanInterval = 1 / frequencyHz

  useFrame(({ clock }) => {
    if (clock.elapsedTime - lastScanTime.current < scanInterval) return
    lastScanTime.current = clock.elapsedTime

    let idx = 0

    const origin = new THREE.Vector3()
    camera.getWorldPosition(origin)

    for (const pitchDeg of verticalAnglesDeg) {
      const pitch = THREE.MathUtils.degToRad(pitchDeg)

      for (
        let yawDeg = 0;
        yawDeg < 360;
        yawDeg += horizontalStepDeg
      ) {
        const yaw = THREE.MathUtils.degToRad(yawDeg)

        const dir = new THREE.Vector3(
          Math.cos(pitch) * Math.cos(yaw),
          Math.sin(pitch),
          Math.cos(pitch) * Math.sin(yaw)
        )

        dir.applyQuaternion(camera.quaternion).normalize()

        raycaster.far = maxDistance
        raycaster.set(origin, dir)

        const intersects = raycaster.intersectObjects(objects, true)

        // if (intersects.length > 0) {
        //   const p = intersects[0].point
        //   positions[idx++] = p.x
        //   positions[idx++] = p.y
        //   positions[idx++] = p.z
        // }
        const p =
          intersects[0]?.point ??
          origin.clone().add(dir.clone().multiplyScalar(maxDistance))

        positions[idx++] = p.x
        positions[idx++] = p.y
        positions[idx++] = p.z

      }
    }

    const geometry = pointsRef.current.geometry
    geometry.setDrawRange(0, idx / 3)
    geometry.attributes.position.needsUpdate = true
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <pointsMaterial
        transparent
        color={0x00ff00}
        size={0.1}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  )
}
