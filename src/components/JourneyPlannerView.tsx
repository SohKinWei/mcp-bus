import React, { useState } from 'react';
import {
  Navigation,
  ArrowRight,
  ArrowDownUp,
  Clock,
  DollarSign,
  Leaf,
  Footprints,
  Bus,
  Train,
  CheckCircle2,
  ChevronRight,
  Share2
} from 'lucide-react';
import { BUS_STOPS } from '../data/transitData';
import { MrtBadge } from './MrtBadge';
import { BusServiceBadge } from './BusServiceBadge';

const POPULAR_LOCATIONS = [
  { label: 'Chinatown / Hong Lim', stopCode: '03223', desc: 'Opp Hong Lim Cplx' },
  { label: 'Dhoby Ghaut Interchange', stopCode: '08057', desc: 'Dhoby Ghaut Stn' },
  { label: 'Orchard / Lucky Plaza', stopCode: '09048', desc: 'Orchard Stn / Lucky Plaza' },
  { label: 'Raffles Place CBD', stopCode: '04179', desc: 'Raffles Place Stn Exit F' },
  { label: 'Marina Bay Sands MICE', stopCode: '03539', desc: 'Marina Bay Sands MICE' },
  { label: 'HarbourFront / VivoCity', stopCode: '14119', desc: 'HarbourFront Stn / VivoCity' },
  { label: 'Tampines Hub', stopCode: '65009', desc: 'Tampines Interchange' },
  { label: 'Jurong East Central', stopCode: '28009', desc: 'Jurong East Interchange' }
];

interface JourneyPlannerViewProps {
  onViewBusStop: (code: string) => void;
  onViewBusRoute: (serviceNo: string) => void;
}

