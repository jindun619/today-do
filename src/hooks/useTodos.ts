import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Todo } from '../types';
import toast from 'react-hot-toast';

export function useTodos() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('today-do-todos', []);

  const addTodo = useCallback((text: string, priority: Todo['priority'] = 'medium') => {
    if (!text.trim()) {
      toast.error('할 일을 입력해주세요');
      return;
    }

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      priority,
      createdAt: Date.now(),
    };

    setTodos(prev => [newTodo, ...prev]);
    toast.success('할 일이 추가되었습니다');
  }, [setTodos]);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, [setTodos]);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    toast.success('할 일이 삭제되었습니다');
  }, [setTodos]);

  const updateTodo = useCallback((id: string, text: string) => {
    if (!text.trim()) {
      toast.error('할 일을 입력해주세요');
      return;
    }

    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: text.trim() } : todo
      )
    );
    toast.success('할 일이 수정되었습니다');
  }, [setTodos]);

  const updatePriority = useCallback((id: string, priority: Todo['priority']) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, priority } : todo
      )
    );
  }, [setTodos]);

  const clearCompleted = useCallback(() => {
    const completedCount = todos.filter(t => t.completed).length;
    if (completedCount === 0) {
      toast.error('완료된 할 일이 없습니다');
      return;
    }

    setTodos(prev => prev.filter(todo => !todo.completed));
    toast.success(`${completedCount}개의 할 일이 삭제되었습니다`);
  }, [todos, setTodos]);

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    updatePriority,
    clearCompleted,
  };
}
