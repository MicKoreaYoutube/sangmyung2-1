"use client"

import { useRouter, notFound } from "next/navigation"
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
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { InView } from "react-intersection-observer"
import { useState } from "react"

interface questionListType {
  unit: string
  questionFormat: string
  question: string
  choices?: string[]
  answer: string
}

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
                    <CardTitle className="font-KBO-Dia-Gothic_bold text-2xl md:text-3xl">{decodeURI(params.subject)} 시험 대비 자료 확인</CardTitle>
                    <CardDescription className="font-SUITE-Regular text-md md:text-xl">{decodeURI(params.subject)} 시험의 자료를 확인하세요!</CardDescription>
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
  let questions: questionListType[] = []
  const [questionList, setQuestionList] = useState<questionListType[]>([])
  const wordList: {
    [key: string]: {
      [key: string]: string
    },
  } = {
    "동백꽃": {
      "횃소리": "날짐승이 크게 날갯짓을 하면서 탁탁 치는 소리.",
      "실팍하다": "사람이나 물건 따위가 보기에 매우 실하다.",
      "쌩이질": "한창 바쁠 때에 쓸데없는 일로 남을 귀찮게 구는 짓. 본말은 '씨양이질'.",
      "수작": "남의 말이나 행동, 계획을 낮잡아 이르는 말.",
      "할금할금": "곁눈으로 살그머니 계속 할겨 보는 모양.",
      "생색": "다른 사람 앞에 당당히 나설 수 있거나 자랑할 수 있는 체면.",
      "마름": "(옛날에) 땅 주인을 대신하여 농지를 관리하는 사람.",
      "수군수군하다": "남이 알아듣지 못하도록 낮은 목소리로 가만가만 자꾸 이야기하다.",
      "봉당": "안방과 건넌방 사이의 마루를 놓을 자리에 마루를 놓지 않고 흙바닥 그대로 둔 곳.",
      "암팡스레": "몸은 작아도 야무지고 다부진 면이 있게.",
      "풍기다": "어떤 분위기가 나다. 또는 그런 것을 자아내다.",
      "서슬": "① 쇠붙이로 만든 연장이나 유리 조각 따위의 날카로운 부분. ② 강하고 날카로운 기세.",
      "열벙거지": "'화(火)'를 속되게 이르는 말. 매우 급하게 치밀어 오르는 화증.",
      "대거리": "상대편에게 맞서서 대듦. 또는 그런 말이나 행동.",
      "두엄": "풀, 짚 또는 가축의 배설물 따위를 썩힌 거름.",
      "감때사납다": "① 사람이 억세고 사납다. ② 사물이 험하고 거칠다.",
      "하릴없이": "① 달리 어떻게 할 도리가 없이. ② 조금도 틀림이 없이.",
      "뻐드러지다": "굳어서 뻣뻣하게 되다.",
      "삭정이": "살아 있는 나무에 붙어 있는, 말라 죽은 가지.",
      "싱둥겅둥": "건성건성, 정성을 들이지 않고 대강대강 일을 하는 모양.",
      "호드기": "봄철에 물오른 버드나무 가지의 껍질을 고루 비틀어 뽑은 껍질이나 짤막한 밀짚 토막 따위로 만든 피리.",
      "빈사지경(瀕死地境)": "거의 죽게 된 처지나 형편.",
      "걱실걱실히": "성질이 너그러워 말과 행동을 시원스럽게 하는 모양.",
      "알싸하다": "매운맛이나 독한 냄새 따위로 코 속이나 혀끝이 알알하다."
    },
    "양반전": {
      "사족": "선비나 무인(武人)의 집안. 또는 그 자손.",
      "군수": "조선 시대에 둔, 지방 행정 단위인 군의 으뜸 벼슬.",
      "환자": "환곡. 조선 시대에, 각 고을에서 봄에 백성들에게 곡식을 꾸어 주고 가을에 이자를 붙여 거두던 일. 또는 그 곡식.",
      "섬": "부피의 단위, 곡식, 가루, 액체 따위의 부피를 잴 때 쓴다.",
      "관찰사": "조선 시대에 둔, 각 도의 으뜸 벼슬.",
      "순시하다": "돌아다니며 사정을 보살피다.",
      "관아": "예전에, 벼슬아치들이 모여 나랏일을 처리하던 곳.",
      "축내다": "① 일정한 수나 양에서 모자람이 생기게 하다. ② 몸이나 얼굴 따위에서 살이 빠지게 하다.",
      "푼": "① 예전에, 엽전을 세던 단위. ② 돈을 세는 단위. 스스로 적은 액수라고 여길 때 쓴다.",
      "비천하다": "지위나 신분이 낮고 천하다.",
      "벙거지": "조선 시대에 궁중 또는 양반집의 하인이 쓰던 털로 만든 모자.",
      "잠방이": "가랑이가 무릎까지 내려오도록 짧게 만든 홑바지.",
      "소인": "신분이 낮은 사람이 자기보다 신분이 높은 사람에게 자기를 가리키는 말.",
      "사사로이": "공적(公的)이 아닌 개인적인 범위나 관계의 성질이 있게.",
      "빌미": "재앙이나 탈 따위가 생기는 원인.",
      "증서": "권리나 의무, 사실 따위를 증명하는 문서.",
      "좌수": "조선시대에, 지방의 자치기구인 향청의 우두머리.",
      "별감": "조선시대에, 향청에 속한 직책, 고을의 좌수에 버금가는 자리였다.",
      "일절": "아주, 전혀, 절대로의 뜻으로, 흔히 행위를 그치게 하거나 어떤 일을 하지 않을 때에 쓰는 말.",
      "오경": "하룻밤을 다섯 부분으로 나누었을 때 맨 마지막 부분. 새벽 세 시에서 다섯 시 사이이다.",
      "마소": "말과 소를 아울러 이르는 말.",
      "삼성": "오리온자리에 있는 별들. 중앙에 나란히 있는 세 개의 큰 별을 '삼형제별'이라 한다.",
      "사농공상": "예전에, 백성을 나누던 네 가지 계급, 선비, 농부, 공장(工匠), 상인을 이르던 말이다.",
      "홍패": "문과 급제자에게 주던 합격증서.",
      "음관": "과거를 거치지 아니하고 조상의 공덕에 의하여 맡은 벼슬. 또는 그런 벼슬아치.",
      "일산": "햇볕을 가리기 위하여 세우는 큰 양산. 우산보다 크며 놀이할 때에 한데에다 세운다.",
      "설렁줄": "처마 끝 같은 곳에 달아 놓은 방울을 울릴 때 잡아당기는 줄. 사람을 부를 때 쓴다.",
      "부예지다": "살갗이나 얼굴 등이 허옇고 멀겋게 되다.",
      "맹랑하다": "생각하던 바와 달리 허망하다."
    }
  }
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const examSchema = z.object({
    unitName: z.enum(["동백꽃", "양반전", "둘 다"], {
      required_error: "필수 입력란입니다."
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
      const questionFormat = data.questionFormat[Math.floor(Math.random() * data.questionFormat.length)]
      const unit = data.unitName == "둘 다" ? (Math.random() > 0.5 ? "동백꽃" : "양반전") : data.unitName
      const unitKeyList = Object.keys(wordList[unit])
      let randomWord = unitKeyList[Math.floor(Math.random() * unitKeyList.length)]
      questions.forEach((question) => {
        while (question.question == randomWord || question.answer == randomWord) {
          randomWord = unitKeyList[Math.floor(Math.random() * unitKeyList.length)]
        }
      })
      let choices: string[] = []
      if (questionFormat == "객관식 - 뜻 맞추기") {
        for (let j = 1; j <= 4; j++) {
          let randomChoices = unitKeyList[Math.floor(Math.random() * unitKeyList.length)]
          while (choices.includes(wordList[unit][randomChoices]) || randomChoices == randomWord) {
            randomChoices = unitKeyList[Math.floor(Math.random() * unitKeyList.length)]
          }
          choices.push(wordList[unit][randomChoices])
        }
        choices.push(wordList[unit][randomWord])
      } else {
        for (let j = 1; j <= 4; j++) {
          let randomChoices = unitKeyList[Math.floor(Math.random() * unitKeyList.length)]
          while (choices.includes(randomChoices) || randomChoices == randomWord) {
            randomChoices = unitKeyList[Math.floor(Math.random() * unitKeyList.length)]
          }
          choices.push(randomChoices)
        }
        choices.push(randomWord)
      }
      choices.sort(() => Math.random() - 0.5)
      questions.push({
        unit: unit,
        questionFormat: questionFormat,
        question: questionFormat == "객관식 - 뜻 맞추기" ? randomWord : wordList[unit][randomWord],
        choices: questionFormat.includes("객관식") ? choices : undefined,
        answer: questionFormat == "객관식 - 뜻 맞추기" ? wordList[unit][randomWord] : randomWord
      })
    }
    console.log(questions)
    setQuestionList(questions)
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
            <div>
              <h1 className="font-KBO-Dia-Gothic_bold text-md md:text-xl">{currentQuestion + 1}. {questionList[currentQuestion].question}</h1>
              <Form {...form2}>
                <form onSubmit={form2.handleSubmit(submitAnswer)} className="font-SUITE-Regular space-y-6">
                  <FormField
                    control={form2.control}
                    name="answer"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>정답</FormLabel>
                        <FormControl>
                          {questionList[currentQuestion].questionFormat.includes("객관식") ? (
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col"
                            >
                              {questionList[currentQuestion].choices?.map(
                                (radioItem) => (
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value={`${radioItem}`} />
                                    </FormControl>
                                    <FormLabel className="font-normal">{radioItem}</FormLabel>
                                  </FormItem>
                                )
                              )}
                            </RadioGroup>
                          ) : (
                            <Input placeholder="정답 입력..." {...field} />
                          )}
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
            </div>
          )}
        </>
      )

    case "역사":
      return (
        <></>
      )

    default:
      notFound()
      return (
        <></>
      )
  }
}