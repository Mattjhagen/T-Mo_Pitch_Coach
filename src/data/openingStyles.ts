import { OpeningStyle } from '../types';

export const OPENING_STYLES: OpeningStyle[] = [
  {
    id: 'friendly',
    name: 'Friendly & Casual',
    description: 'Relaxed, warm, and natural for open, welcoming homeowners',
    script: "Hey, how's it going? I'm with T-Mobile. We've got crews bringing fiber into the neighborhood, and I'm just checking who everyone's using for internet right now.",
    coaching: 'Keep your body language open, step two paces back from the threshold so they have personal space, and deliver with a friendly smile.',
  },
  {
    id: 'short_direct',
    name: 'Short & Direct',
    description: 'High-efficiency pitch for direct, no-nonsense people',
    script: "Hey there! Quick question—our fiber crews are actively upgrading lines on this block today. Which company are you currently using for your home Wi-Fi?",
    coaching: 'Deliver cleanly without filler words. Makes it sound like an operational update rather than a high-pressure sales pitch.',
  },
  {
    id: 'witty_pro',
    name: 'Witty & Disarming',
    description: 'Breaks sales resistance with light humor and instant transparency',
    script: "Hi! Don't worry, I'm not here to sell you a phone case or phone plan. Our team is lighting up brand new 100% fiber optic lines right on your street, and we're giving neighbors first dibs. Who do you have for internet right now?",
    coaching: 'The opening line disarms skepticism immediately. Keep tone light and playful.',
  },
  {
    id: 'survey',
    name: 'Neighborhood Survey',
    description: 'Low-friction, consultative approach that lowers defensive guard',
    script: "Hello! We're doing a quick 30-second neighborhood connectivity check while our fiber crews are working on the street. Who is currently providing your home internet?",
    coaching: 'Emphasize the 30-second limit. People are happy to answer a quick factual question if they know you won’t trap them.',
  },
  {
    id: 'busy_homeowner',
    name: 'Busy Homeowner',
    description: 'Respects time when someone answers holding keys, cooking, or rushing',
    script: "Hey! I know you're right in the middle of your day so I'll be 20 seconds. T-Mobile is laying down new fiber lines on this block. Who handles your home internet right now?",
    coaching: 'Talk at a brisk, energetic pace. Acknowledge their time immediately and give an easy binary or name choice.',
  },
];
