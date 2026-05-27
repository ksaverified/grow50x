'use client';

import { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';

const patientsSeed = [
  { id: 'P-001', name: 'Ahmed Ali', coverage: 'Active', clinic: 'Riyadh', lastVisit: '2026-05-22' },
  { id: 'P-002', name: 'Sara Omar', coverage: 'Pending', clinic: 'Jeddah', lastVisit: '2026-05-20' },
  { id: 'P-003', name: 'Khaled Saleh', coverage: 'Active', clinic: 'Dammam', lastVisit: '2026-05-18' },
];

export default function AdminInsurance() {
  const [query, setQuery] = useState('');
  const filtered = patientsSeed.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.id.toLowerCase().includes(query.toLowerCase())
  );

  const getCoverageStyle = (status) => {
    if (status.toLowerCase().includes('active')) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    }
    return 'bg-amber-50 text-amber-700 border-amber-100';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-500/10 selection:text-blue-700 animate-fade-in">
      <DashboardHeader
        roleLabel="Admin Operations"
        title="Patients & Insurance"
        description="Verify patient identification, review health insurance validity, and confirm branch registry."
        accentClass="text-blue-600"
        returnPath="/dashboard/admin"
        returnLabel="Back to Admin"
      />

      <main className="max-w-6xl mx-auto py-8 space-y-6 w-full">
        <section className="bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-sm space-y-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">Patient Registry</h2>
              <p className="text-xs text-slate-400 mt-1">Search patient data files or register new entries.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name or ID..."
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition w-56 pl-9"
                />
                <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <button className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2.5 text-xs font-bold hover:shadow-lg hover:shadow-blue-600/10 active:scale-[0.98] transition">
                Add Patient
              </button>
            </div>
          </div>

          {/* Table list */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">ID</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Name</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Coverage Status</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Registered Branch</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Last Encounter</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((p) => (
                  <tr key={p.id} className="group hover:bg-slate-50/40 transition-colors">
                    <td className="py-4 font-mono text-xs font-bold text-slate-500">{p.id}</td>
                    <td className="py-4 text-xs font-bold text-slate-900">{p.name}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getCoverageStyle(p.coverage)}`}>
                        {p.coverage}
                      </span>
                    </td>
                    <td className="py-4 text-xs font-semibold text-slate-600">{p.clinic}</td>
                    <td className="py-4 text-xs font-medium text-slate-500">{p.lastVisit}</td>
                    <td className="py-4">
                      <button className="rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200/60 hover:border-blue-200 px-3 py-1.5 text-[10px] font-bold active:scale-[0.98] transition">
                        Verify Claim
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
