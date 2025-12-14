"use client";

import Image from "next/image";

export function Calendar() {
  return (
    <section
      className="flex flex-col items-center w-full bg-white px-6"
      style={{ fontFamily: "var(--font-gamtan)" }}
    >
      {/* 예식 안내 타이틀 */}
      <h2
        className="text-2xl text-[#3E8676] mb-8"
        style={{ fontFamily: "var(--font-gamtan)" }}
      >
        예식 안내
      </h2>

      {/* 날짜/시간/장소 */}
      <div className="flex flex-col items-center text-center gap-1 text-gray-800">
        <div className="text-lg">2026년 02월 08 일요일 오전 11시</div>
        <div className="text-lg">안산 AW컨벤션 6층 테라스볼룸홀</div>
      </div>

      {/* 달력 */}
      <div className="max-w-xs mx-auto flex items-center justify-center mt-12">
        <Image
          src="/calendar.svg"
          alt="Wedding Calendar"
          width={275}
          height={240}
        />
      </div>
    </section>
  );
}
