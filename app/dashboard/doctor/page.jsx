'use client';

import DashboardHeader from '@/components/DashboardHeader';

export default function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-teal-500/10 selection:text-teal-705 animate-fade-in">
      <DashboardHeader
        roleLabel="Clinical Care"
        title="Clinical Hub"
        description="Verify active patient consent records, review consultation schedules, and consult guidelines SOP files."
        accentClass="text-teal-650"
        returnPath="/dashboard"
        returnLabel="Back to Hub"
      />

      <main className="max-w-6xl mx-auto py-8 space-y-8 w-full">
        {/* Doctor command board */}
        <section className="bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 font-display">Clinical Dashboard</h2>
            <p className="text-xs text-slate-400 mt-1">Priority checklists and metrics for clinical practitioners.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
            {/* Priority checklist */}
            <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-750 font-display">Clinical Priorities Today</h3>
              <ul className="space-y-3.5">
                {[
                  'Ensure patient sign-off on consent form before consultations',
                  'Confirm cleaning log clearance for room R-201',
                  'Log encounter notes and diagnoses in compliance schemas',
                  'Review SFDA SaMD checklists for analytical calculators'
                ].map((item, index) => (
                  <li key={index} className="flex gap-3 items-start text-xs text-slate-650 font-medium">
                    <span className="h-5 w-5 rounded-lg bg-teal-55 bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center flex-shrink-0">
                      ✓
                    </span>
                    <span className="leading-5">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* KPI metrics */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-display">Today's Practice Metrics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-2 shadow-sm text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Appointments</span>
                  <strong className="text-2xl font-extrabold text-slate-950 font-display block">12</strong>
                  <span className="inline-block text-[9px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
                    Remaining
                  </span>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-2 shadow-sm text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">No Consent</span>
                  <strong className="text-2xl font-extrabold text-amber-600 font-display block">3</strong>
                  <span className="inline-block text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                    Require sign
                  </span>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-2 shadow-sm text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Alerts</span>
                  <strong className="text-2xl font-extrabold text-rose-600 font-display block">1</strong>
                  <span className="inline-block text-[9px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                    Urgent
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clinical regulatory notice */}
        <section className="bg-slate-950 text-white rounded-2xl p-6 flex gap-4 items-start shadow-md">
          <div className="p-2 bg-teal-600 text-white rounded-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 font-display">Clinical Security & Consent Checkpoint</h4>
            <p className="text-xs text-slate-350 leading-relaxed font-normal">
              According to local data governance regulations, all clinical encounters must be documented with explicit consent before records are committed to the primary registry schema. Verify identity checks before consultations.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
