import { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { FileText, Save } from 'lucide-react';
import { useDebouncedCallback } from '../../hooks/useDebounce';

const QuickNotes = () => {
  const [savedNotes, setSavedNotes] = useLocalStorage('today-do-notes', '');
  const [notes, setNotes] = useState(savedNotes);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Debounced save function
  const debouncedSave = useDebouncedCallback((value: string) => {
    setSavedNotes(value);
    setIsSaving(false);
    setLastSaved(new Date());
  }, 1000);

  const handleChange = (value: string) => {
    setNotes(value);
    setIsSaving(true);
    debouncedSave(value);
  };

  const getLastSavedText = () => {
    if (!lastSaved) return '';
    const now = new Date();
    const diff = now.getTime() - lastSaved.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);

    if (minutes > 0) return `${minutes}분 전 저장됨`;
    if (seconds > 0) return `${seconds}초 전 저장됨`;
    return '방금 저장됨';
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <FileText size={18} className="text-white/70" />
        <span className="text-white/70 text-sm">빠른 메모</span>
      </div>

      <input
        type="text"
        value={notes}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="메모를 입력하세요..."
        className="flex-1 bg-transparent border-none text-white placeholder-white/40 focus:outline-none text-sm"
      />

      {(isSaving || lastSaved) && (
        <div className="flex items-center gap-2 text-xs text-white/50">
          {isSaving ? (
            <>
              <Save size={14} className="animate-pulse" />
              <span>저장 중...</span>
            </>
          ) : (
            <span>{getLastSavedText()}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default QuickNotes;
