import { TrainingScenario } from '../types';

export const TRAINING_SCENARIOS: TrainingScenario[] = [
  {
    id: 'scen_satisfied_cox',
    title: 'Satisfied Cox Customer',
    homeownerPersona: 'Suburban homeowner, 40s, works in finance',
    currentProvider: 'Cox Cable ($75/mo)',
    situation: 'Happy with current internet and does not feel a pressing need to switch.',
    homeownerOpeningResponse: "We have Cox, and honestly we're completely fine. No complaints at all.",
    turns: [
      {
        homeownerSays: "We have Cox, and honestly we're completely fine. No complaints at all.",
        options: [
          {
            id: 'opt_1',
            repSpeech: "That's good! No reason to fix something that isn't broken. Out of curiosity, if you could keep that exact same reliability and speed, but bring your monthly cost down to $35 or $55 with zero price hikes, would that be worth a quick look?",
            isBest: true,
            score: 100,
            feedback: "Perfect approach! You validated their satisfaction instead of arguing, disarming their guard, then introduced pure financial upside without pressure.",
            nextTurnIndex: 1,
          },
          {
            id: 'opt_2',
            repSpeech: "Well Cox is coaxial cable and slow on uploads. You really should upgrade to pure fiber before your connection fails.",
            isBest: false,
            score: 25,
            feedback: "Poor approach. Criticizing a provider the customer just said they like makes them defensive and kills rapport.",
            nextTurnIndex: 1,
          },
          {
            id: 'opt_3',
            repSpeech: "Are you sure? Everyone else on this street told me Cox was terrible.",
            isBest: false,
            score: 10,
            feedback: "Aggressive and argumentative. Never challenge a homeowner's personal lived experience.",
            nextTurnIndex: 1,
          },
        ],
      },
      {
        homeownerSays: "Well, what does it cost? I'm currently paying $75 a month.",
        options: [
          {
            id: 'opt_4',
            repSpeech: "You're paying $75 for cable! We have 500 Meg fiber for $35/mo and 1 Gig for $55/mo with Wi-Fi 6 equipment included and no contracts. That puts $240 to $480 back in your pocket every year. Can we check if your line is ready?",
            isBest: true,
            score: 100,
            feedback: "Excellent! You highlighted the exact annual dollar savings ($240–$480) and contrasted it with zero contract risk, then asked an easy closing question.",
          },
          {
            id: 'opt_5',
            repSpeech: "It depends, give me your credit card and I'll see what special promos pop up.",
            isBest: false,
            score: 0,
            feedback: "Never ask for payment details at the door. Violates security policy and triggers scam alarms.",
          },
          {
            id: 'opt_6',
            repSpeech: "It's around $55. Let me leave a brochure on your porch.",
            isBest: false,
            score: 50,
            feedback: "A bit passive. When a customer directly asks 'what does it cost', anchor the savings and propose checking address qualification.",
          },
        ],
      },
    ],
  },
  {
    id: 'scen_price_sensitive',
    title: 'Price-Sensitive Homeowner',
    homeownerPersona: 'Budget-conscious parent managing monthly household expenses',
    currentProvider: 'Spectrum ($92/mo after promo ended)',
    situation: 'Frustrated by creeping bills, terrified of surprise hidden fees and contracts.',
    homeownerOpeningResponse: "I pay Spectrum $92 a month and it keeps going up. I can't afford another expensive bill.",
    turns: [
      {
        homeownerSays: "I pay Spectrum $92 a month and it keeps going up. I can't afford another expensive bill.",
        options: [
          {
            id: 'opt_p1',
            repSpeech: "Yeah, that rate creep is maddening! You sign up for $50 and suddenly you're at $92. With T-Mobile Fiber, what you see is what you pay—our 500 Meg plan is just $35/mo flat with the router included and no annual contracts. Would saving $57 a month help the household budget?",
            isBest: true,
            score: 100,
            feedback: "Outstanding! Empathizes with the pain of creeping bills, provides the transparent flat rate ($35), and frames the concrete monthly dollar relief ($57/mo).",
            nextTurnIndex: 1,
          },
          {
            id: 'opt_p2',
            repSpeech: "You should get our 2 Gig plan for $75, it's faster than Spectrum.",
            isBest: false,
            score: 30,
            feedback: "Tone-deaf to their budget concern. When someone says they are pinching pennies, lead with the high-value $35 tier.",
            nextTurnIndex: 1,
          },
        ],
      },
      {
        homeownerSays: "Is that $35 really the final price, or is it going to jump to $90 next year like Spectrum did?",
        options: [
          {
            id: 'opt_p3',
            repSpeech: "Zero promotional expiration cliffs, zero router rental fees, and zero annual contract. What we quote on your screen is your locked-in rate. If you ever feel dissatisfied, you can cancel anytime with zero penalties.",
            isBest: true,
            score: 100,
            feedback: "Spot on! Addresses their core skepticism about telecom bait-and-switch tactics directly with contract-free guarantees.",
          },
          {
            id: 'opt_p4',
            repSpeech: "Well, all telecom prices change eventually, you know how it is.",
            isBest: false,
            score: 20,
            feedback: "Vague and uninspiring. Always reiterate T-Mobile's transparent pricing commitment.",
          },
        ],
      },
    ],
  },
  {
    id: 'scen_skeptical_homeowner',
    title: 'Skeptical Homeowner',
    homeownerPersona: 'Protective resident, cautious about strangers knocking on door',
    currentProvider: 'Unknown',
    situation: 'Suspicious of door-to-door sales, worried about scams.',
    homeownerOpeningResponse: "Who are you and what are you selling? Is this a scam?",
    turns: [
      {
        homeownerSays: "Who are you and what are you selling? Is this a scam?",
        options: [
          {
            id: 'opt_s1',
            repSpeech: "I don't blame you at all for being cautious—there are definitely shady people out there. I'm with T-Mobile, here is my official company badge with my rep ID, and you can see our work vans on the corner. We aren't selling anything today; our crews are installing fiber lines on the street.",
            isBest: true,
            score: 100,
            feedback: "Masterclass! You completely validated their caution, showed proof of legitimacy, pointed to the neighborhood work, and lowered sales pressure.",
            nextTurnIndex: 1,
          },
          {
            id: 'opt_s2',
            repSpeech: "No, obviously it's not a scam, I'm wearing a magenta shirt!",
            isBest: false,
            score: 15,
            feedback: "Snarky and defensive. Anyone can buy a magenta shirt; showing your verified credentials builds genuine trust.",
            nextTurnIndex: 1,
          },
        ],
      },
      {
        homeownerSays: "Okay, I see your badge. What are you guys actually doing here?",
        options: [
          {
            id: 'opt_s3',
            repSpeech: "Our engineering crews are activating pure glass fiber down this street so residents have a modern alternative to coaxial copper cable. We're just checking who neighbors are currently using to make sure they know their address is eligible for the new lines.",
            isBest: true,
            score: 100,
            feedback: "Clear, factual, and informative. Positions you as an infrastructure specialist rather than a pushy salesperson.",
          },
          {
            id: 'opt_s4',
            repSpeech: "We're signing everyone on the block up for new internet today. What's your name?",
            isBest: false,
            score: 25,
            feedback: "Too aggressive. Rushing to sign them up before establishing interest will cause them to shut the door.",
          },
        ],
      },
    ],
  },
  {
    id: 'scen_hurry_homeowner',
    title: 'Customer in a Hurry',
    homeownerPersona: 'Busy professional holding car keys and coat',
    currentProvider: 'CenturyLink',
    situation: 'On their way out the door for an appointment, zero tolerance for a long pitch.',
    homeownerOpeningResponse: "Hey, I have to leave in 30 seconds for an appointment.",
    turns: [
      {
        homeownerSays: "Hey, I have to leave in 30 seconds for an appointment.",
        options: [
          {
            id: 'opt_h1',
            repSpeech: "I'll be 15 seconds! T-Mobile just brought 500 Meg fiber to this block for $35/mo. What's the best cell number to text you the 1-page neighbor flyer so you can check it later?",
            isBest: true,
            score: 100,
            feedback: "Brilliant execution. Respects their urgent time constraint, summarizes the headline offer ($35), and asks for a fast 1-tap text lead.",
          },
          {
            id: 'opt_h2',
            repSpeech: "Wait, just give me 5 minutes, this is really important for your Wi-Fi speeds!",
            isBest: false,
            score: 0,
            feedback: "Disrespects their stated boundary. When someone says 30 seconds, never ask for 5 minutes.",
          },
        ],
      },
    ],
  },
  {
    id: 'scen_interested_hesitant',
    title: 'Interested but Hesitant',
    homeownerPersona: 'Remote worker, interested in fiber speeds but scared of downtime',
    currentProvider: 'Cox ($85/mo)',
    situation: 'Needs fast internet for work, but cannot risk losing connection for a single morning.',
    homeownerOpeningResponse: "I work from home all day. Fiber sounds nice, but I cannot have my internet go down for even two hours to switch.",
    turns: [
      {
        homeownerSays: "I work from home all day. Fiber sounds nice, but I cannot have my internet go down for even two hours to switch.",
        options: [
          {
            id: 'opt_ih1',
            repSpeech: "That's exactly why our WFH switch process has ZERO gap downtime: You keep your current Cox internet 100% active while our technician installs the fiber. You test your video calls and laptop speeds on our fiber first, and only cancel Cox once you know it's working flawlessly.",
            isBest: true,
            score: 100,
            feedback: "Flawless reassurance! The zero-gap overlapping switch eliminates the #1 fear of work-from-home customers.",
            nextTurnIndex: 1,
          },
          {
            id: 'opt_ih2',
            repSpeech: "It's only down for maybe an hour or two, you can just use phone hotspot.",
            isBest: false,
            score: 20,
            feedback: "Dismisses their professional anxiety. Hotspots can be unreliable during Zoom presentations.",
            nextTurnIndex: 1,
          },
        ],
      },
      {
        homeownerSays: "Wait, so both connections run side-by-side until I decide to cancel Cox?",
        options: [
          {
            id: 'opt_ih3',
            repSpeech: "Exactly! Side-by-side. You have complete control. If the availability check looks clean, would you like to pick an install window for this week?",
            isBest: true,
            score: 100,
            feedback: "Perfect permission close! Confirm the reassurance and naturally transition into scheduling.",
          },
        ],
      },
    ],
  },
  {
    id: 'scen_technical_questions',
    title: 'Customer with Technical Questions',
    homeownerPersona: 'Software engineer / tech hobbyist with home lab and own mesh Wi-Fi',
    currentProvider: 'Local cable ($80/mo)',
    situation: 'Wants to know exact technical details: latency, IP passthrough, upload bandwidth.',
    homeownerOpeningResponse: "I already have an expensive UniFi network and Eero mesh. Do you support bridge mode, and what is your latency?",
    turns: [
      {
        homeownerSays: "I already have an expensive UniFi network and Eero mesh. Do you support bridge mode, and what is your latency?",
        options: [
          {
            id: 'opt_t1',
            repSpeech: "Yes! Our fiber gateway supports full IP Passthrough and Bridge Mode, so your UniFi gateway handles all DHCP, VLANs, and routing without double-NAT. Latency is single-digit (<5ms) with full symmetrical gigabit uploads.",
            isBest: true,
            score: 100,
            feedback: "Phenomenal! Demonstrating solid technical literacy builds instant credibility with power users and engineers.",
          },
          {
            id: 'opt_t2',
            repSpeech: "You have to throw away your router and use our white box.",
            isBest: false,
            score: 5,
            feedback: "Disastrous answer. Tech enthusiasts invested hundreds in their networking gear and will reject any ISP that requires ditching it.",
          },
        ],
      },
    ],
  },
];
