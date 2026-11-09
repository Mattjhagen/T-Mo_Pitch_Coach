import React from 'react';
import { 
  ArrowLeft, 
  ShieldAlert, 
  Zap, 
  CheckCircle2, 
  FileText
} from 'lucide-react';
import { useSalesStore } from '../store/useSalesStore';

export const BottomNav: React.FC = () => {
  const { 
    historyStack, 
    goBack, 
    setObjectionSheetOpen, 
    setBuyingSignalsOpen,
    setClosingModalOpen,
    setSummaryModalOpen,
    sunlightMode 
  } = useSalesStore();

  const canGoBack = historyStack.length > 0;

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-30 transition-colors border-t pb-safe ${
      sunlightMode 
        ? 'bg-white border-black text-black' 
        : 'bg-slate-950/95 backdrop-blur-md border-slate-800 text-white shadow-2xl shadow-black'
    }`}>
      <div className="max-w-4xl mx-auto px-3 sm:px-4 h-16 flex items-center justify-between gap-2">
        {/* Back Button */}
        <button
          onClick={goBack}
          disabled={!canGoBack}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 rounded-xl transition-all active:scale-95 ${
            canGoBack 
              ? sunlightMode 
                ? 'text-black hover:bg-slate-100' 
                : 'text-slate-200 hover:bg-slate-800 hover:text-white'
              : 'opacity-30 cursor-not-allowed text-slate-500'
          }`}
          title="Back to previous response"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">
            Back {canGoBack ? `(${historyStack.length})` : ''}
          </span>
        </button>

        {/* Quick Objections Trigger (Most Important Feature) */}
        <button
          onClick={() => setObjectionSheetOpen(true)}
          className={`flex-1 max-w-[140px] sm:max-w-[170px] h-12 rounded-xl border flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 ${
            sunlightMode
              ? 'bg-amber-400 text-black border-black font-extrabold'
              : 'bg-amber-950/50 hover:bg-amber-900/60 border-amber-600/70 text-amber-200 shadow-amber-950/30'
          }`}
          title="Open categorized objection handling library"
        >
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-xs sm:text-sm font-extrabold tracking-tight">
            Objections
          </span>
        </button>

        {/* Buying Signals Trigger */}
        <button
          onClick={() => setBuyingSignalsOpen(true)}
          className={`flex-1 max-w-[140px] sm:max-w-[170px] h-12 rounded-xl border flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 ${
            sunlightMode
              ? 'bg-[#e20074] text-white border-black font-extrabold'
              : 'bg-[#e20074]/20 hover:bg-[#e20074]/30 border-[#e20074]/60 text-white shadow-[#e20074]/20 ring-1 ring-[#e20074]/40'
          }`}
          title="Customer asking buying questions"
        >
          <Zap className="w-4 h-4 text-[#ff3399] shrink-0" />
          <span className="text-xs sm:text-sm font-extrabold tracking-tight">
            Buying Signals
          </span>
        </button>

        {/* Closing Flow Shortcut */}
        <button
          onClick={() => setClosingModalOpen(true)}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 rounded-xl transition-all active:scale-95 ${
            sunlightMode
              ? 'text-black hover:bg-slate-100'
              : 'text-emerald-400 hover:bg-emerald-950/40 hover:text-emerald-300'
          }`}
          title="Open guided 7-step close"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">
            Close
          </span>
        </button>

        {/* Manual Conversation Summary View */}
        <button
          onClick={() => setSummaryModalOpen(true)}
          className={`flex flex-col items-center justify-center min-w-[52px] h-12 rounded-xl transition-all active:scale-95 ${
            sunlightMode
              ? 'text-black hover:bg-slate-100'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
          title="View & Edit Conversation Summary"
        >
          <FileText className="w-5 h-5 text-slate-400" />
          <span className="text-[10px] font-semibold mt-0.5">
            Summary
          </span>
        </button>
      </div>
    </nav>
  );
};
