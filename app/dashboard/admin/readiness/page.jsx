'use client';

import DashboardHeader from '@/components/DashboardHeader';

const tasks = [
  { id: 'T-01', title: 'Update retention policy in logs', status: 'Open', assignee: 'Lina' },
  { id: 'T-02', title: 'Consent process compliance review', status: 'In progress', assignee: 'Omar' },
  { id: 'T-03', title: 'Train front desk teams on SLA protocols', status: 'Open', assignee: 'Maya' },
];

export default function AdminReadiness() {
  const getStatusStyle = (status) => {
    if (status.toLowerCase().includes('progress')) {
      return 'bg-amber-50 text-amber-700 border-amber-100';
    }
    return 'bg-blue-50 text-blue-700 border-blue-100';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-500/10 selection:text-blue-700 animate-fade-in">
      <DashboardHeader
        roleLabel="Admin Operations"
        title="Operational Readiness"
        description="Verify cybersecurity checklists, operational milestones, and standard policy updates."
        accentClass="text-blue-600"
        returnPath="/dashboard/admin"
        returnLabel="Back to Admin"
      />

      <main className="max-w-6xl mx-auto py-8 space-y-6 w-full">
        <section className="bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-display">Readiness Tasks Checklist</h2>
            <p className="text-xs text-slate-400 mt-1">Assign task checklists and track regulatory milestones.</p>
          </div>

          <ul className="space-y-4">
            {tasks.map((t) => (
              <li key={t.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 transition-all duration-300 hover:shadow-sm">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-slate-400">{t.id}</span>
                    <h3 className="text-xs font-bold text-slate-900 font-display leading-tight">{t.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${getStatusStyle(t.status)}`}>
                      {t.status}
                    </span>
                    <span>· Assigned to {t.assignee}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="rounded-xl bg-slate-950 text-white px-3.5 py-2 text-[10px] font-bold active:scale-[0.98] transition">
                    Assign Task
                  </button>
                  <button className="rounded-xl bg-white border border-slate-250 text-slate-750 hover:bg-slate-50 px-3.5 py-2 text-[10px] font-bold shadow-sm active:scale-[0.98] transition">
                    View Details
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
