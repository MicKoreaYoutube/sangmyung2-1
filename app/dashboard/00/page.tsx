'use client'

import { useState } from "react"

import fuseAPI from "fuse.js"

import { Input } from "@/components/ui/input"

export default function Dashboard00() {

  const [query, queryChanger] = useState("")
  const [result, resultChanger] = useState<any>()

  const data = ["React", "Next.js", "Deno", "Bun", "Mojo", "엄랭"]
  const fuse = new fuseAPI(data)

  return (
    <>
      <Input placeholder="search anything" onChange={(e)=>{
        resultChanger(fuse.search(e.target.value))
      }}/>
      {query}
      <br />
      {JSON.stringify(result)}
      {result?.map((item: any, index: any) => (
          <li key={index}>{item.item}</li>
        ))}
    </>
  )
}