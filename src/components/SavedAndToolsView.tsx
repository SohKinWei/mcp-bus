import React, { useState } from 'react';
import {
  Bookmark,
  BookmarkCheck,
  Calculator,
  AlertTriangle,
  Clock,
  ArrowRight,
  Bus,
  DollarSign,
  Info,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { BUS_STOPS, BUS_SERVICES, SERVICE_ALERTS, generateLiveArrivals } from '../data/transitData';
import { BusServiceBadge } from './BusServiceBadge';
import { MrtBadge } from './MrtBadge';
import { ArrivalBadge } from './ArrivalBadge';

interface SavedAndToolsViewProps {
  bookmarkedStops: string[];
  onSelectStopCode: (code: string) => void;
  onToggleBookmark: (code: string) => void;
  onViewBusRoute: (serviceNo: string) => void;
}

export const SavedAndToolsView: React.FC<SavedAndToolsViewProps> = ({
  bookmarkedStops,
  onSelectStopCode,
  onToggleBookmark,
  onViewBusRoute
}) => {
  const [distanceKm, setDistanceKm] = useState<number>(8.5);
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'calculator' | 'alerts'>('bookmarks');

  // Compute standard LTA Singapore distance fare
  const computeFare = (dist: number) => {
    // Basic fare formula approximation: base $1.09 up to 3.2km, +$0.09 per 1km up to $2.37 max
    let adult = 1.09;
    if (dist > 3.2) {
      adult += (dist - 3.2) * 0.085;
    }
    adult = Math.min(2.37, adult);

    const senior = Math.max(0.65, adult * 0.58);
    const student = Math.max(0.52, adult * 0.52);

    return {
      adult: adult.toFixed(2),
      senior: senior.toFixed(2),
      student: student.toFixed(2)
    };
  };

  const calculatedFares = computeFare(distanceKm);

  return (
    <div className="space-y-6">
      {/* Sub Tabs */}
      <div className="flex items-center gap-2 p-1 bg-white rounded-xl border border-[#E5E9F0] shadow-2xs">
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'bookmarks'
              ? 'bg-[#6B1D6D] text-white shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bookmark size={15} />
          <span>Saved Stops ({bookmarkedStops.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'calculator'
              ? 'bg-[#6B1D6D] text-white shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calculator size={15} />
          <span>Fare & Distance Calculator</span>
        </button>

        <button
          onClick={() => setActiveTab('alerts')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'alerts'
              ? 'bg-[#6B1D6D] text-white shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <AlertTriangle size={15} />
          <span>Service Advisories ({SERVICE_ALERTS.length})</span>
        </button>
      </div>

      {/* Tab 1: Saved Bookmarks */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-[#192A48]">
              Your Starred Bus Stops & Commute Hubs
            </h3>
            <span className="text-xs text-slate-400">
              Instant access without searching
            </span>
          </div>

          {bookmarkedStops.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border border-[#E5E9F0]">
              <Bookmark className="mx-auto text-slate-300 mb-2" size={36} />
              <p className="text-slate-600 font-medium text-sm">
                No bookmarked stops yet.
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Tap the bookmark icon on any bus stop to pin it here for one-touch glanceability!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarkedStops.map((code) => {
                const stop = BUS_STOPS.find((s) => s.code === code) || BUS_STOPS[0];
                const liveArrivals = generateLiveArrivals(stop.code).slice(0, 3);

                return (
                  <div
                    key={stop.code}
                    className="bg-white rounded-xl border border-[#E5E9F0] p-4 shadow-2xs space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-[#6B1D6D]/10 text-[#6B1D6D] font-mono font-bold text-xs">
                            {stop.code}
                          </span>
                          <span className="text-xs text-slate-400">{stop.roadName}</span>
                        </div>
                        <h4 className="font-display font-bold text-base text-[#192A48] mt-1">
                          {stop.description}
                        </h4>
                      </div>

                      <button
                        onClick={() => onToggleBookmark(stop.code)}
                        className="p-1.5 text-amber-500 hover:text-slate-400 transition-colors"
                        title="Remove bookmark"
                      >
                        <BookmarkCheck size={18} className="fill-amber-500" />
                      </button>
                    </div>

                    {/* Live arrival pills */}
                    <div className="pt-2 border-t border-[#F4F6F9] space-y-2">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Next Arriving Buses
                      </div>
                      <div className="space-y-1.5">
                        {liveArrivals.map((arr) => (
                          <div
                            key={arr.serviceNo}
                            className="flex items-center justify-between text-xs p-1.5 rounded-lg bg-[#F8F9FF]"
                          >
                            <div className="flex items-center gap-2">
                              <BusServiceBadge
                                serviceNo={arr.serviceNo}
                                category={arr.category}
                                size="sm"
                              />
                              <span className="truncate max-w-[120px] text-slate-700">
                                {arr.destinationName}
                              </span>
                            </div>
                            <ArrivalBadge bus={arr.nextBus} isPrimary={false} showDetails={false} />
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectStopCode(stop.code)}
                      className="w-full mt-2 py-2 rounded-lg bg-[#E5EEFE] hover:bg-[#dae3f2] text-[#192A48] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Open Full Stop Schedule</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Fare & Distance Calculator */}
      {activeTab === 'calculator' && (
        <div className="bg-white rounded-xl border border-[#E5E9F0] p-5 shadow-2xs space-y-6">
          <div>
            <h3 className="font-display font-bold text-xl text-[#192A48]">
              Municipal Transit Distance & Fare Estimator
            </h3>
            <p className="text-xs text-slate-500">
              Standard distance-based fare structure for integrated MRT and municipal bus rides
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Travel Distance: {distanceKm.toFixed(1)} km
              </label>
              <span className="text-xs font-mono text-slate-400">
                (Transfers within 45 mins count as single journey)
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="35"
              step="0.5"
              value={distanceKm}
              onChange={(e) => setDistanceKm(parseFloat(e.target.value))}
              className="w-full accent-[#6B1D6D] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>1 km (Feeder)</span>
              <span>15 km (Cross-Town)</span>
              <span>35 km (Island-Wide)</span>
            </div>
          </div>

          {/* Fare Breakdown Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 space-y-1 text-center">
              <div className="text-xs font-bold text-[#6B1D6D] uppercase">
                Adult Card Fare
              </div>
              <div className="font-display font-bold text-2xl text-[#192A48]">
                SGD ${calculatedFares.adult}
              </div>
              <div className="text-[11px] text-slate-500">
                EZ-Link / NETS / SimplyGo
              </div>
            </div>

            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-1 text-center">
              <div className="text-xs font-bold text-emerald-800 uppercase">
                Senior Citizen (58% off)
              </div>
              <div className="font-display font-bold text-2xl text-emerald-900">
                SGD ${calculatedFares.senior}
              </div>
              <div className="text-[11px] text-slate-500">
                Concession Pass
              </div>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-1 text-center">
              <div className="text-xs font-bold text-amber-800 uppercase">
                Student Concession
              </div>
              <div className="font-display font-bold text-2xl text-amber-900">
                SGD ${calculatedFares.student}
              </div>
              <div className="text-[11px] text-slate-500">
                MOE Primary/Secondary/JC
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#F8F9FF] border border-[#E5E9F0] text-xs text-slate-600 flex items-start gap-2">
            <Info size={16} className="text-[#6B1D6D] shrink-0 mt-0.5" />
            <p>
              Under Singapore distance-based fare rules, taking a bus and transferring to an MRT line within 45 minutes carries zero transfer surcharge. The total fare is calculated seamlessly on the continuous accumulated distance.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Service Advisories & Maintenance Notices */}
      {activeTab === 'alerts' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-[#192A48]">
              Live Service Advisories & Rail Operations
            </h3>
            <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Operations Feed
            </span>
          </div>

          <div className="space-y-3">
            {SERVICE_ALERTS.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border bg-white shadow-2xs space-y-2 ${
                  alert.type === 'ADVISORY'
                    ? 'border-amber-300 ring-1 ring-amber-100'
                    : alert.type === 'INFO'
                    ? 'border-blue-200'
                    : 'border-emerald-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {alert.type === 'ADVISORY' && (
                      <AlertTriangle size={16} className="text-amber-600" />
                    )}
                    {alert.type === 'NORMAL' && (
                      <CheckCircle2 size={16} className="text-emerald-600" />
                    )}
                    {alert.type === 'INFO' && (
                      <Info size={16} className="text-blue-600" />
                    )}
                    <h4 className="font-display font-bold text-sm text-[#192A48]">
                      {alert.title}
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {alert.timestamp}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {alert.message}
                </p>

                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-semibold text-slate-400">Lines:</span>
                  {alert.affectedLines.map((line, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700"
                    >
                      {line}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
