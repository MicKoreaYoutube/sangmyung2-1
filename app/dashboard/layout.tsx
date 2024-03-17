'use client'

import { dashboardSidebarContent } from "@/config/site"

import { DashboardSidebar } from "@/components/sidebar"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useState } from "react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {

  const [isCollapsed, collapsedStateChanger] = useState(false)

  return (
    <>
      <div className="relative flex flex-row">
        <ResizablePanelGroup
          direction="horizontal"
        >
          <ResizablePanel defaultSize={13} maxSize={13} minSize={7} collapsible={true} collapsedSize={3.2} onCollapse={()=>{
            collapsedStateChanger(true)
          }} onExpand={()=>{
            collapsedStateChanger(false)
          }}>
            <DashboardSidebar items={dashboardSidebarContent} isCollapsed={isCollapsed} />
          </ResizablePanel>
          <ResizableHandle withHandle/>
          <ResizablePanel>
            <div className="p-5 h-full">{children}</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  )
}
