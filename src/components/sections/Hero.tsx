"use client";

import Image from "next/image";

interface HeroProps {
  guestName?: string;
  polite: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Hero({ guestName, polite }: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden">
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
