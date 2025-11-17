import { useMemo } from 'react';
import { useTodos } from '../../hooks/useTodos';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';

const TodoList = () => {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo, updatePriority, clearCompleted } = useTodos();

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const remaining = total - completed;
    return { total, completed, remaining };
  }, [todos]);

  const sortedTodos = useMemo(() => {
    return [...todos].sort((a, b) => {
      // First sort by completion status (incomplete first)
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      // Then by priority (high to low)
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      // Finally by creation time (newest first)
      return b.createdAt - a.createdAt;
    });
  }, [todos]);

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-white mb-2">오늘의 할 일</h2>
        <div className="flex items-center gap-4 text-sm text-white/70">
          <div className="flex items-center gap-1">
            <Circle size={16} />
            <span>{stats.remaining}개 남음</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 size={16} />
            <span>{stats.completed}개 완료</span>
          </div>
          {stats.completed > 0 && (
            <button
              onClick={clearCompleted}
              className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors ml-auto"
            >
              <Trash2 size={16} />
              <span>완료 항목 삭제</span>
            </button>
          )}
        </div>
      </div>

      <TodoInput onAdd={addTodo} />

      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
        {sortedTodos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/50 text-lg">할 일이 없습니다</p>
            <p className="text-white/30 text-sm mt-2">위에서 새로운 할 일을 추가해보세요!</p>
          </div>
        ) : (
          sortedTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
              onUpdatePriority={updatePriority}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
