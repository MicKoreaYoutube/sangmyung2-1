'use client'

import Link from "next/link"

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
  PaginationEllipsis,
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


export function MyInformation() {
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
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h1>학번: 20110이준영</h1>
                <h1 className="flex gap-3 text-lg text-muted-foreground"><span>직급: 총관리자(회장)</span><Button className="font-SUITE-Regular" size="sm">승진 신청</Button></h1>
              </div>
            </div>
            <h1>이메일: 111@111.111</h1>
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
    </>
  )
}

export function MySuggestions({ whereIsThisUsed }: { whereIsThisUsed: string }) {
  return (
    <>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-KBO-Dia-Gothic_bold text-3xl">최근 작성한 건의 사항</CardTitle>
          <CardDescription className="font-SUITE-Regular text-lg">최근에 어떤 건의사항을 작성했는지 나옵니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className="font-KBO-Dia-Gothic_bold text-xl">최근에 작성한 건의사항: 0</h1>
          {[0, 1, 2].map(
            (item) => (
              <Card className="my-4 w-full" key={item}>
                <CardHeader>
                  <CardTitle className="font-KBO-Dia-Gothic_bold text-3xl">건의사항 {item}</CardTitle>
                  <CardDescription className="font-SUITE-Regular text-xl">내용 {item}</CardDescription>
                </CardHeader>
              </Card>
            )
          )}
        </CardContent>
        {whereIsThisUsed == "home" ? (
          <CardFooter className="flex justify-end">
            <Button className="font-SUITE-Regular">+더보기</Button>
          </CardFooter>
        ) : (
          <CardFooter>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        )}
      </Card>
    </>
  )
}
