"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { WEDDING_INFO } from "@/constants/wedding-info";

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
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=a9b09af0d54b6ab41658e98244aea8c6&autoload=false`;
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
          <h2
            className="text-lg font-bold text-center mb-4 leading-tight tracking-normal capitalize text-[#111111]"
            style={{ fontFamily: "var(--font-gamtan)" }}
          >
            오시는길
          </h2>

          {/* 장소명 및 주소 */}
          <p
            className="text-sm font-normal text-center mb-4 leading-[160%] text-[#111111]"
            style={{ fontFamily: "var(--font-gamtan)" }}
          >
            <span className="font-medium">{venue.name}</span>
            {"   "}
            {venue.address}
          </p>

          {/* 카카오 지도 */}
          <div className="w-full max-w-sm mb-3 relative">
            {/* 지글지글 테두리 */}
            <div
              className="absolute inset-0 rounded-lg pointer-events-none border-2 border-[#628869] z-10"
              style={{
                filter: "url(#squiggly-border)",
              }}
            />
            <div
              ref={mapRef}
              className="w-full min-h-[180px] rounded-lg overflow-hidden bg-gray-100"
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
          </div>

          {/* 지도 앱 버튼 */}
          <div className="flex gap-2 mb-6 w-full max-w-sm">
            <div className="flex-1 relative">
              <div
                className="absolute inset-0 rounded-xl pointer-events-none border border-neutral-300 z-10"
                style={{ filter: "url(#squiggly-border)" }}
              />
              <button
                onClick={() => openInMap("naver")}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white text-[13px] font-normal leading-normal tracking-[-0.05em] text-center text-[#444444]"
                style={{ fontFamily: "var(--font-gamtan)" }}
              >
                <Image src="/naver.svg" alt="네이버" width={20} height={20} />
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
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white text-[13px] font-normal leading-normal tracking-[-0.05em] text-center text-[#444444]"
                style={{ fontFamily: "var(--font-gamtan)" }}
              >
                <Image src="/kakao.svg" alt="카카오" width={20} height={20} />
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
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white text-[13px] font-normal leading-normal tracking-[-0.05em] text-center text-[#444444]"
                style={{ fontFamily: "var(--font-gamtan)" }}
              >
                <Image src="/tmap.svg" alt="티맵" width={20} height={20} />
                티맵
              </button>
            </div>
          </div>

          {/* 교통 정보 섹션 */}
          <div className="w-full max-w-sm space-y-5">
            {/* 지하철 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Image src="/subway.svg" alt="지하철" width={20} height={20} />
                <h3
                  className="text-base font-bold leading-normal tracking-normal text-[#111111]"
                  style={{ fontFamily: "var(--font-gamtan)" }}
                >
                  지하철
                </h3>
              </div>
              <div
                className="ml-7 text-[15px] font-normal leading-normal tracking-tight text-[#111111] space-y-1"
                style={{ fontFamily: "var(--font-gamtan)" }}
              >
                <p>4호선 고잔역 2번출구</p>
                <p>셔틀버스는 예식 2시간 후까지 운행합니다.</p>
                <p>(셔틀버스 5분~7분 간격 수시운행 / 도보 15~20분)</p>
              </div>
            </div>

            {/* 버스 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Image src="/bus.svg" alt="버스" width={20} height={20} />
                <h3
                  className="text-base font-bold leading-normal tracking-normal text-[#111111]"
                  style={{ fontFamily: "var(--font-gamtan)" }}
                >
                  버스
                </h3>
              </div>
              <div
                className="ml-7 text-[15px] font-normal leading-normal tracking-tight text-[#111111] space-y-1"
                style={{ fontFamily: "var(--font-gamtan)" }}
              >
                <p>안산 문화숲의 광장 하차 - 88번</p>
                <p>동남레이크빌 하차 - 99-1번, 3100번</p>
                <p>대림호수공원아파트 하차 - 77번, 98번, 3번</p>
              </div>
            </div>

            {/* 주차장 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Image src="/parking.svg" alt="주차" width={20} height={20} />
                <h3
                  className="text-base font-bold leading-normal tracking-normal text-[#111111]"
                  style={{ fontFamily: "var(--font-gamtan)" }}
                >
                  주차장
                </h3>
              </div>
              <div
                className="ml-7 text-[15px] font-normal leading-normal tracking-tight text-[#111111] space-y-1 pb-24"
                style={{ fontFamily: "var(--font-gamtan)" }}
              >
                <p>제 1주차장 - AW컨벤션 지상, 지하 1층, 2층</p>
                <p>제 2주차장 - 양지주차타워(AW컨벤션 주차타워)</p>
                <p>제 3주차장 - AW컨벤션 정문 맞은편 공영주차장</p>
                <p>제 4주차장 - MK주차타워</p>
              </div>

              <div className="pb-14">
                <Image
                  src="/location_bg.svg"
                  alt="오시는길 배경"
                  width={390}
                  height={340}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
