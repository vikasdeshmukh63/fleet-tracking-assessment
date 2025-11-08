'use client';

import { useFleetStore } from '@/store/fleetStore';

export default function FleetMetrics() {
  const { getFleetMetrics } = useFleetStore();
  const metrics = getFleetMetrics();

  const metricCards = [
    { label: 'Total Trips', value: metrics.totalTrips, color: 'bg-blue-500' },
    { label: 'Active', value: metrics.activeTrips, color: 'bg-green-500' },
    { label: 'Completed', value: metrics.completedTrips, color: 'bg-purple-500' },
    { label: 'Cancelled', value: metrics.cancelledTrips, color: 'bg-red-500' },
    { label: 'Total Distance', value: `${metrics.totalDistance.toFixed(0)} km`, color: 'bg-indigo-500' },
    { label: 'Avg Speed', value: `${metrics.averageSpeed.toFixed(1)} km/h`, color: 'bg-yellow-500' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Fleet Metrics</h2>
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-4">
        {metricCards.map((metric) => (
          <div key={metric.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-gray-600 truncate">{metric.label}</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{metric.value}</p>
            </div>
            <div className={`w-8 h-8 sm:w-12 sm:h-12 ${metric.color} rounded-full opacity-20 flex-shrink-0 ml-2`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
