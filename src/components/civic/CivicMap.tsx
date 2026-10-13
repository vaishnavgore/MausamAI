import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  CloudRain, 
  RotateCcw
} from 'lucide-react';
import { Incident } from '@/types/incident';
import { useApp } from '@/context/AppContext';
import { IncidentCard } from './IncidentCard';
import { RadarPlayer, RADAR_FRAMES } from './RadarPlayer';

interface CivicMapProps {
  onSelectIncident?: (incident: Incident) => void;
  selectedIncident?: Incident | null;
  heightClass?: string;
  showRoutePolyline?: boolean;
}

export const CivicMap: React.FC<CivicMapProps> = ({
  onSelectIncident,
  selectedIncident: externalSelected,
  heightClass = 'h-[540px]',
  showRoutePolyline = true,
}) => {
  const { incidents, selectedRoute, location, theme } = useApp();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const radarLayerRef = useRef<L.LayerGroup | null>(null);
  const routeLayerRef = useRef<L.LayerGroup | null>(null);

  const [internalSelected, setInternalSelected] = useState<Incident | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [showRadar, setShowRadar] = useState<boolean>(true);
  const [radarFrame, setRadarFrame] = useState<number>(RADAR_FRAMES.length - 1);

  const activeSelected = externalSelected !== undefined ? externalSelected : internalSelected;

  const handleSelect = (inc: Incident | null) => {
    setInternalSelected(inc);
    if (onSelectIncident && inc) {
      onSelectIncident(inc);
    }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Create Leaflet Map centered on Pune
    const map = L.map(mapContainerRef.current, {
      center: [location.lat || 18.5204, location.lng || 73.8567],
      zoom: 12,
      zoomControl: false,
    });

    const tileUrl = theme === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    // High precision Carto basemap tiles
    const tileLayer = L.tileLayer(tileUrl, {
      attribution: '&copy; CARTO &copy; OpenStreetMap',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    radarLayerRef.current = L.layerGroup().addTo(map);
    routeLayerRef.current = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update tile layer basemap on theme change
  useEffect(() => {
    if (tileLayerRef.current) {
      const tileUrl = theme === 'dark'
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
      tileLayerRef.current.setUrl(tileUrl);
    }
  }, [theme]);

  // Update center when location changes
  useEffect(() => {
    if (mapInstanceRef.current && location) {
      mapInstanceRef.current.setView([location.lat, location.lng], 12);
    }
  }, [location]);

  // Render Markers & Route
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    // 1. User Location Pin
    const userIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-7 h-7 rounded-full bg-blue-500/25 animate-ping"></div>
          <div class="w-5 h-5 rounded-full bg-blue-600 border-2 border-white shadow-md flex items-center justify-center">
            <div class="w-2 h-2 rounded-full bg-white"></div>
          </div>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    L.marker([location.lat, location.lng], { icon: userIcon, zIndexOffset: 1000 })
      .addTo(markersLayerRef.current)
      .bindPopup(`<div class="text-xs font-bold text-slate-900 p-1">Current Station: ${location.city}</div>`);

    // 2. Filter Incidents
    const filtered = incidents.filter((inc) => {
      if (filterType === 'all') return true;
      if (filterType === 'waterlogging') return inc.type === 'waterlogging';
      if (filterType === 'fallen_tree') return inc.type === 'fallen_tree';
      if (filterType === 'road_hazards') return inc.type === 'road_damage' || inc.type === 'road_blockage' || inc.type === 'accident';
      return true;
    });

    // 3. Render Incident Custom Markers with animated pulse beacon on high-risk items
    filtered.forEach((inc) => {
      let pinColor = 'bg-rose-600';
      let iconSvg = '⚠';
      const isHigh = inc.severity === 'high' && inc.verificationStatus !== 'resolved';

      if (inc.verificationStatus === 'resolved') {
        pinColor = 'bg-emerald-600';
        iconSvg = '✓';
      } else if (inc.type === 'waterlogging') {
        pinColor = 'bg-blue-600';
        iconSvg = '💧';
      } else if (inc.type === 'fallen_tree') {
        pinColor = 'bg-amber-600';
        iconSvg = '🌲';
      } else if (inc.type === 'low_visibility') {
        pinColor = 'bg-purple-600';
        iconSvg = '🌫';
      }

      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div class="relative cursor-pointer flex items-center justify-center group">
            ${isHigh ? '<div class="absolute w-8 h-8 rounded-full bg-rose-500/35 animate-ping"></div>' : ''}
            <div class="w-7 h-7 rounded-full ${pinColor} text-white font-bold text-[11px] flex items-center justify-center shadow-md border-2 border-white group-hover:scale-110 transition-transform">
              ${iconSvg}
            </div>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });

      const marker = L.marker([inc.latitude, inc.longitude], { icon: customIcon });

      marker.on('click', () => {
        handleSelect(inc);
      });

      marker.addTo(markersLayerRef.current!);
    });
  }, [incidents, filterType, location]);

  // Dynamic Animated Doppler Radar Layer driven by radarFrame
  useEffect(() => {
    if (!mapInstanceRef.current || !radarLayerRef.current) return;
    radarLayerRef.current.clearLayers();

    if (showRadar) {
      const frameData = RADAR_FRAMES[radarFrame] || RADAR_FRAMES[RADAR_FRAMES.length - 1];
      const dLat = frameData.cloudOffsetLat;
      const dLng = frameData.cloudOffsetLng;
      const s = frameData.scale;

      const baseCoords: [number, number][] = [
        [18.570, 73.760],
        [18.585, 73.800],
        [18.540, 73.840],
        [18.515, 73.810],
        [18.530, 73.750],
      ];

      const centerLat = 18.548;
      const centerLng = 73.792;

      const shiftedCoords = baseCoords.map(([lat, lng]): [number, number] => [
        centerLat + (lat - centerLat) * s + dLat,
        centerLng + (lng - centerLng) * s + dLng,
      ]);

      const radarPolygon = L.polygon(shiftedCoords, {
        color: '#0284c7',
        weight: 1.5,
        fillColor: '#38bdf8',
        fillOpacity: 0.28,
      }).bindPopup(
        `<div class="text-xs font-semibold p-1 text-slate-900">
          <p class="font-bold">IMD Doppler Radar Echo</p>
          <p class="text-slate-600">${frameData.time} • ${frameData.intensity}</p>
        </div>`
      );

      radarPolygon.addTo(radarLayerRef.current);
    }
  }, [showRadar, radarFrame]);

  // Render Selected Route Polyline
  useEffect(() => {
    if (!mapInstanceRef.current || !routeLayerRef.current) return;
    routeLayerRef.current.clearLayers();

    if (showRoutePolyline && selectedRoute && selectedRoute.coordinates) {
      const lineColor = selectedRoute.riskLevel === 'high_risk' ? '#e11d48' : selectedRoute.riskLevel === 'advisory' ? '#d97706' : '#059669';
      
      const polyline = L.polyline(selectedRoute.coordinates, {
        color: lineColor,
        weight: 5,
        opacity: 0.85,
        dashArray: selectedRoute.riskLevel === 'high_risk' ? '6, 8' : undefined,
      });

      polyline.addTo(routeLayerRef.current);
    }
  }, [selectedRoute, showRoutePolyline]);

  const recenterMap = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([location.lat, location.lng], 12);
    }
  };

  return (
    <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.6)] bg-white dark:bg-[#070b16]`}>
      
      {/* Map Element Container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Top Map Controls Overlay: Minimal Pill Bar */}
      <div className="absolute top-3 left-3 z-[400] flex flex-wrap items-center gap-1.5 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-[0_8px_24px_rgba(0,0,0,0.6)] text-xs">
        
        <button
          onClick={() => setFilterType('all')}
          className={`px-2.5 py-1 rounded-lg font-semibold transition ${
            filterType === 'all'
              ? 'bg-blue-600 text-white font-semibold shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          All ({incidents.length})
        </button>

        <button
          onClick={() => setFilterType('waterlogging')}
          className={`px-2.5 py-1 rounded-lg font-semibold transition ${
            filterType === 'waterlogging'
              ? 'bg-blue-600 text-white font-semibold shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Waterlogging
        </button>

        <button
          onClick={() => setFilterType('fallen_tree')}
          className={`px-2.5 py-1 rounded-lg font-semibold transition ${
            filterType === 'fallen_tree'
              ? 'bg-blue-600 text-white font-semibold shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Trees
        </button>

        <button
          onClick={() => setFilterType('road_hazards')}
          className={`px-2.5 py-1 rounded-lg font-semibold transition ${
            filterType === 'road_hazards'
              ? 'bg-blue-600 text-white font-semibold shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Hazards
        </button>

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-0.5"></div>

        {/* Radar Layer Toggle */}
        <button
          onClick={() => setShowRadar(!showRadar)}
          className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 transition ${
            showRadar
              ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <CloudRain className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
          <span>Radar Layer</span>
        </button>

        <button
          onClick={recenterMap}
          className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          title="Recenter map"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Interactive Doppler Radar Player Toolbar (Bottom Center) */}
      {showRadar && (
        <div className="absolute top-14 left-3 z-[400] max-w-md animate-in fade-in duration-150">
          <RadarPlayer
            currentFrame={radarFrame}
            onFrameChange={setRadarFrame}
          />
        </div>
      )}

      {/* Map Legend (Minimal) */}
      <div className="absolute bottom-3 left-3 z-[400] bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs text-[10px] text-slate-600 dark:text-slate-300 hidden md:flex items-center gap-3">
        <span className="font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Legend:</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> High Risk</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Fallen Tree</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 dark:bg-cyan-500"></span> Waterlogging</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span> Radar Echo</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Resolved</span>
      </div>

      {/* Floating Selected Incident Drawer */}
      {activeSelected && (
        <div className="absolute top-3 right-3 bottom-3 z-[450] w-full max-w-sm overflow-y-auto pr-1 animate-in slide-in-from-right-4 duration-200">
          <IncidentCard
            incident={activeSelected}
            onClose={() => handleSelect(null)}
          />
        </div>
      )}

    </div>
  );
};
