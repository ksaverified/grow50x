'use client';

import DashboardHeader from '@/components/DashboardHeader';

const kpis = [
  { label: 'Active Clinics', value: '8', trend: 'Stable' },
  { label: 'Compliance Score', value: '92%', trend: '90% required' },
  { label: 'Open Risks', value: '3', trend: 'Needs action' },
  { label: 'Consent Backlog', value: '24', trend: 'High priority' },
];

const audits = [
  { id: 'A-1001', item: 'Data retention policy audit', status: 'Open', owner: 'Lina' },
  { id: 'A-1002', item: 'Consent process alignment review', status: 'In progress', owner: 'Omar' },
  { id: 'A-1003', item: 'Room cleaning SLAs review', status: 'Open', owner: 'Maya' },
];

export default function AdminOverview() {
  const getStatusStyle = (status) => {
    if (status.toLowerCase().includes('progress')) {
      return 'bg-amber-50 text-amber-700 border border-amber-100';
    }
    return 'bg-orange-50 text-orange-700 border border-orange-100';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-500/10 selection:text-blue-700 animate-fade-in">
      <DashboardHeader
        roleLabel="Admin Operations"
        title="Clinic Overview"
        description="High-level performance monitoring, compliance records, and active audit checks across all clinics."
        accentClass="text-blue-600"
        returnPath="/dashboard/admin"
        returnLabel="Back to Admin"
      />

      <main className="max-w-6xl mx-auto py-8 space-y-8 w-full">
        {/* KPI Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {kpis.map((k) => (
            <div key={k.label} className="bg-white border border-slate-200/80 rounded-[1.5rem] p-5 shadow-sm space-y-2.5">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{k.label}</p>
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-extrabold text-slate-900 font-display tracking-tight">{k.value}</p>
                <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
                  {k.trend}
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* Audits Card Table */}
        <section className="bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-display">Recent Compliance Audits</h3>
            <p className="text-xs text-slate-400 mt-1">Track regulatory actions, compliance items, and assignees.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">ID</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Audit Item</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Status</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Assignee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {audits.map((a) => (
                  <tr key={a.id} className="group hover:bg-slate-50/40 transition-colors">
                    <td className="py-4 font-mono text-xs font-bold text-slate-500">{a.id}</td>
                    <td className="py-4 text-xs font-semibold text-slate-850">{a.item}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(a.status)}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="py-4 text-xs font-medium text-slate-500">{a.owner}</td>
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
