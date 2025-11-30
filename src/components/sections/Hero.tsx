"use client";

import Image from "next/image";
import { WEDDING_INFO } from "@/constants/wedding-info";

interface HeroProps {
  guestName?: string;
  polite: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Hero({ guestName, polite }: HeroProps) {
  const { groom, bride, date, venue } = WEDDING_INFO;

  // 날짜 포맷팅
  const formatWeddingDate = () => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const days = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    const dayOfWeek = days[date.getDay()];
    const hours = date.getHours();
    const ampm = hours < 12 ? "오전" : "오후";
    const displayHours = hours <= 12 ? hours : hours - 12;

    return `${year}년 ${month}월 ${day} ${dayOfWeek} ${ampm} ${displayHours}시`;
  };

  return (
    <section className="relative w-full flex flex-col overflow-hidden h-svh">
      {/* 상단: 이미지 영역 */}
      <div className="relative w-full flex-1 min-h-0">
        <Image
          src="/images/main.png"
          alt="Wedding Main"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* 하단: 정보 카드 */}
      <div className="w-full bg-white min-h-[180px] text-center flex flex-col justify-center items-center">
        {/* 이름 */}
        <h2
          className="text-gray-800 uppercase flex items-center justify-center gap-4"
          style={{
            fontFamily: "var(--font-gamtan)",
            fontSize: "18px",
            fontWeight: 400,
            lineHeight: "180%",
            letterSpacing: "-0.01em",
          }}
        >
          {groom.fullName} <span className="text-[12px]">🖤</span>{" "}
          {bride.fullName}
        </h2>

        {/* 날짜 */}
        <p
          className=""
          style={{
            fontFamily: "var(--font-gamtan)",
            fontSize: "15px",
            fontWeight: 400,
            lineHeight: "180%",
            letterSpacing: "-0.01em",
          }}
        >
          {formatWeddingDate()}
        </p>

        {/* 장소 */}
        <p
          className=""
          style={{
            fontFamily: "var(--font-gamtan)",
            fontSize: "15px",
            fontWeight: 400,
            lineHeight: "180%",
            letterSpacing: "-0.01em",
          }}
        >
          {venue.city && `${venue.city} `}
          {venue.name} {venue.floor} {venue.hall}
        </p>
      </div>
    </section>
  );
}
