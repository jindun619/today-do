import { useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import { Plus } from 'lucide-react';
import type { Todo } from '../../types';

interface TodoInputProps {
  onAdd: (text: string, priority: Todo['priority']) => void;
}

const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Todo['priority']>('medium');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text, priority);
      setText('');
      setPriority('medium');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="새로운 할 일을 입력하세요..."
          className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Todo['priority'])}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-3 text-white focus:outline-none focus:border-white/40 transition-colors cursor-pointer"
        >
          <option value="low" className="bg-gray-800">낮음</option>
          <option value="medium" className="bg-gray-800">보통</option>
          <option value="high" className="bg-gray-800">높음</option>
        </select>

        <button
          type="submit"
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">추가</span>
        </button>
      </div>
    </form>
  );
};

export default TodoInput;
