export type IntentType = 
  | 'positive' 
  | 'neutral' 
  | 'objection' 
  | 'negative' 
  | 'buying_signal'
  | 'info';

export type StageId = 
  | 'stage_1_opening'
  | 'stage_2_discovery'
  | 'stage_3_satisfaction'
  | 'stage_4_value'
  | 'stage_5_objections'
  | 'stage_6_buying_signals'
  | 'stage_7_closing';

export interface ResponseOption {
  id: string;
  label: string;
  subtitle?: string;
  intent: IntentType;
  nextNodeId: string;
  contextUpdate?: Partial<CustomerContext>;
}

export interface ConversationNode {
  id: string;
  stage: StageId;
  stageNumber: number;
  stageName: string;
  title: string;
  script: string;
  coachingTip?: string;
  reasoning?: string;
  customerContext?: string[];
  responses: ResponseOption[];
  isTerminal?: boolean;
  terminalType?: 'sale' | 'qualified_lead' | 'follow_up' | 'not_interested' | 'not_eligible' | 'no_answer';
}

export interface CustomerContext {
  provider?: string;
  monthlyBill?: string;
  satisfaction?: string;
  primaryPainPoint?: string;
  householdNeeds?: string[];
  objectionsEncountered?: string[];
  buyingSignalsHeard?: string[];
  selectedPlanId?: string;
  notes?: string;
}

export interface OpeningStyle {
  id: string;
  name: string;
  description: string;
  script: string;
  coaching: string;
}

export interface ObjectionReaction {
  reaction: string;
  nextNodeId?: string;
  suggestedScript: string;
  note?: string;
}

export interface ObjectionItem {
  id: string;
  title: string;
  category: 'dismissive' | 'price' | 'switching' | 'trust' | 'timing' | 'technical';
  customerPhrase: string;
  repScript: string;
  followUpQuestion?: string;
  whyThisWorks: string;
  reactions: ObjectionReaction[];
  respectfulExit: string;
}

export interface BuyingSignalItem {
  id: string;
  signal: string;
  repResponse: string;
  followUp: string;
  targetStage: StageId;
  targetNodeId: string;
  coaching: string;
}

export interface PlanConfig {
  id: string;
  name: string;
  speed: string;
  price: number;
  promoPrice?: number;
  promoDuration?: string;
  equipmentFee: string;
  installationFee: string;
  contract: string;
  perks: string[];
  idealFor: string;
}

export interface SessionRecord {
  id: string;
  timestamp: number;
  durationSeconds: number;
  provider: string;
  monthlyBill: string;
  satisfaction: string;
  painPoint: string;
  objections: string[];
  buyingSignals: string[];
  outcome: 'sale' | 'qualified_lead' | 'follow_up' | 'not_interested' | 'not_eligible' | 'no_answer';
  notes?: string;
}

export interface TrainingScenario {
  id: string;
  title: string;
  homeownerPersona: string;
  currentProvider: string;
  situation: string;
  homeownerOpeningResponse: string;
  turns: {
    homeownerSays: string;
    options: {
      id: string;
      repSpeech: string;
      isBest: boolean;
      score: number;
      feedback: string;
      nextTurnIndex?: number;
    }[];
  }[];
}
