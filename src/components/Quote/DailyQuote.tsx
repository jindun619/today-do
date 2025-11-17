import { useState, useEffect } from 'react';
import { Quote as QuoteIcon, RefreshCw } from 'lucide-react';
import { getDailyQuote, getRandomQuote } from '../../data/quotes';
import type { Quote } from '../../types';

const DailyQuote = () => {
  const [quote, setQuote] = useState<Quote>(getDailyQuote());
  const [isAnimating, setIsAnimating] = useState(false);

  const handleRefresh = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setQuote(getRandomQuote());
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    // Update quote at midnight
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    const timer = setTimeout(() => {
      setQuote(getDailyQuote());
      // Set up daily refresh
      setInterval(() => {
        setQuote(getDailyQuote());
      }, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <QuoteIcon size={20} className="text-yellow-400" />
          <h3 className="text-lg font-semibold text-white">오늘의 명언</h3>
        </div>
        <button
          onClick={handleRefresh}
          className="p-1 hover:bg-white/10 rounded transition-colors"
          title="다른 명언 보기"
        >
          <RefreshCw
            size={16}
            className={`text-white/70 hover:text-white transition-transform ${
              isAnimating ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      <div
        className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
      >
        <blockquote className="text-white/90 italic mb-3 leading-relaxed">
          "{quote.text}"
        </blockquote>
        <p className="text-white/60 text-sm text-right">— {quote.author}</p>
      </div>
    </div>
  );
};

export default DailyQuote;
