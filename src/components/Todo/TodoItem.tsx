import { useState } from 'react';
import { Check, Trash2, Edit2, X, Save } from 'lucide-react';
import type { Todo } from '../../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onUpdatePriority: (id: string, priority: Todo['priority']) => void;
}

const TodoItem = ({ todo, onToggle, onDelete, onUpdate, onUpdatePriority }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const priorityColors = {
    low: 'border-l-blue-400',
    medium: 'border-l-yellow-400',
    high: 'border-l-red-400',
  };

  const priorityBadgeColors = {
    low: 'bg-blue-500/20 text-blue-300',
    medium: 'bg-yellow-500/20 text-yellow-300',
    high: 'bg-red-500/20 text-red-300',
  };

  return (
    <div
      className={`glass-hover rounded-lg p-4 border-l-4 ${priorityColors[todo.priority]} transition-all duration-200 ${
        todo.completed ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded border-2 transition-all ${
            todo.completed
              ? 'bg-white/30 border-white/50'
              : 'border-white/30 hover:border-white/50'
          } flex items-center justify-center`}
        >
          {todo.completed && <Check size={16} className="text-white" />}
        </button>

        {/* Todo text */}
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') handleCancel();
              }}
              className="w-full bg-white/10 border border-white/20 rounded px-3 py-1 text-white focus:outline-none focus:border-white/40"
              autoFocus
            />
          ) : (
            <p className={`text-white ${todo.completed ? 'line-through' : ''}`}>
              {todo.text}
            </p>
          )}
        </div>

        {/* Priority badge */}
        {!isEditing && (
          <select
            value={todo.priority}
            onChange={(e) => onUpdatePriority(todo.id, e.target.value as Todo['priority'])}
            className={`px-2 py-1 rounded text-xs ${priorityBadgeColors[todo.priority]} border-0 focus:outline-none cursor-pointer`}
          >
            <option value="low" className="bg-gray-800">낮음</option>
            <option value="medium" className="bg-gray-800">보통</option>
            <option value="high" className="bg-gray-800">높음</option>
          </select>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <Save size={18} className="text-green-400" />
              </button>
              <button
                onClick={handleCancel}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <X size={18} className="text-red-400" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <Edit2 size={18} className="text-white/70 hover:text-white" />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <Trash2 size={18} className="text-white/70 hover:text-red-400" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
