"use client";

import Image from "next/image";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ParentProfile() {
  return (
    <section className="w-full flex flex-col items-center mt-[144px]">
      <div className="w-full flex flex-col bg-[#FFDAE7] overflow-hidden">
        {/* 신랑 부모님 (상단) */}
        <div className="w-full">
          <ScrollReveal animation="slide-right" duration={1200}>
            <Image
              src="/images/hj_parents.png"
              alt="Groom Parents"
              width={400}
              height={500}
              className="w-full h-auto object-cover vertical-align-bottom block"
            />
          </ScrollReveal>
        </div>

        {/* 신부 부모님 (하단) */}
        <div className="w-full">
          <ScrollReveal animation="slide-left" duration={1200} delay={200}>
            <Image
              src="/images/ay_parents.png"
              alt="Bride Parents"
              width={400}
              height={500}
              className="w-full h-auto object-cover vertical-align-top block"
            />
          </ScrollReveal>
        </div>
      </div>
        {/* Best Text Image */}
        <div className="w-full flex justify-center px-[70px] pb-10 pt-8">
          <Image
            src="/best_text.svg"
            alt="Best Text"
            width={300}
            height={100}
            className="w-full h-auto"
          />
        </div>
    </section>
  );
}
