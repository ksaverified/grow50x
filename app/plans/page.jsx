import Link from 'next/link';

export default function Plans() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">ClinicFlow</h1>
            <p className="text-sm text-slate-600">Plans that scale with your clinic network.</p>
          </div>
          <nav className="flex gap-4 items-center">
            <Link href="/" className="text-slate-700 font-medium hover:text-blue-600">
              Home
            </Link>
            <Link href="/plans" className="text-slate-700 font-medium hover:text-blue-600">
              Plans
            </Link>
            <Link href="/about" className="text-slate-700 font-medium hover:text-blue-600">
              About
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
            >
              Clinic Login
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Plans for clinics and healthcare teams</h2>
          <p className="text-lg text-slate-600">
            Choose the package that fits your clinic size and support needs. Each clinic is managed as a tenant with secure account access.
          </p>
        </section>

        <section className="grid grid-cols-3 gap-8 mb-20">
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-slate-900">Basic</h3>
                <span className="text-xs uppercase tracking-[0.2em] text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                  Launching now
                </span>
              </div>
              <p className="text-4xl font-bold text-slate-900 mb-1">SAR 2,000</p>
              <p className="text-lg text-slate-600 mb-1">/clinic/month</p>
              <p className="text-sm text-slate-500 mb-6">SAR 10,000 setup</p>
              <ul className="space-y-3 mb-8 text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Lead-to-booking funnel
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Arabic WhatsApp AI
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Calendar + reminders
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> PDPL consent flows
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Basic analytics
                </li>
              </ul>
              <Link
                href="/login"
                className="block text-center px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Start Basic
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-green-500 hover:shadow-2xl transition transform scale-105">
            <div className="bg-green-100 text-green-700 px-4 py-2 text-center font-semibold">Phase 2</div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Pro</h3>
              <p className="text-4xl font-bold text-slate-900 mb-1">SAR 4,000</p>
              <p className="text-lg text-slate-600 mb-1">/clinic/month</p>
              <p className="text-sm text-slate-500 mb-6">SAR 15,000 setup</p>
              <ul className="space-y-3 mb-8 text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Everything in Basic
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Multi-branch support
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Reputation engine
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Advanced reporting
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Insurance integrations
                </li>
              </ul>
              <Link
                href="/login"
                className="block text-center px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Choose Pro
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-slate-900">Enterprise</h3>
                <span className="text-xs uppercase tracking-[0.2em] text-violet-600 bg-violet-100 px-3 py-1 rounded-full">
                  Phase 3
                </span>
              </div>
              <p className="text-4xl font-bold text-slate-900 mb-6">Custom</p>
              <ul className="space-y-3 mb-8 text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Everything in Pro
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Hospital-grade SSO
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Custom integrations
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Dedicated CSM
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> White-label option
                </li>
              </ul>
              <Link
                href="/login"
                className="block text-center px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-12 mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Every clinic team gets the tools they need</h2>
          <div className="grid grid-cols-3 gap-8">
            <article>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Admin</h3>
              <p className="text-slate-600">
                Full configuration access for developers and technicians to manage tenant database settings and clinic setup.
              </p>
            </article>
            <article>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Doctor</h3>
              <p className="text-slate-600">
                Clinical and nursing staff can record encounters, diagnoses, prescriptions, and patient notes.
              </p>
            </article>
            <article>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Finance</h3>
              <p className="text-slate-600">
                Reception and accounting teams can manage billing claims, payments, and financial workflows for each clinic.
              </p>
            </article>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>ClinicFlow supports clinics with secure tenant separation and modern workflow tools.</p>
        </div>
      </footer>
    </div>
  );
}
