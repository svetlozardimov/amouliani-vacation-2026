import React, { useState, useEffect } from 'react';
import { TimeLeft } from '../types';

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +targetDate - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center bg-white/20 backdrop-blur-md rounded-lg p-3 sm:p-4 w-20 sm:w-24 border border-white/30 shadow-lg">
      <span className="text-2xl sm:text-4xl font-bold text-white drop-shadow-md">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-xs sm:text-sm text-white/90 font-medium uppercase tracking-wider mt-1">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex gap-2 sm:gap-4 justify-center flex-wrap">
      <TimeUnit value={timeLeft.days} label="Дни" />
      <TimeUnit value={timeLeft.hours} label="Часа" />
      <TimeUnit value={timeLeft.minutes} label="Мин" />
      <TimeUnit value={timeLeft.seconds} label="Сек" />
    </div>
  );
};

export default Countdown;
