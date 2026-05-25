import './globals.css';

export const metadata = {
  title: 'ClinicFlow - Multi-Clinic Medical Practice Management',
  description: 'Secure, tenant-aware clinic management platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
