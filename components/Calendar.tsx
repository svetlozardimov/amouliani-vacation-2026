import React from 'react';
import { CalendarDay, DayType } from '../types';

interface CalendarProps {
  onBirthdayClick?: () => void;
}

const Calendar: React.FC<CalendarProps> = ({ onBirthdayClick }) => {
  // June 2026 Setup
  // June 1, 2026 is a Monday.
  // Total days: 30
  
  const daysInMonth = 30;
  const startingDayIndex = 0; // Monday is 0 in standard BG calendar (Mon-Sun view)
  
  const weekDays = ['Пон', 'Вто', 'Сря', 'Чет', 'Пет', 'Съб', 'Нед'];
  
  const generateCalendarData = (): CalendarDay[] => {
    const data: CalendarDay[] = [];

    // Add empty slots for days before the 1st
    for (let i = 0; i < startingDayIndex; i++) {
      data.push({ day: null, type: DayType.EMPTY });
    }

    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
      let type = DayType.REGULAR;
      // Vacation is 14th to 21st inclusive
      if (i >= 14 && i <= 21) {
        type = DayType.VACATION;
      }
      data.push({ day: i, type: type });
    }

    return data;
  };

  const calendarData = generateCalendarData();

  return (
    <div className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/50 ring-1 ring-slate-900/5">
      <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 p-6 text-center relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
        
        <h2 className="text-3xl font-black text-white tracking-wider drop-shadow-sm relative z-10 uppercase">Юни 2026</h2>
      </div>
      
      <div className="p-5">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 mb-3">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {calendarData.map((cell, index) => {
            if (cell.type === DayType.EMPTY) {
              return <div key={`empty-${index}`} className="aspect-square"></div>;
            }

            const isVacation = cell.type === DayType.VACATION;
            const isStart = cell.day === 14;
            const isEnd = cell.day === 21;
            const isBirthday = cell.day === 18;

            // Dynamic classes based on day type
            let bgClass = 'text-slate-600 hover:bg-slate-50 bg-white border border-slate-100 shadow-sm';
            
            if (isVacation) {
               // Beautiful Gradient for vacation
               bgClass = 'bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-md font-bold border-transparent transform hover:scale-105 z-10';
            }
            
            if (isBirthday) {
               // Special Gradient for birthday
               bgClass = 'bg-gradient-to-br from-fuchsia-500 to-rose-500 text-white shadow-lg ring-2 ring-white z-20 cursor-pointer hover:scale-110 hover:rotate-3 transition-transform';
            }

            return (
              <div
                key={cell.day}
                onClick={isBirthday ? onBirthdayClick : undefined}
                className={`
                  aspect-square flex items-center justify-center text-sm sm:text-base font-medium rounded-xl transition-all duration-300 relative
                  ${bgClass}
                  ${isStart && !isBirthday ? 'ring-2 ring-offset-1 ring-yellow-400' : ''}
                  ${isEnd ? 'ring-2 ring-offset-1 ring-yellow-400' : ''}
                `}
                title={isBirthday ? "Кликни за изненада!" : undefined}
              >
                <span className="relative z-10">{cell.day}</span>
                
                {/* Vacation Dots */}
                {isVacation && !isBirthday && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/60 rounded-full"></span>
                )}
                
                {/* Birthday Icon */}
                {isBirthday && (
                  <span className="absolute -top-2 -right-2 text-base filter drop-shadow-md animate-bounce">🎂</span>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-500">
           <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
              <div className="w-3 h-3 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full shadow-sm"></div>
              <span>Почивка</span>
           </div>
           <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
              <div className="w-3 h-3 bg-gradient-to-br from-fuchsia-500 to-rose-500 rounded-full shadow-sm"></div>
              <span>РД на Галя</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;