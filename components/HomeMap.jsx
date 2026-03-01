"use client"

import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// 1. Icon Definitions (Outside Component)
const sayzoSvg = `
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="14" fill="#10B981" fill-opacity="0.2"/>
    <circle cx="16" cy="16" r="8" fill="#10B981" stroke="white" stroke-width="2"/>
  </svg>
`;

const taskSvg = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#10B981" fill-opacity="0.15" />
    <circle cx="12" cy="12" r="6" stroke="#10B981" stroke-width="1.5" />
    <circle cx="12" cy="12" r="3" fill="#111827" />
  </svg>
`;

const sayzoIcon = L.divIcon({
  html: sayzoSvg,
  className: 'user-marker',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const generalTaskIcon = L.divIcon({
  html: taskSvg,
  className: 'general-task-marker',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Helper component to handle auto-panning
function RecenterMap({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo([coords.lat, coords.lng], 14, { animate: true });
    }
  }, [coords, map]);
  return null;
}

const HomeMap = () => {
  const [userLoc, setUserLoc] = useState(null);
  const [locationName, setLocationName] = useState("Bangalore");
  const autoOpenMarkerRef = useRef(null);
  const defaultCenter = [12.9716, 77.5946]; // Bangalore CBD

useEffect(() => {
  const fetchLocationName = async () => {
    if (userLoc) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLoc.lat}&lon=${userLoc.lng}&zoom=10`
        );
        const data = await response.json();
        // Fallback hierarchy: suburb, city, then state
        const name = data.address.suburb || data.address.city || data.address.state || "your area";
        setLocationName(name);
      } catch (error) {
        console.error("Error fetching location name:", error);
      }
    }
  };

  fetchLocationName();
}, [userLoc]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        (err) => console.error("Location access denied", err)
      );
    }
  }, []);

  // Open the first task's popup by default
  useEffect(() => {
    const timer = setTimeout(() => {
      if (autoOpenMarkerRef.current) {
        autoOpenMarkerRef.current.openPopup();
      }
    }, 1000); 
    return () => clearTimeout(timer);
  }, [userLoc]);

  const baseLat = userLoc?.lat || defaultCenter[0];
  const baseLng = userLoc?.lng || defaultCenter[1];

  const mockTasks = [
    { id: 1, pos: [baseLat + 0.004, baseLng + 0.006], title: "Event Photographer Needed" },
    { id: 2, pos: [baseLat - 0.005, baseLng - 0.004], title: "Website Bug Fix (React)" },
    { id: 3, pos: [baseLat + 0.007, baseLng + 0.003], title: "Resume Designing Help" },
    { id: 4, pos: [baseLat + 0.003, baseLng - 0.007], title: "Furniture Assembly (IKEA)" },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-12 px-4 font-sans">
      {/* Main Card Wrapper 
          - flex-col ensures header and map stack vertically.
          - overflow-hidden keeps the map tiles from breaking the rounded corners.
      */}
      <div className="flex flex-col bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden h-[600px]">
        
        {/* Card Header - shrink-0 prevents it from being squashed by the map */}
        <div className="px-8 py-6 flex justify-between items-center bg-white border-b border-gray-50/50 shrink-0 z-10">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100/50">
                <span className="text-sm font-mono font-bold text-emerald-600 leading-none">73</span>
              </span>
              <h2 className="text-xl font-medium text-gray-900 tracking-tight">
                Tasks <span className="text-gray-400 font-light">near you</span>
              </h2>
            </div>

            <p className="text-[11px] text-gray-400 flex items-center gap-2 mt-0.5">
  <span className="relative flex h-1.5 w-1.5">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
  </span>
  {/* Now dynamically renders "Real-time hyperlocal activity in Indiranagar" etc. */}
  Real-time hyperlocal activity in {locationName}
</p>
          </div>
        </div>

        {/* Map Area - flex-grow ensures it fills all remaining space in the 600px card */}
        <div className="flex-grow relative w-full">
          
          {/* Status Overlay for location detection */}
          {!userLoc && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold text-gray-500 shadow-sm border border-gray-100 uppercase tracking-widest">
              📍 Locating neighborhood...
            </div>
          )}

          <MapContainer 
            center={defaultCenter} 
            zoom={13} 
            className="h-full w-full z-0"
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; CARTO'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            
            <RecenterMap coords={userLoc} />

            {userLoc && (
              <Marker position={[userLoc.lat, userLoc.lng]} icon={sayzoIcon}>
                <Popup>You are here!</Popup>
              </Marker>
            )}

            {mockTasks.map((task, index) => (
              <Marker 
                key={task.id} 
                position={task.pos} 
                icon={generalTaskIcon}
                ref={index === 0 ? autoOpenMarkerRef : null}
              >
                <Popup className="custom-popup">
                  <div className="p-2 min-w-[120px]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Available</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 leading-tight mb-2">{task.title}</h3>
                    <button className="w-full bg-[#111827] text-white text-[11px] font-medium py-1.5 rounded-md hover:bg-gray-800 transition-colors">
                      View Task
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default HomeMap;