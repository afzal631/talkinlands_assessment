import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L, { Icon } from "leaflet";

function ResetCenterView({ selected }) {
  const map = useMap();
  useEffect(() => {
    if (selected) {
      map.flyTo(L.latLng(selected?.lat, selected?.lon), map.getZoom(), {
        animate: true,
        duration: 2,
        // easeLinearity: 0.15,
      });
    }
  }, [selected]);
}

function SearchMap() {
  const [search, setSearch] = useState("");
  const [responselist, setResponseList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userPosition, setUserPosition] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (search === "") {
      alert("Please enter a search value");
    }

    geolocationapi();
  };

  async function geolocationapi() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${search}&format=json&addressdetails=1&polygon_geojson=0`,
        requestOptions
      );
      const result = await response.json();
      setResponseList(result);
      setLoading(false);
      console.log(result);
    } catch (error) {
      console.log("error", error);
    }
  }

  //for searching plcaes on map
  useEffect(() => {
    setResponseList([]);
  }, [search]);

  //for getting user location initially.
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, []);

  const customIcon = new Icon({
    iconUrl: "/placeholder.png",
    iconSize: [38, 38],
  });

  return (
    // <div className="relative">
    <div className="relative h-screen w-full bg-red-400">
      <div className="absolute left-6 top-6 max-h-[92vh] max-w-[35%] w-[31%] rounded-lg  p-[1rem] flex flex-col  z-[9999] gap-2">
        <div className=" rounded-lg bg-white p-4 shadow-2xl">
          <div className="flex gap-[1rem] ">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              type="text"
              placeholder="Search any place in your mind..."
              className="w-full py-[7px] px-[1rem] rounded-lg border-2 border-gray-800"
            />
            <button
              onClick={handleSubmit}
              className="rounded-md py-[7px] px-[1rem] bg-emerald-600 text-white"
            >
              {loading ? "Loading.." : "Submit"}
            </button>
          </div>
        </div>
        {/* {responselist.length === 0 ? (
          <div></div>
        ) : (
          <> */}
        {loading === true ? (
          <div className="bg-white shadow-2xl rounded-lg flex justify-center items-center gap-[8px] mt-4 text-black p-4">
            LOADING...
          </div>
        ) : (
          <div className=" rounded-lg overflow-y-auto gap-[8px] mt-4 shadow-2xl bg-white">
            {responselist.map((item) => {
              return (
                <div
                  key={item?.place_id}
                  className="border-b-2 border-cyan-50 cursor-pointer p-2 "
                >
                  <div
                    className={`w-full flex items-center gap-2 p-[7px]  ${
                      selected?.place_id === item?.place_id
                        ? "bg-sky-400"
                        : "hover:bg-sky-100"
                    } rounded-md`}
                    onClick={() => {
                      setSelected(item);
                    }}
                  >
                    <img
                      src="/placeholder.png"
                      alt="icon"
                      className="w-[38px] h-[38px]"
                    />
                    <p>{item?.display_name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {/* </>
        )} */}
      </div>
      <MapContainer
        center={
          userPosition
            ? [userPosition.lat, userPosition.lon]
            : [20.5937, 78.9629]
        }
        zoom={5}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {selected ? (
          <Marker position={[selected?.lat, selected?.lon]} icon={customIcon}>
            <Popup>
              <div className="flex flex-col gap-[1px]">
                <strong>{selected?.name}</strong>
                <div className="m-0">{selected?.address.state} </div>
                <div className="m-0">{selected?.address.country} </div>
                <div className="m-0">{selected?.display_name}</div>
              </div>
            </Popup>
          </Marker>
        ) : (
          <Marker
            position={
              userPosition
                ? [userPosition.lat, userPosition.lon]
                : [20.5937, 78.9629]
            }
            icon={customIcon}
          >
            <Popup>
              <div className="flex flex-col gap-[1px]">
                <strong>Your current location.</strong>
              </div>
            </Popup>
          </Marker>
        )}
        <ResetCenterView selected={selected} />
      </MapContainer>
    </div>
    // </div>
  );
}

export default SearchMap;
