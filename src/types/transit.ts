export type LoadCapacity = 'SEA' | 'SDA' | 'LSD'; // Seats Available, Standing Available, Limited Standing
export type BusType = 'SD' | 'DD' | 'BD'; // Single Deck, Double Decker, Bendy

export interface NextBus {
  estimatedArrivalSeconds: number; // seconds until arrival
  load: LoadCapacity;
  feature: 'WAB' | 'NORM'; // Wheelchair Accessible Bus
  type: BusType;
}

export interface BusArrivalInfo {
  serviceNo: string;
  operator: 'SBST' | 'SMRT' | 'TTS' | 'GAS';
  category?: 'Normal' | 'Express' | 'Direct' | 'Night';
  destinationName: string;
  destinationCode: string;
  nextBus: NextBus;
  nextBus2?: NextBus;
  nextBus3?: NextBus;
}

export interface MrtInterchange {
  lineCode: 'NEL' | 'DTL' | 'EWL' | 'NSL' | 'TEL' | 'CCL';
  stationCode: string; // e.g. "NE4", "DT19"
  stationName: string;
}

export interface BusStop {
  code: string; // e.g. "03223"
  description: string; // e.g. "Opp Hong Lim Cplx"
  roadName: string; // e.g. "Upper Cross St"
  mrtConnections: MrtInterchange[];
  services: string[]; // e.g. ["147", "190", "65", "857", "12e", "CT8"]
  lat: number;
  lng: number;
  isInterchange?: boolean;
}

export interface RouteStop {
  stopCode: string;
  stopDescription: string;
  roadName: string;
  distanceKm: number;
  seq: number;
  mrtConnections?: MrtInterchange[];
}

export interface BusService {
  serviceNo: string;
  operator: 'SBST' | 'SMRT' | 'TTS' | 'GAS';
  category: 'Normal' | 'Express' | 'Direct' | 'Night';
  originCode: string;
  originName: string;
  destinationCode: string;
  destinationName: string;
  frequencyRange: string; // e.g. "5 - 8 mins"
  firstBus: string; // e.g. "05:30"
  lastBus: string; // e.g. "23:45"
  stops: RouteStop[];
}

export interface MrtStation {
  code: string; // e.g. "NE4"
  name: string;
  transfers: { lineCode: 'NEL' | 'DTL' | 'EWL' | 'NSL' | 'TEL' | 'CCL'; code: string }[];
  platformA: { destination: string; intervalMin: number };
  platformB: { destination: string; intervalMin: number };
  exits: string[];
  wheelchairAccessible: boolean;
  busInterchangeNearby?: string;
}

export interface MrtLine {
  code: 'NEL' | 'DTL' | 'EWL' | 'NSL' | 'TEL' | 'CCL';
  name: string;
  hexColor: string;
  textColor: string;
  terminusA: string;
  terminusB: string;
  stations: MrtStation[];
}

export interface ServiceAlert {
  id: string;
  type: 'INFO' | 'ADVISORY' | 'NORMAL';
  title: string;
  message: string;
  affectedLines: string[];
  timestamp: string;
}

export interface JourneyLeg {
  mode: 'WALK' | 'BUS' | 'MRT';
  serviceOrLine?: string; // e.g. "147" or "North East Line"
  lineCode?: 'NEL' | 'DTL' | 'EWL' | 'NSL' | 'TEL' | 'CCL';
  from: string;
  to: string;
  stopsCount?: number;
  durationMin: number;
  instruction: string;
}

export interface JourneyOption {
  id: string;
  summary: string;
  totalDurationMin: number;
  fareSGD: number;
  walkingMinutes: number;
  transfersCount: number;
  co2SavedKg: number;
  departureInMin: number;
  legs: JourneyLeg[];
}
