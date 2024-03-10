'use client'

import Link from "next/link"
import { useState, useRef } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { faGoogle, faGithub, faApple } from "@fortawesome/free-brands-svg-icons"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import VerEx from "verbal-expressions"

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/initialization"

export default function Join() {

  const inputRef = useRef<Array<HTMLInputElement | null>>([])

  const joinFormSchema = z.object({
    email: z.string().email({
      message: "이메일 형식이 올바르지 않습니다."
    }),
    pwd: z.string().regex(new RegExp("^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$"), {
      message: "영문, 숫자, 특수기호 조합으로 8~15글자 비밀번호를 만들어주세요."
    }),
    StudentID: z.string().regex(new RegExp("^(?:201)[0-9]{2}[가-힣]{2,4}"), {
      message: "학번이 올바르지 않습니다."
    })
  })

  const form = useForm<z.infer<typeof joinFormSchema>>({
    resolver: zodResolver(joinFormSchema)
  })

  function join(data: z.infer<typeof joinFormSchema>) {
    console.log("Succes!")
  }

  return (
    <>
      <div className="mx-auto flex h-screen w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="font-KBO-Dia-Gothic_bold text-2xl font-semibold tracking-tight">
            회원 가입
          </h1>
        </div>
        <div className="font-SUITE-Regular flex flex-col justify-center space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(join)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@example.com" {...field} />
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
                    <FormLabel>pwd</FormLabel>
                    <FormControl>
                      <Input placeholder="영문, 숫자, 특수기호 조합으로 8~15글자 비밀번호를 만들어주세요." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
          <div>
            <Label htmlFor="email" className="p-1">이메일</Label>
            <Input placeholder="이메일를 입력하세요." ref={el => (inputRef.current[0] = el)} required />
          </div>
          <div>
            <Label htmlFor="pwd" className="p-1">비밀번호</Label>
            <Input placeholder="비밀번호를 입력하세요." type="password" ref={el => (inputRef.current[1] = el)} required />
          </div>
          <div>
            <Label htmlFor="pwdCheck" className="p-1">비밀번호 확인</Label>
            <Input placeholder="비밀번호를 다시 입력하세요." type="password" ref={el => (inputRef.current[2] = el)} required />
          </div>
          <div>
            <Label htmlFor="studentID" className="p-1">학번</Label>
            <Input placeholder="학번을 입력하세요." ref={el => (inputRef.current[3] = el)} required />
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="font-SUITE-Regular relative flex justify-center">
            <span className="bg-background px-2 text-muted-foreground">
              또는
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <Button variant="ghost" size="icon"><FontAwesomeIcon icon={faGoogle} className="text-lg font-bold text-[#4285f4]" /></Button>
          <Button variant="ghost" size="icon"><span className="text-xl font-bold text-[#03c75a]">N</span></Button>
          <Button variant="ghost" size="icon"><FontAwesomeIcon icon={faGithub} className="text-lg font-bold" /></Button>
          <Button variant="ghost" size="icon"><FontAwesomeIcon icon={faApple} className="text-lg font-bold" /></Button>
        </div>
        <div className="font-SUITE-Regular flex flex-col justify-center space-y-6">
          <span className="px-8 text-center text-sm text-muted-foreground">계정이 이미 있나요? <Link href="/auth/login" className="text-blue-500 hover:text-blue-700">로그인→</Link></span>
          <p className="px-8 text-center text-sm text-muted-foreground">
            회원 가입 버튼을 누르실 경우, 당신은 {" "}
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