const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = 4000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/tasks', tasksRouter);

// error handler (must be after the routes)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
