"use client";

import { Suspense } from "react";
import { useQueryParams } from "@/hooks/useQueryParams";
import { SnowEffect } from "@/components/ui/SnowEffect";
import { Hero } from "@/components/sections/Hero";
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
        <DdayCounter />
        <CoupleInfo polite={polite} />
        <DateTime />
        <Calendar />
        <Gallery />
        <Timeline />
        <Location />
        <Account />

        {/* 푸터 */}
        <footer className="w-full py-16 px-6 text-center">
          <p className="text-sm sm:text-base text-gray-500">
            Thank you for celebrating with us
          </p>
        </footer>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex flex-col items-center">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <MainContent />
      </Suspense>
    </div>
  );
}
