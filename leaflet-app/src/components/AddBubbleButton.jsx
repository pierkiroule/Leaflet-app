import React from "react";

function AddBubbleButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 1000,
        padding: 10,
      }}
    >
      + Bulle
    </button>
  );
}

export default AddBubbleButton;