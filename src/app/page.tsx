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
import { StickerPhotos } from "@/components/sections/StickerPhotos";

function FadeInSection({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
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
        <StickerPhotos />
        <FadeInSection>
          <Calendar />
        </FadeInSection>
        
        <DdayCounter />
        <Location />  
        <Account />
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
