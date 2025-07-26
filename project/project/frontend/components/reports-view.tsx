import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Target,
  Download,
  Filter,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  ArrowUpDown,
} from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ReportsView() {
  const projectMetrics = [
    {
      name: "Website Redesign",
      budget: 50000,
      spent: 37500,
      plannedHours: 320,
      actualHours: 285,
      completion: 75,
      status: "On Track",
      variance: -12.5,
    },
    {
      name: "Mobile App",
      budget: 75000,
      spent: 45000,
      plannedHours: 480,
      actualHours: 520,
      completion: 45,
      status: "Over Budget",
      variance: 8.3,
    },
    {
      name: "API Integration",
      budget: 25000,
      spent: 24000,
      plannedHours: 160,
      actualHours: 155,
      completion: 100,
      status: "Completed",
      variance: -3.1,
    },
    {
      name: "Security Audit",
      budget: 30000,
      spent: 8000,
      plannedHours: 200,
      actualHours: 45,
      completion: 20,
      status: "Behind Schedule",
      variance: -77.5,
    },
  ]

  const teamProductivity = [
    { name: "Sarah Chen", tasksCompleted: 45, hoursLogged: 156, efficiency: 92 },
    { name: "Mike Johnson", tasksCompleted: 67, hoursLogged: 178, efficiency: 88 },
    { name: "Emily Davis", tasksCompleted: 23, hoursLogged: 98, efficiency: 95 },
    { name: "Alex Rodriguez", tasksCompleted: 89, hoursLogged: 201, efficiency: 85 },
    { name: "Lisa Wang", tasksCompleted: 34, hoursLogged: 134, efficiency: 90 },
  ]

  const taskDependencies = [
    {
      id: "TASK-001",
      name: "Database Schema Design",
      status: "In Progress",
      dependentOn: "TASK-003",
      dependentName: "Requirements Analysis",
      dependentStatus: "Completed",
      isBlocked: false,
      isDelayed: false,
      priority: "High",
      assignee: "Sarah Chen",
    },
    {
      id: "TASK-002",
      name: "API Development",
      status: "Blocked",
      dependentOn: "TASK-001",
      dependentName: "Database Schema Design",
      dependentStatus: "In Progress",
      isBlocked: true,
      isDelayed: true,
      priority: "High",
      assignee: "Mike Johnson",
    },
    {
      id: "TASK-004",
      name: "Frontend Integration",
      status: "Not Started",
      dependentOn: "TASK-002",
      dependentName: "API Development",
      dependentStatus: "Blocked",
      isBlocked: true,
      isDelayed: false,
      priority: "Medium",
      assignee: "Emily Davis",
    },
    {
      id: "TASK-005",
      name: "Testing Suite",
      status: "In Progress",
      dependentOn: "TASK-004",
      dependentName: "Frontend Integration",
      dependentStatus: "Not Started",
      isBlocked: false,
      isDelayed: true,
      priority: "Medium",
      assignee: "Alex Rodriguez",
    },
  ]

  const teamPerformanceData = [
    {
      name: "Sarah Chen",
      completionRate: 92,
      avgTaskDuration: 3.2,
      overdueTasks: 1,
      totalTasks: 45,
      status: "on-track",
    },
    {
      name: "Mike Johnson",
      completionRate: 88,
      avgTaskDuration: 4.1,
      overdueTasks: 3,
      totalTasks: 67,
      status: "needs-attention",
    },
    {
      name: "Emily Davis",
      completionRate: 95,
      avgTaskDuration: 2.8,
      overdueTasks: 0,
      totalTasks: 23,
      status: "on-track",
    },
    {
      name: "Alex Rodriguez",
      completionRate: 78,
      avgTaskDuration: 5.2,
      overdueTasks: 8,
      totalTasks: 89,
      status: "behind-schedule",
    },
    {
      name: "Lisa Wang",
      completionRate: 90,
      avgTaskDuration: 3.5,
      overdueTasks: 2,
      totalTasks: 34,
      status: "on-track",
    },
  ]

  const budgetData = [
    { month: "Jan", planned: 45000, actual: 42000 },
    { month: "Feb", planned: 50000, actual: 48000 },
    { month: "Mar", planned: 55000, actual: 58000 },
    { month: "Apr", planned: 48000, actual: 52000 },
    { month: "May", planned: 52000, actual: 49000 },
    { month: "Jun", planned: 60000, actual: 63000 },
  ]

  const taskCompletionTrend = [
    { week: "Week 1", completed: 12, date: "Jan 1-7" },
    { week: "Week 2", completed: 18, date: "Jan 8-14" },
    { week: "Week 3", completed: 15, date: "Jan 15-21" },
    { week: "Week 4", completed: 22, date: "Jan 22-28" },
    { week: "Week 5", completed: 19, date: "Feb 1-7" },
    { week: "Week 6", completed: 25, date: "Feb 8-14" },
    { week: "Week 7", completed: 21, date: "Feb 15-21" },
    { week: "Week 8", completed: 28, date: "Feb 22-28" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track":
        return "secondary"
      case "Completed":
        return "outline"
      case "Over Budget":
        return "destructive"
      case "Behind Schedule":
        return "destructive"
      default:
        return "default"
    }
  }

  const getPerformanceColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "text-green-600"
      case "needs-attention":
        return "text-yellow-600"
      case "behind-schedule":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getPerformanceBackground = (status: string) => {
    switch (status) {
      case "on-track":
        return "bg-green-100"
      case "needs-attention":
        return "bg-yellow-100"
      case "behind-schedule":
        return "bg-red-100"
      default:
        return "bg-gray-100"
    }
  }

  const getDependencyStatusIcon = (task: any) => {
    if (task.isBlocked) return <XCircle className="h-4 w-4 text-red-500" />
    if (task.isDelayed) return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    if (task.status === "Completed") return <CheckCircle className="h-4 w-4 text-green-500" />
    return <Clock className="h-4 w-4 text-blue-500" />
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights into project performance and team productivity</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+5%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Efficiency</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">90%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Delivery</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">83%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+7%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Project Performance</TabsTrigger>
          <TabsTrigger value="team">Team Analytics</TabsTrigger>
          <TabsTrigger value="budget">Budget Analysis</TabsTrigger>
          <TabsTrigger value="time">Time Reports</TabsTrigger>
          <TabsTrigger value="dependencies">Task Dependencies</TabsTrigger>
          <TabsTrigger value="performance">Team Performance</TabsTrigger>
          <TabsTrigger value="spending">Budget vs Actual</TabsTrigger>
          <TabsTrigger value="trends">Completion Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Performance Overview</CardTitle>
              <CardDescription>Detailed analysis of project metrics and KPIs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {projectMetrics.map((project) => (
                  <div key={project.name} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-medium">{project.name}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant={getStatusColor(project.status)}>{project.status}</Badge>
                          <span className={`text-sm ${project.variance < 0 ? "text-green-600" : "text-red-600"}`}>
                            {project.variance > 0 ? "+" : ""}
                            {project.variance}% variance
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{project.completion}%</div>
                        <div className="text-sm text-muted-foreground">Complete</div>
                      </div>
                    </div>

                    <Progress value={project.completion} className="h-2" />

                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Budget</div>
                        <div className="font-medium">
                          ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Hours</div>
                        <div className="font-medium">
                          {project.actualHours}h / {project.plannedHours}h
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Budget Used</div>
                        <div className="font-medium">{Math.round((project.spent / project.budget) * 100)}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Time Used</div>
                        <div className="font-medium">
                          {Math.round((project.actualHours / project.plannedHours) * 100)}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Productivity</CardTitle>
                <CardDescription>Individual team member performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamProductivity.map((member) => (
                    <div key={member.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{member.name}</span>
                        <span className="text-sm text-muted-foreground">{member.efficiency}% efficiency</span>
                      </div>
                      <Progress value={member.efficiency} className="h-2" />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{member.tasksCompleted} tasks completed</span>
                        <span>{member.hoursLogged}h logged</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Task Completion Trends</CardTitle>
                <CardDescription>Weekly task completion rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Week 1</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "85%" }} />
                      </div>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Week 2</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "92%" }} />
                      </div>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Week 3</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "78%" }} />
                      </div>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Week 4</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "88%" }} />
                      </div>
                      <span className="text-sm font-medium">88%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="budget" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Budget vs Actual Spending</CardTitle>
                <CardDescription>Comparison of planned vs actual project costs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectMetrics.map((project) => (
                    <div key={project.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{project.name}</span>
                        <span className="text-sm">
                          ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                        </span>
                      </div>
                      <div className="relative">
                        <Progress value={(project.spent / project.budget) * 100} className="h-3" />
                        <div className="absolute top-0 right-0 text-xs text-muted-foreground">
                          {Math.round((project.spent / project.budget) * 100)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Breakdown</CardTitle>
                <CardDescription>Distribution of costs across categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Development</span>
                      <span className="font-medium">$85,000</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "60%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Design</span>
                      <span className="font-medium">$25,000</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "18%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Testing</span>
                      <span className="font-medium">$15,000</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "11%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Infrastructure</span>
                      <span className="font-medium">$15,000</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: "11%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="time" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Time Allocation</CardTitle>
                <CardDescription>How time is distributed across projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Website Redesign</span>
                      <span className="font-medium">285h</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "35%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Mobile App</span>
                      <span className="font-medium">520h</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "64%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>API Integration</span>
                      <span className="font-medium">155h</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "19%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Security Audit</span>
                      <span className="font-medium">45h</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: "6%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billable vs Non-Billable Hours</CardTitle>
                <CardDescription>Breakdown of billable time across the team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">87%</div>
                    <div className="text-sm text-muted-foreground">Billable Hours</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Billable</span>
                      <span>870h</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div className="bg-green-600 h-3 rounded-full" style={{ width: "87%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Non-Billable</span>
                      <span>130h</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div className="bg-gray-400 h-3 rounded-full" style={{ width: "13%" }} />
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between font-medium">
                      <span>Total Hours</span>
                      <span>1,000h</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="dependencies" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Task Dependencies</CardTitle>
                  <CardDescription>Tasks with dependencies and their current status</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tasks</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                      <SelectItem value="delayed">Delayed</SelectItem>
                      <SelectItem value="on-track">On Track</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    Sort
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {taskDependencies.map((task) => (
                  <div key={task.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getDependencyStatusIcon(task)}
                        <div>
                          <h4 className="font-medium">{task.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {task.id} • {task.assignee}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={task.priority === "High" ? "destructive" : "secondary"}>{task.priority}</Badge>
                        <Badge variant={getStatusColor(task.status)}>{task.status}</Badge>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Depends on:</p>
                          <p className="text-sm text-muted-foreground">
                            {task.dependentName} ({task.dependentOn})
                          </p>
                        </div>
                        <Badge variant={getStatusColor(task.dependentStatus)}>{task.dependentStatus}</Badge>
                      </div>
                    </div>

                    {(task.isBlocked || task.isDelayed) && (
                      <div className="flex items-center space-x-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <span className="text-yellow-700">
                          {task.isBlocked ? "Task is blocked" : "Task is delayed"} -
                          {task.isBlocked ? " waiting for dependency completion" : " dependency behind schedule"}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance Comparison</CardTitle>
              <CardDescription>Comprehensive analysis of team member performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Task Completion Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {teamPerformanceData.map((member) => (
                          <div key={member.name} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{member.name}</span>
                              <span className={`text-sm font-bold ${getPerformanceColor(member.status)}`}>
                                {member.completionRate}%
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  member.status === "on-track"
                                    ? "bg-green-500"
                                    : member.status === "needs-attention"
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                                style={{ width: `${member.completionRate}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Average Task Duration (Days)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {teamPerformanceData.map((member) => (
                          <div key={member.name} className="flex items-center justify-between py-2">
                            <span className="text-sm font-medium">{member.name}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-muted rounded-full h-2">
                                <div
                                  className="bg-blue-500 h-2 rounded-full"
                                  style={{ width: `${Math.min((member.avgTaskDuration / 6) * 100, 100)}%` }}
                                />
                              </div>
                              <span className="text-sm font-bold w-8">{member.avgTaskDuration}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Overdue Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {teamPerformanceData.map((member) => (
                          <div key={member.name} className="flex items-center justify-between py-2">
                            <span className="text-sm font-medium">{member.name}</span>
                            <div className="flex items-center space-x-2">
                              <span
                                className={`text-sm font-bold ${
                                  member.overdueTasks === 0
                                    ? "text-green-600"
                                    : member.overdueTasks <= 2
                                      ? "text-yellow-600"
                                      : "text-red-600"
                                }`}
                              >
                                {member.overdueTasks}
                              </span>
                              <span className="text-xs text-muted-foreground">/ {member.totalTasks}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {teamPerformanceData.map((member) => (
                        <div key={member.name} className={`p-3 rounded-lg ${getPerformanceBackground(member.status)}`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  member.status === "on-track"
                                    ? "bg-green-500"
                                    : member.status === "needs-attention"
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                              />
                              <span className="font-medium">{member.name}</span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm">
                              <span>
                                Completion: <strong>{member.completionRate}%</strong>
                              </span>
                              <span>
                                Avg Duration: <strong>{member.avgTaskDuration}d</strong>
                              </span>
                              <span>
                                Overdue: <strong>{member.overdueTasks}</strong>
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="spending" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Budget vs Actual Spending</CardTitle>
                  <CardDescription>Monthly comparison of planned budget and actual expenditure</CardDescription>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">$310K</div>
                    <div className="text-muted-foreground">Total Budget</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600">$312K</div>
                    <div className="text-muted-foreground">Amount Spent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600">-$2K</div>
                    <div className="text-muted-foreground">Remaining</div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  planned: {
                    label: "Planned Budget",
                    color: "hsl(var(--chart-1))",
                  },
                  actual: {
                    label: "Actual Spending",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={budgetData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="planned" fill="var(--color-planned)" name="Planned Budget" />
                    <Bar dataKey="actual" fill="var(--color-actual)" name="Actual Spending" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>

              <div className="mt-6 grid grid-cols-2 lg:grid-cols-6 gap-4">
                {budgetData.map((item) => (
                  <div key={item.month} className="text-center">
                    <div className="text-sm font-medium">{item.month}</div>
                    <div className="text-xs text-muted-foreground">${item.planned.toLocaleString()} planned</div>
                    <div
                      className={`text-xs font-medium ${
                        item.actual > item.planned ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      ${item.actual.toLocaleString()} actual
                    </div>
                    {item.actual > item.planned && (
                      <div className="text-xs text-red-600 font-medium">
                        +${(item.actual - item.planned).toLocaleString()} over
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Task Completion Trends</CardTitle>
                  <CardDescription>Weekly task completion over time</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="8weeks">
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Time Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4weeks">Last 4 Weeks</SelectItem>
                      <SelectItem value="8weeks">Last 8 Weeks</SelectItem>
                      <SelectItem value="12weeks">Last 12 Weeks</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Team Member" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Members</SelectItem>
                      <SelectItem value="sarah">Sarah Chen</SelectItem>
                      <SelectItem value="mike">Mike Johnson</SelectItem>
                      <SelectItem value="emily">Emily Davis</SelectItem>
                      <SelectItem value="alex">Alex Rodriguez</SelectItem>
                      <SelectItem value="lisa">Lisa Wang</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  completed: {
                    label: "Tasks Completed",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={taskCompletionTrend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      labelFormatter={(label, payload) => {
                        const data = payload?.[0]?.payload
                        return data ? `${label} (${data.date})` : label
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="completed"
                      stroke="var(--color-completed)"
                      strokeWidth={3}
                      dot={{ fill: "var(--color-completed)", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Tasks Completed"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>

              <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-green-600">160</div>
                    <div className="text-sm text-muted-foreground">Total Completed</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-blue-600">20</div>
                    <div className="text-sm text-muted-foreground">Weekly Average</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-purple-600">28</div>
                    <div className="text-sm text-muted-foreground">Best Week</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-orange-600">+40%</div>
                    <div className="text-sm text-muted-foreground">Trend Growth</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
