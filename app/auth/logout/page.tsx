'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { signOut } from "firebase/auth"
import { auth } from "@/firebase/initialization"

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

import { AlertCircle } from 'lucide-react'

export default function Login() {

  const router = useRouter()

  const [sec, setSec] = useState(3)
  const [error, setError] = useState({ isError: false, errorCode: "", errorMessage: "" })

  const showErrorRef = useRef<HTMLButtonElement>(null)

  signOut(auth).then(() => {
    router.push("/")
  }).catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
    setError({ isError: true, errorCode: errorCode, errorMessage: errorMessage })
  })

  useEffect(() => {
    if (error) {
      showErrorRef.current?.click()
      setInterval(() => {
        setSec(prevSec => prevSec - 1)
      }, 1000)
      router.push("/")
    }
  }, [error, sec, router])

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" ref={showErrorRef}>Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="text-red-500">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex flex-row">
            <AlertCircle className="mx-1 my-auto h-4 w-4" />
            <span>{error.errorCode}</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-red-500">
            {error.errorMessage}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogDescription className="text-red-500">
            {sec}초 후에 전 페이지로 리다이렉트됩니다.
          </AlertDialogDescription>
          <AlertDialogAction onClick={router.back}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}