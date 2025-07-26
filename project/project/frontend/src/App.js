"use client"

import { useState } from "react"
import { AuthProvider } from "./context/AuthContext"
import AppSidebar from "./components/AppSidebar"
import Dashboard from "./components/Dashboard"
import ProjectsView from "./components/ProjectsView"
import TasksView from "./components/TasksView"
import TeamView from "./components/TeamView"
import ReportsView from "./components/ReportsView"
import InventoryView from "./components/InventoryView"
import SettingsView from "./components/SettingsView"
import ProjectDetail from "./components/ProjectDetail"
import TaskDetailSidebar from "./components/TaskDetailSidebar"
import CreateTaskSidebar from "./components/CreateTaskSidebar"

function AppContent() {
  const [activeView, setActiveView] = useState("dashboard")
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedTask, setSelectedTask] = useState(null)
  const [showTaskDetail, setShowTaskDetail] = useState(false)
  const [showCreateTask, setShowCreateTask] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleViewChange = (view) => {
    setActiveView(view)
    setSelectedProject(null)
  }

  const handleProjectSelect = (project) => {
    setSelectedProject(project)
  }

  const handleTaskClick = (task) => {
    setSelectedTask(task)
    setShowTaskDetail(true)
  }

  const handleCreateTask = () => {
    setShowCreateTask(true)
  }

  const renderView = () => {
    if (selectedProject) {
      return (
        <ProjectDetail
          project={selectedProject}
          onBack={() => setSelectedProject(null)}
          onTaskClick={handleTaskClick}
          onCreateTask={handleCreateTask}
        />
      )
    }

    switch (activeView) {
      case "dashboard":
        return <Dashboard onProjectSelect={handleProjectSelect} />
      case "projects":
        return <ProjectsView onProjectSelect={handleProjectSelect} onCreateTask={handleCreateTask} />
      case "tasks":
        return <TasksView onTaskClick={handleTaskClick} onCreateTask={handleCreateTask} />
      case "team":
        return <TeamView />
      case "reports":
        return <ReportsView />
      case "inventory":
        return <InventoryView />
      case "settings":
        return <SettingsView />
      default:
        return <Dashboard onProjectSelect={handleProjectSelect} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AppSidebar
        activeView={activeView}
        onViewChange={handleViewChange}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
                >
                  <span className="sr-only">Open sidebar</span>
                  <i className="fas fa-bars"></i>
                </button>
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-xl font-bold text-gray-900">ProjectHub</h1>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <button onClick={handleCreateTask} className="btn btn-primary flex items-center">
                    <i className="fas fa-plus mr-2"></i>
                    <span>New Task</span>
                  </button>
                </div>
                <div className="ml-4 relative">
                  <div className="flex items-center">
                    <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                      <span className="sr-only">View notifications</span>
                      <i className="fas fa-bell"></i>
                    </button>
                    <div className="ml-3 relative">
                      <div className="avatar avatar-md">JD</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{renderView()}</div>
          </div>
        </main>
      </div>

      <TaskDetailSidebar isOpen={showTaskDetail} onClose={() => setShowTaskDetail(false)} task={selectedTask} />

      <CreateTaskSidebar isOpen={showCreateTask} onClose={() => setShowCreateTask(false)} />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
