'use client'

import { siteConfig } from "@/config/site"

import parse from "html-react-parser"

import { notFound } from "next/navigation"

import { ChapterSidebar } from "@/components/sidebar"

export default function DocsSubjectPage({ params }: { params: { subject: string } }) {

  const foundObject = siteConfig.docsSidebarContent.find(obj => obj.title == decodeURI(params.subject))

  return (
    <div className="flex flex-row justify-between">
        <div className="h-[80vh] w-full justify-self-stretch p-12">{foundObject?.doc ? parse(foundObject?.doc) : notFound()}</div>
        <ChapterSidebar items={foundObject?.chapter} />
    </div>
  )
}