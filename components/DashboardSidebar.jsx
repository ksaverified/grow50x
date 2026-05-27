'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Icon({ name, active }) {
  const common = `w-5 h-5 transition-colors ${active ? 'text-teal-650' : 'text-slate-500 group-hover:text-slate-800'}`;
  switch ((name || '').toLowerCase()) {
    case 'overview':
    case 'summary':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="9" />
          <rect x="14" y="3" width="7" height="5" />
          <rect x="14" y="12" width="7" height="9" />
          <rect x="3" y="16" width="7" height="5" />
        </svg>
      );
    case 'patients':
    case 'payer':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'rooms':
    case 'bookings':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 3v18" />
          <path d="M15 3v18" />
          <path d="M3 9h18" />
          <path d="M3 15h18" />
        </svg>
      );
    case 'readiness':
    case 'compliance':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case 'schedule':
    case 'appointments':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case 'guidance':
    case 'sop':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case 'billing':
    case 'invoice':
    case 'insurance':
    case 'finance':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <line x1="12" y1="4" x2="12" y2="20" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      );
    case 'community':
    case 'posts':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5a4 4 0 100 8 4 4 0 000-8z" />
          <path d="M6 21a6 6 0 0112 0" />
        </svg>
      );
    case 'analytics':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19h16" />
          <path d="M6 15v4" />
          <path d="M10 11v8" />
          <path d="M14 7v12" />
          <path d="M18 3v16" />
        </svg>
      );
    default:
      return <div className="w-5 h-5 rounded-full border border-slate-300" />;
  }
}

export default function DashboardSidebar({ title = 'Menu', items = [] }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sidebar-collapsed');
      if (saved !== null) setCollapsed(saved === 'true');
    } catch (e) {}
  }, []);

  const toggleCollapse = () => {
    setCollapsed((c) => {
      const next = !c;
      try {
        localStorage.setItem('sidebar-collapsed', next ? 'true' : 'false');
      } catch (e) {}
      return next;
    });
  };

  const containerClass = collapsed ? 'w-[88px]' : 'w-76';

  const content = (
    <aside className={`${containerClass} min-h-[calc(100vh-2rem)] bg-white rounded-3xl border border-slate-200/80 p-4 flex flex-col md:sticky md:top-6 transition-all duration-300 ease-in-out shadow-sm relative`}>
      {/* Brand Header */}
      <div className={`flex items-center border-b border-slate-100 mb-4 py-3 ${collapsed ? 'justify-center px-0' : 'justify-between px-2'}`}>
        <Link href="/" className={`flex items-center gap-3 ${collapsed ? '' : 'overflow-hidden'} group`} aria-label="Go to ClinicFlow homepage">
          <div className="rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-450 p-2.5 shadow-md shadow-teal-500/10 text-white flex-shrink-0 group-hover:shadow-teal-500/20 transition">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          {!collapsed && (
            <div className="flex flex-col animate-fade-in">
              <span className="text-md font-bold tracking-tight text-slate-900 font-display">ClinicFlow</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{title}</span>
            </div>
          )}
        </Link>

        <button
          aria-label="Toggle sidebar collapse"
          onClick={toggleCollapse}
          className="hidden md:flex absolute top-7 -right-3.5 h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 shadow-md hover:scale-105 active:scale-95 transition-all duration-200 z-30"
        >
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 px-1 overflow-y-auto space-y-1.5 py-2">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              title={item.label}
              className={`group flex items-center gap-3.5 rounded-2xl px-3.5 py-3 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-slate-50 text-slate-950 shadow-sm border-l-4 border-teal-500 pl-2.5'
                  : 'text-slate-600 hover:bg-slate-50/60 hover:text-slate-900'
              } ${collapsed ? 'justify-center pl-3.5' : ''}`}
            >
              <div className="flex-shrink-0">
                <Icon name={item.icon} active={isActive} />
              </div>
              {!collapsed && (
                <div className="flex flex-col flex-1 min-w-0 animate-fade-in">
                  <span className={`font-semibold truncate text-[13px] ${isActive ? 'text-slate-900' : 'text-slate-800 group-hover:text-slate-950'}`}>
                    {item.label}
                  </span>
                  <span className="text-[11px] text-slate-400 group-hover:text-slate-500 truncate mt-0.5">
                    {item.description}
                  </span>
                </div>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );

  return (
    <>
      <div className="hidden md:block">{content}</div>

      {/* Mobile: Header navigation trigger */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border border-slate-200/80 rounded-2xl shadow-sm mb-4">
        <Link href="/" className="flex items-center gap-2 group" aria-label="Go to ClinicFlow homepage">
          <div className="rounded-lg bg-teal-500 p-2 text-white shadow-sm group-hover:shadow-teal-500/20 transition">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <span className="text-md font-extrabold tracking-tight text-slate-900 font-display">ClinicFlow</span>
        </Link>
        <button
          aria-label="Open navigation drawer"
          onClick={() => setMobileOpen(true)}
          className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-650 hover:bg-slate-100 shadow-sm transition"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex animate-fade-in">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <div className="relative w-80 p-5 bg-white shadow-2xl h-full flex flex-col animate-scale-in">
              <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100">
                <span className="text-md font-bold tracking-tight text-slate-900 font-display">Navigation</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation drawer"
                  className="p-1 rounded-lg border border-slate-200 hover:bg-slate-50"
                >
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2">
                {items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3.5 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                        isActive ? 'bg-teal-50 text-teal-900 border-l-4 border-teal-500' : 'text-slate-650 hover:bg-slate-50'
                      }`}
                    >
                      <Icon name={item.icon} active={isActive} />
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900">{item.label}</span>
                        <span className="text-[10px] text-slate-400 mt-0.5">{item.description}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
