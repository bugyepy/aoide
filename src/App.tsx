import React from "react";
import { AudioVisualizer } from "../src/components/audioVisualizer";
import { Canvas } from "@react-three/fiber";
import { InitView } from "./components/initView";

function App() {
  const [showInitialView, setShowInitialView] = React.useState<boolean>(true);

  if (showInitialView) {
    return <InitView onClick={() => setShowInitialView(false)} />;
  } else {
    return (
      <Canvas
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "black",
        }}
      >
        <AudioVisualizer />
      </Canvas>
    );
  }
}

export default App;
