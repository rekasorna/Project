"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, User, FileText, MessageSquare, Activity, Paperclip, LinkIcon, Plus } from "lucide-react"

interface TaskDetailSidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: any
  onStatusChange?: (taskId: number, newStatus: string) => void
}

export function TaskDetailSidebar({ open, onOpenChange, task, onStatusChange }: TaskDetailSidebarProps) {
  const [activeTab, setActiveTab] = useState("details")
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "John Doe",
      content:
        "We need to make sure the charging system is compatible with both CCS2 and Type-2 standards as per the latest regulations.",
      timestamp: "2 days ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ])

  if (!task) return null

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "Current User",
        content: newComment,
        timestamp: "Just now",
        avatar: "/placeholder.svg?height=32&width=32",
      }
      setComments([...comments, comment])
      setNewComment("")
    }
  }

  const handleStatusChange = (newStatus: string) => {
    if (onStatusChange) {
      onStatusChange(task.id, newStatus)
      onOpenChange(false) // Close the sidebar after status change
    }
  }

  const getNextStatus = (currentStatus: string) => {
    const statuses = ["Planning", "In Progress", "Review", "Completed"]
    const currentIndex = statuses.indexOf(currentStatus)
    return statuses[(currentIndex + 1) % statuses.length]
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-300"
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "Low":
        return "bg-green-100 text-green-800 border-green-300"
      default:
        return "bg-blue-100 text-blue-800 border-blue-300"
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[500px] sm:w-[600px] overflow-y-auto p-0">
        <div className="p-6">
          <SheetHeader className="space-y-3">
            <div className="flex items-start justify-between">
              <SheetTitle className="text-2xl font-bold text-blue-600 pr-4">{task.title}</SheetTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className={`${getStatusColor(task.status)}`}>
                {task.status}
              </Badge>
              <Badge variant="outline" className={`${getPriorityColor(task.priority)}`}>
                {task.priority}
              </Badge>
            </div>
          </SheetHeader>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b">
            <TabsList className="w-full grid grid-cols-3 rounded-none bg-white border-b h-14">
              <TabsTrigger
                value="details"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none h-14"
              >
                <FileText className="h-5 w-5 mr-2" />
                <span className="font-medium">Details</span>
              </TabsTrigger>
              <TabsTrigger
                value="comments"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none h-14"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                <span className="font-medium">Comments</span>
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none h-14"
              >
                <Activity className="h-5 w-5 mr-2" />
                <span className="font-medium">Activity</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="details" className="space-y-6 mt-0">
              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-gray-700">
                  {task.description ||
                    "Comprehensive testing of electric drivetrain integration with bus chassis including weight distribution and structural integrity analysis."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center text-gray-500 mb-2">
                    <User className="h-5 w-5 mr-2" />
                    <span>Assignee</span>
                  </div>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={task.assignee?.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {task.assignee?.name
                          ? task.assignee.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                          : "AS"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{task.assignee?.name || "Amit Singh"}</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center text-gray-500 mb-2">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>Due Date</span>
                  </div>
                  <div className="font-medium">{task.dueDate || "20/04/2024"}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center text-gray-500 mb-2">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>Start Date</span>
                  </div>
                  <div className="font-medium">{task.startDate || "10/03/2024"}</div>
                </div>

                <div>
                  <div className="flex items-center text-gray-500 mb-2">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>Effort</span>
                  </div>
                  <div className="font-medium">{task.effort || "80h"}</div>
                </div>
              </div>

              {/* Attachments Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-gray-500">
                    <Paperclip className="h-5 w-5 mr-2" />
                    <span>Attachments</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Plus className="h-4 w-4 mr-1" />
                    <span>Add</span>
                  </Button>
                </div>
                <div className="bg-gray-50 rounded-md p-3 text-sm text-gray-500 border border-dashed border-gray-300 flex items-center justify-center">
                  <span>No attachments yet</span>
                </div>
              </div>

              {/* Dependencies Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-gray-500">
                    <LinkIcon className="h-5 w-5 mr-2" />
                    <span>Dependencies</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Plus className="h-4 w-4 mr-1" />
                    <span>Add</span>
                  </Button>
                </div>
                <div className="bg-gray-50 rounded-md p-3 text-sm text-gray-500 border border-dashed border-gray-300 flex items-center justify-center">
                  <span>No dependencies yet</span>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  onClick={() => handleStatusChange(getNextStatus(task.status))}
                  className="w-full py-6 text-base font-medium"
                >
                  {task.status === "Planning"
                    ? "Start Task"
                    : task.status === "In Progress"
                      ? "Submit for Review"
                      : task.status === "Review"
                        ? "Mark Complete"
                        : "Reopen Task"}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="comments" className="space-y-4 mt-0">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {comment.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{comment.author}</span>
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                  className="resize-none"
                />
                <Button onClick={handleAddComment} className="w-full py-6 text-base font-medium">
                  Add Comment
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4 mt-0">
              <div className="space-y-4">
                <div className="flex space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Activity className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Task created</span>
                      <span className="text-xs text-gray-500">5 days ago</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Task was created and assigned to {task.assignee?.name || "Amit Singh"}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Activity className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Status updated</span>
                      <span className="text-xs text-gray-500">3 days ago</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Status changed from Planning to {task.status || "In Progress"}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Comment added</span>
                      <span className="text-xs text-gray-500">2 days ago</span>
                    </div>
                    <p className="text-sm text-gray-700">John Doe added a comment about charging standards</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
