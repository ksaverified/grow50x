'use client';

import { useState, useMemo } from 'react';
import DashboardHeader from '@/components/DashboardHeader';

const initialCalendarItems = [
  { id: '1', date: '2026-05-27', event: 'Wellness Tip: Hydration Guide (Post)', status: 'Scheduled', platform: 'Instagram' },
  { id: '2', date: '2026-05-29', event: 'Wellness Week Story Series', status: 'Scheduled', platform: 'Instagram' },
  { id: '3', date: '2026-05-30', event: 'Weekly Health Q&A Live Session', status: 'Scheduled', platform: 'YouTube' },
  { id: '4', date: '2026-06-02', event: 'Clinic Open Day Campaign', status: 'Draft', platform: 'Facebook' },
  { id: '5', date: '2026-06-05', event: 'LinkedIn Healthcare SOP Tip', status: 'Ready', platform: 'LinkedIn' },
  { id: '6', date: '2026-06-12', event: 'Summer Health Awareness Video', status: 'Draft', platform: 'YouTube' },
  { id: '7', date: '2026-06-15', event: 'Patient Care Testimonial Feature', status: 'Ready', platform: 'Instagram' },
  { id: '8', date: '2026-06-20', event: 'Preventative Medicine Newsletter', status: 'Scheduled', platform: 'Email' },
];

