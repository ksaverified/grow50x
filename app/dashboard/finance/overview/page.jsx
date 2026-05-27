'use client';

import DashboardHeader from '@/components/DashboardHeader';

const tiles = [
  { label: 'Revenue (MTD)', value: 'SAR 1,240,000', labelBg: 'bg-slate-50' },
  { label: 'Open Claims', value: '11 Claims', labelBg: 'bg-slate-50' },
  { label: 'Collections Rate', value: '87%', labelBg: 'bg-slate-50' },
];

const recents = [
  { id: 'R-9001', type: 'Reconciliation Audit', date: '2026-05-24', status: 'Completed' },
  { id: 'C-301', type: 'Claim Verification', date: '2026-05-23', status: 'Pending' },
];

export default function FinanceOverview() {
  const getStatusStyle = (status) => {
    if (status.toLowerCase().includes('complete')) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    }
    return 'bg-amber-50 text-amber-700 border-amber-100';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-violet-500/10 selection:text-violet-705 animate-fade-in">
      <DashboardHeader
        roleLabel="Finance Operations"
        title="Finance Overview"
        description="Monitor revenue progress, verify claim clearing statistics, and log daily settlements."
        accentClass="text-violet-650"
        returnPath="/dashboard/finance"
        returnLabel="Back to Finance"
      />

      <main className="max-w-6xl mx-auto py-8 space-y-8 w-full">
        {/* KPI Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {tiles.map((t) => (
            <div key={t.label} className="bg-white border border-slate-200/80 rounded-[1.5rem] p-5 shadow-sm space-y-2.5">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t.label}</p>
              <p className="text-2xl font-extrabold text-slate-955 font-display tracking-tight text-slate-900">{t.value}</p>
            </div>
          ))}
        </section>

        {/* Transactions Card */}
        <section className="bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-display">Recent Operations</h3>
            <p className="text-xs text-slate-400 mt-1">Daily billing logs, claim entries, and reconciliation reports.</p>
          </div>

          <ul className="space-y-4">
            {recents.map((r) => (
              <li key={r.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 transition-all duration-300 hover:shadow-sm">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-slate-400">{r.id}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                    <h3 className="text-xs font-bold text-slate-900 font-display leading-tight">{r.type}</h3>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">Logged on {r.date}</p>
                </div>

                <div className="flex items-center">
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${getStatusStyle(r.status)}`}>
                    {r.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
