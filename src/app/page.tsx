"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { SnowEffect } from "@/components/ui/SnowEffect";
import { Hero } from "@/components/sections/Hero";
import { Greeting } from "@/components/sections/Greeting";
import { Parents } from "@/components/sections/Parents";
import { DdayCounter } from "@/components/sections/DdayCounter";
import { Gallery } from "@/components/sections/Gallery";
import { Calendar } from "@/components/sections/Calendar";
import { Location } from "@/components/sections/Location";
import { Account } from "@/components/sections/Account";

// 풀페이지 섹션 래퍼
function FullPageSection({
  children,
  isActive,
}: {
  children: React.ReactNode;
  isActive: boolean;
}) {
  return (
    <section className="h-real-screen w-full flex flex-col items-center justify-center overflow-hidden shrink-0">
      <div
        className={`w-full transition-all duration-1000 ease-out ${
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        }`}
      >
        {children}
      </div>
    </section>
  );
}

function MainContent() {
  const [currentSection, setCurrentSection] = useState(0);
  const isAnimatingRef = useRef(false);
  const wheelAccumulatorRef = useRef(0);
  const touchStartYRef = useRef(0);
  const sectionCount = 8;

  useEffect(() => {
    const goTo = (index: number) => {
      if (index < 0 || index >= sectionCount) return;
      if (isAnimatingRef.current) return;

      isAnimatingRef.current = true;
      setCurrentSection(index);

      setTimeout(() => {
        isAnimatingRef.current = false;
        wheelAccumulatorRef.current = 0;
      }, 800);
    };

    // 휠 이벤트 - 누적해서 임계값 넘으면 이동
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimatingRef.current) return;

      wheelAccumulatorRef.current += e.deltaY;

      // 임계값 (150px 이상 스크롤해야 이동)
      if (wheelAccumulatorRef.current > 150) {
        goTo(currentSection + 1);
      } else if (wheelAccumulatorRef.current < -150) {
        goTo(currentSection - 1);
      }
    };

    // 터치 시작
    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    // 터치 이동 방지
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };

    // 터치 종료
    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimatingRef.current) return;

      const diff = touchStartYRef.current - e.changedTouches[0].clientY;

      // 50px 이상 스와이프해야 이동
      if (diff > 50) {
        goTo(currentSection + 1);
      } else if (diff < -50) {
        goTo(currentSection - 1);
      }
    };

    // 일정 시간 후 누적값 리셋
    const resetAccumulator = setInterval(() => {
      if (!isAnimatingRef.current) {
        wheelAccumulatorRef.current = 0;
      }
    }, 200);

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      clearInterval(resetAccumulator);
    };
  }, [currentSection, sectionCount]);

  return (
    <div className="h-real-screen overflow-hidden relative">
      {/* 눈 내리는 효과 */}
      <SnowEffect />

      {/* 메인 콘텐츠 */}
      <div
        className="relative z-10 w-full flex flex-col transition-transform duration-700 ease-out"
        style={{
          transform: `translateY(calc(var(--vh, 1vh) * -100 * ${currentSection}))`,
        }}
      >
        <FullPageSection isActive={currentSection === 0}>
          <Hero />
        </FullPageSection>

        <FullPageSection isActive={currentSection === 1}>
          <Greeting />
        </FullPageSection>

        <FullPageSection isActive={currentSection === 2}>
          <Parents />
        </FullPageSection>

        <FullPageSection isActive={currentSection === 3}>
          <Calendar />
        </FullPageSection>

        <FullPageSection isActive={currentSection === 4}>
          <DdayCounter />
        </FullPageSection>

        <FullPageSection isActive={currentSection === 5}>
          <Gallery />
        </FullPageSection>

        <FullPageSection isActive={currentSection === 6}>
          <Location />
        </FullPageSection>

        <FullPageSection isActive={currentSection === 7}>
          <Account />
        </FullPageSection>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <MainContent />
    </Suspense>
  );
}
