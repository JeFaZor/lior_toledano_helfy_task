import React, { useState, useEffect, useRef } from 'react';
import TaskCarousel from './components/TaskCarousel';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import LoadingSpinner from './components/LoadingSpinner';
import { taskAPI } from './services/api';
import './styles/App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  // Refs for scrolling
  const carouselRef = useRef(null);
  const formRef = useRef(null);

  // fetch tasks on init
  useEffect(() => {
    fetchTasks();
  }, []);

  // apply filter when tasks or filter changes
  useEffect(() => {
    applyFilter();
  }, [tasks, filter]);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await taskAPI.getAll();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilter = () => {
    switch (filter) {
      case 'completed':
        setFilteredTasks(tasks.filter(t => t.completed));
        break;
      case 'pending':
        setFilteredTasks(tasks.filter(t => !t.completed));
        break;
      default:
        setFilteredTasks(tasks);
    }
  };

  const createTask = async (_, taskData) => {
    try {
      const newTask = await taskAPI.create(taskData);
      //add new task to list
      setTasks(prevTasks => [...prevTasks, newTask]);
    } catch (err) {
      alert('Failed to create task: ' + err.message);
    }
  };

  const updateTask = async (id, taskData) => {
    // update task 
    const previousTasks = tasks;
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, ...taskData } : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);

    try {
      await taskAPI.update(id, taskData);
    } catch (err) {
      // Revert on error
      setTasks(previousTasks);
      alert('Failed to update task: ' + err.message);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    // remove task immediately
    const previousTasks = tasks;
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);

    try {
      await taskAPI.delete(id);
    } catch (err) {
      // Revert on error
      setTasks(previousTasks);
      alert('Failed to delete task: ' + err.message);
    }
  };

  const toggleTask = async (id) => {
    // toggle task completion immediately
    const previousTasks = tasks;
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    try {
      await taskAPI.toggle(id);
    } catch (err) {
      // Revert on error
      setTasks(previousTasks);
      alert('Failed to toggle task: ' + err.message);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    // Scroll to form after state update
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSave = async (id, taskData) => {
    if (id) {
      await updateTask(id, taskData);
    } else {
      await createTask(null, taskData);
    }
    // Scroll back to carousel after saving
    setTimeout(() => {
      carouselRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <p>Manage your tasks with an endless carousel</p>
      </header>

      <main className="app-main">
        <TaskFilter filter={filter} onFilterChange={setFilter} />

        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="error-message">
            <p>Error: {error}</p>
            <button onClick={fetchTasks}>Retry</button>
          </div>
        ) : (
          <div ref={carouselRef}>
            <TaskCarousel
              tasks={filteredTasks}
              onEdit={handleEditTask}
              onDelete={deleteTask}
              onToggle={toggleTask}
            />
          </div>
        )}

        <div ref={formRef}>
          <TaskForm
            task={editingTask}
            onSave={handleSave}
            onCancel={() => setEditingTask(null)}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