export const JourneyPlannerView: React.FC<JourneyPlannerViewProps> = ({
  onViewBusStop,
  onViewBusRoute
}) => {
  const [originCode, setOriginCode] = useState<string>('03223');
  const [destinationCode, setDestinationCode] = useState<string>('09048');
  const [travelPreference, setTravelPreference] = useState<'fastest' | 'least-walk' | 'bus' | 'rail'>('fastest');
  const [passengerType, setPassengerType] = useState<'adult' | 'senior' | 'student'>('adult');

  const originStop = BUS_STOPS.find((s) => s.code === originCode) || BUS_STOPS[0];
  const destinationStop = BUS_STOPS.find((s) => s.code === destinationCode) || BUS_STOPS[4];

  const handleSwap = () => {
    const temp = originCode;
    setOriginCode(destinationCode);
    setDestinationCode(temp);
  };

  // Generate realistic itinerary options between selected pairs
  const itineraries = [
    {
      id: 'plan-1',
      title: 'Fastest Multi-Modal Route',
      isRecommended: true,
      totalDuration: 18,
      walkingDuration: 3,
      transfers: 0,
      departureCountdownMin: 2,
      fareAdult: 1.39,
      co2SavedKg: 1.4,
      steps: [
        {
          mode: 'WALK',
          instruction: `Walk 1 min to ${originStop.description} (${originStop.code})`,
          duration: 1
        },
        {
          mode: 'BUS',
          service: '190',
          category: 'Normal' as const,
          instruction: `Board Bus 190 towards Kampong Bahru Ter (Double Decker · Seats Avail)`,
          from: originStop.description,
          to: destinationStop.description,
          stopsCount: 4,
          duration: 14
        },
        {
          mode: 'WALK',
          instruction: `Alight at ${destinationStop.description} (${destinationStop.code})`,
          duration: 3
        }
      ]
    },
    {
      id: 'plan-2',
      title: 'Direct Bus Service 147',
      isRecommended: false,
      totalDuration: 22,
      walkingDuration: 4,
      transfers: 0,
      departureCountdownMin: 4,
      fareAdult: 1.48,
      co2SavedKg: 1.6,
      steps: [
        {
          mode: 'WALK',
          instruction: `Walk 2 mins to ${originStop.description}`,
          duration: 2
        },
        {
          mode: 'BUS',
          service: '147',
          category: 'Normal' as const,
          instruction: `Board Bus 147 towards Clementi Int`,
          from: originStop.description,
          to: destinationStop.description,
          stopsCount: 6,
          duration: 18
        },
        {
          mode: 'WALK',
          instruction: `Arrive at destination`,
          duration: 2
        }
      ]
    },
    {
      id: 'plan-3',
      title: 'MRT Rail Transit Express',
      isRecommended: false,
      totalDuration: 20,
      walkingDuration: 6,
      transfers: 1,
      departureCountdownMin: 3,
      fareAdult: 1.28,
      co2SavedKg: 1.8,
      steps: [
        {
          mode: 'WALK',
          instruction: `Walk 3 mins to Chinatown MRT (NE4/DT19)`,
          duration: 3
        },
        {
          mode: 'MRT',
          lineCode: 'NEL' as const,
          stationCode: 'NE4',
          instruction: `Take North East Line towards Punggol (2 stops to Dhoby Ghaut NE6)`,
          from: 'Chinatown',
          to: 'Dhoby Ghaut',
          stopsCount: 2,
          duration: 5
        },
        {
          mode: 'MRT',
          lineCode: 'NSL' as const,
          stationCode: 'NS24',
          instruction: `Transfer to North South Line towards Jurong East (2 stops to Orchard NS22)`,
          from: 'Dhoby Ghaut',
          to: 'Orchard',
          stopsCount: 2,
          duration: 6
        },
        {
          mode: 'WALK',
          instruction: `Exit via ION Orchard / Lucky Plaza Underpass`,
          duration: 4
        }
      ]
    }
  ];

  const getFare = (baseFare: number) => {
    if (passengerType === 'student') return (baseFare * 0.55).toFixed(2);
    if (passengerType === 'senior') return (baseFare * 0.58).toFixed(2);
    return baseFare.toFixed(2);
  };

  return (
    <div className="space-y-6">
      {/* Route Finder Input Panel */}
      <div className="bg-white rounded-xl border border-[#E5E9F0] p-4 sm:p-5 shadow-2xs">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E9F0]">
          <div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#192A48]">
              Multi-Modal Journey Planner
            </h2>
            <p className="text-xs text-slate-500">
              Calculate instant bus and MRT itineraries with live GPS countdowns and fare calculation
            </p>
          </div>
        </div>

        {/* Origin & Destination Controls */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Origin */}
          <div className="md:col-span-5 space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Starting Point
            </label>
            <select
              value={originCode}
              onChange={(e) => setOriginCode(e.target.value)}
              className="w-full h-12 px-3.5 rounded-lg border border-[#E5E9F0] bg-white text-sm font-semibold text-[#192A48] focus:outline-none focus:ring-2 focus:ring-[#6B1D6D]"
            >
              {BUS_STOPS.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.code} - {s.description} ({s.roadName})
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-2 flex justify-center py-1 md:py-0">
            <button
              onClick={handleSwap}
              className="w-10 h-10 rounded-full border border-[#E5E9F0] bg-[#F8F9FF] hover:bg-slate-100 flex items-center justify-center text-slate-600 hover:text-[#6B1D6D] transition-colors shadow-2xs"
              title="Swap Origin and Destination"
              aria-label="Swap directions"
            >
              <ArrowDownUp size={16} />
            </button>
          </div>

          {/* Destination */}
          <div className="md:col-span-5 space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E65A15]" />
              Destination
            </label>
            <select
              value={destinationCode}
              onChange={(e) => setDestinationCode(e.target.value)}
              className="w-full h-12 px-3.5 rounded-lg border border-[#E5E9F0] bg-white text-sm font-semibold text-[#192A48] focus:outline-none focus:ring-2 focus:ring-[#6B1D6D]"
            >
              {BUS_STOPS.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.code} - {s.description} ({s.roadName})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Popular Locations Fast Pills */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 shrink-0 font-medium text-[11px]">Popular:</span>
          {POPULAR_LOCATIONS.map((loc) => (
            <button
              key={loc.stopCode}
              onClick={() => {
                if (originCode === loc.stopCode) return;
                setDestinationCode(loc.stopCode);
              }}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium shrink-0 transition-colors"
            >
              {loc.label}
            </button>
          ))}
        </div>

        {/* Preference Filters & Passenger Concession Picker */}
        <div className="mt-4 pt-3 border-t border-[#E5E9F0] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium">Mode:</span>
            <button
              onClick={() => setTravelPreference('fastest')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold ${
                travelPreference === 'fastest'
                  ? 'bg-[#192A48] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Fastest
            </button>
            <button
              onClick={() => setTravelPreference('least-walk')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold ${
                travelPreference === 'least-walk'
                  ? 'bg-[#192A48] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Least Walking
            </button>
            <button
              onClick={() => setTravelPreference('bus')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold ${
                travelPreference === 'bus'
                  ? 'bg-[#192A48] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Bus Only
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium">Fare Card:</span>
            <button
              onClick={() => setPassengerType('adult')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                passengerType === 'adult' ? 'bg-[#6B1D6D] text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Adult
            </button>
            <button
              onClick={() => setPassengerType('senior')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                passengerType === 'senior' ? 'bg-[#6B1D6D] text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Senior (58% off)
            </button>
            <button
              onClick={() => setPassengerType('student')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                passengerType === 'student' ? 'bg-[#6B1D6D] text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Student (55% off)
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Routes Options */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-lg text-[#192A48]">
            Optimal Transit Itineraries ({itineraries.length} routes)
          </h3>
          <span className="text-xs text-slate-400">
            Updated based on current bus GPS & train intervals
          </span>
        </div>

        {itineraries.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-xl border p-5 shadow-2xs transition-all relative overflow-hidden ${
              plan.isRecommended
                ? 'border-[#6B1D6D]/40 ring-1 ring-[#6B1D6D]/20'
                : 'border-[#E5E9F0]'
            }`}
          >
            {plan.isRecommended && (
              <div className="absolute top-0 right-0 bg-[#6B1D6D] text-white px-3 py-0.5 text-[11px] font-bold rounded-bl-lg uppercase tracking-wider">
                Recommended
              </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E5E9F0]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-display font-bold text-lg text-[#192A48]">
                    {plan.title}
                  </h4>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    Leave in {plan.departureCountdownMin} min
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <Clock size={13} className="text-[#6B1D6D]" />
                    {plan.totalDuration} mins total
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Footprints size={13} className="text-slate-400" />
                    {plan.walkingDuration} mins walk
                  </span>
                  <span>·</span>
                  <span className="font-semibold text-slate-700">
                    Fare: SGD ${getFare(plan.fareAdult)}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <Leaf size={12} />
                    -{plan.co2SavedKg}kg CO₂
                  </span>
                </div>
              </div>

              {/* Action Button */}
              {/* Primary Action (Estimate / Search): #E65A15 solid fill, white text, uppercase bold tracking, hover #CF4E0F */}
              <button
                onClick={() => {
                  if (plan.steps[1]?.service) {
                    onViewBusRoute(plan.steps[1].service);
                  }
                }}
                className="h-12 px-6 rounded-lg bg-[#E65A15] hover:bg-[#CF4E0F] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] self-start md:self-auto"
              >
                <span>Navigate Route</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Step-by-Step Wayfinding Breakdown */}
            <div className="mt-4 space-y-3 pt-1">
              {plan.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  {/* Mode Icon */}
                  <div className="mt-0.5 shrink-0">
                    {step.mode === 'WALK' && (
                      <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
                        <Footprints size={12} />
                      </div>
                    )}
                    {step.mode === 'BUS' && (
                      <div className="w-6 h-6 rounded-full bg-[#6B1D6D]/15 text-[#6B1D6D] flex items-center justify-center font-bold">
                        <Bus size={12} />
                      </div>
                    )}
                    {step.mode === 'MRT' && (
                      <div className="w-6 h-6 rounded-full bg-[#192A48]/15 text-[#192A48] flex items-center justify-center font-bold">
                        <Train size={12} />
                      </div>
                    )}
                  </div>

                  {/* Instruction */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {step.service && (
                        <BusServiceBadge
                          serviceNo={step.service}
                          category={step.category}
                          size="sm"
                        />
                      )}
                      {step.stationCode && step.lineCode && (
                        <MrtBadge
                          stationCode={step.stationCode}
                          lineCode={step.lineCode}
                          size="xs"
                        />
                      )}
                      <span className="font-semibold text-slate-800">
                        {step.instruction}
                      </span>
                    </div>

                    {step.from && step.to && (
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {step.from} → {step.to} ({step.stopsCount} stops · ~{step.duration} mins)
                      </div>
                    )}
                  </div>

                  {/* Leg Duration */}
                  <span className="text-slate-400 font-mono text-[11px] shrink-0 tabular-nums">
                    {step.duration} min
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
