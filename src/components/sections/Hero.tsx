"use client";

import Image from "next/image";

export function Hero() {
  return (
    <section className="relative w-full h-real-screen overflow-hidden">
      {/* 배경 이미지 - 전체 화면 가득 채움 */}
      <Image
        src="/images/main.png"
        alt="Wedding Main"
        fill
        className="object-cover"
        priority
      />
      {/* 텍스트 - 이미지 위에 오버레이 */}
      <div className="absolute top-0 left-0 right-0 z-10 flex flex-col items-center text-center">
        <div
          className="text-normal pt-11 pb-5 text-[#EFAEC4]"
          style={{ fontFamily: "var(--font-vesper-libre)" }}
        >
          Welcome To Our Wedding Day
        </div>
      </div>
    </section>
  );
}
