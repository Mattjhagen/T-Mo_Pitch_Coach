import React from 'react';
import { 
  RotateCcw, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  BarChart3, 
  GraduationCap, 
  Settings2,
  Compass,
  Type
} from 'lucide-react';
import { useSalesStore } from '../store/useSalesStore';
import { CONVERSATION_NODES } from '../data/conversationTree';
import { PWAInstallButton } from './PWAInstallButton';

export const Header: React.FC = () => {
  const { 
    currentNodeId, 
    customNodes,
    sunlightMode, 
    toggleSunlightMode,
    largeTextMode,
    toggleLargeTextMode,
    audioEnabled,
    toggleAudio,
    restartSession,
    setTrainingModalOpen,
    setAnalyticsOpen,
    setScriptEditorOpen,
    sessions,
  } = useSalesStore();

  const allNodes = { ...CONVERSATION_NODES, ...customNodes };
  const currentNode = allNodes[currentNodeId] || CONVERSATION_NODES.node_stage1_opening;
  const stageNumber = currentNode.stageNumber || 1;
  const stageName = currentNode.stageName || 'Opening';

  return (
    <header className={`sticky top-0 z-30 transition-colors border-b ${
      sunlightMode 
        ? 'bg-white border-black text-black' 
        : 'bg-slate-950/95 backdrop-blur-md border-slate-800/80 text-white'
    }`}>
      <div className="max-w-6xl mx-auto px-3 sm:px-4 h-14 flex items-center justify-between gap-2">
        {/* Brand & Stage indicator */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff3399] to-[#e20074] flex items-center justify-center text-white shadow-sm shadow-[#e20074]/30">
              <Compass className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-white hidden xs:inline" style={{ color: sunlightMode ? '#000000' : '#ffffff' }}>
              Pitch<span className="text-[#e20074]">Pilot</span>
            </span>
          </div>

          <div className="h-4 w-[1px] bg-slate-700/60 shrink-0 hidden sm:block" />

          {/* Current Stage Pill */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shrink truncate ${
            sunlightMode
              ? 'bg-black text-white'
              : 'bg-slate-800/80 text-slate-200 border border-slate-700/50'
          }`}>
            <span className="text-[#ff3399] font-bold">Stage {stageNumber}/7</span>
            <span className="text-slate-400">·</span>
            <span className="truncate">{stageName}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <PWAInstallButton />

          {/* Training Mode */}
          <button
            onClick={() => setTrainingModalOpen(true)}
            className={`p-2 rounded-xl transition flex items-center gap-1 text-xs font-medium ${
              sunlightMode
                ? 'hover:bg-slate-100 text-black border border-black'
                : 'hover:bg-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Rep Training Simulator"
          >
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span className="hidden md:inline">Practice</span>
          </button>

          {/* Analytics */}
          <button
            onClick={() => setAnalyticsOpen(true)}
            className={`p-2 rounded-xl transition flex items-center gap-1 text-xs font-medium relative ${
              sunlightMode
                ? 'hover:bg-slate-100 text-black border border-black'
                : 'hover:bg-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Local Session Analytics"
          >
            <BarChart3 className="w-4 h-4 text-blue-400" />
            <span className="hidden md:inline">Stats</span>
            {sessions.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#e20074] text-white text-[10px] font-bold flex items-center justify-center">
                {sessions.length > 99 ? '99+' : sessions.length}
              </span>
            )}
          </button>

          {/* Script & Plans Editor */}
          <button
            onClick={() => setScriptEditorOpen(true)}
            className={`p-2 rounded-xl transition ${
              sunlightMode
                ? 'hover:bg-slate-100 text-black border border-black'
                : 'hover:bg-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Plan & Script Settings"
          >
            <Settings2 className="w-4 h-4 text-purple-400" />
          </button>

          {/* Large Text Size Toggle for outdoor distance reading */}
          <button
            onClick={toggleLargeTextMode}
            className={`p-2 rounded-xl transition ${
              largeTextMode 
                ? 'bg-[#e20074]/20 text-[#ff3399] border border-[#e20074]/40' 
                : sunlightMode 
                  ? 'text-black hover:bg-slate-100' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title={largeTextMode ? 'Large Text: ON' : 'Large Text: OFF'}
          >
            <Type className="w-4 h-4" />
          </button>

          {/* Sunlight Outdoor Mode Toggle */}
          <button
            onClick={toggleSunlightMode}
            className={`p-2 rounded-xl transition ${
              sunlightMode 
                ? 'bg-amber-400 text-black font-bold' 
                : 'text-slate-400 hover:text-amber-300 hover:bg-slate-800'
            }`}
            title={sunlightMode ? 'Sunlight High Contrast: ON' : 'Sunlight Outdoor Mode'}
          >
            {sunlightMode ? <Sun className="w-4 h-4 fill-black" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Audio toggle */}
          <button
            onClick={toggleAudio}
            className={`p-2 rounded-xl transition hidden xs:flex ${
              audioEnabled 
                ? 'text-slate-400 hover:text-white hover:bg-slate-800' 
                : 'text-slate-600 hover:text-slate-400'
            }`}
            title={audioEnabled ? 'Audio Chimes: ON' : 'Audio: MUTED'}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Reset / Restart */}
          <button
            onClick={restartSession}
            className={`p-2 rounded-xl transition flex items-center gap-1 text-xs font-semibold ${
              sunlightMode
                ? 'bg-black text-white hover:bg-slate-800'
                : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700/60'
            }`}
            title="Restart sales conversation"
          >
            <RotateCcw className="w-4 h-4 text-rose-400" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
};
