'use client'

import { useState, useEffect, useRef } from "react"

import { doc, onSnapshot, updateDoc, DocumentData } from "firebase/firestore"
import { auth, db } from "@/firebase/initialization"

import Link from "next/link"
import { useRouter } from "next/navigation"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export default function BoardSuggestionsDeletePage({ params }: { params: { suggestionID: string } }) {

  const router = useRouter()

  const [suggestion, setSuggestion] = useState<DocumentData>()
  const [error, setError] = useState({ isError: false, errorCode: "", errorMessage: "" })

  const activateDialogButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(()=>{
    if (activateDialogButtonRef.current) activateDialogButtonRef.current.click()
  }, [])

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "suggestions", params.suggestionID), (querySnapshot) => {
      setSuggestion(querySnapshot.data())
    })
  }, [params.suggestionID])

  async function deleteDocument() {
    try {
      await updateDoc(doc(db, "suggestions", params.suggestionID), {
        status: "delete"
      })
      router.push("/board/suggestions")
    } catch (error: any) {
      if (activateDialogButtonRef.current) activateDialogButtonRef.current.click()
      const errorCode = error.code
      const errorMessage = error.message
      setError({ isError: true, errorCode: errorCode, errorMessage: errorMessage })
      setTimeout(() => {
        setError({ isError: false, errorCode: "", errorMessage: "" })
      }, 3000)
    }
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="hidden" ref={activateDialogButtonRef}>Show Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader className="text-red-500">
            <AlertDialogTitle className="font-KBO-Dia-Gothic_bold md:text-2xl">{error && error.errorCode ? error.errorCode : "진짜로 삭제하시겠습니까?"}</AlertDialogTitle>
            <AlertDialogDescription className="font-SUITE-Regular md:text-lg">
              {error && error.errorCode ? error.errorMessage : "건의 사항을 삭제하시면 건의 사항과 그 게시물의 댓글도 전부 삭제됩니다. 그래도 진짜로 삭제하시겠습니까?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="font-TheJamsil5Bold">
            <AlertDialogCancel onClick={router.back}>취소</AlertDialogCancel>
            <AlertDialogAction onClick={deleteDocument}>삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

