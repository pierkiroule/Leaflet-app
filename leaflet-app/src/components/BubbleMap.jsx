import React, { useContext } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  useMapEvents,
} from "react-leaflet";
import { BubbleContext } from "../context/BubbleContext";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Icône par défaut pour les marqueurs (corrige un bug sur mobile/Termux)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Composant pour gérer les clics sur la carte
const ClickHandler = ({ addBubble }) => {
  useMapEvents({
    click(e) {
      addBubble([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

const BubbleMap = ({ isMoveMode }) => {
  const { bubbles, addBubble, moveBubble } = useContext(BubbleContext);

  const handleDragEnd = (e, id) => {
    const newPos = [e.target.getLatLng().lat, e.target.getLatLng().lng];
    moveBubble(id, newPos);
  };

  return (
    <MapContainer
      center={[48.8566, 2.3522]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
      zoomControl={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
      <ClickHandler addBubble={addBubble} />

      {bubbles.map((bubble) => (
        <React.Fragment key={bubble.id}>
          <Circle
            center={bubble.position}
            radius={bubble.size}
            pathOptions={{ color: bubble.color }}
          />
          <Marker
            position={bubble.position}
            draggable={isMoveMode}
            eventHandlers={{
              dragend: (e) => handleDragEnd(e, bubble.id),
            }}
          />
        </React.Fragment>
      ))}
    </MapContainer>
  );
};

export default BubbleMap;