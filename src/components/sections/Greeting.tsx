"use client";

import Image from "next/image";

export function Greeting() {
  return (
    <section className="flex flex-col items-center w-full px-16">
      <Image
        src="/images/text.png"
        alt="인사말"
        width={448}
        height={600}
        className="w-full h-auto"
        priority
      />
    </section>
  );
}
