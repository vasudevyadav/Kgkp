import React, { useState, useRef } from "react";
import {
  FaBus,
  FaBuilding,
  FaShoppingCart,
  FaSchool,
  FaDumbbell,
  FaChild,
  FaFilm,
  FaGlassCheers,
} from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const iconMap = {
  transportation: <FaBus />,
  "commercial hub": <FaBuilding />,
  "shopping centre": <FaShoppingCart />,
  "educational hub": <FaSchool />,
  gym: <FaDumbbell />,
  "kids play area": <FaChild />,
  cinema: <FaFilm />,
  "club house": <FaGlassCheers />,
};

const DEFAULT_COORDINATES = [26.9124, 75.7873];

const LocationExcellence = ({ data = {} }) => {
  const {
    subHeading = "A Landmark Address for Refined Urban Living",
    latitude,
    longitude,
    highlights = [],
    name,
  } = data;

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const enterTimeout = useRef(null);
  const leaveTimeout = useRef(null);

  const getCoordinates = () => {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    return !isNaN(lat) && !isNaN(lng) ? [lat, lng] : DEFAULT_COORDINATES;
  };

  const getIconComponent = (label) => {
    const key = label?.toLowerCase()?.trim();
    return iconMap[key] || <FaBuilding />;
  };

  const handleMouseEnter = (index) => {
    clearTimeout(leaveTimeout.current);
    enterTimeout.current = setTimeout(() => setHoveredIndex(index), 150);
  };

  const handleMouseLeave = () => {
    clearTimeout(enterTimeout.current);
    leaveTimeout.current = setTimeout(() => setHoveredIndex(null), 100);
  };

  const renderDistance = (text = "", index) => {
    const entries = text
      .split(/\)\s*/)
      .filter(Boolean)
      .map((line) => (line.includes("(") ? line + ")" : line));

    const visibleItems = entries.slice(0, 2);
    const hiddenItems = entries.slice(2);

    const parseLine = (line) => {
      const match = line.match(/(.*?)(\(\s*[\d.]+\s*[a-zA-Z]+\s*\))/);
      if (match) {
        return (
          <>
            {match[1].trim()} <strong>{match[2]}</strong>
          </>
        );
      } else {
        return line.trim();
      }
    };

    return (
      <div className="relative">
        <div className="flex flex-wrap items-center gap-x-2 text-sm text-gray-700">
          {visibleItems.map((line, idx) => (
            <span key={idx}>
              {parseLine(line)}
              {idx !== visibleItems.length - 1 && ","}
            </span>
          ))}

          {hiddenItems.length > 0 && (
            <div
              className="relative group cursor-pointer"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {hoveredIndex !== index && (
                <span className="text-red-600 font-semibold ml-1">
                  +{hiddenItems.length} More
                </span>
              )}

              <div
                className={`top-full mt-2 bg-white  z-50 min-w-[260px] w-max space-y-2 transform transition-all duration-300 ease-in-out ${
                  hoveredIndex === index ? "block" : "hidden"
                }`}
              >
                {hiddenItems.map((line, i) => (
                  <div key={i} className="text-sm text-gray-700">
                    {parseLine(line)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="w-full px-6 lg:px-20 bg-white">
      <div className="flex flex-col lg:flex-row lg:gap-16 gap-8 items-start">
        {/* Map */}
        <div className="w-full lg:w-5/12 h-[30rem] rounded-md overflow-hidden border border-gray-200 z-10">
          <MapContainer
            center={getCoordinates()}
            zoom={15}
            scrollWheelZoom={false}
            style={{ width: "100%", height: "100%" }}
            key={name}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={getCoordinates()}>
              <Popup>{name || "Project Location"}</Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Highlights */}
        <div className="w-full lg:w-7/12 mb-8 lg:mb-0">
          <p className="text-sm text-[#b2784a] mb-3 lg:mt-6 uppercase tracking-widest">
            {subHeading}
          </p>
          <h2 className="text-2xl lg:text-4xl font-medium text-gray-800 mb-6">
            Location Excellence
          </h2>

          {highlights.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-3 shadow-sm flex items-start gap-4"
                >
                  <div className="w-12 h-12 flex-shrink-0 flex justify-center items-center bg-[#b2784a] text-white text-2xl rounded-full">
                    {getIconComponent(item.label)}
                  </div>
                  <div className="w-full">
                    <h3 className="text-base font-bold text-gray-800 mb-1">
                      {item.label}
                    </h3>
                    {renderDistance(item.distance, index)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              Location information is not available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default LocationExcellence;
