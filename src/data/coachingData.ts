export interface RebuttalStat {
  rebuttalId: string;
  name: string;
  category: string;
  approachStyle: 'empathy_first' | 'consultative' | 'value_contrast' | 'permission_close' | 'transparent_pricing';
  successRate: number; // percentage (e.g. 78%)
  timesUsed: number;
  conversionCount: number;
  ethicsRating: 'High - Transparent' | 'High - Consultative' | 'High - Empathetic';
  keyInsight: string;
  isRecommendedTopPick?: boolean;
}

export const INITIAL_COACHING_STATS: Record<string, RebuttalStat> = {
  // Dismissive
  'obj_not_interested': {
    rebuttalId: 'obj_not_interested',
    name: 'Acknowledge & Curiosity Gap',
    category: 'Dismissive',
    approachStyle: 'empathy_first',
    successRate: 74,
    timesUsed: 42,
    conversionCount: 31,
    ethicsRating: 'High - Empathetic',
    keyInsight: 'Validating their initial reaction ("Totally get it, I wouldn\'t expect you to be") immediately defuses confrontation and converts 74% into open dialogue.',
    isRecommendedTopPick: true,
  },
  'obj_no_thanks': {
    rebuttalId: 'obj_no_thanks',
    name: 'Praise Current Provider & Probe Creep',
    category: 'Dismissive',
    approachStyle: 'consultative',
    successRate: 68,
    timesUsed: 35,
    conversionCount: 24,
    ethicsRating: 'High - Consultative',
    keyInsight: 'Complimenting their current connection creates trust because shady reps only criticize. Once relaxed, asking about rate creep opens discussions.',
  },
  'obj_not_buying': {
    rebuttalId: 'obj_not_buying',
    name: 'Disarm Selling Pressure with Infrastructure Focus',
    category: 'Dismissive',
    approachStyle: 'empathy_first',
    successRate: 71,
    timesUsed: 28,
    conversionCount: 20,
    ethicsRating: 'High - Transparent',
    keyInsight: '"I couldn\'t sell you anything today if you wanted to" breaks standard defense patterns and creates curiosity about the neighborhood upgrade.',
    isRecommendedTopPick: true,
  },

  // Price
  'obj_too_expensive': {
    rebuttalId: 'obj_too_expensive',
    name: 'Infrastructure Cost Reality ($35-$55)',
    category: 'Price',
    approachStyle: 'transparent_pricing',
    successRate: 82,
    timesUsed: 50,
    conversionCount: 41,
    ethicsRating: 'High - Transparent',
    keyInsight: 'Revealing that fiber starts at $35 to $55 shatters the myth that fiber is a luxury product. Anchoring with $0 equipment fee converts over 80%.',
    isRecommendedTopPick: true,
  },
  'obj_hidden_fees': {
    rebuttalId: 'obj_hidden_fees',
    name: 'Total Transparency & $0 Hardware Guarantee',
    category: 'Price',
    approachStyle: 'transparent_pricing',
    successRate: 85,
    timesUsed: 39,
    conversionCount: 33,
    ethicsRating: 'High - Transparent',
    keyInsight: 'Agreeing with their frustration about cable hidden fees, then clearly showing the zero-equipment-rental policy on screen wins instant credibility.',
    isRecommendedTopPick: true,
  },

  // Switching
  'obj_switching_hassle': {
    rebuttalId: 'obj_switching_hassle',
    name: 'Isolate Concern & Zero-Overlap Downtime',
    category: 'Switching',
    approachStyle: 'consultative',
    successRate: 79,
    timesUsed: 44,
    conversionCount: 35,
    ethicsRating: 'High - Consultative',
    keyInsight: 'Asking whether they worry about installation mess or device setup isolates the objection so you solve the exact concern without pitching blindly.',
    isRecommendedTopPick: true,
  },
  'obj_downtime_worry': {
    rebuttalId: 'obj_downtime_worry',
    name: 'Keep Old Service Active Until Fiber Tested',
    category: 'Switching',
    approachStyle: 'empathy_first',
    successRate: 88,
    timesUsed: 36,
    conversionCount: 32,
    ethicsRating: 'High - Empathetic',
    keyInsight: 'Guaranteeing that old internet remains live until fiber is running and tested on their work laptop removes 100% of risk for remote workers.',
    isRecommendedTopPick: true,
  },
  'obj_wifi_seamless': {
    rebuttalId: 'obj_wifi_seamless',
    name: 'Same Network Name & Password Hack',
    category: 'Switching',
    approachStyle: 'value_contrast',
    successRate: 86,
    timesUsed: 31,
    conversionCount: 27,
    ethicsRating: 'High - Consultative',
    keyInsight: 'Explaining that the tech will match their exact Wi-Fi name and password eliminates the friction of reconnecting 20 smart devices.',
    isRecommendedTopPick: true,
  },

  // Timing
  'obj_talk_to_spouse': {
    rebuttalId: 'obj_talk_to_spouse',
    name: 'Equip with Concrete Numbers For Discussion',
    category: 'Timing',
    approachStyle: 'permission_close',
    successRate: 76,
    timesUsed: 38,
    conversionCount: 29,
    ethicsRating: 'High - Consultative',
    keyInsight: 'Never contest consulting their spouse! Offer to check eligibility and send the exact quote so they have concrete figures instead of guesswork.',
    isRecommendedTopPick: true,
  },
  'obj_busy_in_middle': {
    rebuttalId: 'obj_busy_in_middle',
    name: 'Brisk 15-Second Text Lead Pivot',
    category: 'Timing',
    approachStyle: 'permission_close',
    successRate: 65,
    timesUsed: 46,
    conversionCount: 30,
    ethicsRating: 'High - Empathetic',
    keyInsight: 'Respecting their immediate busy state and asking for a 1-sentence text quote captures high-intent leads without being annoying.',
  },
};

export const ETHICAL_SALES_PRINCIPLES = [
  {
    title: 'Never Pressure or Argue',
    description: 'Always validate the customer\'s viewpoint before presenting an alternative perspective.',
  },
  {
    title: 'Total Price Transparency',
    description: 'Always quote complete terms including gateway inclusion ($0), no annual contracts, and no hidden add-ons.',
  },
  {
    title: 'Consultative Diagnostic',
    description: 'Diagnose whether fiber solves a genuine problem (upload lag, rate creep, dead zones) before pitching.',
  },
  {
    title: 'Respectful Exit Guarantee',
    description: 'If a homeowner clearly states they are happy or unwilling to switch, leave a clean positive impression.',
  },
];
