// "use client"

// import { userList, userType } from "./columns"
// import { DataTable } from "./data-table"

// import { onSnapshot, collection, DocumentData } from "firebase/firestore"
// import { db } from "@/firebase/initialization"
// import { useEffect } from "react"

// export default async function DemoPage() {

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, "users"), (querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         userList.push({
//           id: doc.id,
//           ...doc.data()
//         })
//       })
//     })
//   }, [userList])

//   return (
//     <div className="container mx-auto py-10">
//       <DataTable columns={userList} data={userList} />
//     </div>
//   )
// }

"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { doc, collection, onSnapshot, orderBy, query, updateDoc, DocumentData } from "firebase/firestore"
import { auth, db } from "@/firebase/initialization"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function AdminPage() {

  const user = auth.currentUser

  const router = useRouter()

  useEffect(() => {
    if (user == null) {
      alert("아직 준비중인 기능입니다.")
      router.back()
    }
  }, [user, router])

  return (
    <>
      <section className="container grid gap-7 py-20 md:px-40">
        <div className="grid gap-3 space-y-4">
          <h1 className="font-KBO-Dia-Gothic_bold text-center text-5xl md:text-7xl">유저 관리</h1>
          <Card>
            <CardContent>
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">유저 이름</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
