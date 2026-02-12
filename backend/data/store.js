// In-memory data store for tasks
let tasks = [];
let nextId = 1;

// Seed data for carousel testing (8-10 tasks)
function initializeSeedData() {
  tasks = [
    {
      id: nextId++,
      title: "Hi, I'm Lior Toledano",
      description: "A Full Stack Developer & recent Computer Science graduate.",
      completed: true,
      createdAt: new Date("2026-02-12T09:00:00.000Z"),
      priority: "high"
    },
    {
      id: nextId++,
      title: "I love solving complex UI challenges",
      description: "Like this endless carousel built with pure Vanilla CSS and React logic.",
      completed: true,
      createdAt: new Date("2026-02-12T09:30:00.000Z"),
      priority: "high"
    },
    {
      id: nextId++,
      title: "I'm a Gamer & Tech Enthusiast",
      description: "When I'm not coding, you'll find me on Counter-Strike 2 or checking out new hardware.",
      completed: false,
      createdAt: new Date("2026-02-12T10:00:00.000Z"),
      priority: "medium"
    },
    {
      id: nextId++,
      title: "Backend Foundation: Port 4000",
      description: "Developed a robust Express API with full CRUD and in-memory storage.",
      completed: true,
      createdAt: new Date("2026-02-12T10:30:00.000Z"),
      priority: "high"
    },
    {
      id: nextId++,
      title: "Clean Code is my standard",
      description: "Using expressive variable names and maintaining a clear project structure.",
      completed: false,
      createdAt: new Date("2026-02-12T11:00:00.000Z"),
      priority: "medium"
    },
    {
      id: nextId++,
      title: "I enjoy the grit of Sci-Fi",
      description: "Fan of shows like 'The Boys' and 'Invincible' - I appreciate bold, uncensored storytelling.",
      completed: false,
      createdAt: new Date("2026-02-12T11:30:00.000Z"),
      priority: "low"
    },
    {
      id: nextId++,
      title: "Responsive is not optional",
      description: "This task manager is optimized for Mobile, Tablet, and Desktop users.",
      completed: false,
      createdAt: new Date("2026-02-12T12:00:00.000Z"),
      priority: "high"
    },
    {
      id: nextId++,
      title: "Let's build something great!",
      description: "Always looking for the next challenge in Full Stack development.",
      completed: false,
      createdAt: new Date("2026-02-12T12:30:00.000Z"),
      priority: "medium"
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
