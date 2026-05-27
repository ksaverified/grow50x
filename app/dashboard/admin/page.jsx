'use client';

import DashboardHeader from '@/components/DashboardHeader';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-500/10 selection:text-blue-700 animate-fade-in">
      <DashboardHeader
        roleLabel="Admin Operations"
        title="Admin Hub"
        description="Configure tenant mappings, monitor active clinic nodes, and audit regulatory compliance checklists."
        accentClass="text-blue-600"
        returnPath="/dashboard"
        returnLabel="Back to Hub"
      />

      <main className="max-w-6xl mx-auto py-8 space-y-8 w-full">
        {/* Command Center */}
        <section className="bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 font-display">Administrative Overview</h2>
            <p className="text-xs text-slate-400">Core metrics and operational priorities for the admin role.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
            {/* Action items list */}
            <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-750 font-display">Today's Action Checklist</h3>
              <ul className="space-y-3.5">
                {[
                  'Verify data isolation parameters for new branch',
                  'Validate pending insurance payer contract renewals',
                  'Confirm cleaning log protocols for surgical rooms',
                  'Run daily NPHIES schema integration checkpoints'
                ].map((item, index) => (
                  <li key={index} className="flex gap-3 items-start text-xs text-slate-600 font-medium">
                    <span className="h-5 w-5 rounded-lg bg-blue-50 border border-blue-100 text-blue-650 flex items-center justify-center flex-shrink-0">
                      ✓
                    </span>
                    <span className="leading-5">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual KPI widgets */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-display">Quick Performance Metrics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-2 shadow-sm text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Clinics</span>
                  <strong className="text-2xl font-extrabold text-slate-950 font-display block">8</strong>
                  <span className="inline-block text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    +1 new
                  </span>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-2 shadow-sm text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Audits</span>
                  <strong className="text-2xl font-extrabold text-slate-950 font-display block">5</strong>
                  <span className="inline-block text-[9px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                    Pending
                  </span>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-2 shadow-sm text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Risks</span>
                  <strong className="text-2xl font-extrabold text-orange-600 font-display block">3</strong>
                  <span className="inline-block text-[9px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
                    Action req.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Info card */}
        <section className="bg-slate-950 text-white rounded-2xl p-6 flex gap-4 items-start shadow-md">
          <div className="p-2 bg-blue-650 text-white rounded-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300 font-display">Security Notice for Admin Roles</h4>
            <p className="text-xs text-slate-350 leading-relaxed font-normal">
              Admin users have configuration access to clinic metadata. Please do not modify database ports or schema endpoints unless performing scheduled operations. All admin mutations are logged.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
