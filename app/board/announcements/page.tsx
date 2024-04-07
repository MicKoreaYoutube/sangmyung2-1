'use client'

import { useState, useEffect } from "react"

import Link from "next/link"

import { doc, collection, onSnapshot, orderBy, query, updateDoc, DocumentData } from "firebase/firestore"
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
  Pencil,
  Trash2,
  EllipsisVertical
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function BoardAnnouncementsPage() {

  const classToAdd = "animate__fadeInUp"

  const q = query(collection(db, "announcements"), orderBy("updateTime", "desc"))

  const { toast } = useToast()

  const [announcementsList, setAnnouncementsList] = useState<DocumentData[]>([])
  const [userDetail, setUserDetail] = useState<DocumentData>()

  const [error, setError] = useState({ isError: false, errorCode: "", errorMessage: "" })

  const user = auth.currentUser

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const announcements: DocumentData[] = []
      querySnapshot.forEach((doc) => {
        announcements.push({
          id: doc.id,
          ...doc.data()
        })
      })
      setAnnouncementsList(announcements)
    })
  }, [q])

  useEffect(() => {
    if (user) {
      const unsubscribe2 = onSnapshot(doc(db, "users", user.uid), (querySnapshot) => {
        setUserDetail(querySnapshot.data())
      })
    }
  }, [user])

  return (
    <>
      <section className="container grid gap-7 py-20 md:px-40">
        <div className="grid gap-3 text-center">
          <InView triggerOnce={true} threshold={1} delay={1000}>
            {({ inView, ref }) => (
              <h1 className={`font-KBO-Dia-Gothic_bold animate__animated text-5xl md:text-7xl ${inView ? classToAdd : "invisible"}`} ref={ref}>공지사항</h1>
            )}
          </InView>
          <InView triggerOnce={true} threshold={1} delay={1500}>
            {({ inView, ref }) => (
              <span className={`font-SUITE-Regular text-md animate__animated md:text-xl ${inView ? classToAdd : "invisible"}`} ref={ref}>지금까지 올라온 모든 공지사항들을 확인해보세요!</span>
            )}
          </InView>
        </div>
        <div className="grid gap-4">
          {announcementsList.length ? (
            announcementsList.map(
              (item, index) => (
                <>
                  {item.status !== "delete" ? (
                    <InView triggerOnce={true} threshold={1} key={index}>
                      {({ inView, ref }) => (
                        <Card className={`animate__animated w-full ${inView ? classToAdd : "invisible"}`} ref={ref}>
                          <CardHeader>
                            <CardTitle className="font-KBO-Dia-Gothic_bold flex justify-between text-3xl">
                              <Link href={`/board/announcements/${item.id}`} className="underline-offset-2 hover:underline">
                                {item.title}
                              </Link>
                              {userDetail && userDetail.role && (userDetail.role.includes("총관리자") || userDetail.role == "회장" || userDetail.role == "자치부장" || userDetail.role == "정보부장") ? (
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon"><EllipsisVertical /></Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent>
                                    <DropdownMenuLabel className="font-KBO-Dia-Gothic_bold text-lg">작업</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup className="font-SUITE-Regular">
                                      <Link href={`/board/announcements/${item.id}/update`}>
                                        <DropdownMenuItem>
                                          <Pencil className="mr-2 h-4 w-4" />
                                          <span>수정</span>
                                        </DropdownMenuItem>
                                      </Link>
                                      <Link href={`/board/announcements/${item.id}/delete`}>
                                        <DropdownMenuItem>
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          <span>삭제</span>
                                        </DropdownMenuItem>
                                      </Link>
                                    </DropdownMenuGroup>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              ) : null}
                            </CardTitle>
                            <CardDescription className="font-SUITE-Regular flex flex-col justify-between text-xl md:flex-row">
                              <span>{item.content.slice(0, 7)}...</span>
                              <span className="md:text-end">{item.updateTime.toDate().toLocaleString()}</span>
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      )}
                    </InView>
                  ) : null}
                </>
              )
            )
          ) : (
            <InView triggerOnce={true} threshold={1} delay={1000}>
              {({ inView, ref }) => (
                <h1 className={`font-TheJamsil5Bold animate__animated mx-auto my-20 text-xl md:text-3xl ${inView ? classToAdd : "invisible"}`} ref={ref}>올라온 공지사항이 없습니다.</h1>
              )}
            </InView>
          )}
          {user && userDetail && userDetail.role && (userDetail.role.includes("총관리자") || userDetail.role == "회장" || userDetail.role == "자치부장" || userDetail.role == "정보부장") ? (
            <InView triggerOnce={true} threshold={1}>
              {({ inView, ref }) => (
                <div className={`animate__animated font-SUITE-Regular flex w-full justify-end ${inView ? classToAdd : "invisible"}`} ref={ref}>
                  <Button asChild>
                    <Link href="/board/announcements/create">
                      +공지사항 작성하기
                    </Link>
                  </Button>
                </div>
              )}
            </InView>
          ) : null}
        </div>
      </section>
      <Toaster />
    </>
  )
}
