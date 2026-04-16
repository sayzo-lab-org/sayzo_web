"use client"

import { useState, useEffect, useRef, useMemo } from 'react';
import { MapPin, Expand, ChevronUp, IndianRupee } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import TaskDetailsModal from '@/components/TaskDetailsModal';

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
    const [selectedTask, setSelectedTask] = useState(null);
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
        { id: 1, pos: [baseLat + 0.002, baseLng + 0.002], title: "SAYZO is looking for Best Video Editor", prize: 15000, category: "Video Editing", taskType: "online", experience: "intermediate", duration: "2 weeks", description: "Edit short-form and long-form videos for our marketing channels.", customerName: "SAYZO" },
        { id: 2, pos: [baseLat - 0.003, baseLng + 0.007], title: "Video Editing", prize: 5000, category: "Video Editing", taskType: "online", experience: "beginner", duration: "1 week", description: "Edit 5 reels with music and captions.", customerName: "Rahul K" },
        { id: 3, pos: [baseLat + 0.006, baseLng - 0.020], title: "Looking For 10 Content Creators", prize: 8000, category: "Content Creation", taskType: "online", experience: "beginner", duration: "1 month", description: "Create engaging content for Instagram and YouTube.", customerName: "Creator Hub" },
        { id: 4, pos: [baseLat - 0.005, baseLng - 0.010], title: "Digital Marketing and Lead generation", prize: 25000, category: "Marketing", taskType: "online", experience: "expert", duration: "1 month", description: "Run ad campaigns and generate qualified leads.", customerName: "GrowthX" },
        { id: 5, pos: [baseLat + 0.012, baseLng - 0.006], title: "I need a Shopify Developer", prize: 35000, category: "Development", taskType: "online", experience: "expert", duration: "3 weeks", description: "Build a custom Shopify storefront with payment integration.", customerName: "StoreFront" },
        { id: 6, pos: [baseLat + 0.007, baseLng + 0.013], title: "Distribute flyers", prize: 2000, category: "Marketing", taskType: "offline", experience: "beginner", duration: "2 days", location: "Koramangala", description: "Distribute 500 flyers at metro stations.", customerName: "LocalBiz" },
        { id: 7, pos: [baseLat - 0.009, baseLng + 0.004], title: "Need a Logo Designer urgently", prize: 3500, category: "Design", taskType: "online", experience: "intermediate", duration: "3 days", description: "Design a modern minimal logo for a fintech startup.", customerName: "FinNova" },
        { id: 8, pos: [baseLat + 0.015, baseLng + 0.009], title: "Hiring Freelance Web Developer", prize: 45000, category: "Development", taskType: "online", experience: "expert", duration: "1 month", description: "Build a responsive Next.js web app.", customerName: "TechCo" },
        { id: 9, pos: [baseLat - 0.011, baseLng - 0.015], title: "Instagram Reels Creator Wanted", prize: 6000, category: "Content Creation", taskType: "online", experience: "intermediate", duration: "2 weeks", description: "Create 10 viral-style reels per week.", customerName: "SocialPro" },
        { id: 10, pos: [baseLat + 0.004, baseLng - 0.008], title: "Social Media Manager Required", prize: 18000, category: "Marketing", taskType: "online", experience: "intermediate", duration: "1 month", description: "Manage all social handles and grow engagement.", customerName: "BrandHouse" },
        { id: 11, pos: [baseLat - 0.007, baseLng + 0.018], title: "Need a Photographer for Event", prize: 12000, category: "Photography", taskType: "offline", experience: "intermediate", duration: "1 day", location: "Indiranagar", description: "Cover a corporate event, deliver edited photos.", customerName: "Events Ltd" },
        { id: 12, pos: [baseLat + 0.018, baseLng - 0.012], title: "Looking for UI/UX Designer", prize: 30000, category: "Design", taskType: "online", experience: "expert", duration: "3 weeks", description: "Design the UX for a new mobile banking app.", customerName: "NeoBank" },
        { id: 13, pos: [baseLat - 0.014, baseLng - 0.004], title: "Content Writer for Blog Posts", prize: 7000, category: "Writing", taskType: "online", experience: "intermediate", duration: "2 weeks", description: "Write 10 SEO-optimised blog posts of 1500 words.", customerName: "BlogHouse" },
        { id: 14, pos: [baseLat + 0.009, baseLng + 0.021], title: "SEO Expert needed for Startup", prize: 22000, category: "Marketing", taskType: "online", experience: "expert", duration: "1 month", description: "Audit and improve our SEO ranking.", customerName: "Startly" },
        { id: 15, pos: [baseLat - 0.016, baseLng + 0.011], title: "Voice Over Artist Required", prize: 4500, category: "Audio", taskType: "online", experience: "intermediate", duration: "1 week", description: "Record a 5-minute voiceover in English.", customerName: "Podcastr" },
        { id: 16, pos: [baseLat + 0.003, baseLng - 0.024], title: "Hiring Mobile App Developer", prize: 55000, category: "Development", taskType: "online", experience: "expert", duration: "6 weeks", description: "Build a cross-platform Flutter app.", customerName: "Appify" },
        { id: 17, pos: [baseLat - 0.002, baseLng + 0.025], title: "Need Help with WordPress Site", prize: 6500, category: "Development", taskType: "online", experience: "intermediate", duration: "1 week", description: "Fix bugs and optimise speed of an existing WP site.", customerName: "WebGuru" },
        { id: 18, pos: [baseLat + 0.021, baseLng + 0.003], title: "Animation Artist for YouTube", prize: 20000, category: "Design", taskType: "online", experience: "expert", duration: "3 weeks", description: "Create animated explainer videos for a YT channel.", customerName: "AnimateIt" },
        { id: 19, pos: [baseLat - 0.019, baseLng - 0.008], title: "Data Entry Operators Needed", prize: 8000, category: "Admin", taskType: "online", experience: "beginner", duration: "2 weeks", description: "Enter data from scanned PDFs into Excel.", customerName: "DataLogix" },
        { id: 20, pos: [baseLat + 0.011, baseLng - 0.017], title: "Graphic Designer for Posters", prize: 5500, category: "Design", taskType: "online", experience: "intermediate", duration: "1 week", description: "Design 15 social media posters.", customerName: "Poster Co" },
        { id: 21, pos: [baseLat - 0.006, baseLng - 0.022], title: "Looking for Translator Hindi-English", prize: 4000, category: "Writing", taskType: "online", experience: "intermediate", duration: "5 days", description: "Translate a 20-page document from Hindi to English.", customerName: "LinguaPro" },
        { id: 22, pos: [baseLat + 0.014, baseLng + 0.016], title: "Event Promoter for College Fest", prize: 3000, category: "Marketing", taskType: "offline", experience: "beginner", duration: "3 days", location: "Whitefield", description: "Promote a college fest on campus.", customerName: "FestHub" },
    ];

    const openTaskModal = (task) => {
        setSelectedTask({
            ...task,
            taskName: task.title,
            amount: task.prize,
        });
    };

    if (!icons.sayzoIcon) return null;

    return (
        <div
            ref={mapWrapperRef}
            className={`flex flex-col bg-white border border-gray-300 shadow-sm font-sans transition-all duration-300 ${
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
            <div className="flex-grow relative w-full min-h-0 bg-gray-50">
                <MapContainer center={defaultCenter} zoom={13} className="h-full w-full z-0" scrollWheelZoom={false}>
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
                                <div className="min-w-[140px]">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                        <span className="text-[10px] uppercase tracking-wider text-gray-400">Available</span>
                                    </div>
                                    <h3 className="text-gray-900 leading-tight mb-2 text-sm">{task.title}</h3>

                                    <div className="flex items-center gap-1 mb-3 text-emerald-600 font-semibold text-sm">
                                        <IndianRupee className="w-3.5 h-3.5" />
                                        <span>{task.prize.toLocaleString('en-IN')}</span>
                                    </div>

                                    <Button
                                        size="sayzobtn"
                                        onClick={() => openTaskModal(task)}
                                        className="w-full text-xs transition-all"
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                {/* Recent Tasks Ticker - auto-scrolling marquee */}
                <div className="absolute bottom-0 left-0 right-0 z-[500] bg-white/95 backdrop-blur-sm border-t border-gray-200 py-2 overflow-hidden">
                    <div className="flex items-center gap-2 px-3">
                        <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-emerald-600 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Recent
                        </span>
                        <div className="flex-1 overflow-hidden relative">
                            <div className="flex gap-2 animate-marquee whitespace-nowrap">
                                {[...mockTasks, ...mockTasks].map((task, idx) => (
                                    <button
                                        key={`${task.id}-${idx}`}
                                        type="button"
                                        onClick={() => openTaskModal(task)}
                                        className="shrink-0 text-xs px-3 py-1 rounded-full bg-gray-100 hover:bg-emerald-50 hover:text-emerald-700 text-gray-700 transition-colors border border-gray-200 flex items-center gap-1.5"
                                    >
                                        <span>{task.title}</span>
                                        <span className="text-emerald-600 font-semibold flex items-center">
                                            <IndianRupee className="w-3 h-3" />
                                            {task.prize.toLocaleString('en-IN')}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <TaskDetailsModal
                task={selectedTask}
                isOpen={!!selectedTask}
                onClose={() => setSelectedTask(null)}
                onApply={() => setSelectedTask(null)}
            />
        </div>
    );
};

export default HomeMap;
