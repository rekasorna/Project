"use client"

import { useState } from "react"

function TaskDetailSidebar({ isOpen, onClose, task }) {
  const [activeTab, setActiveTab] = useState("details")
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "John Doe",
      content:
        "We need to make sure the charging system is compatible with both CCS2 and Type-2 standards as per the latest regulations.",
      timestamp: "2 days ago",
      avatar: "/placeholder.svg",
    },
  ])

  if (!task) return null

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }

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

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "Current User",
        content: newComment,
        timestamp: "Just now",
        avatar: "/placeholder.svg",
      }
      setComments([...comments, comment])
      setNewComment("")
    }
  }

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? "open" : ""}`} onClick={onClose}></div>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{task.title}</h2>
              <div className="mt-2 flex space-x-2">
                <span className={`badge ${getStatusBadgeClass(task.status)}`}>{task.status}</span>
                <span className={`badge ${getPriorityBadgeClass(task.priority)}`}>{task.priority}</span>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("details")}
              className={`${
                activeTab === "details"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } flex-1 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm text-center`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab("comments")}
              className={`${
                activeTab === "comments"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } flex-1 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm text-center`}
            >
              Comments
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`${
                activeTab === "activity"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } flex-1 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm text-center`}
            >
              Activity
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "details" && (
            <div>
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                <p className="text-sm text-gray-900">{task.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Assignee</h3>
                  <div className="flex items-center">
                    <div className="avatar avatar-sm mr-2">{getInitials(task.assignee.name)}</div>
                    <span className="text-sm text-gray-900">{task.assignee.name}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Due Date</h3>
                  <span className="text-sm text-gray-900">{new Date(task.endDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Start Date</h3>
                  <span className="text-sm text-gray-900">{new Date(task.startDate).toLocaleDateString()}</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Effort</h3>
                  <span className="text-sm text-gray-900">{task.effort}</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-500">Progress</h3>
                  <span className="text-sm text-gray-900">{task.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${task.progress}%` }}></div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="btn btn-primary flex-1">
                  <i className="fas fa-edit mr-2"></i>
                  Edit Task
                </button>
                <button className="btn btn-outline">
                  <i className="fas fa-paperclip"></i>
                </button>
              </div>
            </div>
          )}

          {activeTab === "comments" && (
            <div>
              <div className="mb-4">
                <div className="flex space-x-3">
                  <div className="avatar avatar-sm">CU</div>
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="form-input resize-none"
                      rows="3"
                    />
                    <div className="mt-2 flex justify-end">
                      <button onClick={handleAddComment} className="btn btn-primary btn-sm">
                        Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <div className="avatar avatar-sm">{getInitials(comment.author)}</div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                          <span className="text-xs text-gray-500">{comment.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "activity" && (
            <div className="space-y-4">
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-green-600 text-sm"></i>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">Rajesh Kumar</span> completed the task
                  </p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <i className="fas fa-comment text-blue-600 text-sm"></i>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">John Doe</span> added a comment
                  </p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <i className="fas fa-edit text-yellow-600 text-sm"></i>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">Priya Sharma</span> updated the task status
                  </p>
                  <p className="text-xs text-gray-500">1 week ago</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default TaskDetailSidebar
