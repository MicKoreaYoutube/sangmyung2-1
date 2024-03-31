'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"

import { useEffect, useState } from "react"

import { collection, addDoc } from "firebase/firestore"
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
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
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

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export default function BoardSuggestionsCreatePage() {

  const router = useRouter()

  const user = auth.currentUser

  useEffect(() => {
    if (user == null) {
      alert("로그인 후 이용해주세요!")
      router.push("/auth/login")
    }
  }, [user, router])

  const [error, setError] = useState({ isError: false, errorCode: "", errorMessage: "" })

  const allowedTypes = ["학급", "학교"]

  const createSuggestionFormSchema = z.object({
    title: z.string({
      required_error: "필수 입력란입니다."
    }).refine((value) => 3 <= value.length && value.length <= 128, {
      message: "제목은 3~128글자여야합니다.",
    }),
    content: z.string({
      required_error: "필수 입력란입니다."
    }),
    type: z.string({
      required_error: "필수 입력란입니다."
    }).refine((type) => allowedTypes.includes(type), {
      message: "허용되지 않는 구분입니다."
    }),
    anonymous: z.boolean()
  })

  const form = useForm<z.infer<typeof createSuggestionFormSchema>>({
    resolver: zodResolver(createSuggestionFormSchema),
  })

  async function createDoc(data: z.infer<typeof createSuggestionFormSchema>) {
    try {
      await addDoc(collection(db, "suggestions"), {
        author: user?.displayName,
        title: data.title,
        content: data.content,
        createTime: new Date(),
        updateTime: new Date(),
        toWhom: data.type,
        status: "미반영",
        anonymous: data.anonymous
      })
      router.push("/board/suggestions")
    } catch (error: any) {
      const errorCode = error.code
      const errorMessage = error.message
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
          <h1 className="font-KBO-Dia-Gothic_bold animate__animated text-5xl md:text-7xl">나도 건의하기</h1>
          <span className="font-SUITE-Regular text-md animate__animated md:text-xl">직접 우리반 또는 학교에 건의해보세요!</span>
        </div>
        <Card>
          <div className="flex justify-end">
            <Link href="/board/suggestions" className={buttonVariants({ variant: "ghost" }) + "font-SUITE-Regular px-2 absolute m-2"}><ChevronRight /></Link>
          </div>
          <CardHeader>
            <CardTitle className="font-KBO-Dia-Gothic_bold text-2xl md:text-3xl">건의사항 입력하기</CardTitle>
            <CardDescription className="font-SUITE-Regular text-md md:text-xl">여러분이 생각하는 우리반에서 고쳐야 할 점이나 학교에 대한 건의사항, 사이트에 대한 것 등을 건의해주세요!</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(createDoc)} className="font-SUITE-Regular space-y-5" method="POST">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>제목*</FormLabel>
                      <FormControl>
                        <Input placeholder="제목을 입력해주세요..." {...field} />
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
                        <Textarea placeholder="건의사항을 입력해주세요..." {...field} rows={8} className="resize-none"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>구분*</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="어디에 보내는 건의사항인지 선택하세요" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup className="font-SUITE-Regular">
                              <SelectItem value="학급">학급</SelectItem>
                              <SelectItem value="학교">학교</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="anonymous"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          익명 여부
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <h1 className="text-sm">* 표시는 필수 입력란입니다.</h1>
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
