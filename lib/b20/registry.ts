import { StockAsset } from '@/types/stock';

const fallback: StockAsset[] = [
  {id:'aapl',symbol:'AAPLc',name:'Apple',decimals:18,issuer:'Coinbase',verified:true,sourceUrl:'https://brand.base.org/stocks',icon:'',color:'#dbeafe'},
  {id:'tsla',symbol:'TSLAc',name:'Tesla',decimals:18,issuer:'Coinbase',verified:true,sourceUrl:'https://brand.base.org/stocks',icon:'T',color:'#fecaca'},
  {id:'googl',symbol:'GOOGLc',name:'Alphabet',decimals:18,issuer:'Coinbase',verified:true,sourceUrl:'https://brand.base.org/stocks',icon:'G',color:'#fde68a'},
  {id:'amzn',symbol:'AMZNc',name:'Amazon',decimals:18,issuer:'Coinbase',verified:true,sourceUrl:'https://brand.base.org/stocks',icon:'a',color:'#fde68a'},
  {id:'nvda',symbol:'NVDAc',name:'NVIDIA',decimals:18,issuer:'Coinbase',verified:true,sourceUrl:'https://brand.base.org/stocks',icon:'N',color:'#bbf7d0'},
  {id:'meta',symbol:'METAc',name:'Meta',decimals:18,issuer:'Coinbase',verified:true,sourceUrl:'https://brand.base.org/stocks',icon:'∞',color:'#bfdbfe'},
];

export function getRegistry(): StockAsset[] {
  const raw = process.env.NEXT_PUBLIC_STOCKLENS_REGISTRY_JSON;
  if (!raw) return fallback;
  try { const parsed = JSON.parse(raw); return Array.isArray(parsed) ? parsed : fallback; } catch { return fallback; }
}
export const B20_ABI = [
  {type:'function',name:'balanceOf',stateMutability:'view',inputs:[{name:'account',type:'address'}],outputs:[{name:'',type:'uint256'}]},
  {type:'function',name:'decimals',stateMutability:'view',inputs:[],outputs:[{name:'',type:'uint8'}]},
  {type:'function',name:'multiplier',stateMutability:'view',inputs:[],outputs:[{name:'',type:'uint256'}]},
  {type:'function',name:'scaledBalanceOf',stateMutability:'view',inputs:[{name:'account',type:'address'}],outputs:[{name:'',type:'uint256'}]},
  {type:'function',name:'symbol',stateMutability:'view',inputs:[],outputs:[{name:'',type:'string'}]},
] as const;
export const CHAINLINK_ABI = [{type:'function',name:'latestRoundData',stateMutability:'view',inputs:[],outputs:[{name:'roundId',type:'uint80'},{name:'answer',type:'int256'},{name:'startedAt',type:'uint256'},{name:'updatedAt',type:'uint256'},{name:'answeredInRound',type:'uint80'}]}] as const;
