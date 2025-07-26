"use client"

import { useState } from "react"

function CreateTaskSidebar({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignee: "",
    priority: "Medium",
    status: "Planning",
    startDate: "",
    endDate: "",
    effort: "",
    project: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Creating task:", formData)
    // Here you would typically send the data to your backend
    onClose()
    // Reset form
    setFormData({
      title: "",
      description: "",
      assignee: "",
      priority: "Medium",
      status: "Planning",
      startDate: "",
      endDate: "",
      effort: "",
      project: "",
    })
  }

  const teamMembers = [
    "Rajesh Kumar",
    "Priya Sharma",
    "Amit Singh",
    "Neha Patel",
    "Suresh Reddy",
    "Kavitha Nair",
    "Dr. Arjun Mehta",
    "Deepak Joshi",
  ]

  const projects = [
    "Electric Bus Model E-450 Development",
    "Body Panel Manufacturing Optimization",
    "Next Gen Battery Pack Assembly Line",
  ]

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? "open" : ""}`} onClick={onClose}></div>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Create New Task</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Task Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter task title"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="form-input resize-none"
                placeholder="Enter task description"
              />
            </div>

            <div>
              <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-2">
                Project *
              </label>
              <select
                id="project"
                name="project"
                value={formData.project}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Select a project</option>
                {projects.map((project) => (
                  <option key={project} value={project}>
                    {project}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 mb-2">
                Assignee *
              </label>
              <select
                id="assignee"
                name="assignee"
                value={formData.assignee}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Select assignee</option>
                {teamMembers.map((member) => (
                  <option key={member} value={member}>
                    {member}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>

            <div>
              <label htmlFor="effort" className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Effort
              </label>
              <input
                type="text"
                id="effort"
                name="effort"
                value={formData.effort}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., 40h, 2 days, 1 week"
              />
            </div>
          </div>

          <div className="mt-8 flex space-x-3">
            <button type="submit" className="btn btn-primary flex-1">
              <i className="fas fa-plus mr-2"></i>
              Create Task
            </button>
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateTaskSidebar
