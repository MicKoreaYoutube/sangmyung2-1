'use client'

import Link from "next/link"
import { useState, useRef, useEffect } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { faGoogle, faGithub, faApple } from "@fortawesome/free-brands-svg-icons"
import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Progress } from "@/components/ui/progress"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import VerEx from "verbal-expressions"

import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, onAuthStateChanged } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "@/firebase/initialization"

export default function Join() {

  const [joinState, joinStateChanger] = useState(0)
  const [error, setError] = useState({ isError: false, errorCode: "", errorMessage: "" })

  const inputRef = useRef<HTMLInputElement>(null)

  const joinFormSchema = z.object({
    email: z.string({
      required_error: "필수 입력란입니다."
    }).email({
      message: "이메일 형식이 아닙니다."
    }),
    pwd: z.string({
      required_error: "필수 입력란입니다."
    }).regex(new RegExp("^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$"), {
      message: "영문, 숫자, 특수기호 조합으로 8~15글자 비밀번호를 만들어주세요."
    }),
    pwdCheck: z.literal(inputRef.current?.value, {
      errorMap: () => ({
        message: "비밀번호가 일치하지 않습니다."
      })
    }),
    StudentID: z.string({
      required_error: "필수 입력란입니다."
    }).regex(new RegExp("^(?:201)[0-9]{2}[가-힣]{2,4}"), {
      message: "학번이 올바르지 않습니다."
    })
  })

  const form = useForm<z.infer<typeof joinFormSchema>>({
    resolver: zodResolver(joinFormSchema),
    defaultValues: {
      pwdCheck: ""
    }
  })

  function join(data: z.infer<typeof joinFormSchema>) {
    createUserWithEmailAndPassword(auth, data.email, data.pwd)
      .then(async (userCredential) => {
        const user = userCredential.user
        joinStateChanger(1)
        await setDoc(doc(db, "users", user.uid), {
          role: "일반 학생",
          displayName: data.StudentID
        })
        if (auth.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: data.StudentID,
            photoURL: "https://firebasestorage.googleapis.com/v0/b/sangmyung2-1.appspot.com/o/userPhoto.png?alt=media&token=9fc81f53-e883-42f9-b046-3aa9d23a51ce"
          }).then(() => {
            sendEmailVerification(user)
          }).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            setError({ isError: true, errorCode: errorCode, errorMessage: errorMessage })
            setTimeout(() => {
              setError({ isError: false, errorCode: "", errorMessage: "" })
            }, 3000)
          })
        }
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

  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmailVerified(user.emailVerified)
        if (emailVerified) {
          joinStateChanger(2)
        } else {
          joinStateChanger(1)
        }
      } else {
        joinStateChanger(0)
      }
    })

    return () => unsubscribe()
  })

  return (
    <>
      <div className="m-auto flex h-full w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="font-KBO-Dia-Gothic_bold text-2xl font-semibold tracking-tight">
            회원 가입 - {joinState + 1}
          </h1>
        </div>
        <div className="font-SUITE-Regular flex flex-col justify-center space-y-6">
          <Progress value={(joinState / 2) * 100} />
          <div className={joinState == 0 ? "" : "hidden"}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(join)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일*</FormLabel>
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
                      <FormLabel>비밀번호*</FormLabel>
                      <FormControl>
                        <Input placeholder="영문, 숫자, 특수기호 조합으로 8~15글자" {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pwdCheck"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호 확인*</FormLabel>
                      <FormControl>
                        <Input placeholder="비밀 번호를 다시 써주세요" {...field} ref={inputRef} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="StudentID"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>학번*</FormLabel>
                      <FormControl>
                        <Input placeholder="본인의 학번을 써주세요." {...field} />
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
                <Button type="submit" className="w-full">가입하기</Button>
              </form>
            </Form>
          </div>
          <div className={`flex flex-col items-center gap-3 ${joinState == 1 ? "" : "hidden"}`}>
            <FontAwesomeIcon icon={faEnvelope} className="text-9xl" />
            <span className="text-2xl">이메일을 확인해주세요.</span>
            <div className="flex flex-row gap-2">
              <span className="text-md py-2 text-muted-foreground">인증 메일이 도착하지 않았다면?</span>
              <Button onClick={() => {
                if (auth.currentUser) sendEmailVerification(auth.currentUser)
              }}>다시 받기</Button>
            </div>
            <div className="flex flex-row gap-2">
              <span className="text-md py-2 text-muted-foreground">만약 인증 했다면?</span>
              <Button onClick={() => { history.go(0) }}>클릭</Button>
            </div>
          </div>
          <div className={`flex flex-col items-center gap-3 ${joinState == 2 ? "" : "hidden"}`}>
            <FontAwesomeIcon icon={faCheck} className="text-9xl" />
            <span className="text-2xl">축하합니다! 가입에 성공하셨습니다!</span>
            <Button className="w-full" asChild>
              <Link href="/suggestions">
                건의하러 가기
              </Link>
            </Button>
          </div>
        </div>
        {joinState != 0 ? (
          <hr />
        ) : (
          <>
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
          </>
        )}
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