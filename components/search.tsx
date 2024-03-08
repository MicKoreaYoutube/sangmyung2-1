// import { z } from "zod";

// import { useState, useEffect, useRef, RefObject } from "react"

// import {
//   Cloud,
//   CreditCard,
//   Github,
//   Keyboard,
//   LifeBuoy,
//   LogOut,
//   Mail,
//   MessageSquare,
//   Plus,
//   PlusCircle,
//   Settings,
//   User,
//   UserPlus,
//   Users,
//   Calculator,
//   Calendar,
//   Smile,
//   Menu,
//   Search
// } from "lucide-react"

// import {
//   CommandDialog,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
//   CommandSeparator,
//   CommandShortcut,
// } from "@/components/ui/command"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"

// import fuseAPI, { FuseResult } from "fuse.js"

// export function SearchDialog() {

//   const [open, setOpen] = useState(false)

//   useEffect(() => {
//     const down = (e: KeyboardEvent) => {
//       if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
//         e.preventDefault()
//         setOpen((open) => !open)
//       }
//     }

//     document.addEventListener("keydown", down)
//     return () => document.removeEventListener("keydown", down)
//   }, [])

//   const data = [
//     {
//       "heading": "전체",
//       "content": [
//         {
//           "heading": "Suggestions",
//           "content": ["Calendar1", "Search Emoji1", "Calculator1"]
//         },
//         {
//           "heading": "Settings",
//           "content": ["Profile1", "Billing1", "Settings1"]
//         }
//       ]
//     },
//     {
//       "heading": "전체2",
//       "content": [
//         {
//           "heading": "Suggestions2",
//           "content": ["Calendar", "Search Emoji", "Calculator"]
//         },
//         {
//           "heading": "Settings2",
//           "content": ["Profile", "Billing", "Settings"]
//         }
//       ]
//     }
//   ]

//   const data2 = ["Calendar1", "Search Emoji1", "Calculator1", "Profile1", "Billing1", "Settings1", "Calendar", "Search Emoji", "Calculator", "Profile", "Billing", "Settings"]

//   const fuseOptions = {
//     keys: [
//       "content.content"
//     ]
//   }

//   const fuse = new fuseAPI(data2, fuseOptions);

//   const [query, queryChanger] = useState<string>("")

//   let result = fuse.search(query)

//   const topCommandGroupRefs = Array.from({ length: data.length }, () => useRef(null))
//   const secCommandGroupRefs: RefObject<HTMLDivElement>[] = Array.from(
//     { length: Math.max(...data.map(section => section.content.length)) },
//     () => useRef(null)
//   );

//   return (
//     <>
//       <Button className="w-52 bg-transparent shadow-sm flex justify-between"
//         variant="outline"
//         onClick={() => {
//           setOpen(true)
//         }}>
//         <span>Search anything</span><span className="border border-input rounded-lg bg-background px-2 py-1">⌘K</span>
//       </Button>
//       <CommandDialog open={open} onOpenChange={setOpen}>
//         <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
//           <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
//           <Input
//             className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
//             placeholder="Search anything..."
//             onChange={(e) => {
//               queryChanger(e.target.value)
//             }}
//           />
//         </div>
//         <ScrollArea className="h-[60vh]">
//           <CommandList>
//             <CommandEmpty>No results found.</CommandEmpty>
//             {/* <CommandGroup heading="전체">
//               <CommandGroup heading="Suggestions">
//                 <CommandItem>
//                   <Calendar className="mr-2 h-4 w-4" />
//                   <span>Calendar1</span>
//                 </CommandItem>
//                 <CommandItem>
//                   <Smile className="mr-2 h-4 w-4" />
//                   <span>Search Emoji1</span>
//                 </CommandItem>
//                 <CommandItem>
//                   <Calculator className="mr-2 h-4 w-4" />
//                   <span>Calculator1</span>
//                 </CommandItem>
//               </CommandGroup>
//               <CommandGroup heading="Settings">
//                 <CommandItem>
//                   <User className="mr-2 h-4 w-4" />
//                   <span>Profile1</span>
//                   <CommandShortcut>⌘P</CommandShortcut>
//                 </CommandItem>
//                 <CommandItem>
//                   <CreditCard className="mr-2 h-4 w-4" />
//                   <span>Billing1</span>
//                   <CommandShortcut>⌘B</CommandShortcut>
//                 </CommandItem>
//                 <CommandItem>
//                   <Settings className="mr-2 h-4 w-4" />
//                   <span>Settings1</span>
//                   <CommandShortcut>⌘S</CommandShortcut>
//                 </CommandItem>
//               </CommandGroup>
//             </CommandGroup>
//             <CommandGroup heading="전체2">
//               <CommandGroup heading="Suggestions2">
//                 <CommandItem>
//                   <Calendar className="mr-2 h-4 w-4" />
//                   <span>Calendar</span>
//                 </CommandItem>
//                 <CommandItem>
//                   <Smile className="mr-2 h-4 w-4" />
//                   <span>Search Emoji</span>
//                 </CommandItem>
//                 <CommandItem>
//                   <Calculator className="mr-2 h-4 w-4" />
//                   <span>Calculator</span>
//                 </CommandItem>
//               </CommandGroup>
//               <CommandGroup heading="Settings2">
//                 <CommandItem>
//                   <User className="mr-2 h-4 w-4" />
//                   <span>Profile</span>
//                   <CommandShortcut>⌘P</CommandShortcut>
//                 </CommandItem>
//                 <CommandItem>
//                   <CreditCard className="mr-2 h-4 w-4" />
//                   <span>Billing</span>
//                   <CommandShortcut>⌘B</CommandShortcut>
//                 </CommandItem>
//                 <CommandItem>
//                   <Settings className="mr-2 h-4 w-4" />
//                   <span>Settings</span>
//                   <CommandShortcut>⌘S</CommandShortcut>
//                 </CommandItem>
//               </CommandGroup>
//             </CommandGroup> */}
//             {
//               data.length ? (
//                 data.map(
//                   (item, index) => (
//                     <CommandGroup heading={item.heading} key={index} ref={topCommandGroupRefs[index]}>
//                       {item.content.length ? (
//                         item.content.map(
//                           (contentItem, contentIndex) => (
//                             <CommandGroup heading={contentItem.heading} key={contentIndex} ref={secCommandGroupRefs[contentIndex]} className={undefined}>
//                               {contentItem.content.length ? (
//                                 contentItem.content.map(
//                                   (contentItemIncontentItem, contentItemIncontentIndex) => (
//                                     result.some(item => item.item === contentItemIncontentItem) ? (
//                                       <CommandItem key={contentItemIncontentIndex}>
//                                         <Settings className="mr-2 h-4 w-4" />
//                                         <span>{contentItemIncontentItem}</span>
//                                         <CommandShortcut>⌘S</CommandShortcut>
//                                       </CommandItem>
//                                     ) : null
//                                   ))
//                               ) : null}
//                             </CommandGroup>
//                           ))
//                       ) : null}
//                     </CommandGroup>
//                   ))
//               ) : null
//             }
//           </CommandList>
//         </ScrollArea>
//       </CommandDialog>
//     </>
//   )
// }

export function tlqkftlqkfwja() {
    return "tlqkf"
}