export type StockAsset = {
  id: string; symbol: string; name: string; tokenAddress?: `0x${string}`; decimals: number;
  issuer: string; verified: boolean; sourceUrl: string; priceFeed?: `0x${string}`; icon: string; color: string;
};
export type Position = StockAsset & { rawBalance:number; multiplier:number; derivedExposure:number; price?:number; valueUsd?:number; portfolioWeight:number; blockNumber:number; timestamp:string };
export type CorporateActionEvent = { id:string; assetId:string; eventType:string; timestamp:string; blockNumber:number; transactionHash?:string; multiplierBefore?:number; multiplierAfter?:number; source:string; explanation:string };
export type Snapshot = { walletAddress:string; blockNumber:number; timestamp:string; totalValueUsd:number; positions:Position[] };
