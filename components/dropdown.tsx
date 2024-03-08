'use client'

import { useState } from "react"

import Link from "next/link"

import { TriangleDownIcon } from "@radix-ui/react-icons"
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
  Calculator,
  Calendar,
  Smile,
  Menu,
  Search,
  LogIn
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { LoadingComp } from "@/components/loading-comp"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'

import { dropDownItem } from "@/types/dropdown"

interface dropDownProps {
  items?: dropDownItem
}

export function NavDropDown({ items }: dropDownProps) {

  const [isLogin, changeLoginState] = useState(true)

  library.add(fas, far, fab)

  return (
    <>
      {
        isLogin ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button>
                <div className="flex">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>
                      <LoadingComp />
                    </AvatarFallback>
                  </Avatar>
                  <TriangleDownIcon className="m-2 block h-6 w-6" />
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{items?.label}</DropdownMenuLabel>
              {items?.content.length ? (
                <>
                  {items.content.map((item, index) => (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup key={index}>
                        {item.length ? (
                          <>
                            {item.map((itemInItem, itemInItemIndex) => (
                              <>
                                {itemInItem.semiDropDown ? (
                                  <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                      {itemInItem.icon ? (
                                        <FontAwesomeIcon icon={itemInItem.icon} className="mr-2 h-4 w-4" />
                                      ) : null}
                                      <span>{itemInItem.title}</span>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                      <DropdownMenuSubContent>
                                        {itemInItem.semiDropDown.map((semiDropDownItem, semiDropDownIndex) => (
                                          <div key={semiDropDownIndex}>
                                            <DropdownMenuSeparator className={`${semiDropDownIndex == 0 ? "hidden" : null}`} />
                                            {semiDropDownItem.map((semiDropDownItemInItem, semiDropDownItemInItemIndex) => (
                                              <DropdownMenuItem key={semiDropDownItemInItemIndex}>
                                                <Link href={`${semiDropDownItemInItem.href ? semiDropDownItemInItem.href : null}`}>
                                                  {semiDropDownItemInItem.icon ? (
                                                    <FontAwesomeIcon icon={semiDropDownItemInItem.icon} className="mr-2 h-4 w-4" />
                                                  ) : null}
                                                  <span>{semiDropDownItemInItem.title}</span>
                                                  {semiDropDownItemInItem.shortcut ? (
                                                    <DropdownMenuShortcut>{semiDropDownItemInItem.shortcut}</DropdownMenuShortcut>
                                                  ) : null}
                                                </Link>
                                              </DropdownMenuItem>
                                            ))}
                                          </div>
                                        ))}
                                      </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                  </DropdownMenuSub>
                                ) : (
                                  <DropdownMenuItem key={itemInItemIndex}>
                                    <Link href={`${itemInItem.href ? itemInItem.href : null}`}>
                                      {itemInItem.icon ? (
                                        <FontAwesomeIcon icon={itemInItem.icon} className="mr-2 h-4 w-4" />
                                      ) : null}
                                      <span>{itemInItem.title}</span>
                                      {itemInItem.shortcut ? (
                                        <DropdownMenuShortcut>{itemInItem.shortcut}</DropdownMenuShortcut>
                                      ) : null}
                                    </Link>
                                  </DropdownMenuItem>
                                )}
                              </>
                            ))}
                          </>
                        ) : null}
                      </DropdownMenuGroup>
                    </>
                  ))}
                </>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu >
        ) : (
          <Button asChild variant="ghost" size="icon">
            <Link href="/auth/login"><FontAwesomeIcon icon={["fas", "right-to-bracket"]} className="h-5 w-5" /></Link>
          </Button>
        )
      }
    </>
  )
}