'use client';

import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-teal-500/10 selection:text-teal-700 animate-fade-in">
      <header className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight">
            ClinicFlow Multi-Role Hub
          </h1>
          <p className="mt-2 text-sm text-slate-500 max-w-2xl font-normal leading-relaxed">
            Select the designated dashboard for your authorized role to access compliance tasks, operational checkpoints, and financial audits.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-12 w-full">
        {/* Role Selector Grid */}
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {/* Admin card */}
          <Link href="/dashboard/admin" className="group block rounded-[2rem] border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-blue-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-950 font-display group-hover:text-blue-650 transition">Admin</h2>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 border border-blue-100">
                Operations
              </span>
            </div>
            <p className="mt-4 text-xs text-slate-500 leading-relaxed font-normal">
              Manage clinic onboarding setup, database isolation configurations, consent checklist revisions, and MOH readiness tasks.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-blue-600">
              <span>Open admin dashboard</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Doctor card */}
          <Link href="/dashboard/doctor" className="group block rounded-[2rem] border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-teal-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-950 font-display group-hover:text-teal-700 transition">Doctor</h2>
              <span className="rounded-full bg-teal-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-800 border border-teal-100">
                Clinical
              </span>
            </div>
            <p className="mt-4 text-xs text-slate-500 leading-relaxed font-normal">
              Access patient charts, examine active consent statuses, prescriptions records, and today's consultation sequences.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-teal-600 font-semibold">
              <span>Open clinical dashboard</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Finance card */}
          <Link href="/dashboard/finance" className="group block rounded-[2rem] border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-violet-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-950 font-display group-hover:text-violet-650 transition">Finance</h2>
              <span className="rounded-full bg-violet-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-700 border border-violet-100">
                Billing
              </span>
            </div>
            <p className="mt-4 text-xs text-slate-500 leading-relaxed font-normal">
              Review transaction invoicing logs, patient booking queues, insurance exception files, and revenue reconciliation controls.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-violet-600">
              <span>Open finance dashboard</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Community card */}
          <Link href="/dashboard/community" className="group block rounded-[2rem] border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-amber-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-950 font-display group-hover:text-amber-700 transition">Community</h2>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 border border-amber-100">
                Social
              </span>
            </div>
            <p className="mt-4 text-xs text-slate-500 leading-relaxed font-normal">
              Coordinate social network campaigns, publish community updates, and grow the clinic's digital visibility while keeping compliance top of mind.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-amber-700">
              <span>Open community dashboard</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </section>

        {/* Compliance Guidelines */}
        <section className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-display">Compliance Guidance & Growth</h2>
            <p className="text-xs text-slate-400 mt-1">Key healthcare compliance benchmarks for Saudi clinics.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5 space-y-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
              <h3 className="text-xs font-bold text-slate-900 font-display">PDPL Data Residency</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">Keep all Saudi health data localized and segregated from public marketing databases.</p>
            </div>

            <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5 space-y-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
              <h3 className="text-xs font-bold text-slate-900 font-display">NPHIES Clearance</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">Structure transaction billing logs ready for insurance and clearing house checks.</p>
            </div>

            <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5 space-y-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 inline-block" />
              <h3 className="text-xs font-bold text-slate-900 font-display">NCA Cybersecurity</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">Employ detailed session audit logs and role controls to protect health record integrity.</p>
            </div>

            <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5 space-y-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
              <h3 className="text-xs font-bold text-slate-900 font-display">SFDA SaMD Review</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">Review analytical tools or decision indicators for medical device classifications.</p>
            </div>

            <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5 space-y-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              <h3 className="text-xs font-bold text-slate-900 font-display">Social Lead Funnel</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">Leverage social leads safely by segregating patient EHR from capture lists.</p>
            </div>
          </div>
        </section>

        {/* Note section */}
        <section className="rounded-2xl border border-teal-150 bg-teal-50/40 p-6 flex gap-4 items-start">
          <div className="p-2 bg-teal-500 text-white rounded-xl shadow-sm">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-850 font-display">Operational Security Notice</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              These dashboards are configured for role separation. Confirm consent status prior to opening any patient clinical details to minimize medical risk.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
