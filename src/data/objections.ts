import { ObjectionItem } from '../types';

export const OBJECTIONS_DATA: ObjectionItem[] = [
  // --- DISMISSIVE OBJECTIONS ---
  {
    id: 'obj_not_interested',
    title: 'Not Interested',
    category: 'dismissive',
    customerPhrase: "I'm not interested.",
    repScript: "Totally get it—most people say that before they know why we're here. We aren't asking you to switch today; our crews are just running dedicated fiber lines down the road. Out of curiosity, who currently provides your Wi-Fi?",
    followUpQuestion: "Are you getting the exact speeds you're paying for, or does it ever lag when everyone is home?",
    whyThisWorks: "Validates their initial reaction without arguing, reframes the visit from a hard sell to a neighborhood upgrade update, and poses an easy low-friction question.",
    reactions: [
      {
        reaction: 'Names their provider (e.g. "We have Cox")',
        nextNodeId: 'node_provider_cox',
        suggestedScript: "Gotcha, Cox has been here a long time. About what are they charging you each month right now?",
        note: 'Moves directly into discovery stage.',
      },
      {
        reaction: 'Still hesitant ("Really, we are fine")',
        nextNodeId: 'node_soft_qualify',
        suggestedScript: "Completely fair. If you ever see your bill creep up or speeds drop during peak hours, keep an eye out for our fiber trucks. Have a great afternoon!",
        note: 'Leaves a clean, positive impression.',
      },
      {
        reaction: 'Asks a question ("Wait, fiber is coming here?")',
        nextNodeId: 'node_value_fiber_performance',
        suggestedScript: "Yes! 100% pure glass fiber right to the home—symmetrical speeds, meaning uploads match downloads. Are you working from home or streaming a lot?",
        note: 'Converts cold dismissal into interest.',
      },
    ],
    respectfulExit: "Understood! Thanks for your time and have a wonderful day.",
  },
  {
    id: 'obj_no_thanks',
    title: 'No Thanks / I’m Good',
    category: 'dismissive',
    customerPhrase: "No thanks, we're all good.",
    repScript: "Glad to hear your connection is holding up! That's actually rare in this pocket. Just out of curiosity, are you locked into a bundle or just standalone internet?",
    followUpQuestion: "Does your price stay fixed, or do they bump it up every year or two?",
    whyThisWorks: "Praises their situation instead of attacking it, then highlights a common pain point: unexpected annual price creep.",
    reactions: [
      {
        reaction: '"Price went up recently"',
        nextNodeId: 'node_sat_price_increase',
        suggestedScript: "That's exactly what all your neighbors said. If we could lock in a lower flat rate with zero annual hikes, would that be worth a 60-second glance?",
      },
      {
        reaction: '"We have a bundle with TV"',
        nextNodeId: 'node_bundle_discovery',
        suggestedScript: "Makes sense. A lot of families keep their streaming and drop the bloated cable box fees when switching to fiber. How much is the total monthly bill?",
      },
      {
        reaction: 'Firm refusal ("Not today, thanks")',
        nextNodeId: 'node_terminal_not_interested',
        suggestedScript: "Totally respect that! Keep an eye out for our crews. Take care!",
      },
    ],
    respectfulExit: "No problem at all! Have a great rest of your week.",
  },
  {
    id: 'obj_not_buying',
    title: 'Not Buying Anything',
    category: 'dismissive',
    customerPhrase: "I'm not buying anything today.",
    repScript: "I couldn't sell you anything right now even if you wanted to! Our construction team is verifying line capacity for the neighborhood first. Who do you guys use right now?",
    followUpQuestion: "Have you ever had pure fiber optic internet, or is it copper cable currently?",
    whyThisWorks: "Instantly removes buying pressure and curiosity-gaps them into the technical infrastructure upgrade.",
    reactions: [
      {
        reaction: 'Curious about fiber vs cable',
        nextNodeId: 'node_value_fiber_vs_cable',
        suggestedScript: "Cable is shared copper wire that slows down when neighbors get on Netflix at 7 PM. Pure fiber is a dedicated light conduit with zero peak slowdown.",
      },
      {
        reaction: 'Shares current provider',
        nextNodeId: 'node_disc_cost',
        suggestedScript: "Awesome. And what do they usually charge you on your monthly statement?",
      },
      {
        reaction: 'Closes door',
        nextNodeId: 'node_terminal_not_interested',
        suggestedScript: "Have a great day!",
      },
    ],
    respectfulExit: "Appreciate the honesty! Enjoy your day.",
  },
  {
    id: 'obj_already_have_internet',
    title: 'Already Have Internet',
    category: 'dismissive',
    customerPhrase: "We already have internet.",
    repScript: "Haha, I'd hope so in 2026! We aren't here because you don't have internet; we're here because fiber is the modern replacement for old coaxial copper cables. Who handles it for you?",
    followUpQuestion: "Does your upload speed match your download, or does it take forever to send video files and backups?",
    whyThisWorks: "Uses humor to acknowledge the obvious, then highlights the technological generational leap from copper to fiber.",
    reactions: [
      {
        reaction: 'Tells provider',
        nextNodeId: 'node_disc_cost',
        suggestedScript: "Gotcha. And what does that usually run you each month?",
      },
      {
        reaction: '"What is fiber exactly?"',
        nextNodeId: 'node_value_fiber_performance',
        suggestedScript: "Instead of electricity through metal cables that corrode, it sends pulses of light through glass. That means identical upload and download speeds with virtually zero latency.",
      },
    ],
    respectfulExit: "Makes total sense. Thanks for answering the door!",
  },

  // --- PRICE OBJECTIONS ---
  {
    id: 'obj_too_expensive',
    title: 'Too Expensive',
    category: 'price',
    customerPhrase: "Fiber sounds too expensive / we can't afford it.",
    repScript: "That's a very common assumption because fiber sounds fancy! But because fiber is cheaper for us to maintain than old copper networks, our plans start at just $35 to $55 a month with equipment included and no hidden fees.",
    followUpQuestion: "What are you currently paying for your home internet?",
    whyThisWorks: "Flips the expectation: modern fiber infrastructure is actually less costly to operate than decaying copper, translating to lower monthly bills.",
    reactions: [
      {
        reaction: 'Pays more than $60',
        nextNodeId: 'node_close_savings_pitch',
        suggestedScript: "You're paying more right now for older technology! Switching would immediately save you $20–$40 a month while upgrading to pure fiber.",
      },
      {
        reaction: 'Pays under $40 on subsidy/promo',
        nextNodeId: 'node_low_cost_qualify',
        suggestedScript: "That's actually a great deal! Keep that until it expires. Does your rate have an expiration date?",
      },
      {
        reaction: 'Still worried about hidden add-ons',
        nextNodeId: 'node_no_hidden_fees',
        suggestedScript: "We guarantee no router rental fees, no data cap overages, and no surprise annual price hikes. The price on the flyer is the price on the bill.",
      },
    ],
    respectfulExit: "Totally understand watching the budget. If you ever want to check our rates, you can visit t-mobile.com/fiber anytime.",
  },
  {
    id: 'obj_already_pay_less',
    title: 'I Already Pay Less',
    category: 'price',
    customerPhrase: "I already pay way less than that.",
    repScript: "Nice! Finding a good rate right now is tough. Just curious—is that an introductory promotional rate, or a permanent price with equipment fees included?",
    followUpQuestion: "And what speed are they delivering for that price?",
    whyThisWorks: "Validates their price consciousness and gently probes for expiring discounts and hidden equipment rentals.",
    reactions: [
      {
        reaction: 'It is a promo expiring soon',
        nextNodeId: 'node_promo_ending_bridge',
        suggestedScript: "Right, cable companies love the 12-month teaser rate that jumps $30 on month 13. With T-Mobile Fiber, you lock in your rate with zero surprise hikes.",
      },
      {
        reaction: 'Genuinely cheap slow DSL',
        nextNodeId: 'node_speed_comparison',
        suggestedScript: "If 25 Mbps is doing what you need, stick with it! But if you ever experience buffering when 2 or 3 screens are running, fiber is ready.",
      },
    ],
    respectfulExit: "Sounds like you got a solid deal locked in! Keep holding onto that.",
  },
  {
    id: 'obj_hidden_fees',
    title: 'Hidden Fees / Rate Hike Skepticism',
    category: 'price',
    customerPhrase: "You guys say $55, but after taxes, router rental, and fees it's $90.",
    repScript: "I'm so glad you brought that up—that's the #1 trick cable providers pull. With T-Mobile Fiber, your Wi-Fi 6 gateway is included at $0, there are zero activation or equipment rental line items, and no data cap fees.",
    followUpQuestion: "Does your current bill have line items for 'Broadcast TV fee', 'Gateway rental', or 'Network maintenance'?",
    whyThisWorks: "Empathizes with cable billing trauma and highlights T-Mobile's clean, transparent pricing model.",
    reactions: [
      {
        reaction: '"Yes, they charge me $15 just for the router!"',
        nextNodeId: 'node_close_savings_pitch',
        suggestedScript: "Exactly! You're paying $180 a year just to rent their black box. With us, modern Wi-Fi 6 hardware is 100% included at no charge.",
      },
      {
        reaction: '"Can you put that in writing?"',
        nextNodeId: 'node_close_verify_terms',
        suggestedScript: "100%. Before you confirm anything, our official portal lists all terms clearly on your phone. Let's look at the breakdown together.",
      },
    ],
    respectfulExit: "You should always demand total bill transparency. Thanks for your time!",
  },

  // --- SWITCHING OBJECTIONS ---
  {
    id: 'obj_switching_hassle',
    title: 'Switching is Too Much Work',
    category: 'switching',
    customerPhrase: "Switching sounds like too much work / a huge hassle.",
    repScript: "Fair enough! If your internet's working, switching companies probably isn't high on your to-do list. Is it mostly the installation hassle you're worried about, or having to set everything up again?",
    followUpQuestion: "What if our certified technician handled the entire line drop and equipment placement while your old internet stayed on until you're completely satisfied?",
    whyThisWorks: "Acknowledges the real friction (fear of downtime and setup fatigue) and isolates the specific barrier.",
    reactions: [
      {
        reaction: 'Worried about installation mess/drilling',
        nextNodeId: 'node_tech_install_process',
        suggestedScript: "Our fiber techs use existing conduit wherever possible and respect your property. No messy loose cables or destructive drilling.",
      },
      {
        reaction: 'Worried about reconnecting smart devices',
        nextNodeId: 'node_wifi_seamless_switch',
        suggestedScript: "Pro tip: We simply set the new T-Mobile Wi-Fi network name and password to match your current one. All your TVs, phones, and smart plugs connect automatically in seconds!",
      },
      {
        reaction: 'Just doesn’t want the effort',
        nextNodeId: 'node_soft_qualify',
        suggestedScript: "Totally get it. When you're ready for faster uploads and a lower bill, you'll know fiber is on the block.",
      },
    ],
    respectfulExit: "Understood! When life slows down, you know where to find us. Have a great day!",
  },
  {
    id: 'obj_equipment_change',
    title: 'Don’t Want New Equipment',
    category: 'switching',
    customerPhrase: "I don't want to change equipment or return boxes.",
    repScript: "I completely understand—standing in line at a UPS store or retail store is nobody's idea of fun. Our technician sets up the single compact gateway, and your old provider usually lets you drop returns in any UPS store with a pre-paid QR code.",
    followUpQuestion: "How old is your current router? Has it been more than 3 or 4 years?",
    whyThisWorks: "Solves return anxiety and points out that older hardware often bottlenecks modern device speeds.",
    reactions: [
      {
        reaction: 'Router is old and struggling',
        nextNodeId: 'node_value_hardware_upgrade',
        suggestedScript: "Then this is a dual win: you get a brand new Wi-Fi 6 mesh-ready gateway included for $0 a month, which eliminates dead zones in back rooms.",
      },
      {
        reaction: 'Has their own expensive mesh system (e.g. Eero, Orbi)',
        nextNodeId: 'node_own_mesh_compatibility',
        suggestedScript: "Great news—T-Mobile Fiber works flawlessly in bridge/passthrough mode with your own Eero, Orbi, or UniFi setup! You keep all your custom settings.",
      },
    ],
    respectfulExit: "Got it! Thanks for taking a minute to chat.",
  },
  {
    id: 'obj_downtime_worry',
    title: 'Cannot Afford Downtime',
    category: 'switching',
    customerPhrase: "I work from home, I cannot afford even an hour of internet downtime.",
    repScript: "That's exactly why 90% of our WFH customers do this: we install and activate your T-Mobile Fiber while your old provider is still 100% active. You don't cancel your old service until our fiber is running and tested in front of you.",
    followUpQuestion: "Does your work involve frequent Zoom/Teams calls or heavy uploads to cloud servers?",
    whyThisWorks: "Eliminates the fear of downtime with the 'zero-gap overlapping switch' promise.",
    reactions: [
      {
        reaction: '"Wait, so there is zero overlap downtime?"',
        nextNodeId: 'node_close_wfh_assurance',
        suggestedScript: "Zero downtime. You test our speed on your laptop, verify everything works, and only then call your old provider to cancel.",
      },
      {
        reaction: 'Wants to know about upload speeds',
        nextNodeId: 'node_value_upload_speeds',
        suggestedScript: "Cable typically caps uploads at a tiny 10–35 Mbps. T-Mobile Fiber gives you full symmetrical 500 or 1,000 Mbps uploads so your video never freezes.",
      },
    ],
    respectfulExit: "Your work connection is sacred—totally respect that. Have a productive day!",
  },
  {
    id: 'obj_loyalty_longtime',
    title: 'Loyal to Current Provider',
    category: 'switching',
    customerPhrase: "I've been with Cox / CenturyLink for 15 years, I like them.",
    repScript: "That kind of loyalty is admirable! Usually when someone stays that long, the provider starts taking them for granted and creeping prices up while reserving the best deals for new signups. Have they given you a loyalty discount lately?",
    followUpQuestion: "Are you still paying the same amount you did 3 years ago?",
    whyThisWorks: "Disarms with respect for loyalty, then triggers the psychological truth that telecom companies punish loyal customers with higher rates.",
    reactions: [
      {
        reaction: '"No, they actually just raised it again!"',
        nextNodeId: 'node_close_savings_pitch',
        suggestedScript: "That's why so many neighbors are switching. You reward your wallet by getting brand new fiber technology at a locked-in lower price.",
      },
      {
        reaction: '"They treat me great and I have no complaints"',
        nextNodeId: 'node_terminal_satisfied_customer',
        suggestedScript: "If you're completely satisfied and the price is fair, honestly don't change a thing. But if that ever changes, remember T-Mobile Fiber is in the ground!",
      },
    ],
    respectfulExit: "Always stick with what works for you! Have a great day.",
  },

  // --- TRUST OBJECTIONS ---
  {
    id: 'obj_is_this_a_scam',
    title: 'Is This a Scam / Legitimacy',
    category: 'trust',
    customerPhrase: "Is this a scam? How do I know you're legitimate?",
    repScript: "I don't blame you at all for asking—there are definitely shady people going door to door. Here is my official T-Mobile contractor badge with my rep ID, and you can also see our T-Mobile work vans parked at the corner of the block.",
    followUpQuestion: "Would you like me to send an official verification text or link from t-mobile.com directly to your phone?",
    whyThisWorks: "Validates their skepticism instantly, shows physical credentials, references the visible neighborhood work, and offers official digital verification.",
    reactions: [
      {
        reaction: 'Inspects badge / relaxes',
        nextNodeId: 'node_stage1_opening',
        suggestedScript: "I appreciate you being cautious! As I was saying, our fiber rollout team is verifying addresses on this street today. Who do you have currently?",
      },
      {
        reaction: 'Prefers to verify online independently',
        nextNodeId: 'node_terminal_followup_lead',
        suggestedScript: "Totally respect that! Go to t-mobile.com/fiber on your own device and type in your address. My rep ID is on this card if you decide to order.",
      },
    ],
    respectfulExit: "Being cautious is always smart! Check out t-mobile.com/fiber whenever you want. Have a great day!",
  },
  {
    id: 'obj_bad_past_experience',
    title: 'Bad Past Experience with T-Mobile',
    category: 'trust',
    customerPhrase: "I had T-Mobile cellular years ago and the service was terrible.",
    repScript: "I hear you, and 5 or 10 years ago our cellular network had some definite dead spots. But this is completely separate from wireless phones—this is dedicated physical fiber-optic glass in the ground running straight to your home.",
    followUpQuestion: "Did you have phone service back then, or was it home internet?",
    whyThisWorks: "Separates legacy cellular coverage memory from brand new dedicated underground fiber optic infrastructure.",
    reactions: [
      {
        reaction: '"Oh, so this isn\'t a cellular 5G box?"',
        nextNodeId: 'node_value_fiber_vs_5g',
        suggestedScript: "Exactly! This is not 5G home internet over cellular towers. This is 100% hardwired physical glass fiber cables, which is the gold standard for speed and reliability.",
      },
      {
        reaction: 'Still bitter about customer service',
        nextNodeId: 'node_trust_no_contract',
        suggestedScript: "Understood. The great thing is there are zero contracts—if we don't earn your trust every single month, you can cancel anytime with zero penalties.",
      },
    ],
    respectfulExit: "I appreciate you sharing that honestly. Have a wonderful rest of your day!",
  },

  // --- TIMING OBJECTIONS ---
  {
    id: 'obj_busy_in_middle',
    title: 'I’m Busy / Bad Time',
    category: 'timing',
    customerPhrase: "I'm in the middle of dinner / work / heading out.",
    repScript: "I'll be out of your hair in 15 seconds! T-Mobile just activated fiber lines on this block. Can I leave this quick rate sheet on your table, or can I shoot you a quick 1-tap text so you can look at it later?",
    followUpQuestion: "What is your best cell number for a 1-sentence text with the neighbor discount?",
    whyThisWorks: "Respects urgency, gives an exit in 15 seconds, and pivots gracefully to lead capture for follow-up.",
    reactions: [
      {
        reaction: 'Gives phone number for text lead',
        nextNodeId: 'node_terminal_followup_lead',
        suggestedScript: "Sent! Look for a text from T-Mobile. Take care of dinner and enjoy your evening!",
      },
      {
        reaction: 'Takes flyer / card',
        nextNodeId: 'node_terminal_followup_lead',
        suggestedScript: "Here you go! Scan the QR code when you have a minute. Have a great night!",
      },
      {
        reaction: 'Closes door',
        nextNodeId: 'node_terminal_no_answer',
        suggestedScript: "Have a great day!",
      },
    ],
    respectfulExit: "Sorry to interrupt! Have a great rest of your day.",
  },
  {
    id: 'obj_talk_to_spouse',
    title: 'Need to Talk to My Spouse',
    category: 'timing',
    customerPhrase: "I need to talk to my husband / wife first.",
    repScript: "100%—in my house my partner makes the smart calls too! Let's do this: let's verify if your address is greenlit and what the neighbor rate looks like, so when you talk to them, you have the exact numbers rather than guessing.",
    followUpQuestion: "Is their main priority usually the monthly cost, or having reliable Wi-Fi that doesn't drop?",
    whyThisWorks: "Agrees warmly without condescension, and equips them with concrete numbers for the household discussion.",
    reactions: [
      {
        reaction: 'Shares partner priority ("He works from home all day")',
        nextNodeId: 'node_value_wfh',
        suggestedScript: "Then he'll care about symmetrical upload speeds so his video calls don't drop. Let's make sure you have the exact flyer to show him.",
      },
      {
        reaction: '"Just give me something to show them"',
        nextNodeId: 'node_close_share_package',
        suggestedScript: "Perfect. Let's send the locked-in address quote to your phone so you both can review it over dinner.",
      },
    ],
    respectfulExit: "Makes total sense to discuss it together. Have a great evening with your family!",
  },
  {
    id: 'obj_just_renewed',
    title: 'Just Renewed Contract',
    category: 'timing',
    customerPhrase: "I just renewed my 1-year or 2-year contract with my current provider.",
    repScript: "Oh man, cable companies love locking people in before new fiber arrives! Did you know T-Mobile frequently offers contract buyout assistance up to $500 or $750 for switching to fiber?",
    followUpQuestion: "How much time is left on your contract?",
    whyThisWorks: "Removes the early termination fee (ETF) barrier with contract buyout programs.",
    reactions: [
      {
        reaction: 'Has several months left with ETF',
        nextNodeId: 'node_contract_buyout_process',
        suggestedScript: "We can submit your final bill with the cancellation fee, and T-Mobile helps reimburse you via prepaid mastercard. You get the fiber upgrade without eating the penalty.",
      },
      {
        reaction: 'Turns out they are actually month-to-month',
        nextNodeId: 'node_disc_cost',
        suggestedScript: "A lot of people think they have a contract, but after year one you're usually month-to-month! What are they billing you?",
      },
    ],
    respectfulExit: "Keep enjoying your service and check back when that contract winds down!",
  },

  // --- TECHNICAL OBJECTIONS ---
  {
    id: 'obj_already_have_fiber',
    title: 'I Already Have Fiber',
    category: 'technical',
    customerPhrase: "We already have fiber with Quantum / CenturyLink / AT&T.",
    repScript: "Awesome! You already know how much better fiber is than copper cable. Who is your fiber provider, and are you getting true symmetrical gigabit speeds?",
    followUpQuestion: "What are they billing you for that fiber service?",
    whyThisWorks: "Fiber users are tech-savvy. You validate their smart choice and immediately pivot to price comparison and equipment superiority.",
    reactions: [
      {
        reaction: 'Paying $70–$90+ for fiber',
        nextNodeId: 'node_close_savings_pitch',
        suggestedScript: "You love fiber, but you're overpaying. Our symmetrical fiber is $55 with equipment included and no contracts. Same lightspeed glass, lower monthly bill.",
      },
      {
        reaction: 'Turns out it is fiber-to-the-node (VDSL / copper last mile)',
        nextNodeId: 'node_pure_fiber_differentiator',
        suggestedScript: "Ah! Often providers advertise 'fiber' but run copper phone lines from the street into your home. T-Mobile Fiber is 100% pure fiber-to-the-home.",
      },
    ],
    respectfulExit: "Fiber is the only way to go! Glad you have it. Have a great day!",
  },
  {
    id: 'obj_wifi_vs_internet',
    title: 'My Wi-Fi is Slow / Confusion',
    category: 'technical',
    customerPhrase: "My Wi-Fi is always slow in the bedroom / basement.",
    repScript: "That's super frustrating! A lot of people don't realize there are two pieces: the internet pipe coming into the house, and the Wi-Fi router spreading the signal. Our fiber gateway includes the newest Wi-Fi 6 technology with mesh capabilities to cover every corner.",
    followUpQuestion: "Where is your current router placed in the house?",
    whyThisWorks: "Educates the customer patiently without tech jargon, positioning the rep as a trusted connectivity advisor.",
    reactions: [
      {
        reaction: 'Router is stuck in a back closet or corner',
        nextNodeId: 'node_value_hardware_upgrade',
        suggestedScript: "Our technician will optimize the gateway placement and can provide mesh extenders so your signal blankets the whole house.",
      },
      {
        reaction: 'Interested in mesh coverage',
        nextNodeId: 'node_plan_config_showcase',
        suggestedScript: "Let me show you our multi-device plans that include whole-home Wi-Fi 6 coverage.",
      },
    ],
    respectfulExit: "Hope you get those dead spots cleared up! Take care.",
  },
  {
    id: 'obj_outages_question',
    title: 'What Happens During Outages?',
    category: 'technical',
    customerPhrase: "Does your fiber go down during storms or outages?",
    repScript: "Fiber optic cables are glass lines that don't conduct electricity, so they are immune to electrical interference, lightning spikes, and water corrosion that routinely knock out old copper and coaxial cable networks.",
    followUpQuestion: "Does your current internet drop whenever it rains or during peak neighborhood hours?",
    whyThisWorks: "Shares a concrete engineering fact about glass vs copper, building high technical credibility.",
    reactions: [
      {
        reaction: '"Yes, our cable drops every time there\'s wind or rain!"',
        nextNodeId: 'node_close_savings_pitch',
        suggestedScript: "That's because copper oxidizes and cable junctions leak. Pure fiber solves that once and for all.",
      },
      {
        reaction: 'Satisfied with explanation',
        nextNodeId: 'node_close_availability_check',
        suggestedScript: "Let's check if your exact home is ready for the connection drop right now.",
      },
    ],
    respectfulExit: "Reliability is key! Have a wonderful day.",
  },
];
