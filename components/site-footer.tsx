'use client';

import Link from "next/link"

import { siteConfig } from "@/config/site"

import { buttonVariants, Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";

import { useState } from "react"
import { useInView } from "react-intersection-observer"

export function SiteFooter() {

  const [isOpen, changeOpenState] = useState(false)
  const [FamilySurviceRef, FamilySurviceRefInView] = useInView({
    threshold: 1
  })

  return (
    <footer className="font-RixInooAriDuriR inset-x-0 bottom-0 z-40 w-full border-t bg-accent/50">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center space-x-2">
              <Icons.logo className="h-6 w-6" />
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">{siteConfig.name}</span>
            </Link>
            <p className="mt-4 max-w-[400px] text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-24">
            {siteConfig.footerContent?.length ? (
              <>
                {siteConfig.footerContent?.map(
                  (item, index) =>
                    <div key={index}>
                      <h2 className="mb-6 text-2xl font-semibold text-foreground">{item.title}</h2>
                      <ul className="font-medium text-muted-foreground">
                        {item.content?.length ? (
                          <>
                            {item.content?.map(
                              (contentItem, contentIndex) =>
                                <li className="mb-4" key={contentIndex}>
                                  <Link href={contentItem.href} className="hover:underline">{contentItem.title}</Link>
                                </li>
                            )}
                          </>
                        ) : null}
                      </ul>
                    </div>
                )}
              </>
            ) : null}
          </div>
        </div>
        <div>
          <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-muted-foreground sm:text-center">© 2023 <Link href="/" className="hover:underline">{siteConfig.name}™</Link>. All Rights Reserved.</span>
            <nav className="hidden items-center space-x-1 md:flex">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">패밀리 서비스&nbsp;<FontAwesomeIcon icon={faChevronDown} className={`h-3 w-3 shrink-0 transition-transform duration-200 ${FamilySurviceRefInView ? "rotate-180" : null}`} /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="font-RixInooAriDuriR w-1" ref={FamilySurviceRef}>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>패밀리 서비스</DropdownMenuLabel>
                    {siteConfig.FamilySurvice?.length ? (
                      siteConfig.FamilySurvice?.map(
                        (item, index) =>
                          <Link key={index} href={item.href}>
                            <DropdownMenuItem>
                              <span>{item.name}</span>
                            </DropdownMenuItem>
                          </Link>
                      )
                    ) : null}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link
                href={siteConfig.links.micGithub}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  })}
                >
                  <FontAwesomeIcon icon={faGithub} className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </div>
              </Link>
              <Link
                href={siteConfig.links.micInstagram}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  })}
                >
                  <FontAwesomeIcon icon={faInstagram} className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </div>
              </Link>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}