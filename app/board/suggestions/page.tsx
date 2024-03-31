'use client'

import { useState, useEffect } from "react"

import Link from "next/link"

import { collection, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore"
import { db } from "@/firebase/initialization"

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
    toWhom: string
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
          toWhom: doc.data().toWhom,
          createTime: doc.data().createTime,
          updateTime: doc.data().updateTime
        })
      })
      setSuggestionsList(suggestions)
    })
  }, [])

  return (
    <>
      <section className="container grid gap-7 px-40 py-10">
        <div className="grid gap-3 text-center">
          <InView triggerOnce={true} threshold={1} delay={1000}>
            {({ inView, ref }) => (
              <h1 className={`font-KBO-Dia-Gothic_bold animate__animated text-5xl md:text-7xl ${inView ? classToAdd : "invisible"}`} ref={ref}>건의사항</h1>
            )}
          </InView>
          <InView triggerOnce={true} threshold={1} delay={1500}>
            {({ inView, ref }) => (
              <span className={`font-SUITE-Regular text-md animate__animated md:text-xl ${inView ? classToAdd : "invisible"}`} ref={ref}>지금까지 올라온 모든 건의사항들을 확인해보세요!</span>
            )}
          </InView>
        </div>
        <div className="grid gap-4">
          {suggestionsList.map(
            (item, index) => (
              <InView triggerOnce={true} threshold={1} key={index}>
                {({ inView, ref }) => (
                  <Card className={`animate__animated w-full ${inView ? classToAdd : "invisible"}`} ref={ref}>
                    <CardHeader>
                      <CardTitle className="font-KBO-Dia-Gothic_bold text-3xl underline-offset-2 hover:underline"><Link href={`/board/suggestions/${item.id}`}>{item.title}</Link></CardTitle>
                      <CardDescription className="font-SUITE-Regular grid grid-cols-[3fr_1fr_6fr] text-xl">
                        <span>{item.content.slice(0, 7)}...</span>
                        <span className="mx-auto flex flex-row data-[status=미반영]:text-[#f00] [&[data-status=미반영]>div.mark-circle]:bg-[#f00] data-[status=처리중]:text-[#ff0] [&[data-status=처리중]>div.mark-circle]:bg-[#ff0]" data-status={item.status}>
                          <div className="mark-circle m-2 flex h-3 w-3 items-center justify-center rounded-full" />
                          {item.status}
                        </span>
                        <span className="text-end">{item.updateTime.toDate().toLocaleString()}</span>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                )}
              </InView>
            )
          )}
          <InView triggerOnce={true} threshold={1}>
            {({ inView, ref }) => (
              <Pagination>
                <PaginationContent className={`animate__animated ${inView ? classToAdd : "invisible"}`} ref={ref}>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </InView>
          <InView triggerOnce={true} threshold={1}>
            {({ inView, ref }) => (
              <div className={`animate__animated font-SUITE-Regular flex w-full justify-end ${inView ? classToAdd : "invisible"}`} ref={ref}>
                <Button asChild>
                  <Link href="/board/suggestions/create">
                    +나도 건의하기
                  </Link>
                </Button>
              </div>
            )}
          </InView>
        </div>
      </section>
    </>
  )
}
