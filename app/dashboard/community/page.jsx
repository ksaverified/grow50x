'use client';

import Link from 'next/link';
import DashboardHeader from '@/components/DashboardHeader';

const quickActions = [
  {
    href: '/dashboard/community/posts',
    title: 'Campaign Posts',
    description: 'Create, review, and schedule social media messages for all clinic channels.',
  },
  {
    href: '/dashboard/community/analytics',
    title: 'Engagement Analytics',
    description: 'Monitor audience growth, interactions, and channel reach trends.',
  },
  {
    href: '/dashboard/community/calendar',
    title: 'Content Calendar',
    description: 'Plan your next content wave and review publishing deadlines in one place.',
  },
];

export default function CommunityDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-amber-500/10 selection:text-amber-700 animate-fade-in">
      <DashboardHeader
        roleLabel="Community Growth"
        title="Community Hub"
        description="Centralize your social network strategy, publish community updates, and keep engagement metrics visible."
        accentClass="text-amber-600"
        returnPath="/dashboard"
        returnLabel="Back to Hub"
      />

      <main className="max-w-6xl mx-auto py-8 space-y-8 w-full">
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-sm space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900 font-display">Social Campaign Command Center</h2>
              <p className="text-xs text-slate-400 mt-1">Your central hub for planning social activity, measuring impact, and keeping clinic messaging compliant.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Weekly Workflow</p>
                <p className="mt-3 text-sm text-slate-700 leading-relaxed">Set up your weekly posting plan and make sure every message aligns with clinic values.</p>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Compliance Focus</p>
                <p className="mt-3 text-sm text-slate-700 leading-relaxed">Review all outgoing content for privacy-safe wording before scheduling to publish.</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200/80 p-5 bg-white shadow-sm text-center">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Posts</p>
                <p className="mt-3 text-3xl font-extrabold text-slate-950 font-display">18</p>
                <p className="text-[11px] text-slate-500 mt-2">Scheduled this week</p>
              </div>
              <div className="rounded-2xl border border-slate-200/80 p-5 bg-white shadow-sm text-center">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Engagement</p>
                <p className="mt-3 text-3xl font-extrabold text-emerald-700 font-display">72%</p>
                <p className="text-[11px] text-slate-500 mt-2">Interaction rate</p>
              </div>
              <div className="rounded-2xl border border-slate-200/80 p-5 bg-white shadow-sm text-center">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Reach</p>
                <p className="mt-3 text-3xl font-extrabold text-slate-950 font-display">23K</p>
                <p className="text-[11px] text-slate-500 mt-2">Total audience</p>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 font-display">Go to</h3>
              <div className="mt-5 space-y-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-900 hover:border-amber-200 hover:bg-amber-50 transition"
                  >
                    <p>{action.title}</p>
                    <p className="mt-1 text-[11px] text-slate-500">{action.description}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-amber-100 bg-amber-50 p-6 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 font-display">Best Practice</h3>
              <p className="mt-3 text-sm text-slate-700 leading-relaxed">Create social posts one week in advance and set at least two review rounds for messaging and compliance alignment.</p>
            </div>
          </aside>
        </section>

        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex gap-4 items-start shadow-md">
          <div className="p-2 bg-amber-600 text-white rounded-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 4v6h-6M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H9l-4 4v8a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 font-display">Social Compliance Reminder</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Always avoid sharing patient names, photos, or identifiable clinical details. Keep public-facing community posts focused on wellness tips, service announcements, and clinic events.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
