// Validation middleware for task data
function validateTask(req, res, next) {
  const { title, description, priority } = req.body;
  const errors = {};

  // validate title (required, 1-100 characters)
  if (!title || typeof title !== 'string') {
    errors.title = 'Title is required';
  } else if (title.trim().length === 0) {
    errors.title = 'Title cannot be empty';
  } else if (title.length > 100) {
    errors.title = 'Title must be 100 characters or less';
  }

  // Validate description (optional, max 500 characters)
  if (description && typeof description === 'string' && description.length > 500) {
    errors.description = 'Description must be 500 characters or less';
  }

  // Validate priority (must be low, medium,or high)
  if (priority && !['low', 'medium', 'high'].includes(priority)) {
    errors.priority = 'Priority must be one of: low, medium, high';
  }

  // if there are validation errors  return 400
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors
    });
  }

  next();
}

module.exports = { validateTask };
