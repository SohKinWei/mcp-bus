import { BusArrivalInfo, NextBus, LoadCapacity, BusType } from '../types/transit';
import { generateLiveArrivals, BUS_SERVICES } from '../data/transitData';

export interface LtaRawNextBus {
  OriginCode?: string;
  DestinationCode?: string;
  EstimatedArrival?: string;
  Latitude?: string;
  Longitude?: string;
  VisitNumber?: string;
  Load?: 'SEA' | 'SDA' | 'LSD' | string;
  Feature?: 'WAB' | string;
  Type?: 'SD' | 'DD' | 'BD' | string;
  Monitored?: number;
}

export interface LtaRawService {
  ServiceNo: string;
  Operator: 'SBST' | 'SMRT' | 'TTS' | 'GAS';
  NextBus?: LtaRawNextBus;
  NextBus2?: LtaRawNextBus;
  NextBus3?: LtaRawNextBus;
}

export interface LtaBusArrivalResponse {
  'odata.metadata'?: string;
  BusStopCode: string;
  Services: LtaRawService[];
}

function parseNextBus(raw?: LtaRawNextBus): NextBus | undefined {
  if (!raw || !raw.EstimatedArrival) return undefined;

  const arrivalDate = new Date(raw.EstimatedArrival);
  const now = Date.now();
  const diffSeconds = Math.max(0, Math.floor((arrivalDate.getTime() - now) / 1000));

  const load: LoadCapacity =
    raw.Load === 'SEA' || raw.Load === 'SDA' || raw.Load === 'LSD'
      ? raw.Load
      : 'SEA';

  const type: BusType =
    raw.Type === 'DD' || raw.Type === 'BD' || raw.Type === 'SD'
      ? raw.Type
      : 'SD';

  const feature = raw.Feature === 'WAB' ? 'WAB' : 'NORM';

  return {
    estimatedArrivalSeconds: diffSeconds,
    load,
    feature,
    type
  };
}

/**
 * Fetches real-time bus arrivals from the /api/bus-arrival endpoint.
 * Falls back to local generated estimates if the endpoint is unavailable or fails.
 */
export async function getBusArrivals(
  busStopCode: string,
  serviceNo?: string
): Promise<{ arrivals: BusArrivalInfo[]; isLive: boolean }> {
  try {
    let url = `/api/bus-arrival?BusStopCode=${encodeURIComponent(busStopCode)}`;
    if (serviceNo) {
      url += `&ServiceNo=${encodeURIComponent(serviceNo)}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data: LtaBusArrivalResponse = await response.json();

    if (data && Array.isArray(data.Services) && data.Services.length > 0) {
      const mappedArrivals: BusArrivalInfo[] = data.Services.map((svc) => {
        const nextBus = parseNextBus(svc.NextBus) || {
          estimatedArrivalSeconds: 60,
          load: 'SEA',
          feature: 'WAB',
          type: 'SD'
        };

        const knownService = BUS_SERVICES.find((s) => s.serviceNo === svc.ServiceNo);

        return {
          serviceNo: svc.ServiceNo,
          operator: svc.Operator || 'SBST',
          category: knownService?.category || 'Normal',
          destinationName:
            knownService?.destinationName ||
            `Terminal ${svc.NextBus?.DestinationCode || ''}`.trim(),
          destinationCode: svc.NextBus?.DestinationCode || '',
          nextBus,
          nextBus2: parseNextBus(svc.NextBus2),
          nextBus3: parseNextBus(svc.NextBus3)
        };
      });

      return { arrivals: mappedArrivals, isLive: true };
    }
  } catch (error) {
    console.warn(`[LTA Service] Falling back to offline simulator for stop ${busStopCode}:`, error);
  }

  // Graceful fallback to built-in transit timetable data
  return { arrivals: generateLiveArrivals(busStopCode), isLive: false };
}
