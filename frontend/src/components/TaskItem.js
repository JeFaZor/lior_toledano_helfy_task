import React from 'react';
import '../styles/TaskItem.css';

function TaskItem({ task, onEdit, onDelete, onToggle }) {
  const priorityColors = {
    low: '#4CAF50',
    medium: '#FF9800',
    high: '#F44336'
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <span
          className="priority-badge"
          style={{ backgroundColor: priorityColors[task.priority] }}
        >
          {task.priority}
        </span>
      </div>

      <p className="task-description">{task.description}</p>

      <div className="task-footer">
        <span className="task-date">{formatDate(task.createdAt)}</span>

        <div className="task-actions">
          <button
            className="btn-toggle"
            onClick={() => onToggle(task.id)}
          >
            {task.completed ? 'Undo' : 'Complete'}
          </button>
          <button
            className="btn-edit"
            onClick={() => onEdit(task)}
          >
            Edit
          </button>
          <button
            className="btn-delete"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
