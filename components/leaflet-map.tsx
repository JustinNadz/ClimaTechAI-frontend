"use client"

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Define props interface
interface LeafletMapProps {
  selectedFilter: string;
  filteredZones: Array<{
    id: number;
    type: string;
    level: string;
    name: string;
    position: number[];
  }>;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ selectedFilter, filteredZones }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Fix default marker icon issue
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });

    // Clean up previous map instance if it exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Create new map instance
    const map = L.map(mapRef.current).setView([13.41, 122.56], 6);
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add keyframes for pulse-glow if not already added
    if (!document.getElementById('pulse-glow-keyframes')) {
      const style = document.createElement('style');
      style.id = 'pulse-glow-keyframes';
      style.innerHTML = `
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 16px 8px rgba(var(--glow-color-rgb), 0.5), 0 0 32px 16px rgba(var(--glow-color-rgb), 0.25); }
          100% { box-shadow: 0 0 32px 16px rgba(var(--glow-color-rgb), 0.5), 0 0 48px 24px rgba(var(--glow-color-rgb), 0.25); }
        }
      `;
      document.head.appendChild(style);
    }

    // Add markers
    filteredZones.forEach(zone => {
      let color = '#3b82f6'; // default blue
      let colorRGB = '59, 130, 246';
      
      if (zone.type === 'flood') {
        color = '#ef4444'; // red
        colorRGB = '239, 68, 68';
      } else if (zone.type === 'landslide') {
        color = '#f59e42'; // orange
        colorRGB = '245, 158, 66';
      } else if (zone.type === 'fire') {
        color = '#fbbf24'; // yellow
        colorRGB = '251, 191, 36';
      } else if (zone.type === 'clean') {
        color = '#2563eb'; // blue
        colorRGB = '37, 99, 235';
      } else if (zone.type === 'low') {
        color = '#22c55e'; // green
        colorRGB = '34, 197, 94';
      }
      
      const marker = L.circleMarker([zone.position[0], zone.position[1]], {
        radius: 6,
        color: color,
        fillColor: color,
        fillOpacity: 0.8
      }).addTo(map);
      
      // Add popup
      marker.bindPopup(`<b>${zone.name}</b><br>${zone.type.charAt(0).toUpperCase() + zone.type.slice(1)} Risk`);
      
      // Create glow effect as a separate div
      const markerElement = marker.getElement();
      if (markerElement) {
        const glowElement = document.createElement('div');
        glowElement.className = 'marker-glow';
        glowElement.style.cssText = `
          position: absolute;
          left: -22px;
          top: -22px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          background: transparent;
          --glow-color-rgb: ${colorRGB};
          animation: pulse-glow 1.5s infinite alternate;
        `;
        markerElement.appendChild(glowElement);
      }
    });

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [selectedFilter, filteredZones]); // Re-initialize when filter or zones change

  return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />;
};

export default LeafletMap; 