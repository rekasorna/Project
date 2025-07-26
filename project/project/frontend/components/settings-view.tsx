"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Settings, Plus, Trash2, Edit } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function SettingsView() {
  const [customFields, setCustomFields] = useState([
    { id: 1, name: "Priority Level", type: "picklist", options: ["Low", "Medium", "High", "Critical"] },
    { id: 2, name: "Client Contact", type: "text", options: [] },
    { id: 3, name: "Estimated Budget", type: "number", options: [] },
    { id: 4, name: "Due Date", type: "date", options: [] },
  ])

  const [workflows, setWorkflows] = useState([
    { id: 1, name: "Task Assignment", trigger: "Task Created", action: "Send Notification", active: true },
    { id: 2, name: "Project Completion", trigger: "All Tasks Done", action: "Generate Report", active: true },
    { id: 3, name: "Overdue Alert", trigger: "Task Overdue", action: "Email Manager", active: false },
  ])

  const [userRoles, setUserRoles] = useState([
    { id: 1, name: "Admin", permissions: ["All"], users: 2 },
    { id: 2, name: "Project Manager", permissions: ["Projects", "Tasks", "Team"], users: 3 },
    { id: 3, name: "Developer", permissions: ["Tasks", "Time Tracking"], users: 8 },
    { id: 4, name: "Client", permissions: ["View Only"], users: 5 },
  ])

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Configure your project management workspace</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="customization">Custom Fields</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="users">Users & Roles</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Organization Settings</CardTitle>
                <CardDescription>Basic information about your organization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input id="org-name" defaultValue="GETS Group" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-domain">Custom Domain</Label>
                  <Input id="org-domain" placeholder="projects.gets.co.in" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="ist">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                      <SelectItem value="pst">Pacific Standard Time</SelectItem>
                      <SelectItem value="est">Eastern Standard Time</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select defaultValue="inr">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inr">INR (₹)</SelectItem>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Defaults</CardTitle>
                <CardDescription>Default settings for new projects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="default-view">Default Project View</Label>
                  <Select defaultValue="kanban">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kanban">Kanban Board</SelectItem>
                      <SelectItem value="list">List View</SelectItem>
                      <SelectItem value="gantt">Gantt Chart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-status">Default Task Status</Label>
                  <Select defaultValue="planning">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="backlog">Backlog</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-assign tasks</Label>
                    <p className="text-sm text-muted-foreground">Automatically assign tasks to project members</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable time tracking</Label>
                    <p className="text-sm text-muted-foreground">Enable time tracking for all new projects</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button>Save Defaults</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Fields</CardTitle>
              <CardDescription>Create custom fields for projects and tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Existing Fields</h3>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Field
                  </Button>
                </div>
                <div className="space-y-3">
                  {customFields.map((field) => (
                    <div key={field.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{field.name}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{field.type}</Badge>
                          {field.options.length > 0 && (
                            <span className="text-sm text-muted-foreground">{field.options.length} options</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Statuses</CardTitle>
              <CardDescription>Define custom statuses for your workflow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input placeholder="Status name" />
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="yellow">Yellow</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>Add Status</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge>Planning</Badge>
                  <Badge>In Progress</Badge>
                  <Badge>Review</Badge>
                  <Badge>Completed</Badge>
                  <Badge variant="outline">On Hold</Badge>
                  <Badge variant="destructive">Blocked</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Automation</CardTitle>
              <CardDescription>Automate repetitive tasks and processes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Active Workflows</h3>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Workflow
                  </Button>
                </div>
                <div className="space-y-3">
                  {workflows.map((workflow) => (
                    <div key={workflow.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{workflow.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          When {workflow.trigger} → {workflow.action}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch checked={workflow.active} />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Edit Workflow</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SLA Management</CardTitle>
              <CardDescription>Set up service level agreements for issue escalation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Critical Issues</Label>
                  <Select defaultValue="1h">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30m">30 minutes</SelectItem>
                      <SelectItem value="1h">1 hour</SelectItem>
                      <SelectItem value="2h">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>High Priority</Label>
                  <Select defaultValue="4h">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2h">2 hours</SelectItem>
                      <SelectItem value="4h">4 hours</SelectItem>
                      <SelectItem value="8h">8 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Medium Priority</Label>
                  <Select defaultValue="24h">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8h">8 hours</SelectItem>
                      <SelectItem value="24h">24 hours</SelectItem>
                      <SelectItem value="48h">48 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Low Priority</Label>
                  <Select defaultValue="72h">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="48h">48 hours</SelectItem>
                      <SelectItem value="72h">72 hours</SelectItem>
                      <SelectItem value="1w">1 week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button>Save SLA Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Roles</CardTitle>
              <CardDescription>Manage user roles and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Existing Roles</h3>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Role
                  </Button>
                </div>
                <div className="space-y-3">
                  {userRoles.map((role) => (
                    <div key={role.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{role.name}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">{role.permissions.join(", ")}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline">{role.users} users</Badge>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Invite Users</CardTitle>
              <CardDescription>Invite new users to your workspace</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input placeholder="Email address" />
                <Select defaultValue="developer">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Project Manager</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                  </SelectContent>
                </Select>
                <Button>Invite</Button>
              </div>
              <div className="text-sm text-muted-foreground">
                Users will receive an email invitation to join your workspace.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-tasks">Task assignments</Label>
                    <Switch id="email-tasks" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-mentions">Mentions</Label>
                    <Switch id="email-mentions" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-updates">Project updates</Label>
                    <Switch id="email-updates" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-reminders">Due date reminders</Label>
                    <Switch id="email-reminders" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">In-App Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-tasks">Task assignments</Label>
                    <Switch id="app-tasks" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-mentions">Mentions</Label>
                    <Switch id="app-mentions" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-updates">Project updates</Label>
                    <Switch id="app-updates" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-reminders">Due date reminders</Label>
                    <Switch id="app-reminders" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Schedule</h3>
                <div className="space-y-2">
                  <Label>Daily digest time</Label>
                  <Select defaultValue="9am">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9am">9:00 AM</SelectItem>
                      <SelectItem value="12pm">12:00 PM</SelectItem>
                      <SelectItem value="5pm">5:00 PM</SelectItem>
                      <SelectItem value="off">Turn off digest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connected Services</CardTitle>
              <CardDescription>Manage integrations with external services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.251 12l-4.252-4.251v2.251h-11.999v-2.251l-4.252 4.251 4.252 4.251v-2.251h11.999v2.251z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">GitHub</h4>
                    <p className="text-sm text-muted-foreground">Connect your repositories</p>
                  </div>
                </div>
                <Button variant="outline">Connect</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3h-14c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm-7 2h1v5h-1v-5zm-1 7.25c0-.69.56-1.25 1.25-1.25s1.25.56 1.25 1.25-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25zm5 7.75h-10v-1.24c0-1.51 3.34-2.26 5-2.26s5 .75 5 2.26v1.24z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Slack</h4>
                    <p className="text-sm text-muted-foreground">Get notifications in your channels</p>
                  </div>
                </div>
                <Button variant="outline">Connect</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.586 10.461l-10.05 10.075c-1.95 1.949-5.122 1.949-7.071 0s-1.95-5.122 0-7.072l10.628-10.585c1.17-1.17 3.073-1.17 4.243 0 1.169 1.17 1.17 3.072 0 4.242l-8.507 8.464c-.39.39-1.024.39-1.414 0s-.39-1.024 0-1.414l7.093-7.05-1.415-1.414-7.093 7.049c-1.172 1.172-1.171 3.073 0 4.244s3.071 1.171 4.242 0l8.507-8.464c.977-.977 1.464-2.256 1.464-3.536 0-2.769-2.246-4.999-5-4.999-1.28 0-2.559.488-3.536 1.465l-10.627 10.583c-1.366 1.368-2.05 3.159-2.05 4.951 0 3.863 3.13 7 7 7 1.792 0 3.583-.684 4.95-2.05l10.05-10.075-1.414-1.414z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Google Drive</h4>
                    <p className="text-sm text-muted-foreground">Attach files from Google Drive</p>
                  </div>
                </div>
                <Button variant="outline">Connect</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0 18c4.411 0 8-3.589 8-8s-3.589-8-8-8-8 3.589-8 8 3.589 8 8 8zm-3-8c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Zoom</h4>
                    <p className="text-sm text-muted-foreground">Schedule meetings from tasks</p>
                  </div>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>Manage API keys for programmatic access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">API Key</h4>
                  <p className="text-sm text-muted-foreground">Use this key to authenticate API requests</p>
                </div>
                <Button variant="outline">Generate Key</Button>
              </div>
              <div className="text-sm text-muted-foreground">
                No API keys have been generated yet. Click the button to create one.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
