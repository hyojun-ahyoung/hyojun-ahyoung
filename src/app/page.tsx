"use client";

import { Suspense } from "react";
import { useQueryParams } from "@/hooks/useQueryParams";
import { SnowEffect } from "@/components/ui/SnowEffect";
import { Hero } from "@/components/sections/Hero";
import { Greeting } from "@/components/sections/Greeting";
import { DdayCounter } from "@/components/sections/DdayCounter";
import { CoupleInfo } from "@/components/sections/CoupleInfo";
import { DateTime } from "@/components/sections/DateTime";
import { Gallery } from "@/components/sections/Gallery";
import { Calendar } from "@/components/sections/Calendar";
import { Timeline } from "@/components/sections/Timeline";
import { Location } from "@/components/sections/Location";
import { Account } from "@/components/sections/Account";

function MainContent() {
  const { name, polite = true } = useQueryParams();

  return (
    <>
      {/* 눈 내리는 효과 */}
      <SnowEffect />

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <Hero guestName={name} polite={polite} />
        <Greeting />
        <Calendar />
        <section className="h-10" />
        <DdayCounter />
        <section className="h-10" />
        <Gallery />
        <section className="h-10" />
        <Location />
        <section className="h-10" />
        <Account />
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
