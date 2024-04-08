'use client'

import Link from "next/link"

import { useState, useEffect } from "react"

import { onSnapshot, query, collection, orderBy, limit, DocumentData } from "firebase/firestore"
import { db } from "@/firebase/initialization"

import { InView } from "react-intersection-observer"

import { siteConfig } from "@/config/site"

import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Page() {

  const classToAdd = "animate__fadeInUp"

  const q = query(collection(db, "suggestions"), orderBy("updateTime", "desc"), limit(3))

  const [suggestionsList, setSuggestionsList] = useState<DocumentData[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let suggestions: DocumentData[] = []
      querySnapshot.forEach((doc) => {
        suggestions.push({
          id: doc.id,
          ...doc.data()
        })
      })
      suggestions = 
    })
  }, [q])



  const q2 = query(collection(db, "announcements"), orderBy("updateTime", "desc"), limit(3))

  const [announcementsList, setAnnouncementsList] = useState<DocumentData[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(q2, (querySnapshot) => {
      const announcements: DocumentData[] = []
      querySnapshot.forEach((doc) => {
        announcements.push({
          id: doc.id,
          ...doc.data()
        })
      })
      setAnnouncementsList(announcements)
    })
  }, [q2])

  return (
    <>
      <div className="bg-foreground py-12">
        <section className="container items-center md:py-10">
          <div className="flex flex-col items-center gap-2">
            <h1 className={`font-KBO-Dia-Gothic_bold content animate__animated text-center text-3xl font-extrabold leading-tight tracking-tighter text-background lg:text-5xl`}
            >
              안녕하세요. 이곳은 <br />
              <InView triggerOnce={true} threshold={1} delay={1600}>
                {({ inView, ref }) => (
                  <span ref={ref} className={`animate__animated ${inView ? classToAdd : 'invisible'}`}>상명중학교 2학년 1반 건의함 사이트 입니다.</span>
                )}
              </InView>
            </h1>
            <InView triggerOnce={true} threshold={1} delay={2300}>
              {({ inView, ref }) => (
                <p ref={ref} className={`font-SUITE-Regular animate__animated text-center text-lg text-muted-foreground ${inView ? 'animate__fadeInUp' : 'invisible'}`}>
                  상명중학교 2학년 1반은 여러분의 건의로 완성됩니다. 언제나 편하게 건의해주세요!
                </p>
              )}
            </InView>
          </div>
        </section>
      </div>
      <div className="bg-background">
        <section className="container grid items-center gap-4 py-10">
          <div className="flex flex-col items-start gap-2">
            <InView triggerOnce={true} threshold={1}>
              {({ inView, ref }) => (
                <h1 className={`font-KBO-Dia-Gothic_bold content animate__animated text-3xl font-extrabold leading-tight tracking-tighter lg:text-5xl ${inView ? classToAdd : 'invisible'}`}
                  ref={ref}>
                  최근 건의 사항
                </h1>
              )}
            </InView>
            <InView triggerOnce={true} threshold={1} delay={2300}>
              {({ inView, ref }) => (
                <p ref={ref} className={`font-SUITE-Regular animate__animated text-lg text-muted-foreground ${inView ? classToAdd : 'invisible'}`}>
                  최근에 올라온 건의 사항들을 확인하세요!
                </p>
              )}
            </InView>
          </div>
          <div className="grid gap-4">
            {suggestionsList.length ? (
              suggestionsList.map(
                (item, index) => (
                  <>
                    <InView triggerOnce={true} threshold={1} key={index}>
                      {({ inView, ref }) => (
                        <Card className={`animate__animated w-full ${inView ? classToAdd : "invisible"}`} ref={ref}>
                          <CardHeader>
                            <CardTitle className="font-KBO-Dia-Gothic_bold flex justify-between text-3xl">
                              <Link href={`/board/suggestions/${item.id}`} className="underline-offset-2 hover:underline">
                                {item.title}
                              </Link>
                            </CardTitle>
                            <CardDescription className="font-SUITE-Regular text-xl md:grid md:grid-cols-2">
                              <div className="flex w-full flex-row justify-between">
                                <span>{item.content.slice(0, 7)}...</span>
                                <span className="flex flex-row data-[status=미반영]:text-[#CCCCCC] data-[status=반려됨]:text-[#F00] data-[status=반영됨]:text-[#50E3C2] data-[status=보류됨]:text-[#6B8E23] data-[status=처리중]:text-[#F5A623] [&[data-status=미반영]>div.mark-circle]:bg-[#CCCCCC] [&[data-status=반려됨]>div.mark-circle]:bg-[#F00] [&[data-status=반영됨]>div.mark-circle]:bg-[#50E3C2] [&[data-status=보류됨]>div.mark-circle]:bg-[#6B8E23] [&[data-status=처리중]>div.mark-circle]:bg-[#F5A623]" data-status={item.status}>
                                  <div className="mark-circle m-2 flex h-3 w-3 items-center justify-center rounded-full" />
                                  {item.status}
                                </span>
                              </div>
                              <span className="md:text-end">{item.updateTime.toDate().toLocaleString()}</span>
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      )}
                    </InView>
                  </>
                )
              )
            ) : (
              <InView triggerOnce={true} threshold={1} delay={1000}>
                {({ inView, ref }) => (
                  <h1 className={`font-TheJamsil5Bold animate__animated mx-auto my-20 text-xl md:text-3xl ${inView ? classToAdd : "invisible"}`} ref={ref}>올라온 건의사항이 없습니다.</h1>
                )}
              </InView>
            )}
            <InView triggerOnce={true} threshold={1} delay={1600}>
              {({ inView, ref }) => (
                <div className={`font-TheJamsil5Bold animate__animated justify-self-end ${inView ? classToAdd : 'invisible'}`}>
                  <Link
                    href="/board/suggestions"
                    target="_blank"
                    rel="noreferrer"
                    className={buttonVariants({ variant: "default" })}
                    ref={ref}
                  >
                    +더 보기
                  </Link>
                </div>
              )}
            </InView>
          </div>
        </section>
      </div>
      <div className="bg-foreground py-12">
        <section className="container items-center md:py-10">
          <div className="flex flex-col items-center gap-4">
            <h1 className={`font-KBO-Dia-Gothic_bold content animate__animated text-center text-3xl font-extrabold leading-tight tracking-tighter text-background lg:text-5xl`}
            >
              <InView triggerOnce={true} threshold={1}>
                {({ inView, ref }) => (
                  <span ref={ref} className={`animate__animated ${inView ? classToAdd : 'invisible'}`}>직접 건의하고 싶나요?</span>
                )}
              </InView>
            </h1>
            <InView triggerOnce={true} threshold={1}>
              {({ inView, ref }) => (
                <div ref={ref} className={`font-TheJamsil5Bold animate__animated flex flex-col gap-4 md:flex-row ${inView ? classToAdd : 'invisible'}`}>
                  <Link
                    href="/board/suggestions/create"
                    rel="noreferrer"
                    className={buttonVariants({ variant: "defaultDark" })}
                  >
                    건의 사항 작성하기
                  </Link>
                  <Link
                    href="/dashboard/my/suggestions"
                    rel="noreferrer"
                    className={buttonVariants({ variant: "outlineDark" })}
                  >
                    내가 쓴 건의 사항 확인하기
                  </Link>
                </div>
              )}
            </InView>
          </div>
        </section>
      </div>
      <div className="bg-background">
        <section className="container grid items-center gap-4 py-10">
          <div className="flex flex-col items-start gap-2">
            <InView triggerOnce={true} threshold={1}>
              {({ inView, ref }) => (
                <h1 className={`font-KBO-Dia-Gothic_bold content animate__animated text-3xl font-extrabold leading-tight tracking-tighter lg:text-5xl ${inView ? classToAdd : 'invisible'}`}
                  ref={ref}>
                  최근에 올라온 공지
                </h1>
              )}
            </InView>
            <InView triggerOnce={true} threshold={1} delay={2300}>
              {({ inView, ref }) => (
                <p ref={ref} className={`font-SUITE-Regular animate__animated text-lg text-muted-foreground ${inView ? classToAdd : 'invisible'}`}>
                  최근에 올라온 공지들도 확인하세요!
                </p>
              )}
            </InView>
          </div>
          <div className="grid gap-4">
            {announcementsList.length ? (
              announcementsList.map(
                (item, index) => (
                  <InView triggerOnce={true} threshold={1} key={index}>
                    {({ inView, ref }) => (
                      <Card className={`animate__animated w-full ${inView ? classToAdd : "invisible"}`} ref={ref}>
                        <CardHeader>
                          <CardTitle className="font-KBO-Dia-Gothic_bold flex justify-between text-3xl">
                            <Link href={`/board/announcements/${item.id}`} className="underline-offset-2 hover:underline">
                              {item.title}
                            </Link>
                          </CardTitle>
                          <CardDescription className="font-SUITE-Regular flex flex-col justify-between text-xl md:flex-row">
                            <span>{item.content.slice(0, 7)}...</span>
                            <span className="md:text-end">{item.updateTime.toDate().toLocaleString()}</span>
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    )}
                  </InView>
                )
              )
            ) : (
              <InView triggerOnce={true} threshold={1} delay={1000}>
                {({ inView, ref }) => (
                  <h1 className={`font-TheJamsil5Bold animate__animated mx-auto my-20 text-xl md:text-3xl ${inView ? classToAdd : "invisible"}`} ref={ref}>올라온 공지사항이 없습니다.</h1>
                )}
              </InView>
            )}
            <InView triggerOnce={true} threshold={1} delay={1600}>
              {({ inView, ref }) => (
                <div className={`font-TheJamsil5Bold animate__animated justify-self-end ${inView ? classToAdd : 'invisible'}`}>
                  <Link
                    href="/board/announcements"
                    target="_blank"
                    rel="noreferrer"
                    className={buttonVariants({ variant: "default" })}
                    ref={ref}
                  >
                    +더 보기
                  </Link>
                </div>
              )}
            </InView>
          </div>
        </section>
      </div>
    </>
  )
}
