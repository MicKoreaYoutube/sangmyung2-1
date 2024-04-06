'use client'

import { useState, useEffect } from "react"

import Link from "next/link"

import { TriangleDownIcon } from "@radix-ui/react-icons"

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

import { User, onAuthStateChanged } from "firebase/auth"
import { auth } from "@/firebase/initialization"

interface dropDownProps {
  items?: dropDownItem
}

export function NavDropDown({ items }: dropDownProps) {

  const [isLogin, changeLoginState] = useState<boolean | string>("not set")
  const [loginedUser, setLoginedUser] = useState<User>()

  library.add(fas, far, fab)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        changeLoginState(true)
        setLoginedUser(user)
      } else {
        changeLoginState(false)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <>
      {
        isLogin == true ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button>
                <div className="flex">
                  <Avatar>
                    <AvatarImage src={loginedUser?.photoURL?.toString()} alt="@shadcn" />
                    <AvatarFallback>
                      <LoadingComp />
                    </AvatarFallback>
                  </Avatar>
                  <TriangleDownIcon className="m-2 block h-6 w-6" />
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="font-TheJamsil5Bold w-56">
              <DropdownMenuLabel>{auth.currentUser?.displayName}</DropdownMenuLabel>
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
                                  <DropdownMenuSub key={itemInItemIndex}>
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
                                              <Link href={`${semiDropDownItemInItem.href ? semiDropDownItemInItem.href : null}`} key={semiDropDownItemInItemIndex}>
                                                <DropdownMenuItem>
                                                  {semiDropDownItemInItem.icon ? (
                                                    <FontAwesomeIcon icon={semiDropDownItemInItem.icon} className="mr-2 h-4 w-4" />
                                                  ) : null}
                                                  <span>{semiDropDownItemInItem.title}</span>
                                                  {semiDropDownItemInItem.shortcut ? (
                                                    <DropdownMenuShortcut>{semiDropDownItemInItem.shortcut}</DropdownMenuShortcut>
                                                  ) : null}
                                                </DropdownMenuItem>
                                              </Link>
                                            ))}
                                          </div>
                                        ))}
                                      </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                  </DropdownMenuSub>
                                ) : (
                                  <Link href={`${itemInItem.href ? itemInItem.href : null}`} key={itemInItemIndex}>
                                    <DropdownMenuItem>
                                      {itemInItem.icon ? (
                                        <FontAwesomeIcon icon={itemInItem.icon} className="mr-2 h-4 w-4" />
                                      ) : null}
                                      <span>{itemInItem.title}</span>
                                      {itemInItem.shortcut ? (
                                        <DropdownMenuShortcut>{itemInItem.shortcut}</DropdownMenuShortcut>
                                      ) : null}
                                    </DropdownMenuItem>
                                  </Link>
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
          isLogin == false ? (
            <Button asChild variant="ghost" size="icon">
              <Link href="/auth/login"><FontAwesomeIcon icon={["fas", "right-to-bracket"]} className="h-5 w-5" /></Link>
            </Button>
          ) : (
            <LoadingComp />
          )
        )
      }
    </>
  )
}