'use client';

import DashboardHeader from '@/components/DashboardHeader';

const patients = [
  { id: 'P-001', name: 'Ahmed Ali', flag: 'Needs consent' },
  { id: 'P-004', name: 'Nora Hassan', flag: 'Follow-up' },
  { id: 'P-007', name: 'Yousef Karim', flag: 'None' },
];

export default function DoctorSummary() {
  const getFlagStyle = (flag) => {
    switch (flag.toLowerCase()) {
      case 'needs consent':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'follow-up':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      default:
        return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-teal-500/10 selection:text-teal-705 animate-fade-in">
      <DashboardHeader
        roleLabel="Clinical Care"
        title="Clinical Summary"
        description="Monitor current patient load, verify active consents, and check clinic alerts."
        accentClass="text-teal-650"
        returnPath="/dashboard/doctor"
        returnLabel="Back to Doctor"
      />

      <main className="max-w-5xl mx-auto py-8 space-y-6 w-full">
        {/* Roster card grid */}
        <section className="grid gap-6 sm:grid-cols-3">
          {patients.map((p) => (
            <div key={p.id} className="bg-white border border-slate-200/80 rounded-[2rem] p-6 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-teal-200">
              <div className="space-y-3">
                <span className="font-mono text-[10px] font-bold text-slate-450 uppercase tracking-wider block">{p.id}</span>
                <h3 className="text-md font-bold text-slate-900 font-display tracking-tight">{p.name}</h3>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${getFlagStyle(p.flag)}`}>
                  {p.flag}
                </span>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2">
                <button className="flex-1 rounded-xl bg-slate-950 text-white px-3 py-2 text-[10px] font-bold active:scale-[0.98] transition">
                  Open Chart
                </button>
                <button className="rounded-xl bg-white border border-slate-250 text-slate-750 hover:bg-slate-50 px-3 py-2 text-[10px] font-bold shadow-sm active:scale-[0.98] transition">
                  Flag
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
