"use client"

import { useState, useEffect, useRef } from 'react';
import { MapPin, Expand, ChevronUp, LocateFixed } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Link from 'next/link';

// 1. Branded Icon Definitions for Sayzo
const sayzoSvg = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="14" fill="#10B981" fill-opacity="0.2"/><circle cx="16" cy="16" r="8" fill="#10B981" stroke="white" stroke-width="2"/></svg>`;
const taskSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#10B981" fill-opacity="0.15" /><circle cx="12" cy="12" r="6" stroke="#10B981" stroke-width="1.5" /><circle cx="12" cy="12" r="3" fill="#111827" /></svg>`;

const sayzoIcon = L.divIcon({ html: sayzoSvg, className: 'user-marker', iconSize: [32, 32], iconAnchor: [16, 16] });
const generalTaskIcon = L.divIcon({ html: taskSvg, className: 'general-task-marker', iconSize: [24, 24], iconAnchor: [12, 12] });

function RecenterMap({ coords }) {
    const map = useMap();
    useEffect(() => {
        if (coords) map.flyTo([coords.lat, coords.lng], 14, { animate: true });
    }, [coords, map]);
    return null;
}

const HomeMap = () => {
    const [userLoc, setUserLoc] = useState(null);
    const [locationName, setLocationName] = useState("Bengaluru");
    const [isFullscreen, setIsFullscreen] = useState(false);
    const autoOpenMarkerRef = useRef(null);
    const mapWrapperRef = useRef(null);
    const defaultCenter = [12.9716, 77.5946]; // Bangalore CBD

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            mapWrapperRef.current.requestFullscreen().catch(err => {
                console.error(`Error enabling fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    useEffect(() => {
        const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFsChange);
        return () => document.removeEventListener('fullscreenchange', handleFsChange);
    }, []);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                setUserLoc(coords);
                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}&zoom=10`);
                    const data = await res.json();
                    setLocationName(data.address.suburb || data.address.city || "your area");
                } catch (e) { console.error(e); }
            });
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (autoOpenMarkerRef.current) autoOpenMarkerRef.current.openPopup();
        }, 1200);
        return () => clearTimeout(timer);
    }, [userLoc]);

    const baseLat = userLoc?.lat || defaultCenter[0];
    const baseLng = userLoc?.lng || defaultCenter[1];

    const mockTasks = [
        { id: 1, pos: [baseLat + 0.002, baseLng + 0.002], title: "SAYZO is looking for Best Video Editor" },
        { id: 2, pos: [baseLat - 0.003, baseLng + 0.007], title: "Video Editing" },
        { id: 3, pos: [baseLat + 0.006, baseLng - 0.020], title: "Looking For 10 Content Creators" },
        { id: 4, pos: [baseLat - 0.005, baseLng - 0.010], title: "Digital Marketing and Lead generation" },
        { id: 5, pos: [baseLat + 0.012, baseLng - 0.006], title: "I need a Shopify Developer" },
        { id: 6, pos: [baseLat + 0.007, baseLng + 0.013], title: "Distribute flyers" },
    ];

    return (
        <div
            ref={mapWrapperRef}
            className={`flex flex-col bg-white border border-gray-300 shadow-sm overflow-hidden font-sans transition-all duration-300 ${isFullscreen
                ? 'fixed inset-0 z-[9999] h-screen w-screen rounded-none'
                /* CHANGE: Height reduced to 380px for a sleeker rectangle look */
                : 'rounded-lg h-[380px] w-full'
                }`}
        >
            {/* Card Header */}
            <div className="px-6 py-4 flex justify-between items-center bg-white border-b border-gray-100 shrink-0 z-10">
    {/* LEFT SIDE: Everything aligned in one flex row */}
    <div className="flex items-center gap-3">
        <MapPin className="h-5 w-5 " aria-hidden="true" />
        
        <span className=" tracking-tight text-base ">
            Tasks Near You
        </span>

        {/* The Badge */}
        <span className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] font-medium text-gray-600">
            73 tasks
        </span>
    </div>

    {/* RIGHT SIDE: Fullscreen Action */}
    <div className="flex items-center gap-4">
        <button
            onClick={toggleFullscreen}
            className="text-gray-400 hover:text-black/70 transition-colors p-1"
            aria-label="Toggle Fullscreen"
        >
            {isFullscreen ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 14h6v6m10-6h-6v6M4 10h6V4m10 6h-6V4"/></svg>
            ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
            )}
        </button>
    </div>
</div>

            {/* Map Area */}
            <div className="flex-grow relative w-full bg-gray-50">
                <MapContainer center={defaultCenter} zoom={25} className="h-full w-full z-0" scrollWheelZoom={false}>
                    <TileLayer
  attribution='&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
/>
                    <RecenterMap coords={userLoc} />

                    {userLoc && <Marker position={[userLoc.lat, userLoc.lng]} icon={sayzoIcon}></Marker>}

                    {mockTasks.map((task, index) => (
                        <Marker key={task.id} position={task.pos} icon={generalTaskIcon} ref={index === 0 ? autoOpenMarkerRef : null}>
                            <Popup className="custom-popup">
                                <div className=" min-w-[120px]">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                        <span className="text-[10px]  uppercase tracking-wider text-gray-400">Available</span>
                                    </div>
                                    <h3 className=" text-gray-900 leading-tight mb-3 text-sm">{task.title}</h3>

                                    <Link href={`/live-tasks`}>
                                        <button className="w-full bg-[#111827] text-white text-[11px] py-2 rounded-full px-7 py-2.5 hover:bg-black transition-all">
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default HomeMap;