'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { useFleetStore } from '@/store/fleetStore';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function FleetMap() {
  const { trips } = useFleetStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white rounded-lg shadow p-4 sm:p-6 h-[300px] sm:h-[400px] lg:h-[600px] flex items-center justify-center">
        <p className="text-sm sm:text-base text-gray-500">Loading map...</p>
      </div>
    );
  }

  const center: [number, number] = [39.8283, -98.5795]; // Center of USA

  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#10b981';
      case 'completed':
        return '#3b82f6';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Live Fleet Map</h2>
      <div className="h-[300px] sm:h-[400px] lg:h-[600px] rounded-lg overflow-hidden">
        <MapContainer
          center={center}
          zoom={4}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {Object.entries(trips).map(([tripId, trip]) => {
            if (!trip.currentLocation) return null;

            const positions: [number, number][] = trip.events
              .slice(0, trip.currentEventIndex + 1)
              .filter((e) => e.location)
              .map((e) => [e.location.lat, e.location.lng]);

            return (
              <div key={tripId}>
                {positions.length > 1 && (
                  <Polyline
                    positions={positions}
                    color={getMarkerColor(trip.status)}
                    weight={3}
                    opacity={0.6}
                  />
                )}
                <Marker
                  position={[trip.currentLocation.lat, trip.currentLocation.lng]}
                  icon={icon}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold">{trip.vehicle_id}</h3>
                      <p className="text-sm">Status: {trip.status}</p>
                      <p className="text-sm">Speed: {trip.currentSpeed?.toFixed(1)} km/h</p>
                      <p className="text-sm">
                        Progress: {trip.currentEventIndex}/{trip.events.length}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              </div>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
