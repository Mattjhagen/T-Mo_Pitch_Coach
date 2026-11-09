import React, { useState, useEffect } from 'react';
import { 
  X, 
  FileText, 
  CheckCircle2, 
  Copy, 
  Check, 
  Save, 
  RotateCcw, 
  DollarSign, 
  Building2, 
  AlertTriangle, 
  Zap, 
  UserCheck 
} from 'lucide-react';
import { useSalesStore } from '../store/useSalesStore';
import { SessionRecord } from '../types';

export const SessionSummaryModal: React.FC = () => {
  const { 
    isSummaryModalOpen, 
    setSummaryModalOpen, 
    context, 
    terminalOutcome, 
    completeSession, 
    restartSession,
    sunlightMode 
  } = useSalesStore();

  const [provider, setProvider] = useState(context.provider || '');
  const [monthlyBill, setMonthlyBill] = useState(context.monthlyBill || '');
  const [painPoint, setPainPoint] = useState(context.primaryPainPoint || '');
  const [outcome, setOutcome] = useState<SessionRecord['outcome']>(terminalOutcome || 'qualified_lead');
  const [notes, setNotes] = useState(context.notes || '');
  const [copied, setCopied] = useState(false);

  // Sync state when modal opens
  useEffect(() => {
    if (isSummaryModalOpen) {
      setProvider(context.provider || 'Unspecified');
      setMonthlyBill(context.monthlyBill || 'Not shared');
      setPainPoint(context.primaryPainPoint || 'General Inquiry');
      setOutcome(terminalOutcome || 'qualified_lead');
      setNotes(context.notes || '');
    }
  }, [isSummaryModalOpen, context, terminalOutcome]);

  const outcomesList: { id: SessionRecord['outcome']; label: string; color: string }[] = [
    { id: 'sale', label: 'Sale Completed (Scheduled)', color: 'text-emerald-400 border-emerald-500/50 bg-emerald-500/10' },
    { id: 'qualified_lead', label: 'Qualified Lead (Link Sent)', color: 'text-sky-400 border-sky-500/50 bg-sky-500/10' },
    { id: 'follow_up', label: 'Follow-Up Requested (Flyer/Text)', color: 'text-amber-400 border-amber-500/50 bg-amber-500/10' },
    { id: 'not_interested', label: 'Not Interested', color: 'text-rose-400 border-rose-500/50 bg-rose-500/10' },
    { id: 'not_eligible', label: 'Not Eligible (No Drop)', color: 'text-purple-400 border-purple-500/50 bg-purple-500/10' },
    { id: 'no_answer', label: 'No Answer / Quick Brush-Off', color: 'text-slate-400 border-slate-600 bg-slate-800' },
  ];

  const handleCopyForCRM = async () => {
    const summaryText = `[PitchPilot Interaction Summary]
Date/Time: ${new Date().toLocaleString()}
Provider: ${provider}
Current Bill: ${monthlyBill}
Main Pain Point: ${painPoint}
Objections: ${context.objectionsEncountered?.join(', ') || 'None'}
Buying Signals: ${context.buyingSignalsHeard?.join(', ') || 'None'}
Outcome: ${outcome.toUpperCase()}
Rep Notes: ${notes || 'None'}`;

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleSaveAndReset = () => {
    completeSession(outcome, notes);
    restartSession();
  };

  const handleSaveOnly = () => {
    completeSession(outcome, notes);
    setSummaryModalOpen(false);
  };

  if (!isSummaryModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className={`w-full max-w-xl max-h-[92vh] rounded-t-3xl sm:rounded-3xl border flex flex-col overflow-hidden shadow-2xl transition-colors ${
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
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white" style={{ color: sunlightMode ? '#000000' : '#ffffff' }}>
                Conversation Summary
              </h2>
              <p className="text-xs text-slate-400">
                Auto-generated sales recap ready for CRM & local logs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopyForCRM}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition"
              title="Copy formatted CRM summary to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy CRM'}</span>
            </button>

            <button
              onClick={() => setSummaryModalOpen(false)}
              className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Outcome Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Sales Outcome:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {outcomesList.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setOutcome(item.id)}
                  className={`p-2.5 rounded-xl border text-left font-bold transition flex items-center justify-between gap-1.5 ${
                    outcome === item.id
                      ? `${item.color} ring-1`
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  {outcome === item.id && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Key Attributes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Provider */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-400 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-sky-400" />
                Current Provider:
              </label>
              <input
                type="text"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                placeholder="e.g. Cox, Spectrum, Quantum..."
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-[#e20074]"
              />
            </div>

            {/* Monthly Cost */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-400 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                Monthly Bill Stated:
              </label>
              <input
                type="text"
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(e.target.value)}
                placeholder="e.g. $75/mo, >$100..."
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-[#e20074]"
              />
            </div>

            {/* Pain Point */}
            <div className="sm:col-span-2 space-y-1">
              <label className="font-semibold text-slate-400 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                Main Pain Point / Need:
              </label>
              <input
                type="text"
                value={painPoint}
                onChange={(e) => setPainPoint(e.target.value)}
                placeholder="e.g. Rate Creep, Buffering during WFH, Evening slows..."
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-[#e20074]"
              />
            </div>
          </div>

          {/* Objections & Buying Signals Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Objections */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <span className="font-bold text-amber-400 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                <AlertTriangle className="w-3 h-3" />
                Objections Encountered:
              </span>
              <div className="flex flex-wrap gap-1">
                {context.objectionsEncountered && context.objectionsEncountered.length > 0 ? (
                  context.objectionsEncountered.map((obj, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-semibold border border-amber-500/30">
                      {obj}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500 text-[11px]">None recorded</span>
                )}
              </div>
            </div>

            {/* Buying Signals */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <span className="font-bold text-[#ff3399] flex items-center gap-1 text-[11px] uppercase tracking-wider">
                <Zap className="w-3 h-3" />
                Buying Signals Noted:
              </span>
              <div className="flex flex-wrap gap-1">
                {context.buyingSignalsHeard && context.buyingSignalsHeard.length > 0 ? (
                  context.buyingSignalsHeard.map((sig, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-[#e20074]/20 text-pink-300 text-[10px] font-semibold border border-[#e20074]/30">
                      {sig}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500 text-[11px]">None recorded</span>
                )}
              </div>
            </div>
          </div>

          {/* Representative Custom Field Notes */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-purple-400" />
              Rep Field Notes & Follow-Up Details:
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Husband (Dave) works from home on Fridays. Dog barked but friendly. Call back next Tuesday at 5 PM..."
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#e20074] resize-none"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className={`p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0 ${
          sunlightMode ? 'bg-slate-100 border-black' : 'bg-slate-950/80 border-slate-800'
        }`}>
          <button
            onClick={handleSaveOnly}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition"
          >
            <Save className="w-4 h-4" />
            <span>Save to Logs</span>
          </button>

          <button
            onClick={handleSaveAndReset}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#e20074] hover:bg-[#c40064] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#e20074]/30 active:scale-95 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Save & Start Next Door Pitch</span>
          </button>
        </div>
      </div>
    </div>
  );
};
