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
import { Progress } from "@/components/ui/progress"
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

import MultiRef from 'react-multi-ref'

export default function Join() {

  const [joinState, stateChanger] = useState(1)
  let [isTabVisible, changeTabVisiblity] = useState(["block", "hidden", "hidden"])

  return (
    <>
      <div className="mx-auto flex h-screen w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="font-KBO-Dia-Gothic_bold text-2xl font-semibold tracking-tight">
            회원 가입 - {joinState}
          </h1>
        </div>
        <div className="font-SUITE-Regular flex flex-col justify-center space-y-6">
          <Progress value={100 * ((joinState - 1) / 2)} />
          <div className={isTabVisible[0]}>
            <div className="font-SUITE-Regular flex flex-col justify-center space-y-6">
              <div>
                <Label htmlFor="id" className="p-1">아이디</Label>
                <Input placeholder="아이디를 입력하세요." />
              </div>
              <div>
                <Label htmlFor="pwd" className="p-1">비밀번호</Label>
                <Input placeholder="비밀번호를 입력하세요." type="password" />
              </div>
              <div>
                <Label htmlFor="pwdCheck" className="p-1">비밀번호 확인</Label>
                <Input placeholder="비밀번호를 다 입력하세요." type="password" />
              </div>
            </div>
          </div>
          <div className={isTabVisible[1]}>
            <div className="font-SUITE-Regular flex flex-col justify-center space-y-6">
              <div className="flex flex-col justify-center space-y-3">
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input type="email" placeholder="이메일을 입력하세요." className="w-64" />
                  <Button type="submit">코드 받기</Button>
                </div>
                <Input placeholder="코드를 입력하세요." type="password" />
              </div>
            </div>
          </div>
          <div className={isTabVisible[2]}>
            <div className="font-SUITE-Regular flex flex-col justify-center space-y-4">
              <FontAwesomeIcon icon={faCheck} className="text-7xl" />
              <h1 className="font-SUITE-Regular text-center text-3xl">축하합니다!<br />계정 생성에 성공하셨습니다!</h1>
            </div>
          </div>
          {joinState == 3 ? null : null}
          <Button onClick={() => {
            if (joinState <= 3) {
              stateChanger(joinState + 1);
              isTabVisible[joinState - 1] = "hidden";
              changeTabVisiblity([...isTabVisible]);
              isTabVisible[joinState] = "block";
              changeTabVisiblity([...isTabVisible]);
            }
          }}>{joinState >= 3 ? "가입하기" : `다음→ ${"("}${joinState + 1}${" / 3)"}`}</Button>
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
          <Button variant="ghost" size="icon"><FontAwesomeIcon icon={faGoogle} className="text-lg font-bold" /></Button>
          <Button variant="ghost" size="icon"><span className="text-xl font-bold">N</span></Button>
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