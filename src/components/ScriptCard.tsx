import React, { useState } from 'react';
import { Copy, Check, Lightbulb, ChevronDown, ChevronUp, Sparkles, AlertCircle } from 'lucide-react';
import { useSalesStore } from '../store/useSalesStore';
import { CONVERSATION_NODES } from '../data/conversationTree';
import { OPENING_STYLES } from '../data/openingStyles';

export const ScriptCard: React.FC = () => {
  const { 
    currentNodeId, 
    customNodes,
    context, 
    sunlightMode, 
    largeTextMode,
    activeOpeningStyleId,
    setOpeningStyle 
  } = useSalesStore();

  const [copied, setCopied] = useState(false);
  const [showCoaching, setShowCoaching] = useState(true);

  const allNodes = { ...CONVERSATION_NODES, ...customNodes };
  const currentNode = allNodes[currentNodeId] || CONVERSATION_NODES.node_stage1_opening;

  // If we are at stage 1 opening, use the selected opening style's script & coaching
  const isOpeningNode = currentNode.id === 'node_stage1_opening';
  const activeStyle = OPENING_STYLES.find(s => s.id === activeOpeningStyleId) || OPENING_STYLES[0];
  
  const displayScript = isOpeningNode ? activeStyle.script : currentNode.script;
  const displayCoaching = isOpeningNode ? activeStyle.coaching : currentNode.coachingTip;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(displayScript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className={`rounded-2xl transition-all shadow-lg overflow-hidden border ${
      sunlightMode 
        ? 'sunlight-card bg-white text-black border-2 border-black' 
        : 'bg-slate-900/90 border-slate-800 text-slate-100 shadow-slate-950/40'
    }`}>
      {/* Top Header Strip */}
      <div className={`px-4 py-2.5 flex items-center justify-between border-b ${
        sunlightMode 
          ? 'bg-slate-100 border-black' 
          : 'bg-slate-950/50 border-slate-800/80'
      }`}>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#e20074] text-white text-[11px] font-extrabold tracking-wider uppercase">
            <Sparkles className="w-3 h-3" />
            Say This
          </span>
          <span className={`text-xs font-semibold truncate ${sunlightMode ? 'text-black' : 'text-slate-400'}`}>
            {currentNode.title}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition active:scale-95 ${
            copied
              ? 'bg-emerald-600 text-white'
              : sunlightMode
                ? 'bg-white hover:bg-slate-200 text-black border border-black'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60'
          }`}
          title="Copy exact script line"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-white" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Opening Style Switcher (Available on Stage 1) */}
      {isOpeningNode && (
        <div className={`px-4 pt-3 pb-2 border-b flex items-center gap-1.5 overflow-x-auto no-scrollbar ${
          sunlightMode ? 'bg-slate-50 border-slate-300' : 'bg-slate-950/30 border-slate-800/60'
        }`}>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Style:
          </span>
          {OPENING_STYLES.map((style) => {
            const isSelected = style.id === activeOpeningStyleId;
            return (
              <button
                key={style.id}
                onClick={() => setOpeningStyle(style.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? sunlightMode
                      ? 'bg-black text-white shadow-sm'
                      : 'bg-[#e20074] text-white shadow-sm shadow-[#e20074]/30'
                    : sunlightMode
                      ? 'bg-white text-black border border-slate-300 hover:bg-slate-100'
                      : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-700/40'
                }`}
              >
                {style.name}
              </button>
            );
          })}
        </div>
      )}

      {/* Main Verbal Script Area */}
      <div className="p-4 sm:p-6">
        <p className={`leading-relaxed tracking-tight select-text ${
          largeTextMode 
            ? 'text-2xl sm:text-3xl font-extrabold leading-snug' 
            : 'text-xl sm:text-2xl font-bold leading-normal'
        } ${sunlightMode ? 'text-black' : 'text-white'}`}>
          “{displayScript}”
        </p>

        {/* Known Context Metadata Badges (Unboxed typography as per design rules) */}
        {(context.provider || context.monthlyBill || context.primaryPainPoint || (context.householdNeeds && context.householdNeeds.length > 0)) && (
          <div className="mt-4 pt-3 border-t border-slate-800/50 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">Learned so far:</span>
            {context.provider && (
              <span className="font-semibold text-sky-400">
                Provider: {context.provider}
              </span>
            )}
            {context.monthlyBill && (
              <>
                <span className="text-slate-600">·</span>
                <span className="font-semibold text-emerald-400">
                  Bill: {context.monthlyBill}
                </span>
              </>
            )}
            {context.primaryPainPoint && (
              <>
                <span className="text-slate-600">·</span>
                <span className="font-semibold text-amber-400">
                  Issue: {context.primaryPainPoint}
                </span>
              </>
            )}
            {context.householdNeeds && context.householdNeeds.length > 0 && (
              <>
                <span className="text-slate-600">·</span>
                <span className="font-semibold text-purple-400">
                  Needs: {context.householdNeeds.join(', ')}
                </span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Expandable Rep Coaching & Rationale */}
      {displayCoaching && (
        <div className={`border-t transition-colors ${
          sunlightMode 
            ? 'bg-amber-50 border-black text-black' 
            : 'bg-slate-950/60 border-slate-800/80 text-slate-300'
        }`}>
          <button
            onClick={() => setShowCoaching(!showCoaching)}
            className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-semibold text-left"
          >
            <div className="flex items-center gap-2">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className={sunlightMode ? 'text-black font-bold' : 'text-amber-400'}>
                Rep Coaching Tip & Psychology
              </span>
            </div>
            {showCoaching ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {showCoaching && (
            <div className="px-4 pb-3.5 pt-0 text-xs sm:text-sm leading-relaxed space-y-2">
              <p className={sunlightMode ? 'text-black' : 'text-slate-300'}>
                {displayCoaching}
              </p>
              {currentNode.reasoning && (
                <div className="flex items-start gap-1.5 text-xs text-slate-400">
                  <AlertCircle className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span>{currentNode.reasoning}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
