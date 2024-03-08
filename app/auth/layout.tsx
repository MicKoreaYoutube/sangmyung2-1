'use client'

import { siteConfig } from "@/config/site"

import { DocsSidebar } from "@/components/sidebar"

import { Icons } from "@/components/icons"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <div className="flex h-full w-full justify-between lg:h-[94vh]">
        <div className="hidden basis-1/2 flex-col justify-between bg-primary p-12 dark:bg-accent lg:flex">
          <span className="font-KBO-Dia-Gothic_bold flex text-lg font-medium text-white">
            <Icons.logo className="h-7 w-7" />
            &nbsp;
            {siteConfig.name}
          </span>
          <span className="font-SUITE-Regular w-54 text-xl text-white">
            {siteConfig.description}
          </span>
        </div>
        <div className="flex h-full basis-full flex-col justify-start p-8 lg:basis-1/2 lg:justify-center">
          {children}
        </div>
      </div>
    </>
  )
}