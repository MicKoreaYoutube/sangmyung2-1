'use client'

import Link from "next/link"

import { InView } from "react-intersection-observer"

import { siteConfig } from "@/config/site"

import { buttonVariants } from "@/components/ui/button"

export default function Page() {

  const classToAdd = "animate__fadeIn"

  return (
    <>
      <div className="bg-background">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex flex-col items-start gap-2">
            <InView triggerOnce={true} threshold={1}>
              {({ inView, ref, entry }) => (
                <h1 className={`font-KBO-Dia-Gothic_bold content animate__animated text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl ${inView ? classToAdd : 'invisible'}`}
                  ref={ref}>
                  Beautifully designed components <br className="hidden sm:inline" />
                  built with Radix UI and Tailwind CSS.
                </h1>
              )}
            </InView>
            <p className=" font-SUITE-Regular text-lg text-muted-foreground">
              Accessible and customizable components that you can copy and paste
              into your apps. Free. Open Source. And Next.js 13 Ready.
            </p>
          </div>
          <div className="font-TheJamsil5Bold flex gap-4">
            <Link
              href={siteConfig.links.shadcnuiDocs}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants()}
            >
              Documentation
            </Link>
            <Link
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.micGithub}
              className={buttonVariants({ variant: "outline" })}
            >
              GitHub
            </Link>
          </div>
        </section>
      </div>
      <div className="bg-foreground">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex flex-col items-start gap-2">
            <InView triggerOnce={true} threshold={1}>
              {({ inView, ref, entry }) => (
                <h1 className={`font-KBO-Dia-Gothic_bold content animate__animated text-3xl font-extrabold leading-tight tracking-tighter text-background md:text-4xl ${inView ? classToAdd : 'invisible'}`}
                  ref={ref}>
                  Beautifully designed components <br className="hidden sm:inline" />
                  built with Radix UI and Tailwind CSS.
                </h1>
              )}
            </InView>
            <p className="font-SUITE-Regular text-lg text-muted-foreground">
              Accessible and customizable components that you can copy and paste
              into your apps. Free. Open Source. And Next.js 13 Ready.
            </p>
          </div>
          <div className="font-TheJamsil5Bold flex gap-4">
            <Link
              href={siteConfig.links.shadcnuiDocs}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "defaultDark" })}
            >
              Documentation
            </Link>
            <Link
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.micGithub}
              className={buttonVariants({ variant: "outlineDark" })}
            >
              GitHub
            </Link>
          </div>
        </section>
      </div>
      <div className="bg-background">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex flex-col items-start gap-2">
            <InView triggerOnce={true} threshold={1}>
              {({ inView, ref, entry }) => (
                <h1 className={`font-KBO-Dia-Gothic_bold content animate__animated text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl ${inView ? classToAdd : 'invisible'}`}
                  ref={ref}>
                  Beautifully designed components <br className="hidden sm:inline" />
                  built with Radix UI and Tailwind CSS.
                </h1>
              )}
            </InView>
            <p className=" font-SUITE-Regular text-lg text-muted-foreground">
              Accessible and customizable components that you can copy and paste
              into your apps. Free. Open Source. And Next.js 13 Ready.
            </p>
          </div>
          <div className="font-TheJamsil5Bold flex gap-4">
            <Link
              href={siteConfig.links.shadcnuiDocs}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants()}
            >
              Documentation
            </Link>
            <Link
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.micGithub}
              className={buttonVariants({ variant: "outline" })}
            >
              GitHub
            </Link>
          </div>
        </section>
      </div>
      <div className="bg-foreground">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex flex-col items-start gap-2">
            <InView triggerOnce={true} threshold={1}>
              {({ inView, ref, entry }) => (
                <h1 className={`font-KBO-Dia-Gothic_bold content animate__animated text-3xl font-extrabold leading-tight tracking-tighter text-background md:text-4xl ${inView ? classToAdd : 'invisible'}`}
                  ref={ref}>
                  Beautifully designed components <br className="hidden sm:inline" />
                  built with Radix UI and Tailwind CSS.
                </h1>
              )}
            </InView>
            <p className="font-SUITE-Regular text-lg text-muted-foreground">
              Accessible and customizable components that you can copy and paste
              into your apps. Free. Open Source. And Next.js 13 Ready.
            </p>
          </div>
          <div className="font-TheJamsil5Bold flex gap-4">
            <Link
              href={siteConfig.links.shadcnuiDocs}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "defaultDark" })}
            >
              Documentation
            </Link>
            <Link
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.micGithub}
              className={buttonVariants({ variant: "outlineDark" })}
            >
              GitHub
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
