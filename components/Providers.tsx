'use client';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
const config=createConfig({chains:[base],connectors:[injected()],transports:{[base.id]:http(process.env.NEXT_PUBLIC_BASE_RPC_URL||'https://mainnet.base.org')}});
export function Providers({children}:{children:React.ReactNode}){const [q]=useState(()=>new QueryClient());return <WagmiProvider config={config}><QueryClientProvider client={q}>{children}</QueryClientProvider></WagmiProvider>}
