'use client'

import Link from "next/link"

import { collection, onSnapshot } from "firebase/firestore"
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

export default function Page() {

  const classToAdd = "animate__fadeInUp"

  const unsub = onSnapshot(collection(db, "suggestions"), (doc) => {
    console.log("Current data: ", doc);
});

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
          {[0, 1, 2].map(
            (item) => (
              <InView triggerOnce={true} threshold={1} key={item}>
                {({ inView, ref }) => (
                  <Card className={`animate__animated w-full ${inView ? classToAdd : "invisible"}`} ref={ref}>
                    <CardHeader>
                      <CardTitle className="font-KBO-Dia-Gothic_bold text-3xl">건의사항 {item}</CardTitle>
                      <CardDescription className="font-SUITE-Regular text-xl">내용 {item}</CardDescription>
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
