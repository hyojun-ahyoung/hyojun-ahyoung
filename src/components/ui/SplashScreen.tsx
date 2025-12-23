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
  const sub = searchParams.get("sub") || "";

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
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 bg-white ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* 모바일 뷰 컨테이너 */}
      <div className="w-full h-full max-w-[430px] relative overflow-hidden flex flex-col items-center">
        
        {/* 텍스트 영역 */}
        <div
          className={`flex flex-col items-center mt-[120px] transform transition-all duration-1500 ease-out z-10 ${
            isFontsReady
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-4"
          } ${isFadingOut ? "scale-95 opacity-0" : ""}`}
        >
          {/* Wedding Invitation 영문 텍스트 */}
          <p
            style={{
              fontFamily: "var(--font-vesper-libre)",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: "100%",
              letterSpacing: "-0.01em",
              textTransform: "capitalize",
            }}
            className="text-[#EFAEC4] mb-[60px]"
          >
            Wedding Invitation
          </p>

          {/* 한글 텍스트 */}
          <div
            className="flex flex-col items-center gap-2"
            style={{
              fontFamily: "var(--font-gamtan)",
              fontWeight: 400,
              fontSize: "26px",
              lineHeight: "150%",
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            {name ? (
              <>
                <p className="text-[#111111]">{name}</p>
                <p className="text-[#111111]">{sub ? sub : '결혼식에 초대합니다.'}</p>
              </>
            ) : (
              <>
                <p className="text-[#111111]">두 사람의 약속을</p>
                <p className="text-[#111111]">함께 지켜봐 주세요</p>
              </>
            )}
          </div>
        </div>

        {/* 배경 별 장식 (splash_bg.svg) */}
        <div className="absolute inset-0 pointer-events-none">
           <Image 
             src="/splash_bg.svg" 
             alt="Splash Background" 
             fill 
             className="object-cover opacity-80"
             priority
           />
        </div>


        {/* 메인 이미지 (splash_main.png) - 하단 배치 */}
        <div className="absolute bottom-[100px] w-[300px] h-[300px]">
           <Image 
             src="/images/splash_main.png" 
             alt="Main Illustration" 
             fill 
             className="object-contain opacity-80"
             priority 
           />
        </div>

      </div>
    </div>
  );
}
