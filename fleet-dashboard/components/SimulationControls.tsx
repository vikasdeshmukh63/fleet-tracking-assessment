'use client';

import { useEffect, useRef } from 'react';
import { useFleetStore } from '@/store/fleetStore';

export default function SimulationControls() {
  const { isPlaying, playbackSpeed, trips, startSimulation, pauseSimulation, setPlaybackSpeed, updateTripEvent } = useFleetStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        Object.entries(trips).forEach(([tripId, trip]) => {
          if (trip.currentEventIndex < trip.events.length - 1) {
            updateTripEvent(tripId, trip.currentEventIndex + 1);
          }
        });
      }, 1000 / playbackSpeed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, playbackSpeed, trips, updateTripEvent]);

  return (
    <div className="bg-white rounded-lg shadow p-3 sm:p-4 mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={isPlaying ? pauseSimulation : startSimulation}
            className={`w-full sm:w-auto px-4 sm:px-6 py-2 rounded-lg font-semibold transition-colors ${
              isPlaying
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">Speed:</span>
            <div className="flex gap-1 sm:gap-2 flex-1 sm:flex-initial">
              {[1, 5, 10, 50].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setPlaybackSpeed(speed)}
                  className={`flex-1 sm:flex-initial px-2 sm:px-3 py-1 rounded text-xs sm:text-sm transition-colors ${
                    playbackSpeed === speed
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-gray-600 w-full sm:w-auto text-center sm:text-right">
          <span className="font-semibold">Status:</span>{' '}
          <span className={isPlaying ? 'text-green-600' : 'text-gray-500'}>
            {isPlaying ? 'Running' : 'Paused'}
          </span>
        </div>
      </div>
    </div>
  );
}
