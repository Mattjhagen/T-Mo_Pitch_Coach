import React from 'react';
import { 
  ChevronRight, 
  TrendingUp, 
  HelpCircle, 
  ShieldAlert, 
  Zap, 
  ThumbsUp, 
  Minus 
} from 'lucide-react';
import { useSalesStore } from '../store/useSalesStore';
import { CONVERSATION_NODES } from '../data/conversationTree';
import { IntentType, ResponseOption } from '../types';

export const ResponseButtons: React.FC = () => {
  const { 
    currentNodeId, 
    customNodes,
    selectResponse, 
    sunlightMode, 
    coachingStats 
  } = useSalesStore();

  const allNodes = { ...CONVERSATION_NODES, ...customNodes };
  const currentNode = allNodes[currentNodeId] || CONVERSATION_NODES.node_stage1_opening;
  const responses = currentNode.responses || [];

  const getIntentStyles = (intent: IntentType) => {
    if (sunlightMode) {
      return {
        card: 'bg-white text-black border-2 border-black hover:bg-slate-100 shadow-[0_2px_0_0_#000]',
        badge: 'bg-black text-white',
        icon: <ChevronRight className="w-4 h-4 text-black" />,
      };
    }

    switch (intent) {
      case 'positive':
        return {
          card: 'bg-emerald-950/40 hover:bg-emerald-900/50 border-emerald-800/60 text-emerald-100 hover:border-emerald-500/80 shadow-emerald-950/30',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          icon: <ThumbsUp className="w-4 h-4 text-emerald-400" />,
        };
      case 'buying_signal':
        return {
          card: 'bg-[#e20074]/15 hover:bg-[#e20074]/25 border-[#e20074]/50 text-white hover:border-[#ff3399] shadow-[#e20074]/20 ring-1 ring-[#e20074]/30',
          badge: 'bg-[#e20074] text-white',
          icon: <Zap className="w-4 h-4 text-[#ff3399]" />,
        };
      case 'objection':
        return {
          card: 'bg-amber-950/30 hover:bg-amber-900/40 border-amber-800/60 text-amber-100 hover:border-amber-500/80 shadow-amber-950/30',
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          icon: <ShieldAlert className="w-4 h-4 text-amber-400" />,
        };
      case 'negative':
        return {
          card: 'bg-rose-950/30 hover:bg-rose-900/40 border-rose-800/60 text-rose-100 hover:border-rose-500/80 shadow-rose-950/30',
          badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
          icon: <Minus className="w-4 h-4 text-rose-400" />,
        };
      case 'neutral':
      default:
        return {
          card: 'bg-slate-900/90 hover:bg-slate-800/90 border-slate-800 text-slate-100 hover:border-slate-600 shadow-slate-950/30',
          badge: 'bg-slate-800 text-slate-300 border-slate-700/60',
          icon: <ChevronRight className="w-4 h-4 text-slate-400" />,
        };
    }
  };

  if (responses.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            They Say...
          </span>
          <span className="text-xs text-slate-500">
            (Tap customer's actual response)
          </span>
        </div>

        <span className="text-[11px] font-semibold text-slate-500">
          {responses.length} options
        </span>
      </div>

      {/* Grid of Response Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {responses.map((resp: ResponseOption) => {
          const style = getIntentStyles(resp.intent);
          
          // Check if this option links to a high-win-rate objection/coaching stat
          const relatedCoaching = Object.values(coachingStats).find(
            c => c.rebuttalId === resp.nextNodeId || resp.label.toLowerCase().includes(c.name.toLowerCase())
          );

          return (
            <button
              key={resp.id}
              onClick={() => selectResponse(resp.nextNodeId, resp.contextUpdate)}
              className={`group w-full min-h-[58px] p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all duration-150 active:scale-[0.98] cursor-pointer shadow-md ${style.card}`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="p-1 rounded-lg mt-0.5 shrink-0 opacity-80 group-hover:opacity-100">
                  {style.icon}
                </div>

                <div className="min-w-0">
                  <div className="font-bold text-sm sm:text-base leading-snug truncate">
                    {resp.label}
                  </div>
                  {resp.subtitle && (
                    <div className="text-xs opacity-75 truncate mt-0.5">
                      {resp.subtitle}
                    </div>
                  )}

                  {/* Dynamic Coaching Win-Rate Highlight */}
                  {relatedCoaching && relatedCoaching.successRate >= 75 && (
                    <div className="mt-1 flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                      <TrendingUp className="w-3 h-3" />
                      <span>{relatedCoaching.successRate}% Win Rate approach</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="shrink-0 pl-1">
                <div className="w-7 h-7 rounded-full flex items-center justify-center bg-black/20 group-hover:bg-white/10 transition">
                  <ChevronRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
