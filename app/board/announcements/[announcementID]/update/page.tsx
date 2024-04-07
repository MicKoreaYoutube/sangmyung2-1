'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"

import { useEffect, useState } from "react"

import { collection, onSnapshot, doc, DocumentData, updateDoc, FieldValue, connectFirestoreEmulator } from "firebase/firestore"
import { auth, db } from "@/firebase/initialization"

import { AlertCircle, ChevronRight } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Alert,
  AlertTitle,
  AlertDescription
} from "@/components/ui/alert"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export default function BoardAnnouncementUpdatePage({ params }: { params: { announcementID: string } }) {

  const router = useRouter()

  const user = auth.currentUser

  useEffect(() => {
    if (user == null) {
      alert("로그인 후 이용해주세요!")
      router.push("/auth/login")
    }
  }, [user, router])

  const [announcement, setAnnouncement] = useState<DocumentData>()

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "announcements", params.announcementID), (querySnapshot) => {
      setAnnouncement(querySnapshot.data())
    })
  }, [params.announcementID])

  useEffect(() => {
    if (user) {
      const unsubscribe2 = onSnapshot(doc(db, "users", user.uid), (querySnapshot) => {
        const userDetail = querySnapshot.data()
        console.log(querySnapshot.data())
        if (userDetail && userDetail.role && (user?.displayName == announcement?.author || userDetail.role.includes("총관리자") || userDetail.role == "회장" || userDetail.role == "자치부장" || userDetail.role == "정보부장")) {
          console.log("권한이 충분합니다.")
        } else {
          alert("권한이 부족합니다.")
        }
      })
    }
  }, [user, announcement?.author])

  const [error, setError] = useState({ isError: false, errorCode: "", errorMessage: "" })

  const allowedToWhoms = ["학급", "학교"]

  const updateAnnouncementFormSchema = z.object({
    title: z.string({
      required_error: "필수 입력란입니다."
    }).refine((value) => 3 <= value.length && value.length <= 128, {
      message: "제목은 3~128글자여야합니다.",
    }),
    content: z.string({
      required_error: "필수 입력란입니다."
    }),
  })

  const form = useForm<z.infer<typeof updateAnnouncementFormSchema>>({
    resolver: zodResolver(updateAnnouncementFormSchema),
  })

  useEffect(() => {
    if (announcement) {
      form.setValue('title', announcement.title)
      form.setValue('content', announcement.content)
    }
  }, [announcement, form])

  async function updateDocument(data: z.infer<typeof updateAnnouncementFormSchema>) {
    if (user?.emailVerified) {
      try {
        await updateDoc(doc(db, "announcements", params.announcementID), {
          title: data.title,
          content: data.content,
          updateTime: new Date()
        })
        router.push("/board/announcements")
      } catch (error: any) {
        const errorCode = error.code
        const errorMessage = error.message
        setError({ isError: true, errorCode: errorCode, errorMessage: errorMessage })
        setTimeout(() => {
          setError({ isError: false, errorCode: "", errorMessage: "" })
        }, 3000)
      }
    } else {
      const errorCode = "이메일을 미인증"
      const errorMessage = "귀하의 이메일이 인증되지 않았습니다."
      setError({ isError: true, errorCode: errorCode, errorMessage: errorMessage })
      setTimeout(() => {
        setError({ isError: false, errorCode: "", errorMessage: "" })
      }, 3000)
    }
  }

  return (
    <>
      <section className="container grid gap-7 py-20 md:px-40">
        <div className="grid gap-3 text-center">
          <h1 className="font-KBO-Dia-Gothic_bold animate__animated text-5xl md:text-7xl">공지사항 작성하기</h1>
          <span className="font-SUITE-Regular text-md animate__animated md:text-xl">학급에 할 중요한 공지사항을 작성해보세요!</span>
        </div>
        <Card>
          <div className="flex justify-end">
            <Link href="/board/suggestions" className={buttonVariants({ variant: "ghost" }) + "font-SUITE-Regular px-2 absolute m-2"}><ChevronRight /></Link>
          </div>
          <CardHeader>
            <CardTitle className="font-KBO-Dia-Gothic_bold text-2xl md:text-3xl">공지사항 수정하기</CardTitle>
            <CardDescription className="font-SUITE-Regular text-md md:text-xl">공지사항은 관리자가 올리는 게시물입니다. 한 단어 한 단어 주의해가며 수정해주세요!</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(updateDocument)} className="font-SUITE-Regular space-y-5" method="PUT">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>제목*</FormLabel>
                      <FormControl>
                        <Input placeholder="제목을 입력해주세요..." {...field} defaultValue={field.value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>내용*</FormLabel>
                      <FormControl>
                        <Textarea placeholder="공지사항을 입력해주세요..." {...field} rows={8} className="resize-none" defaultValue={field.value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {error.isError ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>{error.errorCode}</AlertTitle>
                    <AlertDescription>
                      {error.errorMessage}
                    </AlertDescription>
                  </Alert>
                ) : null}
                <h1 className="text-sm">* 표시는 필수 입력란입니다.</h1>
                <p className="text-sm text-muted-foreground">
                  작성하기 버튼을 누르실 경우, 당신은 {" "}
                  <Link
                    href="/terms"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    이용약관
                  </Link>
                  에 동의한 것으로 간주합니다.
                </p>
                <div className="flex justify-end">
                  <Button type="submit">작성하기</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>
    </>
  )
}
