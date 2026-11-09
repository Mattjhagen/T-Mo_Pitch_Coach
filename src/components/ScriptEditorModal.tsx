import React, { useState } from 'react';
import { 
  X, 
  Settings2, 
  DollarSign, 
  Upload, 
  Download, 
  RotateCcw, 
  Check, 
  Plus, 
  Edit2, 
  Info,
  Sliders
} from 'lucide-react';
import { useSalesStore } from '../store/useSalesStore';
import { PlanConfig } from '../types';

export const ScriptEditorModal: React.FC = () => {
  const { 
    isScriptEditorOpen, 
    setScriptEditorOpen, 
    plans, 
    updatePlan, 
    resetPlansToDefault,
    exportPlaybookJSON,
    importPlaybookJSON,
    sunlightMode 
  } = useSalesStore();

  const [activeTab, setActiveTab] = useState<'plans' | 'import_export'>('plans');
  const [editingPlan, setEditingPlan] = useState<PlanConfig | null>(null);
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSavePlan = () => {
    if (!editingPlan) return;
    updatePlan(editingPlan);
    setEditingPlan(null);
  };

  const handleExport = () => {
    const jsonStr = exportPlaybookJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pitchpilot_playbook_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyJSON = async () => {
    try {
      await navigator.clipboard.writeText(exportPlaybookJSON());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleImport = () => {
    if (!importJsonText.trim()) return;
    const success = importPlaybookJSON(importJsonText);
    if (success) {
      setImportStatus('Playbook imported successfully!');
      setImportJsonText('');
      setTimeout(() => setImportStatus(null), 3000);
    } else {
      setImportStatus('Error: Invalid JSON format');
      setTimeout(() => setImportStatus(null), 3000);
    }
  };

  if (!isScriptEditorOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className={`w-full max-w-3xl h-[88vh] sm:h-[82vh] rounded-t-3xl sm:rounded-3xl border flex flex-col overflow-hidden shadow-2xl transition-colors ${
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
            <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
              <Settings2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2" style={{ color: sunlightMode ? '#000000' : '#ffffff' }}>
                Playbook & Plan Configuration
              </h2>
              <p className="text-xs text-slate-400">
                Customize local fiber tier pricing, promotions, and backup playbook data
              </p>
            </div>
          </div>

          <button
            onClick={() => setScriptEditorOpen(false)}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="px-4 py-2 border-b border-slate-800 flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('plans')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'plans'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Editable Fiber Plans ({plans.length})
          </button>
          <button
            onClick={() => setActiveTab('import_export')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'import_export'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            JSON Import & Export
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {activeTab === 'plans' && (
            <div className="space-y-4">
              {/* Disclaimer Notice */}
              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Notice:</strong> Plan values are illustrative placeholders configured for local market testing. Representatives can update names, speeds, promotional pricing, equipment fees, and terms to match current verified market promotions.
                </p>
              </div>

              {/* Plans List */}
              <div className="grid grid-cols-1 gap-3">
                {plans.map((p) => (
                  <div key={p.id} className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-extrabold text-base text-white">{p.name}</h4>
                        <p className="text-xs text-slate-400">{p.speed}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="text-xl font-black text-emerald-400 tabular-nums">
                          ${p.price}<span className="text-xs text-slate-400">/mo</span>
                        </div>
                        <button
                          onClick={() => setEditingPlan({ ...p })}
                          className="p-2 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-300">
                      <div>
                        <span className="text-slate-500 block text-[10px]">Equipment:</span>
                        <span>{p.equipmentFee}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Install Fee:</span>
                        <span>{p.installationFee}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Contract:</span>
                        <span>{p.contract}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  onClick={resetPlansToDefault}
                  className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Plans to Standard Defaults</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'import_export' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-3">
                <h4 className="text-sm font-bold text-white">Export Sales Playbook</h4>
                <p className="text-xs text-slate-300">
                  Export your customized plan prices, coaching statistics, and custom objection branches as a standalone JSON file for sharing across the sales team.
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExport}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON File</span>
                  </button>

                  <button
                    onClick={handleCopyJSON}
                    className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Sliders className="w-4 h-4" />}
                    <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-3">
                <h4 className="text-sm font-bold text-white">Import Playbook JSON</h4>
                <p className="text-xs text-slate-300">
                  Paste valid PitchPilot playbook JSON to restore or load team playbook templates.
                </p>

                <textarea
                  rows={4}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder="Paste JSON here..."
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white placeholder:text-slate-500 outline-none focus:border-purple-500"
                />

                <div className="flex items-center justify-between">
                  <button
                    onClick={handleImport}
                    disabled={!importJsonText.trim()}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 transition"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Load Playbook</span>
                  </button>

                  {importStatus && (
                    <span className="text-xs font-bold text-emerald-400">
                      {importStatus}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Plan Edit Modal Overlay */}
        {editingPlan && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/75 p-4">
            <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-5 space-y-3 shadow-2xl text-slate-100">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h4 className="font-bold text-sm text-white">Edit Plan Configuration</h4>
                <button onClick={() => setEditingPlan(null)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Plan Title:</label>
                  <input
                    type="text"
                    value={editingPlan.name}
                    onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-400 block mb-1">Price ($/mo):</label>
                    <input
                      type="number"
                      value={editingPlan.price}
                      onChange={(e) => setEditingPlan({ ...editingPlan, price: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Promo Price ($/mo):</label>
                    <input
                      type="number"
                      value={editingPlan.promoPrice || ''}
                      onChange={(e) => setEditingPlan({ ...editingPlan, promoPrice: e.target.value ? Number(e.target.value) : undefined })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Speed Spec:</label>
                  <input
                    type="text"
                    value={editingPlan.speed}
                    onChange={(e) => setEditingPlan({ ...editingPlan, speed: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Equipment Terms:</label>
                  <input
                    type="text"
                    value={editingPlan.equipmentFee}
                    onChange={(e) => setEditingPlan({ ...editingPlan, equipmentFee: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Contract Term:</label>
                  <input
                    type="text"
                    value={editingPlan.contract}
                    onChange={(e) => setEditingPlan({ ...editingPlan, contract: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => setEditingPlan(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePlan}
                  className="px-4 py-1.5 rounded-lg bg-[#e20074] text-white font-bold text-xs"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
