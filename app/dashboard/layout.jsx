'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import DashboardSidebar from '@/components/DashboardSidebar';

export default function DashboardLayout({ children }) {
  const pathname = usePathname() || '/dashboard';

  const adminItems = [
    { href: '/dashboard/admin/overview', label: 'Overview', description: 'Clinic performance & metrics', icon: 'overview' },
    { href: '/dashboard/admin/insurance', label: 'Patients & Insurance', description: 'Patient records & contracts', icon: 'patients' },
    { href: '/dashboard/admin/rooms', label: 'Rooms & Schedules', description: 'Room statuses & allocations', icon: 'rooms' },
    { href: '/dashboard/admin/readiness', label: 'Operational Readiness', description: 'Checklists & audit trials', icon: 'readiness' },
  ];

  const doctorItems = [
    { href: '/dashboard/doctor/summary', label: 'Clinical Summary', description: 'Patient roster & priority alerts', icon: 'summary' },
    { href: '/dashboard/doctor/compliance', label: 'Clinical Compliance', description: 'Patient consent approvals', icon: 'compliance' },
    { href: '/dashboard/doctor/schedule', label: 'Today’s Schedule', description: 'Daily appointment sequence', icon: 'schedule' },
    { href: '/dashboard/doctor/guidance', label: 'Clinical Guidance', description: 'SOP reference library', icon: 'guidance' },
  ];

  const communityItems = [
    { href: '/dashboard/community', label: 'Community Hub', description: 'Social network promotion dashboards', icon: 'community' },
    { href: '/dashboard/community/posts', label: 'Campaign Publish', description: 'Create and schedule social posts', icon: 'posts' },
    { href: '/dashboard/community/analytics', label: 'Engagement Metrics', description: 'Track followers, shares, and reach', icon: 'analytics' },
    { href: '/dashboard/community/calendar', label: 'Content Calendar', description: 'Plan clinic community engagement', icon: 'schedule' },
  ];

  const financeItems = [
    { href: '/dashboard/finance/overview', label: 'Overview', description: 'Collections & revenue metrics', icon: 'overview' },
    { href: '/dashboard/finance/bookings', label: 'Bookings', description: 'Reception book desk queue', icon: 'bookings' },
    { href: '/dashboard/finance/insurance', label: 'Insurance Payers', description: 'Payer status & claim actions', icon: 'insurance' },
    { href: '/dashboard/finance/billing', label: 'Billing Controls', description: 'Invoice clearances & records', icon: 'billing' },
  ];

  const items = useMemo(() => {
    if (pathname.startsWith('/dashboard/admin')) return adminItems;
    if (pathname.startsWith('/dashboard/doctor')) return doctorItems;
    if (pathname.startsWith('/dashboard/finance')) return financeItems;
    if (pathname.startsWith('/dashboard/community')) return communityItems;
    // default hub: show role options
    return [
      { href: '/dashboard/admin', label: 'Admin', description: 'Operations & Settings Hub', icon: 'overview' },
      { href: '/dashboard/doctor', label: 'Doctor', description: 'Clinical & Patient Hub', icon: 'summary' },
      { href: '/dashboard/finance', label: 'Finance', description: 'Finance & Billing Hub', icon: 'billing' },
      { href: '/dashboard/community', label: 'Community', description: 'Social Marketing Hub', icon: 'community' },
    ];
  }, [pathname]);

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6 py-6 md:py-8">
        <div className="lg:flex lg:gap-8 items-start">
          <div className="lg:flex-shrink-0 lg:sticky lg:top-6 z-20">
            <DashboardSidebar title="Workspace" items={items} />
          </div>

          <div className="mt-6 lg:mt-0 lg:flex-1 min-w-0 animate-fade-in">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
