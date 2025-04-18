import React, { createContext, useState } from "react";

export const BubbleContext = createContext();

export const BubbleProvider = ({ children }) => {
  const [bubbles, setBubbles] = useState([]);

  const addBubble = (position) => {
    const newBubble = {
      id: Date.now(),
      position,
      text: "",
      size: 30,
      color: "blue",
      audio: "",
    };
    setBubbles((prev) => [...prev, newBubble]);
  };

  const updateBubble = (id, newData) => {
    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...newData } : b))
    );
  };

  const moveBubble = (id, newPosition) => {
    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, position: newPosition } : b))
    );
  };

  const value = {
    bubbles,
    addBubble,
    updateBubble,
    moveBubble,
  };

  return (
    <BubbleContext.Provider value={value}>
      {children}
    </BubbleContext.Provider>
  );
};