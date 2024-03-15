import Link from "next/link"

import { Menu } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { Icons } from "@/components/icons"
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
} from "lucide-react"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";

import { NavItem } from "@/types/nav"
import { siteConfig, navDropDownContent } from "@/config/site"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { buttonVariants, Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ThemeToggle } from "@/components/theme-toggle"
import { NavDropDown } from "@/components/dropdown"

import { useInView } from "react-intersection-observer"

import { auth } from "@/firebase/initialization"

interface NavSheetProps {
  items?: NavItem[]
}

export function NavSheet({ items }: NavSheetProps) {

  const [FamilySurviceRef, FamilySurviceRefInView] = useInView({
    threshold: 1
  })

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent className="font-RixInooAriDuriR flex h-screen flex-col justify-between">
          <div>
            <SheetHeader>
              <SheetTitle>
                <Link href="/" className="flex flex-row space-x-2">
                  <Icons.logo className="h-6 w-6" />
                  <span className="inline-block font-bold">{siteConfig.name}</span>
                </Link>
              </SheetTitle>
              <SheetDescription>
                {siteConfig.description}
              </SheetDescription>
            </SheetHeader>
            <Accordion type="single" collapsible className="w-full overflow-auto">
              {items?.length ? (
                <>
                  {items?.map(
                    (item, index) => (
                      <AccordionItem key={index} value={index.toString()}>
                        {item.href ? (
                          <Link href={`${item.href}`} className="flex flex-1 items-center justify-between py-4 font-medium transition-all">
                            {item.title}
                          </Link>
                        ) : (
                          <>
                            <AccordionTrigger>{item.title}</AccordionTrigger>
                            <AccordionContent>
                              <ScrollArea>
                                <ul className={`${item.mainLink ? "grid-cols-[3fr_2fr] flex-row" : null} grid gap-3`}>
                                  {item.mainLink ? (
                                    <li className="h-full">
                                      <div className="duraition-700 h-full rounded-md transition hover:bg-accent">
                                        <Link className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md"
                                          href={`${item.mainLink?.href}`}>
                                          <Icons.logo className={`h-6 w-6 ${item.mainLink?.logo ? null : "hidden"}`} />
                                          <div className="mb-2 mt-4 text-lg font-medium leading-tight">
                                            {item.mainLink?.title}
                                          </div>
                                          <p className="text-sm leading-tight text-muted-foreground">
                                            {item.mainLink?.description}
                                          </p>
                                        </Link>
                                      </div>
                                    </li>
                                  ) : null}
                                  <div className={`${item.mainLink ? "flex flex-col justify-between" : "grid grid-cols-2 gap-x-3 gap-y-1"}`}>
                                    {item.linkList?.map(
                                      (linkListItem, index) => (
                                        <Link className={`duraition-700 flex flex-col rounded-md px-2 py-4 transition hover:bg-accent`}
                                          key={index}
                                          href={linkListItem.href}
                                        >
                                          <span className="font-medium leading-tight">{linkListItem.title}</span>
                                          <span className="leading-tight text-muted-foreground">{linkListItem.description}</span>
                                        </Link>
                                      )
                                    )}
                                  </div>
                                </ul>
                              </ScrollArea>
                            </AccordionContent>
                          </>
                        )}
                      </AccordionItem>
                    )
                  )}
                </>
              ) : null}
            </Accordion>
          </div>
          <SheetFooter>
            <div className="flex flex-col">
              <div className="flex flex-row justify-between gap-5">
                <NavDropDown items={navDropDownContent} label={auth.currentUser?.displayName} />
                <nav className="flex flex-col space-x-1 sm:flex-row">
                  <div>
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
                  </div>
                </nav>
              </div>
              <span className="w-full text-sm text-muted-foreground">© 2023 <Link href="/" className="hover:underline">{siteConfig.name}™</Link>. All Rights Reserved.</span>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}