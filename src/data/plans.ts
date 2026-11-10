import { PlanConfig } from '../types';

// Plan prices and benefits match the sales card screenshots provided on 2026-11-10.
// Displayed monthly prices are used directly; crossed-out comparison prices are not
// modeled as additional discounts or stacked promotions.
export const DEFAULT_PLANS: PlanConfig[] = [
  {
    id: 'plan_fiber_300',
    name: 'T-Mobile Fiber 300',
    speed: '300 Mbps symmetrical',
    price: 35,
    equipmentFee: '$0 / mo (Wi-Fi router included)',
    installationFee: '$0 (Installation included)',
    contract: 'No annual contract',
    perks: ['Wi-Fi router included', 'Installation included', 'Unlimited data', '$10 AutoPay discount'],
    idealFor: 'Browsing, streaming, and everyday connected households',
  },
  {
    id: 'plan_fiber_1000',
    name: 'T-Mobile Fiber 1 GIG',
    speed: '1,000 Mbps symmetrical',
    price: 55,
    equipmentFee: '$0 / mo (Wi-Fi router included)',
    installationFee: '$0 (Installation included)',
    contract: 'No annual contract',
    perks: ['Wi-Fi router included', 'Mesh Wi-Fi extender as needed', 'Installation included', 'Unlimited data'],
    idealFor: 'Remote work, gaming, and multi-device households',
  },
  {
    id: 'plan_fiber_2000',
    name: 'T-Mobile Fiber 2 GIG',
    speed: '2,000 Mbps symmetrical',
    price: 70,
    equipmentFee: '$0 / mo (Wi-Fi router & mesh extender)',
    installationFee: '$0 (Installation included)',
    contract: 'No annual contract',
    perks: ['Fastest speeds & strongest Wi-Fi', 'Wi-Fi router & Mesh extender', 'Installation included', 'Unlimited data'],
    idealFor: 'Heavy streaming, creator studios, and connected homes',
  },
  {
    id: 'plan_fiber_5000',
    name: 'T-Mobile Fiber 5 GIG',
    speed: '5,000 Mbps symmetrical',
    price: 90,
    equipmentFee: 'Wi-Fi equipment included',
    installationFee: '$0 (Installation included)',
    contract: 'No annual contract',
    perks: ['10 Year Price Guarantee', 'Headroom for everything at once', 'Installation included', 'Exclusive T-Mobile Tuesdays perks'],
    idealFor: 'Power users, large connected households, and demanding multi-device setups',
  },
];
