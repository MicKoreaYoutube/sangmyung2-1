"use client"

import { MySuggestions, MyInformation } from "@/components/dashboard-comp"

import { updateProfile } from "firebase/auth"
import { auth } from "@/firebase/initialization"
import { useEffect } from "react"

export default function DashboardPage() {

  const user = auth.currentUser

  useEffect(() => {
    if (user && user.photoURL != "https://firebasestorage.googleapis.com/v0/b/sangmyung2-1.appspot.com/o/userPhoto%2FbasicUserImage.png?alt=media&token=439dbde6-91ae-4148-9d3c-4094a17be78b") {
      updateProfile(user, {
        photoURL: "https://firebasestorage.googleapis.com/v0/b/sangmyung2-1.appspot.com/o/userPhoto%2FbasicUserImage.png?alt=media&token=439dbde6-91ae-4148-9d3c-4094a17be78b"
      }).then(() => {
        console.log("성공!")
      }).catch((e) => {
        console.log(e)
      })
    }
  }, [user])

  return (
    <div className="flex w-full flex-col justify-stretch gap-5 md:flex-row">
      <MySuggestions whereIsThisUsed="home" />
      <MyInformation />
    </div>
  )
}
