import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  GraduationCap, 
  Trophy, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  RotateCcw,
  User,
  ShieldCheck
} from 'lucide-react';
import { useSalesStore } from '../store/useSalesStore';
import { TRAINING_SCENARIOS } from '../data/trainingScenarios';
import { ETHICAL_SALES_PRINCIPLES } from '../data/coachingData';

export const TrainingModeModal: React.FC = () => {
  const { 
    isTrainingModalOpen, 
    setTrainingModalOpen,
    recordRebuttalOutcome,
    sunlightMode 
  } = useSalesStore();

  const [activeScenarioId, setActiveScenarioId] = useState<string>(TRAINING_SCENARIOS[0].id);
  const [currentTurnIndex, setCurrentTurnIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [scenarioScore, setScenarioScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const scenario = TRAINING_SCENARIOS.find(s => s.id === activeScenarioId) || TRAINING_SCENARIOS[0];
  const turn = scenario.turns[currentTurnIndex] || scenario.turns[0];

  const handleSelectOption = (option: typeof turn.options[0]) => {
    setSelectedOptionId(option.id);
    setScenarioScore(prev => prev + option.score);

    // If it was the best option, trigger subtle celebration and train engine
    if (option.isBest) {
      recordRebuttalOutcome(`training_${scenario.id}`, true);
      if (currentTurnIndex + 1 >= scenario.turns.length) {
        try {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
        } catch {}
      }
    }
  };

  const handleNextTurn = () => {
    if (currentTurnIndex + 1 < scenario.turns.length) {
      setCurrentTurnIndex(currentTurnIndex + 1);
      setSelectedOptionId(null);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestartScenario = () => {
    setCurrentTurnIndex(0);
    setSelectedOptionId(null);
    setScenarioScore(0);
    setIsCompleted(false);
  };

  const handleChangeScenario = (id: string) => {
    setActiveScenarioId(id);
    setCurrentTurnIndex(0);
    setSelectedOptionId(null);
    setScenarioScore(0);
    setIsCompleted(false);
  };

  if (!isTrainingModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className={`w-full max-w-3xl h-[90vh] sm:h-[84vh] rounded-t-3xl sm:rounded-3xl border flex flex-col overflow-hidden shadow-2xl transition-colors ${
        sunlightMode 
          ? 'bg-white border-black text-black' 
          : 'bg-slate-900 border-slate-700 text-slate-100'
      }`}>
        {/* Grab bar */}
        <div className="w-12 h-1.5 bg-slate-600/40 rounded-full mx-auto my-2.5 sm:hidden shrink-0" />

        {/* Header */}
        <div className={`px-4 py-3 border-b flex items-center justify-between shrink-0 ${
          sunlightMode ? 'bg-slate-100 border-black' : 'bg-slate-950/80 border-slate-800'
        }`}>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2" style={{ color: sunlightMode ? '#000000' : '#ffffff' }}>
                Rep Training Simulator
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                  AI Coaching Active
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Practice handling real homeowner scenarios with automated coaching feedback
              </p>
            </div>
          </div>

          <button
            onClick={() => setTrainingModalOpen(false)}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scenario Carousel Selector */}
        <div className={`p-3 border-b overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0 ${
          sunlightMode ? 'bg-slate-50 border-slate-300' : 'bg-slate-950/40 border-slate-800'
        }`}>
          {TRAINING_SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => handleChangeScenario(s.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                s.id === scenario.id
                  ? 'bg-emerald-600 text-white font-bold shadow-sm'
                  : 'bg-slate-800/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Persona Card */}
          <div className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800 flex items-start justify-between gap-3 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-300 font-bold">
                <User className="w-3.5 h-3.5 text-sky-400" />
                <span>Persona: {scenario.homeownerPersona}</span>
              </div>
              <div className="text-slate-400">
                <strong>Current:</strong> {scenario.currentProvider} · {scenario.situation}
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] uppercase font-bold text-slate-500">Score</span>
              <div className="text-lg font-black text-emerald-400 tabular-nums">
                {scenarioScore} pts
              </div>
            </div>
          </div>

          {!isCompleted ? (
            <div className="space-y-4">
              {/* Homeowner Speech Bubble */}
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  Homeowner Says (Turn {currentTurnIndex + 1}/{scenario.turns.length}):
                </span>
                <p className="text-base sm:text-lg font-extrabold text-white leading-normal">
                  “{turn.homeownerSays}”
                </p>
              </div>

              {/* Rep Multiple Choice Options */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Select your response:
                </span>

                <div className="space-y-2.5">
                  {turn.options.map((opt) => {
                    const isSelected = selectedOptionId === opt.id;
                    const hasSelected = selectedOptionId !== null;

                    let cardClass = 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 text-slate-200';
                    if (hasSelected) {
                      if (opt.isBest) {
                        cardClass = 'bg-emerald-950/40 border-emerald-500 text-emerald-100 ring-1 ring-emerald-500/50';
                      } else if (isSelected) {
                        cardClass = 'bg-rose-950/40 border-rose-500 text-rose-100 ring-1 ring-rose-500/50';
                      } else {
                        cardClass = 'opacity-50 bg-slate-900 border-slate-800 text-slate-400';
                      }
                    }

                    return (
                      <button
                        key={opt.id}
                        disabled={hasSelected}
                        onClick={() => handleSelectOption(opt)}
                        className={`w-full p-4 rounded-2xl border text-left transition-all ${cardClass}`}
                      >
                        <p className="text-sm sm:text-base font-semibold leading-relaxed">
                          “{opt.repSpeech}”
                        </p>

                        {/* Coaching feedback on selection */}
                        {hasSelected && (isSelected || opt.isBest) && (
                          <div className={`mt-3 pt-3 border-t text-xs leading-relaxed ${
                            opt.isBest ? 'border-emerald-500/30 text-emerald-300' : 'border-rose-500/30 text-rose-300'
                          }`}>
                            <div className="flex items-center gap-1.5 font-bold mb-1">
                              {opt.isBest ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <AlertCircle className="w-3.5 h-3.5 text-rose-400" />}
                              <span>{opt.isBest ? `Recommended Strategy (+${opt.score} pts)` : 'Why this underperforms:'}</span>
                            </div>
                            <p>{opt.feedback}</p>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Scenario Completed Card */
            <div className="p-6 rounded-3xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-white">
                Scenario Completed!
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                You scored <strong className="text-emerald-400">{scenarioScore} points</strong> on this scenario. Practicing consultative, empathy-first responses builds natural muscle memory for the field.
              </p>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-left space-y-2 text-xs">
                <span className="font-bold text-amber-400 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  Key Takeaway:
                </span>
                <p className="text-slate-300">
                  {ETHICAL_SALES_PRINCIPLES[0].description} Never criticize their current provider; praise what works and show where fiber excels.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleRestartScenario}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retry Scenario
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className={`p-4 border-t flex items-center justify-between shrink-0 ${
          sunlightMode ? 'bg-slate-100 border-black' : 'bg-slate-950/80 border-slate-800'
        }`}>
          <button
            onClick={handleRestartScenario}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Scenario</span>
          </button>

          {!isCompleted && selectedOptionId && (
            <button
              onClick={handleNextTurn}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-emerald-600/30 transition"
            >
              <span>{currentTurnIndex + 1 < scenario.turns.length ? 'Next Interaction' : 'Finish Scenario'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
