"use client";

import { Suspense } from "react";
import { SnowEffect } from "@/components/ui/SnowEffect";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Hero } from "@/components/sections/Hero";
import { Greeting } from "@/components/sections/Greeting";
import { DdayCounter } from "@/components/sections/DdayCounter";
import { Gallery } from "@/components/sections/Gallery";
import { Calendar } from "@/components/sections/Calendar";
import { Location } from "@/components/sections/Location";
import { Account } from "@/components/sections/Account";

function MainContent() {
  return (
    <>
      {/* 눈 내리는 효과 */}
      <SnowEffect />

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <Hero />

        <section className="h-32" />

        <ScrollReveal>
          <Greeting />
        </ScrollReveal>

        <section className="h-32" />

        <ScrollReveal delay={100}>
          <Calendar />
        </ScrollReveal>

        <section className="h-10" />

        <ScrollReveal>
          <DdayCounter />
        </ScrollReveal>

        <section className="h-10" />

        <ScrollReveal>
          <Gallery />
        </ScrollReveal>

        <section className="h-10" />

        <ScrollReveal>
          <Location />
        </ScrollReveal>

        <section className="h-32" />

        <ScrollReveal>
          <Account />
        </ScrollReveal>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col items-center pb-24">
      <Suspense fallback={null}>
        <MainContent />
      </Suspense>
    </div>
  );
}
