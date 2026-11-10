import { create } from 'zustand';
import { CustomerContext, ConversationNode, PlanConfig, SessionRecord } from '../types';
import { CONVERSATION_NODES } from '../data/conversationTree';
import { DEFAULT_PLANS } from '../data/plans';
import { OPENING_STYLES } from '../data/openingStyles';
import { INITIAL_COACHING_STATS, RebuttalStat } from '../data/coachingData';
import { feedback } from '../utils/feedback';

interface BreadcrumbStep {
  nodeId: string;
  contextSnapshot: CustomerContext;
  timestamp: number;
}

interface SalesState {
  // Navigation & Session State
  currentNodeId: string;
  historyStack: BreadcrumbStep[];
  context: CustomerContext;
  sessionStartTime: number;
  terminalOutcome: SessionRecord['outcome'] | null;
  activeOpeningStyleId: string;
  
  // UI Preferences
  sunlightMode: boolean;
  largeTextMode: boolean;
  audioEnabled: boolean;
  
  // Modal / Drawer visibility
  isObjectionSheetOpen: boolean;
  isBuyingSignalsOpen: boolean;
  isClosingModalOpen: boolean;
  isSummaryModalOpen: boolean;
  isTrainingModalOpen: boolean;
  isAnalyticsOpen: boolean;
  isScriptEditorOpen: boolean;
  activeObjectionId: string | null;

  // Editable configurations & persistent data
  plans: PlanConfig[];
  customNodes: Record<string, ConversationNode>;
  coachingStats: Record<string, RebuttalStat>;
  sessions: SessionRecord[];

  // Actions
  selectResponse: (nextNodeId: string, contextPatch?: Partial<CustomerContext>) => void;
  goBack: () => void;
  restartSession: () => void;
  jumpToNode: (nodeId: string) => void;
  updateContext: (patch: Partial<CustomerContext>) => void;
  setOpeningStyle: (styleId: string) => void;
  
  // Modals
  setObjectionSheetOpen: (open: boolean, objectionId?: string | null) => void;
  setBuyingSignalsOpen: (open: boolean) => void;
  setClosingModalOpen: (open: boolean) => void;
  setSummaryModalOpen: (open: boolean) => void;
  setTrainingModalOpen: (open: boolean) => void;
  setAnalyticsOpen: (open: boolean) => void;
  setScriptEditorOpen: (open: boolean) => void;
  
  // Toggles
  toggleSunlightMode: () => void;
  toggleLargeTextMode: () => void;
  toggleAudio: () => void;

  // Session Logging & Analytics
  completeSession: (outcome: SessionRecord['outcome'], customNotes?: string) => void;
  updateSessionNotes: (sessionId: string, notes: string) => void;
  deleteSession: (sessionId: string) => void;
  clearAllSessions: () => void;
  
  // Coaching Engine Actions
  recordRebuttalOutcome: (rebuttalId: string, wasSuccessful: boolean) => void;
  
  // Plans & Playbook Editing
  updatePlan: (updatedPlan: PlanConfig) => void;
  resetPlansToDefault: () => void;
  saveCustomNode: (node: ConversationNode) => void;
  importPlaybookJSON: (jsonString: string) => boolean;
  exportPlaybookJSON: () => string;
}

const STORAGE_KEYS = {
  SESSIONS: 'pitchpilot_sessions_v1',
  PLANS: 'pitchpilot_plans_v1',
  PLANS_VERSION: 'pitchpilot_plans_version',
  COACHING: 'pitchpilot_coaching_v1',
  PREFS: 'pitchpilot_prefs_v1',
  CUSTOM_NODES: 'pitchpilot_custom_nodes_v1',
};

function loadStored<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveStored<T>(key: string, data: T) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {}
}

const initialContext: CustomerContext = {
  provider: undefined,
  monthlyBill: undefined,
  satisfaction: undefined,
  primaryPainPoint: undefined,
  householdNeeds: [],
  objectionsEncountered: [],
  buyingSignalsHeard: [],
  selectedPlanId: 'plan_fiber_1000',
  notes: '',
};

