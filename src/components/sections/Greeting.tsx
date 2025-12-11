"use client";

import Image from "next/image";

export function Greeting() {
  return (
    <section className="flex flex-col items-center w-full px-6">
      <Image
        src="/images/text.png"
        alt="인사말"
        width={448}
        height={600}
        className="w-full h-auto -mt-16"
        priority
      />
    </section>
  );
}
