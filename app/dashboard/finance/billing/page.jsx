'use client';

import { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';

const invoicesSeed = [
  { id: 'INV-1001', patient: 'Ahmed Ali', amount: 'SAR 350', status: 'Unpaid' },
  { id: 'INV-1002', patient: 'Nora Hassan', amount: 'SAR 420', status: 'Paid' },
];

export default function FinanceBilling() {
  const [invoices] = useState(invoicesSeed);

  const getStatusStyle = (status) => {
    if (status.toLowerCase().includes('paid') && !status.toLowerCase().includes('un')) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    }
    return 'bg-rose-50 text-rose-700 border-rose-100';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-violet-500/10 selection:text-violet-705 animate-fade-in">
      <DashboardHeader
        roleLabel="Finance Operations"
        title="Billing Controls"
        description="Verify invoicing records, handle billing exceptions, and log payment clearances."
        accentClass="text-violet-650"
        returnPath="/dashboard/finance"
        returnLabel="Back to Finance"
      />

      <main className="max-w-6xl mx-auto py-8 space-y-6 w-full">
        <section className="bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-display">Invoices List</h2>
            <p className="text-xs text-slate-400 mt-1">Review active invoices, adjust parameters, and clear accounts.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Invoice ID</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Patient</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Total Amount</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Payment Status</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="group hover:bg-slate-50/40 transition-colors">
                    <td className="py-4 font-mono text-xs font-bold text-slate-500">{inv.id}</td>
                    <td className="py-4 text-xs font-bold text-slate-900">{inv.patient}</td>
                    <td className="py-4 text-xs font-semibold text-slate-600">{inv.amount}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${getStatusStyle(inv.status)}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="rounded-xl bg-slate-100 hover:bg-violet-50 text-slate-700 hover:text-violet-750 border border-slate-200 hover:border-violet-200 px-3.5 py-1.5 text-[10px] font-bold active:scale-[0.98] transition">
                        Reconcile Invoice
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
