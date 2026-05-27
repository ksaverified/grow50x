import './globals.css';

export const metadata = {
  title: 'ClinicFlow | Modern Multi-Clinic Practice Management',
  description: 'A secure, tenant-aware, and regulation-compliant operations platform built specifically for modern healthcare clinics.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen text-slate-900 bg-slate-50 selection:bg-teal-500/10 selection:text-teal-700">
        <div id="clinicflow-root-container" className="flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
