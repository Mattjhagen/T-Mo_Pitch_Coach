import React, { useState } from 'react';
import { X, Zap, ArrowRight, Lightbulb, CheckCircle2 } from 'lucide-react';
import { useSalesStore } from '../store/useSalesStore';
import { BUYING_SIGNALS_DATA } from '../data/buyingSignals';

export const BuyingSignalsSheet: React.FC = () => {
  const { 
    isBuyingSignalsOpen, 
    setBuyingSignalsOpen, 
    jumpToNode, 
    updateContext,
    sunlightMode 
  } = useSalesStore();

  const [selectedSignalId, setSelectedSignalId] = useState<string>(BUYING_SIGNALS_DATA[0].id);

  const selectedSignal = BUYING_SIGNALS_DATA.find((s) => s.id === selectedSignalId) || BUYING_SIGNALS_DATA[0];

  const handleUseSignal = () => {
    updateContext({
      buyingSignalsHeard: [selectedSignal.signal],
    });
    jumpToNode(selectedSignal.targetNodeId);
    setBuyingSignalsOpen(false);
  };

  if (!isBuyingSignalsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className={`w-full max-w-2xl h-[85vh] sm:h-[75vh] rounded-t-3xl sm:rounded-3xl border flex flex-col overflow-hidden shadow-2xl transition-colors ${
        sunlightMode 
          ? 'bg-white border-black text-black' 
          : 'bg-slate-900 border-slate-700 text-slate-100'
      }`}>
        {/* Grab bar */}
        <div className="w-12 h-1.5 bg-slate-600/40 rounded-full mx-auto my-2.5 sm:hidden shrink-0" />

        {/* Modal Header */}
        <div className={`px-4 py-3 border-b flex items-center justify-between shrink-0 ${
          sunlightMode ? 'bg-slate-100 border-black' : 'bg-slate-950/80 border-slate-800'
        }`}>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#e20074]/20 text-[#ff3399]">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white" style={{ color: sunlightMode ? '#000000' : '#ffffff' }}>
                Buying Signals Navigator
              </h2>
              <p className="text-xs text-slate-400">
                Customer expressing interest—guide toward qualification & close
              </p>
            </div>
          </div>

          <button
            onClick={() => setBuyingSignalsOpen(false)}
            className={`p-2 rounded-xl transition ${
              sunlightMode ? 'hover:bg-slate-200 text-black' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Signals Tabs / Selector */}
        <div className={`p-3 border-b overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0 ${
          sunlightMode ? 'bg-slate-50 border-slate-300' : 'bg-slate-950/40 border-slate-800'
        }`}>
          {BUYING_SIGNALS_DATA.map((item) => {
            const isSelected = item.id === selectedSignal.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedSignalId(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? sunlightMode
                      ? 'bg-black text-white'
                      : 'bg-[#e20074] text-white shadow-sm shadow-[#e20074]/30'
                    : sunlightMode
                      ? 'bg-white text-black border border-slate-300'
                      : 'bg-slate-800/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {item.signal}
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Signal Prompt Card */}
          <div className={`p-3.5 rounded-xl border ${
            sunlightMode ? 'bg-pink-50 border-black' : 'bg-[#e20074]/15 border-[#e20074]/40'
          }`}>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#ff3399]">
              Homeowner Asked:
            </span>
            <div className="text-lg font-extrabold mt-0.5 text-white" style={{ color: sunlightMode ? '#000000' : '#ffffff' }}>
              “{selectedSignal.signal}”
            </div>
          </div>

          {/* Rep Pivot Response Script */}
          <div className={`p-4 rounded-2xl border space-y-3 ${
            sunlightMode ? 'bg-white border-2 border-black' : 'bg-slate-800/80 border-slate-700'
          }`}>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400">
              Immediate Pivot Script:
            </span>
            <p className={`text-base sm:text-lg font-bold leading-relaxed ${
              sunlightMode ? 'text-black' : 'text-white'
            }`}>
              “{selectedSignal.repResponse}”
            </p>

            <div className="pt-2 border-t border-slate-700/50">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Follow-Up Transition:
              </span>
              <p className="text-sm font-semibold text-sky-400 mt-0.5">
                “{selectedSignal.followUp}”
              </p>
            </div>
          </div>

          {/* Coaching Box */}
          <div className={`p-3.5 rounded-xl border flex items-start gap-2.5 ${
            sunlightMode ? 'bg-slate-100 border-slate-300' : 'bg-slate-950/60 border-slate-800'
          }`}>
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-amber-400 block mb-0.5">Rep Coaching:</strong>
              {selectedSignal.coaching}
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className={`p-3 sm:p-4 border-t flex items-center justify-between gap-3 shrink-0 ${
          sunlightMode ? 'bg-slate-100 border-black' : 'bg-slate-950/80 border-slate-800'
        }`}>
          <div className="text-xs text-slate-400 truncate hidden xs:block">
            Target: <span className="text-slate-200 font-semibold">{selectedSignal.targetStage.replace('stage_', 'Stage ')}</span>
          </div>

          <button
            onClick={handleUseSignal}
            className="w-full xs:w-auto px-5 py-2.5 rounded-xl bg-[#e20074] hover:bg-[#c40064] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#e20074]/30 active:scale-95 transition"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Apply & Pivot to Closing Flow</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
