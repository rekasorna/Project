"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Plus, Search, MoreHorizontal, Mail, MapPin, Clock, TrendingUp, MessageSquare, Video } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function TeamView() {
  const [searchTerm, setSearchTerm] = useState("")

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah.chen@company.com",
      phone: "+1 (555) 123-4567",
      role: "Senior UI/UX Designer",
      department: "Design",
      location: "San Francisco, CA",
      avatar: "/placeholder.svg?height=64&width=64",
      status: "Online",
      joinDate: "2023-01-15",
      currentProjects: ["Website Redesign", "Mobile App"],
      tasksCompleted: 45,
      totalTasks: 52,
      hoursThisWeek: 38,
      utilization: 95,
      skills: ["UI Design", "Prototyping", "User Research"],
      recentActivity: "Completed homepage mockup design",
    },
    {
      id: 2,
      name: "Mike Johnson",
      email: "mike.johnson@company.com",
      phone: "+1 (555) 234-5678",
      role: "Full Stack Developer",
      department: "Engineering",
      location: "Austin, TX",
      avatar: "/placeholder.svg?height=64&width=64",
      status: "Away",
      joinDate: "2022-08-20",
      currentProjects: ["Mobile App", "API Integration"],
      tasksCompleted: 67,
      totalTasks: 71,
      hoursThisWeek: 42,
      utilization: 105,
      skills: ["React", "Node.js", "PostgreSQL"],
      recentActivity: "Fixed authentication bug in mobile app",
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily.davis@company.com",
      phone: "+1 (555) 345-6789",
      role: "DevOps Engineer",
      department: "Engineering",
      location: "Seattle, WA",
      avatar: "/placeholder.svg?height=64&width=64",
      status: "Online",
      joinDate: "2023-03-10",
      currentProjects: ["Security Audit", "Infrastructure"],
      tasksCompleted: 23,
      totalTasks: 28,
      hoursThisWeek: 35,
      utilization: 88,
      skills: ["AWS", "Docker", "Kubernetes"],
      recentActivity: "Deployed new security patches",
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      email: "alex.rodriguez@company.com",
      phone: "+1 (555) 456-7890",
      role: "Backend Developer",
      department: "Engineering",
      location: "New York, NY",
      avatar: "/placeholder.svg?height=64&width=64",
      status: "Busy",
      joinDate: "2022-11-05",
      currentProjects: ["API Integration", "Database Optimization"],
      tasksCompleted: 89,
      totalTasks: 95,
      hoursThisWeek: 40,
      utilization: 100,
      skills: ["Python", "Django", "Redis"],
      recentActivity: "Optimized database queries for 40% performance improvement",
    },
    {
      id: 5,
      name: "Lisa Wang",
      email: "lisa.wang@company.com",
      phone: "+1 (555) 567-8901",
      role: "Product Manager",
      department: "Product",
      location: "Los Angeles, CA",
      avatar: "/placeholder.svg?height=64&width=64",
      status: "Online",
      joinDate: "2023-02-01",
      currentProjects: ["Mobile App", "Website Redesign"],
      tasksCompleted: 34,
      totalTasks: 38,
      hoursThisWeek: 36,
      utilization: 90,
      skills: ["Product Strategy", "Analytics", "Agile"],
      recentActivity: "Reviewed user feedback for mobile app features",
    },
  ]

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Online":
        return "bg-green-500"
      case "Away":
        return "bg-yellow-500"
      case "Busy":
        return "bg-red-500"
      case "Offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 100) return "text-red-600"
    if (utilization >= 90) return "text-yellow-600"
    return "text-green-600"
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team</h1>
          <p className="text-muted-foreground">Manage team members and track their progress</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="grid" className="space-y-4">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="workload">Workload</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background ${getStatusColor(member.status)}`}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <CardDescription>{member.role}</CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Video className="h-4 w-4 mr-2" />
                          Video Call
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Email
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Task Completion</span>
                      <span>{Math.round((member.tasksCompleted / member.totalTasks) * 100)}%</span>
                    </div>
                    <Progress value={(member.tasksCompleted / member.totalTasks) * 100} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {member.tasksCompleted} of {member.totalTasks} tasks completed
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{member.hoursThisWeek}h this week</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className={getUtilizationColor(member.utilization)}>{member.utilization}% utilized</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{member.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{member.email}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Current Projects</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.currentProjects.map((project) => (
                        <Badge key={project} variant="outline" className="text-xs">
                          {project}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Recent:</span> {member.recentActivity}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Complete list of all team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`}
                        />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {member.role} • {member.department}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{member.location}</span>
                          <span>{member.hoursThisWeek}h this week</span>
                          <span className={getUtilizationColor(member.utilization)}>
                            {member.utilization}% utilized
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {member.tasksCompleted}/{member.totalTasks} tasks
                        </div>
                        <Progress value={(member.tasksCompleted / member.totalTasks) * 100} className="h-1 w-20" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Assign Task</DropdownMenuItem>
                            <DropdownMenuItem>View Workload</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Workload Analysis</CardTitle>
              <CardDescription>Monitor team capacity and resource allocation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredMembers.map((member) => (
                  <div key={member.id} className="space-y-3">
                    <div className="flex items-center justify-between">
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
                          <h3 className="font-medium">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{member.hoursThisWeek}h / 40h</div>
                        <div className={`text-xs ${getUtilizationColor(member.utilization)}`}>
                          {member.utilization}% capacity
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Weekly Capacity</span>
                        <span>{member.utilization}%</span>
                      </div>
                      <Progress
                        value={member.utilization}
                        className={`h-3 ${
                          member.utilization > 100
                            ? "[&>div]:bg-red-500"
                            : member.utilization > 90
                              ? "[&>div]:bg-yellow-500"
                              : "[&>div]:bg-green-500"
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="font-medium">{member.currentProjects.length}</div>
                        <div className="text-muted-foreground">Active Projects</div>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="font-medium">{member.totalTasks - member.tasksCompleted}</div>
                        <div className="text-muted-foreground">Pending Tasks</div>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="font-medium">
                          {Math.round((member.tasksCompleted / member.totalTasks) * 100)}%
                        </div>
                        <div className="text-muted-foreground">Completion Rate</div>
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