export default function CommunityCalendar() {
  const [calendarItems, setCalendarItems] = useState(initialCalendarItems);
  const [activeView, setActiveView] = useState('month'); // 'list' | 'week' | 'month'
  
  // Date states for navigation
  const [currentDate, setCurrentDate] = useState(new Date('2026-06-01')); // Lock default view to June 2026 for demo consistency
  const [selectedDayEvents, setSelectedDayEvents] = useState(null);
  const [selectedDateStr, setSelectedDateStr] = useState('');

  // Helper: Format date to YYYY-MM-DD
  const formatDateString = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  // Helper: Month Navigation
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDayEvents(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDayEvents(null);
  };

  // Helper: Week Navigation
  const handlePrevWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
    setSelectedDayEvents(null);
  };

  const handleNextWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
    setSelectedDayEvents(null);
  };

  // Construct Month Grid Days
  const monthGridData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First day of the month
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday
    // Total days in the month
    const totalDays = new Date(year, month + 1, 0).getDate();
    // Total days in previous month
    const prevTotalDays = new Date(year, month, 0).getDate();

    const days = [];

    // Previous month padding days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = prevTotalDays - i;
      const padDate = new Date(year, month - 1, dayNum);
      days.push({
        day: dayNum,
        dateStr: formatDateString(padDate),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      const currDate = new Date(year, month, i);
      days.push({
        day: i,
        dateStr: formatDateString(currDate),
        isCurrentMonth: true,
      });
    }

    // Next month padding days to round up grid to multiple of 7
    const remainingCells = 42 - days.length; // 6 rows of 7
    for (let i = 1; i <= remainingCells; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({
        day: i,
        dateStr: formatDateString(nextDate),
        isCurrentMonth: false,
      });
    }

    return days;
  }, [currentDate]);

  // Construct Week View Days (7 days starting from current date's Monday or surrounding days)
  const weekGridData = useMemo(() => {
    const dateCopy = new Date(currentDate);
    const day = dateCopy.getDay();
    const diff = dateCopy.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday to start from monday
    const monday = new Date(dateCopy.setDate(diff));

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(monday);
      currentDay.setDate(monday.getDate() + i);
      weekDays.push({
        dayName: currentDay.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: currentDay.getDate(),
        dateStr: formatDateString(currentDay),
        fullDate: currentDay,
      });
    }
    return weekDays;
  }, [currentDate]);

  // Helper: get color classes based on platform
  const getPlatformStyle = (platform) => {
    switch (platform) {
      case 'Instagram': return 'bg-pink-50 text-pink-700 border-pink-100';
      case 'Facebook': return 'bg-blue-50 text-blue-700 border-blue-105 border-blue-100';
      case 'YouTube': return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'LinkedIn': return 'bg-sky-50 text-sky-700 border-sky-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  // Helper: get color classes based on status
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Scheduled': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Ready': return 'bg-teal-50 text-teal-700 border-teal-100';
      case 'Draft': return 'bg-amber-50 text-amber-700 border-amber-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-150';
    }
  };

  // Handler: click on a cell in Month/Week view
  const handleDaySelect = (dateStr) => {
    const events = calendarItems.filter(item => item.date === dateStr);
    setSelectedDayEvents(events);
    setSelectedDateStr(dateStr);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-amber-500/10 selection:text-amber-700 animate-fade-in">
      <DashboardHeader
        roleLabel="Community Growth"
        title="Content Calendar"
        description="Manage upcoming social appointments and keep content planning aligned with the clinic schedule."
        accentClass="text-amber-600"
        returnPath="/dashboard/community"
        returnLabel="Back to Community"
      />

      <main className="max-w-6xl mx-auto py-8 space-y-6 w-full">
        {/* Interactive View Selectors */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm">
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider font-display">Calendar Workspace</h3>
            <p className="text-xs text-slate-400">Select view format to arrange clinic promotions</p>
          </div>

          <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200/60 self-start">
            <button
              onClick={() => { setActiveView('month'); setSelectedDayEvents(null); }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeView === 'month' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Month Calendar
            </button>
            <button
              onClick={() => { setActiveView('week'); setSelectedDayEvents(null); }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeView === 'week' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Week View
            </button>
            <button
              onClick={() => { setActiveView('list'); setSelectedDayEvents(null); }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeView === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Schedule List
            </button>
          </div>
        </div>

        {/* MONTH VIEW CALENDAR */}
        {activeView === 'month' && (
          <section className="bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-display">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Click a day cell to see details and events</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl transition text-slate-500"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl transition text-slate-500"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Grid Header */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold uppercase tracking-wider text-slate-450 border-b border-slate-100 pb-3">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>

            {/* Grid Days */}
            <div className="grid grid-cols-7 gap-2">
              {monthGridData.map((cell, idx) => {
                const dayEvents = calendarItems.filter((e) => e.date === cell.dateStr);
                const hasEvents = dayEvents.length > 0;
                const isSelected = selectedDateStr === cell.dateStr;

                return (
                  <div
                    key={idx}
                    onClick={() => handleDaySelect(cell.dateStr)}
                    className={`min-h-[90px] border rounded-2xl p-2.5 transition flex flex-col justify-between cursor-pointer select-none ${
                      cell.isCurrentMonth ? 'bg-white border-slate-200/80' : 'bg-slate-50/50 border-slate-100 text-slate-400'
                    } ${
                      isSelected 
                        ? 'ring-2 ring-amber-500 ring-offset-2 border-amber-300 bg-amber-50/20' 
                        : hasEvents && cell.isCurrentMonth
                        ? 'hover:border-amber-400 hover:shadow-sm'
                        : 'hover:border-slate-350 hover:bg-slate-50/20'
                    }`}
                  >
                    <span className="text-xs font-bold font-mono">{cell.day}</span>
                    
                    {/* Events indicator or brief list */}
                    <div className="space-y-1 mt-2">
                      {dayEvents.map((evt) => (
                        <div
                          key={evt.id}
                          className="px-1.5 py-0.5 rounded text-[9px] font-bold truncate border flex items-center gap-1 bg-amber-50/50 text-amber-705 border-amber-100"
                          title={evt.event}
                        >
                          <span className="w-1 h-1 rounded-full bg-amber-500" />
                          <span className="truncate">{evt.event}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* WEEK VIEW CALENDAR */}
        {activeView === 'week' && (
          <section className="bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-display">Weekly Overview</h2>
                <p className="text-xs text-slate-400 mt-0.5">Showing scheduled releases for the active week</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handlePrevWeek}
                  className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl transition text-slate-500"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNextWeek}
                  className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl transition text-slate-500"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Weekly Days List */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {weekGridData.map((cell, idx) => {
                const dayEvents = calendarItems.filter((e) => e.date === cell.dateStr);
                const isSelected = selectedDateStr === cell.dateStr;

                return (
                  <div
                    key={idx}
                    onClick={() => handleDaySelect(cell.dateStr)}
                    className={`border rounded-2xl p-4 transition min-h-[160px] cursor-pointer flex flex-col space-y-3 bg-white ${
                      isSelected
                        ? 'ring-2 ring-amber-500 ring-offset-2 border-amber-300 bg-amber-50/20'
                        : 'border-slate-200/80 hover:border-amber-400 hover:shadow-sm'
                    }`}
                  >
                    <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{cell.dayName}</span>
                      <span className="text-sm font-extrabold font-mono text-slate-900">{cell.dayNum}</span>
                    </div>

                    <div className="flex-1 space-y-2">
                      {dayEvents.length > 0 ? (
                        dayEvents.map((evt) => (
                          <div
                            key={evt.id}
                            className={`p-2.5 rounded-xl border text-[10px] font-bold space-y-1.5 hover:shadow-xs transition ${getPlatformStyle(
                              evt.platform
                            )}`}
                          >
                            <p className="leading-normal">{evt.event}</p>
                            <div className="flex items-center justify-between text-[8px] opacity-80 pt-1 border-t border-black/5">
                              <span>{evt.platform}</span>
                              <span className="font-semibold uppercase">{evt.status}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="h-full flex items-center justify-center py-6 text-[10px] text-slate-350 italic">
                          No Events
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* SELECTED DAY EVENTS DRAWER PANEL */}
        {selectedDayEvents && (
          <section className="bg-gradient-to-r from-amber-50/30 to-amber-50/50 border border-amber-200/80 rounded-3xl p-6 shadow-sm animate-slide-up space-y-4">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 font-display">Events details</h4>
                <p className="text-sm font-extrabold text-slate-900 font-mono mt-0.5">
                  {new Date(selectedDateStr).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <button
                onClick={() => setSelectedDayEvents(null)}
                className="text-amber-800 hover:text-amber-950 p-1.5 hover:bg-amber-150 rounded-lg text-xs font-bold transition"
              >
                Close Panel
              </button>
            </div>

            {selectedDayEvents.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {selectedDayEvents.map((evt) => (
                  <div key={evt.id} className="bg-white border border-slate-200/60 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider ${getPlatformStyle(evt.platform)}`}>
                          {evt.platform}
                        </span>
                        <h5 className="text-sm font-bold text-slate-800 leading-snug mt-2">{evt.event}</h5>
                      </div>
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider ${getStatusStyle(evt.status)}`}>
                        {evt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No scheduled marketing posts or activities for this day.</p>
            )}
          </section>
        )}

        {/* LIST VIEW (Original content preserve) */}
        {activeView === 'list' && (
          <section className="bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-sm">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900 font-display">Upcoming Content Schedule</h2>
              <p className="text-xs text-slate-400 mt-1">Stay on track with planned community posts and approval deadlines.</p>
            </div>

            <div className="mt-6 grid gap-4">
              {calendarItems.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-200/80 p-5 hover:shadow-sm transition bg-slate-50">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-start gap-4">
                      <div className={`px-2.5 py-1 rounded-xl border text-[10px] font-bold ${getPlatformStyle(item.platform)}`}>
                        {item.platform}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.date}</p>
                        <h3 className="mt-1 text-base font-semibold text-slate-900">{item.event}</h3>
                      </div>
                    </div>
                    <span className={`self-start sm:self-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex gap-4 items-start shadow-md">
          <div className="p-2 bg-amber-600 text-white rounded-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M5 11h14M5 19h14M5 15h14M5 23h14" />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 font-display">Calendar planning tip</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Plan social media posts at least one week in advance and reserve two review cycles for compliance and brand alignment.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
