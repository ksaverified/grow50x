'use client';

import Link from 'next/link';
import { useState } from 'react';
import ContactModal from '@/components/ContactModal';

export default function Plans() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Pro Practice');

  const openPlanModal = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-teal-500/10 selection:text-teal-700">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3.5 hover:opacity-90 transition">
            <div className="rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-450 p-2 shadow-md shadow-teal-500/10 text-white">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 font-display">ClinicFlow</h1>
            </div>
          </Link>
          <nav className="flex gap-6 items-center">
            <Link href="/" className="text-sm text-slate-650 font-semibold hover:text-teal-650 transition">Home</Link>
            <Link href="/plans" className="text-sm text-teal-650 font-bold transition">Plans</Link>
            <Link href="/about" className="text-sm text-slate-650 font-semibold hover:text-teal-650 transition">About</Link>
            <Link href="/login" className="px-4 py-2 bg-slate-950 text-white rounded-full text-xs font-bold hover:bg-teal-700 transition">
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      {/* Pricing cards */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-16 w-full space-y-16">
        <section className="text-center max-w-2xl mx-auto space-y-4 animate-slide-up">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 font-display">
            Structured plans to grow your <span className="text-gradient-teal">practice</span>.
          </h2>
          <p className="text-md text-slate-505 text-slate-500 font-normal leading-relaxed">
            Choose the package that aligns with your clinic scale and requirements. Each plan maintains fully isolated data residency, compliant with security standards.
          </p>
        </section>

        {/* Pricing Cards Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch animate-scale-in">
          {/* Basic Plan */}
          <div className="glass-card bg-white rounded-[2rem] p-8 flex flex-col justify-between border border-slate-200/80">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-950 font-display">Basic</h3>
                <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  Available Now
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-extrabold text-slate-900 font-display">SAR 2,000</p>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">/ clinic / month</p>
                <p className="text-[11px] text-slate-500 bg-slate-50 rounded-lg py-1 px-3.5 border border-slate-100 w-fit">SAR 10,000 Setup Fee</p>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <ul className="space-y-3.5 text-xs text-slate-600">
                  <li className="flex items-center gap-3">
                    <span className="text-teal-605 font-bold text-teal-600 text-sm">✓</span> Lead-to-booking flows
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-teal-605 font-bold text-teal-600 text-sm">✓</span> Arabic WhatsApp AI agent
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-teal-605 font-bold text-teal-600 text-sm">✓</span> Scheduling & calendar
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-teal-605 font-bold text-teal-600 text-sm">✓</span> PDPL consent checklists
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-teal-605 font-bold text-teal-600 text-sm">✓</span> Standard reporting tools
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-slate-100">
              <button
                type="button"
                onClick={() => openPlanModal('Basic')}
                className="block text-center w-full px-4 py-3 bg-slate-950 hover:bg-teal-700 text-white rounded-2xl text-xs font-bold active:scale-[0.98] transition"
              >
                Start Basic Plan
              </button>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-[2rem] p-8 flex flex-col justify-between border-2 border-teal-500 shadow-2xl relative transform lg:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
              Most Popular
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-950 font-display">Pro Practice</h3>
                <span className="inline-flex items-center rounded-full bg-teal-50 text-teal-800 border border-teal-150 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  Phase 2 Launch
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-extrabold text-slate-900 font-display">SAR 4,000</p>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">/ clinic / month</p>
                <p className="text-[11px] text-teal-700 bg-teal-50/50 rounded-lg py-1 px-3.5 border border-teal-100 w-fit">SAR 15,000 Setup Fee</p>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <ul className="space-y-3.5 text-xs text-slate-600">
                  <li className="flex items-center gap-3">
                    <span className="text-teal-605 font-bold text-teal-600 text-sm">✓</span> <strong>Everything in Basic</strong>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-teal-605 font-bold text-teal-600 text-sm">✓</span> Multi-branch synchronization
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-teal-605 font-bold text-teal-600 text-sm">✓</span> Smart reputation system
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-teal-605 font-bold text-teal-600 text-sm">✓</span> Custom dashboard filters
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-teal-605 font-bold text-teal-600 text-sm">✓</span> Payer contract integrations
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-slate-100">
              <button
                type="button"
                onClick={() => openPlanModal('Pro Practice')}
                className="block text-center w-full px-4 py-3.5 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-2xl text-xs font-bold hover:shadow-lg hover:shadow-teal-600/10 active:scale-[0.98] transition"
              >
                Choose Pro Plan
              </button>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="glass-card bg-white rounded-[2rem] p-8 flex flex-col justify-between border border-slate-200/80">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-950 font-display">Enterprise</h3>
                <span className="inline-flex items-center rounded-full bg-violet-50 text-violet-800 border border-violet-150 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  Phase 3 Custom
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-extrabold text-slate-900 font-display">Custom Quote</p>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">For Hospital Networks</p>
                <p className="text-[11px] text-slate-500 bg-slate-50 rounded-lg py-1 px-3.5 border border-slate-100 w-fit">Bespoke SLA Setup</p>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <ul className="space-y-3.5 text-xs text-slate-655">
                  <li className="flex items-center gap-3">
                    <span className="text-teal-605 font-bold text-teal-600 text-sm">✓</span> <strong>Everything in Pro</strong>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-teal-605 font-bold text-teal-600 text-sm">✓</span> Active Hospital SSO & SAML
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-teal-605 font-bold text-teal-600 text-sm">✓</span> Full custom EHR migrations
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-teal-605 font-bold text-teal-600 text-sm">✓</span> Dedicated support managers
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-teal-605 font-bold text-teal-600 text-sm">✓</span> White-label portal option
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-slate-100">
              <button
                type="button"
                onClick={() => openPlanModal('Enterprise')}
                className="block text-center w-full px-4 py-3 bg-white border border-slate-200 text-slate-800 rounded-2xl text-xs font-bold hover:bg-slate-50 active:scale-[0.98] transition"
              >
                Contact Partner Sales
              </button>
            </div>
          </div>
        </section>

        {/* Roles Details Grid */}
        <section className="bg-white border border-slate-200/80 rounded-[2.5rem] p-12 shadow-sm space-y-10">
          <h3 className="text-2xl font-bold tracking-tight text-center text-slate-900 font-display">
            Built-in security structures for every role
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700 font-bold text-sm">
                A
              </span>
              <h4 className="text-lg font-bold text-slate-900 font-display">Clinic Administrators</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Full settings panels for database monitoring, checklist compliance updates, and audit log validations.
              </p>
            </div>

            <div className="space-y-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-700 font-bold text-sm">
                D
              </span>
              <h4 className="text-lg font-bold text-slate-900 font-display">Medical Doctors</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Clinical encounter timelines, patient medical histories, clinical alerts, and NPHIES interoperable records.
              </p>
            </div>

            <div className="space-y-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-800 font-bold text-sm">
                F
              </span>
              <h4 className="text-lg font-bold text-slate-900 font-display">Finance Controllers</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Billing invoice clearances, insurance payer exception logs, and financial reconciliation matrices.
              </p>
            </div>
          </div>
        </section>
      </main>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} plan={selectedPlan} />

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-550 border-t border-slate-900 py-8 text-center text-xs">
        ClinicFlow practice management structures are compliant with Saudi cybersecurity guidelines.
      </footer>
    </div>
  );
}
