'use client';

import DashboardHeader from '@/components/DashboardHeader';

const rooms = [
  { id: 'R-101', status: 'Occupied', clinic: 'Riyadh' },
  { id: 'R-102', status: 'Available', clinic: 'Riyadh' },
  { id: 'R-201', status: 'Cleaning', clinic: 'Jeddah' },
  { id: 'R-301', status: 'Available', clinic: 'Dammam' },
];

export default function AdminRooms() {
  const getRoomColor = (status) => {
    switch (status.toLowerCase()) {
      case 'available':
        return {
          bg: 'bg-emerald-50/50 border-emerald-200/80',
          text: 'text-emerald-800',
          badge: 'bg-emerald-100/80 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-500'
        };
      case 'cleaning':
        return {
          bg: 'bg-amber-50/50 border-amber-200/80',
          text: 'text-amber-800',
          badge: 'bg-amber-100/80 text-amber-850 border-amber-200',
          dot: 'bg-amber-500'
        };
      default:
        return {
          bg: 'bg-blue-50/50 border-blue-200/80',
          text: 'text-blue-800',
          badge: 'bg-blue-100/80 text-blue-800 border-blue-200',
          dot: 'bg-blue-500'
        };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-500/10 selection:text-blue-700 animate-fade-in">
      <DashboardHeader
        roleLabel="Admin Operations"
        title="Rooms & Schedules"
        description="Monitor room availability, check cleaning logs, and coordinate room assignments across locations."
        accentClass="text-blue-600"
        returnPath="/dashboard/admin"
        returnLabel="Back to Admin"
      />

      <main className="max-w-6xl mx-auto py-8 space-y-6 w-full">
        <section className="bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-display">Active Room Grid</h2>
            <p className="text-xs text-slate-400 mt-1">Real-time status updates and coordinates for medical facilities.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {rooms.map((r) => {
              const styles = getRoomColor(r.status);
              return (
                <div key={r.id} className={`rounded-[2rem] border p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-300 hover:shadow-md ${styles.bg}`}>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${styles.dot}`} />
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{r.id} · {r.clinic}</p>
                    </div>
                    <p className={`text-md font-bold font-display ${styles.text}`}>{r.status}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="rounded-xl bg-slate-950 text-white px-3.5 py-2 text-[10px] font-bold active:scale-[0.98] transition">
                      Assign
                    </button>
                    <button className="rounded-xl bg-white border border-slate-250 text-slate-750 hover:bg-slate-50 px-3.5 py-2 text-[10px] font-bold shadow-sm active:scale-[0.98] transition">
                      Mark Ready
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
