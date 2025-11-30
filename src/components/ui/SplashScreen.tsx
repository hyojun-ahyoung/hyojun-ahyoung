"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export function SplashScreen() {
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";

  useEffect(() => {
    // 콘텐츠 렌더링 후 스플래시 표시
    const readyTimer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    // 1.6초 후 페이드아웃 시작
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1600);

    // 2.3초 후 완전히 제거 (페이드아웃 완료 후)
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2300);

    return () => {
      clearTimeout(readyTimer);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible || !isReady) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-700 ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* 블러 처리된 배경 */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />

      {/* 팝업 콘텐츠 - 모바일 컨테이너 너비에 맞춤 */}
      <div className="relative z-10 bg-white mx-5 w-full max-w-[400px]">
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
