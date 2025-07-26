"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
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
  ArrowLeft,
  ArrowRight,
  Check,
  Edit,
  CheckCircle,
  Circle,
  ClipboardList,
  Package,
  Minus,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format, addDays, isWeekend } from "date-fns"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface TeamMember {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  department: string
  skills: string[]
  availabilityHours: number
}

interface Task {
  id: string
  name: string
  description: string
  effortHours: number
  effortMinutes: number
  materialCost: number
  skills: string[]
}

interface Part {
  id: string
  name: string
  category: string
  availableQuantity: number
  unit: string
  costPerUnit: number
  supplier: string
  description: string
}

interface SelectedPart {
  part: Part
  requiredQuantity: number
}

const STEPS = [
  { id: 1, title: "Project Information", icon: FileText },
  { id: 2, title: "Tasks", icon: Clock },
  { id: 3, title: "Parts", icon: Package },
  { id: 4, title: "Team Members", icon: Users },
  { id: 5, title: "Photos & Attachments", icon: Upload },
  { id: 6, title: "Summary", icon: ClipboardList },
]

export default function CreateProjectWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isTaskPaneOpen, setIsTaskPaneOpen] = useState(false)

  // Project Information
  const [projectTitle, setProjectTitle] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [budget, setBudget] = useState("")
  const [projectOwner, setProjectOwner] = useState("")

  // Tasks
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskName, setTaskName] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [taskEffortHours, setTaskEffortHours] = useState(0)
  const [taskEffortMinutes, setTaskEffortMinutes] = useState(0)
  const [taskMaterialCost, setTaskMaterialCost] = useState(0)
  const [taskSkills, setTaskSkills] = useState<string[]>([])
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const [hourlyRate, setHourlyRate] = useState(500)

  // Parts
  const [selectedParts, setSelectedParts] = useState<SelectedPart[]>([])

  // Team Members
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<TeamMember[]>([])
  const [teamViewMode, setTeamViewMode] = useState<"card" | "gantt">("card")

  // Files
  const [attachments, setAttachments] = useState<File[]>([])
  const [photos, setPhotos] = useState<File[]>([])

  // Sample parts data
  const availableParts: Part[] = [
    {
      id: "1",
      name: "Steel Rod 10mm",
      category: "Raw Materials",
      availableQuantity: 150,
      unit: "meters",
      costPerUnit: 45,
      supplier: "Steel Corp Ltd",
      description: "High-grade steel rod for construction",
    },
    {
      id: "2",
      name: "Aluminum Sheet 2mm",
      category: "Raw Materials",
      availableQuantity: 25,
      unit: "sheets",
      costPerUnit: 320,
      supplier: "Metal Works Inc",
      description: "Premium aluminum sheets for fabrication",
    },
    {
      id: "3",
      name: "Bearing 6205",
      category: "Components",
      availableQuantity: 8,
      unit: "pieces",
      costPerUnit: 180,
      supplier: "Bearing Solutions",
      description: "Deep groove ball bearing",
    },
    {
      id: "4",
      name: "Motor 1HP",
      category: "Components",
      availableQuantity: 3,
      unit: "pieces",
      costPerUnit: 8500,
      supplier: "Electric Motors Co",
      description: "Single phase induction motor",
    },
    {
      id: "5",
      name: "Welding Rod 3.2mm",
      category: "Consumables",
      availableQuantity: 200,
      unit: "pieces",
      costPerUnit: 12,
      supplier: "Welding Supplies",
      description: "E6013 welding electrodes",
    },
    {
      id: "6",
      name: "Hydraulic Cylinder",
      category: "Components",
      availableQuantity: 2,
      unit: "pieces",
      costPerUnit: 15000,
      supplier: "Hydraulics Pro",
      description: "Double acting hydraulic cylinder",
    },
  ]

  // Sample availability data for Gantt view
  const memberAvailability = {
    "1": {
      totalHours: 40,
      schedule: {} as Record<string, { available: number; busy: number }>,
    },
    "2": {
      totalHours: 35,
      schedule: {} as Record<string, { available: number; busy: number }>,
    },
    "3": {
      totalHours: 45,
      schedule: {} as Record<string, { available: number; busy: number }>,
    },
    "4": {
      totalHours: 38,
      schedule: {} as Record<string, { available: number; busy: number }>,
    },
    "5": {
      totalHours: 42,
      schedule: {} as Record<string, { available: number; busy: number }>,
    },
    "6": {
      totalHours: 40,
      schedule: {} as Record<string, { available: number; busy: number }>,
    },
    "7": {
      totalHours: 30,
      schedule: {} as Record<string, { available: number; busy: number }>,
    },
    "8": {
      totalHours: 44,
      schedule: {} as Record<string, { available: number; busy: number }>,
    },
  }

  // Generate date range for Gantt view based on project dates
  const generateDateRange = (start: Date, end: Date) => {
    const dates = []
    let currentDate = new Date(start)

    while (currentDate <= end) {
      // Only include working days (Monday to Friday)
      if (!isWeekend(currentDate)) {
        const dateStr = currentDate.toISOString().split("T")[0]
        dates.push(dateStr)

        // Generate sample availability data for each member
        Object.keys(memberAvailability).forEach((memberId) => {
          if (!memberAvailability[memberId].schedule[dateStr]) {
            // Generate random but realistic availability
            const totalDayHours = 8
            const busyHours = Math.floor(Math.random() * 4) // 0-3 busy hours
            const availableHours = totalDayHours - busyHours

            memberAvailability[memberId].schedule[dateStr] = {
              available: availableHours,
              busy: busyHours,
            }
          }
        })
      }
      currentDate = addDays(currentDate, 1)
    }
    return dates
  }

  const ganttDates = generateDateRange(startDate, endDate)

  // Sample team members data with vehicle assembly skills
  const availableTeamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@gets.co.in",
      avatar: "/placeholder.svg?height=64&width=64",
      role: "Senior Assembly Engineer",
      department: "Assembly",
      skills: [
        "Engine Assembly",
        "Transmission Installation",
        "Quality Inspection",
        "Blueprint Reading",
        "Torque Application",
      ],
      availabilityHours: 40,
    },
    {
      id: "2",
      name: "Priya Sharma",
      email: "priya.sharma@gets.co.in",
      avatar: "/placeholder.svg?height=64&width=64",
      role: "Interior Lead",
      department: "Interior Assembly",
      skills: [
        "Interior Installation",
        "Dashboard Assembly",
        "Seat Installation",
        "Airbag Installation",
        "HVAC Installation",
      ],
      availabilityHours: 35,
    },
    {
      id: "3",
      name: "Amit Singh",
      email: "amit.singh@gets.co.in",
      avatar: "/placeholder.svg?height=64&width=64",
      role: "Manufacturing Engineer",
      department: "Production",
      skills: ["CAD/CAM", "Robotics Operation", "CNC Operation", "Precision Measurement", "Chassis Assembly"],
      availabilityHours: 45,
    },
    {
      id: "4",
      name: "Neha Patel",
      email: "neha.patel@gets.co.in",
      avatar: "/placeholder.svg?height=64&width=64",
      role: "Quality Manager",
      department: "Quality",
      skills: ["Quality Inspection", "Safety Testing", "Precision Measurement", "Blueprint Reading", "Wheel Alignment"],
      availabilityHours: 38,
    },
    {
      id: "5",
      name: "Suresh Reddy",
      email: "suresh.reddy@gets.co.in",
      avatar: "/placeholder.svg?height=64&width=64",
      role: "Production Manager",
      department: "Production",
      skills: [
        "Inventory Management",
        "Material Handling",
        "Production Planning",
        "Team Leadership",
        "Quality Inspection",
      ],
      availabilityHours: 42,
    },
    {
      id: "6",
      name: "Kavitha Nair",
      email: "kavitha.nair@gets.co.in",
      avatar: "/placeholder.svg?height=64&width=64",
      role: "Process Engineer",
      department: "Production",
      skills: [
        "Hydraulic Systems",
        "Pneumatic Systems",
        "Fuel System Assembly",
        "Brake System Assembly",
        "Suspension Installation",
      ],
      availabilityHours: 40,
    },
    {
      id: "7",
      name: "Dr. Arjun Mehta",
      email: "arjun.mehta@gets.co.in",
      avatar: "/placeholder.svg?height=64&width=64",
      role: "Technical Director",
      department: "R&D",
      skills: [
        "Engine Assembly",
        "Transmission Installation",
        "Chassis Assembly",
        "Electrical Wiring",
        "Blueprint Reading",
      ],
      availabilityHours: 30,
    },
    {
      id: "8",
      name: "Deepak Joshi",
      email: "deepak.joshi@gets.co.in",
      avatar: "/placeholder.svg?height=64&width=64",
      role: "Body Shop Engineer",
      department: "Body Shop",
      skills: ["Welding", "Painting", "Door Assembly", "Glass Installation", "Chassis Assembly"],
      availabilityHours: 44,
    },
  ]

  // Predefined skills for vehicle assembly
  const availableSkills = [
    "Engine Assembly",
    "Transmission Installation",
    "Chassis Assembly",
    "Electrical Wiring",
    "Interior Installation",
    "Welding",
    "Painting",
    "Quality Inspection",
    "CNC Operation",
    "Hydraulic Systems",
    "Pneumatic Systems",
    "Brake System Assembly",
    "Suspension Installation",
    "Wheel Alignment",
    "Fuel System Assembly",
    "HVAC Installation",
    "Dashboard Assembly",
    "Airbag Installation",
    "Seat Installation",
    "Glass Installation",
    "Door Assembly",
    "Robotics Operation",
    "CAD/CAM",
    "Blueprint Reading",
    "Precision Measurement",
    "Torque Application",
    "Safety Testing",
    "Material Handling",
    "Inventory Management",
  ]

  // Calculations
  const totalEffortHours = tasks.reduce((total, task) => total + task.effortHours, 0)
  const totalEffortMinutes = tasks.reduce((total, task) => total + task.effortMinutes, 0)
  const adjustedHours = totalEffortHours + Math.floor(totalEffortMinutes / 60)
  const adjustedMinutes = totalEffortMinutes % 60
  const totalEffortInHours = totalEffortHours + totalEffortMinutes / 60
  const totalManpowerCost = totalEffortInHours * hourlyRate
  const totalMaterialCost = tasks.reduce((total, task) => total + task.materialCost, 0)
  const totalPartsCost = selectedParts.reduce((total, item) => total + item.part.costPerUnit * item.requiredQuantity, 0)
  const totalProjectCost = totalManpowerCost + totalMaterialCost + totalPartsCost
  const budgetExceeded = Number.parseInt(budget) > 0 && totalProjectCost > Number.parseInt(budget)

  // Validation functions
  const isStep1Valid = () => {
    return projectTitle.trim() !== "" && description.trim() !== "" && budget.trim() !== "" && projectOwner.trim() !== ""
  }

  const isStep2Valid = () => {
    return true // Tasks are optional
  }

  const isStep3Valid = () => {
    return true // Parts are optional
  }

  const isStep4Valid = () => {
    return true // Team members are optional
  }

  const isStep5Valid = () => {
    return true // Attachments are optional
  }

  const isStep6Valid = () => {
    return true // Summary is always valid if we reach it
  }

  const isStepCompleted = (stepId: number) => {
    switch (stepId) {
      case 1:
        return isStep1Valid()
      case 2:
        return isStep2Valid()
      case 3:
        return isStep3Valid()
      case 4:
        return isStep4Valid()
      case 5:
        return isStep5Valid()
      case 6:
        return isStep6Valid()
      default:
        return false
    }
  }

  const canNavigateToStep = (stepId: number) => {
    // Can always go to step 1
    if (stepId === 1) return true

    // For other steps, check if previous steps are completed
    for (let i = 1; i < stepId; i++) {
      if (!isStepCompleted(i)) return false
    }
    return true
  }

  // Task functions
  const addTask = () => {
    if (taskName.trim() === "") return

    const newTask: Task = {
      id: editingTaskId || Date.now().toString(),
      name: taskName,
      description: taskDescription,
      effortHours: taskEffortHours,
      effortMinutes: taskEffortMinutes,
      materialCost: taskMaterialCost,
      skills: taskSkills,
    }

    if (editingTaskId) {
      setTasks(tasks.map((task) => (task.id === editingTaskId ? newTask : task)))
      setEditingTaskId(null)
    } else {
      setTasks([...tasks, newTask])
    }

    // Reset form and close pane
    resetTaskForm()
    setIsTaskPaneOpen(false)
  }

  const editTask = (task: Task) => {
    setTaskName(task.name)
    setTaskDescription(task.description)
    setTaskEffortHours(task.effortHours)
    setTaskEffortMinutes(task.effortMinutes)
    setTaskMaterialCost(task.materialCost)
    setTaskSkills(task.skills || [])
    setEditingTaskId(task.id)
    setIsTaskPaneOpen(true)
  }

  const removeTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
    if (editingTaskId === taskId) {
      resetTaskForm()
      setEditingTaskId(null)
      setIsTaskPaneOpen(false)
    }
  }

  const resetTaskForm = () => {
    setTaskName("")
    setTaskDescription("")
    setTaskEffortHours(0)
    setTaskEffortMinutes(0)
    setTaskMaterialCost(0)
    setTaskSkills([])
  }

  const cancelEdit = () => {
    resetTaskForm()
    setEditingTaskId(null)
    setIsTaskPaneOpen(false)
  }

  // Parts functions
  const addPart = (partId: string) => {
    const part = availableParts.find((p) => p.id === partId)
    if (part && !selectedParts.find((sp) => sp.part.id === partId)) {
      setSelectedParts([...selectedParts, { part, requiredQuantity: 1 }])
    }
  }

  const updatePartQuantity = (partId: string, quantity: number) => {
    setSelectedParts(
      selectedParts.map((sp) => (sp.part.id === partId ? { ...sp, requiredQuantity: Math.max(0, quantity) } : sp)),
    )
  }

  const removePart = (partId: string) => {
    setSelectedParts(selectedParts.filter((sp) => sp.part.id !== partId))
  }

  // Team member functions
  const toggleTeamMember = (member: TeamMember) => {
    const isSelected = selectedTeamMembers.find((m) => m.id === member.id)
    if (isSelected) {
      setSelectedTeamMembers(selectedTeamMembers.filter((m) => m.id !== member.id))
    } else {
      setSelectedTeamMembers([...selectedTeamMembers, member])
    }
  }

  // File functions
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

  // Navigation functions
  const goToStep = (stepId: number) => {
    if (canNavigateToStep(stepId)) {
      setCurrentStep(stepId)
      setIsTaskPaneOpen(false) // Close task pane when navigating
    }
  }

  const nextStep = () => {
    if (currentStep < 6 && isStepCompleted(currentStep)) {
      setCurrentStep(currentStep + 1)
      setIsTaskPaneOpen(false)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setIsTaskPaneOpen(false)
    }
  }

  const handleCreateProject = () => {
    const owner = availableTeamMembers.find((m) => m.id === projectOwner)
    const newProject = {
      id: Date.now(),
      name: projectTitle,
      description,
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
      budget: Number.parseInt(budget) || 0,
      owner: owner,
      team: selectedTeamMembers,
      attachments,
      photos,
      status: "Planning",
      progress: 0,
      priority: "Medium",
      tasks: { total: tasks.length, completed: 0 },
      taskDetails: tasks,
      selectedParts,
      totalEffort: { hours: adjustedHours, minutes: adjustedMinutes },
      totalManpowerCost,
      totalMaterialCost,
      totalPartsCost,
      totalProjectCost,
    }

    console.log("Creating project:", newProject)
    router.push("/")
  }

  const handleCancel = () => {
    router.push("/")
  }

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep && isStepCompleted(stepId)) return "completed"
    if (stepId === currentStep) return "current"
    if (stepId < currentStep) return "incomplete"
    return "upcoming"
  }

  const addSkill = (skill: string) => {
    if (skill && !taskSkills.includes(skill)) {
      setTaskSkills([...taskSkills, skill])
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setTaskSkills(taskSkills.filter((skill) => skill !== skillToRemove))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto py-8 max-w-7xl px-4">
        {/* Header Section */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={handleCancel}
            className="mr-4 h-10 w-10 p-0 rounded-full hover:bg-white/80 transition-all duration-200 shadow-sm border border-white/50"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Create New Project
            </h1>
            <p className="text-slate-600 mt-1">Build something amazing with your team</p>
          </div>
        </div>

        {/* Progress Steps - Enhanced Navigation */}
        <div className="mb-10">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="flex items-center justify-between">
              {STEPS.map((step, index) => {
                const status = getStepStatus(step.id)
                const Icon = step.icon
                const canNavigate = canNavigateToStep(step.id)

                return (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center w-full">
                      <div
                        className={cn(
                          "flex items-center justify-center w-12 h-12 rounded-xl mb-3 transition-all duration-300 transform",
                          canNavigate && "cursor-pointer hover:scale-110",
                          status === "completed" &&
                            "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25",
                          status === "current" &&
                            "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25",
                          status === "upcoming" && "bg-slate-100 border-2 border-slate-200 text-slate-400",
                          status === "incomplete" && "bg-red-50 border-2 border-red-200 text-red-400",
                          !canNavigate && "cursor-not-allowed",
                        )}
                        onClick={() => canNavigate && goToStep(step.id)}
                      >
                        {status === "completed" ? <Check className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                      </div>
                      <span
                        className={cn(
                          "text-sm font-semibold text-center cursor-pointer transition-colors duration-200",
                          status === "current" && "text-blue-600",
                          status === "completed" && "text-green-600",
                          status === "upcoming" && "text-slate-400",
                          status === "incomplete" && "text-red-500",
                          !canNavigate && "cursor-not-allowed",
                        )}
                        onClick={() => canNavigate && goToStep(step.id)}
                      >
                        {step.title}
                      </span>
                    </div>
                    {index < STEPS.length - 1 && (
                      <div
                        className={cn(
                          "flex-1 h-1 mx-6 mt-[-30px] rounded-full transition-all duration-300",
                          step.id < currentStep ? "bg-gradient-to-r from-green-400 to-emerald-400" : "bg-slate-200",
                        )}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 min-h-[700px] overflow-hidden">
          <div className="p-8">
            {/* Step 1: Project Information */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
                    Project Information
                  </h2>
                  <p className="text-slate-600 text-lg">Let's start with the basic details of your project</p>
                </div>

                <div className="max-w-3xl mx-auto space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="title" className="text-sm font-semibold text-slate-700">
                        Project Title *
                      </Label>
                      <Input
                        id="title"
                        placeholder="Enter project title"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="budget" className="text-sm font-semibold text-slate-700">
                        Budget (₹) *
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input
                          id="budget"
                          type="number"
                          placeholder="Enter budget amount"
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className="h-12 pl-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="projectOwner" className="text-sm font-semibold text-slate-700">
                      Project Owner *
                    </Label>
                    <Select value={projectOwner} onValueChange={setProjectOwner}>
                      <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl">
                        <SelectValue placeholder="Select project owner" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-slate-200">
                        {availableTeamMembers.map((member) => (
                          <SelectItem key={member.id} value={member.id} className="rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={member.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm">
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{member.name}</div>
                                <div className="text-sm text-slate-500">{member.role}</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="description" className="text-sm font-semibold text-slate-700">
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Enter project description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-200 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-slate-700">Start Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full h-12 justify-start text-left font-normal border-slate-200 hover:border-blue-500 rounded-xl transition-all duration-200",
                              !startDate && "text-slate-400",
                            )}
                          >
                            <CalendarIcon className="mr-3 h-5 w-5" />
                            {startDate ? format(startDate, "dd/MM/yyyy") : "Pick start date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 rounded-xl border-slate-200" align="start">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={(date) => date && setStartDate(date)}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-slate-700">End Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full h-12 justify-start text-left font-normal border-slate-200 hover:border-blue-500 rounded-xl transition-all duration-200",
                              !endDate && "text-slate-400",
                            )}
                          >
                            <CalendarIcon className="mr-3 h-5 w-5" />
                            {endDate ? format(endDate, "dd/MM/yyyy") : "Pick end date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 rounded-xl border-slate-200" align="start">
                          <Calendar mode="single" selected={endDate} onSelect={(date) => date && setEndDate(date)} />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Tasks */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                      Project Tasks
                    </h2>
                    <p className="text-slate-600 text-lg">Add tasks to plan your project and estimate costs</p>
                  </div>
                  <Sheet open={isTaskPaneOpen} onOpenChange={setIsTaskPaneOpen}>
                    <SheetTrigger asChild>
                      <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                        <Plus className="h-5 w-5 mr-2" />
                        Add Task
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="w-[500px] sm:w-[540px] rounded-l-2xl border-slate-200">
                      <SheetHeader>
                        <SheetTitle className="text-xl font-bold">
                          {editingTaskId ? "Edit Task" : "Add New Task"}
                        </SheetTitle>
                      </SheetHeader>
                      <div className="mt-6 space-y-6">
                        <div className="space-y-3">
                          <Label htmlFor="taskName" className="text-sm font-semibold text-slate-700">
                            Task Name *
                          </Label>
                          <Input
                            id="taskName"
                            placeholder="Enter task name"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                          />
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="taskDescription" className="text-sm font-semibold text-slate-700">
                            Description
                          </Label>
                          <Textarea
                            id="taskDescription"
                            placeholder="Enter task description"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            rows={3}
                            className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <Label htmlFor="taskEffortHours" className="text-sm font-semibold text-slate-700">
                              Effort (Hours)
                            </Label>
                            <Input
                              id="taskEffortHours"
                              type="number"
                              min="0"
                              placeholder="Hours"
                              value={taskEffortHours || ""}
                              onChange={(e) => setTaskEffortHours(Number(e.target.value))}
                              className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                            />
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="taskEffortMinutes" className="text-sm font-semibold text-slate-700">
                              Effort (Minutes)
                            </Label>
                            <Input
                              id="taskEffortMinutes"
                              type="number"
                              min="0"
                              max="59"
                              placeholder="Minutes"
                              value={taskEffortMinutes || ""}
                              onChange={(e) => setTaskEffortMinutes(Number(e.target.value))}
                              className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="taskMaterialCost" className="text-sm font-semibold text-slate-700">
                            Material Cost (₹)
                          </Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                              id="taskMaterialCost"
                              type="number"
                              placeholder="Enter material cost"
                              value={taskMaterialCost || ""}
                              onChange={(e) => setTaskMaterialCost(Number(e.target.value))}
                              className="h-11 pl-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-slate-700">Skills Required</Label>
                          <div className="space-y-3">
                            <Select onValueChange={addSkill}>
                              <SelectTrigger className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg">
                                <SelectValue placeholder="Select skills" />
                              </SelectTrigger>
                              <SelectContent className="rounded-lg border-slate-200">
                                {availableSkills
                                  .filter((skill) => !taskSkills.includes(skill))
                                  .map((skill) => (
                                    <SelectItem key={skill} value={skill} className="rounded-md">
                                      {skill}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>

                            {taskSkills.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {taskSkills.map((skill) => (
                                  <Badge
                                    key={skill}
                                    variant="secondary"
                                    className="text-xs px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full"
                                  >
                                    {skill}
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeSkill(skill)}
                                      className="h-4 w-4 p-0 ml-2 hover:bg-red-100 hover:text-red-600 rounded-full"
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="flex justify-end space-x-3">
                          <Button
                            variant="outline"
                            onClick={cancelEdit}
                            className="px-6 py-2 rounded-lg border-slate-200 hover:border-slate-300"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={addTask}
                            disabled={!taskName.trim()}
                            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                          >
                            {editingTaskId ? "Update Task" : "Add Task"}
                          </Button>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                {/* Tasks Table */}
                {tasks.length > 0 ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-slate-800">Tasks ({tasks.length})</h3>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="secondary"
                          className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-full"
                        >
                          Total: {adjustedHours}h {adjustedMinutes}m
                        </Badge>
                        <Badge variant="outline" className="px-4 py-2 border-slate-300 rounded-full">
                          ₹{totalProjectCost.toLocaleString()}
                        </Badge>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                      <div className="max-h-96 overflow-y-auto">
                        <Table>
                          <TableHeader className="sticky top-0 bg-slate-50 border-b border-slate-200">
                            <TableRow>
                              <TableHead className="w-[200px] font-semibold text-slate-700 py-4">Task Name</TableHead>
                              <TableHead className="w-[250px] font-semibold text-slate-700">Description</TableHead>
                              <TableHead className="w-[100px] font-semibold text-slate-700">Effort</TableHead>
                              <TableHead className="w-[120px] font-semibold text-slate-700">Cost</TableHead>
                              <TableHead className="w-[200px] font-semibold text-slate-700">Skills</TableHead>
                              <TableHead className="w-[80px] text-right font-semibold text-slate-700">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {tasks.map((task, index) => (
                              <TableRow
                                key={task.id}
                                className={cn(
                                  "hover:bg-slate-50 transition-colors duration-150",
                                  index % 2 === 0 && "bg-slate-25",
                                )}
                              >
                                <TableCell className="font-medium py-4">
                                  <div className="truncate" title={task.name}>
                                    {task.name}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="truncate text-sm text-slate-600" title={task.description}>
                                    {task.description || "-"}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="text-xs border-slate-300 rounded-full">
                                    {task.effortHours}h {task.effortMinutes}m
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-sm font-medium">
                                  ₹{task.materialCost.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                  <div className="flex flex-wrap gap-1 max-w-[180px]">
                                    {task.skills && task.skills.length > 0 ? (
                                      <>
                                        {task.skills.slice(0, 2).map((skill) => (
                                          <Badge
                                            key={skill}
                                            variant="secondary"
                                            className="text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded-full"
                                          >
                                            {skill}
                                          </Badge>
                                        ))}
                                        {task.skills.length > 2 && (
                                          <Badge variant="outline" className="text-xs border-slate-300 rounded-full">
                                            +{task.skills.length - 2}
                                          </Badge>
                                        )}
                                      </>
                                    ) : (
                                      <span className="text-xs text-slate-400">No skills</span>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end space-x-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => editTask(task)}
                                      className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeTask(task.id)}
                                      className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    {/* Cost Summary */}
                    <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
                        <div className="text-center">
                          <p className="text-slate-600 mb-1">Total Effort</p>
                          <p className="font-bold text-xl text-slate-800">
                            {adjustedHours}h {adjustedMinutes}m
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-slate-600 mb-1">Manpower Cost (₹{hourlyRate}/hr)</p>
                          <p className="font-bold text-xl text-slate-800">₹{totalManpowerCost.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-slate-600 mb-1">Material Cost</p>
                          <p className="font-bold text-xl text-slate-800">₹{totalMaterialCost.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-slate-600 mb-1">Total Cost</p>
                          <p className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            ₹{totalProjectCost.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {budgetExceeded && (
                        <div className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-xl mt-6 border border-red-200">
                          <AlertTriangle className="h-5 w-5" />
                          <p className="text-sm font-medium">
                            Warning: Total cost exceeds allocated budget by ₹
                            {(totalProjectCost - Number.parseInt(budget)).toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-20 text-slate-500">
                    <div className="bg-slate-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                      <Clock className="h-10 w-10 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-slate-700">No tasks added yet</h3>
                    <p className="mb-8 text-slate-600">Click "Add Task" to get started with planning your project.</p>
                    <Button
                      onClick={() => setIsTaskPaneOpen(true)}
                      variant="outline"
                      size="lg"
                      className="px-8 py-3 border-slate-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Add Your First Task
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Parts */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
                    Project Parts
                  </h2>
                  <p className="text-slate-600 text-lg">Select parts and materials needed for your project</p>
                </div>

                <div className="space-y-8">
                  {/* Add Parts Section */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-slate-800">Add Parts</h3>
                      <Badge variant="outline" className="px-3 py-1 border-slate-300 rounded-full">
                        {availableParts.length} Available
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-sm font-semibold text-slate-700">Select Part</Label>
                      <Select onValueChange={addPart}>
                        <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg">
                          <SelectValue placeholder="Choose a part to add" />
                        </SelectTrigger>
                        <SelectContent className="rounded-lg border-slate-200">
                          {availableParts
                            .filter((part) => !selectedParts.find((sp) => sp.part.id === part.id))
                            .map((part) => (
                              <SelectItem key={part.id} value={part.id} className="rounded-md">
                                <div className="flex items-center justify-between w-full">
                                  <div>
                                    <div className="font-medium">{part.name}</div>
                                    <div className="text-sm text-slate-500">
                                      {part.category} • {part.availableQuantity} {part.unit} available • ₹
                                      {part.costPerUnit}/{part.unit}
                                    </div>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Selected Parts */}
                  {selectedParts.length > 0 ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-slate-800">
                          Selected Parts ({selectedParts.length})
                        </h3>
                        <Badge variant="outline" className="px-4 py-2 border-slate-300 rounded-full">
                          Total: ₹{totalPartsCost.toLocaleString()}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {selectedParts.map((selectedPart) => {
                          const isShortage = selectedPart.requiredQuantity > selectedPart.part.availableQuantity
                          const partCost = selectedPart.part.costPerUnit * selectedPart.requiredQuantity

                          return (
                            <Card
                              key={selectedPart.part.id}
                              className={cn(
                                "rounded-xl border-2 transition-all duration-200",
                                isShortage
                                  ? "border-red-300 bg-gradient-to-r from-red-50 to-orange-50 shadow-lg shadow-red-500/20"
                                  : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-md",
                              )}
                            >
                              <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-3">
                                      <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                                        <Package className="h-5 w-5 text-white" />
                                      </div>
                                      <div>
                                        <h4 className="font-bold text-slate-800">{selectedPart.part.name}</h4>
                                        <p className="text-sm text-slate-600">{selectedPart.part.category}</p>
                                        <p className="text-xs text-slate-500">{selectedPart.part.description}</p>
                                      </div>
                                      {isShortage && (
                                        <div className="p-1.5 bg-red-100 rounded-lg">
                                          <AlertTriangle className="h-5 w-5 text-red-600" />
                                        </div>
                                      )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                      <div>
                                        <Label className="text-xs font-medium text-slate-600">Available</Label>
                                        <p className="font-semibold text-slate-800">
                                          {selectedPart.part.availableQuantity} {selectedPart.part.unit}
                                        </p>
                                      </div>
                                      <div>
                                        <Label className="text-xs font-medium text-slate-600">
                                          Cost per {selectedPart.part.unit}
                                        </Label>
                                        <p className="font-semibold text-slate-800">₹{selectedPart.part.costPerUnit}</p>
                                      </div>
                                      <div>
                                        <Label className="text-xs font-medium text-slate-600">Supplier</Label>
                                        <p className="font-semibold text-slate-800">{selectedPart.part.supplier}</p>
                                      </div>
                                    </div>

                                    {isShortage && (
                                      <div className="mb-4 p-3 bg-red-100 border border-red-200 rounded-lg">
                                        <div className="flex items-center space-x-2">
                                          <AlertTriangle className="h-4 w-4 text-red-600" />
                                          <span className="text-sm font-medium text-red-800">Insufficient Stock</span>
                                        </div>
                                        <p className="text-xs text-red-600 mt-1">
                                          Required: {selectedPart.requiredQuantity} {selectedPart.part.unit} •
                                          Available: {selectedPart.part.availableQuantity} {selectedPart.part.unit} •
                                          Shortage:{" "}
                                          {selectedPart.requiredQuantity - selectedPart.part.availableQuantity}{" "}
                                          {selectedPart.part.unit}
                                        </p>
                                      </div>
                                    )}

                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-3">
                                        <Label className="text-sm font-medium text-slate-700">Required Quantity:</Label>
                                        <div className="flex items-center space-x-2">
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                              updatePartQuantity(
                                                selectedPart.part.id,
                                                selectedPart.requiredQuantity - 1,
                                              )
                                            }
                                            disabled={selectedPart.requiredQuantity <= 1}
                                            className="h-8 w-8 p-0 rounded-lg"
                                          >
                                            <Minus className="h-4 w-4" />
                                          </Button>
                                          <Input
                                            type="number"
                                            min="1"
                                            value={selectedPart.requiredQuantity}
                                            onChange={(e) =>
                                              updatePartQuantity(selectedPart.part.id, Number(e.target.value))
                                            }
                                            className="w-20 h-8 text-center border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                                          />
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                              updatePartQuantity(
                                                selectedPart.part.id,
                                                selectedPart.requiredQuantity + 1,
                                              )
                                            }
                                            className="h-8 w-8 p-0 rounded-lg"
                                          >
                                            <Plus className="h-4 w-4" />
                                          </Button>
                                        </div>
                                        <span className="text-sm text-slate-600">{selectedPart.part.unit}</span>
                                      </div>

                                      <div className="flex items-center space-x-3">
                                        <div className="text-right">
                                          <p className="text-sm text-slate-600">Total Cost</p>
                                          <p className="font-bold text-lg text-slate-800">
                                            ₹{partCost.toLocaleString()}
                                          </p>
                                        </div>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => removePart(selectedPart.part.id)}
                                          className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )
                        })}
                      </div>

                      {/* Parts Cost Summary */}
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                          <div className="text-center">
                            <p className="text-purple-600 mb-1">Total Parts</p>
                            <p className="font-bold text-2xl text-purple-800">{selectedParts.length}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-purple-600 mb-1">Parts with Shortage</p>
                            <p className="font-bold text-2xl text-red-600">
                              {selectedParts.filter((sp) => sp.requiredQuantity > sp.part.availableQuantity).length}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-purple-600 mb-1">Total Parts Cost</p>
                            <p className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                              ₹{totalPartsCost.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-20 text-slate-500">
                      <div className="bg-slate-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                        <Package className="h-10 w-10 text-slate-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-slate-700">No parts selected yet</h3>
                      <p className="mb-8 text-slate-600">
                        Select parts from the dropdown above to add them to your project.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Team Members */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
                      Team Members
                    </h2>
                    <p className="text-slate-600 text-lg">Select team members for your project</p>
                  </div>

                  {/* View Toggle */}
                  <div className="flex items-center space-x-2 bg-white rounded-xl p-1 border border-slate-200 shadow-sm">
                    <Button
                      variant={teamViewMode === "card" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setTeamViewMode("card")}
                      className={cn(
                        "px-4 py-2 rounded-lg transition-all duration-200",
                        teamViewMode === "card"
                          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
                          : "text-slate-600 hover:bg-slate-50",
                      )}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Card View
                    </Button>
                    <Button
                      variant={teamViewMode === "gantt" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setTeamViewMode("gantt")}
                      className={cn(
                        "px-4 py-2 rounded-lg transition-all duration-200",
                        teamViewMode === "gantt"
                          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
                          : "text-slate-600 hover:bg-slate-50",
                      )}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Gantt View
                    </Button>
                  </div>
                </div>

                <div className="space-y-8">
                  {selectedTeamMembers.length > 0 && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
                      <h3 className="font-bold text-green-800 mb-4 text-lg">
                        Selected Team Members ({selectedTeamMembers.length})
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {selectedTeamMembers.map((member) => (
                          <Badge
                            key={member.id}
                            variant="secondary"
                            className="px-4 py-2 bg-green-100 text-green-800 border border-green-300 rounded-full"
                          >
                            {member.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Card View */}
                  {teamViewMode === "card" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {availableTeamMembers.map((member) => {
                        const isSelected = selectedTeamMembers.find((m) => m.id === member.id)

                        return (
                          <Card
                            key={member.id}
                            className={cn(
                              "cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:scale-105 rounded-2xl border-2",
                              isSelected
                                ? "ring-2 ring-green-500 bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-lg shadow-green-500/20"
                                : "hover:border-blue-300 border-slate-200 bg-white hover:bg-blue-50/50",
                            )}
                            onClick={() => toggleTeamMember(member)}
                          >
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                  <Avatar className="h-14 w-14 ring-2 ring-white shadow-md">
                                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold">
                                      {member.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h4 className="font-bold text-slate-800">{member.name}</h4>
                                    <p className="text-sm text-slate-600 font-medium">{member.role}</p>
                                    <p className="text-xs text-slate-500">{member.department}</p>
                                  </div>
                                </div>
                                <div className="flex-shrink-0">
                                  {isSelected ? (
                                    <div className="bg-green-500 rounded-full p-1">
                                      <CheckCircle className="h-6 w-6 text-white" />
                                    </div>
                                  ) : (
                                    <Circle className="h-6 w-6 text-slate-400" />
                                  )}
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <p className="text-xs font-semibold text-slate-600 mb-2">Skills</p>
                                  <div className="flex flex-wrap gap-2">
                                    {member.skills.slice(0, 3).map((skill) => (
                                      <Badge
                                        key={skill}
                                        variant="outline"
                                        className="text-xs px-3 py-1 border-slate-300 rounded-full bg-slate-50"
                                      >
                                        {skill}
                                      </Badge>
                                    ))}
                                    {member.skills.length > 3 && (
                                      <Badge
                                        variant="outline"
                                        className="text-xs px-3 py-1 border-slate-300 rounded-full bg-slate-50"
                                      >
                                        +{member.skills.length - 3}
                                      </Badge>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                                  <div>
                                    <p className="text-xs font-semibold text-slate-600">Availability</p>
                                    <p className="text-sm font-bold text-slate-800">{member.availabilityHours}h/week</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-xs text-slate-500 truncate max-w-[120px]">{member.email}</p>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  )}

                  {/* Gantt View */}
                  {teamViewMode === "gantt" && (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                      <div className="p-6 border-b border-slate-200 bg-slate-50">
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">Team Availability Schedule</h3>
                        <p className="text-sm text-slate-600">
                          Project Duration: {format(startDate, "MMM dd, yyyy")} - {format(endDate, "MMM dd, yyyy")} •
                          Click on team members to select them
                        </p>
                      </div>

                      <div className="overflow-x-auto">
                        <div className="min-w-[1200px]">
                          {/* Header with dates */}
                          <div className="flex border-b border-slate-200 bg-slate-50">
                            <div className="w-80 p-4 border-r border-slate-200">
                              <div className="font-semibold text-slate-700">Team Member</div>
                            </div>
                            {ganttDates.map((date) => (
                              <div key={date} className="w-24 p-2 border-r border-slate-200 text-center">
                                <div className="text-xs font-semibold text-slate-600">
                                  {format(new Date(date), "MMM dd")}
                                </div>
                                <div className="text-xs text-slate-500">{format(new Date(date), "EEE")}</div>
                              </div>
                            ))}
                            <div className="w-32 p-4 text-center">
                              <div className="text-xs font-semibold text-slate-700">Total Hours</div>
                            </div>
                          </div>

                          {/* Team member rows */}
                          {availableTeamMembers.map((member) => {
                            const isSelected = selectedTeamMembers.find((m) => m.id === member.id)
                            const availability = memberAvailability[member.id] || { totalHours: 0, schedule: {} }

                            return (
                              <div
                                key={member.id}
                                className={cn(
                                  "flex border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-all duration-200",
                                  isSelected && "bg-green-50 border-green-200",
                                )}
                                onClick={() => toggleTeamMember(member)}
                              >
                                {/* Member info */}
                                <div className="w-80 p-4 border-r border-slate-200">
                                  <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                      {isSelected ? (
                                        <div className="bg-green-500 rounded-full p-1">
                                          <CheckCircle className="h-5 w-5 text-white" />
                                        </div>
                                      ) : (
                                        <Circle className="h-5 w-5 text-slate-400" />
                                      )}
                                    </div>
                                    <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
                                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm">
                                        {member.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0 flex-1">
                                      <div className="font-semibold text-sm text-slate-800 truncate">{member.name}</div>
                                      <div className="text-xs text-slate-600 truncate">{member.role}</div>
                                      <div className="text-xs text-slate-500">{member.department}</div>
                                    </div>
                                  </div>
                                </div>

                                {/* Availability bars for each date */}
                                {ganttDates.map((date) => {
                                  const dayData = availability.schedule[date] || { available: 0, busy: 0 }
                                  const totalDay = dayData.available + dayData.busy
                                  const availablePercent = totalDay > 0 ? (dayData.available / totalDay) * 100 : 0
                                  const busyPercent = totalDay > 0 ? (dayData.busy / totalDay) * 100 : 0

                                  return (
                                    <div key={date} className="w-24 p-2 border-r border-slate-200">
                                      <div className="space-y-1">
                                        {/* Availability bar */}
                                        <div className="h-6 bg-slate-100 rounded-md overflow-hidden relative">
                                          {totalDay > 0 && (
                                            <>
                                              <div
                                                className="h-full bg-gradient-to-r from-green-400 to-green-500 absolute left-0"
                                                style={{ width: `${availablePercent}%` }}
                                              />
                                              <div
                                                className="h-full bg-gradient-to-r from-red-400 to-red-500 absolute"
                                                style={{
                                                  left: `${availablePercent}%`,
                                                  width: `${busyPercent}%`,
                                                }}
                                              />
                                            </>
                                          )}
                                          <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-xs font-semibold text-slate-700">
                                              {dayData.available}h
                                            </span>
                                          </div>
                                        </div>

                                        {/* Hours breakdown */}
                                        <div className="text-xs text-center">
                                          <div className="text-green-600 font-medium">{dayData.available}h free</div>
                                          {dayData.busy > 0 && <div className="text-red-500">{dayData.busy}h busy</div>}
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })}

                                {/* Total hours */}
                                <div className="w-32 p-4 text-center border-l border-slate-200">
                                  <div className="text-lg font-bold text-slate-800">{availability.totalHours}h</div>
                                  <div className="text-xs text-slate-600">per week</div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="p-4 border-t border-slate-200 bg-slate-50">
                        <div className="flex items-center justify-center space-x-8">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded"></div>
                            <span className="text-sm text-slate-600">Available Hours</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-red-500 rounded"></div>
                            <span className="text-sm text-slate-600">Busy Hours</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-slate-600">Selected for Project</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedTeamMembers.length === 0 && (
                    <div className="text-center py-16 text-slate-500">
                      <div className="bg-slate-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                        <Users className="h-10 w-10 text-slate-400" />
                      </div>
                      <p className="text-lg">
                        {teamViewMode === "card"
                          ? "Click on team member cards above to select them for your project."
                          : "Click on team members in the Gantt view to select them for your project."}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 5: Photos & Attachments */}
            {currentStep === 5 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
                    Photos & Attachments
                  </h2>
                  <p className="text-slate-600 text-lg">Upload relevant files and photos for your project</p>
                </div>

                <div className="max-w-5xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Attachments */}
                    <Card className="rounded-2xl border-slate-200 shadow-sm bg-white">
                      <CardHeader className="pb-4">
                        <CardTitle className="flex items-center space-x-3 text-xl">
                          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                            <Upload className="h-5 w-5 text-white" />
                          </div>
                          <span>Attachments</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200">
                          <Upload className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                          <p className="text-sm text-slate-600 mb-4 font-medium">
                            Drag and drop files here, or click to browse
                          </p>
                          <input
                            type="file"
                            multiple
                            onChange={(e) => handleFileUpload(e.target.files, "attachments")}
                            className="hidden"
                            id="attachments-upload"
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                          />
                          <Button variant="outline" size="sm" asChild className="rounded-lg border-slate-300">
                            <label htmlFor="attachments-upload" className="cursor-pointer">
                              Browse Files
                            </label>
                          </Button>
                        </div>

                        {attachments.length > 0 && (
                          <div className="space-y-3">
                            <Label className="text-sm font-semibold text-slate-700">
                              Uploaded Files ({attachments.length})
                            </Label>
                            <div className="space-y-2">
                              {attachments.map((file, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-150"
                                >
                                  <span className="text-sm truncate font-medium text-slate-700">{file.name}</span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeFile(index, "attachments")}
                                    className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 rounded-lg"
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

                    {/* Photos */}
                    <Card className="rounded-2xl border-slate-200 shadow-sm bg-white">
                      <CardHeader className="pb-4">
                        <CardTitle className="flex items-center space-x-3 text-xl">
                          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                            <Camera className="h-5 w-5 text-white" />
                          </div>
                          <span>Photos</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-purple-400 hover:bg-purple-50/50 transition-all duration-200">
                          <Camera className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                          <p className="text-sm text-slate-600 mb-4 font-medium">Upload project photos</p>
                          <input
                            type="file"
                            multiple
                            onChange={(e) => handleFileUpload(e.target.files, "photos")}
                            className="hidden"
                            id="photos-upload"
                            accept="image/*"
                          />
                          <Button variant="outline" size="sm" asChild className="rounded-lg border-slate-300">
                            <label htmlFor="photos-upload" className="cursor-pointer">
                              Browse Photos
                            </label>
                          </Button>
                        </div>

                        {photos.length > 0 && (
                          <div className="space-y-3">
                            <Label className="text-sm font-semibold text-slate-700">
                              Uploaded Photos ({photos.length})
                            </Label>
                            <div className="grid grid-cols-2 gap-3">
                              {photos.map((file, index) => (
                                <div key={index} className="relative group">
                                  <img
                                    src={URL.createObjectURL(file) || "/placeholder.svg"}
                                    alt={file.name}
                                    className="w-full h-24 object-cover rounded-lg border border-slate-200 shadow-sm"
                                  />
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => removeFile(index, "photos")}
                                    className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"
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

                  {attachments.length === 0 && photos.length === 0 && (
                    <div className="text-center py-16 text-slate-500">
                      <div className="bg-slate-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                        <Upload className="h-10 w-10 text-slate-400" />
                      </div>
                      <p className="text-lg">
                        No files uploaded yet. You can add attachments and photos using the upload areas above.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 6: Summary */}
            {currentStep === 6 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
                    Project Summary
                  </h2>
                  <p className="text-slate-600 text-lg">Review your project details before creating</p>
                </div>

                <div className="max-w-5xl mx-auto space-y-8">
                  {/* Project Information Summary */}
                  <Card className="bg-gradient-to-r from-white to-slate-50 border-slate-200 rounded-2xl shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center space-x-3 text-xl">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                          <FileText className="h-5 w-5 text-white" />
                        </div>
                        <span>Project Information</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-sm font-semibold text-slate-600">Project Title</Label>
                          <p className="font-bold text-lg text-slate-800">{projectTitle}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-slate-600">Budget</Label>
                          <p className="font-bold text-lg text-slate-800">
                            ₹{Number.parseInt(budget).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-slate-600">Duration</Label>
                          <p className="font-bold text-lg text-slate-800">
                            {format(startDate, "dd/MM/yyyy")} - {format(endDate, "dd/MM/yyyy")}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-slate-600">Project Owner</Label>
                          <div className="flex items-center space-x-3 mt-1">
                            {(() => {
                              const owner = availableTeamMembers.find((m) => m.id === projectOwner)
                              return owner ? (
                                <>
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={owner.avatar || "/placeholder.svg"} />
                                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm">
                                      {owner.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-bold text-sm text-slate-800">{owner.name}</p>
                                    <p className="text-xs text-slate-600">{owner.role}</p>
                                  </div>
                                </>
                              ) : null
                            })()}
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-slate-600">Description</Label>
                        <p className="text-sm mt-2 text-slate-700 leading-relaxed">{description}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tasks & Costs Summary */}
                  <Card className="bg-gradient-to-r from-white to-blue-50 border-slate-200 rounded-2xl shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center space-x-3 text-xl">
                        <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                          <Clock className="h-5 w-5 text-white" />
                        </div>
                        <span>Tasks & Costs</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                          <p className="text-3xl font-bold text-blue-600">{tasks.length}</p>
                          <p className="text-sm text-slate-600 font-medium">Total Tasks</p>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                          <p className="text-3xl font-bold text-purple-600">
                            {adjustedHours}h {adjustedMinutes}m
                          </p>
                          <p className="text-sm text-slate-600 font-medium">Total Effort</p>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                          <p className="text-3xl font-bold text-green-600">₹{totalManpowerCost.toLocaleString()}</p>
                          <p className="text-sm text-slate-600 font-medium">Manpower Cost</p>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200">
                          <p className="text-3xl font-bold text-orange-600">₹{totalMaterialCost.toLocaleString()}</p>
                          <p className="text-sm text-slate-600 font-medium">Material Cost</p>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                          <p className="text-3xl font-bold text-purple-600">₹{totalPartsCost.toLocaleString()}</p>
                          <p className="text-sm text-slate-600 font-medium">Parts Cost</p>
                        </div>
                      </div>
                      <Separator className="my-6" />
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xl font-bold text-slate-700">Total Project Cost</p>
                          <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            ₹{totalProjectCost.toLocaleString()}
                          </p>
                        </div>
                        {budgetExceeded && (
                          <div className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">
                            <AlertTriangle className="h-6 w-6" />
                            <div className="text-right">
                              <p className="font-bold">Budget Exceeded</p>
                              <p className="text-sm">
                                by ₹{(totalProjectCost - Number.parseInt(budget)).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Parts Summary */}
                  {selectedParts.length > 0 && (
                    <Card className="bg-gradient-to-r from-white to-purple-50 border-slate-200 rounded-2xl shadow-lg">
                      <CardHeader className="pb-4">
                        <CardTitle className="flex items-center space-x-3 text-xl">
                          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                            <Package className="h-5 w-5 text-white" />
                          </div>
                          <span>Selected Parts ({selectedParts.length})</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedParts.map((selectedPart) => {
                            const isShortage = selectedPart.requiredQuantity > selectedPart.part.availableQuantity
                            return (
                              <div
                                key={selectedPart.part.id}
                                className={cn(
                                  "p-4 rounded-xl border",
                                  isShortage
                                    ? "bg-gradient-to-r from-red-50 to-orange-50 border-red-200"
                                    : "bg-gradient-to-r from-slate-50 to-blue-50 border-slate-200",
                                )}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="font-bold text-sm text-slate-800">{selectedPart.part.name}</p>
                                    <p className="text-xs text-slate-600">{selectedPart.part.category}</p>
                                    <p className="text-xs text-slate-500">
                                      Required: {selectedPart.requiredQuantity} {selectedPart.part.unit}
                                    </p>
                                    {isShortage && (
                                      <p className="text-xs text-red-600 font-medium">
                                        ⚠️ Shortage:{" "}
                                        {selectedPart.requiredQuantity - selectedPart.part.availableQuantity}{" "}
                                        {selectedPart.part.unit}
                                      </p>
                                    )}
                                  </div>
                                  <div className="text-right">
                                    <p className="font-bold text-sm text-slate-800">
                                      ₹
                                      {(selectedPart.part.costPerUnit * selectedPart.requiredQuantity).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Team Members Summary */}
                  <Card className="bg-gradient-to-r from-white to-green-50 border-slate-200 rounded-2xl shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center space-x-3 text-xl">
                        <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                        <span>Team Members ({selectedTeamMembers.length})</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedTeamMembers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {selectedTeamMembers.map((member) => (
                            <div
                              key={member.id}
                              className="flex items-center space-x-4 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200"
                            >
                              <Avatar className="h-12 w-12 ring-2 ring-white shadow-md">
                                <AvatarImage src={member.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold">
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-bold text-sm text-slate-800">{member.name}</p>
                                <p className="text-xs text-slate-600 font-medium">{member.role}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {member.skills.slice(0, 2).map((skill) => (
                                    <Badge
                                      key={skill}
                                      variant="outline"
                                      className="text-xs px-2 py-0 border-slate-300 rounded-full bg-white"
                                    >
                                      {skill}
                                    </Badge>
                                  ))}
                                  {member.skills.length > 2 && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs px-2 py-0 border-slate-300 rounded-full bg-white"
                                    >
                                      +{member.skills.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-slate-500 text-center py-8 text-lg">No team members selected</p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Files Summary */}
                  <Card className="bg-gradient-to-r from-white to-orange-50 border-slate-200 rounded-2xl shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center space-x-3 text-xl">
                        <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                          <Upload className="h-5 w-5 text-white" />
                        </div>
                        <span>Files & Attachments</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                          <Camera className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                          <p className="text-3xl font-bold text-purple-600">{photos.length}</p>
                          <p className="text-sm text-slate-600 font-medium">Photos</p>
                          {photos.length > 0 && (
                            <div className="mt-3 text-xs text-slate-500">
                              {photos
                                .map((photo) => photo.name)
                                .slice(0, 2)
                                .join(", ")}
                              {photos.length > 2 && ` +${photos.length - 2} more`}
                            </div>
                          )}
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                          <FileText className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                          <p className="text-3xl font-bold text-blue-600">{attachments.length}</p>
                          <p className="text-sm text-slate-600 font-medium">Attachments</p>
                          {attachments.length > 0 && (
                            <div className="mt-3 text-xs text-slate-500">
                              {attachments
                                .map((file) => file.name)
                                .slice(0, 2)
                                .join(", ")}
                              {attachments.length > 2 && ` +${attachments.length - 2} more`}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Navigation Footer */}
        <div className="flex items-center justify-between pt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="h-12 px-6 rounded-xl border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 disabled:opacity-50"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Previous
          </Button>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="h-12 px-6 rounded-xl border-slate-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
            >
              Cancel
            </Button>

            {currentStep < 6 ? (
              <Button
                onClick={nextStep}
                disabled={!isStepCompleted(currentStep)}
                className="h-12 px-6 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                Next
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleCreateProject}
                disabled={!isStep1Valid()}
                className="h-12 px-8 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                <Check className="h-5 w-5 mr-2" />
                Create Project
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
