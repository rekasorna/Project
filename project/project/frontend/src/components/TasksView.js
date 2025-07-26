"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import apiService from "../services/api"

function TasksView({ onTaskClick, onCreateTask }) {
  const { currentUser } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (currentUser) {
      fetchAllTasks()
    }
  }, [currentUser])

  const fetchAllTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // First get all projects for the user
      const projectsResponse = await apiService.getProjects(currentUser.id)
      const projects = projectsResponse.result || []
      
      // Then get tasks for each project
      const allTasks = []
      for (const project of projects) {
        try {
          const tasksResponse = await apiService.getTasks(project._id, currentUser.id)
          const projectTasks = tasksResponse.tasks || []
          // Add project name to each task
          const tasksWithProject = projectTasks.map(task => ({
            ...task,
            projectName: project.name
          }))
          allTasks.push(...tasksWithProject)
        } catch (error) {
          console.error(`Error fetching tasks for project ${project._id}:`, error)
        }
      }
      
      setTasks(allTasks)
    } catch (error) {
      console.error('Error fetching tasks:', error)
      setError('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Active":
      case "In Progress":
        return "badge-warning"
      case "Planning":
        return "badge-secondary"
      case "Completed":
        return "badge-success"
      default:
        return "badge-secondary"
    }
  }

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case "Critical":
        return "badge-danger"
      case "High":
        return "badge-warning"
      case "Medium":
        return "badge-primary"
      case "Low":
        return "badge-success"
      default:
        return "badge-secondary"
    }
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading tasks...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
          <p className="mt-1 text-sm text-gray-500">Manage and track all your tasks</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="btn btn-primary" onClick={onCreateTask}>
            <i className="fas fa-plus mr-2"></i>
            New Task
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fas fa-search text-gray-400"></i>
          </div>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input pl-10"
          />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="form-select">
          <option value="all">All Status</option>
          <option value="Planning">Planning</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="form-select">
          <option value="all">All Priority</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No tasks found</div>
      ) : (
        <div className="card">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Task
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Project
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Assignee
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Priority
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Due Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Progress
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTasks.map((task) => (
                  <tr
                    key={task._id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => onTaskClick(task)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{task.title}</div>
                      <div className="text-sm text-gray-500">{task.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {task.projectName || 'Unknown Project'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {task.assignees && task.assignees.length > 0 ? (
                        <div className="flex items-center">
                          <div className="avatar avatar-sm mr-2">
                            {getInitials(task.assignees[0].name || 'User')}
                          </div>
                          <span className="text-sm text-gray-900">{task.assignees[0].name}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Unassigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`badge ${getStatusBadgeClass(task.status)}`}>{task.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`badge ${getPriorityBadgeClass(task.priority)}`}>{task.priority}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {task.dueDate ? formatDate(task.dueDate) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full"
                            style={{ width: `${task.progress || 0}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">{task.progress || 0}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default TasksView
