import { useRef, useEffect, forwardRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useThree } from "@react-three/fiber"
import * as THREE from "three"

function Player({ sendState }, ref) {

  const meshRef = ref || useRef()
  const keys = useRef({})
  const lastSentTime = useRef(0)   // tracks when we last sent
  const lastSent = useRef({ x: 0, z: 0, rotation: 0 })


  const mouse = useRef({ x: 0, y: 0 })
  const { camera, raycaster } = useThree()
  const floorPlane = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0))

  useEffect(() => {
    const onKeyDown = (e) => { keys.current[e.key] = true }
    const onKeyUp   = (e) => { keys.current[e.key] = false }
    const onMouseMove = (e) => {
      mouse.current.x =  (e.clientX / window.innerWidth)  * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup",   onKeyUp)
    window.addEventListener("mousemove", onMouseMove)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("keyup",   onKeyUp)
      window.removeEventListener("mousemove", onMouseMove)

    }
  }, [])

  useFrame((state, delta) => {
    const mesh = meshRef.current
    const speed = 4

    // ── mouse rotation ──────────────────────────────────────
    raycaster.setFromCamera(mouse.current, camera)
    const target = new THREE.Vector3()
    raycaster.ray.intersectPlane(floorPlane.current, target)
    const dx = target.x - mesh.position.x
    const dz = target.z - mesh.position.z
    const angle = Math.atan2(dx, dz)
    mesh.rotation.y = angle
 

    // ── direction-based movement ────────────────────────────
    // forward vector — the direction the cube is FACING
    // sin and cos convert the angle into x and z components
    const forwardX = Math.sin(angle)
    const forwardZ = Math.cos(angle)
 
    // right vector — 90 degrees from forward
    const rightX =  Math.cos(angle)
    const rightZ = -Math.sin(angle)
 
    // W/S moves along forward direction
    // A/D moves along right direction
    if (keys.current["w"] || keys.current["ArrowUp"]) {
      mesh.position.x += forwardX * speed * delta
      mesh.position.z += forwardZ * speed * delta
    }
    if (keys.current["s"] || keys.current["ArrowDown"]) {
      mesh.position.x -= forwardX * speed * delta
      mesh.position.z -= forwardZ * speed * delta
    }
    if (keys.current["d"] || keys.current["ArrowRight"]) {
      mesh.position.x += rightX * speed * delta
      mesh.position.z += rightZ * speed * delta
    }
    if (keys.current["a"] || keys.current["ArrowLeft"]) {
      mesh.position.x -= rightX * speed * delta
      mesh.position.z -= rightZ * speed * delta
    }

    // ── send to server ──────────────────────────────────────

    // but we only TRACK position 10 times per second
    // round to 2 decimals to reduce noise — we don't need super precise positions

    const x = parseFloat(mesh.position.x.toFixed(2))
    const z = parseFloat(mesh.position.z.toFixed(2))
    const rotation = parseFloat(mesh.rotation.y.toFixed(2))
    // but we only SEND to server 10 times per second
    const now = state.clock.elapsedTime   // seconds since app started

    // only send if something actually changed AND 100ms has passed
    const positionChanged = x !== lastSent.current.x || z !== lastSent.current.z
    const rotationChanged = rotation !== lastSent.current.rotation

    if ((positionChanged || rotationChanged) && now - lastSentTime.current > 0.1) {     // 0.1 sec = 10 per second
      sendState(x, z, rotation)   // send current position to server
      lastSentTime.current = now
      lastSent.current = { x, z, rotation }
    }
  })

  return (
    <mesh ref={meshRef} name="player" position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="skyblue" />
    </mesh>
  )
}

export default forwardRef(Player)