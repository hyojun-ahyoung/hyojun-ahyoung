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
        className="flex flex-col items-center gap-3 mt-10 text-gray-800 w-full"
        style={{ fontFamily: "var(--font-gamtan)" }}
      >
        <div className="flex items-baseline justify-center whitespace-nowrap parent-info-text">
          <span>{groom.fatherName}</span>
          <span className="parent-info-heart mx-2">♥</span>
          <span>{groom.motherName}</span>
          <span className="parent-info-text-small w-12 text-left ml-1">
            의 아들
          </span>
          <span className="font-medium ml-2">{groom.fullName}</span>
        </div>

        <div className="flex items-baseline justify-center whitespace-nowrap parent-info-text">
          <span>{bride.fatherName}</span>
          <span className="parent-info-heart mx-2">♥</span>
          <span>{bride.motherName}</span>
          <span className="parent-info-text-small w-12 text-left ml-1">
            의 딸
          </span>
          <span className="font-medium ml-2">{bride.fullName}</span>
        </div>
      </div>
    </section>
  );
}
