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

export default function BoardSuggestionsReadPage({ params }: { params: { announcementID: string } }) {

  const classToAdd = "animate__fadeInUp"

  const [suggestion, setSuggestion] = useState<DocumentData>()

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "announcements", params.announcementID), (querySnapshot) => {
      setSuggestion(querySnapshot.data())
    })
  }, [params.announcementID])

  return (
    <>
      <section className="container py-20 md:px-40">
        <InView triggerOnce={true} threshold={1}>
          {({ inView, ref }) => (
            <Card className={`animate__animated ${inView ? classToAdd : "invisible"}`} ref={ref}>
              <div className="flex justify-end">
                <Link href="/board/announcements" className={buttonVariants({ variant: "ghost" }) + "font-SUITE-Regular px-2 absolute m-2"}><ChevronRight /></Link>
              </div>
              <CardHeader>
                <CardTitle className="font-KBO-Dia-Gothic_bold text-2xl md:text-4xl">{suggestion?.title}</CardTitle>
                <CardDescription className="font-SUITE-Regular text-md flex flex-col md:flex-row md:text-xl">
                  <span>{suggestion?.author}</span>
                  <span className="md:text-end">{suggestion?.updateTime.toDate().toLocaleString()}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="font-SUITE-Regular space-y-3">
                <p className="font-SUITE-Regular whitespace-pre-wrap text-lg">{suggestion?.content}</p>
              </CardContent>
              <CardFooter className="font-SUITE-Regular flex flex-col space-y-3">
                <h1 className="text-md md:text-xl">댓글 기능은 추후에 제작 예정입니다.</h1>
              </CardFooter>
            </Card>
          )}
        </InView>
      </section>
    </>
  )
}
