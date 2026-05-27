'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ChangePasswordPage() {
  const [formState, setFormState] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formState.currentPassword || !formState.newPassword || !formState.confirmPassword) {
      setMessage('Please fill in all fields.');
      return;
    }
    if (formState.newPassword !== formState.confirmPassword) {
      setMessage('New password and confirm password do not match.');
      return;
    }
    setMessage('Password change request submitted. This is a demo placeholder.');
    setFormState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-teal-500/10 selection:text-teal-705 animate-fade-in">
      <header className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Account Settings</p>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-1 font-display tracking-tight">Update Password</h1>
            <p className="mt-1.5 text-sm text-slate-500 max-w-2xl font-normal leading-relaxed">
              Input your active password credentials to authorize updates.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-650 hover:bg-slate-50 shadow-sm active:scale-[0.98] transition"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </header>

      <main className="max-w-xl mx-auto py-8 w-full">
        <div className="bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-sm space-y-6 animate-scale-in">
          <div>
            <h2 className="text-lg font-bold text-slate-950 font-display">Security Settings</h2>
            <p className="text-xs text-slate-450 mt-1">Submit new access codes for authorization keys.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-650 mb-2">Current Password</label>
              <input
                type="password"
                value={formState.currentPassword}
                onChange={(event) => setFormState({ ...formState, currentPassword: event.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm text-slate-850 transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-650 mb-2">New Password</label>
              <input
                type="password"
                value={formState.newPassword}
                onChange={(event) => setFormState({ ...formState, newPassword: event.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm text-slate-850 transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-655 mb-2">Confirm New Password</label>
              <input
                type="password"
                value={formState.confirmPassword}
                onChange={(event) => setFormState({ ...formState, confirmPassword: event.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm text-slate-850 transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3.5 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-teal-600/10 active:scale-[0.98] transition text-sm"
            >
              Update Password
            </button>

            {message && (
              <div className={`p-4 rounded-2xl text-xs font-semibold animate-fade-in ${
                message.includes('submitted')
                  ? 'bg-teal-50 text-teal-800 border border-teal-100'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}>
                {message}
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
