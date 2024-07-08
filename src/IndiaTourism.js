import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";

export default function IndiaTourism() {
  const [geoData, setGeoData] = useState(null);
  const [geoUSData, setGeoUSData] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const geojsonRef = useRef(null);

  useEffect(() => {
    fetch("/india-data.json")
      .then((response) => response.json())
      .then((data) => setGeoData(data));
    // fetch("/data.json")
    //   .then((response) => response.json())
    //   .then((data) => setGeoUSData(data));
  }, []);

  const customIcon = new Icon({
    iconUrl: "/markerIcon.png",
    iconSize: [38, 38],
  });

  return (
    <div>
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {geoData && (
          <MarkerClusterGroup>
            {geoData.features.map((place, idx) => (
              <Marker
                key={idx}
                position={[
                  place.geometry.coordinates[1],
                  place.geometry.coordinates[0],
                ]}
                icon={customIcon}
              >
                <Popup>
                  <img
                    src={place.properties.image}
                    alt={place.properties.name}
                    style={{
                      width: "300px",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <strong>{place.properties.name}</strong>
                  </div>
                  <div>{place.properties.description}</div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        )}
      </MapContainer>
    </div>
  );
}
