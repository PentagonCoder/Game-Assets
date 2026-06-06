

# Game-Assets — Basic Camera Setup

## Demo videos

Below are the two demo GIFs converted from the MP4s. Click an image to open the full-size GIF or use the download links.

### Camera demo 1

![Camera demo 1](media/camera-demo-1.gif)

[Download GIF (camera-demo-1.gif)](media/camera-demo-1.gif) · [Original MP4](src/assets/Video%20Project%20(1).mp4)

### Camera demo 2

![Camera demo 2](media/camera-demo-2.gif)

[Download GIF (camera-demo-2.gif)](media/camera-demo-2.gif) · [Original MP4](src/assets/Video%20Project%20(2).mp4)

These GIFs were generated from your uploaded MP4s using `ffmpeg` and saved to `media/`.
This folder contains a ready-to-use, minimal game camera setup for small 3D React games (Vite). It's designed so anyone can copy or import the components and start with a working follow-camera quickly.

**Highlights**
- Minimal, well-commented camera logic.
- Example scene and player components to demonstrate usage.
- Easy to customize: offsets, smoothing, and camera mode.

## What's included
- Example game scene: [src/components/Game01.jsx](src/components/Game01.jsx#L1)
- Player component: [src/components/Player01.jsx](src/components/Player01.jsx#L1)
- Floor and other actors: [src/components/Floor.jsx](src/components/Floor.jsx#L1), [src/components/Ghost.jsx](src/components/Ghost.jsx#L1), [src/components/OtherPlayer.jsx](src/components/OtherPlayer.jsx#L1)
- WebSocket hook (multiplayer demo): [src/hooks/useWebSocket.js](src/hooks/useWebSocket.js#L1)

## Prerequisites
- Node.js (LTS recommended)
- npm or yarn

## Quick start
1. Install dependencies (from the project root):

```bash
npm install
```

2. Run the dev server:

```bash
npm run dev
```

3. Open the app in your browser (Vite will show the URL, usually http://localhost:5173).

## How to use the camera
1. Open the example scene [src/components/Game01.jsx](src/components/Game01.jsx#L1). It contains a simple camera controller that follows the player.
2. Mount the scene in your app (for example in `App.jsx`) by importing `Game01` and including it in your JSX.

Example import:

```jsx
import Game01 from './src/components/Game01.jsx'

function App() {
	return <Game01 />
}

export default App
```

3. Adjust camera settings inside [src/components/Game01.jsx](src/components/Game01.jsx#L1): smoothing, offset, and follow distance are defined near the top of the file and commented for easy tuning.

## Customization
- To change camera type (top-down, side, third-person), edit the camera logic in [src/components/Game01.jsx](src/components/Game01.jsx#L1).
- For smoothing or damping, tweak the smoothing constant / lerp factor in the same file.
- If you want the camera to follow a different entity, pass a reference or ID from your game state to the camera controller.

## Notes on multiplayer
- The example includes a lightweight WebSocket hook at [src/hooks/useWebSocket.js](src/hooks/useWebSocket.js#L1) used by the demo. It's optional — remove or replace it if you don't need multiplayer.

## Troubleshooting
- Camera not following: ensure the player entity exports position data or a ref the camera can read.
- Jittery movement: increase smoothing or update the camera in a fixed-timestep loop.
- Build issues: confirm paths and imports match your project structure and that Vite is running from the project root.

## Contributing / Extending
- Feel free to submit improvements: smoother interpolation methods, collision avoidance for camera, or configurable editor controls.

## License
This project is provided as-is. Add your preferred license at the repository root if you plan to share widely.

---

## Demo videos

Below are the two demo videos you added. They are embedded so reviewers can play them directly from the repository view in supporting viewers.

### Camera demo 1
<video controls width="640">
	<source src="src/assets/Video Project (1).mp4" type="video/mp4">
	Your browser does not support the video tag.
</video>

[Download camera-demo-1](src/assets/Video%20Project%20(1).mp4)

### Camera demo 2
<video controls width="640">
	<source src="src/assets/Video Project (2).mp4" type="video/mp4">
	Your browser does not support the video tag.
</video>

[Download camera-demo-2](src/assets/Video%20Project%20(2).mp4)

If you want, I can convert these to optimized GIFs and embed them instead — I can do that here if `ffmpeg` is installed, or you can run the conversion locally and I will embed the results.

If you'd like the GIFs, say "convert" and I will attempt installation or provide exact commands to run locally.

If you want, I can also add a short demo GIF, a dedicated example page, or a small config UI to tweak camera parameters at runtime — tell me which and I'll add it.
