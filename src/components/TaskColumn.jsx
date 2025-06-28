import React from 'react';

const TaskColumn = ({
  statusKey,
  statusLabel,
  tasks,
  editingTaskId,
  editedTitle,
  setEditedTitle,
  startEditing,
  saveEdit,
  cancelEdit,
  deleteTask,
  moveTask,
}) => {
  return (
    <div className={`kanban-column ${statusKey}`}>
      <h2>{statusLabel}</h2>
      <ul className="task-list">
        {tasks.length === 0 ? (
          <li className="empty-message">No tasks available</li>
        ) : (
          tasks.map((task) => (
            <li key={task.id} className="task-item">
              {editingTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    aria-label="Edit task title"
                  />
                  <button onClick={() => saveEdit(task.id)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <strong>{task.title}</strong>
                  {task.description && <p className="task-desc">{task.description}</p>}
                  {task.dueDate && <small>Due: {task.dueDate}</small>}
                  <div className="task-meta">
                    <em>[{task.category}]</em>
                  </div>
                  <div className="task-actions">
                    <button onClick={() => startEditing(task)}>Edit</button>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                    <div className="move-buttons">
                      <button onClick={() => moveTask(task.id, -1)} disabled={statusKey === 'todo'}>
                        ←
                      </button>
                      <button onClick={() => moveTask(task.id, 1)} disabled={statusKey === 'done'}>
                        →
                      </button>
                    </div>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskColumn;
