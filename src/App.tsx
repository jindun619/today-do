import { useState } from 'react';
import DynamicBackground from './components/Background/DynamicBackground';
import Clock from './components/Clock/Clock';
import SearchBar from './components/SearchBar/SearchBar';
import TodoList from './components/Todo/TodoList';
import WeatherWidget from './components/Weather/WeatherWidget';
import PomodoroTimer from './components/Pomodoro/PomodoroTimer';
import DailyQuote from './components/Quote/DailyQuote';
import QuickNotes from './components/Notes/QuickNotes';
import SettingsPanel from './components/Settings/SettingsPanel';
import { Toaster } from 'react-hot-toast';
import { Settings } from 'lucide-react';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <DynamicBackground>
      <Toaster position="top-right" />

      {/* Settings Button */}
      <button
        onClick={() => setIsSettingsOpen(true)}
        className="fixed top-20 right-6 z-40 p-3 glass rounded-full hover:bg-white/20 transition-all shadow-lg"
        aria-label="Open settings"
      >
        <Settings size={24} className="text-white/70 hover:text-white" />
      </button>

      {/* Settings Panel */}
      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      <div className="flex flex-col items-center justify-between h-full p-4 sm:p-6 md:p-8">
        {/* Top section - Clock */}
        <div className="mb-6 md:mb-8">
          <Clock />
        </div>

        {/* Search Bar */}
        <div className="mb-6 w-full max-w-2xl">
          <SearchBar />
        </div>

        {/* Middle section - Main content area */}
        <div className="flex-1 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6 md:mb-8 overflow-auto custom-scrollbar">
          {/* Left column - Todo list */}
          <div className="lg:col-span-2 glass rounded-2xl p-6 animate-slide-up">
            <TodoList />
          </div>

          {/* Right column - Widgets */}
          <div className="flex flex-col gap-6">
            {/* Weather widget */}
            <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <WeatherWidget />
            </div>

            {/* Quote widget */}
            <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <DailyQuote />
            </div>

            {/* Pomodoro timer */}
            <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <PomodoroTimer />
            </div>
          </div>
        </div>

        {/* Bottom section - Quick notes */}
        <div className="w-full max-w-7xl glass rounded-2xl px-4 py-3 sm:p-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <QuickNotes />
        </div>
      </div>
    </DynamicBackground>
  );
}

export default App;
