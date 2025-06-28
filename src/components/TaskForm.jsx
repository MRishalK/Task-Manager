import React, { useState } from 'react';

const TaskForm = ({ onAddTask, categories }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState(categories[0] || 'Other');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === '') {
      setError('Task title cannot be empty!');
      return;
    }

    const newTask = {
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || null,
      category,
    };

    onAddTask(newTask);

    
    setTitle('');
    setDescription('');
    setDueDate('');
    setCategory(categories[0] || 'Other');
    setError('');
  };

  return (
    <form id="task-form" onSubmit={handleSubmit} className="task-form">
      {error && <p className="error-msg" role="alert">{error}</p>}
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        aria-label="Task Title"
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        aria-label="Task Description"
      />
      <input
        placeholder="Due Date (optional)"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        aria-label="Due Date"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        aria-label="Category"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </form>
  );
};

export default TaskForm;
