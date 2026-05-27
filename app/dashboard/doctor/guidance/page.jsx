'use client';

import { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';

const docs = [
  { id: 'G-01', title: 'SOP: Consent collection protocols' },
  { id: 'G-02', title: 'Clinical handoff checklist guidelines' },
  { id: 'G-03', title: 'Procedure: Consultation room preparation' },
];

export default function DoctorGuidance() {
  const [query, setQuery] = useState('');
  const filtered = docs.filter((d) => d.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-teal-500/10 selection:text-teal-705 animate-fade-in">
      <DashboardHeader
        roleLabel="Clinical Guidance"
        title="Clinical Library"
        description="Search clinical standard operating procedures (SOP), handoff templates, and directives."
        accentClass="text-teal-650"
        returnPath="/dashboard/doctor"
        returnLabel="Back to Doctor"
      />

      <main className="max-w-6xl mx-auto py-8 space-y-6 w-full">
        <section className="bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-sm space-y-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">SOP Standards</h2>
              <p className="text-xs text-slate-400 mt-1">Search or pin clinical guidelines.</p>
            </div>
            
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search procedures..."
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition w-56 pl-9"
              />
              <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* List */}
          <ul className="space-y-4">
            {filtered.map((d) => (
              <li key={d.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 transition-all duration-300 hover:shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-slate-400">{d.id}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  <h3 className="text-xs font-bold text-slate-900 font-display leading-tight">{d.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button className="rounded-xl bg-slate-950 text-white px-3.5 py-2 text-[10px] font-bold active:scale-[0.98] transition">
                    Open SOP
                  </button>
                  <button className="rounded-xl bg-white border border-slate-250 text-slate-750 hover:bg-slate-50 px-3.5 py-2 text-[10px] font-bold shadow-sm active:scale-[0.98] transition">
                    Pin File
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
