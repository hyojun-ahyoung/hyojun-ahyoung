"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { SnowEffect } from "@/components/ui/SnowEffect";
import { Hero } from "@/components/sections/Hero";
import { Greeting } from "@/components/sections/Greeting";
import { Gallery } from "@/components/sections/Gallery";
import { Calendar } from "@/components/sections/Calendar";
import { DdayCounter } from "@/components/sections/DdayCounter";
import { Location } from "@/components/sections/Location";
import { Account } from "@/components/sections/Account";

// 풀페이지 섹션 래퍼
function FullPageSection({
  children,
  isActive,
  scrollable = false,
}: {
  children: React.ReactNode;
  isActive: boolean;
  scrollable?: boolean;
}) {
  return (
    <section
      className={`h-real-screen w-full flex flex-col items-center shrink-0 ${
        scrollable ? "overflow-y-auto" : "overflow-hidden justify-center"
      }`}
      data-scrollable={scrollable}
    >
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const isAnimatingRef = useRef(false);
  const wheelAccumulatorRef = useRef(0);
  const touchStartYRef = useRef(0);
  const sectionCount = 7;
  const scrollableSections = [5, 6]; // Location, Account 섹션

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

    const getScrollableSection = () => {
      if (!containerRef.current) return null;
      const sections = containerRef.current.querySelectorAll(
        "[data-scrollable='true']"
      );
      // 현재 섹션에 해당하는 스크롤 가능한 요소 찾기
      const scrollableIndex = scrollableSections.indexOf(currentSection);
      if (scrollableIndex === -1) return null;
      return sections[scrollableIndex] as HTMLElement | null;
    };

    // 휠 이벤트
    const handleWheel = (e: WheelEvent) => {
      if (isAnimatingRef.current) {
        e.preventDefault();
        return;
      }

      // 스크롤 가능한 섹션에서 내부 스크롤 처리
      if (scrollableSections.includes(currentSection)) {
        const scrollable = getScrollableSection();
        if (scrollable) {
          const isAtTop = scrollable.scrollTop <= 0;
          const isAtBottom =
            scrollable.scrollTop + scrollable.clientHeight >=
            scrollable.scrollHeight - 5;

          // 위로 스크롤 & 맨 위면 이전 섹션
          if (e.deltaY < 0 && isAtTop) {
            e.preventDefault();
            wheelAccumulatorRef.current += e.deltaY;
            if (wheelAccumulatorRef.current < -150) {
              goTo(currentSection - 1);
            }
            return;
          }
          // 아래로 스크롤 & 맨 아래면 다음 섹션
          if (e.deltaY > 0 && isAtBottom) {
            e.preventDefault();
            wheelAccumulatorRef.current += e.deltaY;
            if (wheelAccumulatorRef.current > 150) {
              goTo(currentSection + 1);
            }
            return;
          }
          // 그 외에는 내부 스크롤 허용
          return;
        }
      }

      // 일반 섹션
      e.preventDefault();
      wheelAccumulatorRef.current += e.deltaY;

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

    // 터치 이동
    const handleTouchMove = (e: TouchEvent) => {
      // 스크롤 가능한 섹션에서 내부 스크롤 허용
      if (scrollableSections.includes(currentSection)) {
        const scrollable = getScrollableSection();
        if (scrollable) {
          const isAtTop = scrollable.scrollTop <= 0;
          const isAtBottom =
            scrollable.scrollTop + scrollable.clientHeight >=
            scrollable.scrollHeight - 5;
          const touchY = e.touches[0].clientY;
          const diff = touchStartYRef.current - touchY;

          // 맨 위에서 아래로 당기거나, 맨 아래에서 위로 당기면 방지
          if ((isAtTop && diff < 0) || (isAtBottom && diff > 0)) {
            e.preventDefault();
          }
          return;
        }
      }
      e.preventDefault();
    };

    // 터치 종료
    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimatingRef.current) return;

      const diff = touchStartYRef.current - e.changedTouches[0].clientY;

      // 스크롤 가능한 섹션
      if (scrollableSections.includes(currentSection)) {
        const scrollable = getScrollableSection();
        if (scrollable) {
          const isAtTop = scrollable.scrollTop <= 0;
          const isAtBottom =
            scrollable.scrollTop + scrollable.clientHeight >=
            scrollable.scrollHeight - 5;

          if (diff < -50 && isAtTop) {
            goTo(currentSection - 1);
            return;
          }
          if (diff > 50 && isAtBottom) {
            goTo(currentSection + 1);
            return;
          }
          return;
        }
      }

      // 일반 섹션
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
    <div ref={containerRef} className="h-real-screen overflow-hidden relative">
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
          <Calendar />
        </FullPageSection>

        <FullPageSection isActive={currentSection === 3}>
          <DdayCounter />
        </FullPageSection>

        <FullPageSection isActive={currentSection === 4}>
          <Gallery />
        </FullPageSection>

        <FullPageSection isActive={currentSection === 5} scrollable>
          <Location />
        </FullPageSection>

        <FullPageSection isActive={currentSection === 6} scrollable>
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
