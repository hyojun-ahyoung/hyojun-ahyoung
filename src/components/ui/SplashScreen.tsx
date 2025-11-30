"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export function SplashScreen() {
  const [isFontsReady, setIsFontsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";

  useEffect(() => {
    // 폰트 로드 대기
    document.fonts.ready.then(() => {
      setIsFontsReady(true);
    });
  }, []);

  useEffect(() => {
    if (!isFontsReady) return;

    // 폰트 로드 후 2초 뒤 페이드아웃 시작
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2000);

    // 2.5초 후 완전히 제거
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [isFontsReady]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* 딤 배경 - 폰트 로드 후 블러 적용 */}
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          isFontsReady ? "bg-white/80 backdrop-blur-md" : "bg-white"
        }`}
      />
      {/* 폰트 로드 전: 숨김 / 로드 후: 콘텐츠 페이드인 */}
      <div
        className={`relative z-10 bg-white mx-5 w-full max-w-[400px] transform transition-all duration-300 ${
          isFontsReady ? "opacity-100 scale-100" : "opacity-0 scale-95"
        } ${isFadingOut ? "scale-95 opacity-0" : ""}`}
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
