import { useBackground } from '../../hooks/useBackground';
import { RefreshCw } from 'lucide-react';

interface BackgroundProps {
  children: React.ReactNode;
}

const DynamicBackground = ({ children }: BackgroundProps) => {
  const { background, isLoading, refreshBackground } = useBackground();

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background layer with gradient fallback */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 transition-opacity duration-1000"
        style={{
          backgroundImage: background?.url ? `url(${background.url})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: isLoading ? 0 : 1,
        }}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Refresh button */}
      <button
        onClick={refreshBackground}
        disabled={isLoading}
        className="absolute top-4 right-4 z-20 glass-hover rounded-full p-3 transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        title="새로운 배경 이미지 불러오기"
      >
        <RefreshCw size={20} className={`text-white ${isLoading ? 'animate-spin' : ''}`} />
      </button>

      {/* Photographer credit */}
      {background && (
        <div className="absolute bottom-4 left-4 z-20 glass rounded-lg px-3 py-2 text-xs text-white/80">
          Photo by{' '}
          <a
            href={background.photographerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            {background.photographer}
          </a>
          {' '}on Pexels
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default DynamicBackground;
