import React, { useState } from 'react';
import { 
  X, 
  BarChart3, 
  TrendingUp, 
  Trophy, 
  Download, 
  Trash2, 
  FileSpreadsheet, 
  Edit3, 
  Check, 
  ShieldCheck,
  Calendar,
  DollarSign,
  AlertTriangle
} from 'lucide-react';
import { useSalesStore } from '../store/useSalesStore';

export const AnalyticsView: React.FC = () => {
  const { 
    isAnalyticsOpen, 
    setAnalyticsOpen, 
    sessions, 
    coachingStats, 
    updateSessionNotes, 
    deleteSession, 
    clearAllSessions,
    sunlightMode 
  } = useSalesStore();

  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState('');

  const totalConversations = sessions.length;
  const totalSales = sessions.filter(s => s.outcome === 'sale').length;
  const totalQualified = sessions.filter(s => s.outcome === 'qualified_lead').length;
  const totalFollowUps = sessions.filter(s => s.outcome === 'follow_up').length;
  const conversionRate = totalConversations > 0 ? Math.round((totalSales / totalConversations) * 100) : 0;

  // Compute most frequent objections
  const objectionCounts: Record<string, number> = {};
  sessions.forEach(s => {
    (s.objections || []).forEach(obj => {
      objectionCounts[obj] = (objectionCounts[obj] || 0) + 1;
    });
  });
  const sortedObjections = Object.entries(objectionCounts).sort((a, b) => b[1] - a[1]);

  // Export CSV
  const handleExportCSV = () => {
    if (sessions.length === 0) return;
    const headers = ['Session ID', 'Date', 'Duration (s)', 'Provider', 'Monthly Bill', 'Pain Point', 'Objections', 'Buying Signals', 'Outcome', 'Notes'];
    const rows = sessions.map(s => [
      s.id,
      new Date(s.timestamp).toLocaleString(),
      s.durationSeconds,
      `"${s.provider}"`,
      `"${s.monthlyBill}"`,
      `"${s.painPoint}"`,
      `"${(s.objections || []).join('; ')}"`,
      `"${(s.buyingSignals || []).join('; ')}"`,
      s.outcome,
      `"${(s.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pitchpilot_sessions_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleStartEditNote = (id: string, currentNotes: string) => {
    setEditingNoteId(id);
    setTempNote(currentNotes || '');
  };

  const handleSaveNote = (id: string) => {
    updateSessionNotes(id, tempNote);
    setEditingNoteId(null);
  };

  if (!isAnalyticsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className={`w-full max-w-4xl h-[92vh] sm:h-[86vh] rounded-t-3xl sm:rounded-3xl border flex flex-col overflow-hidden shadow-2xl transition-colors ${
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
            <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2" style={{ color: sunlightMode ? '#000000' : '#ffffff' }}>
                Field Analytics & Performance
              </h2>
              <p className="text-xs text-slate-400">
                Local door-to-door conversion metrics & coaching engine strategy insights
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              disabled={sessions.length === 0}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
              title="Export session records to CSV for CRM import"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => setAnalyticsOpen(false)}
              className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Top KPI Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Pitches Recorded
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white mt-1 tabular-nums">
                {totalConversations}
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 block">Stored locally</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                Sales Closed
              </span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-300 mt-1 tabular-nums">
                {totalSales}
              </div>
              <span className="text-[10px] text-emerald-400/70 mt-0.5 block">Scheduled installs</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#e20074]/15 border border-[#e20074]/40">
              <span className="text-[11px] font-bold text-[#ff3399] uppercase tracking-wider block">
                Conversion Rate
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white mt-1 tabular-nums">
                {conversionRate}%
              </div>
              <span className="text-[10px] text-pink-300/70 mt-0.5 block">Closed vs pitched</span>
            </div>

            <div className="p-4 rounded-2xl bg-sky-950/30 border border-sky-500/40">
              <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block">
                Qualified / Follow-Up
              </span>
              <div className="text-2xl sm:text-3xl font-black text-sky-300 mt-1 tabular-nums">
                {totalQualified + totalFollowUps}
              </div>
              <span className="text-[10px] text-sky-400/70 mt-0.5 block">Active pipelines</span>
            </div>
          </div>

          {/* Coaching Engine Strategy Insights */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">
                  Coaching Engine: Highest Converting Field Strategies
                </h3>
              </div>
              <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Ethical & Non-Aggressive Focus
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {Object.values(coachingStats).slice(0, 4).map((stat) => (
                <div key={stat.rebuttalId} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200 truncate">{stat.name}</span>
                    <span className="font-black text-emerald-400 tabular-nums px-2 py-0.5 rounded bg-emerald-500/10">
                      {stat.successRate}% Win
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    {stat.keyInsight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Frequent Objections Breakdown */}
          {sortedObjections.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/80 space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                Top Objections Encountered on Doors:
              </span>
              <div className="flex flex-wrap gap-2">
                {sortedObjections.map(([name, count]) => (
                  <div key={name} className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs flex items-center gap-2">
                    <span className="font-semibold text-slate-200">{name}</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px]">
                      {count}x
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Session Log Records */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-300">
                Recent Interactions ({sessions.length})
              </h3>

              {sessions.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete all local session history?')) {
                      clearAllSessions();
                    }
                  }}
                  className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear History</span>
                </button>
              )}
            </div>

            {sessions.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500 bg-slate-950/40 rounded-2xl border border-slate-800">
                No recorded sales interactions yet. Start a pitch and complete a conversation to view detailed analytics.
              </div>
            ) : (
              <div className="space-y-2.5">
                {sessions.map((s) => (
                  <div key={s.id} className="p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700/80 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          s.outcome === 'sale'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : s.outcome === 'qualified_lead'
                              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                              : s.outcome === 'follow_up'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-slate-700 text-slate-300'
                        }`}>
                          {s.outcome.replace('_', ' ')}
                        </span>
                        <span className="text-slate-400">
                          {new Date(s.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <button
                        onClick={() => deleteSession(s.id)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                        title="Delete log"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-300">
                      <div>
                        <span className="text-slate-500 block text-[10px]">Provider:</span>
                        <span className="font-semibold">{s.provider}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Stated Bill:</span>
                        <span className="font-semibold text-emerald-400">{s.monthlyBill}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Pain Point:</span>
                        <span className="font-semibold">{s.painPoint}</span>
                      </div>
                    </div>

                    {/* Notes field */}
                    <div className="pt-2 border-t border-slate-700/50">
                      {editingNoteId === s.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={tempNote}
                            onChange={(e) => setTempNote(e.target.value)}
                            placeholder="Add notes..."
                            className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:border-[#e20074]"
                          />
                          <button
                            onClick={() => handleSaveNote(s.id)}
                            className="p-1.5 rounded-lg bg-emerald-600 text-white"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between text-slate-400 text-[11px]">
                          <span>
                            <strong>Rep Notes:</strong> {s.notes || 'None added'}
                          </span>
                          <button
                            onClick={() => handleStartEditNote(s.id, s.notes || '')}
                            className="text-slate-500 hover:text-white p-0.5"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
