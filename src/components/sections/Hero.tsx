"use client";

import { WEDDING_INFO } from "@/constants/wedding-info";
import { usePoliteText } from "@/hooks/usePoliteText";
import { formatDate, formatTime } from "@/utils/text";

interface HeroProps {
  guestName?: string;
  polite: boolean;
}

export function Hero({ guestName, polite }: HeroProps) {
  const { getText } = usePoliteText(polite);
  const { groom, bride, date } = WEDDING_INFO;

  const getGreetingMessage = () => {
    if (!guestName) {
      return polite ? "소중한 분을 초대합니다" : "소중한 사람을 초대해";
    }
    return polite
      ? `${guestName}님, 결혼식에 와주세요!`
      : `${guestName}야, 결혼식에 와줘!`;
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-6 py-16 md:py-20">
      <div className="text-center max-w-2xl mx-auto w-full">
        {/* 인사말 */}
        <div className="mb-16 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8 text-gray-800 leading-relaxed px-4">
            {getGreetingMessage()}
          </h1>
          <div className="w-20 h-px bg-gray-300 mx-auto my-10" />
        </div>

        {/* 신랑신부 이름 */}
        <div className="mb-16 md:mb-12">
          <div className="flex items-center justify-center gap-3 sm:gap-4 text-3xl sm:text-4xl md:text-5xl font-light text-gray-700">
            <span>{groom.name}</span>
            <span className="text-gray-400 text-2xl sm:text-3xl">·</span>
            <span>{bride.name}</span>
          </div>
        </div>

        {/* 날짜 및 시간 */}
        <div className="space-y-3 text-gray-600 px-4">
          <p className="text-lg sm:text-xl">{formatDate(date)}</p>
          <p className="text-lg sm:text-xl">{formatTime(date)}</p>
          <p className="text-base sm:text-lg mt-6">{WEDDING_INFO.venue.name}</p>
          {WEDDING_INFO.venue.hall && (
            <p className="text-sm sm:text-base text-gray-500">
              {WEDDING_INFO.venue.floor} {WEDDING_INFO.venue.hall}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
