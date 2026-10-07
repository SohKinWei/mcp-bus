import React, { useState } from 'react';
import { X, Check, Copy, Send, MessageCircle } from 'lucide-react';
import { BusStop, BusArrivalInfo } from '../types/transit';

interface WhatsAppShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  stop: BusStop;
  arrivals: BusArrivalInfo[];
  selectedService?: string;
}

export const WhatsAppShareModal: React.FC<WhatsAppShareModalProps> = ({
  isOpen,
  onClose,
  stop,
  arrivals,
  selectedService
}) => {
  const [copied, setCopied] = useState(false);
  const [customNote, setCustomNote] = useState('Heading home now! 🚌');

  if (!isOpen) return null;

  // Filter or highlight relevant arrival
  const activeArrivals = selectedService
    ? arrivals.filter(a => a.serviceNo === selectedService)
    : arrivals.slice(0, 4);

  const formatArrivalString = (arr: BusArrivalInfo) => {
    const min = Math.ceil(arr.nextBus.estimatedArrivalSeconds / 60);
    const etaText = min <= 1 ? 'Arriving now' : `in ${min} mins`;
    const loadText = arr.nextBus.load === 'SEA' ? 'Seats Available' : arr.nextBus.load === 'SDA' ? 'Standing Available' : 'Crowded';
    return `• Bus ${arr.serviceNo} (${arr.destinationName}): ${etaText} [${loadText}]`;
  };

  const shareText = `*Transit Update from Metro Wayfinding* 🚇\n\n📍 *Stop:* ${stop.code} - ${stop.description} (${stop.roadName})\n\n🕒 *Live Bus Arrivals:*\n${activeArrivals.map(formatArrivalString).join('\n')}\n\n💬 "${customNote}"\n\nTrack real-time Singapore transit updates: ${window.location.origin}`;

  const encodedText = encodeURIComponent(shareText);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E5E9F0] text-[#131c27] relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E9F0]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#25D366]">
              <MessageCircle size={22} className="fill-[#25D366]" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#192A48]">
                Share Live Transit ETA
              </h3>
              <p className="text-xs text-slate-500">
                Send real-time arrival info to family or friends via WhatsApp
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Preview */}
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Personal Note
            </label>
            <input
              type="text"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-[#E5E9F0] bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1D6D] focus:border-[#6B1D6D]"
              placeholder="e.g. On my way, see you at 7pm!"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              WhatsApp Message Preview
            </label>
            <div className="p-3.5 rounded-xl bg-[#F4F6F9] border border-[#E5E9F0] text-xs font-mono text-slate-800 whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed selection:bg-[#25D366]/20">
              {shareText}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleCopy}
            className="w-full sm:w-1/2 min-h-[46px] rounded-lg border border-[#E5E9F0] bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
          >
            {copied ? (
              <>
                <Check size={16} className="text-emerald-600" />
                <span className="text-emerald-700 font-bold">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copy Message</span>
              </>
            )}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-1/2 min-h-[46px] rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/25 transition-all active:scale-[0.98]"
          >
            <Send size={15} />
            <span>Open WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
