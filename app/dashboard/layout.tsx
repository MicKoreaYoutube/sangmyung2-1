'use client'

import { dashboardSidebarContent } from "@/config/site"

import { DashboardSidebar } from "@/components/sidebar"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <div className="relative flex flex-row">
        <ResizablePanelGroup
          direction="horizontal"
        >
          <ResizablePanel defaultSize={13} maxSize={13} minSize={4} collapsible={true} collapsedSize={7}>
            <DashboardSidebar items={dashboardSidebarContent} />
          </ResizablePanel>
          <ResizableHandle withHandle/>
          <ResizablePanel>
            <div>{children}</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  )
}
