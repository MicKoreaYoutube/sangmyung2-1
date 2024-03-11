'use client'

import Link from "next/link"

import { InView } from "react-intersection-observer"

import { siteConfig } from "@/config/site"

import { buttonVariants } from "@/components/ui/button"
import { Button } from "@/components/ui/button"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Page() {

  const classToAdd = "animate__fadeIn"

  return (
    <>
      <div className="bg-foreground py-12">
        <section className="container items-center md:py-10">
          <div className="flex flex-col items-center gap-2">
            <h1 className={`font-KBO-Dia-Gothic_bold content animate__animated text-center text-3xl font-extrabold leading-tight tracking-tighter text-background lg:text-5xl`}
            >
              안녕하세요. 이곳은 <br />
              <InView triggerOnce={true} threshold={1} delay={1600}>
                {({ inView, ref }) => (
                  <span ref={ref} className={`animate__animated ${inView ? 'animate__fadeInUp' : 'invisible'}`}>상명중학교 2학년 1반 건의함 사이트 입니다.</span>
                )}
              </InView>
            </h1>
            <InView triggerOnce={true} threshold={1} delay={2300}>
              {({ inView, ref }) => (
                <p ref={ref} className={`font-SUITE-Regular animate__animated text-center text-lg text-muted-foreground ${inView ? 'animate__fadeInUp' : 'invisible'}`}>
                  상명중학교 2학년 1반은 여러분의 건의로 완성됩니다. 언제나 편하게 건의해주세요!
                </p>
              )}
            </InView>
          </div>
        </section>
      </div>
      <div className="bg-background">
        <section className="container grid items-center gap-4 py-10">
          <div className="flex flex-col items-start gap-2">
            <InView triggerOnce={true} threshold={1}>
              {({ inView, ref }) => (
                <h1 className={`font-KBO-Dia-Gothic_bold content animate__animated text-3xl font-extrabold leading-tight tracking-tighter lg:text-5xl ${inView ? classToAdd : 'invisible'}`}
                  ref={ref}>
                  최근 건의 사항
                </h1>
              )}
            </InView>
            <InView triggerOnce={true} threshold={1} delay={2300}>
              {({ inView, ref }) => (
                <p ref={ref} className={`font-SUITE-Regular animate__animated text-lg text-muted-foreground ${inView ? 'animate__fadeInUp' : 'invisible'}`}>
                  최근에 올라온 건의 사항들을 확인하세요!
                </p>
              )}
            </InView>
          </div>
          <div className="grid gap-4">
            {[0, 1, 2].map(
              (item) => (
                <InView triggerOnce={true} threshold={1} key={item}>
                  {({ inView, ref }) => (
                    <Card className={`animate__animated w-full ${inView ? "animate__fadeInUp" : "invisible"}`} ref={ref}>
                      <CardHeader>
                        <CardTitle className="font-KBO-Dia-Gothic_bold text-3xl">건의사항 {item}</CardTitle>
                        <CardDescription className="font-SUITE-Regular text-xl">내용 {item}</CardDescription>
                      </CardHeader>
                    </Card>
                  )}
                </InView>
              )
            )}
          </div>
        </section>
      </div>
      <div className="bg-foreground py-12">
        <section className="container items-center md:py-10">
          <div className="flex flex-col items-center gap-4">
            <h1 className={`font-KBO-Dia-Gothic_bold content animate__animated text-center text-3xl font-extrabold leading-tight tracking-tighter text-background lg:text-5xl`}
            >
              <InView triggerOnce={true} threshold={1}>
                {({ inView, ref }) => (
                  <span ref={ref} className={`animate__animated ${inView ? 'animate__fadeInUp' : 'invisible'}`}>직접 건의하고 싶나요?</span>
                )}
              </InView>
            </h1>
            <InView triggerOnce={true} threshold={1}>
              {({ inView, ref }) => (
                <div ref={ref} className={`font-TheJamsil5Bold animate__animated flex flex-col gap-4 md:flex-row ${inView ? 'animate__fadeInUp' : 'invisible'}`}>
                  <Link
                    href={siteConfig.links.shadcnuiDocs}
                    target="_blank"
                    rel="noreferrer"
                    className={buttonVariants({ variant: "defaultDark" })}
                  >
                    건의 사항 작성하기
                  </Link>
                  <Link
                    target="_blank"
                    rel="noreferrer"
                    href={siteConfig.links.micGithub}
                    className={buttonVariants({ variant: "outlineDark" })}
                  >
                    내가 쓴 건의 사항 확인하기
                  </Link>
                </div>
              )}
            </InView>
          </div>
        </section>
      </div>
      <div className="bg-background">
        <section className="container grid items-center gap-4 py-10">
          <div className="flex flex-col items-start gap-2">
            <InView triggerOnce={true} threshold={1}>
              {({ inView, ref }) => (
                <h1 className={`font-KBO-Dia-Gothic_bold content animate__animated text-3xl font-extrabold leading-tight tracking-tighter lg:text-5xl ${inView ? classToAdd : 'invisible'}`}
                  ref={ref}>
                  최근에 올라온 공지
                </h1>
              )}
            </InView>
            <InView triggerOnce={true} threshold={1} delay={2300}>
              {({ inView, ref }) => (
                <p ref={ref} className={`font-SUITE-Regular animate__animated text-lg text-muted-foreground ${inView ? 'animate__fadeInUp' : 'invisible'}`}>
                  최근에 올라온 공지들도 확인하세요!
                </p>
              )}
            </InView>
          </div>
          <div className="grid gap-4">
            {[0, 1, 2].map(
              (item) => (
                <InView triggerOnce={true} threshold={1} key={item}>
                  {({ inView, ref }) => (
                    <Card className={`animate__animated w-full ${inView ? "animate__fadeInUp" : "invisible"}`} ref={ref}>
                      <CardHeader>
                        <CardTitle className="font-KBO-Dia-Gothic_bold text-3xl">공지 {item}</CardTitle>
                        <CardDescription className="font-SUITE-Regular text-xl">내용 {item}</CardDescription>
                      </CardHeader>
                    </Card>
                  )}
                </InView>
              )
            )}
          </div>
        </section>
      </div>
    </>
  )
}
