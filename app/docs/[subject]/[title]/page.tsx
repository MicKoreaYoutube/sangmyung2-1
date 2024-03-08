'use client'

import { siteConfig } from "@/config/site"

import parse from "html-react-parser"

import { notFound } from "next/navigation"

import { useEffect } from "react"

import { ChapterSidebar } from "@/components/sidebar"

export default function DocsTitlePage({ params }: { params: { subject: string, title: string } }) {

  const foundSubject = siteConfig.docsSidebarContent.find(obj => obj.title == decodeURI(params.subject))
  const foundObject: { title: string; doc?: string; chapter?: string[] } | undefined = foundSubject?.content?.find(obj => obj.title == decodeURI(params.title))

  return (
    <div className="flex flex-row justify-between">
        <div className="h-[80vh] w-full justify-self-stretch p-12">{foundObject?.doc ? parse(foundObject?.doc) : notFound()}</div>
        <ChapterSidebar items={foundObject?.chapter} />
    </div>
  )
}
