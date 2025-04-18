import React, { useContext } from "react";
import { BubbleContext } from "../context/BubbleContext";

const ControlPanel = ({ isMoveMode, toggleMoveMode }) => {
  const { bubbles, updateBubble } = useContext(BubbleContext);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        background: "rgba(255, 255, 255, 0.95)",
        borderTop: "1px solid #ccc",
        padding: "10px",
        zIndex: 1000,
        maxHeight: "40vh",
        overflowY: "auto",
      }}
    >
      <button onClick={toggleMoveMode} style={{ marginBottom: "10px" }}>
        {isMoveMode ? "Désactiver déplacement" : "Activer déplacement"}
      </button>

      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          style={{
            marginBottom: "8px",
            borderBottom: "1px solid #eee",
            paddingBottom: "8px",
          }}
        >
          <strong>Bulle #{bubble.id}</strong>
          <div>
            <label>Texte : </label>
            <input
              type="text"
              value={bubble.label}
              onChange={(e) =>
                updateBubble(bubble.id, { label: e.target.value })
              }
            />
          </div>
          <div>
            <label>Taille : </label>
            <input
              type="range"
              min="50"
              max="1000"
              value={bubble.size}
              onChange={(e) =>
                updateBubble(bubble.id, { size: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <label>Couleur : </label>
            <input
              type="color"
              value={bubble.color}
              onChange={(e) =>
                updateBubble(bubble.id, { color: e.target.value })
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ControlPanel;