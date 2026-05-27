'use client';

import { useState, useMemo } from 'react';
import DashboardHeader from '@/components/DashboardHeader';

const initialBookings = [
  { id: 'B-001', patient: 'Ahmed Ali', date: '2026-05-27', time: '08:30', room: 'R-101', status: 'Pending' },
  { id: 'B-002', patient: 'Nora Hassan', date: '2026-05-27', time: '09:00', room: 'R-102', status: 'Confirmed' },
  { id: 'B-003', patient: 'Khalid Mansoor', date: '2026-05-28', time: '10:30', room: 'R-101', status: 'Pending' },
  { id: 'B-004', patient: 'Fatima Omar', date: '2026-05-29', time: '14:00', room: 'R-103', status: 'Confirmed' },
  { id: 'B-005', patient: 'Sara Youssef', date: '2026-06-02', time: '11:00', room: 'R-102', status: 'Pending' },
  { id: 'B-006', patient: 'Yousef Abdullah', date: '2026-06-05', time: '09:30', room: 'R-101', status: 'Confirmed' },
  { id: 'B-007', patient: 'Amal Faisal', date: '2026-06-12', time: '15:30', room: 'R-103', status: 'Pending' },
  { id: 'B-008', patient: 'Zainab Ali', date: '2026-06-20', time: '10:00', room: 'R-102', status: 'Confirmed' },
];

