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

    // 폰트 로드 후 3초 뒤 페이드아웃 시작 (나타나는 시간 1.5초 포함)
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 3000);

    // 3.5초 후 완전히 제거
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3500);

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
      {/* 흰색 배경 - 스플래시가 사라질 때까지 유지 */}
      <div className="absolute inset-0 bg-white" />

      {/* 배경 이미지 - 상하 44px, 좌우 24px 안쪽으로 */}
      <div
        className="absolute"
        style={{
          top: "44px",
          bottom: "44px",
          left: "24px",
          right: "24px",
        }}
      >
        <Image
          src="/images/invitation.png"
          alt="Wedding Invitation"
          fill
          priority
        />
      </div>

      {/* 텍스트 오버레이 - 폰트 로드 후 스르륵 나타남 */}
      <div
        className={`absolute inset-0 z-10 flex flex-col items-center transform transition-all duration-1500 ease-out ${
          isFontsReady
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        } ${isFadingOut ? "scale-95 opacity-0" : ""}`}
        style={{
          paddingTop: "200px",
        }}
      >
        {/* 한글 텍스트 - 상단 */}
        <div
          className="flex flex-col items-center"
          style={{
            fontFamily: "var(--font-gamtan)",
            fontWeight: 400,
            fontSize: "26px",
            lineHeight: "150%",
            textAlign: "center",
            textTransform: "capitalize",
          }}
        >
          {name && <p className="text-[#111111]">{name}</p>}
          <p className="text-[#111111]">결혼식에 초대합니다</p>
        </div>
      </div>
    </div>
  );
}
