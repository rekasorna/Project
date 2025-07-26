"use client"

import { useState, useRef, useEffect } from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  ChevronRight,
  Paperclip,
  X,
  Link,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  DollarSign,
  UserCheck,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface CreateTaskSidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateTask: (task: any) => void
}

interface User {
  id: string
  name: string
  email: string
  avatar: string
  availableHours: number
  totalCapacity: number
  department: string
}

interface Task {
  id: string
  title: string
  status: string
  project: string
}

export function CreateTaskSidebar({ open, onOpenChange, onCreateTask }: CreateTaskSidebarProps) {
  const [taskTitle, setTaskTitle] = useState("")
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [startTime, setStartTime] = useState("12:00")
  const [endTime, setEndTime] = useState("13:00")
  const [description, setDescription] = useState("")
  const [budget, setBudget] = useState("")
  const [fontSize, setFontSize] = useState("14")
  const [fontFamily, setFontFamily] = useState("Montserrat")
  const [assignedPeopleInput, setAssignedPeopleInput] = useState("")
  const [selectedPeople, setSelectedPeople] = useState<User[]>([])
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [dependencyInput, setDependencyInput] = useState("")
  const [selectedDependencies, setSelectedDependencies] = useState<Task[]>([])
  const [showDependencyDropdown, setShowDependencyDropdown] = useState(false)
  const [selectedReviewer, setSelectedReviewer] = useState<User | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dependencyRef = useRef<HTMLInputElement>(null)

  // Sample users data
  const users: User[] = [
    {
      id: "1",
      name: "Sarah Chen",
      email: "sarah.chen@company.com",
      avatar: "/placeholder.svg?height=32&width=32",
      availableHours: 25,
      totalCapacity: 40,
      department: "Design",
    },
    {
      id: "2",
      name: "Mike Johnson",
      email: "mike.johnson@company.com",
      avatar: "/placeholder.svg?height=32&width=32",
      availableHours: 15,
      totalCapacity: 40,
      department: "Engineering",
    },
    {
      id: "3",
      name: "Emily Davis",
      email: "emily.davis@company.com",
      avatar: "/placeholder.svg?height=32&width=32",
      availableHours: 30,
      totalCapacity: 40,
      department: "Engineering",
    },
    {
      id: "4",
      name: "Alex Rodriguez",
      email: "alex.rodriguez@company.com",
      avatar: "/placeholder.svg?height=32&width=32",
      availableHours: 8,
      totalCapacity: 40,
      department: "Engineering",
    },
    {
      id: "5",
      name: "Lisa Wang",
      email: "lisa.wang@company.com",
      avatar: "/placeholder.svg?height=32&width=32",
      availableHours: 22,
      totalCapacity: 40,
      department: "Product",
    },
    {
      id: "6",
      name: "David Kim",
      email: "david.kim@company.com",
      avatar: "/placeholder.svg?height=32&width=32",
      availableHours: 35,
      totalCapacity: 40,
      department: "Engineering",
    },
  ]

  // Sample existing tasks for dependencies
  const existingTasks: Task[] = [
    { id: "t1", title: "Design homepage mockup", status: "In Progress", project: "Website Redesign" },
    { id: "t2", title: "API endpoint testing", status: "To Do", project: "Mobile App" },
    { id: "t3", title: "Database optimization", status: "Done", project: "Backend Upgrade" },
    { id: "t4", title: "User authentication flow", status: "To Do", project: "Security Update" },
    { id: "t5", title: "Create wireframes", status: "Done", project: "Website Redesign" },
    { id: "t6", title: "Setup CI/CD pipeline", status: "In Progress", project: "DevOps" },
    { id: "t7", title: "Write unit tests", status: "To Do", project: "Mobile App" },
    { id: "t8", title: "Performance testing", status: "Pending", project: "Backend Upgrade" },
  ]

  // Filter users based on input and exclude already selected ones
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(assignedPeopleInput.toLowerCase()) &&
      !selectedPeople.some((selected) => selected.id === user.id),
  )

  // Filter tasks based on input and exclude already selected ones
  const filteredTasks = existingTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(dependencyInput.toLowerCase()) &&
      !selectedDependencies.some((selected) => selected.id === task.id),
  )

  const handleUserSelect = (user: User) => {
    setSelectedPeople([...selectedPeople, user])
    setAssignedPeopleInput("")
    setShowUserDropdown(false)
  }

  const handleRemoveUser = (userId: string) => {
    setSelectedPeople(selectedPeople.filter((user) => user.id !== userId))
  }

  const handleDependencySelect = (task: Task) => {
    setSelectedDependencies([...selectedDependencies, task])
    setDependencyInput("")
    setShowDependencyDropdown(false)
  }

  const handleRemoveDependency = (taskId: string) => {
    setSelectedDependencies(selectedDependencies.filter((task) => task.id !== taskId))
  }

  const handleReviewerSelect = (reviewerId: string) => {
    const reviewer = users.find((user) => user.id === reviewerId)
    setSelectedReviewer(reviewer || null)
  }

  const getCapacityColor = (availableHours: number, totalCapacity: number) => {
    const percentage = (availableHours / totalCapacity) * 100
    if (percentage >= 70) return "text-green-600"
    if (percentage >= 40) return "text-yellow-600"
    return "text-red-600"
  }

  const getCapacityBadgeColor = (availableHours: number, totalCapacity: number) => {
    const percentage = (availableHours / totalCapacity) * 100
    if (percentage >= 70) return "bg-green-100 text-green-800"
    if (percentage >= 40) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "To Do":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false)
      }
      if (dependencyRef.current && !dependencyRef.current.contains(event.target as Node)) {
        setShowDependencyDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSave = () => {
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      startDate: format(startDate, "dd/MM/yyyy"),
      endDate: format(endDate, "dd/MM/yyyy"),
      startTime,
      endTime,
      description,
      budget,
      assignedPeople: selectedPeople,
      dependencies: selectedDependencies,
      reviewer: selectedReviewer,
      priority: "Medium",
      status: "To Do",
    }
    onCreateTask(newTask)
    onOpenChange(false)
    // Reset form
    setTaskTitle("")
    setDescription("")
    setBudget("")
    setAssignedPeopleInput("")
    setSelectedPeople([])
    setDependencyInput("")
    setSelectedDependencies([])
    setSelectedReviewer(null)
  }

  const handleCancel = () => {
    onOpenChange(false)
    // Reset form
    setTaskTitle("")
    setDescription("")
    setBudget("")
    setAssignedPeopleInput("")
    setSelectedPeople([])
    setDependencyInput("")
    setSelectedDependencies([])
    setSelectedReviewer(null)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md md:max-w-lg p-0 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Title */}
            <div className="relative">
              <Input
                placeholder="Title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="text-lg border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-500 placeholder:text-gray-400"
              />
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
            </div>

            {/* Date Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" className="p-0 h-auto font-normal justify-start text-left">
                        <div>
                          <div className="text-base font-medium">{format(startDate, "EEE, dd MMM")}</div>
                          <div className="text-2xl font-light mt-1">{startTime}</div>
                        </div>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={startDate} onSelect={(date) => date && setStartDate(date)} />
                    </PopoverContent>
                  </Popover>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 mx-4" />
                <div className="flex-1 text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" className="p-0 h-auto font-normal justify-end text-right">
                        <div>
                          <div className="text-base font-medium">{format(endDate, "EEE, dd MMM")}</div>
                          <div className="text-2xl font-light mt-1">{endTime}</div>
                        </div>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar mode="single" selected={endDate} onSelect={(date) => date && setEndDate(date)} />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Select value={startTime} onValueChange={setStartTime}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = i.toString().padStart(2, "0")
                      return (
                        <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                          {hour}:00
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
                <Select value={endTime} onValueChange={setEndTime}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = i.toString().padStart(2, "0")
                      return (
                        <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                          {hour}:00
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Assigned People */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 py-2">
                <Users className="h-5 w-5 text-gray-600" />
                <div className="flex-1 relative" ref={inputRef}>
                  <Input
                    placeholder="Assign people"
                    value={assignedPeopleInput}
                    onChange={(e) => {
                      setAssignedPeopleInput(e.target.value)
                      setShowUserDropdown(e.target.value.length > 0)
                    }}
                    onFocus={() => setShowUserDropdown(assignedPeopleInput.length > 0)}
                    className="border-0 px-0 focus-visible:ring-0 placeholder:text-gray-400"
                  />

                  {/* User Dropdown */}
                  {showUserDropdown && filteredUsers.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                      {filteredUsers.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                          onClick={() => handleUserSelect(user)}
                        >
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">{user.name}</div>
                              <div className="text-xs text-gray-500">{user.department}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div
                              className={`text-sm font-medium ${getCapacityColor(user.availableHours, user.totalCapacity)}`}
                            >
                              {user.availableHours}h available
                            </div>
                            <div className="text-xs text-gray-500">of {user.totalCapacity}h</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Selected People */}
              {selectedPeople.length > 0 && (
                <div className="flex flex-wrap gap-2 ml-8">
                  {selectedPeople.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-3 py-1"
                    >
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{user.name}</span>
                      <Badge
                        className={`text-xs px-1 py-0 ${getCapacityBadgeColor(user.availableHours, user.totalCapacity)}`}
                      >
                        {user.availableHours}h
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-red-100"
                        onClick={() => handleRemoveUser(user.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reviewer */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 py-2">
                <UserCheck className="h-5 w-5 text-gray-600" />
                <div className="flex-1">
                  <Select value={selectedReviewer?.id || ""} onValueChange={handleReviewerSelect}>
                    <SelectTrigger className="border-0 px-0 focus:ring-0 shadow-none">
                      <SelectValue placeholder="Assign reviewer" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">{user.name}</div>
                              <div className="text-xs text-gray-500">{user.department}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Selected Reviewer */}
              {selectedReviewer && (
                <div className="flex items-center space-x-2 bg-purple-50 border border-purple-200 rounded-full px-3 py-1 ml-8 w-fit">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={selectedReviewer.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">
                      {selectedReviewer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{selectedReviewer.name}</span>
                  <Badge className="text-xs bg-purple-100 text-purple-800">Reviewer</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-red-100"
                    onClick={() => setSelectedReviewer(null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>

            {/* File Attachment */}
            <div className="flex items-center space-x-3 py-2">
              <Paperclip className="h-5 w-5 text-gray-600" />
              <Button variant="ghost" className="p-0 h-auto font-normal justify-start text-gray-400">
                Attach file
              </Button>
            </div>

            {/* Dependencies */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 py-2">
                <Link className="h-5 w-5 text-gray-600" />
                <div className="flex-1 relative" ref={dependencyRef}>
                  <Input
                    placeholder="Add dependency"
                    value={dependencyInput}
                    onChange={(e) => {
                      setDependencyInput(e.target.value)
                      setShowDependencyDropdown(e.target.value.length > 0)
                    }}
                    onFocus={() => setShowDependencyDropdown(dependencyInput.length > 0)}
                    className="border-0 px-0 focus-visible:ring-0 placeholder:text-gray-400"
                  />

                  {/* Dependency Dropdown */}
                  {showDependencyDropdown && filteredTasks.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                      {filteredTasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                          onClick={() => handleDependencySelect(task)}
                        >
                          <div className="flex-1">
                            <div className="font-medium text-sm">{task.title}</div>
                            <div className="text-xs text-gray-500">{task.project}</div>
                          </div>
                          <Badge className={`text-xs ${getStatusColor(task.status)}`}>{task.status}</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Selected Dependencies */}
              {selectedDependencies.length > 0 && (
                <div className="flex flex-wrap gap-2 ml-8">
                  {selectedDependencies.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center space-x-2 bg-purple-50 border border-purple-200 rounded-full px-3 py-1"
                    >
                      <span className="text-sm font-medium">{task.title}</span>
                      <Badge className={`text-xs ${getStatusColor(task.status)}`}>{task.status}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-red-100"
                        onClick={() => handleRemoveDependency(task.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Budget */}
            <div className="flex items-center space-x-3 py-2">
              <DollarSign className="h-5 w-5 text-gray-600" />
              <Input
                placeholder="Budget amount"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="border-0 px-0 focus-visible:ring-0 placeholder:text-gray-400"
                type="number"
              />
            </div>

            {/* Description with Rich Text Editor */}
            <div className="space-y-2">
              <div className="border rounded-lg overflow-hidden">
                {/* Rich Text Toolbar */}
                <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-gray-50">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Strikethrough className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="h-6 w-px bg-gray-300 mx-2" />

                  <div className="flex items-center gap-2">
                    <Select value={fontFamily} onValueChange={setFontFamily}>
                      <SelectTrigger className="w-32 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Montserrat">Montserrat</SelectItem>
                        <SelectItem value="Arial">Arial</SelectItem>
                        <SelectItem value="Helvetica">Helvetica</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={fontSize} onValueChange={setFontSize}>
                      <SelectTrigger className="w-16 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12</SelectItem>
                        <SelectItem value="14">14</SelectItem>
                        <SelectItem value="16">16</SelectItem>
                        <SelectItem value="18">18</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="h-6 w-px bg-gray-300 mx-2 hidden sm:block" />

                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-gray-600 text-white">
                      A
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-blue-600 text-white">
                      A
                    </Button>
                  </div>

                  <div className="h-6 w-px bg-gray-300 mx-2 hidden sm:block" />

                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <AlignRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="h-6 w-px bg-gray-300 mx-2 hidden sm:block" />

                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Description Textarea */}
                <Textarea
                  placeholder="Add description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-32 border-0 resize-none focus-visible:ring-0 placeholder:text-gray-400 w-full"
                  style={{ fontFamily, fontSize: `${fontSize}px` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom buttons */}
        <div className="border-t bg-white p-4">
          <div className="flex space-x-4">
            <Button variant="outline" onClick={handleCancel} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!taskTitle.trim()} className="flex-1">
              Save
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
