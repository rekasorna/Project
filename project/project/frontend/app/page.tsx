"use client"

import { useState } from "react"
import { ProjectsView } from "@/components/projects-view"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { InventoryView } from "@/components/inventory-view"
import { TaskDetailSidebar } from "@/components/task-detail-sidebar"
import { CreateTaskModal } from "@/components/create-task-modal"
import { CreateProjectView } from "@/components/create-project-view"

export default function ProjectManagementTool() {
  const [user] = useState({
    id: "1",
    name: "John Doe",
    email: "john@company.com",
    role: "Project Manager",
    avatar: "/placeholder.svg?height=32&width=32",
  })

  const [activeMenu, setActiveMenu] = useState("projects")
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false)
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false)
  const [currentView, setCurrentView] = useState<"projects" | "inventory" | "create-project">("projects")

  const handleTaskClick = (task: any) => {
    setSelectedTask(task)
    setIsTaskDetailOpen(true)
  }

  const handleStatusChange = (taskId: number, newStatus: string) => {
    console.log(`Task ${taskId} status changed to ${newStatus}`)
    // Here you would update the task status in your data
  }

  const handleCreateTask = () => {
    setIsCreateTaskOpen(true)
  }

  const handleCreateProject = () => {
    setCurrentView("create-project")
  }

  const handleBackToProjects = () => {
    setCurrentView("projects")
    setActiveMenu("projects")
  }

  const handleInventoryClick = () => {
    setActiveMenu("inventory")
    setCurrentView("inventory")
  }

  const handleProjectsClick = () => {
    setActiveMenu("projects")
    setCurrentView("projects")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">PM</span>
              </div>
              <span className="font-semibold text-xl text-gray-900">ProjectHub</span>
            </div>

            {/* Navigation Menu */}
            <nav className="flex items-center space-x-1">
              <Button
                variant={activeMenu === "projects" ? "default" : "ghost"}
                onClick={handleProjectsClick}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeMenu === "projects"
                    ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                Projects
              </Button>
              <Button
                variant={activeMenu === "inventory" ? "default" : "ghost"}
                onClick={handleInventoryClick}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeMenu === "inventory"
                    ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                Inventory
              </Button>
            </nav>
          </div>

          {/* Right side - User Profile and Notifications */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative hover:bg-gray-100 rounded-lg">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-medium">
                3
              </span>
            </Button>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100">
                  <Avatar className="h-8 w-8 ring-2 ring-gray-200">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
                      {user.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-gray-900">{user.name}</span>
                    <span className="text-xs text-gray-500">{user.role}</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 shadow-lg border-gray-200">
                <DropdownMenuItem className="p-3">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-700 hover:bg-gray-50">Profile Settings</DropdownMenuItem>
                <DropdownMenuItem className="text-gray-700 hover:bg-gray-50">Account Settings</DropdownMenuItem>
                <DropdownMenuItem className="text-gray-700 hover:bg-gray-50">Team Settings</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600 hover:bg-red-50">Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        {currentView === "projects" ? (
          <ProjectsView
            onTaskClick={handleTaskClick}
            onCreateTask={handleCreateTask}
            onCreateProject={handleCreateProject}
          />
        ) : currentView === "inventory" ? (
          <InventoryView />
        ) : (
          <CreateProjectView onBack={handleBackToProjects} />
        )}
      </main>

      {/* Task Detail Sidebar */}
      <TaskDetailSidebar
        open={isTaskDetailOpen}
        onOpenChange={setIsTaskDetailOpen}
        task={selectedTask}
        onStatusChange={handleStatusChange}
      />

      {/* Create Task Modal */}
      <CreateTaskModal open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen} />
    </div>
  )
}
