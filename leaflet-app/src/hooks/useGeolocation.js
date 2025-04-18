import { useEffect, useState } from "react";

export default function useGeolocation() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const watch = navigator.geolocation.watchPosition(
      (pos) => setPosition(pos.coords),
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(watch);
  }, []);

  return position;
}