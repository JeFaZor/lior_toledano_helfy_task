const API_BASE = 'http://localhost:4000/api';

export const taskAPI = {
  async getAll() {
    const response = await fetch(`${API_BASE}/tasks`);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return response.json();
  },

  async create(taskData) {
    const response = await fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create task');
    }
    return response.json();
  },

  async update(id, taskData) {
    const response = await fetch(`${API_BASE}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    return response.json();
  },

  async delete(id) {
    const response = await fetch(`${API_BASE}/tasks/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
    return response.json();
  },

  async toggle(id) {
    const response = await fetch(`${API_BASE}/tasks/${id}/toggle`, {
      method: 'PATCH'
    });
    if (!response.ok) {
      throw new Error('Failed to toggle task');
    }
    return response.json();
  }
};
