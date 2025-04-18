import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapView() {
  const [position, setPosition] = useState([48.8566, 2.3522]);
  const [bubbles, setBubbles] = useState([]);
  const idRef = useRef(0);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const addBubble = () => {
    const offset = 0.001 * (Math.random() - 0.5);
    const bubble = {
      id: idRef.current++,
      lat: position[0] + offset,
      lng: position[1] + offset,
      radius: 100,
    };
    setBubbles((prev) => [...prev, bubble]);
  };

  return (
    <div style={{ position: "relative" }}>
      <MapContainer center={position} zoom={15} style={{ height: "100vh" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>Ma position</Popup>
        </Marker>
        {bubbles.map((b) => (
          <Circle
            key={b.id}
            center={[b.lat, b.lng]}
            radius={b.radius}
            pathOptions={{ color: "blue", fillOpacity: 0.4 }}
          />
        ))}
      </MapContainer>

      <button
        onClick={addBubble}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1001,
          padding: 12,
          fontSize: 16,
          borderRadius: 8,
          backgroundColor: "#fff",
          border: "1px solid #333",
        }}
      >
        + Bulle
      </button>
    </div>
  );
}

export default MapView;