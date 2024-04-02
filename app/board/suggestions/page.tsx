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

export default function BoardSuggestionsPage() {

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
    if (user && user.uid) {
      const unsubscribe2 = onSnapshot(doc(db, "users", user.uid), (querySnapshot) => {
        setUserDetail(querySnapshot.data())
      })
    }
  }, [])

  return (
    <>
      <section className="container grid gap-7 py-20 md:px-40">
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
                      <CardTitle className="font-KBO-Dia-Gothic_bold flex justify-between text-3xl">
                        <Link href={`/board/suggestions/${item.id}`} className="underline-offset-2 hover:underline">
                          {item.title}
                        </Link>
                        {userDetail && userDetail.role && (user?.displayName == item.author || userDetail.role.includes("총관리자") || userDetail.role == "회장" || userDetail.role == "자치부장" || userDetail.role == "정보부장") ? (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="icon"><EllipsisVertical /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuLabel className="font-KBO-Dia-Gothic_bold text-lg">작업</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuGroup className="font-SUITE-Regular">
                                <Link href={`/board/suggestions/${item.id}/update`}>
                                  <DropdownMenuItem>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    <span>수정</span>
                                  </DropdownMenuItem>
                                </Link>
                                <Link href={`/board/suggestions/${item.id}/delete`}>
                                  <DropdownMenuItem>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    <span>삭제</span>
                                  </DropdownMenuItem>
                                </Link>
                              </DropdownMenuGroup>
                              {userDetail && userDetail.role && (userDetail.role.includes("총관리자") || userDetail.role == "회장" || userDetail.role == "자치부장" || userDetail.role == "정보부장") ? (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuGroup className="font-SUITE-Regular">
                                    <DropdownMenuSub>
                                      <DropdownMenuSubTrigger>
                                        <PencilRuler className="mr-2 h-4 w-4" />
                                        <span>반영 상태 수정</span>
                                      </DropdownMenuSubTrigger>
                                      <DropdownMenuPortal>
                                        <DropdownMenuSubContent className="font-SUITE-Regular">
                                          <DropdownMenuItem>
                                            <X className="mr-2 h-4 w-4" />
                                            <span>미반영</span>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem>
                                            <RefreshCcw className="mr-2 h-4 w-4" />
                                            <span>처리중</span>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem>
                                            <Check className="mr-2 h-4 w-4" />
                                            <span>반영됨</span>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem>
                                            <Ban className="mr-2 h-4 w-4" />
                                            <span>반려됨</span>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem>
                                            <OctagonPause className="mr-2 h-4 w-4" />
                                            <span>보류됨</span>
                                          </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                      </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                  </DropdownMenuGroup>
                                </>
                              ) : null}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : null}

                      </CardTitle>
                      <CardDescription className="font-SUITE-Regular grid grid-cols-[3fr_1fr_6fr] text-xl">
                        <span>{item.content.slice(0, 7)}...</span>
                        <span className="mx-auto flex flex-row data-[status=미반영]:text-[#CCCCCC] [&[data-status=미반영]>div.mark-circle]:bg-[#CCCCCC] data-[status=처리중]:text-[#F5A623] [&[data-status=처리중]>div.mark-circle]:bg-[#F5A623] data-[status=반영됨]:text-[#50E3C2] [&[data-status=반영됨]>div.mark-circle]:bg-[#50E3C2] data-[status=반려됨]:text-[#F00] [&[data-status=반려됨]>div.mark-circle]:bg-[#F00] data-[status=보류됨]:text-[#6B8E23] [&[data-status=보류됨]>div.mark-circle]:bg-[#6B8E23]" data-status={item.status}>
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
