import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, Clock, Users, CheckCircle, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Dashboard() {
  const stats = [
    { title: "Active Projects", value: "12", change: "+2", icon: BarChart3, color: "text-blue-600" },
    { title: "Tasks Completed", value: "89", change: "+12", icon: CheckCircle, color: "text-green-600" },
    { title: "Team Members", value: "24", change: "+3", icon: Users, color: "text-purple-600" },
    { title: "Hours Logged", value: "156", change: "+8", icon: Clock, color: "text-orange-600" },
  ]

  const recentTasks = [
    {
      id: 1,
      title: "Design homepage mockup",
      project: "Website Redesign",
      assignee: "Sarah Chen",
      status: "In Progress",
      priority: "High",
    },
    {
      id: 2,
      title: "API endpoint testing",
      project: "Mobile App",
      assignee: "Mike Johnson",
      status: "Review",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Database optimization",
      project: "Backend Upgrade",
      assignee: "Alex Rodriguez",
      status: "Done",
      priority: "High",
    },
    {
      id: 4,
      title: "User authentication flow",
      project: "Security Update",
      assignee: "Emily Davis",
      status: "To Do",
      priority: "Low",
    },
  ]

  const projects = [
    { name: "Website Redesign", progress: 75, status: "On Track", dueDate: "2024-02-15", team: 8 },
    { name: "Mobile App", progress: 45, status: "At Risk", dueDate: "2024-03-01", team: 6 },
    { name: "API Integration", progress: 90, status: "Ahead", dueDate: "2024-01-30", team: 4 },
    { name: "Security Audit", progress: 20, status: "Behind", dueDate: "2024-02-28", team: 3 },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your projects.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
            <CardDescription>Current status of active projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.map((project) => (
              <div key={project.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{project.name}</span>
                    <Badge
                      variant={
                        project.status === "On Track"
                          ? "default"
                          : project.status === "Ahead"
                            ? "secondary"
                            : project.status === "At Risk"
                              ? "destructive"
                              : "outline"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{project.team} team members</span>
                  <span>Due: {project.dueDate}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>Latest task updates across all projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{task.title}</p>
                    <p className="text-sm text-muted-foreground">{task.project}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        task.status === "Done"
                          ? "secondary"
                          : task.status === "In Progress"
                            ? "default"
                            : task.status === "Review"
                              ? "outline"
                              : "destructive"
                      }
                    >
                      {task.status}
                    </Badge>
                    <Badge
                      variant={
                        task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "outline"
                      }
                    >
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates from your team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm">
                  <span className="font-medium">Sarah Chen</span> completed task "Design homepage mockup"
                </p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>MJ</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm">
                  <span className="font-medium">Mike Johnson</span> added a comment to "API endpoint testing"
                </p>
                <p className="text-xs text-muted-foreground">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm">
                  <span className="font-medium">Alex Rodriguez</span> created new project "Security Audit"
                </p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
