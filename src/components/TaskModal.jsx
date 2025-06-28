import React from 'react';
import TaskForm from './TaskForm';
import '../style.css';

const TaskModal = ({ isOpen, onClose, onAddTask, categories }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Add New Task</h2>
        
        
        <TaskForm
          categories={categories}
          onAddTask={(task) => {
            onAddTask(task);
            onClose();
          }}
        />

        
        <div className="modal-buttons">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" form="task-form" className="add-btn">
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
