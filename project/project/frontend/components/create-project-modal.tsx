"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Clock,
  DollarSign,
  FileText,
  Plus,
  Trash2,
  Users,
  Upload,
  Camera,
  AlertTriangle,
  CalendarIcon,
  X,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

interface CreateProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateProject: (project: any) => void
}

interface TeamMember {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  department: string
}

interface Task {
  id: string
  name: string
  description: string
  effortHours: number
  effortMinutes: number
  materialCost: number
}

export function CreateProjectModal({ open, onOpenChange, onCreateProject }: CreateProjectModalProps) {
  const [projectTitle, setProjectTitle] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [budget, setBudget] = useState("")
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<TeamMember[]>([])
  const [attachments, setAttachments] = useState<File[]>([])
  const [photos, setPhotos] = useState<File[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskName, setTaskName] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [taskEffortHours, setTaskEffortHours] = useState(0)
  const [taskEffortMinutes, setTaskEffortMinutes] = useState(0)
  const [taskMaterialCost, setTaskMaterialCost] = useState(0)
  const [hourlyRate, setHourlyRate] = useState(500) // Default hourly rate in ₹

  // Sample team members data
  const availableTeamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@gets.co.in",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Senior Engineer",
      department: "R&D",
    },
    {
      id: "2",
      name: "Priya Sharma",
      email: "priya.sharma@gets.co.in",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Design Lead",
      department: "Design",
    },
    {
      id: "3",
      name: "Amit Singh",
      email: "amit.singh@gets.co.in",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Manufacturing Engineer",
      department: "Production",
    },
    {
      id: "4",
      name: "Neha Patel",
      email: "neha.patel@gets.co.in",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Quality Manager",
      department: "Quality",
    },
    {
      id: "5",
      name: "Suresh Reddy",
      email: "suresh.reddy@gets.co.in",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Production Manager",
      department: "Production",
    },
    {
      id: "6",
      name: "Kavitha Nair",
      email: "kavitha.nair@gets.co.in",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Process Engineer",
      department: "Production",
    },
    {
      id: "7",
      name: "Dr. Arjun Mehta",
      email: "arjun.mehta@gets.co.in",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Research Director",
      department: "R&D",
    },
    {
      id: "8",
      name: "Deepak Joshi",
      email: "deepak.joshi@gets.co.in",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Design Engineer",
      department: "Design",
    },
  ]

  const totalEffortHours = tasks.reduce((total, task) => total + task.effortHours, 0)
  const totalEffortMinutes = tasks.reduce((total, task) => total + task.effortMinutes, 0)
  const adjustedHours = totalEffortHours + Math.floor(totalEffortMinutes / 60)
  const adjustedMinutes = totalEffortMinutes % 60
  const totalEffortInHours = totalEffortHours + totalEffortMinutes / 60
  const totalManpowerCost = totalEffortInHours * hourlyRate
  const totalMaterialCost = tasks.reduce((total, task) => total + task.materialCost, 0)
  const totalProjectCost = totalManpowerCost + totalMaterialCost
  const budgetExceeded = Number.parseInt(budget) > 0 && totalProjectCost > Number.parseInt(budget)

  const addTeamMember = (memberId: string) => {
    const member = availableTeamMembers.find((m) => m.id === memberId)
    if (member && !selectedTeamMembers.find((m) => m.id === memberId)) {
      setSelectedTeamMembers([...selectedTeamMembers, member])
    }
  }

  const removeTeamMember = (memberId: string) => {
    setSelectedTeamMembers(selectedTeamMembers.filter((m) => m.id !== memberId))
  }

  const handleFileUpload = (files: FileList | null, type: "attachments" | "photos") => {
    if (files) {
      const fileArray = Array.from(files)
      if (type === "attachments") {
        setAttachments([...attachments, ...fileArray])
      } else {
        setPhotos([...photos, ...fileArray])
      }
    }
  }

  const removeFile = (index: number, type: "attachments" | "photos") => {
    if (type === "attachments") {
      setAttachments(attachments.filter((_, i) => i !== index))
    } else {
      setPhotos(photos.filter((_, i) => i !== index))
    }
  }

  const addTask = () => {
    if (taskName.trim() === "") return

    const newTask: Task = {
      id: Date.now().toString(),
      name: taskName,
      description: taskDescription,
      effortHours: taskEffortHours,
      effortMinutes: taskEffortMinutes,
      materialCost: taskMaterialCost,
    }

    setTasks([...tasks, newTask])

    // Reset form
    setTaskName("")
    setTaskDescription("")
    setTaskEffortHours(0)
    setTaskEffortMinutes(0)
    setTaskMaterialCost(0)
  }

  const removeTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const handleCreateProject = () => {
    const newProject = {
      id: Date.now(),
      name: projectTitle,
      description,
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
      budget: Number.parseInt(budget) || 0,
      team: selectedTeamMembers,
      attachments,
      photos,
      status: "Planning",
      progress: 0,
      priority: "Medium",
      tasks: { total: tasks.length, completed: 0 },
      taskDetails: tasks,
      totalEffort: { hours: adjustedHours, minutes: adjustedMinutes },
      totalManpowerCost,
      totalMaterialCost,
      totalProjectCost,
    }

    onCreateProject(newProject)
    onOpenChange(false)
    resetForm()
  }

  const resetForm = () => {
    setProjectTitle("")
    setDescription("")
    setStartDate(new Date())
    setEndDate(new Date())
    setBudget("")
    setSelectedTeamMembers([])
    setAttachments([])
    setPhotos([])
    setTasks([])
    setTaskName("")
    setTaskDescription("")
    setTaskEffortHours(0)
    setTaskEffortMinutes(0)
    setTaskMaterialCost(0)
  }

  const handleCancel = () => {
    onOpenChange(false)
    resetForm()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Project</DialogTitle>
        </DialogHeader>

        <div className="space-y-8 py-4">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Project Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter project title"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (₹) *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="budget"
                      type="number"
                      placeholder="Enter budget amount"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Enter project description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "dd/MM/yyyy") : "Pick start date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={startDate} onSelect={(date) => date && setStartDate(date)} />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>End Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "dd/MM/yyyy") : "Pick end date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={endDate} onSelect={(date) => date && setEndDate(date)} />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Team Members</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Add Team Members</Label>
                <Select onValueChange={addTeamMember}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team members" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTeamMembers
                      .filter((member) => !selectedTeamMembers.find((m) => m.id === member.id))
                      .map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {member.role} - {member.department}
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedTeamMembers.length > 0 && (
                <div className="space-y-2">
                  <Label>Selected Team Members ({selectedTeamMembers.length})</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedTeamMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-3 border rounded-lg bg-muted/30"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{member.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {member.role} - {member.department}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTeamMember(member.id)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Attachments and Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attachments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Attachments</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Drag and drop files here, or click to browse</p>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleFileUpload(e.target.files, "attachments")}
                    className="hidden"
                    id="attachments-upload"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                  />
                  <Button variant="outline" size="sm" asChild>
                    <label htmlFor="attachments-upload" className="cursor-pointer">
                      Browse Files
                    </label>
                  </Button>
                </div>

                {attachments.length > 0 && (
                  <div className="space-y-2">
                    <Label>Uploaded Files ({attachments.length})</Label>
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm truncate">{file.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index, "attachments")}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Photos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="h-5 w-5" />
                  <span>Photos</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Upload project photos</p>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleFileUpload(e.target.files, "photos")}
                    className="hidden"
                    id="photos-upload"
                    accept="image/*"
                  />
                  <Button variant="outline" size="sm" asChild>
                    <label htmlFor="photos-upload" className="cursor-pointer">
                      Browse Photos
                    </label>
                  </Button>
                </div>

                {photos.length > 0 && (
                  <div className="space-y-2">
                    <Label>Uploaded Photos ({photos.length})</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {photos.map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(file) || "/placeholder.svg"}
                            alt={file.name}
                            className="w-full h-20 object-cover rounded border"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeFile(index, "photos")}
                            className="absolute top-1 right-1 h-6 w-6 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Tasks Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Tasks</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Task Form */}
              <div className="space-y-4 border rounded-lg p-4 bg-muted/30">
                <h4 className="font-medium">Add New Task</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="taskName">Task Name *</Label>
                    <Input
                      id="taskName"
                      placeholder="Enter task name"
                      value={taskName}
                      onChange={(e) => setTaskName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taskMaterialCost">Material Cost (₹)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="taskMaterialCost"
                        type="number"
                        placeholder="Enter material cost"
                        value={taskMaterialCost || ""}
                        onChange={(e) => setTaskMaterialCost(Number(e.target.value))}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taskDescription">Description</Label>
                  <Textarea
                    id="taskDescription"
                    placeholder="Enter task description"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="taskEffortHours">Effort (Hours)</Label>
                    <Input
                      id="taskEffortHours"
                      type="number"
                      min="0"
                      placeholder="Hours"
                      value={taskEffortHours || ""}
                      onChange={(e) => setTaskEffortHours(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taskEffortMinutes">Effort (Minutes)</Label>
                    <Input
                      id="taskEffortMinutes"
                      type="number"
                      min="0"
                      max="59"
                      placeholder="Minutes"
                      value={taskEffortMinutes || ""}
                      onChange={(e) => setTaskEffortMinutes(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={addTask} disabled={!taskName.trim()} size="sm" className="flex items-center">
                    <Plus className="h-4 w-4 mr-1" /> Add Task
                  </Button>
                </div>
              </div>

              {/* Task List */}
              {tasks.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium">Task List ({tasks.length})</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {tasks.map((task) => (
                      <div key={task.id} className="border rounded-lg p-3 bg-muted/20">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <h5 className="font-medium">{task.name}</h5>
                            {task.description && (
                              <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                            )}
                            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {task.effortHours}h {task.effortMinutes}m
                              </span>
                              <span className="flex items-center">
                                <DollarSign className="h-3 w-3 mr-1" />₹{task.materialCost.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTask(task.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Task Summary */}
              {tasks.length > 0 && (
                <div className="border rounded-lg p-4 bg-muted/10 space-y-3">
                  <h4 className="font-medium">Project Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Effort</p>
                      <p className="font-medium">
                        {adjustedHours}h {adjustedMinutes}m
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Manpower Cost (₹{hourlyRate}/hr)</p>
                      <p className="font-medium">₹{totalManpowerCost.toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Material Cost</p>
                      <p className="font-medium">₹{totalMaterialCost.toLocaleString()}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Project Cost</p>
                      <p className="font-medium text-lg">₹{totalProjectCost.toLocaleString()}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Budget</p>
                      <p className="font-medium text-lg">₹{Number.parseInt(budget).toLocaleString() || 0}</p>
                    </div>
                  </div>

                  {budgetExceeded && (
                    <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-2 rounded-md">
                      <AlertTriangle className="h-4 w-4" />
                      <p className="text-sm font-medium">
                        Warning: Total cost exceeds allocated budget by ₹
                        {(totalProjectCost - Number.parseInt(budget)).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateProject}
            disabled={!projectTitle.trim() || !description.trim() || !budget.trim()}
          >
            Create Project
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
