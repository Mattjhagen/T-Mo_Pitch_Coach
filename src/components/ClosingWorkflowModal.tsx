import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  CheckCircle2, 
  MapPin, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  Clock, 
  ExternalLink,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { useSalesStore } from '../store/useSalesStore';
import { PlanConfig } from '../types';

export const ClosingWorkflowModal: React.FC = () => {
  const { 
    isClosingModalOpen, 
    setClosingModalOpen, 
    plans, 
    context, 
    updateContext,
    completeSession,
    sunlightMode 
  } = useSalesStore();

  const [step, setStep] = useState<number>(1);
  const [selectedPlan, setSelectedPlan] = useState<PlanConfig>(
    plans.find(p => p.id === context.selectedPlanId) || plans[1] || plans[0]
  );
  const [addressInput, setAddressInput] = useState('1428 Elm Street (Neighborhood Verified)');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
  const [selectedCloseStyle, setSelectedCloseStyle] = useState<'assumptive' | 'savings' | 'convenience' | 'direct' | 'soft'>('assumptive');
  const [selectedSlot, setSelectedSlot] = useState('Thursday 8:00 AM – 12:00 PM');

  const closeStyles = [
    {
      id: 'assumptive',
      title: 'Assumptive & Permission Close',
      script: "Since your address is greenlit and the neighbor rate is locked, let's put your installation on the calendar so our crews don't pass your house. Do mornings or afternoons work better?",
      coaching: 'Natural, confident, and assumes the positive outcome without pressure.',
    },
    {
      id: 'savings',
      title: 'Savings-Based Close',
      script: `You're saving over $30 to $50 every single month starting next week. If we can get that scheduled for ${selectedSlot}, would that work for you?`,
      coaching: 'Anchors on the immediate monthly savings.',
    },
    {
      id: 'convenience',
      title: 'Zero Hassle & WFH Close',
      script: "Our tech does everything and matches your exact Wi-Fi name so not a single TV or phone disconnects, and your old service stays active until it's running. Shall we lock in this Thursday?",
      coaching: 'Removes all fear of downtime and tech setup friction.',
    },
    {
      id: 'direct',
      title: 'Direct Close',
      script: "We have two neighborhood installation slots open this Friday. Would you like the 9 AM or the 1 PM window?",
      coaching: 'Give an alternate choice between two times.',
    },
    {
      id: 'soft',
      title: 'Soft / Low-Commitment Close',
      script: "Let's reserve your line drop on the schedule. You don't pay anything today, and you can reschedule or change your mind anytime before install day. Sound fair?",
      coaching: 'Zero-risk reassurance for cautious homeowners.',
    },
  ];

  const handleSimulateAddressCheck = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 600);
  };

  const handleFinalizeSale = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {}

    updateContext({
      selectedPlanId: selectedPlan.id,
    });
    
    // Complete the session as a sale!
    completeSession('sale', `Closed ${selectedPlan.name} ($${selectedPlan.price}/mo). Install slot: ${selectedSlot}`);
    setClosingModalOpen(false);
  };

  if (!isClosingModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className={`w-full max-w-2xl h-[90vh] sm:h-[84vh] rounded-t-3xl sm:rounded-3xl border flex flex-col overflow-hidden shadow-2xl transition-colors ${
        sunlightMode 
          ? 'bg-white border-black text-black' 
          : 'bg-slate-900 border-slate-700 text-slate-100'
      }`}>
        {/* Grab bar */}
        <div className="w-12 h-1.5 bg-slate-600/40 rounded-full mx-auto my-2 sm:hidden shrink-0" />

        {/* Modal Header & Stepper */}
        <div className={`px-4 py-3 border-b shrink-0 ${
          sunlightMode ? 'bg-slate-100 border-black' : 'bg-slate-950/80 border-slate-800'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2" style={{ color: sunlightMode ? '#000000' : '#ffffff' }}>
                  Guided Closing Navigator
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                    Step {step} of 6
                  </span>
                </h2>
              </div>
            </div>

            <button
              onClick={() => setClosingModalOpen(false)}
              className={`p-2 rounded-xl transition ${
                sunlightMode ? 'hover:bg-slate-200 text-black' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Step Progress Dots */}
          <div className="flex items-center gap-1.5 mt-2.5">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full flex-1 transition-all ${
                  s === step
                    ? 'bg-[#e20074]'
                    : s < step
                      ? 'bg-emerald-500'
                      : 'bg-slate-700/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* STEP 1: Confirm Interest */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#e20074]/15 border border-[#e20074]/40 space-y-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#ff3399]">
                  Say This (Permission Check Close):
                </span>
                <p className="text-lg sm:text-xl font-bold leading-normal text-white">
                  “If the availability and pricing check comes back looking good, would you be open to getting it set up?”
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-700/60 bg-slate-800/40 text-xs sm:text-sm text-slate-300 space-y-2">
                <p className="font-semibold text-slate-200">Why this step matters:</p>
                <p>
                  Gaining agreement *before* running address checks primes the customer's mindset for enrollment. It establishes mutual commitment without high pressure.
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: Verify Address Availability */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl border border-slate-700 bg-slate-800/60 space-y-3">
                <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>Verify Fiber Terminal Drop</span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    placeholder="Enter customer address..."
                    className="flex-1 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white outline-none focus:border-[#e20074]"
                  />
                  <button
                    onClick={handleSimulateAddressCheck}
                    disabled={isVerifying}
                    className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs"
                  >
                    {isVerifying ? 'Checking...' : 'Check Line'}
                  </button>
                </div>

                {isVerified && (
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Greenlit!</strong> Pure FTTH terminal active on street. Plan options: 300M, 1G, 2G & 5G (confirm address-specific availability).</span>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  Say This to Homeowner:
                </span>
                <p className="text-base sm:text-lg font-bold text-white">
                  “Great news! Your address is completely greenlit for the direct fiber connection. Let’s look at the neighbor rate options.”
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: Present Verified Eligible Offers */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Select Eligible Plan for Customer:
                </span>
                <span className="text-xs text-[#ff3399] font-semibold">
                  (Editable in Settings)
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {plans.map((p) => {
                  const isSelected = p.id === selectedPlan.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPlan(p)}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-[#e20074]/20 border-[#e20074] ring-2 ring-[#e20074]/50 text-white'
                          : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 text-slate-200'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-base">{p.name}</span>
                          {p.promoPrice && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                              AutoPay Promo
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400">
                          {p.speed} · {p.idealFor}
                        </div>
                        <div className="text-xs text-emerald-400 font-semibold">
                          {p.equipmentFee}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-2xl font-black text-white tabular-nums">
                          ${p.price}
                          <span className="text-xs font-medium text-slate-400">/mo</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {p.contract}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 text-xs sm:text-sm text-slate-300">
                <strong className="text-slate-100">Say This: </strong>
                “Which of these speeds fits your home better—the 500 Meg for ${plans[0]?.price || 35} or the 1 Gig for ${plans[1]?.price || 55}?”
              </div>
            </div>
          )}

          {/* STEP 4: Confirm Pricing & Key Terms */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Transparent Terms Verification</span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-slate-200">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Plan:</strong> {selectedPlan.name} (${selectedPlan.price}/month)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Hardware:</strong> Wi-Fi 6 Gateway included ($0/mo rental)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Installation:</strong> Professional line drop ($0 standard)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Terms:</strong> No annual contract · Unlimited data · Price locked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Due Today:</strong> $0.00 at the door (billing only starts after activation)</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#e20074]/15 border border-[#e20074]/40 space-y-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#ff3399]">
                  Say This to Confirm:
                </span>
                <p className="text-base sm:text-lg font-bold text-white">
                  “Just to make sure we're 100% transparent: No contracts, no equipment rental fees, and you never pay anything at the door. You have complete freedom.”
                </p>
              </div>
            </div>
          )}

          {/* STEP 5: Ask for the Sale (5 Close Styles) */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Choose Close Style:
                </span>
              </div>

              {/* Close Style Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {closeStyles.map((cs) => (
                  <button
                    key={cs.id}
                    onClick={() => setSelectedCloseStyle(cs.id as unknown as 'assumptive')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCloseStyle === cs.id
                        ? 'bg-[#e20074] text-white shadow-sm shadow-[#e20074]/30'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {cs.title}
                  </button>
                ))}
              </div>

              {/* Active Close Style Script */}
              {(() => {
                const currentClose = closeStyles.find(c => c.id === selectedCloseStyle) || closeStyles[0];
                return (
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 space-y-3 shadow-lg">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Say This:
                    </span>
                    <p className="text-lg sm:text-xl font-extrabold text-white leading-relaxed">
                      “{currentClose.script}”
                    </p>
                    <p className="text-xs text-slate-400 border-t border-slate-700/60 pt-2">
                      <strong>Rep Note:</strong> {currentClose.coaching}
                    </p>
                  </div>
                );
              })()}

              {/* Schedule slot selector */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <Calendar className="w-4 h-4 text-sky-400" />
                  <span>Neighborhood Install Windows:</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['Wed 8am-12pm', 'Wed 1pm-5pm', 'Thu 8am-12pm', 'Fri 8am-12pm'].map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2 rounded-lg border text-center transition ${
                        selectedSlot === slot
                          ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-bold'
                          : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Direct Authorized Enrollment */}
          {step === 6 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/50 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Ready to Finalize Official Order
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  T-Mobile policy strictly prohibits storing customer SSNs or credit card info inside rep helper apps. Direct the customer through the authorized portal or send a secure link to their mobile device.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700 space-y-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center justify-between pb-2 border-b border-slate-700">
                  <span>Customer Address:</span>
                  <span className="font-bold text-white">{addressInput}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-700">
                  <span>Selected Plan:</span>
                  <span className="font-bold text-emerald-400">{selectedPlan.name} (${selectedPlan.price}/mo)</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-700">
                  <span>Install Window:</span>
                  <span className="font-bold text-sky-400">{selectedSlot}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Old Provider Status:</span>
                  <span className="font-bold text-amber-400">Keep active until fiber tested</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 text-xs text-slate-400 space-y-1">
                <strong className="text-slate-200">Say This:</strong>
                <p>
                  “I've generated your secure order reservation link. Let's confirm your contact number so you receive your tracking text with your technician's name!”
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className={`p-4 border-t flex items-center justify-between gap-3 shrink-0 ${
          sunlightMode ? 'bg-slate-100 border-black' : 'bg-slate-950/80 border-slate-800'
        }`}>
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 6 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-xl bg-[#e20074] hover:bg-[#c40064] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-[#e20074]/30 active:scale-95 transition"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinalizeSale}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 active:scale-95 transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Record Completed Sale & Confetti!</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
