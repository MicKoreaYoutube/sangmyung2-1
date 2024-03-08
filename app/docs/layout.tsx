'use client'

import { siteConfig } from "@/config/site"

import { DocsSidebar } from "@/components/sidebar"

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <>
      <div className="relative flex flex-row">
        <DocsSidebar items={siteConfig.docsSidebarContent} />
        <div className="w-full">{children}</div>
      </div>
    </>
  )
}
