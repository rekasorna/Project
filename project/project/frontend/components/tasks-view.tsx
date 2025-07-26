"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Search, MoreHorizontal, Calendar, Clock, User, CheckCircle2, Circle, AlertCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function TasksView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")

  const tasks = [
    {
      id: 1,
      title: "Design homepage mockup",
      description: "Create wireframes and high-fidelity mockups for the new homepage",
      project: "Website Redesign",
      assignee: { name: "Sarah Chen", avatar: "/placeholder.svg?height=32&width=32" },
      status: "In Progress",
      priority: "High",
      dueDate: "2024-01-25",
      estimatedHours: 8,
      loggedHours: 5,
      tags: ["Design", "UI/UX"],
      subtasks: [
        { id: 11, title: "Create wireframes", completed: true },
        { id: 12, title: "Design mockups", completed: false },
        { id: 13, title: "Review with stakeholders", completed: false },
      ],
    },
    {
      id: 2,
      title: "API endpoint testing",
      description: "Test all API endpoints for the mobile application",
      project: "Mobile App",
      assignee: { name: "Mike Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      status: "Review",
      priority: "Medium",
      dueDate: "2024-01-28",
      estimatedHours: 12,
      loggedHours: 10,
      tags: ["Testing", "API"],
      subtasks: [
        { id: 21, title: "Test authentication endpoints", completed: true },
        { id: 22, title: "Test data endpoints", completed: true },
        { id: 23, title: "Performance testing", completed: false },
      ],
    },
    {
      id: 3,
      title: "Database optimization",
      description: "Optimize database queries for better performance",
      project: "Backend Upgrade",
      assignee: { name: "Alex Rodriguez", avatar: "/placeholder.svg?height=32&width=32" },
      status: "Done",
      priority: "High",
      dueDate: "2024-01-20",
      estimatedHours: 16,
      loggedHours: 14,
      tags: ["Database", "Performance"],
      subtasks: [
        { id: 31, title: "Analyze slow queries", completed: true },
        { id: 32, title: "Optimize indexes", completed: true },
        { id: 33, title: "Test performance improvements", completed: true },
      ],
    },
    {
      id: 4,
      title: "User authentication flow",
      description: "Implement secure user authentication and authorization",
      project: "Security Update",
      assignee: { name: "Emily Davis", avatar: "/placeholder.svg?height=32&width=32" },
      status: "To Do",
      priority: "Critical",
      dueDate: "2024-02-01",
      estimatedHours: 20,
      loggedHours: 0,
      tags: ["Security", "Authentication"],
      subtasks: [
        { id: 41, title: "Design authentication flow", completed: false },
        { id: 42, title: "Implement JWT tokens", completed: false },
        { id: 43, title: "Add password encryption", completed: false },
      ],
    },
  ]

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || task.status === filterStatus
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Done":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "In Progress":
        return <Circle className="h-4 w-4 text-blue-600" />
      case "Review":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "To Do":
        return <Circle className="h-4 w-4 text-gray-400" />
      default:
        return <Circle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done":
        return "secondary"
      case "In Progress":
        return "default"
      case "Review":
        return "outline"
      case "To Do":
        return "destructive"
      default:
        return "default"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "destructive"
      case "High":
        return "default"
      case "Medium":
        return "secondary"
      case "Low":
        return "outline"
      default:
        return "default"
    }
  }

  const kanbanColumns = [
    { title: "To Do", status: "To Do", color: "bg-gray-100" },
    { title: "In Progress", status: "In Progress", color: "bg-blue-100" },
    { title: "Review", status: "Review", color: "bg-yellow-100" },
    { title: "Done", status: "Done", color: "bg-green-100" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">Manage and track all your tasks across projects</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="To Do">To Do</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Review">Review</SelectItem>
            <SelectItem value="Done">Done</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="Critical">Critical</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
          <TabsTrigger value="gantt">Gantt Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Tasks</CardTitle>
              <CardDescription>Complete list of tasks across all projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <div key={task.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Checkbox className="mt-1" />
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(task.status)}
                            <h3 className="font-medium">{task.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center space-x-1">
                              <User className="h-3 w-3" />
                              <span>{task.project}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{task.dueDate}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>
                                {task.loggedHours}h / {task.estimatedHours}h
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getStatusColor(task.status)}>{task.status}</Badge>
                        <Badge variant={getPriorityColor(task.priority)}>{task.priority}</Badge>
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {task.assignee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Edit Task</DropdownMenuItem>
                            <DropdownMenuItem>Add Subtask</DropdownMenuItem>
                            <DropdownMenuItem>Log Time</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Subtasks */}
                    {task.subtasks.length > 0 && (
                      <div className="ml-6 space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">Subtasks</h4>
                        {task.subtasks.map((subtask) => (
                          <div key={subtask.id} className="flex items-center space-x-2">
                            <Checkbox checked={subtask.completed} />
                            <span
                              className={`text-sm ${subtask.completed ? "line-through text-muted-foreground" : ""}`}
                            >
                              {subtask.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex items-center space-x-2">
                      {task.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kanban" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {kanbanColumns.map((column) => (
              <Card key={column.status}>
                <CardHeader className={`${column.color} rounded-t-lg`}>
                  <CardTitle className="text-sm font-medium flex items-center justify-between">
                    {column.title}
                    <Badge variant="secondary">
                      {filteredTasks.filter((task) => task.status === column.status).length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 p-3">
                  {filteredTasks
                    .filter((task) => task.status === column.status)
                    .map((task) => (
                      <Card key={task.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-sm">{task.title}</h4>
                            <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                              {task.priority}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{task.dueDate}</span>
                            </div>
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">
                                {task.assignee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>
                              {task.loggedHours}h / {task.estimatedHours}h
                            </span>
                          </div>
                        </div>
                      </Card>
                    ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gantt" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gantt Chart</CardTitle>
              <CardDescription>Timeline view of all tasks and dependencies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground border-b pb-2">
                  <div className="col-span-4">Task</div>
                  <div className="col-span-2">Assignee</div>
                  <div className="col-span-6">Timeline</div>
                </div>
                {filteredTasks.map((task) => (
                  <div key={task.id} className="grid grid-cols-12 gap-2 items-center py-2 border-b">
                    <div className="col-span-4">
                      <div className="space-y-1">
                        <h4 className="font-medium text-sm">{task.title}</h4>
                        <Badge variant={getStatusColor(task.status)} className="text-xs">
                          {task.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {task.assignee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{task.assignee.name}</span>
                      </div>
                    </div>
                    <div className="col-span-6">
                      <div className="relative h-6 bg-muted rounded">
                        <div
                          className={`absolute left-0 top-0 h-full rounded ${
                            task.status === "Done"
                              ? "bg-green-500"
                              : task.status === "In Progress"
                                ? "bg-blue-500"
                                : task.status === "Review"
                                  ? "bg-yellow-500"
                                  : "bg-gray-300"
                          }`}
                          style={{ width: `${(task.loggedHours / task.estimatedHours) * 100}%` }}
                        />
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                          {task.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
