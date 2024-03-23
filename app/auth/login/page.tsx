'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"

import { useState, useRef, useEffect } from "react"

import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
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

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/initialization"

export default function Login() {

  const router = useRouter()

  const [error, setError] = useState({ isError: false, errorCode: "", errorMessage: "" })

  const inputRef = useRef<Array<HTMLInputElement | null>>([])

  const loginFormSchema = z.object({
    email: z.string({
      required_error: "필수 입력란입니다."
    }).email({
      message: "이메일 형식이 아닙니다."
    }),
    pwd: z.string({
      required_error: "필수 입력란입니다."
    }).regex(new RegExp("^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$"), {
      message: "비밀번호는 영문, 숫자, 특수기호 조합으로 8~15글자입니다."
    })
  })

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema)
  })

  async function login(data: z.infer<typeof loginFormSchema>) {
    await signInWithEmailAndPassword(auth, data.email, data.pwd)
      .then(() => {
        router.push("/dashboard")
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

  return (
    <>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="font-KBO-Dia-Gothic_bold text-2xl font-semibold tracking-tight">
            로그인
          </h1>
        </div>
        <div className="font-SUITE-Regular flex flex-col justify-center space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(login)} className="space-y-5" method="POST">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일*</FormLabel>
                    <FormControl>
                      <Input placeholder="example@example.com" {...field} ref={el => (inputRef.current[0] = el)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pwd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호*</FormLabel>
                    <FormControl>
                      <Input placeholder="영문, 숫자, 특수기호 조합으로 8~15글자" {...field} ref={el => (inputRef.current[1] = el)} type="password" />
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
              <Button type="submit" className="w-full">로그인</Button>
            </form>
          </Form>
        </div>
        <hr />
        <div className="font-SUITE-Regular flex flex-col justify-center space-y-6">
          <span className="px-8 text-center text-sm text-muted-foreground">계정이 없나요? <Link href="/auth/join" className="text-blue-500 hover:text-blue-700">회원가입→</Link></span>
          <p className="px-8 text-center text-sm text-muted-foreground">
            로그인 버튼을 누르실 경우, 당신은 {" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              이용약관
            </Link>
            에 동의한 것으로 간주합니다.
          </p>
        </div>
      </div>
    </>
  )
}