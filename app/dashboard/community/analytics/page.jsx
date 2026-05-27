'use client';

import DashboardHeader from '@/components/DashboardHeader';

const metrics = [
  { label: 'Reach', value: '23K', delta: '+12% this week' },
  { label: 'Engagement', value: '72%', delta: '+8% this week' },
  { label: 'Shares', value: '1.8K', delta: '+15% this week' },
];

export default function CommunityAnalytics() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-amber-500/10 selection:text-amber-700 animate-fade-in">
      <DashboardHeader
        roleLabel="Community Growth"
        title="Engagement Analytics"
        description="Track audience growth, post performance, and social interaction trends across your clinic channels."
        accentClass="text-amber-600"
        returnPath="/dashboard/community"
        returnLabel="Back to Community"
      />

      <main className="max-w-6xl mx-auto py-8 space-y-8 w-full">
        <section className="grid gap-6 md:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-white border border-slate-200/80 rounded-[1.5rem] p-6 shadow-sm space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{metric.label}</p>
              <p className="text-3xl font-extrabold text-slate-950 font-display">{metric.value}</p>
              <p className="text-xs text-slate-500">{metric.delta}</p>
            </div>
          ))}
        </section>

        <section className="bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 font-display">Channel Performance</h2>
            <p className="text-xs text-slate-400 mt-1">Review prioritized social activity across Instagram, Facebook, and LinkedIn channels.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { name: 'Instagram', metric: '8.4K', label: 'Followers' },
              { name: 'Facebook', metric: '7.1K', label: 'Page Likes' },
              { name: 'LinkedIn', metric: '1.5K', label: 'Professional Reach' },
            ].map((channel) => (
              <div key={channel.name} className="rounded-2xl border border-slate-200/80 p-5">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{channel.name}</p>
                <p className="mt-3 text-3xl font-extrabold text-slate-900 font-display">{channel.metric}</p>
                <p className="text-[11px] text-slate-500 mt-2">{channel.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex gap-4 items-start shadow-md">
          <div className="p-2 bg-amber-600 text-white rounded-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5h6M11 9h4m-4 4h2m-8 4h12M6 5H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 font-display">Analytics insight</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Use engagement trends to refine your next post cadence and share times. High reach with low video views may indicate a need to boost multimedia content.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
