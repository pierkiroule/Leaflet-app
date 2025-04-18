import React, { useContext } from "react";
import { BubbleContext } from "../context/BubbleContext";

export default function BubbleMenu() {
  const { selectedBubble, updateBubble, deleteBubble, userPosition } =
    useContext(BubbleContext);

  if (!selectedBubble) return <div style={{ padding: 10 }}>Aucune bulle sélectionnée</div>;

  const handleRadiusChange = (e) => {
    updateBubble(selectedBubble.id, { radius: parseInt(e.target.value) });
  };

  return (
    <div style={{ padding: 10 }}>
      <h4>Bulle sélectionnée</h4>
      <p>Coordonnées : {selectedBubble.position.lat.toFixed(5)}, {selectedBubble.position.lng.toFixed(5)}</p>
      <p>Rayon : {selectedBubble.radius} m</p>
      <input
        type="range"
        min="10"
        max="300"
        value={selectedBubble.radius}
        onChange={handleRadiusChange}
      />
      <br />
      <button onClick={() => deleteBubble(selectedBubble.id)}>Supprimer</button>
      <br />
      <button
        onClick={() => {
          if (userPosition) {
            updateBubble(selectedBubble.id, { position: userPosition });
          }
        }}
      >
        Recentrer sur ma position
      </button>
    </div>
  );
}