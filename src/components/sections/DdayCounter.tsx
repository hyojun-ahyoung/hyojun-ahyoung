"use client";

import Image from "next/image";
import { WEDDING_INFO } from "@/constants/wedding-info";
import { calculateDday } from "@/utils/text";

export function DdayCounter() {
  const dday = calculateDday(WEDDING_INFO.date);

  const totalRange = 100;
  const daysPassed = totalRange - dday;
  const progress = Math.max(0, Math.min(100, (daysPassed / totalRange) * 100));

  const getDdayText = () => {
    if (dday > 0) {
      return `D-${dday}`;
    } else if (dday === 0) {
      return "D-Day";
    } else {
      return `D+${Math.abs(dday)}`;
    }
  };

  return (
    <section
      className="flex flex-col items-center w-full bg-white px-6"
      style={{ fontFamily: "var(--font-gamtan)" }}
    >
      {/* We Can't Wait To Say "I Do" 텍스트 */}
      <p
        className="text-[#EFAEC4] whitespace-nowrap text-4xl leading-[150%]"
        style={{
          fontFamily: "var(--font-incheon)",
        }}
      >
        We Can&apos;t Wait To Say
      </p>
      <p
        className="text-[#EFAEC4] text-4xl whitespace-nowrap leading-[150%]"
        style={{
          fontFamily: "var(--font-incheon)",
        }}
      >
        &quot;I Do&quot;
      </p>

      {/* D-day 카운터 */}
      <div className="w-full max-w-sm relative mx-auto mt-40">
        {/* Characters Area */}
        <div className="absolute bottom-full left-0 w-full h-32 pointer-events-none">
          {/* Groom - Moves with progress */}
          <div
            className="absolute bottom-0 flex flex-col items-center"
            style={{
              left: `${progress}%`,
              transform: "translateX(calc(-50% - 20px))",
            }}
          >
            {/* D-day 텍스트 */}
            <div
              className="flex items-center gap-1 mb-1 translate-x-4"
              style={{ fontFamily: "var(--font-hanason)" }}
            >
              <span className="text-xl text-gray-800">{getDdayText()}</span>
              <span className="text-lg">💦</span>
            </div>
            <div className="relative w-24 h-24">
              <Image
                src="/images/jun.png"
                alt="Groom"
                fill
                className="object-contain"
                sizes="50px"
                priority
              />
            </div>
          </div>

          {/* Bride - Static at end */}
          <div className="absolute bottom-0 right-0 transform translate-x-[20%]">
            <div className="relative w-24 h-24">
              <Image
                src="/images/amy.png"
                alt="Bride"
                fill
                className="object-contain"
                sizes="55px"
                priority
              />
            </div>
          </div>
        </div>

        {/* Bar Container */}
        <div className="h-3 w-full bg-gray-200 rounded-full relative overflow-visible z-20">
          {/* Filled Bar */}
          <div
            className="h-full bg-pink-300 rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            {/* Heart Icon at the tip of the bar */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30">
              <div className="relative w-14 h-14">
                <Image
                  src="/images/heart.png"
                  alt="Heart"
                  fill
                  className="object-contain drop-shadow-md"
                  sizes="32px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 결혼식 남은 날 */}
      <p
        className="text-gray-600 mt-8 text-[19px] font-normal leading-[120%] text-center capitalize"
        style={{ fontFamily: "var(--font-gamtan)" }}
      >
        {WEDDING_INFO.groom.name}{" "}
        <span className="text-[#EFAEC4] text-sm">♥</span>{" "}
        {WEDDING_INFO.bride.name}의 결혼식이{" "}
        <span className="text-[#EFAEC4] font-bold">{dday}일</span> 남았습니다.
      </p>
    </section>
  );
}
