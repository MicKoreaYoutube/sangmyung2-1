'use client'

import { useRouter } from 'next/navigation'

import { useState, useRef } from "react"

import { AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { signInWithEmailAndPassword, onAuthStateChanged, updatePassword, signOut } from "firebase/auth"

import { auth } from "@/firebase/initialization"

export default function MyChangePwd() {

  const router = useRouter()

  const [error, setError] = useState({ isError: false, errorCode: "", errorMessage: "" })

  const inputRef = useRef<Array<HTMLInputElement | null>>([])

  const joinFormSchema = z.object({
    pwd: z.string({
      required_error: "필수 입력란입니다."
    }).regex(new RegExp("^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$"), {
      message: "비밀번호는 영문, 숫자, 특수기호 조합 8~15글자입니다."
    }),
    newPwd: z.string({
      required_error: "필수 입력란입니다."
    }).regex(new RegExp("^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$"), {
      message: "영문, 숫자, 특수기호 조합으로 8~15글자 비밀번호를 만들어주세요."
    }),
    newPwdCheck: z.literal(inputRef.current[1]?.value, {
      errorMap: () => ({
        message: "비밀번호가 일치하지 않습니다."
      })
    })
  })

  const form = useForm<z.infer<typeof joinFormSchema>>({
    resolver: zodResolver(joinFormSchema),
    defaultValues: {
      newPwdCheck: ""
    }
  })

  function changePwd(data: z.infer<typeof joinFormSchema>) {
    onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        signInWithEmailAndPassword(auth, user.email, data.pwd)
          .then(() => {
            updatePassword(user, data.newPwd).then(() => {
              router.push("/auth/logout")
            }).catch((error) => {
              const errorCode = error.code
              const errorMessage = error.message
              setError({ isError: true, errorCode: errorCode, errorMessage: errorMessage })
              setTimeout(() => {
                setError({ isError: false, errorCode: "", errorMessage: "" })
              }, 3000)
            })
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            setError({ isError: true, errorCode: errorCode, errorMessage: errorMessage })
            setTimeout(() => {
              setError({ isError: false, errorCode: "", errorMessage: "" })
            }, 3000)
          })
      }
    })
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-KBO-Dia-Gothic_bold text-3xl">비밀번호 변경</CardTitle>
          <CardDescription className="font-SUITE-Regular text-lg">비밀번호를 안전하게 변경하세요.</CardDescription>
        </CardHeader>
        <CardContent className="font-SUITE-Regular">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(changePwd)} className="space-y-5">
              <FormField
                control={form.control}
                name="pwd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호*</FormLabel>
                    <FormControl>
                      <Input placeholder="영문, 숫자, 특수기호 조합으로 8~15글자" {...field} ref={el => (inputRef.current[0] = el)} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPwd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>새로운 비밀번호*</FormLabel>
                    <FormControl>
                      <Input placeholder="새로운 영문, 숫자, 특수기호 조합으로 8~15글자 비밀번호를 써주세요." {...field} ref={el => (inputRef.current[1] = el)} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPwdCheck"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>새로운 비밀번호 확인*</FormLabel>
                    <FormControl>
                      <Input placeholder="새 비밀 번호를 다시 써주세요." {...field} ref={el => (inputRef.current[2] = el)} type="password" />
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
              <div className="flex justify-end">
                <Button type="submit">비밀번호 변경</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}