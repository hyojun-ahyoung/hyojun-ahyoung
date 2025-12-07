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

// 풀페이지 섹션 래퍼 (fade-in 애니메이션 포함)
function FullPageSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="min-h-screen w-full snap-start snap-always flex flex-col items-center justify-center"
    >
      <div
        className={`w-full transition-all duration-2000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-56"
        }`}
      >
        {children}
      </div>
    </section>
  );
}

function MainContent() {
  return (
    <>
      {/* 눈 내리는 효과 */}
      <SnowEffect />

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 w-full">
        <FullPageSection>
          <Hero />
        </FullPageSection>

        <FullPageSection>
          <Greeting />
        </FullPageSection>

        <FullPageSection>
          <Parents />
        </FullPageSection>

        <FullPageSection>
          <Calendar />
        </FullPageSection>

        <FullPageSection>
          <DdayCounter />
        </FullPageSection>

        <FullPageSection>
          <Gallery />
        </FullPageSection>

        <FullPageSection>
          <Location />
          <div className="h-32" />
        </FullPageSection>

        <FullPageSection>
          <Account />
        </FullPageSection>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <MainContent />
    </Suspense>
  );
}
