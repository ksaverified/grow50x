'use client';

import { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';

const consentRows = [
  { id: 'P-001', name: 'Ahmed Ali', consent: 'Missing' },
  { id: 'P-002', name: 'Sara Omar', consent: 'Signed' },
  { id: 'P-003', name: 'Khaled Saleh', consent: 'Missing' },
];

export default function DoctorCompliance() {
  const [rows] = useState(consentRows);

  const getConsentStyle = (status) => {
    if (status.toLowerCase().includes('missing')) {
      return 'bg-amber-50 text-amber-700 border-amber-100';
    }
    return 'bg-emerald-50 text-emerald-700 border-emerald-100';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-teal-500/10 selection:text-teal-705 animate-fade-in">
      <DashboardHeader
        roleLabel="Clinical Care"
        title="Clinical Compliance"
        description="Verify active consent approvals, document statuses, and review compliance logs."
        accentClass="text-teal-650"
        returnPath="/dashboard/doctor"
        returnLabel="Back to Doctor"
      />

      <main className="max-w-6xl mx-auto py-8 space-y-6 w-full">
        <section className="bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-display">Consent Checklist</h2>
            <p className="text-xs text-slate-400 mt-1">Check consent authorizations before opening patient charts.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Patient</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Consent Status</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((r) => (
                  <tr key={r.id} className="group hover:bg-slate-50/40 transition-colors">
                    <td className="py-4 text-xs font-bold text-slate-900">{r.name}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${getConsentStyle(r.consent)}`}>
                        {r.consent}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      {r.consent === 'Missing' ? (
                        <button className="rounded-xl bg-amber-500 hover:bg-amber-600 text-white px-3.5 py-1.5 text-[10px] font-bold active:scale-[0.98] transition">
                          Request Consent
                        </button>
                      ) : (
                        <button className="rounded-xl bg-slate-100 hover:bg-slate-250 text-slate-700 hover:text-slate-800 border border-slate-200 px-3.5 py-1.5 text-[10px] font-bold active:scale-[0.98] transition">
                          View PDF
                        </button>
                      )}
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
