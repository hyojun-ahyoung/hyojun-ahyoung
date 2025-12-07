"use client";

import Image from "next/image";
import { WEDDING_INFO } from "@/constants/wedding-info";

export function Greeting() {
  const { groom, bride } = WEDDING_INFO;

  return (
    <section className="flex flex-col items-center w-full bg-white">
      <div className="w-full flex justify-center bg-no-repeat bg-center">
        <div className="max-w-md w-full flex flex-col items-center text-center pt-[70px] pb-[70px] px-[50px]">
          <p
            className="text-gray-800 text-center text-2xl font-normal leading-[143%] tracking-normal"
            style={{ fontFamily: "var(--font-hanason)" }}
          >
            낯선 땅 호주에서 만나
            <br />
            캥거루보다 많이 뛰고,
            <br />
            코알라보다 오래 붙어 있었습니다.
            <br />
            호주 한바퀴를 돌며 쌓은 추억처럼
            <br />
            이제 인생의 로드트립을 함께 시작하려 합니다.
          </p>

          <div className="h-6" />

          <p
            className="text-gray-800 text-center text-2xl font-normal leading-[143%] tracking-normal"
            style={{ fontFamily: "var(--font-hanason)" }}
          >
            길을 잃을 때마다, 사랑이라는
            <br />
            나침반이 저희를 안내할 것입니다.
            <br />
            부디 따뜻한 마음으로 오셔서
            <br />
            저희의 시작을 축복해 주신다면
            <br />
            함께한 여행의 설렘처럼
            <br />
            따뜻한 기억으로 간직하겠습니다.
          </p>
        </div>
      </div>

      {/* layer.svg 바깥 영역 - 일러스트 및 부모님 정보 */}
      <div className="flex flex-col items-center text-center px-6 gap-8">
        {/* 일러스트 이미지 영역 */}
        <div className="flex items-center justify-center">
          <Image
            src="/images/greeting.png"
            alt="Wedding Illustration"
            width={180}
            height={180}
            className="object-contain"
          />
        </div>

        {/* 부모님 정보 */}
        <div className="flex justify-center">
          <div
            className="space-y-3 text-gray-800"
            style={{ fontFamily: "var(--font-gamtan)" }}
          >
            <div className="flex items-baseline">
              <div className="flex items-baseline gap-3 text-xl">
                <span>{groom.fatherName}</span>
                <span className="text-sm">♥</span>
                <span>{groom.motherName}</span>
              </div>
              <div className="text-normal w-12 text-left ml-1">의 아들</div>
              <div className="text-xl font-medium ml-3">{groom.fullName}</div>
            </div>

            <div className="flex items-baseline">
              <div className="flex items-baseline gap-3 text-xl">
                <span>{bride.fatherName}</span>
                <span className="text-sm">♥</span>
                <span>{bride.motherName}</span>
              </div>
              <div className="text-normal w-12 text-left ml-1">의 딸</div>
              <div className="text-xl font-medium ml-3">{bride.fullName}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
