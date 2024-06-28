"use client"

import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { InView } from "react-intersection-observer"
import { useState } from "react"

export default function ExamDetail({ params }: { params: { subject: string } }) {

  return (
    <>
      <div className="bg-foreground py-20">
        <section className="container items-center md:py-10">
          <div className="flex flex-col items-center gap-6">
            <h1 className={`font-KBO-Dia-Gothic_bold content animate__animated text-center text-3xl font-extrabold leading-tight tracking-tighter text-background lg:text-5xl`}
            >
              {decodeURI(params.subject)} 시험이 두려우시다면 <br />
              <InView triggerOnce={true} threshold={1} delay={1600}>
                {({ inView, ref }) => (
                  <span ref={ref} className={`animate__animated ${inView ? 'animate__fadeInUp' : 'invisible'}`}>다양한 시험 관련 자료를 이곳에서 확인하세요!</span>
                )}
              </InView>
            </h1>
            <InView triggerOnce={true} threshold={1} delay={2300}>
              {({ inView, ref }) => (
                <p ref={ref} className={`font-SUITE-Regular animate__animated text-center text-lg text-muted-foreground ${inView ? 'animate__fadeInUp' : 'invisible'}`}>
                  부디 잘 활용하셔서 만점받길 바랍니다!!
                </p>
              )}
            </InView>
            <InView triggerOnce={true} threshold={0.6} delay={4100}>
              {({ inView, ref }) => (
                <Card ref={ref} className={`animate__animated min-w-[500px] ${inView ? 'animate__fadeInUp' : 'invisible'}`}>
                  <CardHeader>
                    <CardTitle className="font-KBO-Dia-Gothic_bold">{decodeURI(params.subject)} 시험 대비 자료 확인</CardTitle>
                    <CardDescription className="font-SUITE-Regular">{decodeURI(params.subject)} 시험의 자료를 확인하세요!</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SubjectIndicator subject={decodeURI(params.subject)} />
                  </CardContent>
                </Card>
              )}
            </InView>
          </div>
        </section>
      </div>
    </>
  )
}

function SubjectIndicator({ subject }: { subject: string }) {

  const unitList = ["동백꽃", "양반전", "둘 다"]
  const questionFormatList = ["객관식 - 단어 맞추기", "주관식", "객관식 - 뜻 맞추기"]
  const [koreanState, setKoreanState] = useState("startPage")
  let questionList = []

  const examSchema = z.object({
    unitName: z.string({
      required_error: "필수 입력란입니다."
    }).refine(unit => unitList.includes(unit), {
      message: "존재하지 않는 단원입니다."
    }),
    questionFormat: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "반드시 하나 이상을 선택해야 합니다.",
    }),
    questionNum: z.string({
      required_error: "필수 입력란입니다."
    })
  })

  const koreaExamSchema = z.object({
    answer: z.string({
      required_error: "필수 입력란입니다."
    })
  })

  const form = useForm<z.infer<typeof examSchema>>({
    resolver: zodResolver(examSchema),
    defaultValues: {
      questionFormat: []
    }
  })

  const form2 = useForm<z.infer<typeof koreaExamSchema>>({
    resolver: zodResolver(koreaExamSchema)
  })

  function submitExam(data: z.infer<typeof examSchema>) {
    console.log(data)
    setKoreanState("examPage")
    for (let i = 1; i <= Number(data.questionNum); i++) {
      questionList.push({
        questionFormat: data.questionFormat[Math.floor(Math.random() * data.questionFormat.length)],
        question: "하이!"
      })
    }
  }

  function submitAnswer(data: z.infer<typeof koreaExamSchema>) {

  }

  switch (subject) {

    case "국어":
      return (
        <>
          {koreanState == "startPage" ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(submitExam)} className="font-SUITE-Regular space-y-6">
                <FormField
                  control={form.control}
                  name="unitName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>단원명*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="시험 칠 단원을 고르세요." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {unitList.length ?
                            unitList.map(
                              (unitItem) => (
                                <SelectItem key={unitItem} value={unitItem} className="font-SUITE-Regular">{unitItem}</SelectItem>
                              )
                            ) : null}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="questionFormat"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>시험 방식*</FormLabel>
                      </div>
                      {questionFormatList.map((item) => (
                        <FormField
                          key={item}
                          control={form.control}
                          name="questionFormat"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item])
                                        : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item
                                          )
                                        )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel>{item}</FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="questionNum"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>문제 수</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-3"
                        >
                          {[5, 10, 20, 30, 40, 50].map(
                            (radioItem) => (
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={`${radioItem}`} />
                                </FormControl>
                                <FormLabel className="font-normal">{radioItem} 문제</FormLabel>
                              </FormItem>
                            )
                          )}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button type="submit">확인하기</Button>
                </div>
              </form>
            </Form>
          ) : (
            <>
              <Form {...form2}>
                <form onSubmit={form2.handleSubmit(submitAnswer)} className="font-SUITE-Regular space-y-6">
                  <FormField
                    control={form2.control}
                    name="answer"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>문제 수</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-3"
                          >
                            {[5, 10, 20, 30, 40, 50].map(
                              (radioItem) => (
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value={`${radioItem}`} />
                                  </FormControl>
                                  <FormLabel className="font-normal">{radioItem} 문제</FormLabel>
                                </FormItem>
                              )
                            )}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Button type="submit">확인하기</Button>
                  </div>
                </form>
              </Form>
            </>
          )}
        </>
      )

    case "역사":
      return (
        <></>
      )
  }
}