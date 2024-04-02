'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"

import { useEffect, useState } from "react"

import { collection, onSnapshot, doc, DocumentData, updateDoc } from "firebase/firestore"
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

export default function BoardSuggestionsUpdatePage({ params }: { params: { suggestionsID: string } }) {

  const router = useRouter()

  const user = auth.currentUser

  useEffect(() => {
    if (user == null) {
      alert("로그인 후 이용해주세요!")
      router.push("/auth/login")
    }
  }, [user, router])

  const [suggestion, setSuggestion] = useState<DocumentData>()

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "suggestions", params.suggestionsID), (querySnapshot) => {
      setSuggestion(querySnapshot.data())
    })
  }, [])

  const [error, setError] = useState({ isError: false, errorCode: "", errorMessage: "" })

  const allowedToWhoms = ["학급", "학교"]

  const updateSuggestionFormSchema = z.object({
    title: z.string({
      required_error: "필수 입력란입니다."
    }).refine((value) => 3 <= value.length && value.length <= 128, {
      message: "제목은 3~128글자여야합니다.",
    }),
    content: z.string({
      required_error: "필수 입력란입니다."
    }),
    toWhom: z.string().refine((type) => allowedToWhoms.includes(type), {
      message: "허용되지 않는 구분입니다."
    }),
    anonymous: z.boolean()
  })

  const form = useForm<z.infer<typeof updateSuggestionFormSchema>>({
    resolver: zodResolver(updateSuggestionFormSchema),
    defaultValues: {
      toWhom: suggestion?.toWhom,
      anonymous: suggestion?.anonymous
    }
  })

  async function updateDocument(data: z.infer<typeof updateSuggestionFormSchema>) {
    try {
      await updateDoc(doc(db, "suggestions", params.suggestionsID), {
        title: data.title,
        content: data.content,
        updateTime: new Date(),
        toWhom: data.toWhom,
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
            <CardTitle className="font-KBO-Dia-Gothic_bold text-2xl md:text-3xl">건의사항 수정하기</CardTitle>
            <CardDescription className="font-SUITE-Regular text-md md:text-xl">여러분이 생각하는 우리반에서 고쳐야 할 점이나 학교에 대한 건의사항, 사이트에 대한 것 등을 건의해주세요!</CardDescription>
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
                        <Input placeholder="제목을 입력해주세요..." {...field} defaultValue={suggestion?.title} />
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
                        <Textarea placeholder="건의사항을 입력해주세요..." {...field} rows={8} className="resize-none" defaultValue={suggestion?.content}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="toWhom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>구분*</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={suggestion?.toWhom}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="누구에게 보내는 건의사항인지 선택하세요." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="font-SUITE-Regular">
                            <SelectItem value="학급">학급</SelectItem>
                            <SelectItem value="학교">학교</SelectItem>
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
                          defaultChecked={suggestion?.anonymous}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
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
