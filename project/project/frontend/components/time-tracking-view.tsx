"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Pause, Square, Clock, Calendar, DollarSign, TrendingUp, Download, Filter } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function TimeTrackingView() {
  const [isTracking, setIsTracking] = useState(false)
  const [currentTask, setCurrentTask] = useState("")
  const [elapsedTime, setElapsedTime] = useState(0)

  const timeEntries = [
    {
      id: 1,
      user: { name: "Sarah Chen", avatar: "/placeholder.svg?height=32&width=32" },
      project: "Website Redesign",
      task: "Design homepage mockup",
      date: "2024-01-24",
      startTime: "09:00",
      endTime: "12:30",
      duration: 3.5,
      billable: true,
      rate: 85,
      status: "Approved",
    },
    {
      id: 2,
      user: { name: "Mike Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      project: "Mobile App",
      task: "API endpoint testing",
      date: "2024-01-24",
      startTime: "10:00",
      endTime: "16:00",
      duration: 6,
      billable: true,
      rate: 95,
      status: "Pending",
    },
    {
      id: 3,
      user: { name: "Alex Rodriguez", avatar: "/placeholder.svg?height=32&width=32" },
      project: "Backend Upgrade",
      task: "Database optimization",
      date: "2024-01-23",
      startTime: "14:00",
      endTime: "18:00",
      duration: 4,
      billable: true,
      rate: 90,
      status: "Approved",
    },
    {
      id: 4,
      user: { name: "Emily Davis", avatar: "/placeholder.svg?height=32&width=32" },
      project: "Security Audit",
      task: "Vulnerability assessment",
      date: "2024-01-23",
      startTime: "09:30",
      endTime: "13:30",
      duration: 4,
      billable: true,
      rate: 100,
      status: "Approved",
    },
  ]

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const totalHours = timeEntries.reduce((sum, entry) => sum + entry.duration, 0)
  const billableHours = timeEntries.filter((entry) => entry.billable).reduce((sum, entry) => sum + entry.duration, 0)
  const totalRevenue = timeEntries
    .filter((entry) => entry.billable)
    .reduce((sum, entry) => sum + entry.duration * entry.rate, 0)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Time Tracking</h1>
          <p className="text-muted-foreground">Track time, manage timesheets, and monitor productivity</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Timesheet
        </Button>
      </div>

      {/* Time Tracker Widget */}
      <Card>
        <CardHeader>
          <CardTitle>Active Timer</CardTitle>
          <CardDescription>Track time for your current task</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-3xl font-mono font-bold">{formatTime(elapsedTime)}</div>
              <div className="space-y-2">
                <Input
                  placeholder="What are you working on?"
                  value={currentTask}
                  onChange={(e) => setCurrentTask(e.target.value)}
                  className="w-64"
                />
                <Select>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website Redesign</SelectItem>
                    <SelectItem value="mobile">Mobile App</SelectItem>
                    <SelectItem value="api">API Integration</SelectItem>
                    <SelectItem value="security">Security Audit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!isTracking ? (
                <Button onClick={() => setIsTracking(true)} size="lg">
                  <Play className="h-5 w-5 mr-2" />
                  Start
                </Button>
              ) : (
                <>
                  <Button onClick={() => setIsTracking(false)} variant="outline" size="lg">
                    <Pause className="h-5 w-5 mr-2" />
                    Pause
                  </Button>
                  <Button
                    onClick={() => {
                      setIsTracking(false)
                      setElapsedTime(0)
                    }}
                    variant="destructive"
                    size="lg"
                  >
                    <Square className="h-5 w-5 mr-2" />
                    Stop
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHours}h</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Billable Hours</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{billableHours}h</div>
            <p className="text-xs text-muted-foreground">{Math.round((billableHours / totalHours) * 100)}% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From billable hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${Math.round(totalRevenue / billableHours)}/h</div>
            <p className="text-xs text-muted-foreground">Hourly rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="timesheet" className="space-y-4">
        <TabsList>
          <TabsTrigger value="timesheet">Timesheet</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
        </TabsList>

        <TabsContent value="timesheet" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Time Entries</h3>
            <div className="flex items-center space-x-2">
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Entries</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="p-4 font-medium">User</th>
                      <th className="p-4 font-medium">Project</th>
                      <th className="p-4 font-medium">Task</th>
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium">Time</th>
                      <th className="p-4 font-medium">Duration</th>
                      <th className="p-4 font-medium">Rate</th>
                      <th className="p-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeEntries.map((entry) => (
                      <tr key={entry.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={entry.user.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">
                                {entry.user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{entry.user.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm">{entry.project}</td>
                        <td className="p-4 text-sm">{entry.task}</td>
                        <td className="p-4 text-sm">{entry.date}</td>
                        <td className="p-4 text-sm">
                          {entry.startTime} - {entry.endTime}
                        </td>
                        <td className="p-4 text-sm font-medium">{entry.duration}h</td>
                        <td className="p-4 text-sm">${entry.rate}/h</td>
                        <td className="p-4">
                          <Badge
                            variant={
                              entry.status === "Approved"
                                ? "secondary"
                                : entry.status === "Pending"
                                  ? "outline"
                                  : "destructive"
                            }
                          >
                            {entry.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Summary</CardTitle>
                <CardDescription>Time tracking summary for this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Monday</span>
                    <span className="font-medium">8.5h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tuesday</span>
                    <span className="font-medium">7.0h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Wednesday</span>
                    <span className="font-medium">8.0h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Thursday</span>
                    <span className="font-medium">6.5h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Friday</span>
                    <span className="font-medium">7.5h</span>
                  </div>
                  <div className="border-t pt-2 flex items-center justify-between font-medium">
                    <span>Total</span>
                    <span>37.5h</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Breakdown</CardTitle>
                <CardDescription>Time distribution across projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Website Redesign</span>
                      <span className="font-medium">15.5h</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "41%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Mobile App</span>
                      <span className="font-medium">12.0h</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "32%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>API Integration</span>
                      <span className="font-medium">6.0h</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "16%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Security Audit</span>
                      <span className="font-medium">4.0h</span>
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

        <TabsContent value="approvals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>Time entries waiting for approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeEntries
                  .filter((entry) => entry.status === "Pending")
                  .map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={entry.user.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {entry.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{entry.user.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {entry.project} - {entry.task}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {entry.date} • {entry.duration}h • ${entry.rate}/h
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          Reject
                        </Button>
                        <Button size="sm">Approve</Button>
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
