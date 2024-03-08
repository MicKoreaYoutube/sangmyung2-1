'use client'

import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigaitionMenuListItem
} from "@/components/ui/navigation-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      <div className="hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            {items?.length ? (
              <>
                {items?.map(
                  (item, index) => (
                    <NavigationMenuItem key={index}>
                      {item.href ? (
                        <Link href={`${item.href}`} className={`${navigationMenuTriggerStyle()} bg-transparent`}>
                          {item.title}
                        </Link>
                      ) : (
                        <>
                          <NavigationMenuTrigger className="bg-transparent">{item.title}</NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ScrollArea>
                              <ul className={`${item.mainLink ? "lg:grid-cols-[3fr_4fr]" : "md:grid-cols-2"} grid max-h-[250px] w-[300px] gap-3 p-6 md:w-[400px] lg:w-[500px]`}>
                                {item.mainLink ? (
                                  <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                      <Link className="flex h-full w-full select-none flex-col justify-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md"
                                        href={`${item.mainLink?.href}`}>
                                        <Icons.logo className={`h-6 w-6 ${item.mainLink?.logo ? null : "hidden"}`} />
                                        <div className="mb-2 mt-4 text-lg font-medium leading-tight">
                                          {item.mainLink?.title}
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                          {item.mainLink?.description}
                                        </p>
                                      </Link>
                                    </NavigationMenuLink>
                                  </li>
                                ) : null}
                                {item.linkList?.map(
                                  (linkListItem, index) => (
                                    <NavigaitionMenuListItem
                                      key={index}
                                      title={linkListItem.title}
                                      href={linkListItem.href}
                                    >
                                      {linkListItem.description}
                                    </NavigaitionMenuListItem>
                                  ))}
                              </ul>
                            </ScrollArea>
                          </NavigationMenuContent>
                        </>
                      )}
                    </NavigationMenuItem>
                  )
                )}
              </>
            ) : null}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}
