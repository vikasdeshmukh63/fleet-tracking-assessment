'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useFleetStore } from '@/store/fleetStore';
import FleetMetrics from '@/components/FleetMetrics';
import TripList from '@/components/TripList';
import SimulationControls from '@/components/SimulationControls';
import { FleetEvent } from '@/types/fleet';

const FleetMap = dynamic(() => import('@/components/FleetMap'), {
  ssr: false,
  loading: () => (
    <div className="bg-white rounded-lg shadow p-6 h-[600px] flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

export default function Home() {
  const { loadTrips, trips } = useFleetStore();

  useEffect(() => {
    // Load all trip data
    const loadAllTrips = async () => {
      try {
        const tripFiles = [
          'trip_1_cross_country',
          'trip_2_urban_dense',
          'trip_3_mountain_cancelled',
          'trip_4_southern_technical',
          'trip_5_regional_logistics',
        ];

        const tripsData: Record<string, FleetEvent[]> = {};

        for (const tripFile of tripFiles) {
          const response = await fetch(`/data/${tripFile}.json`);
          const data = await response.json();
          tripsData[tripFile] = data;
        }

        loadTrips(tripsData);
      } catch (error) {
        console.error('Error loading trip data:', error);
      }
    };

    loadAllTrips();
  }, [loadTrips]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <header className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Fleet Tracking Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Real-time monitoring of {Object.keys(trips).length} simultaneous trips
          </p>
        </header>

        <SimulationControls />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="xl:col-span-2 order-2 xl:order-1">
            <FleetMap />
          </div>
          <div className="order-1 xl:order-2">
            <FleetMetrics />
          </div>
        </div>

        <TripList />
      </div>
    </main>
  );
}
