import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  ShieldAlert, 
  TrendingUp, 
  ThumbsUp, 
  ThumbsDown, 
  ArrowRight, 
  CornerDownRight, 
  LogOut, 
  Check, 
  Copy,
  Lightbulb
} from 'lucide-react';
import { useSalesStore } from '../store/useSalesStore';
import { OBJECTIONS_DATA } from '../data/objections';
import { ObjectionItem } from '../types';

export const ObjectionSheet: React.FC = () => {
  const { 
    isObjectionSheetOpen, 
    setObjectionSheetOpen, 
    activeObjectionId,
    jumpToNode, 
    updateContext,
    coachingStats,
    recordRebuttalOutcome,
    sunlightMode 
  } = useSalesStore();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedObjId, setSelectedObjId] = useState<string>(activeObjectionId || OBJECTIONS_DATA[0].id);
  const [copied, setCopied] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState<Record<string, 'up' | 'down'>>({});

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'dismissive', label: 'Dismissive' },
    { id: 'price', label: 'Price' },
    { id: 'switching', label: 'Switching' },
    { id: 'trust', label: 'Trust' },
    { id: 'timing', label: 'Timing' },
    { id: 'technical', label: 'Technical' },
  ];

  const filteredObjections = useMemo(() => {
    return OBJECTIONS_DATA.filter((obj) => {
      const matchesCategory = selectedCategory === 'all' || obj.category === selectedCategory;
      const matchesSearch = 
        obj.title.toLowerCase().includes(search.toLowerCase()) ||
        obj.customerPhrase.toLowerCase().includes(search.toLowerCase()) ||
        obj.repScript.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const currentObjection: ObjectionItem = useMemo(() => {
    const found = OBJECTIONS_DATA.find((o) => o.id === selectedObjId);
    return found || filteredObjections[0] || OBJECTIONS_DATA[0];
  }, [selectedObjId, filteredObjections]);

  const currentCoaching = coachingStats[currentObjection.id];

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleRateRebuttal = (objId: string, success: boolean) => {
    recordRebuttalOutcome(objId, success);
    setFeedbackSent(prev => ({ ...prev, [objId]: success ? 'up' : 'down' }));
  };

  const handleBranchReaction = (reaction: { nextNodeId?: string; suggestedScript: string }) => {
    // Record that this objection was encountered in context
    updateContext({
      objectionsEncountered: [currentObjection.title],
    });

    if (reaction.nextNodeId) {
      jumpToNode(reaction.nextNodeId);
      setObjectionSheetOpen(false);
    }
  };

  if (!isObjectionSheetOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className={`w-full max-w-3xl h-[88vh] sm:h-[82vh] rounded-t-3xl sm:rounded-3xl border flex flex-col overflow-hidden shadow-2xl transition-colors ${
        sunlightMode 
          ? 'bg-white border-black text-black' 
          : 'bg-slate-900 border-slate-700 text-slate-100'
      }`}>
        {/* Mobile Grab Bar */}
        <div className="w-12 h-1.5 bg-slate-600/40 rounded-full mx-auto my-2.5 sm:hidden shrink-0" />

        {/* Modal Header */}
        <div className={`px-4 py-3 border-b flex items-center justify-between shrink-0 ${
          sunlightMode ? 'bg-slate-100 border-black' : 'bg-slate-950/80 border-slate-800'
        }`}>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2" style={{ color: sunlightMode ? '#000000' : '#ffffff' }}>
                Objection Navigator
                {currentCoaching && currentCoaching.isRecommendedTopPick && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Top Performer
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-400">
                Tap customer's objection for natural, non-pushy rebuttals
              </p>
            </div>
          </div>

          <button
            onClick={() => setObjectionSheetOpen(false)}
            className={`p-2 rounded-xl transition ${
              sunlightMode ? 'hover:bg-slate-200 text-black' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & Category Filters */}
        <div className={`p-3 border-b space-y-2.5 shrink-0 ${
          sunlightMode ? 'bg-white border-slate-300' : 'bg-slate-950/40 border-slate-800'
        }`}>
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search objections (e.g. 'too expensive', 'scam', 'busy')..."
              className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm outline-none transition ${
                sunlightMode
                  ? 'bg-slate-100 border border-slate-300 text-black placeholder:text-slate-500 focus:border-black'
                  : 'bg-slate-800/80 border border-slate-700/60 text-white placeholder:text-slate-500 focus:border-[#e20074]'
              }`}
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? sunlightMode
                      ? 'bg-black text-white'
                      : 'bg-amber-500 text-black font-extrabold shadow-sm'
                    : sunlightMode
                      ? 'bg-slate-100 text-black border border-slate-300'
                      : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area: Left Drawer / Top Carousel on Mobile, Right Details */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
          {/* List of Objections */}
          <div className={`md:w-1/3 border-b md:border-b-0 md:border-r overflow-y-auto shrink-0 max-h-[30vh] md:max-h-full ${
            sunlightMode ? 'border-slate-200 bg-slate-50' : 'border-slate-800/80 bg-slate-950/20'
          }`}>
            <div className="p-2 space-y-1">
              {filteredObjections.map((obj) => {
                const isSelected = obj.id === currentObjection.id;
                const stats = coachingStats[obj.id];

                return (
                  <button
                    key={obj.id}
                    onClick={() => setSelectedObjId(obj.id)}
                    className={`w-full p-2.5 rounded-xl text-left transition flex items-center justify-between gap-2 text-xs font-semibold ${
                      isSelected
                        ? sunlightMode
                          ? 'bg-black text-white font-bold'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : sunlightMode
                          ? 'hover:bg-slate-200 text-black'
                          : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="truncate min-w-0">
                      <div className="truncate">{obj.title}</div>
                      <div className="text-[10px] opacity-70 truncate mt-0.5">
                        “{obj.customerPhrase}”
                      </div>
                    </div>
                    {stats && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/30 shrink-0 text-emerald-400">
                        {stats.successRate}%
                      </span>
                    )}
                  </button>
                );
              })}

              {filteredObjections.length === 0 && (
                <div className="p-6 text-center text-xs text-slate-500">
                  No matching objections found
                </div>
              )}
            </div>
          </div>

          {/* Right Details Panel: Script, Psychology, Reactions & Exit */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {/* Customer Phrase Header */}
            <div className={`p-3.5 rounded-xl border ${
              sunlightMode ? 'bg-amber-50 border-black' : 'bg-amber-950/20 border-amber-700/40'
            }`}>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-500">
                Homeowner Says:
              </span>
              <div className="text-base sm:text-lg font-extrabold mt-0.5 text-white" style={{ color: sunlightMode ? '#000000' : '#ffffff' }}>
                “{currentObjection.customerPhrase}”
              </div>
            </div>

            {/* Rep Script Card */}
            <div className={`p-4 rounded-2xl border space-y-3 ${
              sunlightMode 
                ? 'bg-white border-2 border-black shadow-[0_2px_0_0_#000]' 
                : 'bg-slate-800/70 border-slate-700'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#ff3399]">
                  Rep Rebuttal Script:
                </span>
                <button
                  onClick={() => handleCopy(currentObjection.repScript)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                    copied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-700/50 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              <p className={`text-base sm:text-lg font-bold leading-relaxed ${
                sunlightMode ? 'text-black' : 'text-slate-100'
              }`}>
                “{currentObjection.repScript}”
              </p>

              {currentObjection.followUpQuestion && (
                <div className="pt-2 border-t border-slate-700/40">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Follow-Up Question:
                  </span>
                  <p className="text-sm font-semibold text-emerald-400 mt-0.5">
                    “{currentObjection.followUpQuestion}”
                  </p>
                </div>
              )}
            </div>

            {/* Coaching Engine Card */}
            <div className={`p-3.5 rounded-xl border space-y-2 ${
              sunlightMode ? 'bg-slate-100 border-slate-300' : 'bg-slate-950/60 border-slate-800'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                  <Lightbulb className="w-4 h-4" />
                  <span>Why This Works & Coaching Psychology</span>
                </div>
                {currentCoaching && (
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{currentCoaching.successRate}% Success Rate</span>
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentObjection.whyThisWorks}
              </p>

              {/* Real-time rep feedback rating */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Did this rebuttal work at the door?</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleRateRebuttal(currentObjection.id, true)}
                    className={`px-2.5 py-1 rounded-lg flex items-center gap-1 text-xs font-semibold transition ${
                      feedbackSent[currentObjection.id] === 'up'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3 text-emerald-400" />
                    Worked
                  </button>
                  <button
                    onClick={() => handleRateRebuttal(currentObjection.id, false)}
                    className={`px-2.5 py-1 rounded-lg flex items-center gap-1 text-xs font-semibold transition ${
                      feedbackSent[currentObjection.id] === 'down'
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    <ThumbsDown className="w-3 h-3 text-rose-400" />
                    Didn't
                  </button>
                </div>
              </div>
            </div>

            {/* Possible Customer Reactions & Branching Next Steps */}
            <div className="space-y-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <CornerDownRight className="w-3.5 h-3.5 text-slate-500" />
                Customer Reactions (Tap to branch conversation):
              </span>

              <div className="space-y-2">
                {currentObjection.reactions.map((react, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleBranchReaction(react)}
                    className={`w-full p-3 rounded-xl border text-left flex items-start justify-between gap-3 transition-all hover:translate-x-0.5 active:scale-[0.99] ${
                      sunlightMode
                        ? 'bg-white border-black text-black hover:bg-slate-100'
                        : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-100'
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="text-xs sm:text-sm font-bold text-sky-400 flex items-center gap-1.5">
                        <ArrowRight className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>{react.reaction}</span>
                      </div>
                      <p className="text-xs text-slate-300 pl-5 leading-normal">
                        Say: “{react.suggestedScript}”
                      </p>
                    </div>
                    <div className="p-1 rounded-lg bg-sky-500/10 text-sky-400 shrink-0 mt-1">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Respectful Exit Option */}
            <div className={`p-3 rounded-xl border flex items-center justify-between gap-2 ${
              sunlightMode ? 'bg-slate-100 border-slate-300 text-black' : 'bg-slate-950/40 border-slate-800 text-slate-300'
            }`}>
              <div className="flex items-center gap-2 min-w-0">
                <LogOut className="w-4 h-4 text-slate-400 shrink-0" />
                <div className="text-xs truncate">
                  <span className="font-semibold text-slate-400">Respectful Exit: </span>
                  <span>“{currentObjection.respectfulExit}”</span>
                </div>
              </div>
              <button
                onClick={() => {
                  jumpToNode('node_terminal_satisfied_customer');
                  setObjectionSheetOpen(false);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 shrink-0"
              >
                Exit Gracefully
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