export default function FinanceBookings() {
  const [rows, setRows] = useState(initialBookings);
  const [activeView, setActiveView] = useState('month'); // 'list' | 'week' | 'month'
  
  // Date states for navigation
  const [currentDate, setCurrentDate] = useState(new Date('2026-06-01')); // Locked to June 2026 for demo consistency
  const [selectedDayBookings, setSelectedDayBookings] = useState(null);
  const [selectedDateStr, setSelectedDateStr] = useState('');

  function confirm(id) {
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status: 'Confirmed' } : x)));
    
    // Update active drawer selections immediately
    if (selectedDayBookings) {
      setSelectedDayBookings((prev) => 
        prev.map((x) => (x.id === id ? { ...x, status: 'Confirmed' } : x))
      );
    }
  }

  const getStatusStyle = (status) => {
    if (status.toLowerCase().includes('confirm')) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    }
    return 'bg-amber-50 text-amber-700 border-amber-100';
  };

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
    setSelectedDayBookings(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDayBookings(null);
  };

  // Helper: Week Navigation
  const handlePrevWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
    setSelectedDayBookings(null);
  };

  const handleNextWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
    setSelectedDayBookings(null);
  };

  // Construct Month Grid Days
  const monthGridData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
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

    // Next month padding days to round up grid to 42 cells (6 rows)
    const remainingCells = 42 - days.length;
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

  // Construct Week View Days
  const weekGridData = useMemo(() => {
    const dateCopy = new Date(currentDate);
    const day = dateCopy.getDay();
    const diff = dateCopy.getDate() - day + (day === 0 ? -6 : 1);
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

  // Handler: Select a day
  const handleDaySelect = (dateStr) => {
    const dayRows = rows.filter(item => item.date === dateStr);
    setSelectedDayBookings(dayRows);
    setSelectedDateStr(dateStr);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-violet-500/10 selection:text-violet-705 animate-fade-in">
      <DashboardHeader
        roleLabel="Finance Operations"
        title="Bookings & Front-Desk"
        description="Review active outpatient bookings, allocate consultation rooms, and check daily entries."
        accentClass="text-violet-650"
        returnPath="/dashboard/finance"
        returnLabel="Back to Finance"
      />

      <main className="max-w-6xl mx-auto py-8 space-y-6 w-full">
        {/* Interactive View Selectors */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm">
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider font-display">Schedule Workspace</h3>
            <p className="text-xs text-slate-400">Select calendar layouts or queues to manage outpatient registrations</p>
          </div>

          <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200/60 self-start">
            <button
              onClick={() => { setActiveView('month'); setSelectedDayBookings(null); }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeView === 'month' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Month Grid
            </button>
            <button
              onClick={() => { setActiveView('week'); setSelectedDayBookings(null); }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeView === 'week' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Week View
            </button>
            <button
              onClick={() => { setActiveView('list'); setSelectedDayBookings(null); }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeView === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              List Queue
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
                <p className="text-xs text-slate-400 mt-0.5">Click a day cell to verify specific patient appointments</p>
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
                const dayBookings = rows.filter((e) => e.date === cell.dateStr);
                const hasBookings = dayBookings.length > 0;
                const isSelected = selectedDateStr === cell.dateStr;

                return (
                  <div
                    key={idx}
                    onClick={() => handleDaySelect(cell.dateStr)}
                    className={`min-h-[90px] border rounded-2xl p-2.5 transition flex flex-col justify-between cursor-pointer select-none ${
                      cell.isCurrentMonth ? 'bg-white border-slate-200/80' : 'bg-slate-50/50 border-slate-100 text-slate-400'
                    } ${
                      isSelected 
                        ? 'ring-2 ring-violet-500 ring-offset-2 border-violet-300 bg-violet-50/20' 
                        : hasBookings && cell.isCurrentMonth
                        ? 'hover:border-violet-400 hover:shadow-sm'
                        : 'hover:border-slate-350 hover:bg-slate-50/20'
                    }`}
                  >
                    <span className="text-xs font-bold font-mono">{cell.day}</span>
                    
                    {/* Bookings Count Pills */}
                    <div className="mt-2">
                      {dayBookings.length > 0 && (
                        <div
                          className={`px-2 py-1 rounded-xl text-[9px] font-bold truncate border flex items-center justify-center gap-1.5 ${
                            dayBookings.every(b => b.status === 'Confirmed')
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                              : 'bg-violet-50 text-violet-700 border-violet-100'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            dayBookings.every(b => b.status === 'Confirmed') ? 'bg-emerald-500' : 'bg-violet-500 animate-pulse'
                          }`} />
                          <span>{dayBookings.length} {dayBookings.length === 1 ? 'Booking' : 'Bookings'}</span>
                        </div>
                      )}
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
                <h2 className="text-xl font-bold text-slate-900 font-display">Weekly Outpatient Allocations</h2>
                <p className="text-xs text-slate-400 mt-0.5">Showing scheduled patient check-in streams for the active week</p>
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

            {/* Weekly Columns */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {weekGridData.map((cell, idx) => {
                const dayBookings = rows.filter((e) => e.date === cell.dateStr);
                const isSelected = selectedDateStr === cell.dateStr;

                return (
                  <div
                    key={idx}
                    onClick={() => handleDaySelect(cell.dateStr)}
                    className={`border rounded-2xl p-4 transition min-h-[160px] cursor-pointer flex flex-col space-y-3 bg-white ${
                      isSelected
                        ? 'ring-2 ring-violet-500 ring-offset-2 border-violet-300 bg-violet-50/20'
                        : 'border-slate-200/80 hover:border-violet-400 hover:shadow-sm'
                    }`}
                  >
                    <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{cell.dayName}</span>
                      <span className="text-sm font-extrabold font-mono text-slate-900">{cell.dayNum}</span>
                    </div>

                    <div className="flex-1 space-y-2">
                      {dayBookings.length > 0 ? (
                        dayBookings.map((b) => (
                          <div
                            key={b.id}
                            className={`p-2.5 rounded-xl border text-[10px] font-bold space-y-1.5 transition ${
                              b.status === 'Confirmed'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                : 'bg-violet-50 text-violet-700 border-violet-100'
                            }`}
                          >
                            <div className="flex justify-between items-center text-[8px] opacity-75">
                              <span className="font-mono">{b.time}</span>
                              <span className="font-semibold">{b.room}</span>
                            </div>
                            <p className="truncate leading-normal">{b.patient}</p>
                            <div className="pt-1.5 border-t border-black/5 flex items-center justify-between text-[8px]">
                              <span>{b.id}</span>
                              <span className="uppercase font-semibold">{b.status}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="h-full flex items-center justify-center py-6 text-[10px] text-slate-350 italic">
                          No Bookings
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* SELECTED DAY DETAILED PANEL */}
        {selectedDayBookings && (
          <section className="bg-gradient-to-r from-violet-50/30 to-violet-50/50 border border-violet-200/80 rounded-3xl p-6 shadow-sm animate-slide-up space-y-4">
            <div className="flex items-center justify-between border-b border-violet-100 pb-3">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-violet-900 font-display">Registrations details</h4>
                <p className="text-sm font-extrabold text-slate-900 font-mono mt-0.5">
                  {new Date(selectedDateStr).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <button
                onClick={() => setSelectedDayBookings(null)}
                className="text-violet-850 hover:text-violet-950 p-1.5 hover:bg-violet-150 rounded-lg text-xs font-bold transition"
              >
                Close Panel
              </button>
            </div>

            {selectedDayBookings.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {selectedDayBookings.map((b) => (
                  <div key={b.id} className="bg-white border border-slate-200/60 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-[10px] text-slate-400 font-bold">{b.id}</span>
                        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider ${getStatusStyle(b.status)}`}>
                          {b.status}
                        </span>
                      </div>
                      <h5 className="text-sm font-extrabold text-slate-850">{b.patient}</h5>
                      <div className="flex items-center gap-4 text-xs text-slate-500 font-medium font-mono">
                        <div className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{b.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span>{b.room}</span>
                        </div>
                      </div>
                    </div>
                    {b.status !== 'Confirmed' && (
                      <button
                        onClick={() => confirm(b.id)}
                        className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white py-2 text-[10px] font-bold active:scale-[0.98] transition shadow-sm"
                      >
                        Confirm Check-In
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No appointments or active room allocations booked for this date.</p>
            )}
          </section>
        )}

        {/* LIST QUEUE (Original components preserve) */}
        {activeView === 'list' && (
          <section className="bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">Active Bookings Queue</h2>
              <p className="text-xs text-slate-400 mt-1">Verify patient appointments and room availability before check-in.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">ID</th>
                    <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Patient</th>
                    <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Time</th>
                    <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Room</th>
                    <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Check-in Status</th>
                    <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rows.map((r) => (
                    <tr key={r.id} className="group hover:bg-slate-50/40 transition-colors">
                      <td className="py-4 font-mono text-xs font-bold text-slate-500">{r.id}</td>
                      <td className="py-4 text-xs font-bold text-slate-900">{r.patient}</td>
                      <td className="py-4 text-xs font-semibold text-slate-600">{r.time}</td>
                      <td className="py-4 text-xs font-semibold text-slate-500">{r.room}</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${getStatusStyle(r.status)}`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        {r.status !== 'Confirmed' ? (
                          <button
                            onClick={() => confirm(r.id)}
                            className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 text-[10px] font-bold active:scale-[0.98] transition shadow-sm hover:shadow-emerald-650/10"
                          >
                            Confirm Check-In
                          </button>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-400">Ready</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
