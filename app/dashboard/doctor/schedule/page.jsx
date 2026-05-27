'use client';

import DashboardHeader from '@/components/DashboardHeader';

const appointments = [
  { time: '08:30', patient: 'Ahmed Ali', room: 'R-101', status: 'Waiting' },
  { time: '09:00', patient: 'Nora Hassan', room: 'R-102', status: 'Checked-in' },
  { time: '10:00', patient: 'Yousef Karim', room: 'R-201', status: 'Cancelled' },
];

export default function DoctorSchedule() {
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'checked-in':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'cancelled':
        return 'bg-slate-50 text-slate-450 border-slate-100';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-100';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-teal-500/10 selection:text-teal-705 animate-fade-in">
      <DashboardHeader
        roleLabel="Clinical Care"
        title="Today's Schedule"
        description="View appointments list, check room details, and coordinate consultations."
        accentClass="text-teal-650"
        returnPath="/dashboard/doctor"
        returnLabel="Back to Doctor"
      />

      <main className="max-w-5xl mx-auto py-8 space-y-6 w-full">
        <section className="bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-display">Appointment Timeline</h2>
            <p className="text-xs text-slate-400 mt-1">Real-time schedule for active outpatient sequences.</p>
          </div>

          <ul className="space-y-4">
            {appointments.map((a, i) => (
              <li key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 transition-all duration-300 hover:shadow-sm">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-slate-450">{a.time}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-250" />
                    <h3 className="text-xs font-bold text-slate-900 font-display leading-tight">{a.patient}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${getStatusStyle(a.status)}`}>
                      {a.status}
                    </span>
                    <span>· Room {a.room}</span>
                  </div>
                </div>

                <div className="flex items-center">
                  <button className="rounded-xl bg-slate-950 hover:bg-teal-700 text-white px-4 py-2 text-[10px] font-bold active:scale-[0.98] transition">
                    Open Chart
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
