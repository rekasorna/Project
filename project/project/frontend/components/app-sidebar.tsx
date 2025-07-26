"use client"

import type React from "react"
import { LayoutDashboard, ListChecks, Plus, Settings, User, Calendar } from "lucide-react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar"

// Add props to receive the task creation handler
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onCreateTask?: () => void
}

export function AppSidebar({ onCreateTask, ...props }: AppSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <ScrollArea>
          <SidebarHeader className="space-y-2">
            <p className="text-md font-bold">Taskify</p>
          </SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <LayoutDashboard className="h-4 w-4" />
                <span>Overview</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <ListChecks className="h-4 w-4" />
                Tasks
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Calendar className="h-4 w-4" />
                Calendar
              </SidebarMenuButton>
            </SidebarMenuItem>
            <Separator />
            {/* Update the Add Task menu item: */}
            <SidebarMenuItem>
              <SidebarMenuButton onClick={onCreateTask}>
                <Plus className="h-4 w-4" />
                Add Task
              </SidebarMenuButton>
            </SidebarMenuItem>
            <Separator />
            <SidebarMenuItem>
              <SidebarMenuButton>
                <User className="h-4 w-4" />
                Profile
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Settings className="h-4 w-4" />
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>Footer</SidebarFooter>
    </Sidebar>
  )
}
