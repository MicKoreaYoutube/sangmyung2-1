'use client';

import { Metadata } from "next"
import Link from "next/link"

import { Button, buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Error 404"
}

function goBack() {
  history.go(-1)
}

export default function NotFound() {
  return (
    <>
      <div className="flex h-[80vh] items-center justify-center bg-background">
        <section className="containe">
          <div className="flex flex-col items-center gap-2">
            <h1 className="font-KBO-Dia-Gothic_bold text-6xl font-extrabold leading-tight tracking-tighter md:text-9xl">
              404
            </h1>
            <div className="text-center">
              <p className="md:6xl font-SUITE-Regular text-4xl text-slate-500">
                No Page Found
              </p>
              <p className="md:xl font-SUITE-Regular text-lg text-slate-300">
                The page your looking for does not exist. Please check the url or the realseNote to check out the problem.
              </p>
            </div>
          </div>
          <div className="font-TheJamsil5Bold mt-2 flex justify-center gap-4">
            <Link
              href="/"
              rel="noreferrer"
              className={buttonVariants()}
            >
              Go to home
            </Link>
            <Button
              variant={"outline"}
              rel="noreferrer"
              onClick={goBack}
            >
              Go back to recent page
            </Button>
          </div>
        </section>
      </div>
    </>
  )
}
