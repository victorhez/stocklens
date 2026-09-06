'use client';
import { useAccount,useConnect,useDisconnect,useSwitchChain } from 'wagmi';
import { base } from 'wagmi/chains';
import { Wallet, LogOut, AlertTriangle } from 'lucide-react';
export function WalletButton(){const {address,isConnected,chainId}=useAccount();const {connectors,connect}=useConnect();const {disconnect}=useDisconnect();const {switchChain}=useSwitchChain();if(!isConnected)return <button onClick={()=>connect({connector:connectors[0]})} className="btn-primary"><Wallet size={16}/>Connect Wallet</button>; if(chainId!==base.id)return <button onClick={()=>switchChain({chainId:base.id})} className="btn-warning"><AlertTriangle size={16}/>Switch to Base</button>;return <button onClick={()=>disconnect()} className="btn-ghost"><span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]"/>{address?.slice(0,6)}…{address?.slice(-4)}<LogOut size={14}/></button>}
