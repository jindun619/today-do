import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type SearchEngine = 'google' | 'naver' | 'baidu';

interface SearchEngineConfig {
  name: string;
  url: (query: string) => string;
}

const searchEngines: Record<SearchEngine, SearchEngineConfig> = {
  google: {
    name: 'Google',
    url: (query: string) => `https://www.google.com/search?q=${encodeURIComponent(query)}`,
  },
  naver: {
    name: 'Naver',
    url: (query: string) => `https://search.naver.com/search.naver?query=${encodeURIComponent(query)}`,
  },
  baidu: {
    name: 'Baidu',
    url: (query: string) => `https://www.baidu.com/s?wd=${encodeURIComponent(query)}`,
  },
};

const engines: SearchEngine[] = ['google', 'naver', 'baidu'];

const SearchBar = () => {
  const [selectedEngine, setSelectedEngine] = useLocalStorage<SearchEngine>('today-do-search-engine', 'google');
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Global '/' key listener for focusing search bar
  useEffect(() => {
    const handleGlobalKeyPress = (e: KeyboardEvent) => {
      // Only focus if '/' is pressed and not already in an input/textarea
      if (e.key === '/' &&
          !(e.target instanceof HTMLInputElement) &&
          !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyPress);
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyPress);
    };
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      const searchUrl = searchEngines[selectedEngine].url(query.trim());
      window.open(searchUrl, '_blank');
      setQuery(''); // Clear search after searching
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Tab') {
      e.preventDefault(); // Prevent default tab behavior
      // Switch to next search engine
      const currentIndex = engines.indexOf(selectedEngine);
      const nextIndex = (currentIndex + 1) % engines.length;
      setSelectedEngine(engines[nextIndex]);
    }
  };

  return (
    <div className="glass rounded-2xl p-4 sm:p-6 animate-slide-up" style={{ animationDelay: '0.05s' }}>
      {/* Search Engine Tabs */}
      <div className="flex gap-2 mb-4">
        {(Object.keys(searchEngines) as SearchEngine[]).map((engine) => (
          <button
            key={engine}
            onClick={() => setSelectedEngine(engine)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedEngine === engine
                ? 'bg-white/20 text-white border-b-2 border-white'
                : 'text-white/60 hover:text-white/80 hover:bg-white/10'
            }`}
          >
            {searchEngines[engine].name}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="검색어 입력 (/ 로 접근, Tab으로 엔진 전환)"
          className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all"
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="검색"
        >
          <Search size={20} className="text-white/70 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
