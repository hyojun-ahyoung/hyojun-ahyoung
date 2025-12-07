"use client";

import Image from "next/image";
import { WEDDING_INFO } from "@/constants/wedding-info";

export function Parents() {
  const { groom, bride } = WEDDING_INFO;

  return (
    <section className="flex flex-col items-center text-center px-6 gap-8 bg-white w-full">
      {/* 일러스트 이미지 영역 */}
      <div className="flex items-center justify-center">
        <Image
          src="/images/greeting.png"
          alt="Wedding Illustration"
          width={180}
          height={180}
          className="object-contain"
        />
      </div>

      {/* 부모님 정보 */}
      <div className="flex justify-center">
        <div
          className="space-y-3 text-gray-800"
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
      </div>
    </section>
  );
}
