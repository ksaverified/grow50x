'use client';

import DashboardHeader from '@/components/DashboardHeader';

const publishedPosts = [
  { channel: 'Instagram', title: 'Wellness Week Tips', status: 'Scheduled', date: '2026-05-29' },
  { channel: 'Facebook', title: 'Clinic Open Day', status: 'Editing', date: '2026-06-02' },
  { channel: 'Twitter', title: 'Healthy Living Thread', status: 'Published', date: '2026-05-24' },
];

export default function CommunityPosts() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-amber-500/10 selection:text-amber-700 animate-fade-in">
      <DashboardHeader
        roleLabel="Community Growth"
        title="Campaign Posts"
        description="Plan, review, and publish social media content across your community and clinic channels."
        accentClass="text-amber-600"
        returnPath="/dashboard/community"
        returnLabel="Back to Community"
      />

      <main className="max-w-6xl mx-auto py-8 space-y-8 w-full">
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-sm space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900 font-display">Scheduled Content</h2>
              <p className="text-xs text-slate-400 mt-1">Review the next campaign posts and edit wording before publishing.</p>
            </div>

            <div className="space-y-4">
              {publishedPosts.map((post) => (
                <div key={post.title} className="rounded-2xl border border-slate-200/80 p-5 hover:shadow-sm transition">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{post.channel}</span>
                      <h3 className="mt-2 text-base font-semibold text-slate-900">{post.title}</h3>
                    </div>
                    <div className="mt-3 sm:mt-0">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">{post.date}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 items-center">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-700 border border-slate-200">
                      {post.status}
                    </span>
                    <button className="ml-auto rounded-full border border-amber-200 bg-amber-50 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-amber-700 hover:bg-amber-100 transition">
                      Edit Post
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 font-display">Next Launch</h3>
              <p className="mt-3 text-sm text-slate-700 leading-relaxed">Schedule the wellness campaign for Instagram and mirror the same message across Facebook and LinkedIn on May 29.</p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">+</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Create New Post</h4>
                  <p className="text-[11px] text-slate-500">Draft a new message for social channels and assign publishing dates.</p>
                </div>
              </div>
              <button className="block w-full rounded-2xl bg-amber-600 px-4 py-3 text-sm font-bold text-white hover:bg-amber-700 transition">Start a New Post</button>
            </div>
          </aside>
        </section>

        <section className="bg-slate-950 text-white rounded-2xl p-6 flex gap-4 items-start shadow-md">
          <div className="p-2 bg-amber-600 text-white rounded-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-200 font-display">Publishing Reminder</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Confirm all content is reviewed for privacy compliance before pushing to live community channels. Keep patient safety and trust as the central theme.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
