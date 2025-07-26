"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Search,
  MoreHorizontal,
  BarChart3,
  FolderKanban,
  CheckCircle,
  AlertTriangle,
  LayoutGrid,
  List,
  ChevronRight,
  ChevronDown,
  X,
  MessageCircle,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ProjectDetail } from "@/components/project-detail"
import EditProjectModal from "@/components/edit-project-modal"
import { CreateTaskSidebar } from "@/components/create-task-sidebar"

interface ProjectsViewProps {
  onTaskClick?: (task: any) => void
  onCreateTask?: () => void
  onCreateProject?: () => void
}

export function ProjectsView({ onTaskClick, onCreateTask, onCreateProject }: ProjectsViewProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const [activeView, setActiveView] = useState("card")
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set())
  const [searchExpanded, setSearchExpanded] = useState(false)
  const [editingProject, setEditingProject] = useState<any>(null)
  const [showEditProjectModal, setShowEditProjectModal] = useState(false)
  const [showCreateTaskSidebar, setShowCreateTaskSidebar] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchExpanded && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchExpanded])

  const toggleSearch = () => {
    setSearchExpanded(!searchExpanded)
    if (searchExpanded) {
      setSearchTerm("")
    }
  }

  const projectsData = [
    {
      id: 1,
      name: "Electric Bus Model E-450 Development",
      description: "Complete development of new electric bus model with advanced battery management system",
      status: "Active",
      progress: 65,
      startDate: "2024-01-15",
      endDate: "2024-08-30",
      budget: 2500000,
      spent: 1625000,
      team: [
        { name: "Rajesh Kumar", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Priya Sharma", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Amit Singh", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Neha Patel", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      tasks: [
        {
          id: 1,
          title: "Battery Management System Design",
          status: "Completed",
          priority: "High",
          assignee: { name: "Rajesh Kumar", avatar: "/placeholder.svg?height=32&width=32" },
          startDate: "2024-01-15",
          endDate: "2024-03-15",
          progress: 100,
        },
        {
          id: 2,
          title: "Chassis Integration Testing",
          status: "In Progress",
          priority: "High",
          assignee: { name: "Amit Singh", avatar: "/placeholder.svg?height=32&width=32" },
          startDate: "2024-03-10",
          endDate: "2024-04-20",
          progress: 70,
        },
        {
          id: 3,
          title: "Motor Controller Programming",
          status: "In Progress",
          priority: "Medium",
          assignee: { name: "Priya Sharma", avatar: "/placeholder.svg?height=32&width=32" },
          startDate: "2024-03-15",
          endDate: "2024-04-25",
          progress: 45,
        },
        {
          id: 4,
          title: "Safety Compliance Certification",
          status: "Planning",
          priority: "Critical",
          assignee: { name: "Neha Patel", avatar: "/placeholder.svg?height=32&width=32" },
          startDate: "2024-05-01",
          endDate: "2024-06-15",
          progress: 0,
        },
      ],
    },
    {
      id: 2,
      name: "Body Panel Manufacturing Optimization",
      description: "Optimize manufacturing process for side panels, rear engine doors, and driver floor areas",
      status: "In Progress",
      progress: 78,
      startDate: "2024-02-01",
      endDate: "2024-05-15",
      budget: 850000,
      spent: 663000,
      team: [
        { name: "Suresh Reddy", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Kavitha Nair", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Ravi Gupta", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      tasks: [
        {
          id: 5,
          title: "Side Panel Tooling Upgrade",
          status: "Completed",
          priority: "High",
          assignee: { name: "Suresh Reddy", avatar: "/placeholder.svg?height=32&width=32" },
          startDate: "2024-02-01",
          endDate: "2024-03-01",
          progress: 100,
        },
        {
          id: 6,
          title: "Quality Control Process Review",
          status: "In Progress",
          priority: "Medium",
          assignee: { name: "Kavitha Nair", avatar: "/placeholder.svg?height=32&width=32" },
          startDate: "2024-03-15",
          endDate: "2024-04-10",
          progress: 80,
        },
        {
          id: 7,
          title: "Rear Engine Door Redesign",
          status: "In Progress",
          priority: "High",
          assignee: { name: "Ravi Gupta", avatar: "/placeholder.svg?height=32&width=32" },
          startDate: "2024-03-20",
          endDate: "2024-04-25",
          progress: 60,
        },
      ],
    },
    {
      id: 3,
      name: "Next Gen Battery Pack Assembly Line",
      description: "Establish automated assembly line for next generation battery packs with 2x energy density",
      status: "Planning",
      progress: 20,
      startDate: "2024-03-01",
      endDate: "2024-12-31",
      budget: 4000000,
      spent: 800000,
      team: [
        { name: "Dr. Arjun Mehta", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Deepak Joshi", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Anjali Verma", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      tasks: [
        {
          id: 8,
          title: "Assembly Line Design",
          status: "In Progress",
          priority: "High",
          assignee: { name: "Dr. Arjun Mehta", avatar: "/placeholder.svg?height=32&width=32" },
          startDate: "2024-03-01",
          endDate: "2024-05-31",
          progress: 30,
        },
        {
          id: 9,
          title: "Equipment Procurement",
          status: "Planning",
          priority: "Medium",
          assignee: { name: "Deepak Joshi", avatar: "/placeholder.svg?height=32&width=32" },
          startDate: "2024-06-01",
          endDate: "2024-08-31",
          progress: 0,
        },
        {
          id: 10,
          title: "Installation & Testing",
          status: "Planning",
          priority: "High",
          assignee: { name: "Anjali Verma", avatar: "/placeholder.svg?height=32&width=32" },
          startDate: "2024-09-01",
          endDate: "2024-12-31",
          progress: 0,
        },
      ],
    },
    {
      id: 4,
      name: "Electric Drivetrain Integration",
      description: "Integrate electric drivetrain with existing chassis for hybrid bus conversion",
      status: "Completed",
      progress: 100,
      startDate: "2023-11-01",
      endDate: "2024-01-31",
      budget: 600000,
      spent: 580000,
      team: [
        { name: "Rajesh Kumar", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Priya Sharma", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      tasks: [
        {
          id: 11,
          title: "Drivetrain Design",
          status: "Completed",
          priority: "High",
          assignee: { name: "Rajesh Kumar", avatar: "/placeholder.svg?height=32&width=32" },
          startDate: "2023-11-01",
          endDate: "2023-12-15",
          progress: 100,
        },
        {
          id: 12,
          title: "Integration Testing",
          status: "Completed",
          priority: "High",
          assignee: { name: "Priya Sharma", avatar: "/placeholder.svg?height=32&width=32" },
          startDate: "2023-12-16",
          endDate: "2024-01-31",
          progress: 100,
        },
      ],
    },
    {
      id: 5,
      name: "Quality Control System Upgrade",
      description: "Implement automated quality control systems for manufacturing line efficiency",
      status: "Active",
      progress: 45,
      startDate: "2024-01-01",
      endDate: "2024-06-30",
      budget: 1200000,
      spent: 540000,
      team: [
        { name: "Neha Patel", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Kavitha Nair", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      tasks: [
        {
          id: 13,
          title: "System Analysis",
          status: "Completed",
          priority: "High",
          assignee: { name: "Neha Patel", avatar: "/placeholder.svg?height=32&width=32" },
          startDate: "2024-01-01",
          endDate: "2024-02-15",
          progress: 100,
        },
        {
          id: 14,
          title: "Software Development",
          status: "In Progress",
          priority: "High",
          assignee: { name: "Kavitha Nair", avatar: "/placeholder.svg?height=32&width=32" },
          startDate: "2024-02-16",
          endDate: "2024-05-31",
          progress: 60,
        },
        {
          id: 15,
          title: "Implementation & Training",
          status: "Planning",
          priority: "Medium",
          assignee: { name: "Neha Patel", avatar: "/placeholder.svg?height=32&width=32" },
          startDate: "2024-06-01",
          endDate: "2024-06-30",
          progress: 0,
        },
      ],
    },
    {
      id: 6,
      name: "Autonomous Bus Technology R&D",
      description: "Research and development for Level 4 autonomous bus technology",
      status: "Planning",
      progress: 10,
      startDate: "2024-04-01",
      endDate: "2025-03-31",
      budget: 5000000,
      spent: 500000,
      team: [
        { name: "Dr. Arjun Mehta", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Rajesh Kumar", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Deepak Joshi", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      tasks: [
        {
          id: 16,
          title: "Research Phase",
          status: "In Progress",
          priority: "High",
          assignee: { name: "Dr. Arjun Mehta", avatar: "/placeholder.svg?height=32&width=32" },
          startDate: "2024-04-01",
          endDate: "2024-08-31",
          progress: 25,
        },
        {
          id: 17,
          title: "Prototype Development",
          status: "Planning",
          priority: "High",
          assignee: { name: "Rajesh Kumar", avatar: "/placeholder.svg?height=32&width=32" },
          startDate: "2024-09-01",
          endDate: "2024-12-31",
          progress: 0,
        },
        {
          id: 18,
          title: "Testing & Validation",
          status: "Planning",
          priority: "Critical",
          assignee: { name: "Deepak Joshi", avatar: "/placeholder.svg?height=32&width=32" },
          startDate: "2025-01-01",
          endDate: "2025-03-31",
          progress: 0,
        },
      ],
    },
  ]

  const [projects, setProjects] = useState(projectsData)

  const filteredProjects = projects.filter((project) => project.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleCreateProject = () => {
    if (onCreateProject) {
      onCreateProject()
    }
  }

  const handleProjectClick = (projectId: number) => {
    setSelectedProjectId(projectId)
  }

  const handleBack = () => {
    setSelectedProjectId(null)
  }

  const toggleProjectExpansion = (projectId: number) => {
    const newExpanded = new Set(expandedProjects)
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId)
    } else {
      newExpanded.add(projectId)
    }
    setExpandedProjects(newExpanded)
  }

  const handleEditProject = (project: any) => {
    setEditingProject(project)
    setShowEditProjectModal(true)
  }

  const handleUpdateProject = (updatedProject: any) => {
    setProjects(projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)))
  }

  const handleCreateTask = (newTask: any) => {
    console.log("Creating task:", newTask)
    if (onCreateTask) {
      onCreateTask()
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <BarChart3 className="h-4 w-4 text-blue-600" />
      case "In Progress":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Planning":
        return <FolderKanban className="h-4 w-4 text-gray-400" />
      default:
        return <FolderKanban className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Planning":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProgressBarColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500"
    if (progress >= 60) return "bg-blue-500"
    if (progress >= 40) return "bg-yellow-500"
    if (progress >= 20) return "bg-orange-500"
    return "bg-red-500"
  }

  // Generate dates for the Gantt chart (12 months)
  const generateDates = () => {
    const dates = []
    const startDate = new Date("2023-11-01")
    const endDate = new Date("2025-03-31")
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

    for (let i = 0; i < Math.min(totalDays, 365); i += 30) {
      // Show monthly intervals
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      dates.push({
        date: date.getDate(),
        month: date.toLocaleDateString("en", { month: "short" }),
        year: date.getFullYear(),
        full: date.toLocaleDateString("en-GB"),
      })
    }
    return dates
  }

  const dates = generateDates()

  // Calculate project/task position and width for Gantt chart
  const getItemPosition = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const chartStart = new Date("2023-11-01")
    const chartEnd = new Date("2025-03-31")

    const totalDays = (chartEnd.getTime() - chartStart.getTime()) / (1000 * 60 * 60 * 24)
    const startOffset = Math.max(0, (start.getTime() - chartStart.getTime()) / (1000 * 60 * 60 * 24))
    const duration = Math.max(1, (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

    const leftPercent = (startOffset / totalDays) * 100
    const widthPercent = Math.min((duration / totalDays) * 100, 100 - leftPercent)

    return { left: `${leftPercent}%`, width: `${widthPercent}%` }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500"
    if (progress >= 50) return "bg-blue-500"
    if (progress >= 25) return "bg-yellow-500"
    return "bg-red-500"
  }

  if (selectedProjectId) {
    return <ProjectDetail projectId={selectedProjectId} onBack={handleBack} />
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage and track all your projects</p>
        </div>
        <div className="flex items-center space-x-2">
          {/* Search icon moved before tabs */}
          <div className="relative flex items-center">
            {searchExpanded ? (
              <div className="flex items-center bg-white border rounded-md overflow-hidden transition-all duration-200 ease-in-out">
                <Search className="h-4 w-4 ml-3 text-muted-foreground" />
                <Input
                  ref={searchInputRef}
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button variant="ghost" size="icon" onClick={toggleSearch} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={toggleSearch} className="h-9 w-9">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search projects</span>
              </Button>
            )}
          </div>

          {/* Tabs with only icons */}
          <Tabs value={activeView} onValueChange={setActiveView} className="mr-2">
            <TabsList>
              <TabsTrigger value="card">
                <LayoutGrid className="h-4 w-4" />
                <span className="sr-only">Card view</span>
              </TabsTrigger>
              <TabsTrigger value="list">
                <List className="h-4 w-4" />
                <span className="sr-only">List view</span>
              </TabsTrigger>
              <TabsTrigger value="gantt">
                <BarChart3 className="h-4 w-4" />
                <span className="sr-only">Gantt view</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* New Project button with only icon */}
          <Button onClick={handleCreateProject} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>
      </div>

      <Tabs value={activeView} className="space-y-4">
        <TabsContent value="card" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleProjectClick(project.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-semibold">{project.name}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditProject(project)
                          }}
                        >
                          Edit Project
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            setShowCreateTaskSidebar(true)
                          }}
                        >
                          Add Task
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>View Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Delete Project</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(project.status)}
                    <span className="text-sm font-medium">{project.status}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(project.progress)}`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      {project.startDate} - {project.endDate}
                    </span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {project.team.slice(0, 3).map((member) => (
                        <Avatar key={member.name} className="h-6 w-6">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {project.team.length > 3 && (
                        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">
                          +{project.team.length - 3}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-xs">{Math.floor(Math.random() * 20) + 5}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ₹{(project.spent / 100000).toFixed(1)}L / ₹{(project.budget / 100000).toFixed(1)}L
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Projects</CardTitle>
              <CardDescription>Complete list of projects with detailed information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                    onClick={() => handleProjectClick(project.id)}
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      {getStatusIcon(project.status)}
                      <div className="space-y-1 flex-1">
                        <h3 className="font-medium">{project.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>
                            {project.startDate} - {project.endDate}
                          </span>
                          <span>
                            ₹{(project.spent / 100000).toFixed(1)}L / ₹{(project.budget / 100000).toFixed(1)}L
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                      <div className="text-right">
                        <div className="text-sm font-medium">{project.progress}%</div>
                        <div className="w-20 bg-gray-200 rounded-full h-1">
                          <div
                            className={`h-1 rounded-full transition-all duration-300 ${getProgressBarColor(project.progress)}`}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {project.team.slice(0, 3).map((member) => (
                          <Avatar key={member.name} className="h-6 w-6">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {project.team.length > 3 && (
                          <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">
                            +{project.team.length - 3}
                          </div>
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditProject(project)
                            }}
                          >
                            Edit Project
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              setShowCreateTaskSidebar(true)
                            }}
                          >
                            Add Task
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>View Details</DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Delete Project</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gantt" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Timeline - Gantt Chart</CardTitle>
              <CardDescription>
                Visual timeline of all projects and their tasks. Click on projects to expand and view tasks.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="min-w-[1200px]">
                  {/* Header with dates */}
                  <div className="flex border-b">
                    <div className="w-80 p-3 font-medium border-r bg-gray-50">Project & Task Details</div>
                    <div className="flex-1 grid gap-0" style={{ gridTemplateColumns: `repeat(${dates.length}, 1fr)` }}>
                      {dates.map((date, i) => (
                        <div key={i} className="text-center text-xs p-2 border-r bg-gray-50">
                          <div className="font-medium">{date.month}</div>
                          <div className="text-gray-500">{date.year}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Project and Task rows */}
                  {filteredProjects.map((project) => {
                    const projectPosition = getItemPosition(project.startDate, project.endDate)
                    const isExpanded = expandedProjects.has(project.id)

                    return (
                      <div key={project.id}>
                        {/* Project Row */}
                        <div className="flex border-b hover:bg-gray-50">
                          <div className="w-80 p-3 border-r">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => toggleProjectExpansion(project.id)}
                              >
                                {isExpanded ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </Button>
                              <div className="flex-1">
                                <div className="font-medium text-sm">{project.name}</div>
                                <div className="text-xs text-gray-500 flex items-center space-x-2 mt-1">
                                  {getStatusIcon(project.status)}
                                  <Badge className={`text-[8px] px-1 py-0 ${getStatusColor(project.status)}`}>
                                    {project.status}
                                  </Badge>
                                  <span>{project.progress}%</span>
                                  <span>({project.tasks?.length || 0} tasks)</span>
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                  {project.startDate} - {project.endDate}
                                </div>
                                <div className="text-xs text-gray-400">
                                  ₹{(project.spent / 100000).toFixed(1)}L / ₹{(project.budget / 100000).toFixed(1)}L
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="flex-1 relative h-20"
                            style={{ display: "grid", gridTemplateColumns: `repeat(${dates.length}, 1fr)` }}
                          >
                            {/* Grid lines */}
                            {dates.map((_, i) => (
                              <div key={i} className="border-r h-full"></div>
                            ))}
                            {/* Project bar */}
                            <div
                              className={`absolute top-1/2 transform -translate-y-1/2 h-8 rounded ${getProgressColor(project.progress)} flex items-center justify-center text-white text-xs font-medium shadow-sm border-2 border-white`}
                              style={projectPosition}
                            >
                              <span className="truncate px-2">{project.name}</span>
                            </div>
                            {/* Progress indicator */}
                            <div
                              className="absolute top-1/2 transform -translate-y-1/2 h-8 rounded bg-gray-200 opacity-30"
                              style={projectPosition}
                            />
                            <div
                              className={`absolute top-1/2 transform -translate-y-1/2 h-8 rounded ${getProgressColor(project.progress)}`}
                              style={{
                                left: projectPosition.left,
                                width: `${(Number.parseFloat(projectPosition.width.replace("%", "")) * project.progress) / 100}%`,
                              }}
                            />
                          </div>
                        </div>

                        {/* Task Rows (when expanded) */}
                        {isExpanded &&
                          project.tasks?.map((task) => {
                            const taskPosition = getItemPosition(task.startDate, task.endDate)
                            return (
                              <div key={task.id} className="flex border-b hover:bg-blue-50/30 bg-blue-50/10">
                                <div className="w-80 p-3 border-r pl-12">
                                  <div className="font-medium text-sm text-blue-700">{task.title}</div>
                                  <div className="text-xs text-gray-500 flex items-center space-x-2 mt-1">
                                    <Avatar className="h-4 w-4">
                                      <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} />
                                      <AvatarFallback className="text-[8px]">
                                        {task.assignee.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span>{task.assignee.name}</span>
                                    <Badge className={`text-[8px] px-1 py-0 ${getStatusColor(task.status)}`}>
                                      {task.status}
                                    </Badge>
                                  </div>
                                  <div className="text-xs text-gray-400 mt-1">
                                    {task.startDate} - {task.endDate} ({task.progress}%)
                                  </div>
                                </div>
                                <div
                                  className="flex-1 relative h-16"
                                  style={{ display: "grid", gridTemplateColumns: `repeat(${dates.length}, 1fr)` }}
                                >
                                  {/* Grid lines */}
                                  {dates.map((_, i) => (
                                    <div key={i} className="border-r h-full"></div>
                                  ))}
                                  {/* Task bar */}
                                  <div
                                    className={`absolute top-1/2 transform -translate-y-1/2 h-4 rounded bg-blue-500 flex items-center justify-center text-white text-xs font-medium shadow-sm`}
                                    style={taskPosition}
                                  >
                                    <span className="truncate px-1">{task.title}</span>
                                  </div>
                                  {/* Task progress indicator */}
                                  <div
                                    className="absolute top-1/2 transform -translate-y-1/2 h-4 rounded bg-gray-200 opacity-30"
                                    style={taskPosition}
                                  />
                                  <div
                                    className={`absolute top-1/2 transform -translate-y-1/2 h-4 rounded bg-blue-500`}
                                    style={{
                                      left: taskPosition.left,
                                      width: `${(Number.parseFloat(taskPosition.width.replace("%", "")) * task.progress) / 100}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            )
                          })}
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Project Modal */}
      {editingProject && (
        <EditProjectModal
          open={showEditProjectModal}
          setOpen={setShowEditProjectModal}
          project={editingProject}
          onUpdateProject={handleUpdateProject}
        />
      )}

      {/* Create Task Sidebar */}
      <CreateTaskSidebar
        open={showCreateTaskSidebar}
        onOpenChange={setShowCreateTaskSidebar}
        onCreateTask={handleCreateTask}
      />
    </div>
  )
}
