'use client';

import Link from 'next/link';

export default function About() {
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
            <Link href="/" className="text-sm text-slate-600 font-semibold hover:text-teal-600 transition">Home</Link>
            <Link href="/plans" className="text-sm text-slate-600 font-semibold hover:text-teal-600 transition">Plans</Link>
            <Link href="/about" className="text-sm text-teal-600 font-bold transition">About</Link>
            <Link href="/login" className="px-4 py-2 bg-slate-950 text-white rounded-full text-xs font-bold hover:bg-teal-700 transition">
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-16 w-full space-y-16">
        
        {/* Intro Section */}
        <section className="max-w-3xl space-y-6 animate-slide-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-150 bg-teal-50/50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800">
            Our Mission & Core Values
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-display">
            Securing clinical workflows for the next generation.
          </h2>
          <p className="text-md text-slate-500 leading-relaxed font-normal">
            ClinicFlow builds specialized clinic environments. We empower medical practices to run smoothly by isolating tenant records, simplifying appointments, and standardizing compliance audits.
          </p>
        </section>

        {/* Division Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch animate-scale-in">
          <div className="glass-card bg-white rounded-3xl p-8 border border-slate-200/80 space-y-4">
            <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm">01</span>
            <h3 className="text-lg font-bold text-slate-900 font-display">Executive Vision</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We design product frameworks and growth models aligned directly with regulatory structures, healthcare compliance guidelines, and medical team experiences.
            </p>
          </div>

          <div className="glass-card bg-white rounded-3xl p-8 border border-slate-200/80 space-y-4">
            <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm">02</span>
            <h3 className="text-lg font-bold text-slate-900 font-display">Product & Workflows</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We craft simplified user interfaces tailored to each role, avoiding workflow clutter so Doctors, Nurses, and Accountants can complete tasks quickly.
            </p>
          </div>

          <div className="glass-card bg-white rounded-3xl p-8 border border-slate-200/80 space-y-4">
            <span className="w-8 h-8 rounded-lg bg-violet-50 text-violet-800 flex items-center justify-center font-bold text-sm">03</span>
            <h3 className="text-lg font-bold text-slate-900 font-display">Engineering Security</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We maintain the tenant-aware architecture, database segmentations, and active cybersecurity audit checkpoints required to keep health files safe.
            </p>
          </div>
        </section>

        {/* Believe Statement Section */}
        <section className="bg-slate-900 text-white rounded-[2.5rem] p-12 border border-slate-800 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -z-10" />
          
          <div className="max-w-2xl space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Our Beliefs</span>
            <h3 className="text-3xl font-extrabold tracking-tight font-display leading-tight">
              Clinical software must be robust, secure, and tailored to daily healthcare needs.
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Every clinic operates differently, but every clinic requires data isolation and absolute stability. ClinicFlow organizes medical records by tenant Account ID, allowing practitioners to sign in and proceed with confidence.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-550 border-t border-slate-900 py-8 text-center text-xs">
        ClinicFlow builds modern multi-tenant clinic operations platforms.
      </footer>
    </div>
  );
}
