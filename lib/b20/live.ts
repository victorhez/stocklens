'use client';
import { useMemo } from 'react';
import { useAccount, useReadContracts } from 'wagmi';
import { formatUnits } from 'viem';
import { getRegistry, B20_ABI, CHAINLINK_ABI } from './registry';
import { Position } from '@/types/stock';

export function useLivePositions(fallback: Position[]) {
  const { address } = useAccount();
  const registry = getRegistry();
  const enabled = Boolean(address && registry.some(a => a.tokenAddress));
  const contracts = useMemo(() => registry.filter(a=>a.tokenAddress).flatMap(a=>[
    {address:a.tokenAddress!,abi:B20_ABI,functionName:'balanceOf' as const,args:[address!] as const},
    {address:a.tokenAddress!,abi:B20_ABI,functionName:'multiplier' as const},
  ]),[address,registry]);
  const {data,isLoading,refetch} = useReadContracts({contracts,query:{enabled}});
  if(!enabled || !data) return {positions:fallback,isLoading:false,live:false,refresh:refetch};
  const assets=registry.filter(a=>a.tokenAddress);
  const positions:Position[]=assets.map((a,i)=>{
    const rawBig=data[i*2]?.result as bigint|undefined;
    const multBig=data[i*2+1]?.result as bigint|undefined;
    const raw=rawBig===undefined?0:Number(formatUnits(rawBig,a.decimals));
    const multiplier=multBig===undefined?1:Number(formatUnits(multBig,18));
    const base=fallback.find(x=>x.id===a.id) ?? {...a,rawBalance:0,multiplier:1,derivedExposure:0,portfolioWeight:0,blockNumber:0,timestamp:new Date().toISOString()};
    const derivedExposure=raw*multiplier;
    return {...base,...a,rawBalance:raw,multiplier,derivedExposure,valueUsd:base.price?derivedExposure*base.price:undefined,timestamp:new Date().toISOString()};
  });
  const total=positions.reduce((s,p)=>s+(p.valueUsd||0),0);
  return {positions:positions.map(p=>({...p,portfolioWeight:total?(p.valueUsd||0)/total*100:0})),isLoading,live:true,refresh:refetch};
}
