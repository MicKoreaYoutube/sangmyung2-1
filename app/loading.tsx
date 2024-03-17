'use client'

import { Metadata } from "next"

import { LoadingComp } from "@/components/loading-comp"
import { useEffect, useState } from "react"

export const metadata: Metadata = {
  title: "loading..."
}

export default function Loading() {

  const [isLoading, loadingStateChanger] = useState(true)
  async function init() {
    setTimeout(()=>{
      loadingStateChanger(false)
    }, 2000)
  }
  useEffect(()=>{
    init()
  }, [])

  return (
    <>
      <div className="flex h-[80vh] items-center justify-center bg-background">
        <section className="container flex flex-col space-y-4">
          <div role="status">
            <LoadingComp size={96}/>
            <span className="sr-only">Loading...</span>
          </div>
          <h1 className="font-KBO-Dia-Gothic_bold text-center text-6xl font-extrabold">loading...</h1>
        </section>
      </div>
    </>
  )
}
