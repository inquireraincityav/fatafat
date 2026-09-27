"use client";

import { useEffect, useRef, useCallback } from "react";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

type LineFilter = "all" | "western" | "central" | "harbour" | "metro";

interface Station {
  name: string;
  lat: number;
  lng: number;
  line: LineFilter;
}

interface AreaLabel {
  name: string;
  lat: number;
  lng: number;
}

const LINE_COLORS: Record<string, string> = {
  western: "#3b82f6",
  central: "#ef4444",
  harbour: "#22c55e",
  metro: "#a855f7",
};

const westernStations: Station[] = [
  { name: "Churchgate", lat: 18.9352, lng: 72.8278, line: "western" },
  { name: "Marine Lines", lat: 18.9432, lng: 72.8234, line: "western" },
  { name: "Charni Road", lat: 18.9512, lng: 72.8195, line: "western" },
  { name: "Grant Road", lat: 18.9592, lng: 72.8168, line: "western" },
  { name: "Mumbai Central", lat: 18.9691, lng: 72.8194, line: "western" },
  { name: "Mahalaxmi", lat: 18.9825, lng: 72.8199, line: "western" },
  { name: "Lower Parel", lat: 18.9943, lng: 72.8268, line: "western" },
  { name: "Prabhadevi", lat: 19.0012, lng: 72.8283, line: "western" },
  { name: "Dadar", lat: 19.0178, lng: 72.8428, line: "western" },
  { name: "Matunga Road", lat: 19.0275, lng: 72.8467, line: "western" },
  { name: "Mahim", lat: 19.0423, lng: 72.8454, line: "western" },
  { name: "Bandra", lat: 19.0544, lng: 72.8402, line: "western" },
  { name: "Khar Road", lat: 19.0653, lng: 72.8371, line: "western" },
  { name: "Santacruz", lat: 19.0805, lng: 72.8389, line: "western" },
  { name: "Vile Parle", lat: 19.0983, lng: 72.8437, line: "western" },
  { name: "Andheri", lat: 19.1197, lng: 72.8468, line: "western" },
  { name: "Jogeshwari", lat: 19.1363, lng: 72.8494, line: "western" },
  { name: "Goregaon", lat: 19.1551, lng: 72.8496, line: "western" },
  { name: "Malad", lat: 19.1711, lng: 72.8474, line: "western" },
  { name: "Kandivali", lat: 19.1940, lng: 72.8498, line: "western" },
  { name: "Borivali", lat: 19.2289, lng: 72.8568, line: "western" },
  { name: "Dahisar", lat: 19.2432, lng: 72.8537, line: "western" },
  { name: "Mira Road", lat: 19.2808, lng: 72.8545, line: "western" },
  { name: "Bhayandar", lat: 19.3008, lng: 72.8513, line: "western" },
  { name: "Naigaon", lat: 19.3517, lng: 72.8487, line: "western" },
  { name: "Vasai Road", lat: 19.3698, lng: 72.8281, line: "western" },
  { name: "Virar", lat: 19.4559, lng: 72.8114, line: "western" },
];

const centralStations: Station[] = [
  { name: "CSMT", lat: 18.9398, lng: 72.8355, line: "central" },
  { name: "Masjid", lat: 18.9478, lng: 72.8393, line: "central" },
  { name: "Sandhurst Road", lat: 18.9565, lng: 72.8413, line: "central" },
  { name: "Byculla", lat: 18.9779, lng: 72.8334, line: "central" },
  { name: "Chinchpokli", lat: 18.9874, lng: 72.8321, line: "central" },
  { name: "Currey Road", lat: 18.9942, lng: 72.8339, line: "central" },
  { name: "Parel", lat: 19.0067, lng: 72.8363, line: "central" },
  { name: "Dadar Central", lat: 19.0183, lng: 72.8440, line: "central" },
  { name: "Matunga", lat: 19.0275, lng: 72.8535, line: "central" },
  { name: "Sion", lat: 19.0440, lng: 72.8622, line: "central" },
  { name: "Kurla", lat: 19.0650, lng: 72.8795, line: "central" },
  { name: "Vidyavihar", lat: 19.0790, lng: 72.8891, line: "central" },
  { name: "Ghatkopar", lat: 19.0865, lng: 72.9080, line: "central" },
  { name: "Vikhroli", lat: 19.1069, lng: 72.9171, line: "central" },
  { name: "Kanjurmarg", lat: 19.1262, lng: 72.9280, line: "central" },
  { name: "Bhandup", lat: 19.1431, lng: 72.9375, line: "central" },
  { name: "Nahur", lat: 19.1527, lng: 72.9405, line: "central" },
  { name: "Mulund", lat: 19.1728, lng: 72.9510, line: "central" },
  { name: "Thane", lat: 19.1856, lng: 72.9752, line: "central" },
  { name: "Kalwa", lat: 19.2005, lng: 72.9918, line: "central" },
  { name: "Dombivli", lat: 19.2183, lng: 73.0867, line: "central" },
  { name: "Kalyan", lat: 19.2437, lng: 73.1305, line: "central" },
];

