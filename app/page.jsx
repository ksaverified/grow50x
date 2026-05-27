'use client';

import Link from 'next/link';
import { useState } from 'react';
import ContactModal from '@/components/ContactModal';

export default function Home() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-teal-500/10 selection:text-teal-700">
      {/* Sticky Premium Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3.5 hover:opacity-90 transition">
            <div className="rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-450 p-2.5 shadow-md shadow-teal-500/10 text-white">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 font-display">ClinicFlow</h1>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">Practice Management</p>
            </div>
          </Link>
          <nav className="flex gap-6 items-center">
            <Link href="/plans" className="text-sm text-slate-600 font-semibold hover:text-teal-600 transition">Plans</Link>
            <Link href="/about" className="text-sm text-slate-600 font-semibold hover:text-teal-650 hover:text-teal-600 transition">About Us</Link>
            <Link href="/login" className="px-5 py-2.5 bg-slate-950 text-white rounded-full text-xs font-bold hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-700/10 active:scale-[0.98] transition">
              Clinic Sign In
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-16 pb-20 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-150 bg-teal-50/50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              Trusted by Clinics & Healthcare Hubs
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-slate-900 leading-[1.1] font-display tracking-tight">
              Simplify your clinic <span className="text-gradient-teal">operations</span> & scheduling.
            </h2>
            <p className="text-md text-slate-500 leading-relaxed max-w-xl font-normal">
              Empower front-desk coordinators, clinicians, and finance controllers with one unified, clinic-focused platform. Compliant with local cybersecurity and data residency requirements.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/plans" className="px-7 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-2xl font-bold hover:shadow-xl hover:shadow-teal-600/15 active:scale-[0.98] transition text-sm">
                Explore Plans
              </Link>
              <button onClick={() => setIsDemoOpen(true)} className="px-7 py-4 bg-white border border-slate-200 text-slate-800 rounded-2xl font-bold hover:bg-slate-50 hover:border-slate-300 shadow-sm active:scale-[0.98] transition text-sm">
                Request Live Demo
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 gap-6 text-sm">
              <div className="space-y-1.5">
                <p className="font-bold text-slate-900 font-display flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Easy Onboarding
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">Migrate existing records in minutes with our automated schema importer.</p>
              </div>
              <div className="space-y-1.5">
                <p className="font-bold text-slate-900 font-display flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Clinic-First UX
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">Role-specific dashboards designed to prevent workspace clutter and focus actions.</p>
              </div>
            </div>
          </div>

          {/* Premium CSS-based Dashboard Mockup */}
          <div className="w-full relative flex justify-center lg:justify-end animate-scale-in">
            {/* Ambient Background Glow */}
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-violet-400/10 rounded-full blur-3xl -z-10" />

            <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-3xl shadow-2xl p-5 space-y-4">
              {/* Mock Browser Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-450" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-450" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-450" />
                </div>
                <div className="px-4 py-0.5 rounded-md bg-slate-50 border border-slate-100 text-[10px] text-slate-400 font-mono">
                  app.clinicflow.com
                </div>
                <div className="w-4" />
              </div>

              {/* Mock App Content */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="h-4 w-28 bg-slate-200 rounded-md" />
                    <div className="h-2.5 w-40 bg-slate-100 rounded-md" />
                  </div>
                  <span className="h-6 w-16 rounded-full bg-teal-50 border border-teal-100 text-[10px] text-teal-700 font-bold flex items-center justify-center">
                    Active Hub
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <div className="border border-slate-100 rounded-2xl p-3 space-y-2 bg-slate-50/50">
                    <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold text-xs">A</div>
                    <div className="h-2.5 w-10 bg-slate-200 rounded-sm" />
                    <div className="h-1.5 w-12 bg-slate-150 rounded-sm" />
                  </div>
                  <div className="border border-slate-100 rounded-2xl p-3 space-y-2 bg-slate-50/50">
                    <div className="w-6 h-6 rounded-lg bg-teal-500/10 text-teal-600 flex items-center justify-center font-bold text-xs">D</div>
                    <div className="h-2.5 w-10 bg-slate-200 rounded-sm" />
                    <div className="h-1.5 w-12 bg-slate-150 rounded-sm" />
                  </div>
                  <div className="border border-slate-100 rounded-2xl p-3 space-y-2 bg-slate-50/50">
                    <div className="w-6 h-6 rounded-lg bg-violet-500/10 text-violet-600 flex items-center justify-center font-bold text-xs">F</div>
                    <div className="h-2.5 w-10 bg-slate-200 rounded-sm" />
                    <div className="h-1.5 w-12 bg-slate-150 rounded-sm" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="h-3 w-32 bg-slate-200 rounded-md" />
                  <div className="border border-slate-150 rounded-2xl p-3.5 space-y-2.5 bg-slate-50/20">
                    <div className="flex justify-between items-center">
                      <div className="h-2.5 w-24 bg-slate-200 rounded-sm" />
                      <div className="h-2.5 w-8 bg-slate-150 rounded-sm" />
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                      <div className="h-2.5 w-20 bg-slate-200 rounded-sm" />
                      <div className="h-2.5 w-12 bg-slate-150 rounded-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section className="bg-slate-100/50 border-y border-slate-200/60 py-20">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            <div className="space-y-3 text-center max-w-xl mx-auto">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-600">Built for Modern Practices</h3>
              <h4 className="text-3xl font-bold tracking-tight text-slate-900 font-display">
                Tailored workflows for every healthcare team member
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card bg-white rounded-3xl p-8 space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center shadow-inner">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h5 className="text-lg font-bold text-slate-900 font-display">Appointments & Scheduling</h5>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Smart calendars with automated SMS & WhatsApp confirmations to optimize clinic slot occupancy and lower no-shows.
                </p>
              </div>

              <div className="glass-card bg-white rounded-3xl p-8 space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center shadow-inner">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h5 className="text-lg font-bold text-slate-900 font-display">Clinical Records</h5>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Secure, searchable electronic health records (EHR) featuring audit trails, active medication tracking, and role-based access.
                </p>
              </div>

              <div className="glass-card bg-white rounded-3xl p-8 space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-violet-500/10 text-violet-650 flex items-center justify-center shadow-inner">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h5 className="text-lg font-bold text-slate-900 font-display">Billing & Payments</h5>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Unified invoicing, claims verification, and direct reconciliation dashboards built for financial auditors and controllers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-600">Customer Success</h3>
            <h4 className="text-3xl font-bold tracking-tight text-slate-900 font-display">
              Clinics operating at peak efficiency
            </h4>
            <blockquote className="relative bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm">
              <span className="absolute top-4 left-4 text-slate-100 text-6xl font-serif select-none pointer-events-none">“</span>
              <p className="text-slate-600 leading-relaxed italic relative z-10">
                ClinicFlow reduced administrative workload by 40% in our first month. The role-based layouts allowed our clinicians and receptionists to adopt the tool in days without training.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-teal-800 border border-slate-200">
                  DA
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 font-display">Dr. Aisha</p>
                  <p className="text-xs text-slate-400">Chief Medical Officer, Al Noor Clinic</p>
                </div>
              </div>
            </blockquote>
          </div>

          <div className="flex justify-center relative">
            {/* Decorative checks widget mockup */}
            <div className="w-full max-w-xs bg-slate-950 text-white rounded-3xl shadow-xl p-6 space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Clinic Readiness Check</p>
              <div className="space-y-2.5">
                <div className="flex items-center gap-3 bg-white/5 rounded-xl p-2.5 border border-white/10">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">✓</span>
                  <span className="text-xs font-medium">PDPL Compliance Audit</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 rounded-xl p-2.5 border border-white/10">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">✓</span>
                  <span className="text-xs font-medium">Data Isolated Storage</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 rounded-xl p-2.5 border border-white/10">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">✓</span>
                  <span className="text-xs font-medium">Roles Access Constraints</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="bg-gradient-to-tr from-slate-900 to-slate-950 text-white text-center py-20 border-t border-slate-800">
          <div className="max-w-4xl mx-auto px-6 space-y-8">
            <h4 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight leading-tight">
              Ready to streamline your clinic management?
            </h4>
            <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
              Create your clinic tenant network, onboard practitioners, and handle appointments safely in a compliant workflow.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/plans" className="px-6 py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-teal-500/10 active:scale-[0.98] transition text-sm">
                Get Started
              </Link>
              <button onClick={() => setIsDemoOpen(true)} className="px-6 py-3.5 bg-white/10 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/15 transition text-sm">
                Schedule Demo
              </button>
            </div>
          </div>
        </section>
      </main>

      <ContactModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 border-t border-slate-900 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} ClinicFlow Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-slate-450">Multi-tenant medical practice management.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
