"use client";

import Image from "next/image";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="flex flex-col items-center text-center">
        <div
          className="text-normal pt-11 pb-5 text-[#EFAEC4]"
          style={{ fontFamily: "var(--font-vesper-libre)" }}
        >
          Welcome To Our Wedding Day
        </div>
      </div>
      {/* 이미지 영역 */}
      <div className="w-full">
        <Image
          src="/images/main.png"
          alt="Wedding Main"
          width={440}
          height={600}
          className="w-full h-auto"
          priority
        />
      </div>
    </section>
  );
}
