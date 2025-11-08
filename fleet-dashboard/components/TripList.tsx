'use client';

import { useFleetStore } from '@/store/fleetStore';

export default function TripList() {
  const { trips } = useFleetStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTripName = (tripId: string) => {
    const names: Record<string, string> = {
      trip_1_cross_country: 'Cross-Country Long Haul',
      trip_2_urban_dense: 'Urban Dense Delivery',
      trip_3_mountain_cancelled: 'Mountain Route',
      trip_4_southern_technical: 'Southern Technical',
      trip_5_regional_logistics: 'Regional Logistics',
    };
    return names[tripId] || tripId;
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Trip Details</h2>
      <div className="space-y-3 sm:space-y-4">
        {Object.entries(trips).map(([tripId, trip]) => (
          <div key={tripId} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{getTripName(tripId)}</h3>
                <p className="text-xs sm:text-sm text-gray-600 truncate">Vehicle: {trip.vehicle_id}</p>
              </div>
              <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${getStatusColor(trip.status)} self-start sm:self-auto whitespace-nowrap`}>
                {trip.status.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="min-w-0">
                <p className="text-gray-600 text-xs">Progress</p>
                <p className="font-semibold text-gray-900 truncate">
                  {trip.currentEventIndex} / {trip.events.length}
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-gray-600 text-xs">Speed</p>
                <p className="font-semibold text-gray-900 truncate">
                  {trip.currentSpeed?.toFixed(1) || '0'} km/h
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-gray-600 text-xs">Fuel Level</p>
                <p className="font-semibold text-gray-900 truncate">
                  {trip.fuelLevel?.toFixed(1) || 'N/A'}%
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-gray-600 text-xs">Alerts</p>
                <p className="font-semibold text-gray-900">{trip.alerts.length}</p>
              </div>
            </div>

            {trip.currentLocation && (
              <div className="mt-2 sm:mt-3 text-xs text-gray-500 truncate">
                Location: {trip.currentLocation.lat.toFixed(4)}, {trip.currentLocation.lng.toFixed(4)}
              </div>
            )}

            <div className="mt-2 sm:mt-3 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(trip.currentEventIndex / trip.events.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
