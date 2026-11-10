import { ConversationNode } from '../types';

export const CONVERSATION_NODES: Record<string, ConversationNode> = {
  // ==========================================
  // STAGE 1: OPENING PITCH
  // ==========================================
  node_stage1_opening: {
    id: 'node_stage1_opening',
    stage: 'stage_1_opening',
    stageNumber: 1,
    stageName: 'Opening Pitch',
    title: 'Neighborhood Fiber Rollout',
    script: "Hey, how's it going? I'm with T-Mobile. We've got crews bringing fiber into the neighborhood, and I'm just checking who everyone's using for internet right now.",
    coachingTip: 'Keep your body language relaxed, step two paces back from the threshold so they have personal space, and deliver with a friendly, conversational smile.',
    reasoning: 'Non-pushy informational introduction that frames the visit as an operational neighborhood update rather than a hard telemarketing pitch.',
    customerContext: ['Neighborhood fiber construction in progress'],
    responses: [
      {
        id: 'resp_cox',
        label: 'Cox',
        subtitle: 'Most common cable provider',
        intent: 'neutral',
        nextNodeId: 'node_provider_cox',
        contextUpdate: { provider: 'Cox' },
      },
      {
        id: 'resp_centurylink',
        label: 'CenturyLink',
        subtitle: 'Legacy DSL or VDSL',
        intent: 'neutral',
        nextNodeId: 'node_provider_centurylink',
        contextUpdate: { provider: 'CenturyLink' },
      },
      {
        id: 'resp_quantum',
        label: 'Quantum Fiber',
        subtitle: 'Fiber competitor',
        intent: 'neutral',
        nextNodeId: 'node_provider_quantum',
        contextUpdate: { provider: 'Quantum Fiber' },
      },
      {
        id: 'resp_starlink',
        label: 'Starlink',
        subtitle: 'Satellite internet',
        intent: 'neutral',
        nextNodeId: 'node_provider_starlink',
        contextUpdate: { provider: 'Starlink' },
      },
      {
        id: 'resp_tmobile',
        label: 'T-Mobile (Already)',
        subtitle: '5G home internet or cell',
        intent: 'positive',
        nextNodeId: 'node_provider_tmobile',
        contextUpdate: { provider: 'T-Mobile Existing' },
      },
      {
        id: 'resp_other_provider',
        label: 'Other Provider',
        subtitle: 'AT&T, Xfinity, Spectrum, Local',
        intent: 'neutral',
        nextNodeId: 'node_provider_other',
        contextUpdate: { provider: 'Other Provider' },
      },
      {
        id: 'resp_not_interested',
        label: 'Not interested',
        subtitle: 'Immediate brush-off',
        intent: 'objection',
        nextNodeId: 'node_obj_not_interested',
      },
      {
        id: 'resp_what_selling',
        label: 'What are you selling?',
        subtitle: 'Skeptical homeowner',
        intent: 'neutral',
        nextNodeId: 'node_what_selling',
      },
      {
        id: 'resp_im_busy',
        label: "I'm busy",
        subtitle: 'Time constraint',
        intent: 'objection',
        nextNodeId: 'node_im_busy',
      },
    ],
  },

  node_what_selling: {
    id: 'node_what_selling',
    stage: 'stage_1_opening',
    stageNumber: 1,
    stageName: 'Opening Pitch',
    title: 'Disarm Selling Resistance',
    script: "Haha, completely fair question! I'm not here to sell you phones or accessories. T-Mobile is laying down 100% pure underground fiber lines on this street, and we're just checking what neighbors are currently paying for internet so you know your new options.",
    coachingTip: 'Smile and keep your hands visible. Laughing gently at the question removes hostility and builds rapport.',
    reasoning: 'Reassures the homeowner that this is about infrastructure options and local rate transparency.',
    responses: [
      {
        id: 'resp_ws_names_provider',
        label: 'Shares provider name',
        subtitle: 'Opened up to discuss',
        intent: 'positive',
        nextNodeId: 'node_disc_cost',
      },
      {
        id: 'resp_ws_how_much',
        label: '"How much is it?"',
        subtitle: 'Direct pricing interest',
        intent: 'buying_signal',
        nextNodeId: 'node_value_savings_cost',
      },
      {
        id: 'resp_ws_still_guarded',
        label: '"We don\'t need anything"',
        subtitle: 'Persistent guard',
        intent: 'objection',
        nextNodeId: 'node_obj_no_thanks',
      },
    ],
  },

  node_im_busy: {
    id: 'node_im_busy',
    stage: 'stage_1_opening',
    stageNumber: 1,
    stageName: 'Opening Pitch',
    title: 'Brisk 20-Second Pitch',
    script: "I completely respect that—I'll be out of your hair in 20 seconds. T-Mobile is bringing dedicated fiber to your street this month with plans starting at $35 to $55. Can I leave a quick rate flyer with you, or shoot you a 1-sentence text quote to check later?",
    coachingTip: 'Speed up slightly to match their cadence. Give them an easy, low-commitment choice.',
    reasoning: 'Demonstrates immediate respect for their time while offering a frictionless way to stay connected.',
    responses: [
      {
        id: 'resp_busy_takes_flyer',
        label: 'Takes flyer / quote',
        subtitle: 'Accepted information',
        intent: 'positive',
        nextNodeId: 'node_terminal_followup_lead',
      },
      {
        id: 'resp_busy_asks_speed',
        label: '"Wait, what kind of speeds?"',
        subtitle: 'Caught their interest',
        intent: 'buying_signal',
        nextNodeId: 'node_value_fiber_performance',
      },
      {
        id: 'resp_busy_shuts_door',
        label: 'Closes door / leaves',
        subtitle: 'No further interaction',
        intent: 'negative',
        nextNodeId: 'node_terminal_no_answer',
      },
    ],
  },

  // ==========================================
  // STAGE 2: CURRENT PROVIDER DISCOVERY
  // ==========================================
  node_provider_cox: {
    id: 'node_provider_cox',
    stage: 'stage_2_discovery',
    stageNumber: 2,
    stageName: 'Provider Discovery',
    title: 'Cox Customer Exploration',
    script: "Gotcha, Cox has been in this neighborhood for a while. About what are they charging you a month right now?",
    coachingTip: 'Do not criticize Cox! Let the customer volunteer their feelings about the bill or service.',
    reasoning: 'Cox customers frequently face annual promo expirations and coaxial upload bottlenecks.',
    responses: [
      {
        id: 'resp_cox_under_40',
        label: 'Under $40',
        intent: 'neutral',
        nextNodeId: 'node_sat_check_under40',
        contextUpdate: { monthlyBill: '< $40' },
      },
      {
        id: 'resp_cox_40_60',
        label: '$40–$60',
        intent: 'neutral',
        nextNodeId: 'node_sat_check_mid',
        contextUpdate: { monthlyBill: '$40–$60' },
      },
      {
        id: 'resp_cox_60_80',
        label: '$60–$80',
        intent: 'neutral',
        nextNodeId: 'node_sat_check_high',
        contextUpdate: { monthlyBill: '$60–$80' },
      },
      {
        id: 'resp_cox_80_100',
        label: '$80–$100',
        intent: 'neutral',
        nextNodeId: 'node_sat_check_very_high',
        contextUpdate: { monthlyBill: '$80–$100' },
      },
      {
        id: 'resp_cox_over_100',
        label: 'Over $100',
        intent: 'positive',
        nextNodeId: 'node_sat_check_cable_bloat',
        contextUpdate: { monthlyBill: '> $100' },
      },
      {
        id: 'resp_cox_doesnt_know',
        label: "Doesn't know",
        intent: 'neutral',
        nextNodeId: 'node_sat_check_unknown',
        contextUpdate: { monthlyBill: 'Unknown' },
      },
      {
        id: 'resp_cox_wont_say',
        label: "Won't say",
        intent: 'neutral',
        nextNodeId: 'node_sat_check_wont_say',
        contextUpdate: { monthlyBill: 'Private' },
      },
    ],
  },

  node_provider_centurylink: {
    id: 'node_provider_centurylink',
    stage: 'stage_2_discovery',
    stageNumber: 2,
    stageName: 'Provider Discovery',
    title: 'CenturyLink Discovery',
    script: "Makes sense, CenturyLink has older telephone lines out here. About what are they billing you each month for that?",
    coachingTip: 'CenturyLink DSL is often capped under 40–100 Mbps. Listen for speed complaints.',
    reasoning: 'Many CenturyLink customers are stuck on slow copper DSL lines desperately waiting for real fiber.',
    responses: [
      {
        id: 'resp_cl_under_40',
        label: 'Under $40',
        intent: 'neutral',
        nextNodeId: 'node_sat_check_under40',
        contextUpdate: { monthlyBill: '< $40' },
      },
      {
        id: 'resp_cl_40_60',
        label: '$40–$60',
        intent: 'neutral',
        nextNodeId: 'node_sat_check_mid',
        contextUpdate: { monthlyBill: '$40–$60' },
      },
      {
        id: 'resp_cl_60_80',
        label: '$60–$80',
        intent: 'neutral',
        nextNodeId: 'node_sat_check_high',
        contextUpdate: { monthlyBill: '$60–$80' },
      },
      {
        id: 'resp_cl_over_80',
        label: 'Over $80',
        intent: 'positive',
        nextNodeId: 'node_sat_check_very_high',
        contextUpdate: { monthlyBill: '> $80' },
      },
      {
        id: 'resp_cl_unknown',
        label: "Doesn't know / Won't say",
        intent: 'neutral',
        nextNodeId: 'node_sat_check_unknown',
      },
    ],
  },

  node_provider_quantum: {
    id: 'node_provider_quantum',
    stage: 'stage_2_discovery',
    stageNumber: 2,
    stageName: 'Provider Discovery',
    title: 'Quantum Fiber Customer',
    script: "Oh nice, Quantum is pure fiber too so you know the difference! About what is your monthly bill with them right now?",
    coachingTip: 'They already understand fiber. Your angle is pricing stability, equipment quality, and mobile bundle perks.',
    reasoning: 'Quantum users value fiber tech; focus on bill value rather than teaching fiber basics.',
    responses: [
      {
        id: 'resp_q_60_80',
        label: '$65–$75/mo standard rate',
        intent: 'neutral',
        nextNodeId: 'node_sat_check_high',
        contextUpdate: { monthlyBill: '$70' },
      },
      {
        id: 'resp_q_over_80',
        label: 'Over $80/mo with pods',
        intent: 'positive',
        nextNodeId: 'node_sat_check_very_high',
        contextUpdate: { monthlyBill: '> $80' },
      },
      {
        id: 'resp_q_happy',
        label: 'Very happy with Quantum',
        intent: 'neutral',
        nextNodeId: 'node_sat_loves_it',
      },
    ],
  },

  node_provider_starlink: {
    id: 'node_provider_starlink',
    stage: 'stage_2_discovery',
    stageNumber: 2,
    stageName: 'Provider Discovery',
    title: 'Starlink / Satellite Customer',
    script: "Starlink was a lifesaver when there were no wired options! But they usually run about $120 a month plus that huge dish hardware. Is that what you're paying?",
    coachingTip: 'Starlink users love the tech but hate the $120/mo price tag and tree/weather obstruction drops.',
    reasoning: 'Switching Starlink to terrestrial fiber saves them $60–$80 every single month with 10x better ping.',
    responses: [
      {
        id: 'resp_starlink_yes_120',
        label: 'Yes, ~$120/month',
        intent: 'positive',
        nextNodeId: 'node_close_savings_pitch',
        contextUpdate: { monthlyBill: '$120' },
      },
      {
        id: 'resp_starlink_weather_drops',
        label: 'Drops in heavy rain/trees',
        intent: 'positive',
        nextNodeId: 'node_sat_drops',
        contextUpdate: { primaryPainPoint: 'Weather obstruction' },
      },
    ],
  },

  node_provider_tmobile: {
    id: 'node_provider_tmobile',
    stage: 'stage_2_discovery',
    stageNumber: 2,
    stageName: 'Provider Discovery',
    title: 'Existing T-Mobile Customer',
    script: "Hey, we love our T-Mobile family! Are you currently using our 5G Home Internet cube, or do you have your mobile phones with us?",
    coachingTip: 'T-Mobile customers qualify for the deepest fiber loyalty discounts ($10–$15/mo discount)!',
    reasoning: 'Loyal T-Mobile customers have pre-existing brand affinity and receive exclusive account bundle credits.',
    responses: [
      {
        id: 'resp_tm_5g_home',
        label: 'Has 5G Home Internet box',
        subtitle: 'Cellular wireless cube',
        intent: 'positive',
        nextNodeId: 'node_tmobile_5g_to_fiber_upgrade',
        contextUpdate: { provider: 'T-Mobile 5G Home' },
      },
      {
        id: 'resp_tm_mobile_only',
        label: 'Phones with T-Mobile, other for Wi-Fi',
        subtitle: 'Huge discount eligible',
        intent: 'positive',
        nextNodeId: 'node_tmobile_cell_bundle_pitch',
        contextUpdate: { provider: 'T-Mobile Wireless + Other ISP' },
      },
    ],
  },

  node_provider_other: {
    id: 'node_provider_other',
    stage: 'stage_2_discovery',
    stageNumber: 2,
    stageName: 'Provider Discovery',
    title: 'General Provider Discovery',
    script: "Gotcha! And about what are they charging you each month for your connection?",
    coachingTip: 'Keep your expression open and neutral.',
    responses: [
      {
        id: 'resp_other_under60',
        label: 'Under $60/mo',
        intent: 'neutral',
        nextNodeId: 'node_sat_check_mid',
      },
      {
        id: 'resp_other_60_80',
        label: '$60–$80/mo',
        intent: 'neutral',
        nextNodeId: 'node_sat_check_high',
      },
      {
        id: 'resp_other_over80',
        label: 'Over $80/mo',
        intent: 'positive',
        nextNodeId: 'node_sat_check_very_high',
      },
      {
        id: 'resp_other_unknown',
        label: "Doesn't know / Won't say",
        intent: 'neutral',
        nextNodeId: 'node_sat_check_unknown',
      },
    ],
  },

  node_disc_cost: {
    id: 'node_disc_cost',
    stage: 'stage_2_discovery',
    stageNumber: 2,
    stageName: 'Provider Discovery',
    title: 'Monthly Cost Discovery',
    script: "And about what are they charging you each month on your statement?",
    coachingTip: 'Ask casually as if everyone shares it.',
    responses: [
      {
        id: 'resp_disc_under40',
        label: 'Under $40',
        intent: 'neutral',
        nextNodeId: 'node_sat_check_under40',
        contextUpdate: { monthlyBill: '< $40' },
      },
      {
        id: 'resp_disc_40_60',
        label: '$40–$60',
        intent: 'neutral',
        nextNodeId: 'node_sat_check_mid',
        contextUpdate: { monthlyBill: '$40–$60' },
      },
      {
        id: 'resp_disc_60_80',
        label: '$60–$80',
        intent: 'neutral',
        nextNodeId: 'node_sat_check_high',
        contextUpdate: { monthlyBill: '$60–$80' },
      },
      {
        id: 'resp_disc_80_100',
        label: '$80–$100',
        intent: 'neutral',
        nextNodeId: 'node_sat_check_very_high',
        contextUpdate: { monthlyBill: '$80–$100' },
      },
      {
        id: 'resp_disc_over100',
        label: 'Over $100',
        intent: 'positive',
        nextNodeId: 'node_sat_check_cable_bloat',
        contextUpdate: { monthlyBill: '> $100' },
      },
      {
        id: 'resp_disc_wont_say',
        label: "Prefers not to say",
        intent: 'neutral',
        nextNodeId: 'node_sat_check_wont_say',
      },
    ],
  },

  // ==========================================
  // STAGE 3: CUSTOMER SATISFACTION
  // ==========================================
  node_sat_check_under40: {
    id: 'node_sat_check_under40',
    stage: 'stage_3_satisfaction',
    stageNumber: 3,
    stageName: 'Customer Satisfaction',
    title: 'Low Bill Discovery',
    script: "Under $40 is great! And how's it been working for you? Pretty solid, or does it ever slow down or give you trouble?",
    coachingTip: 'Do not compete on price alone when they pay under $40. Explore speed, upload reliability, or expiring promos.',
    reasoning: 'Uncovers whether they are getting sluggish low-tier DSL speeds or if it is an expiring teaser rate.',
    responses: [
      {
        id: 'resp_u40_slow',
        label: 'Internet is slow / buffers',
        intent: 'positive',
        nextNodeId: 'node_sat_slow',
        contextUpdate: { primaryPainPoint: 'Speed bottlenecks' },
      },
      {
        id: 'resp_u40_happy',
        label: 'Loves it / Works great',
        intent: 'neutral',
        nextNodeId: 'node_sat_loves_it',
        contextUpdate: { satisfaction: 'Satisfied' },
      },
      {
        id: 'resp_u40_wfh',
        label: 'Works from home',
        intent: 'positive',
        nextNodeId: 'node_sat_wfh',
        contextUpdate: { householdNeeds: ['Remote Work'] },
      },
      {
        id: 'resp_u40_promo',
        label: 'Promo ending soon',
        intent: 'positive',
        nextNodeId: 'node_sat_price_increase',
        contextUpdate: { primaryPainPoint: 'Expiring promo' },
      },
    ],
  },

  node_sat_check_mid: {
    id: 'node_sat_check_mid',
    stage: 'stage_3_satisfaction',
    stageNumber: 3,
    stageName: 'Customer Satisfaction',
    title: 'Standard Rate Satisfaction',
    script: "$40 to $60 is right around average. And how's the actual connection been working for you? Pretty solid, or does it ever act up?",
    coachingTip: 'Notice the open wording ("pretty solid or does it ever act up"). They will share their main frustration.',
    reasoning: 'Gives the customer permission to share either satisfaction or underlying frustrations.',
    responses: [
      {
        id: 'resp_mid_solid',
        label: 'Mostly satisfied',
        intent: 'neutral',
        nextNodeId: 'node_sat_mostly_ok',
        contextUpdate: { satisfaction: 'Mostly satisfied' },
      },
      {
        id: 'resp_mid_drops',
        label: 'Wi-Fi drops / dead spots',
        intent: 'positive',
        nextNodeId: 'node_sat_drops',
        contextUpdate: { primaryPainPoint: 'Drops / Dead zones' },
      },
      {
        id: 'resp_mid_slow',
        label: 'Slow during peak hours',
        intent: 'positive',
        nextNodeId: 'node_sat_slow',
        contextUpdate: { primaryPainPoint: 'Peak hour lag' },
      },
      {
        id: 'resp_mid_price_crept',
        label: 'Price keeps creeping up',
        intent: 'positive',
        nextNodeId: 'node_sat_price_increase',
        contextUpdate: { primaryPainPoint: 'Creeping rates' },
      },
      {
        id: 'resp_mid_wfh',
        label: 'Works from home / Zoom calls',
        intent: 'positive',
        nextNodeId: 'node_sat_wfh',
        contextUpdate: { householdNeeds: ['WFH / Zoom'] },
      },
      {
        id: 'resp_mid_gaming',
        label: 'Gaming household / Multiple screens',
        intent: 'positive',
        nextNodeId: 'node_sat_gaming',
        contextUpdate: { householdNeeds: ['Gaming / Streaming'] },
      },
    ],
  },

  node_sat_check_high: {
    id: 'node_sat_check_high',
    stage: 'stage_3_satisfaction',
    stageNumber: 3,
    stageName: 'Customer Satisfaction',
    title: 'High Bill Discovery',
    script: "Yeah, $60 to $80 adds up fast over a year. And how has the service been running for that price? Pretty flawless, or do you ever experience lag?",
    coachingTip: 'Highlight the contrast between paying top dollar and getting imperfect cable service.',
    responses: [
      {
        id: 'resp_high_expensive',
        label: 'Too expensive / Not worth it',
        intent: 'positive',
        nextNodeId: 'node_sat_too_expensive',
        contextUpdate: { primaryPainPoint: 'Cost' },
      },
      {
        id: 'resp_high_slow',
        label: 'Slow / Buffers frequently',
        intent: 'positive',
        nextNodeId: 'node_sat_slow',
        contextUpdate: { primaryPainPoint: 'Slow speeds' },
      },
      {
        id: 'resp_high_drops',
        label: 'Drops connection',
        intent: 'positive',
        nextNodeId: 'node_sat_drops',
        contextUpdate: { primaryPainPoint: 'Unreliable drops' },
      },
      {
        id: 'resp_high_fine',
        label: 'Works fine, just expensive',
        intent: 'neutral',
        nextNodeId: 'node_sat_mostly_ok',
      },
    ],
  },

  node_sat_check_very_high: {
    id: 'node_sat_check_very_high',
    stage: 'stage_3_satisfaction',
    stageNumber: 3,
    stageName: 'Customer Satisfaction',
    title: 'Premium Bill Discovery',
    script: "$80 to $100 is definitely on the high end for home internet. Are you getting full gigabit speeds with equipment fees included, or does it ever give you trouble?",
    coachingTip: 'At this price point, T-Mobile Fiber at $55 saves them $300–$500+ a year.',
    responses: [
      {
        id: 'resp_vh_way_too_high',
        label: 'Price is ridiculous',
        intent: 'positive',
        nextNodeId: 'node_sat_too_expensive',
      },
      {
        id: 'resp_vh_bundled',
        label: 'Bundled with cable TV or phone',
        intent: 'neutral',
        nextNodeId: 'node_bundle_discovery',
      },
      {
        id: 'resp_vh_issues',
        label: 'Has drops and lag on top of it',
        intent: 'positive',
        nextNodeId: 'node_sat_drops',
      },
    ],
  },

  node_sat_check_cable_bloat: {
    id: 'node_sat_check_cable_bloat',
    stage: 'stage_3_satisfaction',
    stageNumber: 3,
    stageName: 'Customer Satisfaction',
    title: 'Heavy Bill Exploration',
    script: "Over $100 a month! You must have extra cable boxes or equipment rental fees piled on there. Is that for standalone internet or a legacy bundle?",
    coachingTip: 'Prime prospect for cutting the cord and switching to modern fiber streaming.',
    responses: [
      {
        id: 'resp_cb_wants_savings',
        label: 'Wants to lower bill immediately',
        intent: 'buying_signal',
        nextNodeId: 'node_close_savings_pitch',
      },
      {
        id: 'resp_cb_keeps_cable_tv',
        label: 'Watches cable news/sports',
        intent: 'neutral',
        nextNodeId: 'node_bundle_discovery',
      },
    ],
  },

  node_sat_check_unknown: {
    id: 'node_sat_check_unknown',
    stage: 'stage_3_satisfaction',
    stageNumber: 3,
    stageName: 'Customer Satisfaction',
    title: 'Bill Unknown Satisfaction',
    script: "No worries, most people have it on autopay and don't look at the bill every month! How has the connection been performing though? Pretty solid, or does it ever lag or drop?",
    coachingTip: 'Shift effortlessly away from billing numbers to daily user experience.',
    responses: [
      {
        id: 'resp_unk_fine',
        label: 'Loves current provider / No complaints',
        intent: 'neutral',
        nextNodeId: 'node_sat_loves_it',
      },
      {
        id: 'resp_unk_slow',
        label: 'Noticeably slow or drops',
        intent: 'positive',
        nextNodeId: 'node_sat_slow',
      },
      {
        id: 'resp_unk_wfh',
        label: 'Works from home / multiple devices',
        intent: 'positive',
        nextNodeId: 'node_sat_wfh',
      },
    ],
  },

  node_sat_check_wont_say: {
    id: 'node_sat_check_wont_say',
    stage: 'stage_3_satisfaction',
    stageNumber: 3,
    stageName: 'Customer Satisfaction',
    title: 'Privacy Respect Satisfaction',
    script: "Totally understand, private information! Aside from cost, how's the actual speed and reliability been? Does it keep up when everyone's streaming at night?",
    coachingTip: 'Respect privacy immediately without lingering on money.',
    responses: [
      {
        id: 'resp_ws_solid',
        label: 'Pretty solid connection',
        intent: 'neutral',
        nextNodeId: 'node_sat_mostly_ok',
      },
      {
        id: 'resp_ws_buffers',
        label: 'Buffers at night / drops',
        intent: 'positive',
        nextNodeId: 'node_sat_slow',
      },
    ],
  },

  // --- Specific satisfaction response branches ---
  node_sat_loves_it: {
    id: 'node_sat_loves_it',
    stage: 'stage_3_satisfaction',
    stageNumber: 3,
    stageName: 'Customer Satisfaction',
    title: 'Satisfied Customer Rebuttal',
    script: "That's good. No reason to fix something that isn't broken! Out of curiosity, if you could keep that exact same reliability and speed, but bring your monthly cost down to $35 or $55 with zero price hikes, would that be worth a quick look?",
    coachingTip: 'Never argue with a happy customer. Validate them first, then test their curiosity about identical quality at a lower cost.',
    reasoning: 'Disarms customer defensiveness by agreeing with them, then introduces pure monetary upside.',
    responses: [
      {
        id: 'resp_love_open_to_look',
        label: '"Sure, what does it cost?"',
        subtitle: 'Opened to compare rates',
        intent: 'positive',
        nextNodeId: 'node_plan_config_showcase',
      },
      {
        id: 'resp_love_not_switching',
        label: '"No thanks, happy where I am"',
        subtitle: 'Firm satisfied refusal',
        intent: 'neutral',
        nextNodeId: 'node_terminal_satisfied_customer',
      },
    ],
  },

  node_sat_mostly_ok: {
    id: 'node_sat_mostly_ok',
    stage: 'stage_3_satisfaction',
    stageNumber: 3,
    stageName: 'Customer Satisfaction',
    title: 'Mostly Satisfied Exploration',
    script: "Glad it's mostly holding up! That's the baseline. The main thing neighbors tell us is they hate how coaxial cable slows down during peak evening hours when the whole block gets online. Have you ever noticed that around 7 or 8 PM?",
    coachingTip: 'Educates them on the shared-cable node problem without sounding overly critical.',
    responses: [
      {
        id: 'resp_mostly_notices_evening_lag',
        label: '"Yeah, Netflix does spin sometimes"',
        intent: 'positive',
        nextNodeId: 'node_value_fiber_performance',
        contextUpdate: { primaryPainPoint: 'Evening neighborhood congestion' },
      },
      {
        id: 'resp_mostly_curious_plans',
        label: '"What are your plans anyway?"',
        intent: 'buying_signal',
        nextNodeId: 'node_plan_config_showcase',
      },
    ],
  },

  node_sat_too_expensive: {
    id: 'node_sat_too_expensive',
    stage: 'stage_3_satisfaction',
    stageNumber: 3,
    stageName: 'Customer Satisfaction',
    title: 'Price Relief Focus',
    script: "Yeah, that's usually the biggest complaint I hear. If there were a way to bring that bill down to $35 or $55 a month without sacrificing your connection, would it be worth a quick look?",
    coachingTip: 'Deliver with empathy. Everyone hates feeling overcharged by telecom companies.',
    reasoning: 'Directly addresses their stated pain point and bridges directly to our value presentation.',
    responses: [
      {
        id: 'resp_expensive_show_plans',
        label: '"Definitely, show me what you have"',
        intent: 'positive',
        nextNodeId: 'node_plan_config_showcase',
      },
      {
        id: 'resp_expensive_hidden_fees',
        label: '"Are there hidden taxes and fees?"',
        intent: 'objection',
        nextNodeId: 'node_no_hidden_fees',
      },
    ],
  },

  node_sat_price_increase: {
    id: 'node_sat_price_increase',
    stage: 'stage_3_satisfaction',
    stageNumber: 3,
    stageName: 'Customer Satisfaction',
    title: 'Creeping Rate Relief',
    script: "That rate creep is maddening! You sign up for $50, and 12 months later it's $85. With T-Mobile Fiber, what you see is what you pay—no promo expiration cliff, no annual contract, and no rental fees. Would having a locked-in flat bill give you peace of mind?",
    coachingTip: 'Use the phrase "promo expiration cliff"—homeowners instantly recognize that exact feeling.',
    responses: [
      {
        id: 'resp_price_inc_interested',
        label: '"Yes, I hate calling them to negotiate every year"',
        intent: 'positive',
        nextNodeId: 'node_plan_config_showcase',
      },
      {
        id: 'resp_price_contract_q',
        label: '"Is there an annual contract?"',
        intent: 'buying_signal',
        nextNodeId: 'node_trust_no_contract',
      },
    ],
  },

  node_sat_slow: {
    id: 'node_sat_slow',
    stage: 'stage_3_satisfaction',
    stageNumber: 3,
    stageName: 'Customer Satisfaction',
    title: 'Speed Bottleneck Diagnosis',
    script: "That buffering circle is the worst. Most people don't know that cable companies use old copper wires that share bandwidth with 50 nearby houses. Pure fiber is a dedicated light strand directly to your home with zero shared slowdowns. How many devices are usually connected?",
    coachingTip: 'Explaining dedicated light vs shared copper makes immediate intuitive sense to non-technical people.',
    responses: [
      {
        id: 'resp_slow_lots_devices',
        label: '10–25+ devices (TVs, phones, consoles)',
        intent: 'positive',
        nextNodeId: 'node_value_bandwidth',
        contextUpdate: { householdNeeds: ['Multi-device household'] },
      },
      {
        id: 'resp_slow_wfh',
        label: 'Mainly my work computer',
        intent: 'positive',
        nextNodeId: 'node_value_wfh',
      },
    ],
  },

  node_sat_drops: {
    id: 'node_sat_drops',
    stage: 'stage_3_satisfaction',
    stageNumber: 3,
    stageName: 'Customer Satisfaction',
    title: 'Reliability & Wi-Fi Drops',
    script: "Having your Wi-Fi drop in the middle of a call or show is pure frustration. Our fiber setup includes a brand new Wi-Fi 6 gateway that blankets your home, and fiber cables don't drop during rain or wind like copper does. Where does the signal usually drop?",
    coachingTip: 'Ask where the signal drops—bedroom, basement, back patio—to visualize fixing their problem.',
    responses: [
      {
        id: 'resp_drops_specific_rooms',
        label: 'Back bedrooms / Upstairs / Basement',
        intent: 'positive',
        nextNodeId: 'node_value_hardware_upgrade',
      },
      {
        id: 'resp_drops_random',
        label: 'Router crashes completely and needs reboot',
        intent: 'positive',
        nextNodeId: 'node_value_reliability',
      },
    ],
  },

  node_sat_wfh: {
    id: 'node_sat_wfh',
    stage: 'stage_3_satisfaction',
    stageNumber: 3,
    stageName: 'Customer Satisfaction',
    title: 'Work From Home Priority',
    script: "Then reliability is probably more important than anything! Are you on video meetings most of the day, or moving larger files and spreadsheets around?",
    coachingTip: 'WFH professionals care about symmetrical upload speeds (Zoom/Teams freezing) and ZERO installation downtime.',
    reasoning: 'Directly validates their career livelihood and pivots to symmetrical fiber upload power.',
    responses: [
      {
        id: 'resp_wfh_video_calls',
        label: 'Video calls all day (Zoom / Teams)',
        intent: 'positive',
        nextNodeId: 'node_value_wfh',
        contextUpdate: { householdNeeds: ['Video conferencing'] },
      },
      {
        id: 'resp_wfh_large_files',
        label: 'Uploading large files / Cloud backups',
        intent: 'positive',
        nextNodeId: 'node_value_upload_speeds',
        contextUpdate: { householdNeeds: ['Cloud backups / Creative files'] },
      },
      {
        id: 'resp_wfh_downtime_fear',
        label: '"I can\'t afford any downtime to switch"',
        intent: 'objection',
        nextNodeId: 'node_close_wfh_assurance',
      },
    ],
  },

  node_sat_gaming: {
    id: 'node_sat_gaming',
    stage: 'stage_3_satisfaction',
    stageNumber: 3,
    stageName: 'Customer Satisfaction',
    title: 'Gaming & High Performance',
    script: "Gamers are the real speed testers! You know that ping latency is everything. Cable usually sits at 25–60ms with jitter spikes. Our pure fiber delivers single-digit ping (<5ms) with zero packet loss. Who in the house is gaming?",
    coachingTip: 'Gamers care about latency/ping and jitter way more than download megabits.',
    responses: [
      {
        id: 'resp_gaming_kids',
        label: 'Kids playing Fortnite/Roblox/CoD',
        intent: 'positive',
        nextNodeId: 'node_value_gaming',
      },
      {
        id: 'resp_gaming_myself',
        label: 'I game myself competitively',
        intent: 'positive',
        nextNodeId: 'node_value_gaming',
      },
    ],
  },

  node_sat_multi_device: {
    id: 'node_sat_multi_device',
    stage: 'stage_3_satisfaction',
    stageNumber: 3,
    stageName: 'Customer Satisfaction',
    title: 'Multiple Devices Bandwidth',
    script: "Between smart TVs, phones, tablets, smart doorbells, and computers, most homes today have 20+ connected devices competing for Wi-Fi. Our Wi-Fi 6 gateway handles up to 100+ devices simultaneously without breaking a sweat.",
    coachingTip: 'Count devices out loud with them—most people underestimate how many items are connected.',
    responses: [
      {
        id: 'resp_multi_show_plans',
        label: 'Show me the multi-device plans',
        intent: 'buying_signal',
        nextNodeId: 'node_plan_config_showcase',
      },
    ],
  },

  node_sat_doesnt_care: {
    id: 'node_sat_doesnt_care',
    stage: 'stage_3_satisfaction',
    stageNumber: 3,
    stageName: 'Customer Satisfaction',
    title: 'Indifferent Customer Pivot',
    script: "Totally fair. As long as it turns on and plays movies, right? The nice part is that fiber does that for $35 to $55 a month instead of the $80+ that cable bills usually creep up to. Would saving $300 a year make a difference?",
    coachingTip: 'When someone doesn\'t care about technology, make it strictly about money in their pocket.',
    responses: [
      {
        id: 'resp_dc_money_talks',
        label: '"Sure, saving money is always good"',
        intent: 'positive',
        nextNodeId: 'node_value_savings_cost',
      },
      {
        id: 'resp_dc_not_bothered',
        label: '"Nah, not worth changing anything"',
        intent: 'neutral',
        nextNodeId: 'node_terminal_satisfied_customer',
      },
    ],
  },

  // ==========================================
  // STAGE 4: VALUE PRESENTATION
  // ==========================================
  node_value_savings_cost: {
    id: 'node_value_savings_cost',
    stage: 'stage_4_value',
    stageNumber: 4,
    stageName: 'Value Presentation',
    title: 'Transparent Savings Presentation',
    script: "Our introductory neighborhood plans start at just $35/mo for 500 Meg, or $55/mo for a full 1,000 Meg (1 Gig). That includes your high-performance Wi-Fi 6 gateway with zero monthly rental fees, zero data caps, and no annual contracts.",
    coachingTip: 'State the numbers clearly and confidently. Remind them equipment rental is $0.',
    reasoning: 'Establishes clear, straightforward pricing and removes fear of hidden charges.',
    responses: [
      {
        id: 'resp_val_savings_compare',
        label: 'Compare 500M vs 1 Gig',
        intent: 'buying_signal',
        nextNodeId: 'node_plan_config_showcase',
      },
      {
        id: 'resp_val_savings_check_address',
        label: 'Check address availability',
        intent: 'positive',
        nextNodeId: 'node_close_availability_check',
      },
      {
        id: 'resp_val_savings_too_good',
        label: '"What\'s the catch?"',
        intent: 'objection',
        nextNodeId: 'node_no_hidden_fees',
      },
    ],
  },

  node_value_fiber_performance: {
    id: 'node_value_fiber_performance',
    stage: 'stage_4_value',
    stageNumber: 4,
    stageName: 'Value Presentation',
    title: 'Symmetrical Fiber Advantage',
    script: "With traditional cable, your download might be 200 or 400 Mbps, but your upload is throttled down to a tiny 10 or 20 Mbps. That's why Zoom calls freeze and backups crawl. T-Mobile Fiber gives you 100% symmetrical speeds—500 up and 500 down, or 1,000 up and 1,000 down.",
    coachingTip: 'Use your hands to show the lopsided cable pipe (wide download, tiny upload) vs the balanced fiber pipe.',
    responses: [
      {
        id: 'resp_perf_check_availability',
        label: '"Can I get that at my house?"',
        intent: 'buying_signal',
        nextNodeId: 'node_close_availability_check',
      },
      {
        id: 'resp_perf_show_plans',
        label: 'Show me the plan options',
        intent: 'positive',
        nextNodeId: 'node_plan_config_showcase',
      },
    ],
  },

  node_value_upload_speeds: {
    id: 'node_value_upload_speeds',
    stage: 'stage_4_value',
    stageNumber: 4,
    stageName: 'Value Presentation',
    title: 'High-Upload Power',
    script: "If you're uploading videos, photos to iCloud, or sending work files, traditional cable takes 20 minutes for something pure fiber finishes in 15 seconds. It eliminates file-transfer bottlenecks completely.",
    coachingTip: 'Great for photographers, designers, realtors, accountants, and remote corporate workers.',
    responses: [
      {
        id: 'resp_upload_ready',
        label: 'Ready to check eligibility',
        intent: 'buying_signal',
        nextNodeId: 'node_close_availability_check',
      },
      {
        id: 'resp_upload_plans',
        label: 'Look at the 1 Gig tier',
        intent: 'positive',
        nextNodeId: 'node_plan_config_showcase',
      },
    ],
  },

  node_value_wfh: {
    id: 'node_value_wfh',
    stage: 'stage_4_value',
    stageNumber: 4,
    stageName: 'Value Presentation',
    title: 'Work From Home Assurance',
    script: "For working from home, your internet is your paycheck. With T-Mobile Fiber, your video meetings never stutter, your VPN never disconnects, and when we switch you over, there is ZERO downtime because we leave your current internet active until fiber is running.",
    coachingTip: 'Emphasize the zero downtime promise. That relieves 95% of WFH anxiety.',
    responses: [
      {
        id: 'resp_wfh_val_check_addr',
        label: 'Check my address',
        intent: 'buying_signal',
        nextNodeId: 'node_close_availability_check',
      },
      {
        id: 'resp_wfh_val_how_install',
        label: '"How does the installation work?"',
        intent: 'neutral',
        nextNodeId: 'node_tech_install_process',
      },
    ],
  },

  node_value_gaming: {
    id: 'node_value_gaming',
    stage: 'stage_4_value',
    stageNumber: 4,
    stageName: 'Value Presentation',
    title: 'Single-Digit Ping Gaming',
    script: "With fiber, your ping drops to single digits (<5ms) with zero packet jitter. Game updates of 60 GB that take 2 hours on cable download in just a few minutes. Everyone in the house can stream 4K while gaming with zero lag.",
    coachingTip: 'Single-digit ping is the holy grail for anyone playing online multiplayer.',
    responses: [
      {
        id: 'resp_gaming_check_qual',
        label: 'Let\'s check availability',
        intent: 'buying_signal',
        nextNodeId: 'node_close_availability_check',
      },
      {
        id: 'resp_gaming_plans',
        label: 'View 1 Gig and 2 Gig options',
        intent: 'positive',
        nextNodeId: 'node_plan_config_showcase',
      },
    ],
  },

  node_value_bandwidth: {
    id: 'node_value_bandwidth',
    stage: 'stage_4_value',
    stageNumber: 4,
    stageName: 'Value Presentation',
    title: 'Multi-Device Bandwidth Capacity',
    script: "With 15 to 25 connected devices in the home, cable pipelines get choked because everyone shares the same narrow upload path. Pure fiber provides dedicated symmetrical lanes so smart TVs, work video calls, security cameras, and phones run simultaneously without anyone buffering.",
    coachingTip: 'Use the dedicated highway lane vs narrow bottleneck road metaphor.',
    responses: [
      {
        id: 'resp_bw_check_addr',
        label: 'Check address availability',
        intent: 'buying_signal',
        nextNodeId: 'node_close_availability_check',
      },
      {
        id: 'resp_bw_plans',
        label: 'View plan tiers ($35 / $55)',
        intent: 'positive',
        nextNodeId: 'node_plan_config_showcase',
      },
    ],
  },

  node_value_fiber_basics: {
    id: 'node_value_fiber_basics',
    stage: 'stage_4_value',
    stageNumber: 4,
    stageName: 'Value Presentation',
    title: 'Pure Fiber Optics Fundamentals',
    script: "Instead of old copper cables originally built for analog television that corrode and slow down in rain, pure fiber sends light pulses through glass strands. You get true symmetrical upload and download speeds with virtually zero latency.",
    coachingTip: 'Explaining light through glass vs electricity through copper immediately makes technical sense.',
    responses: [
      {
        id: 'resp_fb_show_plans',
        label: 'Show available plans',
        intent: 'positive',
        nextNodeId: 'node_plan_config_showcase',
      },
      {
        id: 'resp_fb_check_qual',
        label: 'Check address availability',
        intent: 'buying_signal',
        nextNodeId: 'node_close_availability_check',
      },
    ],
  },

  node_value_hardware_upgrade: {
    id: 'node_value_hardware_upgrade',
    stage: 'stage_4_value',
    stageNumber: 4,
    stageName: 'Value Presentation',
    title: 'Included Wi-Fi 6 Hardware',
    script: "Instead of paying $15 a month to rent an outdated cable router, our plan includes a cutting-edge Wi-Fi 6 gateway with mesh support for $0 a month. It gives you stronger wall penetration and blankets your entire house.",
    coachingTip: 'Show them a picture of the sleek compact gateway on your tablet if possible.',
    responses: [
      {
        id: 'resp_hw_qualify',
        label: 'Check address availability',
        intent: 'buying_signal',
        nextNodeId: 'node_close_availability_check',
      },
      {
        id: 'resp_hw_own_router',
        label: '"Can I use my own mesh system?"',
        intent: 'neutral',
        nextNodeId: 'node_own_mesh_compatibility',
      },
    ],
  },

  node_value_reliability: {
    id: 'node_value_reliability',
    stage: 'stage_4_value',
    stageNumber: 4,
    stageName: 'Value Presentation',
    title: 'Weatherproof Fiber Reliability',
    script: "Underground fiber optic glass is impervious to rain, lightning, corrosion, and summer heat waves that break down old copper cable amplifiers. That's why 99.9% uptime is the fiber standard.",
    coachingTip: 'Gives homeowners confidence that they won’t be rebooting their modem every Sunday.',
    responses: [
      {
        id: 'resp_rel_check_addr',
        label: 'Check my address for fiber',
        intent: 'buying_signal',
        nextNodeId: 'node_close_availability_check',
      },
    ],
  },

  node_plan_config_showcase: {
    id: 'node_plan_config_showcase',
    stage: 'stage_4_value',
    stageNumber: 4,
    stageName: 'Value Presentation',
    title: 'Plan Showcase & Comparison',
    script: "Here are our two most popular neighbor tiers: Fiber 300 at $35/mo for everyday streaming and working, or Fiber 1 GIG at $55/mo for power users and heavy multi-device homes. Both include Wi-Fi 6 equipment, unlimited data, and no annual contracts.",
    coachingTip: 'Present both choices clearly. The 500 Mbps plan is an incredible deal, and 1 Gig is only $20 more.',
    reasoning: 'Gives the customer an alternate choice between two positive options rather than a choice between buying or not buying.',
    responses: [
      {
        id: 'resp_plan_pick_500',
        label: 'Prefers Fiber 300 ($35/mo)',
        subtitle: 'Unbeatable everyday value',
        intent: 'buying_signal',
        nextNodeId: 'node_close_offer_presentation',
        contextUpdate: { selectedPlanId: 'plan_fiber_300' },
      },
      {
        id: 'resp_plan_pick_1000',
        label: 'Prefers Fiber 1 GIG ($55/mo)',
        subtitle: 'Top choice for families & WFH',
        intent: 'buying_signal',
        nextNodeId: 'node_close_offer_presentation',
        contextUpdate: { selectedPlanId: 'plan_fiber_1000' },
      },
      {
        id: 'resp_plan_ask_eligibility',
        label: 'Verify address eligibility first',
        subtitle: 'Wants to confirm line drop',
        intent: 'positive',
        nextNodeId: 'node_close_availability_check',
      },
    ],
  },

  // --- Specific Value Explanations ---
  node_value_fiber_vs_cable: {
    id: 'node_value_fiber_vs_cable',
    stage: 'stage_4_value',
    stageNumber: 4,
    stageName: 'Value Presentation',
    title: 'Fiber vs Cable Explained',
    script: "Cable internet travels over copper coaxial wires originally built for analog television in the 1980s. Pure fiber optic internet transmits data at the speed of light through ultra-thin glass strands. It has zero electrical interference, 10x faster uploads, and doesn't slow down during peak neighborhood hours.",
    coachingTip: 'Use simple analogies like light vs electricity or dedicated highway vs crowded side street.',
    responses: [
      {
        id: 'resp_fvc_see_plans',
        label: 'See available plans & rates',
        intent: 'positive',
        nextNodeId: 'node_plan_config_showcase',
      },
      {
        id: 'resp_fvc_check_addr',
        label: 'Check address availability',
        intent: 'buying_signal',
        nextNodeId: 'node_close_availability_check',
      },
    ],
  },

  node_value_fiber_vs_5g: {
    id: 'node_value_fiber_vs_5g',
    stage: 'stage_4_value',
    stageNumber: 4,
    stageName: 'Value Presentation',
    title: 'Fiber vs 5G Cellular Home Internet',
    script: "5G Home Internet is a wireless box that talks to cellular phone towers—it's great where there are no wires, but cellular can fluctuate. T-Mobile Fiber is a 100% hardwired physical glass line buried underground right to your foundation. It is the fastest, most stable internet technology on the planet.",
    coachingTip: 'Clear up any confusion immediately. Reps frequently get asked if this is just a wireless cellular box.',
    responses: [
      {
        id: 'resp_fv5_got_it',
        label: '"Oh, that\'s way better. What\'s the price?"',
        intent: 'buying_signal',
        nextNodeId: 'node_plan_config_showcase',
      },
    ],
  },

  node_trust_no_contract: {
    id: 'node_trust_no_contract',
    stage: 'stage_4_value',
    stageNumber: 4,
    stageName: 'Value Presentation',
    title: 'No Annual Contracts Guarantee',
    script: "We have zero annual contracts and zero cancellation penalties. If you aren't completely blown away by the speed and reliability every single month, you can cancel at any time with no fees. That's how confident we are in our fiber network.",
    coachingTip: 'Remind them: companies that lock you into contracts do so because they know people would leave otherwise.',
    responses: [
      {
        id: 'resp_nc_ready_close',
        label: 'Check address eligibility',
        intent: 'buying_signal',
        nextNodeId: 'node_close_availability_check',
      },
    ],
  },

  node_no_hidden_fees: {
    id: 'node_no_hidden_fees',
    stage: 'stage_4_value',
    stageNumber: 4,
    stageName: 'Value Presentation',
    title: 'Zero Hidden Fees Commitment',
    script: "There are no equipment rental fees, no activation line items, and no surprise data overage charges. What we quote you on your confirmation screen is your exact recurring monthly rate.",
    coachingTip: 'People are traumatized by cable bills. Total transparency wins their trust.',
    responses: [
      {
        id: 'resp_nhf_view_rates',
        label: 'Show me the rates',
        intent: 'positive',
        nextNodeId: 'node_plan_config_showcase',
      },
      {
        id: 'resp_nhf_check_house',
        label: 'Check my house',
        intent: 'buying_signal',
        nextNodeId: 'node_close_availability_check',
      },
    ],
  },

  node_tech_install_process: {
    id: 'node_tech_install_process',
    stage: 'stage_4_value',
    stageNumber: 4,
    stageName: 'Value Presentation',
    title: 'Clean Professional Installation',
    script: "Our certified technician runs an ultra-thin fiber line from the street underground to your exterior junction, places our compact Wi-Fi 6 gateway in your optimal room, tests the signal on your phone, and ensures every device connects smoothly. Clean, professional, and zero disruption.",
    coachingTip: 'Address worries about torn-up lawns or messy wires.',
    responses: [
      {
        id: 'resp_inst_schedule',
        label: 'When can we get scheduled?',
        intent: 'buying_signal',
        nextNodeId: 'node_close_availability_check',
      },
    ],
  },

  node_wifi_seamless_switch: {
    id: 'node_wifi_seamless_switch',
    stage: 'stage_4_value',
    stageNumber: 4,
    stageName: 'Value Presentation',
    title: 'Zero-Reconfiguration Wi-Fi Hack',
    script: "Here's the trick our techs do for every homeowner: We configure the new fiber Wi-Fi name and password to be the exact same as your current network. The second we turn it on, all your smart TVs, tablets, Ring cameras, and laptops connect instantly without you changing a single setting!",
    coachingTip: 'Homeowners love this tip. It eliminates the dread of re-typing passwords on 20 smart gadgets.',
    responses: [
      {
        id: 'resp_wss_love_that',
        label: '"That is genius. Let\'s check my address"',
        intent: 'buying_signal',
        nextNodeId: 'node_close_availability_check',
      },
    ],
  },

  node_own_mesh_compatibility: {
    id: 'node_own_mesh_compatibility',
    stage: 'stage_4_value',
    stageNumber: 4,
    stageName: 'Value Presentation',
    title: 'Third-Party Mesh Compatibility',
    script: "If you have your own Eero, Google Nest Wi-Fi, Orbi, or custom router setup, our fiber gateway easily switches into IP Passthrough/Bridge mode. You keep your existing mesh network exactly as it is, but supercharge the internet pipe feeding it!",
    coachingTip: 'Tech-savvy homeowners with expensive mesh setups appreciate that we don’t force them to throw their gear away.',
    responses: [
      {
        id: 'resp_mesh_check_addr',
        label: 'Awesome, check my address',
        intent: 'buying_signal',
        nextNodeId: 'node_close_availability_check',
      },
    ],
  },

  node_tmobile_5g_to_fiber_upgrade: {
    id: 'node_tmobile_5g_to_fiber_upgrade',
    stage: 'stage_4_value',
    stageNumber: 4,
    stageName: 'Value Presentation',
    title: '5G Home to Pure Fiber Upgrade',
    script: "You've been great on our 5G Home Internet! But now that our physical fiber cables are in the ground right on your street, we can upgrade your home to dedicated symmetrical fiber with lower latency, higher bandwidth, and keep your existing account perks intact.",
    coachingTip: 'They already trust T-Mobile. This is a direct tech upgrade for an existing brand enthusiast.',
    responses: [
      {
        id: 'resp_tm_upg_yes',
        label: 'Yes, let\'s upgrade to fiber',
        intent: 'buying_signal',
        nextNodeId: 'node_close_availability_check',
      },
    ],
  },

  node_tmobile_cell_bundle_pitch: {
    id: 'node_tmobile_cell_bundle_pitch',
    stage: 'stage_4_value',
    stageNumber: 4,
    stageName: 'Value Presentation',
    title: 'T-Mobile Phone Customer Discount',
    script: "Having your phone service with T-Mobile qualifies you for our exclusive customer loyalty credit! You can get true 500 Mbps fiber for as low as $30–$35/mo with AutoPay, or 1 Gig for $50/mo. All on one unified, simple account.",
    coachingTip: 'Highlight the exclusive $10–$15 monthly discount reserved for wireless subscribers.',
    responses: [
      {
        id: 'resp_cell_bundle_check',
        label: 'Check my address for the bundle',
        intent: 'buying_signal',
        nextNodeId: 'node_close_availability_check',
      },
    ],
  },

  node_bundle_discovery: {
    id: 'node_bundle_discovery',
    stage: 'stage_4_value',
    stageNumber: 4,
    stageName: 'Value Presentation',
    title: 'Cable Bundle Disentanglement',
    script: "Most cable bundles charge $120 to $180 a month, with $40 just in cable box rentals and broadcast fees! Most neighbors keep their live sports and news on YouTube TV or Hulu + Live TV for half the cost, paired with pure fiber. You save $600 to $900 a year while watching the exact same channels.",
    coachingTip: 'Help them separate the internet line from the expensive cable TV box fees.',
    responses: [
      {
        id: 'resp_bd_interested_streaming',
        label: 'Interested in cutting the cable bill',
        intent: 'positive',
        nextNodeId: 'node_value_savings_cost',
      },
      {
        id: 'resp_bd_wants_to_keep_cable',
        label: 'Prefers keeping cable TV box',
        intent: 'neutral',
        nextNodeId: 'node_terminal_satisfied_customer',
      },
    ],
  },

  node_contract_buyout_process: {
    id: 'node_contract_buyout_process',
    stage: 'stage_4_value',
    stageNumber: 4,
    stageName: 'Value Presentation',
    title: 'Contract Buyout Assistance',
    script: "T-Mobile helps reimburse early termination fees from your old provider when you switch to fiber. Once your fiber is installed, you upload your final bill from your old company and T-Mobile sends you a prepaid card to cover the fee.",
    coachingTip: 'Takes away their fear of penalty fees.',
    responses: [
      {
        id: 'resp_cb_check_elig',
        label: 'Check address availability for buyout',
        intent: 'buying_signal',
        nextNodeId: 'node_close_availability_check',
      },
    ],
  },

  node_pure_fiber_differentiator: {
    id: 'node_pure_fiber_differentiator',
    stage: 'stage_4_value',
    stageNumber: 4,
    stageName: 'Value Presentation',
    title: '100% Pure Fiber-to-the-Home',
    script: "Many cable and telephone companies market their internet as 'fiber backed', but the last mile into your house is still old copper cable. T-Mobile Fiber is 100% pure glass fiber all the way into your home's gateway. True fiber, zero copper bottlenecks.",
    coachingTip: 'Clarifies the difference between hybrid fiber-coax (HFC) and pure FTTH (Fiber to the Home).',
    responses: [
      {
        id: 'resp_pfd_rates',
        label: 'Show rates and availability',
        intent: 'buying_signal',
        nextNodeId: 'node_close_availability_check',
      },
    ],
  },

  node_close_savings_pitch: {
    id: 'node_close_savings_pitch',
    stage: 'stage_4_value',
    stageNumber: 4,
    stageName: 'Value Presentation',
    title: 'Direct Savings Pitch',
    script: "You're paying top dollar right now for older technology! Switching to T-Mobile Fiber would immediately drop your monthly payment to $35 or $55, putting $300 to $600 back in your pocket this year alone, while giving you pure glass fiber speeds.",
    coachingTip: 'Multiply the monthly savings by 12 to show annual impact.',
    responses: [
      {
        id: 'resp_csp_close_check',
        label: 'Let\'s check my address and see',
        intent: 'buying_signal',
        nextNodeId: 'node_close_availability_check',
      },
      {
        id: 'resp_csp_show_tiers',
        label: 'Compare the plan tiers',
        intent: 'positive',
        nextNodeId: 'node_plan_config_showcase',
      },
    ],
  },

  // ==========================================
  // STAGE 7: GUIDED CLOSING WORKFLOW
  // ==========================================
  node_close_availability_check: {
    id: 'node_close_availability_check',
    stage: 'stage_7_closing',
    stageNumber: 7,
    stageName: 'Closing Process',
    title: 'Step 1 & 2: Confirm Interest & Address Check',
    script: "If the availability and pricing check comes back looking good, would you be open to getting it set up?",
    coachingTip: 'This is the classic permission-based qualifying close. Getting a "yes" here clears the runway for an easy enrollment.',
    reasoning: 'Gains mutual alignment before walking through formal address confirmation.',
    responses: [
      {
        id: 'resp_avail_yes_open',
        label: '"Yes, if pricing and speeds are right"',
        subtitle: 'Green light to close',
        intent: 'positive',
        nextNodeId: 'node_close_offer_presentation',
      },
      {
        id: 'resp_avail_just_look',
        label: '"I just want to see the numbers first"',
        subtitle: 'Low pressure check',
        intent: 'neutral',
        nextNodeId: 'node_close_offer_presentation',
      },
      {
        id: 'resp_avail_hesitant_timing',
        label: '"I need to think about it first"',
        subtitle: 'Hesitant timing',
        intent: 'objection',
        nextNodeId: 'node_close_share_package',
      },
    ],
  },

  node_close_offer_presentation: {
    id: 'node_close_offer_presentation',
    stage: 'stage_7_closing',
    stageNumber: 7,
    stageName: 'Closing Process',
    title: 'Step 3: Present Verified Eligible Offers',
    script: "Great news—your address is greenlit for fiber! We can do Fiber 300 for $35/mo or Fiber 1 GIG for $55/mo with AutoPay. Both include the Wi-Fi 6 gateway at $0 and free standard installation. Which of those two fits your home best?",
    coachingTip: 'Use the alternate-choice close: "Which of those two fits your home best?" instead of "Do you want to buy?"',
    reasoning: 'Directs their focus toward picking the ideal speed tier.',
    responses: [
      {
        id: 'resp_off_pick_500',
        label: 'Selects Fiber 300 ($35/mo)',
        intent: 'positive',
        nextNodeId: 'node_close_verify_terms',
        contextUpdate: { selectedPlanId: 'plan_fiber_300' },
      },
      {
        id: 'resp_off_pick_1000',
        label: 'Selects Fiber 1 GIG ($55/mo)',
        intent: 'positive',
        nextNodeId: 'node_close_verify_terms',
        contextUpdate: { selectedPlanId: 'plan_fiber_1000' },
      },
      {
        id: 'resp_off_pick_2000',
        label: 'Selects Fiber 2 GIG ($70/mo)',
        intent: 'positive',
        nextNodeId: 'node_close_verify_terms',
        contextUpdate: { selectedPlanId: 'plan_fiber_2000' },
      },

      {
        id: 'resp_off_pick_5000',
        label: 'Selects Fiber 5 GIG ($90/mo)',
        intent: 'positive',
        nextNodeId: 'node_close_verify_terms',
        contextUpdate: { selectedPlanId: 'plan_fiber_5000' },
      },    ],
  },

  node_close_verify_terms: {
    id: 'node_close_verify_terms',
    stage: 'stage_7_closing',
    stageNumber: 7,
    stageName: 'Closing Process',
    title: 'Step 4: Confirm Pricing & Key Terms',
    script: "Let's review the exact terms so everything is 100% crystal clear: No annual contract, $0 equipment rental fee, $0 installation fee, and unlimited data. You don't pay anything today at the door.",
    coachingTip: 'Confirming key terms builds deep trust right before the final ask.',
    reasoning: 'Ensures full compliance and ethical transparency with no hidden surprises.',
    responses: [
      {
        id: 'resp_terms_looks_great',
        label: 'Terms confirmed / Looks great',
        intent: 'positive',
        nextNodeId: 'node_close_ask_sale',
      },
      {
        id: 'resp_terms_clarify',
        label: '"When is the first bill due?"',
        intent: 'neutral',
        nextNodeId: 'node_first_bill_explanation',
      },
    ],
  },

  node_first_bill_explanation: {
    id: 'node_first_bill_explanation',
    stage: 'stage_7_closing',
    stageNumber: 7,
    stageName: 'Closing Process',
    title: 'Billing Cycle Explanation',
    script: "Your first bill only generates after your service is physically installed and tested. You never pay a penny at the door, and you have time to see it in action before your first cycle.",
    coachingTip: 'Remind them: reps never collect payments at the door.',
    responses: [
      {
        id: 'resp_fbe_ready',
        label: 'Ready to finalize order',
        intent: 'positive',
        nextNodeId: 'node_close_ask_sale',
      },
    ],
  },

  node_close_ask_sale: {
    id: 'node_close_ask_sale',
    stage: 'stage_7_closing',
    stageNumber: 7,
    stageName: 'Closing Process',
    title: 'Step 5: Ask for the Sale (Choose Style)',
    script: "Let's get this reserved on the calendar so you lock in the neighbor rate. We have morning or afternoon install windows available this week—which works better for you?",
    coachingTip: 'Choose between Assumptive Close, Savings Close, Convenience Close, or Soft Close depending on the customer temperament.',
    reasoning: 'Advances naturally to scheduling an installation window.',
    responses: [
      {
        id: 'resp_close_morning',
        label: 'Mornings (8 AM – 12 PM)',
        intent: 'positive',
        nextNodeId: 'node_close_enrollment_redirect',
      },
      {
        id: 'resp_close_afternoon',
        label: 'Afternoons (1 PM – 5 PM)',
        intent: 'positive',
        nextNodeId: 'node_close_enrollment_redirect',
      },
      {
        id: 'resp_close_weekends',
        label: 'Weekend preferred',
        intent: 'positive',
        nextNodeId: 'node_close_enrollment_redirect',
      },
    ],
  },

  node_close_enrollment_redirect: {
    id: 'node_close_enrollment_redirect',
    stage: 'stage_7_closing',
    stageNumber: 7,
    stageName: 'Closing Process',
    title: 'Step 6: Direct Authorized Enrollment',
    script: "Awesome! Let's pull up the official T-Mobile enrollment screen right here on the tablet (or I can send the secure link directly to your mobile phone) to confirm your appointment and lock in your order.",
    coachingTip: 'Hand over tablet or text official link. Remind them: we never collect credit card info in PitchPilot.',
    reasoning: 'Strict boundary: official order processing happens only through authorized corporate channels.',
    responses: [
      {
        id: 'resp_enr_completed',
        label: 'Order completed successfully!',
        subtitle: 'Sale finalized in official system',
        intent: 'positive',
        nextNodeId: 'node_close_next_steps',
      },
      {
        id: 'resp_enr_sent_link',
        label: 'Sent link to customer phone',
        subtitle: 'Customer completing on own device',
        intent: 'positive',
        nextNodeId: 'node_terminal_qualified_lead',
      },
    ],
  },

  node_close_next_steps: {
    id: 'node_close_next_steps',
    stage: 'stage_7_closing',
    stageNumber: 7,
    stageName: 'Closing Process',
    title: 'Step 7: Confirm Next Steps & Welcome',
    script: "You're all set! You'll receive a confirmation text from T-Mobile with your tech's arrival window. Remember: keep your old service active until our fiber is running and tested. Welcome to the T-Mobile Fiber family!",
    coachingTip: 'Congratulate them warmly, leave your contact card, and thank them for their time.',
    reasoning: 'Prevents buyer remorse and sets crystal-clear expectations for install day.',
    responses: [
      {
        id: 'resp_finish_sale',
        label: 'Record Completed Sale & Finish',
        intent: 'positive',
        nextNodeId: 'node_terminal_sale',
      },
    ],
  },

  node_close_wfh_assurance: {
    id: 'node_close_wfh_assurance',
    stage: 'stage_7_closing',
    stageNumber: 7,
    stageName: 'Closing Process',
    title: 'Zero Downtime Guarantee Close',
    script: "Here's my personal guarantee: Do not touch your old modem. Our technician installs the fiber line, sets up the Wi-Fi gateway, and does a live speed test with you. Only after you see 500 or 1,000 Mbps working on your work computer do you cancel your old provider.",
    coachingTip: 'This removes 100% of the risk for the homeowner.',
    responses: [
      {
        id: 'resp_wfh_assure_proceed',
        label: '"Okay, that works for me. Let\'s do it"',
        intent: 'positive',
        nextNodeId: 'node_close_offer_presentation',
      },
    ],
  },

  node_close_share_package: {
    id: 'node_close_share_package',
    stage: 'stage_7_closing',
    stageNumber: 7,
    stageName: 'Closing Process',
    title: 'Share Rate Sheet / Follow-Up',
    script: "Totally respect that! What is the best cell number to text you the exact rate sheet with the neighbor promotion? That way you have it right in your pocket to look over together.",
    coachingTip: 'Always get a number for a text quote rather than just a paper flyer that gets thrown away.',
    responses: [
      {
        id: 'resp_share_gives_num',
        label: 'Provided phone number for follow-up',
        intent: 'positive',
        nextNodeId: 'node_terminal_followup_lead',
      },
      {
        id: 'resp_share_flyer_only',
        label: 'Prefers paper flyer only',
        intent: 'neutral',
        nextNodeId: 'node_terminal_followup_lead',
      },
    ],
  },

  // ==========================================
  // TERMINAL NODES (OUTCOMES)
  // ==========================================
  node_terminal_sale: {
    id: 'node_terminal_sale',
    stage: 'stage_7_closing',
    stageNumber: 7,
    stageName: 'Closing Process',
    title: 'Sale Completed',
    script: "Great job! The sale has been completed and scheduled.",
    isTerminal: true,
    terminalType: 'sale',
    responses: [],
  },

  node_terminal_qualified_lead: {
    id: 'node_terminal_qualified_lead',
    stage: 'stage_7_closing',
    stageNumber: 7,
    stageName: 'Closing Process',
    title: 'Qualified Lead Saved',
    script: "Customer qualified and link or appointment sent for completion.",
    isTerminal: true,
    terminalType: 'qualified_lead',
    responses: [],
  },

  node_terminal_followup_lead: {
    id: 'node_terminal_followup_lead',
    stage: 'stage_1_opening',
    stageNumber: 1,
    stageName: 'Opening Pitch',
    title: 'Follow-Up Requested',
    script: "Flyer or follow-up text sent to customer for review.",
    isTerminal: true,
    terminalType: 'follow_up',
    responses: [],
  },

  node_terminal_satisfied_customer: {
    id: 'node_terminal_satisfied_customer',
    stage: 'stage_3_satisfaction',
    stageNumber: 3,
    stageName: 'Customer Satisfaction',
    title: 'Satisfied Customer Left with Good Impression',
    script: "Friendly, non-pushy interaction completed. Customer has fiber info if their provider ever lets them down.",
    isTerminal: true,
    terminalType: 'not_interested',
    responses: [],
  },

  node_terminal_not_interested: {
    id: 'node_terminal_not_interested',
    stage: 'stage_1_opening',
    stageNumber: 1,
    stageName: 'Opening Pitch',
    title: 'Respectful Exit',
    script: "Clear refusal acknowledged politely without excessive pressure.",
    isTerminal: true,
    terminalType: 'not_interested',
    responses: [],
  },

  node_terminal_not_eligible: {
    id: 'node_terminal_not_eligible',
    stage: 'stage_7_closing',
    stageNumber: 7,
    stageName: 'Closing Process',
    title: 'Not Yet Eligible',
    script: "Address outside active construction drop zone. Added to waitlist notify list.",
    isTerminal: true,
    terminalType: 'not_eligible',
    responses: [],
  },

  node_terminal_no_answer: {
    id: 'node_terminal_no_answer',
    stage: 'stage_1_opening',
    stageNumber: 1,
    stageName: 'Opening Pitch',
    title: 'No Answer / Quick Brush-Off',
    script: "Brief interaction recorded.",
    isTerminal: true,
    terminalType: 'no_answer',
    responses: [],
  },

  // Supporting overlay hooks
  node_obj_not_interested: {
    id: 'node_obj_not_interested',
    stage: 'stage_1_opening',
    stageNumber: 1,
    stageName: 'Opening Pitch',
    title: 'Handling Initial Not Interested',
    script: "Totally get it—most people say that before they know why we're here! We aren't asking you to switch today; our crews are just running dedicated fiber lines down the road. Out of curiosity, who currently provides your home Wi-Fi?",
    coachingTip: 'Validate their natural defensiveness, remove pressure, and ask an easy factual question.',
    responses: [
      {
        id: 'resp_oni_shares_provider',
        label: 'Names provider (Cox, Centurylink, etc)',
        intent: 'positive',
        nextNodeId: 'node_disc_cost',
      },
      {
        id: 'resp_oni_firm_no',
        label: '"Really, not interested at all"',
        intent: 'negative',
        nextNodeId: 'node_terminal_not_interested',
      },
    ],
  },

  node_obj_no_thanks: {
    id: 'node_obj_no_thanks',
    stage: 'stage_1_opening',
    stageNumber: 1,
    stageName: 'Opening Pitch',
    title: 'Handling No Thanks',
    script: "Glad to hear your connection is holding up! That's actually rare in this pocket. Just out of curiosity, does your price stay fixed, or do they bump it up every year?",
    coachingTip: 'Praise their situation first. People drop their guard when you compliment their connection.',
    responses: [
      {
        id: 'resp_ont_price_creeps',
        label: '"Yeah, the bill went up recently"',
        intent: 'positive',
        nextNodeId: 'node_sat_price_increase',
      },
      {
        id: 'resp_ont_firm_exit',
        label: '"No thanks, take care"',
        intent: 'negative',
        nextNodeId: 'node_terminal_not_interested',
      },
    ],
  },

  node_soft_qualify: {
    id: 'node_soft_qualify',
    stage: 'stage_1_opening',
    stageNumber: 1,
    stageName: 'Opening Pitch',
    title: 'Soft Qualification',
    script: "Completely fair! If you ever see your bill creep up or your speeds drop during peak evening hours, remember T-Mobile Fiber is in the ground right on your street. Have a wonderful day!",
    coachingTip: 'Leave on a high note. A good impression keeps the door open for future outreach.',
    responses: [
      {
        id: 'resp_sq_takes_card',
        label: 'Takes card / friendly goodbye',
        intent: 'neutral',
        nextNodeId: 'node_terminal_followup_lead',
      },
    ],
  },

  node_low_cost_qualify: {
    id: 'node_low_cost_qualify',
    stage: 'stage_3_satisfaction',
    stageNumber: 3,
    stageName: 'Customer Satisfaction',
    title: 'Low Cost Exploration',
    script: "Under $40 is a great deal! Keep that as long as you can. Does that price have an expiration date, or does it include your router rental fee?",
    coachingTip: 'Don\'t try to take away a legitimately good deal. Look for expiring promotional terms or speed limits.',
    responses: [
      {
        id: 'resp_lcq_promo_expiring',
        label: 'Promo ends in a couple months',
        intent: 'positive',
        nextNodeId: 'node_sat_price_increase',
      },
      {
        id: 'resp_lcq_perm_happy',
        label: 'Permanent government subsidy / Happy',
        intent: 'neutral',
        nextNodeId: 'node_terminal_satisfied_customer',
      },
    ],
  },

  node_speed_comparison: {
    id: 'node_speed_comparison',
    stage: 'stage_4_value',
    stageNumber: 4,
    stageName: 'Value Presentation',
    title: 'Speed Comparison',
    script: "If 25 or 50 Megabits is handling everything you need, that's great! But if anyone ever complains about video buffering, gaming lag, or slow file uploads, our 500 Meg fiber is 10x faster for just $35 a month.",
    coachingTip: 'Frame the speed difference in multiples (10x faster) for tangible comprehension.',
    responses: [
      {
        id: 'resp_sc_check_addr',
        label: 'Check my address',
        intent: 'buying_signal',
        nextNodeId: 'node_close_availability_check',
      },
      {
        id: 'resp_sc_keep_current',
        label: 'Will stick with current for now',
        intent: 'neutral',
        nextNodeId: 'node_terminal_satisfied_customer',
      },
    ],
  },

  node_promo_ending_bridge: {
    id: 'node_promo_ending_bridge',
    stage: 'stage_4_value',
    stageNumber: 4,
    stageName: 'Value Presentation',
    title: 'Expiring Promotion Solution',
    script: "Cable companies love the 12-month teaser rate that jumps $30 on month 13! With T-Mobile Fiber, you lock in your rate with zero surprise annual hikes. Would you like to check what your address qualifies for?",
    coachingTip: 'Help them avoid the shock of the next month\'s statement.',
    responses: [
      {
        id: 'resp_peb_check_now',
        label: 'Yes, check my address',
        intent: 'buying_signal',
        nextNodeId: 'node_close_availability_check',
      },
    ],
  },
};
