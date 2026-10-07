import React, { useState } from 'react';
import {
  Train,
  Clock,
  ArrowRight,
  Accessibility,
  ExternalLink,
  MapPin,
  CheckCircle2,
  Navigation,
  Bus,
  Search
} from 'lucide-react';
import { MRT_LINES } from '../data/transitData';
import { MrtLine, MrtStation } from '../types/transit';
import { MrtBadge } from './MrtBadge';

interface MrtNetworkViewProps {
  onSelectStationNearbyBusStop?: (stopCode: string) => void;
}

export const MrtNetworkView: React.FC<MrtNetworkViewProps> = ({
  onSelectStationNearbyBusStop
}) => {
  const [selectedLineCode, setSelectedLineCode] = useState<string>('NEL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentLine: MrtLine =
    MRT_LINES.find((l) => l.code === selectedLineCode) || MRT_LINES[0];

  const [selectedStation, setSelectedStation] = useState<MrtStation>(
    currentLine.stations[2] || currentLine.stations[0]
  );

  const filteredStations = currentLine.stations.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* MRT Line Selector Tabs */}
      <div className="bg-white rounded-xl border border-[#E5E9F0] p-4 sm:p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E9F0]">
          <div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#192A48]">
              Mass Rapid Transit (MRT) Network
            </h2>
            <p className="text-xs text-slate-500">
              Interactive line directory, platform wayfinding, and station interchange links
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 shrink-0 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>All Rail Lines Operating Normally</span>
          </div>
        </div>

        {/* Line Selection Switchers with official line hex codes */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {MRT_LINES.map((line) => {
            const isActive = line.code === currentLine.code;
            return (
              <button
                key={line.code}
                onClick={() => {
                  setSelectedLineCode(line.code);
                  setSelectedStation(line.stations[0]);
                }}
                style={{
                  borderColor: isActive ? line.hexColor : '#E5E9F0',
                  backgroundColor: isActive ? `${line.hexColor}10` : '#FFFFFF'
                }}
                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden group hover:shadow-xs`}
              >
                <div
                  style={{ backgroundColor: line.hexColor }}
                  className="w-full h-1 absolute top-0 left-0"
                />
                <div className="flex items-center justify-between">
                  <span
                    style={{ backgroundColor: line.hexColor }}
                    className="px-2 py-0.5 rounded-full text-white font-display font-bold text-xs"
                  >
                    {line.code}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {line.stations.length} stns
                  </span>
                </div>
                <h4
                  className={`font-display text-xs sm:text-sm font-bold mt-2 truncate ${
                    isActive ? 'text-[#192A48]' : 'text-slate-700 group-hover:text-slate-900'
                  }`}
                >
                  {line.name}
                </h4>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Station Wayfinding Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Line Stations Sequence (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#E5E9F0] p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5E9F0]">
            <div className="flex items-center gap-2">
              <span
                style={{ backgroundColor: currentLine.hexColor }}
                className="w-3 h-3 rounded-full"
              />
              <span className="font-display font-bold text-sm text-[#192A48]">
                {currentLine.name} Stations
              </span>
            </div>

            <span className="text-xs text-slate-400">
              {currentLine.terminusA} ↔ {currentLine.terminusB}
            </span>
          </div>

          {/* Quick Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter station name or code..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-[#E5E9F0] bg-[#F4F6F9] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6B1D6D]"
            />
          </div>

          {/* Stations List */}
          <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1">
            {filteredStations.map((stn) => {
              const isSelected = selectedStation?.code === stn.code;
              return (
                <button
                  key={stn.code}
                  onClick={() => setSelectedStation(stn)}
                  className={`w-full text-left p-2.5 rounded-lg flex items-center justify-between transition-colors border ${
                    isSelected
                      ? 'bg-[#EEF4FF] border-[#6B1D6D]/40 shadow-2xs font-semibold'
                      : 'border-transparent hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <MrtBadge stationCode={stn.code} lineCode={currentLine.code} size="sm" />
                    <span className="text-xs sm:text-sm font-display truncate text-[#192A48]">
                      {stn.name}
                    </span>
                  </div>

                  {/* Transfer badges */}
                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    {stn.transfers.map((tx) => (
                      <MrtBadge
                        key={tx.code}
                        stationCode={tx.code}
                        lineCode={tx.lineCode}
                        size="xs"
                      />
                    ))}
                    {stn.wheelchairAccessible && (
                      <Accessibility size={13} className="text-slate-400 ml-1" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Station Wayfinding & Platform Direction (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {selectedStation && (
            <div className="bg-white rounded-xl border border-[#E5E9F0] p-5 shadow-2xs space-y-5">
              {/* Station Wayfinding Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E9F0]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <MrtBadge
                      stationCode={selectedStation.code}
                      lineCode={currentLine.code}
                      size="md"
                    />
                    {selectedStation.transfers.map((tx) => (
                      <MrtBadge
                        key={tx.code}
                        stationCode={tx.code}
                        lineCode={tx.lineCode}
                        size="md"
                      />
                    ))}
                  </div>
                  <h3 className="font-display font-bold text-2xl text-[#192A48] tracking-tight">
                    {selectedStation.name} Station
                  </h3>
                  <p className="text-xs text-slate-500">
                    {currentLine.name} Wayfinding & Commuter Directory
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <Accessibility size={15} />
                  <span>Barrier-Free & Lift Access</span>
                </div>
              </div>

              {/* Platform Wayfinding Cards */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  Platform Directions & Next Train Interval
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Platform A */}
                  <div className="p-3.5 rounded-xl border border-[#E5E9F0] bg-[#F8F9FF] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs bg-[#192A48] text-white px-2 py-0.5 rounded">
                        Platform A
                      </span>
                      <span className="text-xs font-bold text-emerald-700 font-display flex items-center gap-1">
                        <Clock size={12} />
                        Every {selectedStation.platformA.intervalMin} mins
                      </span>
                    </div>

                    <div className="text-xs text-slate-500">Bound For</div>
                    <div className="font-display font-bold text-base text-[#192A48] flex items-center gap-1.5">
                      <span>{selectedStation.platformA.destination}</span>
                    </div>
                  </div>

                  {/* Platform B */}
                  <div className="p-3.5 rounded-xl border border-[#E5E9F0] bg-[#F8F9FF] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs bg-[#192A48] text-white px-2 py-0.5 rounded">
                        Platform B
                      </span>
                      <span className="text-xs font-bold text-emerald-700 font-display flex items-center gap-1">
                        <Clock size={12} />
                        Every {selectedStation.platformB.intervalMin || '3'} mins
                      </span>
                    </div>

                    <div className="text-xs text-slate-500">Bound For</div>
                    <div className="font-display font-bold text-base text-[#192A48] flex items-center gap-1.5">
                      <span>{selectedStation.platformB.destination}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Station Exits & Landmarks */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  Station Exits & Street Wayfinding
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedStation.exits.map((exit, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg border border-[#E5E9F0] bg-white flex items-center gap-2 text-xs text-slate-700"
                    >
                      <MapPin size={14} className="text-[#6B1D6D] shrink-0" />
                      <span className="truncate">{exit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearby Bus Interchange or Feeder Service Integration */}
              {selectedStation.busInterchangeNearby && (
                <div className="p-3.5 rounded-xl border border-purple-200 bg-purple-50/60 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Bus size={18} className="text-[#6B1D6D]" />
                    <div>
                      <div className="text-xs font-bold text-[#6B1D6D]">
                        Seamless Bus Interchange Connection
                      </div>
                      <div className="text-xs text-slate-600">
                        Direct underpass to {selectedStation.busInterchangeNearby}
                      </div>
                    </div>
                  </div>
                  {onSelectStationNearbyBusStop && (
                    <button
                      onClick={() => onSelectStationNearbyBusStop('03223')}
                      className="px-3 py-1.5 rounded-lg bg-[#6B1D6D] text-white text-xs font-bold hover:bg-[#4f0053] transition-colors"
                    >
                      View Buses
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
