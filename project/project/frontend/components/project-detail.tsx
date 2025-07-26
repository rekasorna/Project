"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Home,
  ArrowUpDown,
  LayoutGrid,
  ChevronRight,
  Calendar,
  DollarSign,
  List,
  BarChart3,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { CreateTaskSidebar } from "@/components/create-task-sidebar"
import { TaskDetailSidebar } from "@/components/task-detail-sidebar"

interface ProjectDetailProps {
  projectId: number
  onBack: () => void
}

export function ProjectDetail({ projectId, onBack }: ProjectDetailProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [assigneeFilter, setAssigneeFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("")
  const [sortField, setSortField] = useState("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [showCreateTaskSidebar, setShowCreateTaskSidebar] = useState(false)
  const [activeTab, setActiveTab] = useState("card")
  const [selectedTask, setSelectedTask] = useState<any | null>(null)
  const [showTaskDetailSidebar, setShowTaskDetailSidebar] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)

  // Project data - this would typically come from a data store or API
  const projects = [
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
      taskList: [
        {
          id: 1,
          title: "Battery Management System Design",
          description:
            "Design and develop advanced battery management system with thermal monitoring and cell balancing capabilities for optimal performance and safety.",
          status: "Completed",
          priority: "High",
          assignee: { name: "Rajesh Kumar", avatar: "/placeholder.svg?height=32&width=32" },
          dueDate: "15/03/2024",
          startDate: "01/02/2024",
          effort: "120h",
        },
        {
          id: 2,
          title: "Chassis Integration Testing",
          description:
            "Comprehensive testing of electric drivetrain integration with bus chassis including weight distribution and structural integrity analysis.",
          status: "In Progress",
          priority: "High",
          assignee: { name: "Amit Singh", avatar: "/placeholder.svg?height=32&width=32" },
          dueDate: "20/04/2024",
          startDate: "10/03/2024",
          effort: "80h",
        },
        {
          id: 3,
          title: "Motor Controller Programming",
          description:
            "Program and calibrate electric motor controllers for optimal torque delivery and energy efficiency in city driving conditions.",
          status: "In Progress",
          priority: "Medium",
          assignee: { name: "Priya Sharma", avatar: "/placeholder.svg?height=32&width=32" },
          dueDate: "25/04/2024",
          startDate: "15/03/2024",
          effort: "90h",
        },
        {
          id: 4,
          title: "Safety Compliance Certification",
          description:
            "Obtain AIS-052 and other required safety certifications for electric bus operation in Indian conditions.",
          status: "Planning",
          priority: "Critical",
          assignee: { name: "Neha Patel", avatar: "/placeholder.svg?height=32&width=32" },
          dueDate: "15/06/2024",
          startDate: "01/05/2024",
          effort: "60h",
        },
        {
          id: 5,
          title: "Charging Infrastructure Design",
          description:
            "Design onboard charging system compatible with CCS2 and Type-2 charging standards for depot and opportunity charging.",
          status: "Planning",
          priority: "High",
          assignee: { name: "Rajesh Kumar", avatar: "/placeholder.svg?height=32&width=32" },
          dueDate: "10/05/2024",
          startDate: "20/04/2024",
          effort: "70h",
        },
        {
          id: 6,
          title: "Field Testing & Validation",
          description:
            "Conduct extensive field testing in Mumbai traffic conditions including range testing, performance validation, and durability assessment.",
          status: "Planning",
          priority: "High",
          assignee: { name: "Amit Singh", avatar: "/placeholder.svg?height=32&width=32" },
          dueDate: "30/07/2024",
          startDate: "01/06/2024",
          effort: "100h",
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
      taskList: [
        {
          id: 7,
          title: "Side Panel Tooling Upgrade",
          description:
            "Upgrade stamping tools and dies for improved precision and reduced material waste in side panel manufacturing.",
          status: "Completed",
          priority: "High",
          assignee: { name: "Suresh Reddy", avatar: "/placeholder.svg?height=32&width=32" },
          dueDate: "01/03/2024",
          startDate: "05/02/2024",
          effort: "90h",
        },
        {
          id: 8,
          title: "Quality Control Process Review",
          description:
            "Review and optimize quality control checkpoints in the body panel manufacturing line to reduce defect rates.",
          status: "In Progress",
          priority: "Medium",
          assignee: { name: "Kavitha Nair", avatar: "/placeholder.svg?height=32&width=32" },
          dueDate: "10/04/2024",
          startDate: "15/03/2024",
          effort: "45h",
        },
        {
          id: 9,
          title: "Rear Engine Door Redesign",
          description: "Redesign rear engine door mechanism for improved accessibility and maintenance efficiency.",
          status: "In Progress",
          priority: "High",
          assignee: { name: "Ravi Gupta", avatar: "/placeholder.svg?height=32&width=32" },
          dueDate: "25/04/2024",
          startDate: "20/03/2024",
          effort: "75h",
        },
        {
          id: 10,
          title: "Production Line Efficiency Testing",
          description: "Conduct time and motion studies to optimize production line efficiency and reduce cycle time.",
          status: "Planning",
          priority: "Medium",
          assignee: { name: "Suresh Reddy", avatar: "/placeholder.svg?height=32&width=32" },
          dueDate: "01/05/2024",
          startDate: "15/04/2024",
          effort: "60h",
        },
      ],
    },
    // Add more projects as needed...
  ]

  const project = projects.find((p) => p.id === projectId) || projects[0]

  // Organize tasks by status for the card view
  const [tasks, setTasks] = useState(() => {
    const tasksByStatus = {
      planning: project.taskList.filter((task) => task.status === "Planning"),
      inProgress: project.taskList.filter((task) => task.status === "In Progress"),
      review: project.taskList.filter((task) => task.status === "Review"),
      completed: project.taskList.filter((task) => task.status === "Completed"),
    }
    return tasksByStatus
  })

  const handleCreateTask = (newTask: any) => {
    setTasks((prev) => ({
      ...prev,
      planning: [...prev.planning, { ...newTask, status: "Planning" }],
    }))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "text-red-600"
      case "High":
        return "text-red-500"
      case "Medium":
        return "text-yellow-500"
      case "Low":
        return "text-green-500"
      default:
        return "text-blue-500"
    }
  }

  const getPriorityBgColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-600"
      case "High":
        return "bg-red-500"
      case "Medium":
        return "bg-yellow-500"
      case "Low":
        return "bg-green-500"
      default:
        return "bg-blue-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-300"
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "Review":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "Planning":
        return "bg-gray-100 text-gray-800 border-gray-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  // Generate dates for the Gantt chart (6 months)
  const generateDates = () => {
    const dates = []
    const startDate = new Date(project.startDate)
    const endDate = new Date(project.endDate)
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

    for (let i = 0; i < Math.min(totalDays, 180); i += 7) {
      // Show weekly intervals
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      dates.push({
        date: date.getDate(),
        month: date.toLocaleDateString("en", { month: "short" }),
        full: date.toLocaleDateString("en-GB"),
      })
    }
    return dates
  }

  const dates = generateDates()

  // Calculate task position and width for Gantt chart
  const getTaskPosition = (startDate: string, endDate: string) => {
    const start = new Date(startDate.split("/").reverse().join("-"))
    const end = new Date(endDate.split("/").reverse().join("-"))
    const chartStart = new Date(project.startDate)
    const chartEnd = new Date(project.endDate)

    const totalDays = (chartEnd.getTime() - chartStart.getTime()) / (1000 * 60 * 60 * 24)
    const startOffset = Math.max(0, (start.getTime() - chartStart.getTime()) / (1000 * 60 * 60 * 24))
    const duration = Math.max(1, (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

    const leftPercent = (startOffset / totalDays) * 100
    const widthPercent = Math.min((duration / totalDays) * 100, 100 - leftPercent)

    return { left: `${leftPercent}%`, width: `${widthPercent}%` }
  }

  // Add this helper function to determine the next status
  const getNextStatus = (currentStatus: string) => {
    const statuses = ["Planning", "In Progress", "Review", "Completed"]
    const currentIndex = statuses.indexOf(currentStatus)
    return statuses[(currentIndex + 1) % statuses.length]
  }

  // Get the next status button text
  const getNextStatusButtonText = (currentStatus: string) => {
    const nextStatus = getNextStatus(currentStatus)
    return `Move to ${nextStatus}`
  }

  // Add the onDragEnd handler for drag and drop functionality
  const onDragEnd = (result: any) => {
    const { source, destination } = result

    // Dropped outside the list
    if (!destination) {
      return
    }

    // Dropped in the same list at the same position
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return
    }

    const sourceId = source.droppableId as keyof typeof tasks
    const destinationId = destination.droppableId as keyof typeof tasks

    // Create a copy of the current tasks state
    const newTasks = { ...tasks }

    // Get the source and destination arrays
    const sourceArray = [...newTasks[sourceId]]
    const destinationArray = sourceId === destinationId ? sourceArray : [...newTasks[destinationId]]

    // Remove the dragged item from source
    const [draggedTask] = sourceArray.splice(source.index, 1)

    // Update task status if moving between different columns
    if (sourceId !== destinationId) {
      const newStatus =
        destinationId === "planning"
          ? "Planning"
          : destinationId === "inProgress"
            ? "In Progress"
            : destinationId === "review"
              ? "Review"
              : "Completed"
      draggedTask.status = newStatus
    }

    // Insert the dragged item at the destination index
    destinationArray.splice(destination.index, 0, draggedTask)

    // Update the state
    newTasks[sourceId] = sourceArray
    if (sourceId !== destinationId) {
      newTasks[destinationId] = destinationArray
    }

    setTasks(newTasks)

    // Update selected task if it's currently being viewed
    if (selectedTask && selectedTask.id === draggedTask.id) {
      setSelectedTask({ ...draggedTask })
    }
  }

  // Update the TaskCard component to include action buttons and make it draggable
  const TaskCard = ({
    task,
    index,
    onStatusChange,
  }: {
    task: any
    index: number
    onStatusChange: (taskId: number, newStatus: string) => void
  }) => (
    <Draggable draggableId={`task-${task.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-1 ${snapshot.isDragging ? "opacity-70" : ""}`}
          style={{
            ...provided.draggableProps.style,
          }}
        >
          <Card
            className="hover:shadow-md transition-shadow cursor-pointer w-full"
            onClick={() => {
              setSelectedTask(task)
              setShowTaskDetailSidebar(true)
            }}
          >
            <CardContent className="p-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-blue-600 truncate pr-2">{task.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                    <span>Start: {task.startDate}</span>
                    <span>Due: {task.dueDate}</span>
                    <span>Effort: {task.effort}</span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-1 flex-shrink-0">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedTask(task)
                        setShowTaskDetailSidebar(true)
                      }}
                    >
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        onStatusChange(task.id, getNextStatus(task.status))
                      }}
                    >
                      {getNextStatusButtonText(task.status)}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Edit Task</DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Delete Task</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Status and Priority Row */}
              <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-100">
                <Avatar className="h-5 w-5 flex-shrink-0">
                  <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-[8px]">
                    {task.assignee.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <Badge variant="outline" className={`text-xs py-0 px-1.5 h-5 ${getStatusColor(task.status)}`}>
                    {task.status}
                  </Badge>
                  <Badge variant="outline" className="text-xs py-0 px-1.5 h-5">
                    {task.priority}
                  </Badge>
                </div>
              </div>

              {/* Full Width Action Button */}
              <div className="mt-2 pt-1 border-t border-gray-100">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-between h-7 text-xs"
                  onClick={(e) => {
                    e.stopPropagation()
                    onStatusChange(task.id, getNextStatus(task.status))
                  }}
                >
                  <span>
                    {task.status === "Planning"
                      ? "Start"
                      : task.status === "In Progress"
                        ? "Review"
                        : task.status === "Review"
                          ? "Complete"
                          : "Reopen"}
                  </span>
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  )

  // Update the ProjectDetail component to include drag and drop functionality
  // Replace the existing tasks state and add a new handleStatusChange function
  const handleStatusChange = (taskId: number, newStatus: string) => {
    // Find the task in all status columns
    let foundTask: any = null
    let foundInColumn = ""

    Object.entries(tasks).forEach(([column, columnTasks]) => {
      const task = (columnTasks as any[]).find((t) => t.id === taskId)
      if (task) {
        foundTask = { ...task }
        foundInColumn = column
      }
    })

    if (foundTask && foundInColumn) {
      // Remove from current column
      const updatedTasks = {
        ...tasks,
        [foundInColumn]: (tasks[foundInColumn as keyof typeof tasks] as any[]).filter((t) => t.id !== taskId),
      }

      // Update task status
      foundTask.status = newStatus

      // Add to new column
      const newColumn =
        newStatus === "Planning"
          ? "planning"
          : newStatus === "In Progress"
            ? "inProgress"
            : newStatus === "Review"
              ? "review"
              : "completed"

      updatedTasks[newColumn as keyof typeof updatedTasks] = [
        ...(updatedTasks[newColumn as keyof typeof updatedTasks] as any[]),
        foundTask,
      ]

      setTasks(updatedTasks)

      // Update selected task if it's currently being viewed
      if (selectedTask && selectedTask.id === taskId) {
        setSelectedTask({ ...foundTask })
      }
    }
  }

  const allTasks = [...tasks.planning, ...tasks.inProgress, ...tasks.review, ...tasks.completed]

  return (
    <div className="p-6 space-y-6 bg-gray-50/30 min-h-screen">
      <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={onBack}>
            <Home className="h-4 w-4 mr-1" />
            Home
          </Button>
          <div className="h-6 border-r border-gray-300"></div>
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <Badge variant="outline">{project.status}</Badge>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {project.startDate} - {project.endDate}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Progress value={project.progress} className="w-32 h-2" />
            <span className="text-sm font-medium">{project.progress}%</span>
          </div>
          <div className="text-sm text-muted-foreground">
            ₹{(project.spent / 100000).toFixed(1)}L / ₹{(project.budget / 100000).toFixed(1)}L
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div></div>
        <div className="flex items-center space-x-4">
          {activeTab === "list" && (
            <div className="flex items-center">
              {!isSearchExpanded ? (
                <Button variant="outline" size="icon" onClick={() => setIsSearchExpanded(true)}>
                  <Search className="h-4 w-4" />
                </Button>
              ) : (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-60"
                    onBlur={() => {
                      if (!searchTerm) {
                        setIsSearchExpanded(false)
                      }
                    }}
                    autoFocus
                  />
                </div>
              )}
            </div>
          )}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-white border shadow-sm">
              <TabsTrigger value="card" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                <LayoutGrid className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="list" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                <List className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="gantt" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                <Calendar className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                <DollarSign className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="charts" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                <BarChart3 className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={() => setShowCreateTaskSidebar(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {activeTab === "card" && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-hidden">
            {/* Planning Column */}
            <div className="flex flex-col min-w-0">
              <div className="bg-blue-50 rounded-t-lg p-3 flex items-center justify-between flex-shrink-0 shadow-sm">
                <h3 className="font-medium text-sm">Planning ({tasks.planning.length})</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => setShowCreateTaskSidebar(true)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <Droppable droppableId="planning">
                {(provided, snapshot) => (
                  <div
                    className={`flex-1 min-h-[200px] p-1 transition-colors overflow-hidden ${
                      snapshot.isDraggingOver ? "bg-blue-50 border border-blue-200 border-dashed rounded-lg" : ""
                    }`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="space-y-1 w-full">
                      {tasks.planning.map((task, index) => (
                        <TaskCard key={task.id} task={task} index={index} onStatusChange={handleStatusChange} />
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </div>

            {/* In Progress Column */}
            <div className="flex flex-col min-w-0">
              <div className="bg-yellow-50 rounded-t-lg p-3 flex items-center justify-between flex-shrink-0 shadow-sm">
                <h3 className="font-medium text-sm">In Progress ({tasks.inProgress.length})</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => setShowCreateTaskSidebar(true)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <Droppable droppableId="inProgress">
                {(provided, snapshot) => (
                  <div
                    className={`flex-1 min-h-[200px] p-1 transition-colors overflow-hidden ${
                      snapshot.isDraggingOver ? "bg-yellow-50 border border-yellow-200 border-dashed rounded-lg" : ""
                    }`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="space-y-1 w-full">
                      {tasks.inProgress.map((task, index) => (
                        <TaskCard key={task.id} task={task} index={index} onStatusChange={handleStatusChange} />
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </div>

            {/* Review Column */}
            <div className="flex flex-col min-w-0">
              <div className="bg-purple-50 rounded-t-lg p-3 flex items-center justify-between flex-shrink-0 shadow-sm">
                <h3 className="font-medium text-sm">Review ({tasks.review.length})</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => setShowCreateTaskSidebar(true)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <Droppable droppableId="review">
                {(provided, snapshot) => (
                  <div
                    className={`flex-1 min-h-[200px] p-1 transition-colors overflow-hidden ${
                      snapshot.isDraggingOver ? "bg-purple-50 border border-purple-200 border-dashed rounded-lg" : ""
                    }`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="space-y-1 w-full">
                      {tasks.review.map((task, index) => (
                        <TaskCard key={task.id} task={task} index={index} onStatusChange={handleStatusChange} />
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </div>

            {/* Completed Column */}
            <div className="flex flex-col min-w-0">
              <div className="bg-green-50 rounded-t-lg p-3 flex items-center justify-between flex-shrink-0 shadow-sm">
                <h3 className="font-medium text-sm">Completed ({tasks.completed.length})</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => setShowCreateTaskSidebar(true)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <Droppable droppableId="completed">
                {(provided, snapshot) => (
                  <div
                    className={`flex-1 min-h-[200px] p-1 transition-colors overflow-hidden ${
                      snapshot.isDraggingOver ? "bg-green-50 border border-green-200 border-dashed rounded-lg" : ""
                    }`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="space-y-1 w-full">
                      {tasks.completed.map((task, index) => (
                        <TaskCard key={task.id} task={task} index={index} onStatusChange={handleStatusChange} />
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      )}

      {activeTab === "list" && (
        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-700 w-2/5">
                      <div className="flex items-center space-x-2">
                        <span>Task</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => {
                            if (sortField === "title") {
                              setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                            } else {
                              setSortField("title")
                              setSortDirection("asc")
                            }
                          }}
                        >
                          <ArrowUpDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700">
                      <div className="flex items-center space-x-2">
                        <span>Assignee</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => {
                            if (sortField === "assignee") {
                              setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                            } else {
                              setSortField("assignee")
                              setSortDirection("asc")
                            }
                          }}
                        >
                          <ArrowUpDown className="h-3 w-3" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Filter className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuItem onClick={() => setAssigneeFilter("")}>All Assignees</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setAssigneeFilter("Rajesh Kumar")}>
                              Rajesh Kumar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setAssigneeFilter("Amit Singh")}>
                              Amit Singh
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setAssigneeFilter("Priya Sharma")}>
                              Priya Sharma
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setAssigneeFilter("Neha Patel")}>
                              Neha Patel
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700">
                      <div className="flex items-center space-x-2">
                        <span>Status</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Filter className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuItem onClick={() => setStatusFilter("")}>All Status</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setStatusFilter("Planning")}>Planning</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setStatusFilter("In Progress")}>
                              In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setStatusFilter("Review")}>Review</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setStatusFilter("Completed")}>Completed</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700">
                      <div className="flex items-center space-x-2">
                        <span>Priority</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Filter className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuItem onClick={() => setPriorityFilter("")}>All Priorities</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setPriorityFilter("Critical")}>Critical</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setPriorityFilter("High")}>High</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setPriorityFilter("Medium")}>Medium</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setPriorityFilter("Low")}>Low</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700">
                      <div className="flex items-center space-x-2">
                        <span>Due Date</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => {
                            if (sortField === "dueDate") {
                              setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                            } else {
                              setSortField("dueDate")
                              setSortDirection("asc")
                            }
                          }}
                        >
                          <ArrowUpDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700">
                      <div className="flex items-center space-x-2">
                        <span>Effort</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => {
                            if (sortField === "effort") {
                              setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                            } else {
                              setSortField("effort")
                              setSortDirection("asc")
                            }
                          }}
                        >
                          <ArrowUpDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </th>
                    <th className="text-center p-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {allTasks
                    .filter((task) => {
                      const matchesSearch =
                        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        task.description.toLowerCase().includes(searchTerm.toLowerCase())
                      const matchesAssignee = !assigneeFilter || task.assignee.name === assigneeFilter
                      const matchesStatus = !statusFilter || task.status === statusFilter
                      const matchesPriority = !priorityFilter || task.priority === priorityFilter

                      return matchesSearch && matchesAssignee && matchesStatus && matchesPriority
                    })
                    .sort((a, b) => {
                      if (sortField) {
                        let aValue, bValue

                        switch (sortField) {
                          case "title":
                            aValue = a.title
                            bValue = b.title
                            break
                          case "assignee":
                            aValue = a.assignee.name
                            bValue = b.assignee.name
                            break
                          case "dueDate":
                            aValue = new Date(a.dueDate.split("/").reverse().join("-"))
                            bValue = new Date(b.dueDate.split("/").reverse().join("-"))
                            break
                          case "effort":
                            aValue = Number.parseInt(a.effort.replace("h", ""))
                            bValue = Number.parseInt(b.effort.replace("h", ""))
                            break
                          default:
                            return 0
                        }

                        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
                        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
                        return 0
                      }
                      return 0
                    })
                    .map((task, index) => (
                      <tr key={task.id} className="border-b hover:bg-blue-50/20 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4"></div>
                            <div>
                              <div
                                className="font-medium text-blue-600 cursor-pointer hover:text-blue-800"
                                onClick={() => {
                                  setSelectedTask(task)
                                  setShowTaskDetailSidebar(true)
                                }}
                              >
                                {task.title}
                              </div>
                              <div className="text-sm text-gray-500 line-clamp-1">{task.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">
                                {task.assignee.name.split(" ").map((n: string) => n[0])}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{task.assignee.name}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className={`text-xs ${getStatusColor(task.status)}`}>
                            {task.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="text-xs">
                            {task.priority}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm text-gray-600">{task.dueDate}</td>
                        <td className="p-4 text-sm text-gray-600">{task.effort}</td>
                        <td className="p-4 text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedTask(task)
                                  setShowTaskDetailSidebar(true)
                                }}
                              >
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>Edit Task</DropdownMenuItem>
                              <DropdownMenuItem>Add Subtask</DropdownMenuItem>
                              <DropdownMenuItem>Delete Task</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "gantt" && (
        <Card>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[1000px]">
                {/* Header with dates */}
                <div className="flex border-b">
                  <div className="w-80 p-3 font-medium border-r bg-gray-50">Task Details</div>
                  <div className="flex-1 grid gap-0" style={{ gridTemplateColumns: `repeat(${dates.length}, 1fr)` }}>
                    {dates.map((date, i) => (
                      <div key={i} className="text-center text-xs p-2 border-r bg-gray-50">
                        <div className="font-medium">{date.date}</div>
                        <div className="text-gray-500">{date.month}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Task rows */}
                {allTasks.map((task) => {
                  const position = getTaskPosition(task.startDate, task.dueDate)
                  return (
                    <div
                      key={task.id}
                      className="flex border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setSelectedTask(task)
                        setShowTaskDetailSidebar(true)
                      }}
                    >
                      <div className="w-80 p-3 border-r">
                        <div className="font-medium text-sm">{task.title}</div>
                        <div className="text-xs text-gray-500 flex items-center space-x-2 mt-1">
                          <Avatar className="h-4 w-4">
                            <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-[8px]">
                              {task.assignee.name.split(" ").map((n: string) => n[0])}
                            </AvatarFallback>
                          </Avatar>
                          <span>{task.assignee.name}</span>
                          <Badge className={`text-[8px] px-1 py-0 ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {task.startDate} - {task.dueDate} ({task.effort})
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
                        {/* Task bar */}
                        <div
                          className={`absolute top-1/2 transform -translate-y-1/2 h-6 rounded ${getPriorityBgColor(task.priority)} flex items-center justify-center text-white text-xs font-medium shadow-sm`}
                          style={position}
                        >
                          <span className="truncate px-2">{task.title}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "reports" && (
        <Card>
          <CardContent>
            <div className="space-y-6">
              {/* Project Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">₹{(project.budget / 100000).toFixed(1)}L</div>
                  <div className="text-sm text-gray-600">Total Budget</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">₹{(project.spent / 100000).toFixed(1)}L</div>
                  <div className="text-sm text-gray-600">Total Spent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    ₹{((project.budget - project.spent) / 100000).toFixed(1)}L
                  </div>
                  <div className="text-sm text-gray-600">Remaining</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round((project.spent / project.budget) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Utilized</div>
                </div>
              </div>

              {/* Task Spending Table */}
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left p-3 font-medium">Task</th>
                        <th className="text-left p-3 font-medium">Assignee</th>
                        <th className="text-left p-3 font-medium">Status</th>
                        <th className="text-right p-3 font-medium">Budget</th>
                        <th className="text-right p-3 font-medium">Spent</th>
                        <th className="text-right p-3 font-medium">Remaining</th>
                        <th className="text-right p-3 font-medium">% Used</th>
                        <th className="text-center p-3 font-medium">Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allTasks.map((task, index) => {
                        // Calculate task budget and spending (mock data for demonstration)
                        const taskBudget = Math.floor((project.budget / allTasks.length) * (0.8 + Math.random() * 0.4))
                        const taskSpent = Math.floor(
                          taskBudget *
                            (task.status === "Completed"
                              ? 1
                              : task.status === "In Progress"
                                ? 0.6 + Math.random() * 0.3
                                : task.status === "Review"
                                  ? 0.8 + Math.random() * 0.15
                                  : Math.random() * 0.2),
                        )
                        const taskRemaining = taskBudget - taskSpent
                        const taskUtilization = Math.round((taskSpent / taskBudget) * 100)
                        const taskProgress =
                          task.status === "Completed"
                            ? 100
                            : task.status === "Review"
                              ? 85 + Math.random() * 10
                              : task.status === "In Progress"
                                ? 30 + Math.random() * 40
                                : Math.random() * 20

                        return (
                          <tr key={task.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">
                              <div className="font-medium text-blue-600">{task.title}</div>
                              <div className="text-sm text-gray-500">{task.effort}</div>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} />
                                  <AvatarFallback className="text-xs">
                                    {task.assignee.name.split(" ").map((n: string) => n[0])}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{task.assignee.name}</span>
                              </div>
                            </td>
                            <td className="p-3">
                              <Badge variant="outline" className={`text-xs ${getStatusColor(task.status)}`}>
                                {task.status}
                              </Badge>
                            </td>
                            <td className="p-3 text-right font-medium">₹{(taskBudget / 100000).toFixed(2)}L</td>
                            <td className="p-3 text-right">
                              <span
                                className={`font-medium ${taskUtilization > 90 ? "text-red-600" : taskUtilization > 75 ? "text-orange-600" : "text-green-600"}`}
                              >
                                ₹{(taskSpent / 100000).toFixed(2)}L
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <span className={`${taskRemaining < 0 ? "text-red-600" : "text-gray-700"}`}>
                                ₹{(taskRemaining / 100000).toFixed(2)}L
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <span
                                className={`font-medium ${taskUtilization > 90 ? "text-red-600" : taskUtilization > 75 ? "text-orange-600" : "text-green-600"}`}
                              >
                                {taskUtilization}%
                              </span>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center space-x-2">
                                <Progress value={taskProgress} className="w-16 h-2" />
                                <span className="text-xs text-gray-500 w-8">{Math.round(taskProgress)}%</span>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Cost Categories Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Cost Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Labor Costs</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "65%" }} />
                          </div>
                          <span className="text-sm font-medium">65%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Materials</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: "25%" }} />
                          </div>
                          <span className="text-sm font-medium">25%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Equipment</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "8%" }} />
                          </div>
                          <span className="text-sm font-medium">8%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Other</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: "2%" }} />
                          </div>
                          <span className="text-sm font-medium">2%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Budget Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                        <div className="h-2 w-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-red-800">Over Budget</div>
                          <div className="text-xs text-red-600">2 tasks are exceeding their allocated budget</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                        <div className="h-2 w-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-yellow-800">High Utilization</div>
                          <div className="text-xs text-yellow-600">3 tasks have used over 75% of their budget</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                        <div className="h-2 w-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-green-800">On Track</div>
                          <div className="text-xs text-green-600">4 tasks are within budget and on schedule</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "charts" && (
        <Card>
          <CardContent>
            <div className="space-y-8">
              {/* First Row - Tasks by Category and Team Member Workload */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Tasks by Category</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-80">
                      <div className="flex flex-col h-full justify-center">
                        <div className="flex items-end justify-center space-x-8 mb-4">
                          <div className="flex flex-col items-center">
                            <div className="bg-blue-500 w-16 rounded-t-lg mb-2" style={{ height: "120px" }}>
                              <div className="text-center text-xs font-medium text-white pt-2">60%</div>
                            </div>
                            <div className="text-center text-xs">Electrical</div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="bg-green-500 w-16 rounded-t-lg mb-2" style={{ height: "50px" }}>
                              <div className="text-center text-xs font-medium text-white pt-2">25%</div>
                            </div>
                            <div className="text-center text-xs">Mechanical</div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="bg-yellow-500 w-16 rounded-t-lg mb-2" style={{ height: "20px" }}>
                              <div className="text-center text-xs font-medium text-white pt-1">10%</div>
                            </div>
                            <div className="text-center text-xs">Software</div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="bg-purple-500 w-16 rounded-t-lg mb-2" style={{ height: "10px" }}>
                              <div className="text-center text-xs font-medium text-white pt-1">5%</div>
                            </div>
                            <div className="text-center text-xs">Testing</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Team Member Workload */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Team Member Workload (by effort)</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>RK</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Rajesh Kumar</span>
                            <span className="text-sm text-muted-foreground">190h</span>
                          </div>
                          <Progress value={38} className="h-2" />
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>AS</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Amit Singh</span>
                            <span className="text-sm text-muted-foreground">180h</span>
                          </div>
                          <Progress value={36} className="h-2" />
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>PS</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Priya Sharma</span>
                            <span className="text-sm text-muted-foreground">90h</span>
                          </div>
                          <Progress value={18} className="h-2" />
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>NP</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Neha Patel</span>
                            <span className="text-sm text-muted-foreground">60h</span>
                          </div>
                          <Progress value={12} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Second Row - Task Status Distribution and Project Timeline */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Task Status Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-80 flex flex-col items-center justify-center">
                      <div className="relative mb-6">
                        {/* Larger Donut Chart */}
                        <div className="w-64 h-64 rounded-full border-[32px] border-gray-200 relative">
                          <div
                            className="absolute inset-0 rounded-full border-[32px] border-transparent border-t-green-500"
                            style={{ transform: "rotate(0deg)" }}
                          ></div>
                          <div
                            className="absolute inset-0 rounded-full border-[32px] border-transparent border-t-blue-500"
                            style={{ transform: "rotate(90deg)" }}
                          ></div>
                          <div
                            className="absolute inset-0 rounded-full border-[32px] border-transparent border-t-yellow-500"
                            style={{ transform: "rotate(180deg)" }}
                          ></div>
                          <div
                            className="absolute inset-0 rounded-full border-[32px] border-transparent border-t-gray-400"
                            style={{ transform: "rotate(270deg)" }}
                          ></div>
                          <div className="absolute inset-8 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-3xl font-bold">{allTasks.length}</div>
                              <div className="text-sm text-gray-500">Total Tasks</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Horizontal Legend */}
                      <div className="flex flex-wrap justify-center gap-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded"></div>
                          <span className="text-sm">Completed ({tasks.completed.length})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-blue-500 rounded"></div>
                          <span className="text-sm">In Progress ({tasks.inProgress.length})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                          <span className="text-sm">Review ({tasks.review.length})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-gray-400 rounded"></div>
                          <span className="text-sm">Planning ({tasks.planning.length})</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Project Timeline Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-80">
                      <div className="space-y-6">
                        {/* Overall Progress */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-900">Overall Project Progress</span>
                            <span className="text-sm font-semibold text-blue-600">{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-3" />
                        </div>

                        {/* Milestone Progress */}
                        <div className="space-y-4">
                          <h4 className="text-sm font-semibold text-gray-900">Key Milestones</h4>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Design Phase</span>
                                <span className="text-sm font-semibold text-green-600">100%</span>
                              </div>
                              <Progress value={100} className="h-2" />
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Development Phase</span>
                                <span className="text-sm font-semibold text-blue-600">75%</span>
                              </div>
                              <Progress value={75} className="h-2" />
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Testing Phase</span>
                                <span className="text-sm font-semibold text-yellow-600">45%</span>
                              </div>
                              <Progress value={45} className="h-2" />
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Deployment Phase</span>
                                <span className="text-sm font-semibold text-gray-500">0%</span>
                              </div>
                              <Progress value={0} className="h-2" />
                            </div>
                          </div>
                        </div>

                        {/* Timeline Summary */}
                        <div className="pt-4 border-t">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <div className="text-xs text-muted-foreground font-medium">Start Date</div>
                              <div className="text-sm font-semibold">{project.startDate}</div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-xs text-muted-foreground font-medium">End Date</div>
                              <div className="text-sm font-semibold">{project.endDate}</div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-xs text-muted-foreground font-medium">Days Elapsed</div>
                              <div className="text-sm font-semibold">
                                {Math.max(
                                  0,
                                  Math.floor(
                                    (new Date().getTime() - new Date(project.startDate).getTime()) /
                                      (1000 * 60 * 60 * 24),
                                  ),
                                )}
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-xs text-muted-foreground font-medium">Days Remaining</div>
                              <div className="text-sm font-semibold">
                                {Math.max(
                                  0,
                                  Math.floor(
                                    (new Date(project.endDate).getTime() - new Date().getTime()) /
                                      (1000 * 60 * 60 * 24),
                                  ),
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Task Sidebar */}
      <CreateTaskSidebar
        open={showCreateTaskSidebar}
        onOpenChange={setShowCreateTaskSidebar}
        onCreateTask={handleCreateTask}
      />

      {/* Task Detail Sidebar */}
      <TaskDetailSidebar
        open={showTaskDetailSidebar}
        onOpenChange={setShowTaskDetailSidebar}
        task={selectedTask}
        onStatusChange={handleStatusChange}
      />
    </div>
  )
}
