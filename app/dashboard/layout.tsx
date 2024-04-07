'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { auth } from "@/firebase/initialization"

import { dashboardSidebarContent } from "@/config/site"

import { Menu } from "lucide-react"

import { DashboardSidebar } from "@/components/sidebar"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {

  const [isCollapsed, collapsedStateChanger] = useState(false)

  const router = useRouter()

  const user = auth.currentUser

  useEffect(()=>{
    if (user == null) {
      alert("로그인 후 이용해주세요!")
      router.push("/auth/login")
    }
  }, [user, router])

  return (
    <>
      <div className="relative flex flex-row">
        <ResizablePanelGroup
          direction="horizontal"
        >
          <ResizablePanel className="hidden md:inline" defaultSize={13} maxSize={13} minSize={7} collapsible={true} collapsedSize={3.2} onCollapse={() => {
            collapsedStateChanger(true)
          }} onExpand={() => {
            collapsedStateChanger(false)
          }}>
            <DashboardSidebar items={dashboardSidebarContent} isCollapsed={isCollapsed} />
          </ResizablePanel>
          <ResizableHandle className="hidden md:flex" withHandle />
          <ResizablePanel>
            <header className="font-RixInooAriDuriR w-full text-lg md:hidden">
              <div className="flex h-16 items-center space-x-4 p-5 pb-2 sm:justify-between sm:space-x-0">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="secondary" size="icon">
                      <Menu />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="p-2 pt-14">
                    <DashboardSidebar items={dashboardSidebarContent} isCollapsed={false} />
                  </SheetContent>
                </Sheet>
              </div>
            </header>
            <div className="h-full p-5">
              {children}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  )
}
