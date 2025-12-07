"use client";

import Image from "next/image";

export function Calendar() {
  return (
    <section
      className="flex flex-col items-center w-full bg-white gap-20"
      style={{ fontFamily: "var(--font-gamtan)" }}
    >
      <div className="flex flex-col items-center text-center gap-8">
        <div className="font-bold text-2xl">예식안내</div>
        <div className="text-lg">
          <div>2026년 02월 08 일요일 오전 11시</div>
          <div>안산 AW컨벤션 6층 테라스볼룸홀</div>
        </div>
      </div>
      <div className="max-w-md mx-auto flex items-center justify-center px-8">
        <Image
          src="/calendar.svg"
          alt="Wedding Calendar"
          width={375}
          height={300}
        />
      </div>
    </section>
  );
}
