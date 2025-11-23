"use client";

import Image from "next/image";
import { WEDDING_INFO } from "@/constants/wedding-info";
import { calculateDday } from "@/utils/text";

export function DdayCounter() {
  // mounted 체크 없이 바로 D-Day 계산
  const dday = calculateDday(WEDDING_INFO.date);

  // 애니메이션 없이 바로 진행률 계산
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
    <section className="w-full py-12 px-6">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-14">
        {/* Text Section */}
        <div className="text-center space-y-4 relative z-20">
          <p
            className="text-3xl sm:text-4xl text-gray-800"
            style={{ fontFamily: "var(--font-hanason)" }}
          >
            Can&apos;t Wait To Say &apos;I Do&apos;
          </p>
          <p
            className="text-5xl sm:text-6xl font-bold text-gray-800"
            style={{ fontFamily: "var(--font-hanason)" }}
          >
            {getDdayText()}
          </p>
        </div>

        {/* Progress Bar Section */}
        {/* 텍스트와 겹치지 않도록 상단 여백(mt-32) 충분히 확보 */}
        <div className="w-[calc(100%-100px)] max-w-md relative mx-auto">
          {/* Characters Area */}
          <div className="absolute bottom-full left-0 w-full mb-2 h-14 pointer-events-none z-10">
            {/* Groom - Moves with progress */}
            <div
              className="absolute bottom-0 flex flex-col items-center"
              style={{
                left: `${progress}%`,
                transform: "translateX(calc(-50% - 25px))",
              }}
            >
              <div className="relative w-[50px] h-[50px]">
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
              <div className="relative w-[55px] h-[55px]">
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
          <div className="h-3 w-full bg-gray-200 rounded-full relative overflow-visible">
            {/* Filled Bar */}
            <div
              className="h-full bg-pink-300 rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              {/* Heart Icon at the tip of the bar */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20">
                <div className="relative w-8 h-8">
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
      </div>
    </section>
  );
}
