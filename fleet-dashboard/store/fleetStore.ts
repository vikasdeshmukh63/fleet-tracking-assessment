import { create } from 'zustand';
import { FleetEvent, TripData, Alert, FleetMetrics } from '@/types/fleet';

interface FleetStore {
  trips: Record<string, TripData>;
  isPlaying: boolean;
  playbackSpeed: number;
  simulationTime: Date | null;
  
  // Actions
  loadTrips: (tripsData: Record<string, FleetEvent[]>) => void;
  startSimulation: () => void;
  pauseSimulation: () => void;
  setPlaybackSpeed: (speed: number) => void;
  updateTripEvent: (tripId: string, eventIndex: number) => void;
  addAlert: (alert: Alert) => void;
  getFleetMetrics: () => FleetMetrics;
}

export const useFleetStore = create<FleetStore>((set, get) => ({
  trips: {},
  isPlaying: false,
  playbackSpeed: 1,
  simulationTime: null,

  loadTrips: (tripsData) => {
    const trips: Record<string, TripData> = {};
    
    Object.entries(tripsData).forEach(([tripId, events]) => {
      trips[tripId] = {
        trip_id: tripId,
        vehicle_id: events[0]?.vehicle_id || '',
        events,
        status: 'pending',
        currentEventIndex: 0,
        alerts: [],
      };
    });

    set({ trips });
  },

  startSimulation: () => set({ isPlaying: true }),
  
  pauseSimulation: () => set({ isPlaying: false }),
  
  setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),

  updateTripEvent: (tripId, eventIndex) => {
    set((state) => {
      const trip = state.trips[tripId];
      if (!trip || eventIndex >= trip.events.length) return state;

      const event = trip.events[eventIndex];
      const updatedTrip: TripData = {
        ...trip,
        currentEventIndex: eventIndex,
        currentLocation: event.location,
        currentSpeed: event.movement?.speed_kmh,
        fuelLevel: (event as any).telemetry?.fuel_level_percent || trip.fuelLevel,
      };

      // Update status based on event type
      if (event.event_type === 'trip_started') {
        updatedTrip.status = 'active';
        updatedTrip.startTime = event.timestamp;
      } else if (event.event_type === 'trip_completed') {
        updatedTrip.status = 'completed';
        updatedTrip.endTime = event.timestamp;
        updatedTrip.totalDistance = (event as any).total_distance_km;
      } else if (event.event_type === 'trip_cancelled') {
        updatedTrip.status = 'cancelled';
        updatedTrip.endTime = event.timestamp;
      }

      return {
        trips: {
          ...state.trips,
          [tripId]: updatedTrip,
        },
      };
    });
  },

  addAlert: (alert) => {
    set((state) => {
      const trip = state.trips[alert.trip_id];
      if (!trip) return state;

      return {
        trips: {
          ...state.trips,
          [alert.trip_id]: {
            ...trip,
            alerts: [...trip.alerts, alert],
          },
        },
      };
    });
  },

  getFleetMetrics: () => {
    const { trips } = get();
    const tripArray = Object.values(trips);

    return {
      totalTrips: tripArray.length,
      activeTrips: tripArray.filter((t) => t.status === 'active').length,
      completedTrips: tripArray.filter((t) => t.status === 'completed').length,
      cancelledTrips: tripArray.filter((t) => t.status === 'cancelled').length,
      totalDistance: tripArray.reduce((sum, t) => sum + (t.totalDistance || 0), 0),
      averageSpeed: tripArray.reduce((sum, t) => sum + (t.currentSpeed || 0), 0) / tripArray.length || 0,
      totalAlerts: tripArray.reduce((sum, t) => sum + t.alerts.length, 0),
    };
  },
}));
