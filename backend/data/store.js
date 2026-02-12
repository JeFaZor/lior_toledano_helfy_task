// In-memory data store for tasks
let tasks = [];
let nextId = 1;

// Seed data for carousel testing (8-10 tasks)
function initializeSeedData() {
  tasks = [
    {
      id: nextId++,
      title: "Complete project setup",
      description: "Initialize backend and frontend project structure",
      completed: true,
      createdAt: new Date("2026-02-12T09:00:00.000Z"),
      priority: "high"
    },
    {
      id: nextId++,
      title: "Build backend API",
      description: "Create Express server with REST endpoints",
      completed: true,
      createdAt: new Date("2026-02-12T09:30:00.000Z"),
      priority: "high"
    },
    {
      id: nextId++,
      title: "Implement endless carousel",
      description: "Build carousel with smooth infinite scrolling using vanilla React",
      completed: false,
      createdAt: new Date("2026-02-12T10:00:00.000Z"),
      priority: "high"
    },
    {
      id: nextId++,
      title: "Create TaskItem component",
      description: "Design and implement individual task card display",
      completed: false,
      createdAt: new Date("2026-02-12T10:30:00.000Z"),
      priority: "medium"
    },
    {
      id: nextId++,
      title: "Add form validation",
      description: "Implement client-side validation for task creation",
      completed: false,
      createdAt: new Date("2026-02-12T11:00:00.000Z"),
      priority: "medium"
    },
    {
      id: nextId++,
      title: "Style with vanilla CSS",
      description: "Apply clean, modern styling without frameworks",
      completed: false,
      createdAt: new Date("2026-02-12T11:30:00.000Z"),
      priority: "medium"
    },
    {
      id: nextId++,
      title: "Test responsive design",
      description: "Verify mobile, tablet, and desktop layouts",
      completed: false,
      createdAt: new Date("2026-02-12T12:00:00.000Z"),
      priority: "low"
    },
    {
      id: nextId++,
      title: "Write documentation",
      description: "Create comprehensive README with setup instructions",
      completed: false,
      createdAt: new Date("2026-02-12T12:30:00.000Z"),
      priority: "low"
    },
    {
      id: nextId++,
      title: "Perform final testing",
      description: "Test all CRUD operations and carousel functionality",
      completed: false,
      createdAt: new Date("2026-02-12T13:00:00.000Z"),
      priority: "high"
    },
    {
      id: nextId++,
      title: "Submit assignment",
      description: "Push to GitHub and submit repository link",
      completed: false,
      createdAt: new Date("2026-02-12T13:30:00.000Z"),
      priority: "high"
    }
  ];
}

// Initialize seed data on module load
initializeSeedData();

// Get all tasks
function getAllTasks() {
  return tasks;
}

// Get task by ID
function getTaskById(id) {
  return tasks.find(task => task.id === id);
}

// Create new task
function createTask(taskData) {
  const newTask = {
    id: nextId++,
    title: taskData.title,
    description: taskData.description || "",
    completed: false,
    createdAt: new Date(),
    priority: taskData.priority || "medium"
  };

  tasks.push(newTask);
  return newTask;
}

// Update task
function updateTask(id, taskData) {
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    return null;
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: taskData.title,
    description: taskData.description,
    completed: taskData.completed,
    priority: taskData.priority
  };

  return tasks[taskIndex];
}

// Delete task
function deleteTask(id) {
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    return false;
  }

  tasks.splice(taskIndex, 1);
  return true;
}

// Toggle task completion
function toggleTaskCompletion(id) {
  const task = tasks.find(task => task.id === id);

  if (!task) {
    return null;
  }

  task.completed = !task.completed;
  return task;
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion
};
