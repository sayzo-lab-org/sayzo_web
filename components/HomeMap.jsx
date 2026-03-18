"use client"

import { useState, useEffect, useRef, useMemo } from 'react';
import { MapPin, Expand, ChevronUp } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Link from 'next/link';

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
    const defaultCenter = [12.9716, 77.5946];

    const icons = useMemo(() => {
        if (typeof window === 'undefined') return { sayzoIcon: null, generalTaskIcon: null };

        const realMarkerPinSvg = `
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="pinShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" />
                        <feOffset dx="0" dy="1.5" result="offsetblur" />
                        <feComponentTransfer><feFuncA type="linear" slope="0.4"/></feComponentTransfer>
                        <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>
                <path
                    d="M12 21.7C16 17.5 20 14 20 9.5C20 5.1 16.4 1.5 12 1.5C7.6 1.5 4 5.1 4 9.5C4 14 8 17.5 12 21.7Z"
                    fill="#059669"
                    filter="url(#pinShadow)"
                />
                <circle cx="12" cy="9.5" r="3" fill="white" fill-opacity="0.9"/>
            </svg>`;

        const liveDotHtml = `
            <div class="live-dot-container">
                <div class="live-dot-pulse"></div>
                <div class="live-dot-core"></div>
            </div>`;

        return {
            sayzoIcon: L.divIcon({
                html: realMarkerPinSvg,
                className: 'user-marker',
                iconSize: [24, 32],
                iconAnchor: [12, 32]
            }),
            generalTaskIcon: L.divIcon({
                html: liveDotHtml,
                className: 'live-marker',
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            })
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (autoOpenMarkerRef.current) {
                autoOpenMarkerRef.current.openPopup();
            }
        }, 1500);
        return () => clearTimeout(timer);
    }, [icons]);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            mapWrapperRef.current.requestFullscreen().catch(err => console.error(err));
        } else {
            document.exitFullscreen();
        }
    };

    useEffect(() => {
        const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFsChange);
        return () => document.removeEventListener('fullscreenchange', handleFsChange);
    }, []);

    // useEffect(() => {
    //     if ("geolocation" in navigator) {
    //         navigator.geolocation.getCurrentPosition(async (pos) => {
    //             const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
    //             setUserLoc(coords);
    //         });
    //     }
    // }, []);

    useEffect(() => {
  const storedLoc = localStorage.getItem("sayzo_user_location");

  if (storedLoc) {
    const coords = JSON.parse(storedLoc);
    setUserLoc(coords);
  }
}, []);

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

    if (!icons.sayzoIcon) return null;

    return (
        <div
            ref={mapWrapperRef}
            className={`flex flex-col bg-white border border-gray-300 shadow-sm overflow-hidden font-sans transition-all duration-300 ${
                isFullscreen
                    ? 'fixed inset-0 z-[9999] h-screen w-screen rounded-none'
                    : 'rounded-lg h-[380px] w-full'
            }`}
        >
            {/* Card Header */}
            <div className="px-6 py-4 flex justify-between items-center bg-white border-b border-gray-100 shrink-0 z-10">
                <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 " aria-hidden="true" />
                    <span className="tracking-tight text-base ">Tasks Near You</span>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleFullscreen}
                        className="text-gray-400 hover:text-black/70 transition-colors p-1"
                        aria-label="Toggle Fullscreen"
                    >
                        {isFullscreen ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M4 14h6v6m10-6h-6v6M4 10h6V4m10 6h-6V4" />
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Map Area */}
            <div className="flex-grow relative w-full bg-gray-50">
                <MapContainer center={defaultCenter} zoom={25} className="h-full w-full z-0" scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; Esri'
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />
                    <RecenterMap coords={userLoc} />

                    {userLoc && <Marker position={[userLoc.lat, userLoc.lng]} icon={icons.sayzoIcon}></Marker>}

                    {mockTasks.map((task, index) => (
                        <Marker
                            key={task.id}
                            position={task.pos}
                            icon={icons.generalTaskIcon}
                            ref={index === 0 ? autoOpenMarkerRef : null}
                        >
                            <Popup className="custom-popup">
                                {/* Reduced min-width from 120px to 110px for a slimmer look */}
                                <div className="min-w-[110px]">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                        <span className="text-[10px] uppercase tracking-wider text-gray-400">Available</span>
                                    </div>
                                    <h3 className="text-gray-900 leading-tight mb-3 text-sm">{task.title}</h3>

                                    <Link href={`/live-tasks`}>
                                        <Button size="sayzobtn"  className="w-full text-xs transition-all">
                                            View Details
                                        </Button>
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
