import { Position } from '@/types/stock';
export const WAD=1e18;
export function derivedShares(raw:number,multiplier:number){ return raw*multiplier; }
export function enrich(positions:Position[]):Position[]{ const total=positions.reduce((s,p)=>s+(p.valueUsd||0),0); return positions.map(p=>({...p,derivedExposure:derivedShares(p.rawBalance,p.multiplier),portfolioWeight:total?(p.valueUsd||0)/total*100:0})); }
export function concentration(positions:Position[], threshold:number){ return positions.filter(p=>p.portfolioWeight>=threshold); }
