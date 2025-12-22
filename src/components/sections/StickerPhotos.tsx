"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function StickerPhotos() {
  const images = ["ker_1.jpg", "ker_2.jpg", "ker_3.jpg", "ker_4.jpg"];

  return (
    <section className="w-full mt-[54px] px-[52px] flex flex-col items-center">
      {/* 이미지 리스트 컨테이너 - 상단 60px 패딩, 간격 10px */}
      <div className="w-full pt-[60px] flex flex-col gap-[10px]">
        {images.map((img, index) => (
          <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
            <div className="w-full">
              <Image
                src={`/images/${img}`}
                alt={`Sticker Photo ${index + 1}`}
                width={400}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* 하단 텍스트 - 마지막 이미지로부터 40px */}
      <div
        className="mt-[40px] text-center text-[#EFAEC4] text-[20px]"
        style={{
          fontFamily: "var(--font-incheon)", // iceSimin = IncheonEducationCitizen
          fontWeight: 400,
          lineHeight: "150%",
          letterSpacing: "-0.05em",
          textTransform: "capitalize",
        }}
      >
        We can’t wait to say “I do”
      </div>
    </section>
  );
}
