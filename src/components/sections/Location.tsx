"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { WEDDING_INFO } from "@/constants/wedding-info";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

export function Location() {
  const { venue } = WEDDING_INFO;
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        const position = new window.kakao.maps.LatLng(
          venue.latitude,
          venue.longitude
        );

        const map = new window.kakao.maps.Map(mapRef.current, {
          center: position,
          level: 3,
        });

        new window.kakao.maps.Marker({
          position,
          map,
        });
      });
    };

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [venue.latitude, venue.longitude]);

  const openInMap = (type: "naver" | "kakao" | "tmap") => {
    const { latitude, longitude, address, name } = venue;

    const urls = {
      naver: `https://map.naver.com/v5/search/${encodeURIComponent(address)}`,
      kakao: `https://map.kakao.com/link/map/${encodeURIComponent(
        name
      )},${latitude},${longitude}`,
      tmap: `https://apis.openapi.sk.com/tmap/app/routes?appKey=&name=${encodeURIComponent(
        name
      )}&lon=${longitude}&lat=${latitude}`,
    };

    window.open(urls[type], "_blank");
  };

  return (
    <section className="relative w-full bg-white">
      {/* 상단 타이틀 이미지 - 배경 안으로 겹침, 일부는 밖으로 */}

      {/* 배경 영역 */}
      <div className="bg-no-repeat bg-center pt-7">
        {/* 컨텐츠 */}
        <div className="flex flex-col items-center px-6 pt-10 pb-[54px]">
          {/* 제목 */}
          <ScrollReveal className="flex justify-center mb-10">
            <Image
              src="/location_title.svg"
              alt="오시는길"
              width={123}
              height={49}
            />
          </ScrollReveal>

          {/* 장소명 및 주소 */}
          <ScrollReveal
            delay={200}
            className="text-[18px] font-normal text-center mb-4 leading-[160%] text-[#111111] gap-2"
            style={{ fontFamily: "var(--font-gamtan)" }}
          >
            <p>{venue.name}</p>
            <p>{venue.address}</p>
          </ScrollReveal>

          {/* 카카오 지도 */}
          <ScrollReveal delay={300} className="w-full max-w-sm mb-3 relative">
            {/* 지글지글 테두리 */}
            <div
              className="absolute inset-0 rounded-lg pointer-events-none border-2 border-[#628869] z-10"
              style={{
                filter: "url(#squiggly-border)",
              }}
            />
            <div
              ref={mapRef}
              className="w-full min-h-[280px] rounded-lg overflow-hidden bg-gray-100"
            />
            <svg width="0" height="0" className="absolute">
              <defs>
                <filter id="squiggly-border">
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
          </ScrollReveal>

          {/* 지도 앱 버튼 */}
          <ScrollReveal delay={400} className="flex gap-2 mb-8 w-full max-w-sm">
            <div className="flex-1 relative">
              <div
                className="absolute inset-0 rounded-xl pointer-events-none border border-neutral-300 z-10"
                style={{ filter: "url(#squiggly-border)" }}
              />
              <button
                onClick={() => openInMap("naver")}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-2 rounded-xl bg-white text-[13px] font-bold leading-normal tracking-[-0.03em] text-center text-[#444444]"
                style={{ fontFamily: "var(--font-gamtan)" }}
              >
                <Image src="/naver.svg" alt="네이버" width={24} height={24} />
                네이버지도
              </button>
            </div>
            <div className="flex-1 relative">
              <div
                className="absolute inset-0 rounded-xl pointer-events-none border border-neutral-300 z-10"
                style={{ filter: "url(#squiggly-border)" }}
              />
              <button
                onClick={() => openInMap("kakao")}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-2 rounded-xl bg-white text-[13px] font-bold leading-normal tracking-[-0.03em] text-center text-[#444444]"
                style={{ fontFamily: "var(--font-gamtan)" }}
              >
                <Image src="/kakao.svg" alt="카카오" width={24} height={24} />
                카카오내비
              </button>
            </div>
            <div className="flex-1 relative">
              <div
                className="absolute inset-0 rounded-xl pointer-events-none border border-neutral-300 z-10"
                style={{ filter: "url(#squiggly-border)" }}
              />
              <button
                onClick={() => openInMap("tmap")}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-2 rounded-xl bg-white text-[13px] font-bold leading-normal tracking-[-0.03em] text-center text-[#444444]"
                style={{ fontFamily: "var(--font-gamtan)" }}
              >
                <Image src="/tmap.svg" alt="티맵" width={24} height={24} />
                티맵
              </button>
            </div>
          </ScrollReveal>

          {/* 교통 정보 섹션 */}
          <div className="w-full max-w-sm">
            {/* 지하철 */}
            <ScrollReveal delay={500} className="pb-6 mb-6 border-b border-[#EAEAEA]">
              <div className="flex items-center gap-2 mb-2">
                <Image src="/subway.svg" alt="지하철" width={24} height={24} />
                <h3
                  className="text-base font-bold leading-normal tracking-normal text-[#222]"
                  style={{ fontFamily: "var(--font-gamtan)" }}
                >
                  지하철
                </h3>
              </div>
              <div
                className="ml-7 text-[15px] font-normal leading-normal tracking-tight text-[#222] space-y-2"
                style={{ fontFamily: "var(--font-gamtan)" }}
              >
                <p>4호선 고잔역 2번출구</p>
                <p>셔틀버스는 예식 2시간 후까지 운행합니다.</p>
                <p>(셔틀버스 5분~7분 간격 수시운행 / 도보 15~20분)</p>
              </div>
            </ScrollReveal>

            {/* 버스 */}
            <ScrollReveal delay={600} className="pb-6 mb-6 border-b border-[#EAEAEA]">
              <div className="flex items-center gap-2 mb-2">
                <Image src="/bus.svg" alt="버스" width={24} height={24} />
                <h3
                  className="text-base font-bold leading-normal tracking-normal text-[#222]"
                  style={{ fontFamily: "var(--font-gamtan)" }}
                >
                  버스
                </h3>
              </div>
              <div
                className="ml-7 text-[15px] font-normal leading-normal tracking-tight text-[#222] space-y-2"
                style={{ fontFamily: "var(--font-gamtan)" }}
              >
                <p>안산 문화숲의 광장 하차 - 88번</p>
                <p>동남레이크빌 하차 - 99-1번, 3100번</p>
                <p>대림호수공원아파트 하차 - 77번, 98번, 3번</p>
              </div>
            </ScrollReveal>

            {/* 주차장 */}
            <ScrollReveal delay={700} className="pb-6 mb-6 border-b border-[#EAEAEA]">
              <div className="flex items-center gap-2 mb-2">
                <Image src="/parking.svg" alt="주차" width={24} height={24} />
                <h3
                  className="text-base font-bold leading-normal tracking-normal text-[#222]"
                  style={{ fontFamily: "var(--font-gamtan)" }}
                >
                  주차장
                </h3>
              </div>
              <div
                className="ml-7 text-[15px] font-normal leading-normal tracking-tight text-[#222] space-y-2"
                style={{ fontFamily: "var(--font-gamtan)" }}
              >
                <p>제 1주차장 - AW컨벤션 지상, 지하 1층, 2층</p>
                <p>제 2주차장 - 양지주차타워(AW컨벤션 주차타워)</p>
                <p>제 3주차장 - AW컨벤션 정문 맞은편 공영주차장</p>
                <p>제 4주차장 - MK주차타워</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
