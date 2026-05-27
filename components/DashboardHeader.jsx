'use client';

import Link from 'next/link';
import DashboardUserMenu from '@/components/DashboardUserMenu';

export default function DashboardHeader({
  roleLabel,
  title,
  description,
  accentClass = 'text-blue-600',
  returnPath = '/dashboard',
  returnLabel = 'Return to Hub',
}) {
  // Determine badge colors based on accent class
  const getBadgeStyle = () => {
    if (accentClass.includes('teal')) {
      return 'bg-teal-50 text-teal-700 border-teal-100';
    }
    if (accentClass.includes('violet')) {
      return 'bg-violet-50 text-violet-700 border-violet-100';
    }
    return 'bg-blue-50 text-blue-700 border-blue-100';
  };

  return (
    <header className="glass-panel border-b border-slate-200/80 sticky top-0 z-30 w-full backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${getBadgeStyle()}`}>
              {roleLabel}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2 font-display tracking-tight">
            {title}
          </h1>
          <p className="mt-1.5 text-sm text-slate-500 max-w-2xl font-normal leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between md:justify-end gap-3.5 border-t border-slate-100 pt-4 md:border-t-0 md:pt-0">
          <Link
            href={returnPath}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-650 hover:bg-slate-50 hover:border-slate-350 shadow-sm active:scale-[0.98] transition"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>{returnLabel}</span>
          </Link>
          <DashboardUserMenu />
        </div>
      </div>
    </header>
  );
}
