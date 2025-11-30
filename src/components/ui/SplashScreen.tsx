"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";

  useEffect(() => {
    // 1.5초 후 페이드아웃 시작
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2000);

    // 2초 후 완전히 제거
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md transition-opacity duration-500 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* 팝업 콘텐츠 */}
      <div
        className={`bg-white mx-5 w-full max-w-[400px] transform transition-all duration-500 ${
          isFadingOut ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {/* splash.svg 배경 이미지 */}
        <div className="relative w-full py-10 px-6">
          <Image
            src="/splash.svg"
            alt="Wedding Invitation"
            width={400}
            height={300}
            className="w-full h-auto"
            priority
          />

          {/* 텍스트 오버레이 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p
              className="text-lg text-[#628869] italic mb-2"
              style={{ fontFamily: "var(--font-hanason)" }}
            >
              Wedding Invitation
            </p>
            {name && (
              <p
                className="text-2xl text-[#628869] font-medium"
                style={{ fontFamily: "var(--font-gamtan)" }}
              >
                {name}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
