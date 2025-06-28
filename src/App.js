import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskModal from './components/TaskModal';
import TaskColumn from './components/TaskColumn';
import { CATEGORIES, COLUMNS } from './constants';
import { moveTaskStatus, filterTasks } from './utils';
import './style.css';


const App = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : 'auto';
  }, [showModal]);

  
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const handleAddTask = (task) => {
    setTasks((prev) => [
      { ...task, id: uuidv4(), status: 'todo' },
      ...prev,
    ]);
    setStatusFilter('all');
    setCategoryFilter('all');
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const moveTask = (id, direction) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? moveTaskStatus(task, direction) : task
      )
    );
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditedTitle(task.title);
  };

  const saveEdit = (id) => {
    if (!editedTitle.trim()) {
      alert('Task title cannot be empty!');
      return;
    }
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: editedTitle.trim() } : task
      )
    );
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditedTitle('');
  };

  const filteredTasks = filterTasks(tasks, { statusFilter, searchTerm, categoryFilter });

  return (
    <div className="app kanban-view">
      <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Task Manager</h1>
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </header>

      <button onClick={() => setShowModal(true)} className="open-modal-btn">
        ➕ Add Task
      </button>

      <TaskModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAddTask={handleAddTask}
        categories={CATEGORIES}
      />

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search tasks"
        />
      </div>

      <div className="layout">
        <aside className="sidebar" aria-label="Filters">
          <h3>Status Filters</h3>
          {['all', 'active', 'completed'].map((filterKey) => (
            <button
              key={filterKey}
              onClick={() => setStatusFilter(filterKey)}
              className={statusFilter === filterKey ? 'active' : ''}
            >
              {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
            </button>
          ))}

          <h3>Category Filters</h3>
          <button
            onClick={() => setCategoryFilter('all')}
            className={categoryFilter === 'all' ? 'active' : ''}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={categoryFilter === cat ? 'active' : ''}
            >
              {cat}
            </button>
          ))}
        </aside>

        <main className="kanban-board">
          {Object.entries(COLUMNS).map(([statusKey, statusLabel]) => (
            <TaskColumn
              key={statusKey}
              statusKey={statusKey}
              statusLabel={statusLabel}
              tasks={filteredTasks.filter((task) => task.status === statusKey)}
              editingTaskId={editingTaskId}
              editedTitle={editedTitle}
              setEditedTitle={setEditedTitle}
              startEditing={startEditing}
              saveEdit={saveEdit}
              cancelEdit={cancelEdit}
              deleteTask={deleteTask}
              moveTask={moveTask}
            />
          ))}
        </main>
      </div>
    </div>
  );
};

export default App;
