'use client';

import DashboardHeader from '@/components/DashboardHeader';

const payers = [
  { name: 'Saudi Health Plus', status: 'Active', coverage: '98%' },
  { name: 'GOSI Care Network', status: 'Pending', coverage: '91%' },
  { name: 'Najm Medical', status: 'Expiring', coverage: '87%' },
];

export default function FinanceInsurance() {
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      default:
        return 'bg-rose-50 text-rose-700 border-rose-100';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-violet-500/10 selection:text-violet-705 animate-fade-in">
      <DashboardHeader
        roleLabel="Finance Operations"
        title="Insurance Payers"
        description="Monitor active insurance contracts, verify coverage rates, and log payer clearances."
        accentClass="text-violet-650"
        returnPath="/dashboard/finance"
        returnLabel="Back to Finance"
      />

      <main className="max-w-6xl mx-auto py-8 space-y-6 w-full">
        <section className="bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-display">Registered Payers</h2>
            <p className="text-xs text-slate-400 mt-1">Review payer statuses and active claim coverage metrics.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Payer Name</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Contract Status</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Avg. Coverage Level</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payers.map((p) => (
                  <tr key={p.name} className="group hover:bg-slate-50/40 transition-colors">
                    <td className="py-4 text-xs font-bold text-slate-900">{p.name}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${getStatusStyle(p.status)}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-4 text-xs font-semibold text-slate-500">{p.coverage}</td>
                    <td className="py-4 text-right">
                      <button className="rounded-xl bg-slate-100 hover:bg-violet-50 text-slate-700 hover:text-violet-750 border border-slate-200 hover:border-violet-200 px-3.5 py-1.5 text-[10px] font-bold active:scale-[0.98] transition">
                        Prepare Claims
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
