'use client';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl shadow-lg p-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">ClinicFlow Dashboard</h1>
          <p className="text-slate-600 mb-8">
            You have successfully signed in. This is a placeholder dashboard page for clinic users.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Admin</h2>
              <p className="text-slate-600">Manage clinics, users, and tenant settings from one place.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Doctor</h2>
              <p className="text-slate-600">Access patient records, visits, and clinical workflows.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Finance</h2>
              <p className="text-slate-600">Handle billing, invoices, and payment workflows for the clinic.</p>
            </div>
          </div>
          <div className="mt-10 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <p className="text-blue-900 font-semibold">Next step:</p>
            <p className="text-slate-700">Wire real tenant session state and role-based pages once authentication and session storage are implemented.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
