import { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('ko-KR', options);
  };

  return (
    <div className="text-center animate-fade-in">
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white text-shadow-lg mb-2 sm:mb-3 md:mb-4">
        {formatTime(time)}
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-white/90 text-shadow">
        {formatDate(time)}
      </p>
    </div>
  );
};

export default Clock;
