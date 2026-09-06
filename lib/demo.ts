import { Position, CorporateActionEvent } from '@/types/stock';
import { getRegistry } from './b20/registry';
const assets=getRegistry();
const now='2026-09-09T22:24:00Z';
export const demoPositions: Position[] = assets.slice(0,4).map((a,i)=>({
  ...a, rawBalance:[120,90,80,70][i], multiplier:[1,1,1,1][i], derivedExposure:[120,90,80,70][i], price:[35.25,34.56,36.13,32.84][i], valueUsd:[4230,3104.4,2890.4,2298.8][i], portfolioWeight:[33.7,24.7,23.0,18.3][i], blockNumber:12345678, timestamp:now
}));
export const demoEvents: CorporateActionEvent[] = [
 {id:'evt-aapl-1',assetId:'aapl',eventType:'Dividend declared',timestamp:'2026-05-15T20:00:00Z',blockNumber:12100121,multiplierBefore:1,multiplierAfter:1,source:'https://brand.base.org/stocks',explanation:'No multiplier change was observed in the demo snapshot.'},
 {id:'evt-aapl-2',assetId:'aapl',eventType:'Quarterly results released',timestamp:'2026-08-15T20:00:00Z',blockNumber:12300211,multiplierBefore:1,multiplierAfter:1,source:'https://brand.base.org/stocks',explanation:'Event shown as verified metadata in the demo dataset.'},
 {id:'evt-tsla-1',assetId:'tsla',eventType:'Quarterly results',timestamp:'2026-08-15T20:00:00Z',blockNumber:12489231,multiplierBefore:1,multiplierAfter:1,transactionHash:'0x8f4c…72a1',source:'https://www.tesla.com/investor-relations',explanation:'Demo event used to illustrate the corporate-action timeline.'}
];
