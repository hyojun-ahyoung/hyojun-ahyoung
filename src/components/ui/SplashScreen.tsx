"use client";

import { useEffect, useState } from "react";
import { WEDDING_INFO } from "@/constants/wedding-info";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // 1.5초 후 페이드아웃 시작
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1500);

    // 2초 후 완전히 제거
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  const { groom, bride, date } = WEDDING_INFO;
  const formattedDate = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* 블러 처리된 배경 */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md" />

      {/* 팝업 콘텐츠 */}
      <div
        className={`relative z-10 bg-white rounded-2xl shadow-2xl p-8 sm:p-12 mx-4 max-w-md w-full transform transition-all duration-500 ${
          isFadingOut ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {/* 장식 요소 */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-16 h-16 bg-linear-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">💍</span>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="text-center mt-6">
          <h2 className="text-lg sm:text-xl text-gray-600 font-light mb-4">
            Wedding Invitation
          </h2>

          <div className="my-8">
            <p className="text-3xl sm:text-4xl font-serif text-gray-800 mb-2">
              {groom.name} <span className="text-pink-400">♥</span> {bride.name}
            </p>
            <p className="text-base sm:text-lg text-gray-500 mt-4">
              {formattedDate}
            </p>
          </div>

          {/* 장식 라인 */}
          <div className="flex items-center justify-center gap-3 my-6">
            <div className="h-px w-12 bg-linear-to-r from-transparent to-pink-200"></div>
            <div className="w-2 h-2 rounded-full bg-pink-300"></div>
            <div className="h-px w-12 bg-linear-to-l from-transparent to-pink-200"></div>
          </div>

          <p className="text-sm sm:text-base text-gray-500 font-light">
            저희의 소중한 순간에
            <br />
            함께해 주세요
          </p>
        </div>
      </div>
    </div>
  );
}
