import React, { useState } from "react";
import BubbleMap from "./components/BubbleMap";
import ControlPanel from "./components/ControlPanel";
import { BubbleProvider } from "./context/BubbleContext";

function App() {
  const [isMoveMode, setIsMoveMode] = useState(false);
  const toggleMoveMode = () => setIsMoveMode((prev) => !prev);

  return (
    <BubbleProvider>
      <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
        <BubbleMap isMoveMode={isMoveMode} />
        <ControlPanel isMoveMode={isMoveMode} toggleMoveMode={toggleMoveMode} />
      </div>
    </BubbleProvider>
  );
}

export default App;