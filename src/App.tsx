/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Bus,
  Train,
  Navigation,
  Bookmark,
  Share2,
  Clock,
  Compass,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Info
} from 'lucide-react';
import heroImage from './assets/images/metro_transit_hero_1791347753751.jpg';
import { BusArrivalsView } from './components/BusArrivalsView';
import { BusRouteTrackerView } from './components/BusRouteTrackerView';
import { MrtNetworkView } from './components/MrtNetworkView';
import { JourneyPlannerView } from './components/JourneyPlannerView';
import { SavedAndToolsView } from './components/SavedAndToolsView';

export type ActiveScreen = 'arrivals' | 'tracker' | 'mrt' | 'planner' | 'saved';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('arrivals');
  const [selectedStopCode, setSelectedStopCode] = useState<string>('03223'); // Default to Chinatown Hong Lim
  const [selectedServiceNo, setSelectedServiceNo] = useState<string>('147');
  const [bookmarkedStops, setBookmarkedStops] = useState<string[]>(['03223', '01012', '08057']);
  const [showWayfindingInfo, setShowWayfindingInfo] = useState<boolean>(false);

  const handleToggleBookmark = (code: string) => {
    setBookmarkedStops((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const handleViewRouteTracker = (serviceNo: string) => {
    setSelectedServiceNo(serviceNo);
    setActiveScreen('tracker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectStopAndGoArrivals = (code: string) => {
    setSelectedStopCode(code);
    setActiveScreen('arrivals');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FF] text-[#131C27] flex flex-col selection:bg-[#6B1D6D]/15 selection:text-[#4F0053]">
      {/* Universal Frontend Design Top Bar Contract (1 Row, 3 Zones) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E9F0] px-4 sm:px-6 py-3">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
          {/* Zone 1: Single text element wordmark in Display face */}
          <button
            onClick={() => setActiveScreen('arrivals')}
            className="text-left font-display font-bold text-lg sm:text-xl text-[#192A48] tracking-tight hover:text-[#6B1D6D] transition-colors whitespace-nowrap"
          >
            Metro Transit Wayfinding
          </button>

          {/* Zone 2: 4-5 single-line clean text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-semibold text-slate-600">
            <button
              onClick={() => setActiveScreen('arrivals')}
              className={`hover:text-[#6B1D6D] transition-colors whitespace-nowrap pb-0.5 ${
                activeScreen === 'arrivals'
                  ? 'text-[#6B1D6D] border-b-2 border-[#6B1D6D] font-bold'
                  : ''
              }`}
            >
              Bus Arrivals
            </button>

            <button
              onClick={() => setActiveScreen('tracker')}
              className={`hover:text-[#6B1D6D] transition-colors whitespace-nowrap pb-0.5 ${
                activeScreen === 'tracker'
                  ? 'text-[#6B1D6D] border-b-2 border-[#6B1D6D] font-bold'
                  : ''
              }`}
            >
              Route Tracker
            </button>

            <button
              onClick={() => setActiveScreen('mrt')}
              className={`hover:text-[#6B1D6D] transition-colors whitespace-nowrap pb-0.5 ${
                activeScreen === 'mrt'
                  ? 'text-[#6B1D6D] border-b-2 border-[#6B1D6D] font-bold'
                  : ''
              }`}
            >
              MRT Network
            </button>

            <button
              onClick={() => setActiveScreen('planner')}
              className={`hover:text-[#6B1D6D] transition-colors whitespace-nowrap pb-0.5 ${
                activeScreen === 'planner'
                  ? 'text-[#6B1D6D] border-b-2 border-[#6B1D6D] font-bold'
                  : ''
              }`}
            >
              Journey Planner
            </button>

            <button
              onClick={() => setActiveScreen('saved')}
              className={`hover:text-[#6B1D6D] transition-colors whitespace-nowrap pb-0.5 ${
                activeScreen === 'saved'
                  ? 'text-[#6B1D6D] border-b-2 border-[#6B1D6D] font-bold'
                  : ''
              }`}
            >
              Saved & Tools
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2.5">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Network Active · 100% On-Time</span>
            </div>

            <button
              onClick={() => setShowWayfindingInfo(!showWayfindingInfo)}
              className="p-2 rounded-lg border border-[#E5E9F0] bg-white text-slate-600 hover:text-[#6B1D6D] hover:bg-slate-50 transition-colors"
              title="Transit Wayfinding Legend & Guide"
              aria-label="Wayfinding info"
            >
              <Info size={17} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-8 space-y-6">
        {/* Civic Transit Wayfinding Header Banner with generated photography asset */}
        {showWayfindingInfo && (
          <div className="bg-white rounded-2xl border border-[#E5E9F0] p-4 sm:p-6 shadow-sm relative overflow-hidden animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              <div className="md:col-span-7 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#6B1D6D] text-white text-[11px] font-bold uppercase tracking-wider">
                    Modern Civic Transit System
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    Standards & Legend
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#192A48]">
                  Glanceable Municipal Wayfinding Architecture
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Engineered for millions of daily commuters. High-contrast color coding roots each mode: Singapore civic purple (<span className="text-[#6B1D6D] font-bold">#6B1D6D</span>) anchors bus services, energetic transit orange (<span className="text-[#FE6B27] font-bold">#FE6B27</span>) drives live arrival actions, and official MRT lines (<span className="text-[#7B1FA2] font-bold">NEL</span>, <span className="text-[#005BAA] font-bold">DTL</span>, <span className="text-[#009640] font-bold">EWL</span>, <span className="text-[#D42E12] font-bold">NSL</span>, <span className="text-[#9D5B25] font-bold">TEL</span>, <span className="text-[#FF9E1B] font-bold">CCL</span>) identify rapid train transfers.
                </p>

                {/* Legend Chips */}
                <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6] font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#137333]" />
                    <span>Seats Available</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A] font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#D97706]" />
                    <span>Standing Room</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FCE8E6] text-[#C5221F] border border-[#FAD2CF] font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#C5221F]" />
                    <span>Limited Standing</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-[11px]">
                    <span>WAB = Wheelchair Barrier-Free</span>
                  </div>
                </div>
              </div>

              {/* Hero Photographic Visual Slot */}
              <div className="md:col-span-5 relative h-48 sm:h-56 rounded-xl overflow-hidden border border-[#E5E9F0] shadow-2xs">
                <img
                  src={heroImage}
                  alt="Modern civic public transit hub at dusk"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                  <span className="text-white text-xs font-semibold drop-shadow-md">
                    Integrated Bus & Rail Interchange Network
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Screen View Router */}
        {activeScreen === 'arrivals' && (
          <BusArrivalsView
            selectedStopCode={selectedStopCode}
            onSelectStopCode={setSelectedStopCode}
            onViewRouteTracker={handleViewRouteTracker}
            bookmarkedStops={bookmarkedStops}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeScreen === 'tracker' && (
          <BusRouteTrackerView
            selectedServiceNo={selectedServiceNo}
            onSelectServiceNo={setSelectedServiceNo}
            onSelectStopCode={handleSelectStopAndGoArrivals}
          />
        )}

        {activeScreen === 'mrt' && (
          <MrtNetworkView
            onSelectStationNearbyBusStop={handleSelectStopAndGoArrivals}
          />
        )}

        {activeScreen === 'planner' && (
          <JourneyPlannerView
            onViewBusStop={handleSelectStopAndGoArrivals}
            onViewBusRoute={handleViewRouteTracker}
          />
        )}

        {activeScreen === 'saved' && (
          <SavedAndToolsView
            bookmarkedStops={bookmarkedStops}
            onSelectStopCode={handleSelectStopAndGoArrivals}
            onToggleBookmark={handleToggleBookmark}
            onViewBusRoute={handleViewRouteTracker}
          />
        )}
      </main>

      {/* Fixed Mobile Bottom Tab Bar (Pattern 1 from Mobile Touch Reference) */}
      {/* Follows the 15% Mobile Sticky Cap */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5E9F0] px-2 py-1.5 shadow-lg">
        <div className="grid grid-cols-5 items-center h-14">
          <button
            onClick={() => setActiveScreen('arrivals')}
            className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
              activeScreen === 'arrivals' ? 'text-[#6B1D6D]' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bus size={20} className={activeScreen === 'arrivals' ? 'stroke-[2.5]' : ''} />
            <span className="text-[10px] font-bold tracking-tight mt-1">Arrivals</span>
          </button>

          <button
            onClick={() => setActiveScreen('tracker')}
            className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
              activeScreen === 'tracker' ? 'text-[#6B1D6D]' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Compass size={20} className={activeScreen === 'tracker' ? 'stroke-[2.5]' : ''} />
            <span className="text-[10px] font-bold tracking-tight mt-1">Tracker</span>
          </button>

          <button
            onClick={() => setActiveScreen('mrt')}
            className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
              activeScreen === 'mrt' ? 'text-[#6B1D6D]' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Train size={20} className={activeScreen === 'mrt' ? 'stroke-[2.5]' : ''} />
            <span className="text-[10px] font-bold tracking-tight mt-1">MRT Rail</span>
          </button>

          <button
            onClick={() => setActiveScreen('planner')}
            className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
              activeScreen === 'planner' ? 'text-[#6B1D6D]' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Navigation size={20} className={activeScreen === 'planner' ? 'stroke-[2.5]' : ''} />
            <span className="text-[10px] font-bold tracking-tight mt-1">Planner</span>
          </button>

          <button
            onClick={() => setActiveScreen('saved')}
            className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
              activeScreen === 'saved' ? 'text-[#6B1D6D]' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bookmark size={20} className={activeScreen === 'saved' ? 'stroke-[2.5]' : ''} />
            <span className="text-[10px] font-bold tracking-tight mt-1">Saved</span>
          </button>
        </div>
      </div>

      {/* Institutional Footer */}
      <footer className="border-t border-[#E5E9F0] bg-white py-6 px-4 sm:px-6 text-xs text-slate-500 mt-auto hidden md:block">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-[#192A48]">Metro Transit Wayfinding</span>
            <span>·</span>
            <span>Municipal Public Transport Real-Time Information System</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Live GPS Bus Feeds</span>
            <span>·</span>
            <span>LTA Datamall Standardized</span>
            <span>·</span>
            <span>ISO 28560 Transit Signage</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
