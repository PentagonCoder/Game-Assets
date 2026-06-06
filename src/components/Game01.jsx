import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"
import useWebSocket from "../hooks/useWebSocket"
import Player from "./Player01"
import OtherPlayer from "./OtherPlayer"
import Floor from "./Floor"
import {Model} from "./Ghost"

function FollowCamera({ playerRef }) {
  const { camera } = useThree()
    useFrame(() => {
      if (!playerRef.current) return
  
      const player = playerRef.current
  
      // get the direction the player is facing
      const forward = new THREE.Vector3()
      camera.getWorldDirection(forward)
      forward.y = 0
      forward.normalize()
  
      // camera goes BEHIND the player
      // behind = opposite of forward
      // so we subtract forward from player position
      const distance = 20    // how far behind
      const height   = 15  // how high above

      // ── smooth follow with lerp ─────────────────────────────
      const targetX = player.position.x - forward.x * distance
      const targetY = player.position.y + height
      const targetZ = player.position.z - forward.z * distance
      // lerp camera position towards target — smooth follow, not instant snap
      camera.position.x += (targetX - camera.position.x) * 0.1
      camera.position.y += (targetY - camera.position.y) * 0.1
      camera.position.z += (targetZ - camera.position.z) * 0.1
  })

 
  return null
}

// ─────────────────────────────────────────────
// Main Game component
// ─────────────────────────────────────────────
function Game({ username }) {

  const playerRef = useRef()

  // get sendState function and otherPlayers array from our hook
  const { sendState, otherPlayers } = useWebSocket(username)

  return (
    <div style={{ width: "100vw", height: "100vh" }}>

      <Canvas camera={{ position: [20, 20, 10], fov: 40 }}>
        <FollowCamera playerRef={playerRef} />
        {/* Lights */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} intensity={1} />

        {/* dark purple halloween sky */}
        {/* <color attach="background" args={["#1a0a2e"]} /> */}

        
        {/* fog so far objects fade into darkness */}
        {/* <fog attach="fog" args={["#1a0a2e", 10, 40]} /> */}

        {/* brighter ambient so the scene is visible */}
        <ambientLight intensity={0.5} />

        {/* moonlight from above */}
        {/* <directionalLight position={[5, 15, 5]} intensity={0.8} color="#c9d4ff" /> */}

          {/* orange spooky point light near ground */}
        <pointLight position={[0, 2, 0]} color="#ff6600" intensity={1} distance={15} />

        {/* Floor */}
        <Floor />
        {/* <Model position={[0, -0.5, 0]} /> */}

        {/* My cube — pass sendState so Player can send position each frame */}
        {/* name="player" kept for future camera/logic usage */}
        <Player sendState={sendState} ref={playerRef} name="player" />

        {/* Other players — one cube per connected user */}
        {otherPlayers.map((player) => (
          <OtherPlayer
            key={player.username}        // React needs a unique key
            username={player.username}
            state={player.state}
          />
        ))}

        {/* Orbit camera controls */}
        {/* <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.08}
          minDistance={4}
          maxDistance={40}
          target={[0, 0, 0]}
        /> */}
      </Canvas>

    </div>
  )
}

export default Game