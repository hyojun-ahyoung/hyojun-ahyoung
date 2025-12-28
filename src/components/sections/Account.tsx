"use client";

import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { ACCOUNT_INFO, WEDDING_INFO } from "@/constants/wedding-info";
import { copyToClipboard } from "@/utils/text";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: {
          objectType: string;
          content: {
            title: string;
            description: string;
            imageUrl: string;
            imageWidth?: number;
            imageHeight?: number;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          };
          buttons?: {
            title: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          }[];
        }) => void;
      };
    };
  }
}

const KAKAO_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY || "";

export function Account() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [groomOpen, setGroomOpen] = useState(false);
  const [brideOpen, setBrideOpen] = useState(false);

  // 카카오 SDK 초기화
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.5.0/kakao.min.js";
    script.async = true;
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_APP_KEY);
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleCopy = async (accountNumber: string, bank: string) => {
    const text = `${bank} ${accountNumber}`;
    const success = await copyToClipboard(text);

    if (success) {
      setCopiedAccount(accountNumber);
      setTimeout(() => setCopiedAccount(null), 2000);
    }
  };

  return (
    <section className="w-full bg-white px-5 pt-[45px]">
      <div className="max-w-md mx-auto">
        {/* 상단 안내 문구 */}
        <ScrollReveal
          className="text-center mb-8 text-[#111111]"
          style={{ fontFamily: "var(--font-gamtan)" }}
        >
          <div className="flex justify-center mb-6">
            <Image
              src="/thanks_title.svg"
              alt="마음을 전하는 곳"
              width={180}
              height={45}
            />
          </div>
          <p className="text-base leading-relaxed">
            멀리서도 저희를 축하해주시는 마음
          </p>
          <p className="text-base leading-relaxed">감사히 받겠습니다.</p>
          <p className="text-base leading-relaxed">참석이 어려운 분들을 위해</p>
          <p className="text-base leading-relaxed">
            마음을 전할 수 있는 곳을 함께 안내드립니다.
          </p>
        </ScrollReveal>

        {/* 신랑측 계좌 */}
        <ScrollReveal delay={200} className="mb-3">
          {/* 신랑측 타이틀 */}
          <button
            onClick={() => setGroomOpen(!groomOpen)}
            className="w-full relative flex items-center justify-center"
            style={{ fontFamily: "var(--font-gamtan)" }}
          >
            <img src="/account1.svg" alt="" className="w-full h-auto" />
            <span
              className="absolute text-base font-bold text-white text-center leading-[150%]"
              style={{ letterSpacing: "-0.03em" }}
            >
              신랑측 계좌번호
            </span>
            <span className="absolute right-6 text-white">
              {groomOpen ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
            </span>
          </button>

          {/* 신랑측 계좌 목록 */}
          <div
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{
              maxHeight: groomOpen ? "500px" : "0",
              opacity: groomOpen ? 1 : 0,
            }}
          >
            <div className="pt-3">
              {ACCOUNT_INFO.groom.map((account, index) => (
                <div
                  key={index}
                  className={`${account.role === "어머니" ? "mb-[40px]" : ""}`}
                >
                  <div className="flex items-start justify-between py-4">
                    <div className="flex gap-4">
                      <span
                        className="text-sm text-[#7D7D7D] w-14 px-2"
                        style={{ fontFamily: "var(--font-gamtan)" }}
                      >
                        {account.role}
                      </span>
                      <div
                        style={{ fontFamily: "var(--font-gamtan)" }}
                        className="flex flex-col gap-[6px]"
                      >
                        <p className="text-base font-medium text-[#111111] leading-[150%]">
                          {account.name}
                        </p>
                        <p className="text-sm text-[#111111] leading-[150%] max-[380px]:text-xs">
                          {account.accountNumber} {account.bank}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        handleCopy(account.accountNumber, account.bank)
                      }
                      className="px-4 py-1.5 bg-[#3E8676] text-white text-sm rounded-md mr-2 font-semibold max-[380px]:text-xs max-[380px]:px-3"
                      style={{ fontFamily: "var(--font-gamtan)" }}
                    >
                      {copiedAccount === account.accountNumber
                        ? "복사됨"
                        : "복사"}
                    </button>
                  </div>
                  <img src="/line_groom.svg" alt="line" className="w-full" />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 신부측 계좌 */}
        <ScrollReveal delay={300}>
          {/* 신부측 타이틀 */}
          <button
            onClick={() => setBrideOpen(!brideOpen)}
            className="w-full relative flex items-center justify-center"
            style={{ fontFamily: "var(--font-gamtan)" }}
          >
            <img src="/account2.svg" alt="" className="w-full h-auto" />
            <span
              className="absolute text-base font-bold text-white text-center leading-[150%]"
              style={{ letterSpacing: "-0.03em" }}
            >
              신부측 계좌번호
            </span>
            <span className="absolute right-6 text-white">
              {brideOpen ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
            </span>
          </button>

          {/* 신부측 계좌 목록 */}
          <div
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{
              maxHeight: brideOpen ? "500px" : "0",
              opacity: brideOpen ? 1 : 0,
            }}
          >
            <div className="pt-3">
              {ACCOUNT_INFO.bride.map((account, index) => (
                <div key={index}>
                  <div className="flex items-start justify-between py-4">
                    <div className="flex gap-4">
                      <span
                        className="text-sm text-[#7D7D7D] w-14 px-2"
                        style={{ fontFamily: "var(--font-gamtan)" }}
                      >
                        {account.role}
                      </span>
                      <div
                        style={{ fontFamily: "var(--font-gamtan)" }}
                        className="flex flex-col gap-[6px]"
                      >
                        <p className="text-base font-medium text-[#111111] leading-[150%]">
                          {account.name}
                        </p>
                        <p className="text-sm text-[#111111] leading-[150%] max-[380px]:text-xs">
                          {account.accountNumber} {account.bank}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        handleCopy(account.accountNumber, account.bank)
                      }
                      className="px-4 py-1.5 bg-[#E487A7] text-white text-sm rounded-md mr-2 font-semibold max-[380px]:text-xs max-[380px]:px-3"
                      style={{ fontFamily: "var(--font-gamtan)" }}
                    >
                      {copiedAccount === account.accountNumber
                        ? "복사됨"
                        : "복사"}
                    </button>
                  </div>
                  <img src="/line_bride.svg" alt="line" className="w-full" />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 배경 이미지 */}
        <ScrollReveal delay={400} className="mt-10">
          <Image
            src="/location_bg.svg"
            alt="배경"
            width={390}
            height={340}
            className="w-full"
          />
        </ScrollReveal>

        {/* 공유 버튼 영역 */}
        <ScrollReveal delay={500} className="flex justify-center gap-[10px] mt-8 mb-[100px]">
          {/* 링크 복사하기 */}
          <div className="flex-2 relative">
            <div
              className="absolute inset-0 rounded-xl pointer-events-none border-2 border-neutral-300 z-10"
              style={{ filter: "url(#squiggly-account)" }}
            />
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(window.location.href);
                alert("링크가 복사되었습니다!");
              }}
              className="w-full flex items-center justify-center gap-[4px] bg-white py-4 rounded-xl text-[15px] font-semibold text-[#282828] text-center leading-[150%]"
              style={{
                fontFamily: "var(--font-gamtan)",
                letterSpacing: "-0.05em",
              }}
            >
              링크 복사하기
            </button>
          </div>

          {/* 카카오톡으로 공유하기 */}
          <div className="flex-3 relative">
            <div
              className="absolute inset-0 rounded-xl pointer-events-none border-2 border-neutral-300 z-10"
              style={{ filter: "url(#squiggly-account)" }}
            />
            <button
              onClick={() => {
                // 카카오톡 공유 기능
                if (typeof window !== "undefined" && window.Kakao) {
                  const { groom, bride, date } = WEDDING_INFO;
                  
                  // 날짜 포맷팅
                  const days = ["일", "월", "화", "수", "목", "금", "토"];
                  const dayOfWeek = days[date.getDay()];
                  const hour = date.getHours();
                  const minute = date.getMinutes();
                  const ampm = hour >= 12 ? "오후" : "오전";
                  const displayHour = hour > 12 ? hour - 12 : hour;
                  const dateStr = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일(${dayOfWeek}) ${ampm} ${displayHour}시${minute > 0 ? ` ${minute}분` : ""}`;

                  window.Kakao.Share.sendDefault({
                    objectType: "feed",
                    content: {
                      title: `${groom.fullName}♥${bride.fullName}의 결혼식에 초대합니다.`,
                      description: `예식일\n${dateStr}`,
                      imageUrl: `${window.location.origin}/images/gallery/3.jpg`,
                      imageWidth: 900,
                      imageHeight: 1332,
                      link: {
                        mobileWebUrl: window.location.href,
                        webUrl: window.location.href,
                      },
                    },
                    buttons: [
                      {
                        title: "모바일 청첩장 보기",
                        link: {
                          mobileWebUrl: window.location.href,
                          webUrl: window.location.href,
                        },
                      },
                    ],
                  });
                }
              }}
              className="w-full flex items-center justify-center gap-[4px] bg-white py-4 rounded-xl text-[15px] font-semibold text-[#282828] text-center leading-[150%]"
              style={{
                fontFamily: "var(--font-gamtan)",
                letterSpacing: "-0.05em",
              }}
            >
              <Image
                src="/images/kakao.png"
                alt="카카오톡"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              카카오톡으로 공유하기
            </button>
          </div>
        </ScrollReveal>

        {/* 지글지글 필터 */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <filter id="squiggly-account">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.02"
                numOctaves="3"
                seed="1"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="2"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </section>
  );
}
