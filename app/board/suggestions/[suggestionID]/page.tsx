'use client'

import { useState, useEffect } from "react"

import Link from "next/link"

import { doc, onSnapshot, Timestamp, DocumentData } from "firebase/firestore"
import { db } from "@/firebase/initialization"

import { InView } from "react-intersection-observer"

import { ChevronRight } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"

export default function BoardSuggestionsReadPage({ params }: { params: { suggestionID: string } }) {

  const classToAdd = "animate__fadeInUp"

  const [suggestion, setSuggestion] = useState<DocumentData>()

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "suggestions", params.suggestionID), (querySnapshot) => {
      setSuggestion(querySnapshot.data())
    })
  }, [params.suggestionID])

  return (
    <>
      <section className="container py-20 md:px-40">
        <InView triggerOnce={true} threshold={1}>
          {({ inView, ref }) => (
            <Card className={`animate__animated ${inView ? classToAdd : "invisible"}`} ref={ref}>
              <div className="flex justify-end">
                <Link href="/board/suggestions" className={buttonVariants({ variant: "ghost" }) + "font-SUITE-Regular px-2 absolute m-2"}><ChevronRight /></Link>
              </div>
              <CardHeader>
                <CardTitle className="font-KBO-Dia-Gothic_bold text-2xl md:text-4xl">{suggestion?.title}</CardTitle>
                <CardDescription className="font-SUITE-Regular text-xl md:grid md:grid-cols-2">
                  <div className="flex flex-row justify-between">
                    <span>{suggestion?.anonymous ? "익명" : suggestion?.author}</span>
                    <span className="flex flex-row data-[status=미반영]:text-[#CCCCCC] data-[status=반려됨]:text-[#F00] data-[status=반영됨]:text-[#50E3C2] data-[status=보류됨]:text-[#6B8E23] data-[status=처리중]:text-[#F5A623] [&[data-status=미반영]>div.mark-circle]:bg-[#CCCCCC] [&[data-status=반려됨]>div.mark-circle]:bg-[#F00] [&[data-status=반영됨]>div.mark-circle]:bg-[#50E3C2] [&[data-status=보류됨]>div.mark-circle]:bg-[#6B8E23] [&[data-status=처리중]>div.mark-circle]:bg-[#F5A623]" data-status={suggestion?.status}>
                      <div className="mark-circle m-2 flex h-3 w-3 items-center justify-center rounded-full" />
                      {suggestion?.status}
                    </span>
                  </div>
                  <span className="text-end">{suggestion?.updateTime.toDate().toLocaleString()}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="font-SUITE-Regular space-y-3">
                <h1 className="text-xl">To. {suggestion?.toWhom}</h1>
                <p className="font-SUITE-Regular whitespace-pre-wrap text-lg">{suggestion?.content}</p>
              </CardContent>
              <CardFooter className="font-SUITE-Regular flex flex-col space-y-3">
                <h1 className="text-xl">댓글 기능은 추후에 제작 예정입니다.</h1>
              </CardFooter>
            </Card>
          )}
        </InView>
      </section>
    </>
  )
}
