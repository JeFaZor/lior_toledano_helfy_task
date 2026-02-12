const express = require('express');
const router = express.Router();
const store = require('../data/store');
const { validateTask } = require('../middleware/validation');

// GET /api/tasks - Get all tasks
router.get('/', (req, res) => {
  const tasks = store.getAllTasks();
  res.status(200).json(tasks);
});

// POST /api/tasks - Create new task
router.post('/', validateTask, (req, res) => {
  const newTask = store.createTask(req.body);
  res.status(201).json(newTask);
});

// PUT /api/tasks/:id - Update task
router.put('/:id', validateTask, (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTask = store.updateTask(id, req.body);

  if (!updatedTask) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.status(200).json(updatedTask);
});

// PATCH /api/tasks/:id/toggle - Toggle task completion
router.patch('/:id/toggle', (req, res) => {
  const id = parseInt(req.params.id);
  const toggledTask = store.toggleTaskCompletion(id);

  if (!toggledTask) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.status(200).json(toggledTask);
});

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = store.deleteTask(id);

  if (!deleted) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.status(200).json({ message: 'Task deleted successfully' });
});

module.exports = router;
