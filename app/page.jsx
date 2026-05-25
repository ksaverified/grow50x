import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">ClinicFlow</h1>
            <p className="text-sm text-slate-600">Clinic practice management built for multi-tenant healthcare operations.</p>
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
        <section className="grid grid-cols-2 gap-8 items-center mb-24">
          <div>
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Healthcare SaaS</p>
            <h2 className="text-5xl font-bold text-slate-900 mt-2 leading-tight">
              One platform. One database. Multiple clinics.
            </h2>
            <p className="text-lg text-slate-600 mt-4 leading-relaxed">
              ClinicFlow connects each clinic to its own tenant data inside a secure, centralized Postgres environment. Manage clinics, patients, schedules, billing and team permissions from one modern platform.
            </p>
            <div className="flex gap-4 mt-8">
              <Link
                href="/plans"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                View Plans
              </Link>
              <Link
                href="/login"
                className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Clinic Login
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Tenant-aware access</h3>
            <p className="text-slate-600">
              Account ID connects each clinic to their own tenant data, while users sign in with their clinic role.
            </p>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Why ClinicFlow?</h2>
          <div className="grid grid-cols-3 gap-8">
            <article className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Clinic-level tenancy</h3>
              <p className="text-slate-600">
                Each clinic uses a dedicated Account ID to isolate database access by tenant. Shared platform, separated clinic workflows.
              </p>
            </article>
            <article className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Role-based operations</h3>
              <p className="text-slate-600">
                Admin, Doctor, and Finance users each get the right access to clinical, administrative, and financial tasks.
              </p>
            </article>
            <article className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Fast clinic onboarding</h3>
              <p className="text-slate-600">
                Clinic accounts can be provisioned quickly and managed centrally, with a secure login experience for every user.
              </p>
            </article>
          </div>
        </section>

        <section className="bg-slate-900 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform clinic operations?</h2>
          <p className="text-lg text-slate-300 mb-8">Start with our Starter plan or contact sales for Enterprise solutions.</p>
          <Link
            href="/plans"
            className="inline-block px-8 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            View Pricing
          </Link>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 mt-16 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>Built for clinics that need a secure multi-tenant medical practice platform.</p>
          <nav className="flex justify-center gap-6 mt-4 text-sm">
            <Link href="/plans" className="hover:text-white">
              Plans
            </Link>
            <Link href="/about" className="hover:text-white">
              About
            </Link>
            <Link href="/login" className="hover:text-white">
              Login
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
