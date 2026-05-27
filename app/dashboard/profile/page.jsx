'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const defaultSession = {
  accountId: '',
  username: 'User',
  role: 'Unknown',
  clinicName: 'ClinicFlow',
  email: '',
  specialty: '',
};

const medicalRoles = ['Doctor', 'Nurse'];

export default function ProfilePage() {
  const [session, setSession] = useState(defaultSession);
  const [formState, setFormState] = useState(defaultSession);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const raw = window.localStorage.getItem('clinicflowSession');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        const stored = {
          ...defaultSession,
          ...parsed,
        };
        setSession(stored);
        setFormState(stored);
      } catch (error) {
        console.warn('Unable to parse session data', error);
      }
    }
  }, []);

  const showSpecialty = medicalRoles.includes(session.role);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formState.clinicName.trim()) {
      setMessage('Clinic name is required.');
      return;
    }
    if (showSpecialty && !formState.specialty.trim()) {
      setMessage('Please enter your speciality.');
      return;
    }

    const updatedSession = {
      ...session,
      clinicName: formState.clinicName.trim(),
      email: formState.email.trim(),
      specialty: formState.specialty.trim(),
    };

    window.localStorage.setItem('clinicflowSession', JSON.stringify(updatedSession));
    setSession(updatedSession);
    setMessage('Profile updated successfully.');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-teal-500/10 selection:text-teal-705 animate-fade-in">
      <header className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Account Settings</p>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-1 font-display tracking-tight">My Profile</h1>
            <p className="mt-1.5 text-sm text-slate-500 max-w-2xl font-normal leading-relaxed">
              Verify your clinic metadata and update your email and specialty configurations.
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

      <main className="max-w-7xl mx-auto py-8 w-full">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Left panel: Active configurations */}
          <div className="bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-950 font-display">Active Session</h2>
              <p className="text-xs text-slate-450 mt-1">Read-only account metadata compiled for this session.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-1">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Username</span>
                <span className="text-md font-bold text-slate-900 font-display block">{session.username}</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-1">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Authorized Role</span>
                <span className="text-md font-bold text-slate-900 font-display block">{session.role}</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 sm:col-span-2 space-y-1">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Clinic Node</span>
                <span className="text-md font-bold text-slate-900 font-display block">{session.clinicName}</span>
              </div>
              {session.accountId && (
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 sm:col-span-2 space-y-1">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Account ID</span>
                  <span className="text-md font-mono text-slate-900 block">{session.accountId}</span>
                </div>
              )}
              {showSpecialty && session.specialty && (
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 sm:col-span-2 space-y-1">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Speciality</span>
                  <span className="text-md font-bold text-slate-900 font-display block">{session.specialty}</span>
                </div>
              )}
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-xs text-slate-500 leading-relaxed font-normal">
              Active profile details are kept in browser storage. Changes apply to the current local session scope.
            </div>
          </div>

          {/* Right panel: Edit Form */}
          <div className="bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-950 font-display">Edit Profile</h2>
              <p className="text-xs text-slate-450 mt-1">Adjust session values for testing local workflow scopes.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-650 mb-2">Clinic Name</label>
                <input
                  type="text"
                  value={formState.clinicName}
                  onChange={(event) => setFormState({ ...formState, clinicName: event.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm text-slate-850 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-650 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(event) => setFormState({ ...formState, email: event.target.value })}
                  placeholder="e.g. you@yourclinic.com"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm text-slate-850 transition"
                />
              </div>

              {showSpecialty && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-655 mb-2">Speciality</label>
                  <input
                    type="text"
                    value={formState.specialty}
                    onChange={(event) => setFormState({ ...formState, specialty: event.target.value })}
                    placeholder="e.g. Pediatrics, General Practice"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm text-slate-850 transition"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full px-4 py-3.5 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-teal-600/10 active:scale-[0.98] transition text-sm"
              >
                Save Settings
              </button>

              {message && (
                <div className="p-4 rounded-2xl text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-100 animate-fade-in">
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
