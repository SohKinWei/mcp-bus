import React, { useState } from 'react';
import {
  Bus,
  ArrowRight,
  Clock,
  Calendar,
  Layers,
  MapPin,
  ChevronRight,
  Navigation,
  Share2,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { BUS_SERVICES, BUS_STOPS } from '../data/transitData';
import { BusService, RouteStop } from '../types/transit';
import { BusServiceBadge } from './BusServiceBadge';
import { MrtBadge } from './MrtBadge';

interface BusRouteTrackerViewProps {
  selectedServiceNo: string;
  onSelectServiceNo: (no: string) => void;
  onSelectStopCode: (code: string) => void;
}

export const BusRouteTrackerView: React.FC<BusRouteTrackerViewProps> = ({
  selectedServiceNo,
  onSelectServiceNo,
  onSelectStopCode
}) => {
  const service: BusService =
    BUS_SERVICES.find((s) => s.serviceNo === selectedServiceNo) || BUS_SERVICES[0];

  // We simulate live buses operating along the route line!
  // e.g. For a route with N stops, bus A is between stop 2 & 3, bus B between 6 & 7
  const [activeStopIndex, setActiveStopIndex] = useState<number>(3); // currently inspected stop

  const currentStops = service.stops;

  return (
    <div className="space-y-6">
      {/* Service Selector & Direction Header */}
      <div className="bg-white rounded-xl border border-[#E5E9F0] p-4 sm:p-5 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <BusServiceBadge
              serviceNo={service.serviceNo}
              category={service.category}
              size="lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Service {service.serviceNo} Route
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                  {service.operator}
                </span>
                {service.category !== 'Normal' && (
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#FE6B27]/15 text-[#FE6B27]">
                    {service.category}
                  </span>
                )}
              </div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[#192A48]">
                {service.originName} <span className="text-[#FE6B27]">⇄</span> {service.destinationName}
              </h2>
            </div>
          </div>

          {/* Quick Service Picker */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 font-semibold mr-1">Other routes:</span>
            {BUS_SERVICES.map((s) => (
              <button
                key={s.serviceNo}
                onClick={() => onSelectServiceNo(s.serviceNo)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-display transition-all ${
                  s.serviceNo === service.serviceNo
                    ? 'bg-[#6B1D6D] text-white shadow-xs'
                    : 'bg-[#F4F6F9] hover:bg-slate-200 text-slate-700 border border-[#E5E9F0]'
                }`}
              >
                {s.serviceNo}
              </button>
            ))}
          </div>
        </div>

        {/* Operating Hours & Frequency Banner */}
        <div className="mt-4 pt-3 border-t border-[#E5E9F0] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600">
          <div className="bg-[#F8F9FF] p-2.5 rounded-lg border border-[#E5E9F0]/60">
            <div className="text-[11px] text-slate-400 font-semibold uppercase flex items-center gap-1">
              <Clock size={12} className="text-[#6B1D6D]" />
              First Bus
            </div>
            <div className="font-display font-bold text-sm text-[#192A48] mt-0.5">
              {service.firstBus} hrs
            </div>
          </div>

          <div className="bg-[#F8F9FF] p-2.5 rounded-lg border border-[#E5E9F0]/60">
            <div className="text-[11px] text-slate-400 font-semibold uppercase flex items-center gap-1">
              <Clock size={12} className="text-[#FE6B27]" />
              Last Bus
            </div>
            <div className="font-display font-bold text-sm text-[#192A48] mt-0.5">
              {service.lastBus} hrs
            </div>
          </div>

          <div className="bg-[#F8F9FF] p-2.5 rounded-lg border border-[#E5E9F0]/60">
            <div className="text-[11px] text-slate-400 font-semibold uppercase flex items-center gap-1">
              <Layers size={12} className="text-emerald-600" />
              Frequency
            </div>
            <div className="font-display font-bold text-sm text-[#192A48] mt-0.5">
              {service.frequencyRange}
            </div>
          </div>

          <div className="bg-[#F8F9FF] p-2.5 rounded-lg border border-[#E5E9F0]/60">
            <div className="text-[11px] text-slate-400 font-semibold uppercase flex items-center gap-1">
              <Navigation size={12} className="text-[#192A48]" />
              Route Stops
            </div>
            <div className="font-display font-bold text-sm text-[#192A48] mt-0.5">
              {currentStops.length} stops ({currentStops[currentStops.length - 1]?.distanceKm || '20'} km)
            </div>
          </div>
        </div>
      </div>

      {/* Route Sequence Visualizer with Vertical Route Line */}
      <div className="bg-white rounded-xl border border-[#E5E9F0] p-5 shadow-2xs">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E9F0] mb-6">
          <div>
            <h3 className="font-display font-bold text-lg text-[#192A48]">
              Live Route Progress & Node Sequence
            </h3>
            <p className="text-xs text-slate-500">
              Vertical transit corridor with real-time active buses and transfer points
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            3 Buses on Route
          </span>
        </div>

        {/* Vertical Stops Timeline */}
        <div className="relative pl-6 sm:pl-10 space-y-6">
          {/* Continuous vertical line in #E5E9F0 */}
          <div className="absolute left-[38px] sm:left-[54px] top-4 bottom-6 w-[3px] bg-[#E5E9F0]" />

          {currentStops.map((stop, idx) => {
            const isSelected = idx === activeStopIndex;
            const isBus1Approaching = idx === 2; // Simulated bus 1
            const isBus2Approaching = idx === 6; // Simulated bus 2

            // Calculate simulated arrival estimate for each stop
            const minutesAway = Math.max(1, (idx - 1) * 3);

            return (
              <div
                key={stop.stopCode}
                onClick={() => {
                  setActiveStopIndex(idx);
                  onSelectStopCode(stop.stopCode);
                }}
                className={`relative flex items-start gap-4 sm:gap-6 p-3 rounded-xl transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#EEF4FF] border border-[#6B1D6D]/30 shadow-xs'
                    : 'hover:bg-slate-50 border border-transparent'
                }`}
              >
                {/* Node circle on the vertical line */}
                <div className="relative z-10 shrink-0 mt-1 flex items-center justify-center">
                  {isSelected ? (
                    /* Active stop expands with orange center dot (#E65A15) */
                    <div className="w-7 h-7 rounded-full bg-white border-[3px] border-[#6B1D6D] flex items-center justify-center shadow-md animate-pulse">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#E65A15]" />
                    </div>
                  ) : (
                    /* Solid standard node circle */
                    <div className="w-5 h-5 rounded-full bg-white border-[3px] border-[#192A48]/50 hover:border-[#6B1D6D]" />
                  )}
                </div>

                {/* Stop Content & Information */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#6B1D6D] bg-[#6B1D6D]/10 px-1.5 py-0.5 rounded">
                          {stop.stopCode}
                        </span>
                        <h4
                          className={`font-display text-sm sm:text-base tracking-tight truncate ${
                            isSelected ? 'font-bold text-[#192A48]' : 'font-semibold text-slate-800'
                          }`}
                        >
                          {stop.stopDescription}
                        </h4>
                      </div>

                      <div className="text-xs text-slate-500 flex items-center gap-2">
                        <span>{stop.roadName}</span>
                        <span>·</span>
                        <span className="tabular-nums font-mono text-[11px] text-slate-400">
                          {stop.distanceKm.toFixed(1)} km
                        </span>
                      </div>
                    </div>

                    {/* Right: Arrival estimate & connecting MRT */}
                    <div className="flex items-center gap-2 self-start sm:self-center mt-1 sm:mt-0">
                      {stop.mrtConnections && stop.mrtConnections.length > 0 && (
                        <div className="flex items-center gap-1">
                          {stop.mrtConnections.map((conn) => (
                            <MrtBadge
                              key={conn.stationCode}
                              stationCode={conn.stationCode}
                              size="xs"
                            />
                          ))}
                        </div>
                      )}

                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-display font-bold tabular-nums ${
                          isSelected
                            ? 'bg-[#E65A15] text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        ~{minutesAway} min
                      </span>
                    </div>
                  </div>

                  {/* Active Bus Indicator if a bus is currently approaching this stop */}
                  {isBus1Approaching && (
                    <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-2xs">
                      <Bus size={14} className="text-emerald-600 animate-bounce" />
                      <span>Bus 147 approaching (Double Decker · Seats Available)</span>
                    </div>
                  )}

                  {isBus2Approaching && (
                    <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold shadow-2xs">
                      <Bus size={14} className="text-amber-600" />
                      <span>Bus 147 following (Single Deck · Standing Available)</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
