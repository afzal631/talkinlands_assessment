import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";

export default function USpopulation() {
  const [geoData, setGeoData] = useState(null);
  const [geoUSData, setGeoUSData] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const geojsonRef = useRef(null);

  useEffect(() => {
    // fetch("/india-data.json")
    //   .then((response) => response.json())
    //   .then((data) => setGeoData(data));
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setGeoUSData(data));
  }, []);

  const customIcon = new Icon({
    iconUrl: "/markerIcon.png",
    iconSize: [38, 38],
  });

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        var layer = e.target;

        layer.setStyle({
          weight: 5,
          color: "#666",
          dashArray: "",
          fillOpacity: 0.7,
        });

        layer.bringToFront();
      },
      mouseout: (e) => {
        if (geojsonRef.current) {
          geojsonRef.current.resetStyle(e.target);
        }
      },
      click: (e) => {
        const layer = e.target;
        setSelectedState(layer.feature.properties);
      },
    });
    layer.bindPopup(
      `<strong>${feature.properties.name}</strong><br/>Density: ${feature.properties.density}`
    );
  };

  const geojson = (
    <GeoJSON
      data={geoUSData}
      style={(feature) => ({
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      })}
      onEachFeature={onEachFeature}
      ref={geojsonRef}
    />
  );

  return (
    <div>
      <MapContainer
        center={[37.8, -96]}
        zoom={4}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* showing india toursim places  */}
        {/* {geoData && (
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
        )} */}
        {/* showing US population */}
        {geoUSData && geojson}
      </MapContainer>
      {selectedState && (
        <div
          style={{
            width: "20%",
            padding: "10px",
            backgroundColor: "#f0f0f0",
          }}
        >
          <h2>{selectedState.name}</h2>
          <p>Population: {selectedState.population}</p>
        </div>
      )}
    </div>
  );
}

function getColor(density) {
  return density > 1000
    ? "#800026"
    : density > 500
    ? "#BD0026"
    : density > 200
    ? "#E31A1C"
    : density > 100
    ? "#FC4E2A"
    : density > 50
    ? "#FD8D3C"
    : density > 20
    ? "#FEB24C"
    : density > 10
    ? "#FED976"
    : "#FFEDA0";
}
