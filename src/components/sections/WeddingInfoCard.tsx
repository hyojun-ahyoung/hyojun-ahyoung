"use client";

import { WEDDING_INFO } from "@/constants/wedding-info";

export function WeddingInfoCard() {
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
  );
}
