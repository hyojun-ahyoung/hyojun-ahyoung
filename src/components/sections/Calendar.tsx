"use client";

import Image from "next/image";

export function Calendar() {
  return (
    <section
      className="flex flex-col items-center w-full px-6 py-12 mt-[60px]"
      style={{ 
        fontFamily: "var(--font-gamtan)",
        backgroundColor: "#FFC2D7B2" 
      }}
    >
      {/* 년월 텍스트 */}
      <div 
        className="text-[#5A5A5A] mb-6"
        style={{
          fontSize: "16px",
          fontWeight: 600,
          lineHeight: "100%",
          letterSpacing: "-0.01em",
        }}
      >
        2026.02
      </div>

      {/* 달력 */}
      <div className="max-w-xs mx-auto flex items-center justify-center">
        <Image
          src="/calendar.svg"
          alt="Wedding Calendar"
          width={275}
          height={240}
        />
      </div>
    </section>
  );
}