export const useSalesStore = create<SalesState>((set, get) => {
  const storedSessions = loadStored<SessionRecord[]>(STORAGE_KEYS.SESSIONS, []);
  // Refresh legacy plan settings once when the official sales-card lineup changes.
  // This touches only plan settings; coaching, sessions, and custom scripts remain intact.
  const planVersion = '2026-11-10-four-tiers';
  const savedVersion = loadStored<string>(STORAGE_KEYS.PLANS_VERSION, '');
  const storedPlans = savedVersion === planVersion
    ? loadStored<PlanConfig[]>(STORAGE_KEYS.PLANS, DEFAULT_PLANS)
    : DEFAULT_PLANS;
  if (savedVersion !== planVersion) {
    saveStored(STORAGE_KEYS.PLANS, DEFAULT_PLANS);
    saveStored(STORAGE_KEYS.PLANS_VERSION, planVersion);
  }
  const storedCoaching = loadStored<Record<string, RebuttalStat>>(STORAGE_KEYS.COACHING, INITIAL_COACHING_STATS);
  const storedCustomNodes = loadStored<Record<string, ConversationNode>>(STORAGE_KEYS.CUSTOM_NODES, {});
  const storedPrefs = loadStored<{ sunlightMode?: boolean; largeTextMode?: boolean; audioEnabled?: boolean }>(
    STORAGE_KEYS.PREFS,
    { sunlightMode: false, largeTextMode: false, audioEnabled: true }
  );

  return {
    currentNodeId: 'node_stage1_opening',
    historyStack: [],
    context: initialContext,
    sessionStartTime: Date.now(),
    terminalOutcome: null,
    activeOpeningStyleId: 'friendly',

    sunlightMode: storedPrefs.sunlightMode ?? false,
    largeTextMode: storedPrefs.largeTextMode ?? false,
    audioEnabled: storedPrefs.audioEnabled ?? true,

    isObjectionSheetOpen: false,
    isBuyingSignalsOpen: false,
    isClosingModalOpen: false,
    isSummaryModalOpen: false,
    isTrainingModalOpen: false,
    isAnalyticsOpen: false,
    isScriptEditorOpen: false,
    activeObjectionId: null,

    plans: storedPlans,
    customNodes: storedCustomNodes,
    coachingStats: storedCoaching,
    sessions: storedSessions,

    selectResponse: (nextNodeId: string, contextPatch?: Partial<CustomerContext>) => {
      const state = get();
      feedback.playTap();

      const newContext: CustomerContext = {
        ...state.context,
        ...(contextPatch || {}),
        householdNeeds: [
          ...(state.context.householdNeeds || []),
          ...((contextPatch && contextPatch.householdNeeds) || []),
        ],
      };

      const newHistory: BreadcrumbStep[] = [
        ...state.historyStack,
        {
          nodeId: state.currentNodeId,
          contextSnapshot: { ...state.context },
          timestamp: Date.now(),
        },
      ];

      // Check if target node is terminal
      const allNodes = { ...CONVERSATION_NODES, ...state.customNodes };
      const targetNode = allNodes[nextNodeId];

      if (targetNode?.isTerminal && targetNode.terminalType) {
        if (targetNode.terminalType === 'sale') {
          feedback.playVictory();
        } else {
          feedback.playPositive();
        }
        set({
          currentNodeId: nextNodeId,
          historyStack: newHistory,
          context: newContext,
          terminalOutcome: targetNode.terminalType,
          isSummaryModalOpen: true, // Automatically open conversation summary!
        });
      } else {
        set({
          currentNodeId: nextNodeId,
          historyStack: newHistory,
          context: newContext,
        });
      }
    },

    goBack: () => {
      const state = get();
      if (state.historyStack.length === 0) return;
      feedback.playTap();
      const lastStep = state.historyStack[state.historyStack.length - 1];
      const newStack = state.historyStack.slice(0, -1);

      set({
        currentNodeId: lastStep.nodeId,
        historyStack: newStack,
        context: lastStep.contextSnapshot,
        terminalOutcome: null,
      });
    },

    restartSession: () => {
      feedback.playTap();
      set({
        currentNodeId: 'node_stage1_opening',
        historyStack: [],
        context: { ...initialContext },
        sessionStartTime: Date.now(),
        terminalOutcome: null,
        isSummaryModalOpen: false,
        isClosingModalOpen: false,
        isObjectionSheetOpen: false,
        isBuyingSignalsOpen: false,
      });
    },

    jumpToNode: (nodeId: string) => {
      const state = get();
      const newHistory: BreadcrumbStep[] = [
        ...state.historyStack,
        {
          nodeId: state.currentNodeId,
          contextSnapshot: { ...state.context },
          timestamp: Date.now(),
        },
      ];
      set({
        currentNodeId: nodeId,
        historyStack: newHistory,
        isObjectionSheetOpen: false,
        isBuyingSignalsOpen: false,
      });
    },

    updateContext: (patch: Partial<CustomerContext>) => {
      set((state) => ({
        context: { ...state.context, ...patch },
      }));
    },

    setOpeningStyle: (styleId: string) => {
      feedback.playTap();
      set({ activeOpeningStyleId: styleId });
    },

    setObjectionSheetOpen: (open: boolean, objectionId: string | null = null) => {
      feedback.playTap();
      set({ isObjectionSheetOpen: open, activeObjectionId: objectionId });
    },

    setBuyingSignalsOpen: (open: boolean) => {
      feedback.playTap();
      set({ isBuyingSignalsOpen: open });
    },

    setClosingModalOpen: (open: boolean) => {
      feedback.playTap();
      set({ isClosingModalOpen: open });
    },

    setSummaryModalOpen: (open: boolean) => {
      feedback.playTap();
      set({ isSummaryModalOpen: open });
    },

    setTrainingModalOpen: (open: boolean) => {
      feedback.playTap();
      set({ isTrainingModalOpen: open });
    },

    setAnalyticsOpen: (open: boolean) => {
      feedback.playTap();
      set({ isAnalyticsOpen: open });
    },

    setScriptEditorOpen: (open: boolean) => {
      feedback.playTap();
      set({ isScriptEditorOpen: open });
    },

    toggleSunlightMode: () => {
      const current = get().sunlightMode;
      const next = !current;
      set({ sunlightMode: next });
      saveStored(STORAGE_KEYS.PREFS, {
        sunlightMode: next,
        largeTextMode: get().largeTextMode,
        audioEnabled: get().audioEnabled,
      });
    },

    toggleLargeTextMode: () => {
      const current = get().largeTextMode;
      const next = !current;
      set({ largeTextMode: next });
      saveStored(STORAGE_KEYS.PREFS, {
        sunlightMode: get().sunlightMode,
        largeTextMode: next,
        audioEnabled: get().audioEnabled,
      });
    },

    toggleAudio: () => {
      const current = get().audioEnabled;
      const next = !current;
      feedback.setEnabled(next);
      set({ audioEnabled: next });
      saveStored(STORAGE_KEYS.PREFS, {
        sunlightMode: get().sunlightMode,
        largeTextMode: get().largeTextMode,
        audioEnabled: next,
      });
    },

    completeSession: (outcome: SessionRecord['outcome'], customNotes?: string) => {
      const state = get();
      const durationSeconds = Math.max(10, Math.round((Date.now() - state.sessionStartTime) / 1000));
      
      const newRecord: SessionRecord = {
        id: `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        timestamp: Date.now(),
        durationSeconds,
        provider: state.context.provider || 'Unspecified',
        monthlyBill: state.context.monthlyBill || 'Unspecified',
        satisfaction: state.context.satisfaction || 'Unspecified',
        painPoint: state.context.primaryPainPoint || 'General Inquiry',
        objections: state.context.objectionsEncountered || [],
        buyingSignals: state.context.buyingSignalsHeard || [],
        outcome,
        notes: customNotes ?? state.context.notes ?? '',
      };

      const updatedSessions = [newRecord, ...state.sessions];
      saveStored(STORAGE_KEYS.SESSIONS, updatedSessions);

      // If outcome was a sale, boost any recorded objections
      if (outcome === 'sale') {
        const coaching = { ...state.coachingStats };
        (state.context.objectionsEncountered || []).forEach((objId) => {
          if (coaching[objId]) {
            const item = coaching[objId];
            const newTimesUsed = item.timesUsed + 1;
            const newConversions = item.conversionCount + 1;
            const newRate = Math.round((newConversions / newTimesUsed) * 100);
            coaching[objId] = {
              ...item,
              timesUsed: newTimesUsed,
              conversionCount: newConversions,
              successRate: newRate,
            };
          }
        });
        saveStored(STORAGE_KEYS.COACHING, coaching);
        set({ coachingStats: coaching });
      }

      set({
        sessions: updatedSessions,
        terminalOutcome: outcome,
        isSummaryModalOpen: false,
      });
    },

    updateSessionNotes: (sessionId: string, notes: string) => {
      const state = get();
      const updated = state.sessions.map((s) => (s.id === sessionId ? { ...s, notes } : s));
      saveStored(STORAGE_KEYS.SESSIONS, updated);
      set({ sessions: updated });
    },

    deleteSession: (sessionId: string) => {
      const state = get();
      const updated = state.sessions.filter((s) => s.id !== sessionId);
      saveStored(STORAGE_KEYS.SESSIONS, updated);
      set({ sessions: updated });
    },

    clearAllSessions: () => {
      saveStored(STORAGE_KEYS.SESSIONS, []);
      set({ sessions: [] });
    },

    recordRebuttalOutcome: (rebuttalId: string, wasSuccessful: boolean) => {
      const state = get();
      const currentStats = { ...state.coachingStats };
      const existing = currentStats[rebuttalId] || {
        rebuttalId,
        name: 'Custom Rebuttal',
        category: 'Field',
        approachStyle: 'consultative' as const,
        successRate: 50,
        timesUsed: 0,
        conversionCount: 0,
        ethicsRating: 'High - Consultative' as const,
        keyInsight: 'Live field insight',
      };

      const newTimesUsed = existing.timesUsed + 1;
      const newConversions = wasSuccessful ? existing.conversionCount + 1 : existing.conversionCount;
      const newRate = Math.round((newConversions / newTimesUsed) * 100);

      currentStats[rebuttalId] = {
        ...existing,
        timesUsed: newTimesUsed,
        conversionCount: newConversions,
        successRate: newRate,
      };

      saveStored(STORAGE_KEYS.COACHING, currentStats);
      set({ coachingStats: currentStats });
    },

    updatePlan: (updatedPlan: PlanConfig) => {
      const state = get();
      const updated = state.plans.map((p) => (p.id === updatedPlan.id ? updatedPlan : p));
      saveStored(STORAGE_KEYS.PLANS, updated);
      set({ plans: updated });
    },

    resetPlansToDefault: () => {
      saveStored(STORAGE_KEYS.PLANS, DEFAULT_PLANS);
      set({ plans: DEFAULT_PLANS });
    },

    saveCustomNode: (node: ConversationNode) => {
      const state = get();
      const updated = { ...state.customNodes, [node.id]: node };
      saveStored(STORAGE_KEYS.CUSTOM_NODES, updated);
      set({ customNodes: updated });
    },

    importPlaybookJSON: (jsonString: string) => {
      try {
        const parsed = JSON.parse(jsonString);
        if (parsed.customNodes) {
          saveStored(STORAGE_KEYS.CUSTOM_NODES, parsed.customNodes);
          set({ customNodes: parsed.customNodes });
        }
        if (parsed.plans) {
          saveStored(STORAGE_KEYS.PLANS, parsed.plans);
          set({ plans: parsed.plans });
        }
        return true;
      } catch {
        return false;
      }
    },

    exportPlaybookJSON: () => {
      const state = get();
      return JSON.stringify(
        {
          version: '1.0',
          exportedAt: new Date().toISOString(),
          customNodes: state.customNodes,
          plans: state.plans,
          coachingStats: state.coachingStats,
        },
        null,
        2
      );
    },
  };
});
