// Fleet Tracking Event Types

export interface Location {
  lat: number;
  lng: number;
  accuracy_meters?: number;
  altitude_meters?: number;
}

export interface Movement {
  speed_kmh: number;
  heading_degrees: number;
  moving: boolean;
}

export interface Device {
  battery_level: number;
  charging: boolean;
}

export interface Telemetry {
  odometer_km: number;
  fuel_level_percent: number;
  engine_hours: number;
  coolant_temp_celsius: number;
  oil_pressure_kpa: number;
  battery_voltage: number;
}

export interface BaseEvent {
  event_id: string;
  event_type: string;
  timestamp: string;
  vehicle_id: string;
  trip_id: string;
  device_id?: string;
  location: Location;
  movement?: Movement;
  distance_travelled_km?: number;
  signal_quality?: string;
  device?: Device;
  overspeed?: boolean;
}

export interface TripStartedEvent extends BaseEvent {
  event_type: 'trip_started';
  planned_distance_km: number;
  estimated_duration_hours: number;
}

export interface TripCompletedEvent extends BaseEvent {
  event_type: 'trip_completed';
  total_distance_km: number;
  duration_minutes: number;
  fuel_consumed_percent: number;
}

export interface TripCancelledEvent extends BaseEvent {
  event_type: 'trip_cancelled';
  cancellation_reason: string;
  distance_completed_km: number;
  elapsed_time_minutes: number;
}

export interface LocationPingEvent extends BaseEvent {
  event_type: 'location_ping';
}

export interface SpeedViolationEvent extends BaseEvent {
  event_type: 'speed_violation';
  speed_limit_kmh: number;
  violation_amount_kmh: number;
  severity: string;
}

export interface VehicleTelemetryEvent extends BaseEvent {
  event_type: 'vehicle_telemetry';
  telemetry: Telemetry;
}

export interface FuelLevelLowEvent extends BaseEvent {
  event_type: 'fuel_level_low';
  fuel_level_percent: number;
  threshold_percent: number;
  estimated_range_km: number;
}

export interface RefuelingStartedEvent extends BaseEvent {
  event_type: 'refueling_started';
}

export interface RefuelingCompletedEvent extends BaseEvent {
  event_type: 'refueling_completed';
  refuel_duration_minutes: number;
  fuel_level_after_refuel: number;
  fuel_added_percent: number;
}

export type FleetEvent =
  | TripStartedEvent
  | TripCompletedEvent
  | TripCancelledEvent
  | LocationPingEvent
  | SpeedViolationEvent
  | VehicleTelemetryEvent
  | FuelLevelLowEvent
  | RefuelingStartedEvent
  | RefuelingCompletedEvent
  | BaseEvent;

export interface TripData {
  trip_id: string;
  vehicle_id: string;
  events: FleetEvent[];
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  currentEventIndex: number;
  startTime?: string;
  endTime?: string;
  totalDistance?: number;
  currentLocation?: Location;
  currentSpeed?: number;
  fuelLevel?: number;
  alerts: Alert[];
}

export interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: string;
  trip_id: string;
}

export interface FleetMetrics {
  totalTrips: number;
  activeTrips: number;
  completedTrips: number;
  cancelledTrips: number;
  totalDistance: number;
  averageSpeed: number;
  totalAlerts: number;
}
