import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Coffee, Flame } from 'lucide-react';
import toast from 'react-hot-toast';

const WORK_MINUTES = 25;
const BREAK_MINUTES = 5;
const LONG_BREAK_MINUTES = 15;

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(WORK_MINUTES);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);

  const reset = useCallback(() => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(WORK_MINUTES);
    setSeconds(0);
  }, []);

  const startBreak = useCallback(() => {
    const newSessions = sessions + 1;
    setSessions(newSessions);
    setIsBreak(true);

    // Long break every 4 sessions
    const breakTime = newSessions % 4 === 0 ? LONG_BREAK_MINUTES : BREAK_MINUTES;
    setMinutes(breakTime);
    setSeconds(0);

    const message = newSessions % 4 === 0
      ? '🎉 잘하셨습니다! 긴 휴식 시간입니다'
      : '☕ 휴식 시간입니다';
    toast.success(message);

    // Play notification sound
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('포모도로 타이머', {
        body: message,
        icon: '/vite.svg',
      });
    }
  }, [sessions]);

  const startWork = useCallback(() => {
    setIsBreak(false);
    setMinutes(WORK_MINUTES);
    setSeconds(0);
    toast.success('🔥 다시 집중할 시간입니다!');

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('포모도로 타이머', {
        body: '다시 집중할 시간입니다!',
        icon: '/vite.svg',
      });
    }
  }, []);

  const toggleTimer = () => {
    if (!isActive && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    setIsActive(!isActive);
  };

  useEffect(() => {
    let interval: number | undefined;

    if (isActive) {
      interval = window.setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer completed
            if (isBreak) {
              startWork();
            } else {
              startBreak();
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds, isBreak, startBreak, startWork]);

  const percentage = isBreak
    ? ((BREAK_MINUTES * 60 - (minutes * 60 + seconds)) / (BREAK_MINUTES * 60)) * 100
    : ((WORK_MINUTES * 60 - (minutes * 60 + seconds)) / (WORK_MINUTES * 60)) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isBreak ? (
            <Coffee size={20} className="text-blue-400" />
          ) : (
            <Flame size={20} className="text-orange-400" />
          )}
          <h3 className="text-lg font-semibold text-white">
            {isBreak ? '휴식 중' : '집중 시간'}
          </h3>
        </div>
        <div className="text-sm text-white/70">
          {sessions}회 완료
        </div>
      </div>

      {/* Timer display */}
      <div className="relative">
        {/* Progress circle */}
        <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={isBreak ? 'rgb(96, 165, 250)' : 'rgb(251, 146, 60)'}
            strokeWidth="4"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - percentage / 100)}`}
            className="transition-all duration-1000"
          />
        </svg>

        {/* Time display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-white tabular-nums">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={toggleTimer}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white transition-colors"
        >
          {isActive ? (
            <>
              <Pause size={18} />
              <span className="text-sm">일시정지</span>
            </>
          ) : (
            <>
              <Play size={18} />
              <span className="text-sm">시작</span>
            </>
          )}
        </button>

        <button
          onClick={reset}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          title="리셋"
        >
          <RotateCcw size={18} className="text-white/70 hover:text-white" />
        </button>
      </div>

      {/* Session dots */}
      <div className="flex items-center justify-center gap-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i < sessions % 4
                ? 'bg-white'
                : 'bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PomodoroTimer;
