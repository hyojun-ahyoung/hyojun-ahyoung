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
    <section style={{ fontFamily: "var(--font-gamtan)" }}>
      {/* D-day 카운터 */}
      <div className="w-full max-w-sm relative mx-auto mt-40 mb-20">
        {/* Characters Area */}
        <div className="absolute bottom-full left-0 w-full h-40 pointer-events-none">
          {/* Groom - Moves with progress */}
          <div
            className="absolute bottom-0 flex flex-col items-center"
            style={{
              left: `${progress}%`,
              transform: "translateX(calc(-50% - 20px))",
            }}
          >
            <div className="relative w-32 h-32">
              <Image
                src="/images/jun.png"
                alt="Groom"
                fill
                className="object-contain"
                sizes="128px"
                priority
              />
            </div>
          </div>

          {/* Bride - Static at end */}
          <div className="absolute bottom-0 right-0 transform translate-x-[20%]">
            <div className="relative w-32 h-32">
              <Image
                src="/images/amy.png"
                alt="Bride"
                fill
                className="object-contain"
                sizes="128px"
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
                  sizes="56px"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Text Below Bar - Moves with progress */}
        <div className="absolute top-full mt-6 left-0 w-full pointer-events-none">
          <div
            className="absolute top-0 flex flex-col items-center"
            style={{
              left: `${progress}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div
              className="flex items-center gap-1"
              style={{ fontFamily: "var(--font-hanason)" }}
            >
              <span className="text-2xl text-gray-800">{getDdayText()}</span>
              <span className="text-xl">💦</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
