"use client";

import Image from "next/image";
import { WEDDING_INFO } from "@/constants/wedding-info";

export function Greeting() {
  const { groom, bride } = WEDDING_INFO;

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

      {/* 부모님 정보 */}
      <div
        className="flex flex-col items-center gap-3 mt-10 text-gray-800"
        style={{ fontFamily: "var(--font-gamtan)" }}
      >
        <div className="flex items-baseline">
          <div className="flex items-baseline gap-3 text-xl">
            <span>{groom.fatherName}</span>
            <span className="text-sm">♥</span>
            <span>{groom.motherName}</span>
          </div>
          <div className="text-normal w-12 text-left ml-1">의 아들</div>
          <div className="text-xl font-medium ml-3">{groom.fullName}</div>
        </div>

        <div className="flex items-baseline">
          <div className="flex items-baseline gap-3 text-xl">
            <span>{bride.fatherName}</span>
            <span className="text-sm">♥</span>
            <span>{bride.motherName}</span>
          </div>
          <div className="text-normal w-12 text-left ml-1">의 딸</div>
          <div className="text-xl font-medium ml-3">{bride.fullName}</div>
        </div>
      </div>
    </section>
  );
}
