"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
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
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { InView } from "react-intersection-observer"

export default function ExamIndex() {

  const examList = ["1학기 중간고사", "1학기 기말고사", "2학기 중간고사", "2학기 기말고사"]
  const subjectList = ["국어", "역사", "수학", "과학", "영어", "기술가정", "일본어"]

  const { toast } = useToast()
  const router = useRouter()

  const examSchema = z.object({
    examName: z.string({
      required_error: "필수 입력란입니다."
    }).refine(exam => examList.includes(exam), {
      message: "존재하지 않는 시험입니다."
    }),
    subjectName: z.string({
      required_error: "필수 입력란입니다."
    }).refine(role => subjectList.includes(role), {
      message: "존재하지 않는 과목입니다."
    })
  })

  const form = useForm<z.infer<typeof examSchema>>({
    resolver: zodResolver(examSchema)
  })

  async function submitExam(data: z.infer<typeof examSchema>) {
    if (data.examName == "1학기 중간고사") {
      toast({
        variant: "destructive",
        title: "이미 시험이 끝났습니다.",
        description: "다른 고사로 다시 시도해주세요.",
        action: <ToastAction altText="Try again">다시 고르기</ToastAction>,
      })
    } else if (data.examName != "1학기 기말고사") {
      toast({
        variant: "destructive",
        title: "아직 시험기간이 아닙니다.",
        description: "다른 고사로 다시 시도해주세요.",
        action: <ToastAction altText="Try again">다시 고르기</ToastAction>,
      })
    } else {
      if (data.subjectName == "영어" || data.subjectName == "수학" || data.subjectName == "일본어") {
        toast({
          variant: "destructive",
          title: "자료가 존재하지 않는 과목입니다.",
          description: "다른 과목으로 다시 시도해주세요.",
          action: <ToastAction altText="Try again">다시 고르기</ToastAction>,
        })
      } else {
        router.push(`/exam/${data.subjectName}`)
      }
    }
  }

  return (
    <>
      <div className="bg-foreground py-20">
        <section className="container items-center md:py-10">
          <div className="flex flex-col items-center gap-6">
            <h1 className={`font-KBO-Dia-Gothic_bold content animate__animated text-center text-3xl font-extrabold leading-tight tracking-tighter text-background lg:text-5xl`}
            >
              시험이 두려우시다면 <br />
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
            <InView triggerOnce={true} threshold={1} delay={4100}>
              {({ inView, ref }) => (
                <Card ref={ref} className={`animate__animated min-w-[500px] ${inView ? 'animate__fadeInUp' : 'invisible'}`}>
                  <CardHeader>
                    <CardTitle className="font-KBO-Dia-Gothic_bold">시험 대비 자료 확인</CardTitle>
                    <CardDescription className="font-SUITE-Regular">모든 시험의 자료를 확인하세요!</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(submitExam)} className="font-SUITE-Regular space-y-6">
                        <FormField
                          control={form.control}
                          name="examName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>고사명*</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="확인할 자료의 고사명을 고르세요." />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {examList.length ?
                                    examList.map(
                                      (examItem) => (
                                        <SelectItem key={examItem} value={examItem} className="font-SUITE-Regular">{examItem}</SelectItem>
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
                          name="subjectName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>과목명*</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="과목명을 고르세요." />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {subjectList.length ?
                                    subjectList.map(
                                      (subjectItem) => (
                                        <SelectItem key={subjectItem} value={subjectItem} className="font-SUITE-Regular">{subjectItem}</SelectItem>
                                      )
                                    ) : null}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex justify-end">
                          <Button type="submit">확인하기</Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              )}
            </InView>
          </div>
        </section>
      </div>
      <Toaster />
    </>
  )
}