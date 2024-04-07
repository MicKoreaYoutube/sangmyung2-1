'use client'

import { useState, useEffect } from "react"

import Link from "next/link"

import { doc, updateDoc, onSnapshot, DocumentData, query, collection, orderBy, where, limit } from "firebase/firestore"
import { auth, db } from "@/firebase/initialization"

import { AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export function MyInformation() {

  const user = auth.currentUser

  const { toast } = useToast()

  const [userData, setUserData] = useState<DocumentData | undefined>()

  const allowedRoles = ["회장", "자치부장", "정보부장"]

  const promotionFormSchema = z.object({
    whichRole: z.string({
      required_error: "필수 입력란입니다."
    }).refine(role => allowedRoles.includes(role), {
      message: "허용되지 않는 직책입니다."
    })
  })

  const form = useForm<z.infer<typeof promotionFormSchema>>({
    resolver: zodResolver(promotionFormSchema)
  })

  async function promotion(data: z.infer<typeof promotionFormSchema>) {
    if (user) {
      await updateDoc(doc(db, "users", user.uid), {
        applyToPromotion: data.whichRole
      })
    }
    toast({
      title: "승진이 신청되었습니다.",
      description: `신청한 직책: ${data.whichRole}`,
    })
  }

  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
        setUserData(doc.data())
      })
    }
  }, [user])

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-KBO-Dia-Gothic_bold text-3xl">개인정보</CardTitle>
          <CardDescription className="font-SUITE-Regular text-lg">귀하의 개인정보입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="font-KBO-Dia-Gothic_bold flex flex-col gap-4 text-2xl">
            <div className="flex flex-row gap-3">
              <Avatar className="h-16 w-16">
                <AvatarImage src={`${user?.photoURL}`} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h1>학번: {user?.displayName}</h1>
                <h1 className="flex gap-3 text-lg text-muted-foreground">
                  <span>직급: {userData && userData.role ? userData.role : ""}</span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="font-SUITE-Regular" size="sm">승진 신청</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="font-KBO-Dia-Gothic_bold text-2xl">승진 신청</DialogTitle>
                        <DialogDescription className="font-SUITE-Regular text-lg">
                          회장, 자치부장, 정보부장 전용입니다.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid items-center gap-4">
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(promotion)} className="font-SUITE-Regular space-y-5">
                              <FormField
                                control={form.control}
                                name="whichRole"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>승진할 직책*</FormLabel>
                                    <FormControl>
                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                          <SelectTrigger className="w-full">
                                            <SelectValue placeholder="직책을 선택하세요" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectGroup className="font-SUITE-Regular">
                                            <SelectItem value="회장">회장</SelectItem>
                                            <SelectItem value="자치부장">자치부장</SelectItem>
                                            <SelectItem value="정보부장">정보부장</SelectItem>
                                          </SelectGroup>
                                        </SelectContent>
                                      </Select>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <div className="flex justify-end">
                                <Button type="submit">신청하기</Button>
                              </div>
                            </form>
                          </Form>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </h1>
              </div>
            </div>
            <h1>이메일: {user?.email}</h1>
            <h1 className="flex gap-3"><span>비밀번호: ********</span><Button className="font-SUITE-Regular" asChild size="sm"><Link href="/dashboard/my/change-pwd">변경하기</Link></Button></h1>
          </div>
        </CardContent>
        <hr className="my-2" />
        <CardHeader>
          <CardTitle className="font-KBO-Dia-Gothic_bold text-3xl text-red-600">위험</CardTitle>
          <CardDescription className="font-SUITE-Regular text-lg text-red-600">중요한 작업을 처리하는 공간입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 text-red-600">
            <h1 className="font-KBO-Dia-Gothic_bold text-2xl">탈퇴하기</h1>
            <span className="font-SUITE-Regular">탈퇴 시 모든 정보가 삭제되며 복구는 불가합니다. (작성한 건의사항은 유지됩니다.)</span>
            <Button variant="destructive" className="font-SUITE-Regular">탈퇴하기</Button>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </>
  )
}

export function MySuggestions({ whereIsThisUsed }: { whereIsThisUsed: string }) {

  const user = auth.currentUser

  const q = whereIsThisUsed == "home" ? query(collection(db, "suggestions"), where("status", "!=", "delete"), limit(3)) : query(collection(db, "suggestions"), where("status", "!=", "delete"))

  const [suggestionsList, setSuggestionsList] = useState<DocumentData[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const suggestions: DocumentData[] = []
      querySnapshot.forEach((doc) => {
        suggestions.push({
          id: doc.id,
          ...doc.data()
        })
      })
      setSuggestionsList(suggestions)
    })
  }, [suggestionsList, q])

  const suggestionsListFiltered = suggestionsList.filter(suggestion => suggestion.author == user?.displayName)

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-KBO-Dia-Gothic_bold text-3xl">최근 작성한 건의 사항</CardTitle>
          <CardDescription className="font-SUITE-Regular text-lg">최근에 어떤 건의사항을 작성했는지 나옵니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className="font-KBO-Dia-Gothic_bold text-xl">최근에 작성한 건의사항: {suggestionsListFiltered.length}</h1>
          {suggestionsListFiltered.map(
            (item, index) => (
              <>
                {item.author == user?.displayName ? (
                  <Card className="my-4 w-full" key={index}>
                    <CardHeader>
                      <CardTitle className="font-KBO-Dia-Gothic_bold text-3xl">
                        <Link href={`/board/suggestions/${item.id}`} className="underline-offset-2 hover:underline">
                          {item.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="font-SUITE-Regular text-xl">{item.content.slice(0, 7)}</CardDescription>
                    </CardHeader>
                  </Card>
                ) : null}
              </>
            )
          )}
        </CardContent>
      </Card>
    </>
  )
}
