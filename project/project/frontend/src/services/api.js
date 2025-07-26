const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Project APIs
  async getProjects(userId) {
    return this.request(`/api/projects/getProjectsByUser?userId=${userId}`);
  }

  async getProject(projectId, userId) {
    return this.request(`/api/projects/getProject?projectId=${projectId}&userId=${userId}`);
  }

  async createProject(projectData) {
    return this.request('/api/projects/create', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  }

  // Task APIs
  async getTasks(projectId, userId) {
    return this.request(`/api/tasks/allTasks?projectId=${projectId}&userId=${userId}`);
  }

  async getTask(taskId, userId) {
    return this.request(`/api/tasks/getTaskById?taskId=${taskId}&userId=${userId}`);
  }

  async createTask(taskData, creatorId, projectId) {
    return this.request(`/api/tasks/create?creatorId=${creatorId}&projectId=${projectId}`, {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  async updateTask(taskId, userId, updateData) {
    return this.request(`/api/tasks/update?taskId=${taskId}&userId=${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(updateData),
    });
  }

  async deleteTask(taskId, userId) {
    return this.request(`/api/tasks/delete?taskId=${taskId}&userId=${userId}`, {
      method: 'DELETE',
    });
  }

  // User APIs
  async getAllUsers(adminId) {
    return this.request(`/api/users/allUsers?adminId=${adminId}`);
  }

  async searchUsers(adminId, query = '', limit = 10, role = '') {
    return this.request(`/api/users/searchUsers?adminId=${adminId}&query=${query}&limit=${limit}&role=${role}`);
  }

  async searchTeamMembers(userId, projectId, query = '', skills = '', limit = 10) {
    return this.request(`/api/users/searchTeamMembers?userId=${userId}&projectId=${projectId}&query=${query}&skills=${skills}&limit=${limit}`);
  }

  // Skills API
  async addSkill(skillData) {
    return this.request('/api/skills/add', {
      method: 'POST',
      body: JSON.stringify(skillData),
    });
  }
}

export default new ApiService(); 