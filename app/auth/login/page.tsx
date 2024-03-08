'use client'

import Link from "next/link"

import { Icons } from "@/components/icons"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Login() {
  return (
    <>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="font-KBO-Dia-Gothic_bold text-2xl font-semibold tracking-tight">
            로그인
          </h1>
        </div>
        <div className="font-SUITE-Regular flex flex-col justify-center space-y-6">
          <div>
            <Label htmlFor="id" className="p-1">아이디</Label>
            <Input placeholder="아이디를 입력하세요." />
          </div>
          <div>
            <Label htmlFor="pwd" className="p-1">비밀번호</Label>
            <Input placeholder="비밀번호를 입력하세요." type="password" />
          </div>
          <Button>로그인</Button>
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