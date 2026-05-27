'use client';

import DashboardHeader from '@/components/DashboardHeader';

export default function FinanceDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-violet-500/10 selection:text-violet-705 animate-fade-in">
      <DashboardHeader
        roleLabel="Finance Operations"
        title="Finance Hub"
        description="Verify booking transactions, check insurance payer contracts, and log invoice clearance audit trails."
        accentClass="text-violet-650"
        returnPath="/dashboard"
        returnLabel="Back to Hub"
      />

      <main className="max-w-6xl mx-auto py-8 space-y-8 w-full">
        {/* Finance dashboard board */}
        <section className="bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 font-display">Finance Dashboard</h2>
            <p className="text-xs text-slate-400 mt-1">Priority checklists and billing metrics for financial staff.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
            {/* Priority checklist */}
            <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-violet-750 font-display">Operational Tasks Today</h3>
              <ul className="space-y-3.5">
                {[
                  'Reconcile daily booking queues and room slots',
                  'Verify insurance clearances prior to printing final invoice',
                  'Process payment exception logs and billing dispute claims',
                  'Document finance audit files for regulatory inspections'
                ].map((item, index) => (
                  <li key={index} className="flex gap-3 items-start text-xs text-slate-655 font-medium">
                    <span className="h-5 w-5 rounded-lg bg-violet-50 border border-violet-100 text-violet-650 flex items-center justify-center flex-shrink-0">
                      ✓
                    </span>
                    <span className="leading-5">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* KPI metrics */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-display">Current Billing Metrics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-2 shadow-sm text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pending Bookings</span>
                  <strong className="text-2xl font-extrabold text-slate-950 font-display block">14</strong>
                  <span className="inline-block text-[9px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
                    Queue
                  </span>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-2 shadow-sm text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Available Rooms</span>
                  <strong className="text-2xl font-extrabold text-teal-600 font-display block">6</strong>
                  <span className="inline-block text-[9px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100 font-semibold">
                    Vacant
                  </span>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-2 shadow-sm text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Claims Ready</span>
                  <strong className="text-2xl font-extrabold text-violet-600 font-display block">11</strong>
                  <span className="inline-block text-[9px] font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-full border border-violet-100">
                    Clearance
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Regulatory billing notice */}
        <section className="bg-slate-950 text-white rounded-2xl p-6 flex gap-4 items-start shadow-md">
          <div className="p-2 bg-violet-650 text-white rounded-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-violet-400 font-display">Financial Auditing Compliance Checkpoint</h4>
            <p className="text-xs text-slate-350 leading-relaxed font-normal">
              To satisfy SAMA cybersecurity guidelines, financial transactions must be segmentally checked. Verify patient coverage details before generating claims to keep audit logs clean and prevent contract compliance violations.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
