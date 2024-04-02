'use client'

import { useState, useEffect } from "react"

import Link from "next/link"

import { doc, collection, onSnapshot, orderBy, query, Timestamp, DocumentData } from "firebase/firestore"
import { auth, db } from "@/firebase/initialization"

import { InView } from "react-intersection-observer"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Pencil,
  Trash2,
  PencilRuler,
  X,
  RefreshCcw,
  Check,
  Ban,
  OctagonPause,
  EllipsisVertical
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function BoardSuggestionsDeletePage({ params }: { params: { suggestionsID: string } }) {

  const classToAdd = "animate__fadeInUp"

  const q = query(collection(db, "suggestions"), orderBy("updateTime", "desc"))

  const [suggestionsList, setSuggestionsList] = useState<documentType[]>([])
  const [userDetail, setUserDetail] = useState<DocumentData>()

  interface documentType {
    id: string
    title: string
    content: string
    author: string
    status: string
    toWhom: string
    createTime: Timestamp
    updateTime: Timestamp
  }

  const user = auth.currentUser

  const [suggestion, setSuggestion] = useState<DocumentData>()

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "suggestions", params.suggestionsID), (querySnapshot) => {
      setSuggestion(querySnapshot.data())
    })

    if (user && user.uid) {
      const unsubscribe2 = onSnapshot(doc(db, "users", user.uid), (querySnapshot) => {
        setUserDetail(querySnapshot.data())
      })
    }

    if (!(userDetail && userDetail.role && (user?.displayName == suggestion?.author || userDetail.role.includes("총관리자") || userDetail.role == "회장" || userDetail.role == "자치부장" || userDetail.role == "정보부장"))) {
        
    }
  }, [])

  return (
    <>
    </>
  )
}
