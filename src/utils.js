
import { STATUS_ORDER } from './constants';

export const moveTaskStatus = (task, direction) => {
  const currentIndex = STATUS_ORDER.indexOf(task.status);
  const newIndex = currentIndex + direction;
  if (newIndex >= 0 && newIndex < STATUS_ORDER.length) {
    return { ...task, status: STATUS_ORDER[newIndex] };
  }
  return task;
};

export const filterTasks = (tasks, { statusFilter, searchTerm, categoryFilter }) => {
  return tasks
    .filter(task => {
      if (statusFilter === 'active') {
        return ['todo', 'inprogress'].includes(task.status);
      }
      if (statusFilter === 'completed') {
        return task.status === 'done';
      }
      return true;
    })
    .filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(task => categoryFilter === 'all' || task.category === categoryFilter);
};
