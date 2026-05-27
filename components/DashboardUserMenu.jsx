'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardUserMenu() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState({ username: 'User', role: '' });
  const router = useRouter();
  const menuRef = useRef(null);

  useEffect(() => {
    const raw = window.localStorage.getItem('clinicflowSession');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setSession({
          username: parsed.username || 'User',
          role: parsed.role || '',
        });
      } catch (error) {
        console.warn('Unable to parse session data', error);
      }
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('clinicflowSession');
    router.push('/login');
  };

  const getRoleColor = (role) => {
    switch ((role || '').toLowerCase()) {
      case 'admin':
        return 'bg-blue-50 text-blue-700 border-blue-150';
      case 'doctor':
        return 'bg-teal-50 text-teal-700 border-teal-150';
      case 'finance':
        return 'bg-violet-50 text-violet-700 border-violet-150';
      case 'community':
        return 'bg-amber-50 text-amber-700 border-amber-150';
      default:
        return 'bg-slate-50 text-slate-650 border-slate-200';
    }
  };

  return (
    <div ref={menuRef} className="relative text-left">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex items-center gap-3.5 rounded-full border border-slate-200 bg-white pl-2 pr-4.5 py-1.5 text-sm font-semibold text-slate-800 shadow-sm hover:border-slate-350 hover:bg-slate-50 active:scale-[0.98] transition"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-teal-500 to-emerald-450 text-white font-bold text-sm shadow-sm ring-2 ring-white">
          {session.username?.charAt(0).toUpperCase() || 'U'}
        </span>
        <span className="hidden sm:inline-block text-xs font-bold text-slate-800 max-w-[90px] truncate">
          {session.username || 'User'}
        </span>
        <svg
          className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2500/svg"
        >
          <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-40 mt-3.5 w-60 overflow-hidden rounded-[2rem] border border-slate-200/85 bg-white/95 backdrop-blur-md shadow-2xl ring-1 ring-black/5 animate-scale-in">
          {/* Card User Header */}
          <div className="p-5 border-b border-slate-100 bg-slate-50/50">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Signed in as</p>
            <p className="mt-1.5 text-sm font-extrabold text-slate-900 truncate">{session.username || 'User'}</p>
            {session.role && (
              <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider mt-2 ${getRoleColor(session.role)}`}>
                {session.role}
              </span>
            )}
          </div>

          {/* List Options */}
          <div className="p-2 space-y-0.5">
            <Link
              href="/dashboard/profile"
              className="group flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-semibold text-slate-650 hover:bg-slate-50 hover:text-slate-950 transition"
              onClick={() => setOpen(false)}
            >
              <svg className="h-4 w-4 text-slate-400 group-hover:text-slate-700 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>My Profile</span>
            </Link>

            <Link
              href="/dashboard/change-password"
              className="group flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-semibold text-slate-650 hover:bg-slate-50 hover:text-slate-950 transition"
              onClick={() => setOpen(false)}
            >
              <svg className="h-4 w-4 text-slate-400 group-hover:text-slate-700 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Change Password</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="group flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50/50 transition border-t border-slate-50 mt-1"
            >
              <svg className="h-4 w-4 text-rose-400 group-hover:text-rose-600 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