const harbourStations: Station[] = [
  { name: "CSMT Harbour", lat: 18.9398, lng: 72.8355, line: "harbour" },
  { name: "Dockyard Road", lat: 18.9558, lng: 72.8453, line: "harbour" },
  { name: "Reay Road", lat: 18.9638, lng: 72.8440, line: "harbour" },
  { name: "Cotton Green", lat: 18.9738, lng: 72.8460, line: "harbour" },
  { name: "Sewri", lat: 18.9878, lng: 72.8510, line: "harbour" },
  { name: "Wadala Road", lat: 19.0058, lng: 72.8580, line: "harbour" },
  { name: "GTB Nagar", lat: 19.0137, lng: 72.8590, line: "harbour" },
  { name: "Chunabhatti", lat: 19.0270, lng: 72.8640, line: "harbour" },
  { name: "Kurla Harbour", lat: 19.0650, lng: 72.8795, line: "harbour" },
  { name: "Tilak Nagar", lat: 19.0685, lng: 72.8900, line: "harbour" },
  { name: "Chembur", lat: 19.0625, lng: 72.8960, line: "harbour" },
  { name: "Govandi", lat: 19.0501, lng: 72.9083, line: "harbour" },
  { name: "Mankhurd", lat: 19.0449, lng: 72.9226, line: "harbour" },
  { name: "Vashi", lat: 19.0667, lng: 72.9988, line: "harbour" },
  { name: "Sanpada", lat: 19.0710, lng: 73.0105, line: "harbour" },
  { name: "Juinagar", lat: 19.0630, lng: 73.0205, line: "harbour" },
  { name: "Nerul", lat: 19.0337, lng: 73.0162, line: "harbour" },
  { name: "Seawoods-Darave", lat: 19.0222, lng: 73.0184, line: "harbour" },
  { name: "Belapur", lat: 19.0230, lng: 73.0390, line: "harbour" },
  { name: "Kharghar", lat: 19.0373, lng: 73.0624, line: "harbour" },
  { name: "Panvel", lat: 18.9929, lng: 73.1088, line: "harbour" },
];

const metroStations: Station[] = [
  { name: "Versova", lat: 19.1310, lng: 72.8175, line: "metro" },
  { name: "D.N. Nagar", lat: 19.1268, lng: 72.8295, line: "metro" },
  { name: "Azad Nagar", lat: 19.1243, lng: 72.8365, line: "metro" },
  { name: "Andheri Metro", lat: 19.1189, lng: 72.8464, line: "metro" },
  { name: "Western Express Highway", lat: 19.1093, lng: 72.8640, line: "metro" },
  { name: "Chakala", lat: 19.1095, lng: 72.8730, line: "metro" },
  { name: "Airport Road", lat: 19.0987, lng: 72.8740, line: "metro" },
  { name: "Marol Naka", lat: 19.0935, lng: 72.8823, line: "metro" },
  { name: "Saki Naka", lat: 19.0860, lng: 72.8878, line: "metro" },
  { name: "Asalpha", lat: 19.0842, lng: 72.8965, line: "metro" },
  { name: "Jagruti Nagar", lat: 19.0832, lng: 72.9023, line: "metro" },
  { name: "Ghatkopar Metro", lat: 19.0865, lng: 72.9084, line: "metro" },
];

const allStations: Station[] = [
  ...westernStations,
  ...centralStations,
  ...harbourStations,
  ...metroStations,
];

const areaLabels: AreaLabel[] = [
  { name: "Colaba", lat: 18.9067, lng: 72.8147 },
  { name: "Fort", lat: 18.9340, lng: 72.8380 },
  { name: "Girgaon", lat: 18.9550, lng: 72.8130 },
  { name: "Worli", lat: 19.0040, lng: 72.8150 },
  { name: "Bandra West", lat: 19.0596, lng: 72.8295 },
  { name: "Juhu", lat: 19.0887, lng: 72.8265 },
  { name: "Vile Parle East", lat: 19.0970, lng: 72.8560 },
  { name: "Andheri West", lat: 19.1260, lng: 72.8300 },
  { name: "Andheri East", lat: 19.1155, lng: 72.8700 },
  { name: "Powai", lat: 19.1197, lng: 72.9060 },
  { name: "Goregaon East", lat: 19.1580, lng: 72.8640 },
  { name: "Malad West", lat: 19.1720, lng: 72.8330 },
  { name: "Borivali East", lat: 19.2290, lng: 72.8700 },
  { name: "Thane West", lat: 19.1900, lng: 72.9600 },
  { name: "Navi Mumbai", lat: 19.0550, lng: 73.0150 },
  { name: "Dharavi", lat: 19.0428, lng: 72.8558 },
  { name: "Sion East", lat: 19.0410, lng: 72.8700 },
  { name: "BKC", lat: 19.0650, lng: 72.8620 },
  { name: "Vikhroli East", lat: 19.1100, lng: 72.9300 },
  { name: "Mulund West", lat: 19.1750, lng: 72.9400 },
  { name: "Chembur East", lat: 19.0550, lng: 72.9050 },
  { name: "Wadala", lat: 19.0120, lng: 72.8600 },
  { name: "Parel Village", lat: 19.0050, lng: 72.8300 },
  { name: "Mahim Bay", lat: 19.0370, lng: 72.8360 },
  { name: "Santacruz East", lat: 19.0790, lng: 72.8520 },
  { name: "Kandivali West", lat: 19.1980, lng: 72.8350 },
  { name: "Dahisar East", lat: 19.2500, lng: 72.8650 },
];

