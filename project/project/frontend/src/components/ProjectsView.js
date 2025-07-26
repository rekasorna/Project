"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import apiService from "../services/api"

function ProjectsView({ onProjectSelect, onCreateTask }) {
  const { currentUser } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (currentUser) {
      fetchProjects()
    }
  }, [currentUser])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiService.getProjects(currentUser.id)
      setProjects(response.result || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
      setError('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading projects...</div>
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
          <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
          <p className="mt-1 text-sm text-gray-500">Manage and track all your projects</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-10"
            />
          </div>
          <div className="flex border rounded-md">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 ${viewMode === "grid" ? "bg-gray-100 text-gray-900" : "text-gray-500"}`}
            >
              <i className="fas fa-th"></i>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-2 ${viewMode === "list" ? "bg-gray-100 text-gray-900" : "text-gray-500"}`}
            >
              <i className="fas fa-list"></i>
            </button>
          </div>
          <button className="btn btn-primary">
            <i className="fas fa-plus mr-2"></i>
            New Project
          </button>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No projects found</div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
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
                    {project.teamMembers && project.teamMembers.length > 3 && (
                      <div className="avatar avatar-sm border-2 border-white bg-gray-300">
                        +{project.teamMembers.length - 3}
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {project.startDate && formatDate(project.startDate)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
                    Project
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
                    Progress
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Start Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    End Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Team
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.map((project) => (
                  <tr
                    key={project._id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => onProjectSelect(project)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{project.name}</div>
                      <div className="text-sm text-gray-500">{project.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`badge ${getStatusBadgeClass(project.status)}`}>{project.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full"
                            style={{ width: `${project.progress || 0}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">{project.progress || 0}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {project.startDate ? formatDate(project.startDate) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {project.endDate ? formatDate(project.endDate) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex -space-x-2">
                        {project.teamMembers && project.teamMembers.slice(0, 3).map((member, index) => (
                          <div key={index} className="avatar avatar-sm border-2 border-white">
                            {getInitials(member.name || 'User')}
                          </div>
                        ))}
                        {project.teamMembers && project.teamMembers.length > 3 && (
                          <div className="avatar avatar-sm border-2 border-white bg-gray-300">
                            +{project.teamMembers.length - 3}
                          </div>
                        )}
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

export default ProjectsView
