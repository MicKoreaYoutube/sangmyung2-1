'use client'

import { useState, useEffect } from "react"

import Link from "next/link"

import { collection, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore"
import { db } from "@/firebase/initialization"

import { InView } from "react-intersection-observer"

import { ChevronRight } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { MySuggestions } from "@/components/dashboard-comp"

export default function Page() {

  const classToAdd = "animate__fadeInUp"

  const q = query(collection(db, "suggestions"), orderBy("updateTime", "desc"))

  const [suggestionsList, setSuggestionsList] = useState<documentType[]>([])

  interface documentType {
    id: string
    title: string
    content: string
    author: string
    status: string
    createTime: Timestamp
    updateTime: Timestamp
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const suggestions: documentType[] = []
      querySnapshot.forEach((doc) => {
        suggestions.push({
          id: doc.id,
          title: doc.data().title,
          content: doc.data().content,
          author: doc.data().author,
          status: doc.data().status,
          createTime: doc.data().createTime,
          updateTime: doc.data().updateTime
        })
      })
      setSuggestionsList(suggestions)
    })
  }, [])

  return (
    <>
      <section className="container py-10">
        <Card>
          <div className="flex justify-end">
            <Link href="/board/suggestions" className={buttonVariants({ variant: "ghost" }) + "font-SUITE-Regular px-2 absolute m-2"}><ChevronRight /></Link>
          </div>
          <CardHeader>
            <CardTitle className="font-KBO-Dia-Gothic_bold text-2xl md:text-3xl">건의사항 입력하기</CardTitle>
            <CardDescription className="font-SUITE-Regular text-md md:text-xl">여러분이 생각하는 우리반에서 고쳐야 할 점이나 학교에 대한 건의사항, 사이트에 대한 것 등을 건의해주세요!</CardDescription>
          </CardHeader>
          <CardContent>

          </CardContent>
        </Card>
      </section>
    </>
  )
}