const linePolylines: Record<string, [number, number][]> = {
  western: westernStations.map((s) => [s.lat, s.lng]),
  central: centralStations.map((s) => [s.lat, s.lng]),
  harbour: harbourStations.map((s) => [s.lat, s.lng]),
  metro: metroStations.map((s) => [s.lat, s.lng]),
};

interface MumbaiTransitMapProps {
  activeFilter?: LineFilter;
  className?: string;
  dark?: boolean;
  compact?: boolean;
}

export default function MumbaiTransitMap({
  activeFilter = "all",
  className = "",
  dark = false,
  compact = false,
}: MumbaiTransitMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  const filterRef = useRef(activeFilter);
  filterRef.current = activeFilter;

  const renderLayers = useCallback(
    (map: LeafletMap, L: typeof import("leaflet"), filter: LineFilter) => {
      map.eachLayer((layer) => {
        if (layer instanceof L.Polyline || layer instanceof L.CircleMarker) {
          map.removeLayer(layer);
        }
      });
      map.eachLayer((layer) => {
        if (
          layer instanceof L.Marker &&
          (layer.options as Record<string, unknown>).isAreaLabel
        ) {
          map.removeLayer(layer);
        }
      });

      const linesToShow =
        filter === "all"
          ? (["western", "central", "harbour", "metro"] as const)
          : [filter];

      linesToShow.forEach((line) => {
        const coords = linePolylines[line];
        if (!coords) return;
        L.polyline(coords, {
          color: LINE_COLORS[line],
          weight: 3,
          opacity: 0.9,
        }).addTo(map);
      });

      const stationsToShow =
        filter === "all"
          ? allStations
          : allStations.filter((s) => s.line === filter);

      const zoom = map.getZoom();

      stationsToShow.forEach((station) => {
        const marker = L.circleMarker([station.lat, station.lng], {
          radius: zoom >= 13 ? 4 : 3,
          fillColor: LINE_COLORS[station.line],
          color: dark ? "#1f2937" : "#ffffff",
          weight: 1.5,
          fillOpacity: 1,
        }).addTo(map);

        marker.bindTooltip(station.name, {
          permanent: zoom >= 14,
          direction: "right",
          offset: [6, 0],
          className: `transit-tooltip ${dark ? "dark" : "light"}`,
        });
      });

      if (zoom >= 13) {
        areaLabels.forEach((area) => {
          const icon = L.divIcon({
            html: `<span class="area-label ${dark ? "dark" : "light"}">${area.name}</span>`,
            className: "area-label-container",
            iconSize: [0, 0],
            iconAnchor: [0, 0],
          });
          L.marker([area.lat, area.lng], {
            icon,
            interactive: false,
            isAreaLabel: true,
          } as L.MarkerOptions & { isAreaLabel: boolean }).addTo(map);
        });
      }
    },
    [dark]
  );

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let cancelled = false;

    async function init() {
      const L = await import("leaflet");

      if (cancelled || !mapRef.current) return;

      leafletRef.current = L;

      const map = L.map(mapRef.current, {
        center: [19.04, 72.87],
        zoom: compact ? 11 : 12,
        zoomControl: false,
        attributionControl: false,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
        subdomains: "abcd",
      }).addTo(map);

      if (dark && mapRef.current) {
        mapRef.current.classList.add("map-dark-tiles");
      }

      mapInstanceRef.current = map;

      setTimeout(() => {
        map.invalidateSize();
      }, 100);

      renderLayers(map, L, filterRef.current);

      map.on("zoomend", () => {
        renderLayers(map, L, filterRef.current);
      });
    }

    init();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [dark, compact, renderLayers]);

  useEffect(() => {
    if (!mapInstanceRef.current || !leafletRef.current) return;
    const map = mapInstanceRef.current;
    const L = leafletRef.current;

    renderLayers(map, L, activeFilter);

    if (activeFilter !== "all") {
      const coords = linePolylines[activeFilter];
      if (coords && coords.length > 0) {
        map.fitBounds(L.latLngBounds(coords as [number, number][]), {
          padding: [30, 30],
        });
      }
    }
  }, [activeFilter, renderLayers]);

  return (
    <div
      ref={mapRef}
      className={className}
      style={{ width: "100%", height: "100%", minHeight: compact ? 280 : 400 }}
    />
  );
}
