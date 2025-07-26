"use client"

import { useState } from "react"

function ProjectDetail({ project, onBack, onTaskClick, onCreateTask }) {
  const [activeTab, setActiveTab] = useState("tasks")

  // Sample tasks data
  const tasks = [
    {
      id: 1,
      title: "Battery Management System Design",
      description: "Design and develop advanced battery management system with thermal management",
      status: "Completed",
      priority: "High",
      assignee: { name: "Rajesh Kumar", avatar: "/placeholder.svg" },
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      progress: 100,
      effort: "120h",
    },
    {
      id: 2,
      title: "Chassis Integration Testing",
      description: "Comprehensive testing of electric drivetrain integration with bus chassis",
      status: "In Progress",
      priority: "High",
      assignee: { name: "Amit Singh", avatar: "/placeholder.svg" },
      startDate: "2024-03-10",
      endDate: "2024-04-20",
      progress: 70,
      effort: "80h",
    },
    {
      id: 3,
      title: "Motor Controller Programming",
      description: "Program and calibrate electric motor controllers for optimal performance",
      status: "In Progress",
      priority: "Medium",
      assignee: { name: "Priya Sharma", avatar: "/placeholder.svg" },
      startDate: "2024-03-15",
      endDate: "2024-04-25",
      progress: 45,
      effort: "90h",
    },
    {
      id: 4,
      title: "Safety Compliance Certification",
      description: "Obtain AIS-052 and other required safety certifications for electric bus",
      status: "Planning",
      priority: "Critical",
      assignee: { name: "Neha Patel", avatar: "/placeholder.svg" },
      startDate: "2024-05-01",
      endDate: "2024-06-15",
      progress: 0,
      effort: "60h",
    },
  ]

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

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-800"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back to Projects
        </button>
        <div className="mt-2 flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900">{project.name}</h1>
              <span className={`badge ${getStatusBadgeClass(project.status)} ml-3`}>{project.status}</span>
            </div>
            <p className="mt-1 text-sm text-gray-500">{project.description}</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button className="btn btn-primary" onClick={onCreateTask}>
              <i className="fas fa-plus mr-2"></i>
              Add Task
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-gray-500">Project Progress</div>
          <div className="text-sm font-medium text-gray-900">{project.progress}%</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="p-4">
            <div className="text-sm text-gray-500">Start Date</div>
            <div className="text-lg font-medium text-gray-900">{new Date(project.startDate).toLocaleDateString()}</div>
          </div>
        </div>
        <div className="card">
          <div className="p-4">
            <div className="text-sm text-gray-500">End Date</div>
            <div className="text-lg font-medium text-gray-900">{new Date(project.endDate).toLocaleDateString()}</div>
          </div>
        </div>
        <div className="card">
          <div className="p-4">
            <div className="text-sm text-gray-500">Budget</div>
            <div className="text-lg font-medium text-gray-900">₹{(project.budget / 100000).toFixed(1)}L</div>
          </div>
        </div>
        <div className="card">
          <div className="p-4">
            <div className="text-sm text-gray-500">Spent</div>
            <div className="text-lg font-medium text-gray-900">₹{(project.spent / 100000).toFixed(1)}L</div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("tasks")}
              className={`${
                activeTab === "tasks"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Tasks
            </button>
            <button
              onClick={() => setActiveTab("team")}
              className={`${
                activeTab === "team"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Team
            </button>
            <button
              onClick={() => setActiveTab("files")}
              className={`${
                activeTab === "files"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Files
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`${
                activeTab === "reports"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Reports
            </button>
          </nav>
        </div>
      </div>

      {activeTab === "tasks" && (
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
                    Effort
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task.id} className="task-row">
                    <td className="px-6 py-4">
                      <div
                        className="text-sm font-medium text-primary-600 hover:text-primary-900 cursor-pointer"
                        onClick={() => onTaskClick(task)}
                      >
                        {task.title}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-1">{task.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="avatar avatar-sm mr-2">{getInitials(task.assignee.name)}</div>
                        <div className="text-sm text-gray-500">{task.assignee.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`badge ${getStatusBadgeClass(task.status)}`}>{task.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`badge ${getPriorityBadgeClass(task.priority)}`}>{task.priority}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(task.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.effort}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "team" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.team.map((member, index) => (
            <div key={index} className="card">
              <div className="p-6 flex items-center">
                <div className="avatar avatar-lg mr-4">{getInitials(member.name)}</div>
                <div>
                  <div className="text-lg font-medium text-gray-900">{member.name}</div>
                  <div className="text-sm text-gray-500">Team Member</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "files" && (
        <div className="card p-6">
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <i className="fas fa-file-upload text-3xl"></i>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No files</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by uploading a file.</p>
            <div className="mt-6">
              <button className="btn btn-primary">
                <i className="fas fa-upload mr-2"></i>
                Upload File
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "reports" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Task Status Distribution</h3>
            </div>
            <div className="card-body">
              <div className="h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <i className="fas fa-chart-pie text-4xl mb-3"></i>
                  <p>Chart visualization will be displayed here</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Budget Utilization</h3>
            </div>
            <div className="card-body">
              <div className="h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <i className="fas fa-chart-bar text-4xl mb-3"></i>
                  <p>Chart visualization will be displayed here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectDetail
