import React from 'react';
import { CalendarDay, DayType } from '../types';

const Calendar: React.FC = () => {
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
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      <div className="bg-sea-600 p-4 text-center">
        <h2 className="text-2xl font-bold text-white tracking-wide">Юни 2026</h2>
      </div>
      
      <div className="p-4">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {calendarData.map((cell, index) => {
            if (cell.type === DayType.EMPTY) {
              return <div key={`empty-${index}`} className="aspect-square"></div>;
            }

            const isVacation = cell.type === DayType.VACATION;
            const isStart = cell.day === 14;
            const isEnd = cell.day === 21;

            return (
              <div
                key={cell.day}
                className={`
                  aspect-square flex items-center justify-center text-sm sm:text-base font-medium rounded-lg transition-all duration-300 relative
                  ${isVacation 
                    ? 'bg-teal-400 text-white shadow-md scale-105 font-bold z-10' 
                    : 'text-slate-700 hover:bg-slate-100'
                  }
                  ${isStart ? 'ring-2 ring-offset-1 ring-yellow-400' : ''}
                  ${isEnd ? 'ring-2 ring-offset-1 ring-yellow-400' : ''}
                `}
              >
                {cell.day}
                {isVacation && (
                  <span className="absolute -bottom-1 w-1 h-1 bg-white rounded-full opacity-70"></span>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
          <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
          <span>= Почивка на Амуляни</span>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
