"use client";

import Image from "next/image";

export function Hero() {
  return (
    <section className="relative w-full h-real-screen overflow-hidden flex flex-col">
      <div className="flex flex-col items-center text-center shrink-0">
        <div
          className="text-normal pt-11 pb-5 text-[#EFAEC4]"
          style={{ fontFamily: "var(--font-vesper-libre)" }}
        >
          Welcome To Our Wedding Day
        </div>
      </div>
      {/* 이미지 영역 */}
      <div className="w-full flex-1 relative">
        <Image
          src="/images/main.png"
          alt="Wedding Main"
          fill
          className="object-contain object-top"
          priority
        />
      </div>
    </section>
  );
}
