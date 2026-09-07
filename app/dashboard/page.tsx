'use client';

import Link from 'next/link';
import { ArrowUpRight, RefreshCw, Sparkles, TriangleAlert, Verified } from 'lucide-react';
import { useAccount } from 'wagmi';
import { AppShell } from '@/components/AppShell';
import { Card, Pill } from '@/components/Card';
import { demoEvents, demoPositions } from '@/lib/demo';
import { concentration } from '@/lib/b20/calculations';
import { useLivePositions } from '@/lib/b20/live';

export default function Dashboard() {
  const { address } = useAccount();
  const live = useLivePositions(demoPositions);
  const positions = live.positions;
  const total = positions.reduce((sum, position) => sum + (position.valueUsd || 0), 0);
  const hot = concentration(positions, 40);

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-5 py-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[.2em] text-indigo-300">Portfolio intelligence</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Your onchain stock lens</h1>
            <p className="mt-2 text-sm text-slate-400">
              {live.live ? `Live onchain - ${address?.slice(0, 8)}...${address?.slice(-6)}` : address ? `Connected - ${address.slice(0, 8)}...${address.slice(-6)}` : 'Demo snapshot - connect a Base wallet to read live balances'}
            </p>
          </div>
          <button type="button" onClick={() => live.refresh()} disabled={live.isLoading} className="btn-ghost disabled:cursor-wait disabled:opacity-60">
            <RefreshCw size={15} className={live.isLoading ? 'animate-spin' : ''} />
            {live.isLoading ? 'Refreshing...' : 'Refresh data'}
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <Metric label="Portfolio value" value={`$${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} sub="Demo snapshot" />
          <Metric label="Holdings" value="4" sub="Supported assets" />
          <Metric label="Concentration" value={`${Math.max(...positions.map((position) => position.portfolioWeight)).toFixed(1)}%`} sub="Largest position" warn={hot.length > 0} />
          <Metric label="Data status" value="Verified" sub="Block 12,345,678" good />
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.3fr_.7fr]">
          <Card>
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4"><div><h2 className="font-semibold">Holdings</h2><p className="text-xs text-slate-500">Raw B20 balances translated into economic exposure.</p></div><Link href="/simulator" className="text-xs text-indigo-300">What-if</Link></div>
            <div className="divide-y divide-white/5">
              {positions.map((position) => <Link key={position.id} href={`/stock/${position.symbol.replace('c', '')}`} className="flex items-center justify-between px-5 py-4 hover:bg-white/[.025]"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 font-bold">{position.icon}</div><div><div className="flex items-center gap-2 font-medium">{position.name}<Pill tone="good"><Verified size={11} />B20</Pill></div><div className="mt-1 text-xs text-slate-500">{position.symbol} - {position.rawBalance.toFixed(2)} raw - {position.multiplier.toFixed(2)}x</div></div></div><div className="text-right"><div className="font-medium">${position.valueUsd?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div><div className="mt-1 text-xs text-emerald-300">{position.portfolioWeight.toFixed(1)}% weight</div></div></Link>)}
            </div>
          </Card>

          <div className="space-y-5">
            <Card className="p-5"><div className="flex items-start gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-400/10 text-amber-300"><TriangleAlert size={18} /></div><div><h3 className="font-semibold">Concentration signal</h3><p className="mt-1 text-sm leading-6 text-slate-400">{hot.length ? `${hot[0].name} exceeds the selected 40% warning threshold in this demo snapshot.` : 'No holding exceeds the selected threshold.'}</p></div></div></Card>
            <Card><div className="border-b border-white/10 px-5 py-4"><h2 className="font-semibold">Verified events</h2><p className="text-xs text-slate-500">Only events attached to an authoritative source are shown.</p></div><div className="space-y-4 p-5">{demoEvents.map((event) => <div key={event.id} className="flex gap-3"><div className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400" /><div><div className="text-sm font-medium">{event.eventType}</div><div className="text-xs text-slate-500">{new Date(event.timestamp).toLocaleDateString()} - block {event.blockNumber.toLocaleString()}</div></div></div>)}<Link href="/event/evt-tsla-1" className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[.03] px-4 py-3 text-xs text-slate-300">Open event intelligence <ArrowUpRight size={14} /></Link></div></Card>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-indigo-400/20 bg-gradient-to-r from-indigo-600/10 via-fuchsia-500/5 to-transparent p-5"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><div className="flex items-center gap-2 text-indigo-200"><Sparkles size={16} /> StockLens Explain</div><p className="mt-1 text-sm text-slate-400">Ask why a balance looks unchanged, how a multiplier affects exposure, or what a verified event means.</p></div><Link href="/explain" className="btn-primary">Explain my portfolio</Link></div></div>
      </div>
    </AppShell>
  );
}

function Metric({ label, value, sub, warn, good }: { label: string; value: string; sub: string; warn?: boolean; good?: boolean }) {
  return <Card className="p-5"><div className="text-xs text-slate-500">{label}</div><div className={`mt-2 text-2xl font-semibold tracking-tight ${warn ? 'text-amber-200' : good ? 'text-emerald-200' : 'text-white'}`}>{value}</div><div className="mt-1 text-[11px] text-slate-500">{sub}</div></Card>;
}
