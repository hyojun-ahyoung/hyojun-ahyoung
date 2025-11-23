"use client";

import Image from "next/image";
import { WEDDING_INFO } from "@/constants/wedding-info";

export function Greeting() {
  const { groom, bride } = WEDDING_INFO;

  return (
    <section className="relative w-full py-16 flex items-center justify-center">
      {/* 배경 SVG */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          width: "100vw",
          marginLeft: "-50vw",
          backgroundImage: "url(/background.svg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
          zIndex: 0,
        }}
      />

      {/* 컨텐츠 */}
      <div className="relative z-10 max-w-md w-full flex flex-col items-center text-center px-6">
        {/* 인사말 텍스트 */}
        <div className="mb-12 space-y-4">
          <p
            className="text-gray-800 text-center"
            style={{
              fontFamily: "var(--font-hanason)",
              fontSize: "17px",
              fontWeight: 400,
              lineHeight: "143%",
              letterSpacing: "0%",
            }}
          >
            낯선 땅 호주에서 만나
            <br />
            캥거루보다 많이 뛰고,
            <br />
            코알라보다 오래 붙어 있었습니다.
            <br />
            호주 한바퀴를 돌며 쌓은 추억서점
            <br />
            이제 인생의 로드트립을 함께 시작하려 합니다.
          </p>

          <div className="py-6" />

          <p
            className="text-gray-800 text-center"
            style={{
              fontFamily: "var(--font-hanason)",
              fontSize: "17px",
              fontWeight: 400,
              lineHeight: "143%",
              letterSpacing: "0%",
            }}
          >
            길을 잃을 때마다, 사랑이라는
            <br />
            나침반이 저희를 안내할 것입니다.
            <br />
            복잡 다둥한 마음으로 오시서
            <br />
            저희의 시작을 축복해 주신다면
            <br />
            함께한 여행의 설렘처럼
            <br />
            따뜻한 기억으로 간직하겠습니다.
          </p>
        </div>

        {/* 일러스트 이미지 영역 */}
        <div className="w-full max-w-xs mb-12 flex items-center justify-center relative aspect-square">
          <Image
            src="/greeting.svg"
            alt="Wedding Illustration"
            fill
            className="object-contain"
          />
        </div>

        {/* 부모님 정보 */}
        <div className="space-y-3">
          <div
            className="flex items-center justify-center gap-3 text-gray-800"
            style={{
              fontFamily: "var(--font-gamtan)",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "180%",
              letterSpacing: "-0.01em",
            }}
          >
            <span>
              {groom.fatherName} <span className="mx-1">♥</span>{" "}
              {groom.motherName}
            </span>
            <span className="text-xs text-gray-600">의아들</span>
            <span className="font-medium">{groom.fullName}</span>
          </div>

          <div
            className="flex items-center justify-center gap-3 text-gray-800"
            style={{
              fontFamily: "var(--font-gamtan)",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "180%",
              letterSpacing: "-0.01em",
            }}
          >
            <span>
              {bride.fatherName} <span className="mx-1">♥</span>{" "}
              {bride.motherName}
            </span>
            <span className="text-xs text-gray-600">의딸</span>
            <span className="font-medium">{bride.fullName}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
