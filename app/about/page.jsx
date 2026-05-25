import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">ClinicFlow</h1>
            <p className="text-sm text-slate-600">Meet the team building the next generation of clinic operations software.</p>
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
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">About Us</h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            ClinicFlow is built to help medical providers manage clinics with a secure, tenant-aware platform. Our mission is to give every clinic the tools they need to deliver consistent, efficient care while keeping clinic data isolated and protected.
          </p>
        </section>

        <section className="grid grid-cols-3 gap-8 mb-20">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Executive Leadership</h3>
            <p className="text-slate-600">
              We guide the product vision, strategy, and customer success efforts to make ClinicFlow the best choice for multi-clinic healthcare practices.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Product & Operations</h3>
            <p className="text-slate-600">
              Our product team defines how clinics, users, and workflows interact. We focus on a clean experience for Admin, Doctor, and Finance roles.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Engineering & Support</h3>
            <p className="text-slate-600">
              Engineering delivers the platform; support helps clinics onboard and stay successful. We build secure access models for tenant ecosystems and clinic-level databases.
            </p>
          </div>
        </section>

        <section className="bg-slate-900 text-white rounded-lg p-12">
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-2">What we believe</p>
          <h2 className="text-3xl font-bold mb-6">
            Clinic software should be simple, secure, and tailored for real medical teams
          </h2>
          <p className="text-lg leading-relaxed text-slate-300">
            Every clinic is different, but every clinic deserves a stable system. Our platform keeps clinic data separated by Account ID, while users sign in with the correct role and permissions. This is how we help clinics scale with confidence.
          </p>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 mt-16 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>ClinicFlow is committed to secure, multi-tenant medical practice management.</p>
        </div>
      </footer>
    </div>
  );
}
