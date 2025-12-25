"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { TextReveal } from "./TextReveal";
import { useSplash } from "@/context/SplashContext";

export function SplashScreen() {
  const { setIsSplashComplete } = useSplash();
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
      setIsSplashComplete(true);
    }, 3500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [isFontsReady, setIsSplashComplete]);

  // 스플래시 화면이 떠있을 때 스크롤 막기
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible]);

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
          className={`flex flex-col items-center mt-[120px] transition-all duration-500 z-10 ${
             isFadingOut ? "scale-95 opacity-0" : ""
          }`}
        >
          {/* Wedding Invitation 영문 텍스트 - 기존 페이드 효과 유지 */}
          <div
            className={`transform transition-all duration-1500 ease-out ${
              isFontsReady
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-4"
            }`}
          >
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
          </div>

          {/* 한글 텍스트 - 타이핑 효과 (TextReveal) */}
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
                <TextReveal 
                  text={name} 
                  className="text-[#111111]" 
                  start={isFontsReady} 
                />
                <TextReveal 
                  text={sub ? sub : '결혼식에 초대합니다.'} 
                  className="text-[#111111]" 
                  start={isFontsReady} 
                  delay={0.5} 
                />
              </>
            ) : (
              <>
                <TextReveal 
                  text="두 사람의 약속을" 
                  className="text-[#111111]" 
                  start={isFontsReady} 
                />
                <TextReveal 
                  text="함께 지켜봐 주세요" 
                  className="text-[#111111]" 
                  start={isFontsReady} 
                  delay={0.5} 
                />
              </>
            )}
          </div>
        </div>

        {/* 배경 별 장식 (splash_bg.svg) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
           <Image 
             src="/splash_bg.svg" 
             alt="Splash Background" 
             width={356}
             height={565}
             priority
           />
        </div>


        {/* 메인 이미지 (splash_main.png) - 하단 배치 */}
        <div className="relative w-[300px] h-[300px] mt-auto mb-[45px]">
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
