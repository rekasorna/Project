"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import apiService from "../services/api"

function Dashboard({ onProjectSelect }) {
  const { currentUser } = useAuth()
  const [projects, setProjects] = useState([])
  const [recentTasks, setRecentTasks] = useState([])
  const [stats, setStats] = useState({
    totalProjects: 0,
    tasksCompleted: 0,
    inProgress: 0,
    overdueTasks: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (currentUser) {
      fetchDashboardData()
    }
  }, [currentUser])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch projects
      const projectsResponse = await apiService.getProjects(currentUser.id)
      const projectsData = projectsResponse.result || []
      setProjects(projectsData)

      // Calculate stats
      const totalProjects = projectsData.length
      let tasksCompleted = 0
      let inProgress = 0
      let overdueTasks = 0

      // Fetch tasks for each project to calculate stats
      const allTasks = []
      for (const project of projectsData) {
        try {
          const tasksResponse = await apiService.getTasks(project._id, currentUser.id)
          const projectTasks = tasksResponse.tasks || []
          allTasks.push(...projectTasks)

          // Calculate stats
          projectTasks.forEach(task => {
            if (task.status === 'Completed') {
              tasksCompleted++
            } else if (task.status === 'In Progress') {
              inProgress++
            }
            
            // Check for overdue tasks
            if (task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Completed') {
              overdueTasks++
            }
          })
        } catch (error) {
          console.error(`Error fetching tasks for project ${project._id}:`, error)
        }
      }

      // Get recent tasks (last 5)
      const sortedTasks = allTasks
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
      
      setRecentTasks(sortedTasks)
      setStats({
        totalProjects,
        tasksCompleted,
        inProgress,
        overdueTasks
      })

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Active":
        return "badge-primary"
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
        <div className="text-lg text-gray-600">Loading dashboard...</div>
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
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome back, {currentUser?.name}! Here's an overview of your projects.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 rounded-md bg-primary-100 text-primary-600">
                <i className="fas fa-project-diagram text-xl"></i>
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Total Projects</p>
                <p className="text-3xl font-semibold text-gray-900">{stats.totalProjects}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 rounded-md bg-green-100 text-green-600">
                <i className="fas fa-tasks text-xl"></i>
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Tasks Completed</p>
                <p className="text-3xl font-semibold text-gray-900">{stats.tasksCompleted}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 rounded-md bg-yellow-100 text-yellow-600">
                <i className="fas fa-clock text-xl"></i>
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <p className="text-3xl font-semibold text-gray-900">{stats.inProgress}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 rounded-md bg-red-100 text-red-600">
                <i className="fas fa-exclamation-triangle text-xl"></i>
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Overdue Tasks</p>
                <p className="text-3xl font-semibold text-gray-900">{stats.overdueTasks}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Active Projects</h2>
        {projects.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No projects found</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project._id}
                className="card cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => onProjectSelect(project)}
              >
                <div className="card-header">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                    <span className={`badge ${getStatusBadgeClass(project.status)}`}>{project.status}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">{project.description}</p>
                </div>
                <div className="card-body">
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{project.progress || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${project.progress || 0}%` }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {project.teamMembers && project.teamMembers.slice(0, 3).map((member, index) => (
                        <div key={index} className="avatar avatar-sm border-2 border-white">
                          {getInitials(member.name || 'User')}
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">
                      {project.startDate && formatDate(project.startDate)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Tasks</h2>
        {recentTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No recent tasks</div>
        ) : (
          <div className="card">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentTasks.map((task) => (
                    <tr key={task._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{task.title}</div>
                        <div className="text-sm text-gray-500">{task.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.project}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`badge ${getStatusBadgeClass(task.status)}`}>{task.status}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {task.dueDate ? formatDate(task.dueDate) : 'N/A'}
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
