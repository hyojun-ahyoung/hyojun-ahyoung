"use client";

import Image from "next/image";

export function Hero() {
  return (
    <section className="relative w-full flex flex-col items-center">
      {/* 타이틀 이미지 */}
      <div className="absolute top-[40px] z-20 w-full px-6">
        <Image
          src="/images/main_title.png"
          alt="Save the Date"
          width={400}
          height={200}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      {/* 메인 이미지 */}
      <div className="relative mt-[130px] mx-3 w-[calc(100%-24px)]">
        <Image
          src="/images/main.png"
          alt="Wedding Main"
          width={351}
          height={424}
          className="w-full h-auto"
          priority
        />
      </div>
    </section>
  );
}
