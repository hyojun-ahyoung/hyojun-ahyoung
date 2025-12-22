"use client";

import Image from "next/image";

export function WeddingDateInfo() {
  return (
    <section className="w-full flex flex-col items-center pt-20">
      {/* 날짜 SVG */}
      <div className="relative w-[120px] h-[50px] mb-6">
        <Image
          src="/wedding_date.svg"
          alt="20260208"
          fill
          className="object-contain"
        />
      </div>

      {/* 텍스트 정보 */}
      <div className="flex flex-col items-center gap-1 text-center">
        <p
          className="text-base text-[#5A5A5A]"
          style={{
            fontFamily: "var(--font-gamtan)",
            fontWeight: 600,
            lineHeight: "180%",
            letterSpacing: "-0.01em",
          }}
        >
          2026년 02월 08 일요일 오전 11시
        </p>
        <p
          className="text-base text-[#5A5A5A]"
          style={{
            fontFamily: "var(--font-gamtan)",
            fontWeight: 600,
            lineHeight: "180%",
            letterSpacing: "-0.01em",
          }}
        >
          안산 AW컨벤션 6층 테라스볼룸홀
        </p>
      </div>
    </section>
  );
}
