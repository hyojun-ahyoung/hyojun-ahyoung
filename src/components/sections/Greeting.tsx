"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Greeting() {
  return (
    <section className="flex flex-col items-center w-full mt-[100px] gap-[40px] overflow-hidden">
      {/* 1. First Image */}
      <div className="w-full px-[30px] flex justify-center">
        <ScrollReveal animation="fade-up" duration={1200}>
          <Image
            src="/images/first_image.png"
            alt="Wedding Photo 1"
            width={400}
            height={300}
            className="w-full h-auto object-cover rounded-sm shadow-md"
            priority
          />
        </ScrollReveal>
      </div>

      {/* 2. First Text */}
      <div className="w-full flex justify-center px-4">
        <ScrollReveal animation="fade-in" delay={300} duration={1500}>
          <Image
            src="/first_text.svg"
            alt="First Greeting Text"
            width={280}
            height={100}
            className="w-auto h-auto"
          />
        </ScrollReveal>
      </div>

      {/* 3. Second Image */}
      <div className="w-full">
        <ScrollReveal animation="zoom-in" duration={1500}>
          <Image
            src="/images/second_image.png"
            alt="Wedding Photo 2"
            width={400}
            height={300}
            className="w-full h-auto object-cover"
          />
        </ScrollReveal>
      </div>

      {/* 4. Second Text */}
      <div className="w-full flex justify-center px-4">
        <ScrollReveal animation="fade-in" delay={300} duration={1500}>
          <Image
            src="/second_text.svg"
            alt="Second Greeting Text"
            width={280}
            height={100}
            className="w-auto h-auto"
          />
        </ScrollReveal>
      </div>

      {/* 5. Third Image */}
      <div className="w-full px-[68px] flex justify-center">
        <ScrollReveal animation="fade-up" duration={1200}>
          <Image
            src="/images/third_image.png"
            alt="Wedding Photo 3"
            width={300}
            height={400}
            className="w-full h-auto object-cover rounded-sm shadow-md"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
