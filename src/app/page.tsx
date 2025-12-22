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

import { WeddingDateInfo } from "@/components/sections/WeddingDateInfo";

import { ParentProfile } from "@/components/sections/ParentProfile";

function FadeInSection({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // 한 번 나타나면 관찰 중단 (원하는 경우 주석 해제)
          // observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // 10% 정도 보이면 등장
        rootMargin: "0px 0px -50px 0px", // 약간 미리 등장하거나 늦게 등장하게 조절 가능
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
}

function MainContent() {
  return (
    <div className="min-h-screen w-full relative overflow-x-hidden">
      {/* 눈 내리는 효과 */}
      <SnowEffect />

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 w-full flex flex-col">
        {/* Hero는 처음에 바로 보여야 하므로 FadeIn 효과가 굳이 필요 없거나, 
            애초에 visible 상태로 시작할 수도 있지만, 
            통일성을 위해 감싸되 초기 딜레이를 줄 수도 있음.
            보통 Hero는 그냥 보여주는 게 좋음. */}
        <section>
           <Hero />
        </section>

        <FadeInSection>
          <WeddingDateInfo />
        </FadeInSection>

        <section className="py-10">
          <Greeting />
        </section>

        <ParentProfile />

        <Gallery />
        
        <section className="py-10">
          <FadeInSection>
            <Calendar />
          </FadeInSection>
        </section>

        <section className="py-10">
          <FadeInSection>
            <DdayCounter />
          </FadeInSection>
        </section>

    

        <section className="py-10">
          <FadeInSection>
            <Location />
          </FadeInSection>
        </section>

        <section className="py-10 pb-20">
          <FadeInSection>
            <Account />
          </FadeInSection>
        </section>
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
