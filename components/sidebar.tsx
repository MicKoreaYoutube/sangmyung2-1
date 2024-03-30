'use client'

import Link from "next/link"

import { dashboardSidebarItem, docsSidebarItem } from "@/types/sidebar"

// import { SearchDialog } from "@/components/search"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import { ScrollArea } from "@/components/ui/scroll-area"

import { usePathname } from "next/navigation"
import { useState } from "react"

import { Link as TargetLink } from 'react-scroll'

import parse from "html-react-parser"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

interface dashboardSidebarInterface {
  items?: dashboardSidebarItem[]
  isCollapsed: boolean
}

interface docsSidebarInterface {
  items?: docsSidebarItem[]
}

interface chapterSidebarInterface {
  items?: string[] | undefined
}

export function DashboardSidebar({ items, isCollapsed }: dashboardSidebarInterface) {

  const pathName = usePathname()

  library.add(fas, far, fab)

  return (
    <>
      <Command className={`h-[80vh] rounded-none ${isCollapsed ? "p-0.5" : ""}`}>
        <CommandList>
          <Accordion type="multiple" className="font-TheJamsil5Bold w-full">
            {items?.length ? (
              <>
                {items?.map(
                  (item, index) => (
                    <div key={index}>
                      {item.content?.length ? (
                        <AccordionItem value={item.title}>
                          <AccordionTrigger className={`rounded-md font-normal hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-primary data-[state=open]:text-primary-foreground ${isCollapsed ? "w-4 px-2 py-[6px] lg:m-0.5" : "m-1 px-2 py-1.5"}`}  data-isCollapsed={isCollapsed}>
                            {item.icon ? (
                              <FontAwesomeIcon icon={item.icon} className={`${isCollapsed ? "text-3xl" : "mr-1"} w-full`} fixedWidth={isCollapsed ? false : true} />
                            ) : null}
                            {isCollapsed ? null : (
                              <>
                                <span className="text-md">{item.title}</span>
                                <CommandShortcut>{item.shortcut}</CommandShortcut>
                              </>
                            )}
                          </AccordionTrigger>
                          <AccordionContent>
                            <CommandGroup className="p-0.5">
                              <>
                                {item.content?.map(
                                  (contentItem, contentIndex) => (
                                    <Link href={contentItem.href} key={`${index}${contentIndex}`}>
                                      <CommandItem className={`${isCollapsed ? "" : "ml-2 mr-0.5"} data-[here=true]:bg-primary data-[here=true]:text-primary-foreground`} data-here={`${pathName == contentItem.href}`}>
                                        {contentItem.icon ? (
                                          <FontAwesomeIcon icon={contentItem.icon} className={`${isCollapsed ? "text-3xl" : "p-0.5 text-xl"} w-full`} fixedWidth={isCollapsed ? false : true} />
                                        ) : null}
                                        {isCollapsed ? null : (
                                          <>
                                            <span className="text-md">{contentItem.title}</span>
                                            <CommandShortcut>{contentItem.shortcut}</CommandShortcut>
                                          </>
                                        )}
                                      </CommandItem>
                                    </Link>
                                  )
                                )}
                              </>
                            </CommandGroup>
                          </AccordionContent>
                        </AccordionItem>
                      ) : (
                        <Link href={`${item.href}`}>
                          <CommandItem className={`${isCollapsed ? "m-0.5" : "m-1"} data-[here=true]:bg-primary data-[here=true]:text-primary-foreground`} data-here={`${pathName == item.href}`}>
                            {item.icon ? (
                              <FontAwesomeIcon icon={item.icon} className={`${isCollapsed ? "m-auto w-full text-3xl" : "mr-1"}`} fixedWidth={isCollapsed ? false : true} />
                            ) : null}
                            {isCollapsed ? null : (
                              <>
                                <span className="text-md">{item.title}</span>
                                <CommandShortcut>{item.shortcut}</CommandShortcut>
                              </>
                            )}
                          </CommandItem>
                        </Link>
                      )}
                    </div>
                  )
                )}
              </>
            ) : null}
          </Accordion>
        </CommandList>
      </Command>
    </>
  )
}

export function DocsSidebar({ items }: docsSidebarInterface) {

  const pathName = usePathname()

  return (
    <>
      <ScrollArea className="h-[80vh] w-48">
        <div className="m-8">
          {items?.length ? (
            items.map(
              (item, index) => (
                <div key={index} className="py-4">
                  <Link href={`${item.href ? `/docs/${item.title}` : "#"}`} className={`my-3 block text-lg ${decodeURI(pathName) == `/docs/${item.title}` ? "underline underline-offset-4" : "font-bold"} font-KBO-Dia-Gothic_bold`}>{item.title}</Link>
                  {item.content?.length ? (
                    item.content.map(
                      (contentItem, contentIndex) => (
                        <Link key={contentIndex} href={`/docs/${item.title}/${contentItem.title}`} className={`text-md my-1 block ${decodeURI(pathName) == `/docs/${item.title}/${contentItem.title}` ? "font-bold text-foreground underline underline-offset-4" : "text-muted-foreground"} font-SUITE-Regular`}>{contentItem.title}</Link>
                      )
                    )
                  ) : null}
                </div>
              )
            )
          ) : null}
        </div>
      </ScrollArea>
    </>
  )
}

export function ChapterSidebar({ items }: chapterSidebarInterface) {

  const [selectedChapter, selectChapter] = useState("")

  return (
    <div className="w-32">
      <div className="fixed w-full p-6">
        <h1 className="font-KBO-Dia-Gothic_bold font-bold">Chapter</h1>
        <div className="flex flex-col">
          {items?.length ? (
            items.map(
              (item, index) => (
                <TargetLink
                  key={index}
                  to={`chapter-${item}`}
                  className={`${selectedChapter == item ? "font-bold" : null} font-SUITE-Regular`} onClick={() => { selectChapter(item) }}
                  smooth={true}
                  duration={500}
                >{item}</TargetLink>
              )
            )
          ) : null}
        </div>
      </div>
    </div>
  )
}
