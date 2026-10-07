import React, { useState, useEffect } from 'react';
import {
  Search,
  RotateCw,
  Share2,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  Filter,
  MapPin,
  Clock,
  Sparkles,
  Accessibility,
  Info
} from 'lucide-react';
import { BUS_STOPS, BUS_SERVICES, generateLiveArrivals } from '../data/transitData';
import { BusStop, BusArrivalInfo } from '../types/transit';
import { BusServiceBadge } from './BusServiceBadge';
import { MrtBadge } from './MrtBadge';
import { ArrivalBadge } from './ArrivalBadge';
import { WhatsAppShareModal } from './WhatsAppShareModal';

interface BusArrivalsViewProps {
  selectedStopCode: string;
  onSelectStopCode: (code: string) => void;
  onViewRouteTracker: (serviceNo: string) => void;
  bookmarkedStops: string[];
  onToggleBookmark: (stopCode: string) => void;
}

export const BusArrivalsView: React.FC<BusArrivalsViewProps> = ({
  selectedStopCode,
  onSelectStopCode,
  onViewRouteTracker,
  bookmarkedStops,
  onToggleBookmark
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'seats' | 'express' | 'dd'>('all');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [lastRefreshedTime, setLastRefreshedTime] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Active stop
  const currentStop: BusStop =
    BUS_STOPS.find((s) => s.code === selectedStopCode) || BUS_STOPS[0];

  // Dynamic arrivals state
  const [arrivals, setArrivals] = useState<BusArrivalInfo[]>(() =>
    generateLiveArrivals(currentStop.code)
  );

  // Auto tick every second to simulate live seconds countdown
  useEffect(() => {
    setArrivals(generateLiveArrivals(currentStop.code));
  }, [currentStop.code]);

  useEffect(() => {
    const timer = setInterval(() => {
      setArrivals((prevArrivals) =>
        prevArrivals.map((arr) => {
          const nextSec = Math.max(0, arr.nextBus.estimatedArrivalSeconds - 1);
          const nextSec2 = arr.nextBus2
            ? Math.max(0, arr.nextBus2.estimatedArrivalSeconds - 1)
            : undefined;
          const nextSec3 = arr.nextBus3
            ? Math.max(0, arr.nextBus3.estimatedArrivalSeconds - 1)
            : undefined;

          // If next bus reached 0, loop new cycle
          if (nextSec === 0) {
            return {
              ...arr,
              nextBus: {
                ...arr.nextBus,
                estimatedArrivalSeconds: arr.nextBus2 ? arr.nextBus2.estimatedArrivalSeconds : 360,
                load: arr.nextBus2 ? arr.nextBus2.load : 'SEA'
              },
              nextBus2: arr.nextBus3,
              nextBus3: {
                estimatedArrivalSeconds: 600,
                load: 'SEA',
                feature: 'WAB',
                type: 'DD'
              }
            };
          }

          return {
            ...arr,
            nextBus: { ...arr.nextBus, estimatedArrivalSeconds: nextSec },
            ...(nextSec2 !== undefined && arr.nextBus2
              ? { nextBus2: { ...arr.nextBus2, estimatedArrivalSeconds: nextSec2 } }
              : {}),
            ...(nextSec3 !== undefined && arr.nextBus3
              ? { nextBus3: { ...arr.nextBus3, estimatedArrivalSeconds: nextSec3 } }
              : {})
          };
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setArrivals(generateLiveArrivals(currentStop.code));
      setLastRefreshedTime(new Date());
      setIsRefreshing(false);
    }, 450);
  };

  // Filter arrivals by query and filter tag
  const filteredArrivals = arrivals.filter((item) => {
    // Search query matches service number or destination
    const matchesSearch =
      item.serviceNo.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      item.destinationName.toLowerCase().includes(searchQuery.toLowerCase().trim());

    if (!matchesSearch) return false;

    if (filterType === 'seats') {
      return item.nextBus.load === 'SEA';
    }
    if (filterType === 'express') {
      return item.category === 'Express' || item.category === 'Direct';
    }
    if (filterType === 'dd') {
      return item.nextBus.type === 'DD';
    }
    return true;
  });

  const isBookmarked = bookmarkedStops.includes(currentStop.code);

  // Search filtered stops for the dropdown or selector
  const matchingStops = BUS_STOPS.filter(
    (s) =>
      s.code.includes(searchQuery) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.roadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.services.some((srv) => srv.toLowerCase() === searchQuery.toLowerCase().trim())
  );

  return (
    <div className="space-y-6">
      {/* Search & Location Bar */}
      <div className="bg-white rounded-xl p-3 sm:p-4 border border-[#E5E9F0] shadow-2xs">
        <div className="relative">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Bus Stop Code (e.g. 03223), Road, or Bus No (e.g. 147)..."
            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-[#E5E9F0] bg-[#F4F6F9] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1D6D] focus:border-[#6B1D6D] text-sm text-[#131c27] placeholder:text-slate-400 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full bg-slate-200"
            >
              ✕
            </button>
          )}
        </div>

        {/* Quick Stop Suggestions dropdown if typing stop */}
        {searchQuery.trim().length > 0 && matchingStops.length > 0 && (
          <div className="mt-2 pt-2 border-t border-[#E5E9F0] max-h-56 overflow-y-auto space-y-1">
            <div className="text-[11px] font-semibold text-slate-400 px-2 uppercase tracking-wider">
              Matching Bus Stops
            </div>
            {matchingStops.map((stop) => (
              <button
                key={stop.code}
                onClick={() => {
                  onSelectStopCode(stop.code);
                  setSearchQuery('');
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center justify-between text-xs hover:bg-[#EEF4FF] transition-colors ${
                  stop.code === currentStop.code ? 'bg-[#E5EEFE] font-bold text-[#192A48]' : 'text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="font-mono font-bold text-[#6B1D6D]">{stop.code}</span>
                  <span className="truncate">{stop.description}</span>
                  <span className="text-slate-400 text-[11px]">({stop.roadName})</span>
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-2">
                  {stop.mrtConnections.map((m) => (
                    <MrtBadge key={m.stationCode} stationCode={m.stationCode} size="xs" />
                  ))}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Nearby Stops Quick Carousel */}
        <div className="mt-3 pt-3 border-t border-[#E5E9F0] flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-slate-400 shrink-0 font-medium text-[11px] flex items-center gap-1">
            <MapPin size={12} />
            Hubs:
          </span>
          {BUS_STOPS.slice(0, 7).map((stop) => (
            <button
              key={stop.code}
              onClick={() => onSelectStopCode(stop.code)}
              className={`px-2.5 py-1 rounded-full shrink-0 border text-xs transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                stop.code === currentStop.code
                  ? 'bg-[#192A48] text-white border-[#192A48] font-bold shadow-xs'
                  : 'bg-white text-slate-700 border-[#E5E9F0] hover:bg-slate-50'
              }`}
            >
              <span className="font-mono text-[11px] opacity-80">{stop.code}</span>
              <span>{stop.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Bus Stop Wayfinding Header Card */}
      <div className="bg-white rounded-xl border border-[#E5E9F0] p-4 sm:p-5 shadow-2xs relative overflow-hidden">
        {/* Accent Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#6B1D6D] via-[#FE6B27] to-[#192A48]" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-[#6B1D6D]/10 text-[#6B1D6D] font-mono font-bold text-sm border border-[#6B1D6D]/20">
                {currentStop.code}
              </span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {currentStop.roadName}
              </span>
              {currentStop.isInterchange && (
                <span className="px-2 py-0.5 rounded-full bg-[#FE6B27]/15 text-[#FE6B27] font-bold text-[11px] border border-[#FE6B27]/30">
                  Interchange Hub
                </span>
              )}
            </div>

            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#192A48] tracking-tight">
              {currentStop.description}
            </h2>

            {/* Connecting MRT Lines */}
            {currentStop.mrtConnections.length > 0 && (
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-slate-500 font-medium">Interchange with:</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {currentStop.mrtConnections.map((conn) => (
                    <MrtBadge
                      key={conn.stationCode}
                      stationCode={conn.stationCode}
                      lineCode={conn.lineCode}
                      size="sm"
                      showName={true}
                      stationName={conn.stationName}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
            {/* Bookmark */}
            <button
              onClick={() => onToggleBookmark(currentStop.code)}
              className={`p-2.5 rounded-lg border transition-colors flex items-center justify-center ${
                isBookmarked
                  ? 'bg-amber-50 border-amber-300 text-amber-600'
                  : 'bg-white border-[#E5E9F0] text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
              title={isBookmarked ? 'Bookmarked stop' : 'Add to favorites'}
              aria-label="Bookmark Stop"
            >
              {isBookmarked ? (
                <BookmarkCheck size={18} className="fill-amber-500 text-amber-600" />
              ) : (
                <Bookmark size={18} />
              )}
            </button>

            {/* Manual Refresh */}
            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="p-2.5 rounded-lg border border-[#E5E9F0] bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-center"
              title="Refresh Arrival Timings"
              aria-label="Refresh timings"
            >
              <RotateCw size={18} className={isRefreshing ? 'animate-spin text-[#6B1D6D]' : ''} />
            </button>

            {/* One-Touch WhatsApp Transit Share Button (Dedicated Emerald Pill) */}
            <button
              onClick={() => setShareModalOpen(true)}
              className="h-10 px-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
              title="Share ETA on WhatsApp"
            >
              <Share2 size={15} />
              <span className="hidden xs:inline">Share ETA</span>
            </button>
          </div>
        </div>

        {/* Live Status Metabar */}
        <div className="mt-4 pt-3 border-t border-[#E5E9F0] flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-medium text-slate-700">Live GPS Countdown Active</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="tabular-nums">
              Refreshed {lastRefreshedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#137333]" />
              Seats
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#D97706]" />
              Standing
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#C5221F]" />
              Crowded
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
        <div className="flex items-center gap-1.5 p-1 bg-[#E5EEFE] rounded-lg">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              filterType === 'all'
                ? 'bg-white text-[#192A48] shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Buses ({arrivals.length})
          </button>
          <button
            onClick={() => setFilterType('seats')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              filterType === 'seats'
                ? 'bg-white text-[#137333] shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Seats Avail
          </button>
          <button
            onClick={() => setFilterType('dd')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              filterType === 'dd'
                ? 'bg-white text-[#6B1D6D] shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Double Deckers
          </button>
          <button
            onClick={() => setFilterType('express')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              filterType === 'express'
                ? 'bg-white text-[#FE6B27] shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Express / Direct
          </button>
        </div>

        <span className="text-xs text-slate-400 hidden sm:inline whitespace-nowrap">
          Click any bus to trace full route & active buses
        </span>
      </div>

      {/* Live Arrival Timetable Rows */}
      <div className="space-y-3">
        {filteredArrivals.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-[#E5E9F0]">
            <p className="text-slate-500 font-medium text-sm">
              No bus services match the active filter.
            </p>
            <button
              onClick={() => {
                setFilterType('all');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-2 rounded-lg bg-[#E65A15] text-white text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredArrivals.map((arr) => {
            const serviceDef = BUS_SERVICES.find((s) => s.serviceNo === arr.serviceNo);
            return (
              <div
                key={arr.serviceNo}
                onClick={() => onViewRouteTracker(arr.serviceNo)}
                className="group bg-white hover:bg-[#FAFCFF] rounded-xl border border-[#E5E9F0] hover:border-[#6B1D6D]/40 p-4 transition-all duration-150 shadow-2xs cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left: Service Badge & Route Target */}
                  <div className="flex items-start gap-3.5">
                    <BusServiceBadge
                      serviceNo={arr.serviceNo}
                      category={arr.category}
                      size="md"
                    />

                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          To
                        </span>
                        <h4 className="font-display font-bold text-base text-[#192A48] truncate group-hover:text-[#6B1D6D] transition-colors">
                          {arr.destinationName}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                        <span className="font-semibold text-slate-600">{arr.operator}</span>
                        <span>·</span>
                        <span>Every {serviceDef?.frequencyRange || '6 - 9 mins'}</span>
                        {arr.category && arr.category !== 'Normal' && (
                          <>
                            <span>·</span>
                            <span className="text-[#FE6B27] font-bold">{arr.category}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Arrival Badges Grid (1st, 2nd, 3rd) */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F4F6F9]">
                    <div className="flex items-center gap-2.5">
                      {/* Primary Next Bus */}
                      <ArrivalBadge bus={arr.nextBus} isPrimary={true} showDetails={true} />

                      {/* 2nd Bus */}
                      {arr.nextBus2 && (
                        <ArrivalBadge
                          bus={arr.nextBus2}
                          isPrimary={false}
                          showDetails={true}
                        />
                      )}

                      {/* 3rd Bus */}
                      {arr.nextBus3 && (
                        <div className="hidden md:block">
                          <ArrivalBadge
                            bus={arr.nextBus3}
                            isPrimary={false}
                            showDetails={true}
                          />
                        </div>
                      )}
                    </div>

                    <div className="text-slate-300 group-hover:text-[#6B1D6D] group-hover:translate-x-0.5 transition-all">
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* WhatsApp Share Modal */}
      <WhatsAppShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        stop={currentStop}
        arrivals={arrivals}
      />
    </div>
  );
};
