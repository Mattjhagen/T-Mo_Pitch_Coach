import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { ScriptCard } from './components/ScriptCard';
import { ResponseButtons } from './components/ResponseButtons';
import { BottomNav } from './components/BottomNav';
import { ObjectionSheet } from './components/ObjectionSheet';
import { BuyingSignalsSheet } from './components/BuyingSignalsSheet';
import { ClosingWorkflowModal } from './components/ClosingWorkflowModal';
import { SessionSummaryModal } from './components/SessionSummaryModal';
import { TrainingModeModal } from './components/TrainingModeModal';
import { AnalyticsView } from './components/AnalyticsView';
import { ScriptEditorModal } from './components/ScriptEditorModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { useSalesStore } from './store/useSalesStore';
import { validateDecisionTree } from './utils/engineValidator';
import { CONVERSATION_NODES } from './data/conversationTree';
import { 
  ArrowLeft, 
  ShieldAlert, 
  Zap, 
  TrendingUp, 
  Info, 
  ThumbsUp, 
  ThumbsDown, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Sparkles 
} from 'lucide-react';

export default function App() {
  const { 
    sunlightMode, 
    currentNodeId, 
    historyStack, 
    goBack,
    setObjectionSheetOpen,
    setBuyingSignalsOpen,
    coachingStats,
    recordRebuttalOutcome,
    customNodes
  } = useSalesStore();

  const [showRatingToggle, setShowRatingToggle] = useState(false);
  const [ratedAdvice, setRatedAdvice] = useState<Record<string, 'up' | 'down'>>({});
  const [justRated, setJustRated] = useState(false);

  // Validate decision tree in development
  useEffect(() => {
    const report = validateDecisionTree();
    if (!report.isValid) {
      console.warn('Decision Tree Validation Warning:', report.brokenLinks);
    } else {
      console.log(`[PitchPilot Engine] Decision tree verified clean: ${report.totalNodes} nodes, ${report.totalObjections} objections.`);
    }
  }, []);

  const allNodes = { ...CONVERSATION_NODES, ...customNodes };
  const currentNode = allNodes[currentNodeId] || CONVERSATION_NODES.node_stage1_opening;

  // Determine active contextual coaching advice
  const activeCoachingEntry = Object.values(coachingStats).find(
    (s) => s.rebuttalId === currentNodeId || currentNode.script?.toLowerCase().includes(s.name.toLowerCase())
  ) || Object.values(coachingStats)[0];

  const activeAdviceId = activeCoachingEntry?.rebuttalId || 'coaching_nudge_core';
  const activeAdviceText = activeCoachingEntry?.keyInsight || currentNode.coachingTip || 'Acknowledge objections first before offering solutions.';
  const currentVote = ratedAdvice[activeAdviceId];
  const activeRate = activeCoachingEntry?.successRate ?? 78;
  const activeUsed = activeCoachingEntry?.timesUsed ?? 1;

  const handleVoteAdvice = (isUpvote: boolean) => {
    recordRebuttalOutcome(activeAdviceId, isUpvote);
    setRatedAdvice(prev => ({ ...prev, [activeAdviceId]: isUpvote ? 'up' : 'down' }));
    setJustRated(true);
    setTimeout(() => setJustRated(false), 2400);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors selection:bg-[#e20074] selection:text-white ${
      sunlightMode 
        ? 'sunlight-mode bg-white text-black' 
        : 'bg-slate-950 text-slate-100'
    }`}>
      {/* Offline Status Pill */}
      <OfflineIndicator />

      {/* Persistent Top Header */}
      <Header />

      {/* Main Responsive Canvas */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-4 pt-3 pb-24 sm:pb-28 flex flex-col gap-4">
        {/* Navigation Breadcrumbs (Undo/Previous step) */}
        {historyStack.length > 0 && (
          <div className="flex items-center justify-between px-1 text-xs">
            <button
              onClick={goBack}
              className={`flex items-center gap-1 font-semibold transition active:scale-95 ${
                sunlightMode ? 'text-black hover:underline' : 'text-slate-400 hover:text-white'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back ({historyStack.length} previous {historyStack.length === 1 ? 'step' : 'steps'})</span>
            </button>

            <span className="text-slate-500 text-[11px]">
              Tap back anytime without losing context
            </span>
          </div>
        )}

        {/* 1. Primary "SAY THIS" Script Card */}
        <ScriptCard />

        {/* Quick Ambient Coaching Ribbon with 'Rate this advice' Toggle */}
        <div className={`rounded-xl border transition-all overflow-hidden ${
          sunlightMode 
            ? 'bg-amber-50 border-black text-black' 
            : 'bg-slate-900/70 border-slate-800 text-slate-300 shadow-sm'
        }`}>
          {/* Main Top Strip */}
          <div className="px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Live Coaching Nudge:
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {activeRate}% Win Rate
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-200 truncate mt-0.5" style={{ color: sunlightMode ? '#000000' : '#ffffff' }}>
                  {activeAdviceText}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {/* 'Rate this advice' Toggle Button */}
              <button
                onClick={() => setShowRatingToggle(!showRatingToggle)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition active:scale-95 ${
                  showRatingToggle || currentVote
                    ? sunlightMode
                      ? 'bg-black text-white'
                      : 'bg-[#e20074] text-white shadow-sm shadow-[#e20074]/30'
                    : sunlightMode
                      ? 'bg-white border border-black text-black hover:bg-slate-200'
                      : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700/60'
                }`}
                title="Rate this advice to tune the coaching engine algorithm"
              >
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Rate advice</span>
                {currentVote && (
                  <span className="text-[10px] font-bold ml-0.5">
                    ({currentVote === 'up' ? '👍' : '👎'})
                  </span>
                )}
                {showRatingToggle ? <ChevronUp className="w-3 h-3 ml-0.5" /> : <ChevronDown className="w-3 h-3 ml-0.5" />}
              </button>

              <span className="text-slate-600 hidden sm:inline">·</span>

              <button
                onClick={() => setObjectionSheetOpen(true)}
                className="text-[11px] font-bold text-amber-400 hover:underline flex items-center gap-0.5"
              >
                <ShieldAlert className="w-3 h-3" />
                <span>Rebuttals</span>
              </button>
              <span className="text-slate-600">·</span>
              <button
                onClick={() => setBuyingSignalsOpen(true)}
                className="text-[11px] font-bold text-[#ff3399] hover:underline flex items-center gap-0.5"
              >
                <Zap className="w-3 h-3" />
                <span>Signals</span>
              </button>
            </div>
          </div>

          {/* Expandable 'Rate this advice' Panel */}
          {showRatingToggle && (
            <div className={`px-3.5 py-2.5 border-t text-xs flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-150 ${
              sunlightMode 
                ? 'bg-slate-100 border-black' 
                : 'bg-slate-950/80 border-slate-800/90'
            }`}>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium text-slate-400">
                  Does this guidance help on this door?
                </span>
                {justRated && (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 animate-in fade-in">
                    <Check className="w-3 h-3" />
                    Algorithm updated!
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleVoteAdvice(true)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition active:scale-95 ${
                    currentVote === 'up'
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30 ring-1 ring-emerald-400'
                      : sunlightMode
                        ? 'bg-white border border-black text-black hover:bg-emerald-50'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80'
                  }`}
                  title="Upvote: Helpful advice (+1 success weight in coaching algorithm)"
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${currentVote === 'up' ? 'text-white' : 'text-emerald-400'}`} />
                  <span>Helpful (+Upvote)</span>
                </button>

                <button
                  onClick={() => handleVoteAdvice(false)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition active:scale-95 ${
                    currentVote === 'down'
                      ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/30 ring-1 ring-rose-400'
                      : sunlightMode
                        ? 'bg-white border border-black text-black hover:bg-rose-50'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80'
                  }`}
                  title="Downvote: Not helpful (-1 success weight in coaching algorithm)"
                >
                  <ThumbsDown className={`w-3.5 h-3.5 ${currentVote === 'down' ? 'text-white' : 'text-rose-400'}`} />
                  <span>Not helpful (-Downvote)</span>
                </button>

                <span className="text-[10px] text-slate-500 tabular-nums hidden xs:inline">
                  ({activeUsed} ratings logged)
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 2. "THEY SAY..." Response Selection Grid */}
        <ResponseButtons />

        {/* Non-intrusive Disclaimer */}
        <footer className="mt-auto pt-6 pb-2 text-center text-[11px] text-slate-500 leading-normal max-w-xl mx-auto space-y-1">
          <div className="flex items-center justify-center gap-1 text-slate-500">
            <Info className="w-3 h-3 shrink-0" />
            <span>Independent rep sales navigation tool. Not officially affiliated with or endorsed by T-Mobile.</span>
          </div>
          <div>All customer data & session history is stored strictly in local device memory.</div>
        </footer>
      </main>

      {/* Persistent Bottom Controls */}
      <BottomNav />

      {/* Modals & Bottom Drawers */}
      <ObjectionSheet />
      <BuyingSignalsSheet />
      <ClosingWorkflowModal />
      <SessionSummaryModal />
      <TrainingModeModal />
      <AnalyticsView />
      <ScriptEditorModal />
    </div>
  );
}
