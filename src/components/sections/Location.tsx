"use client";

import { useEffect, useRef } from "react";
import { WEDDING_INFO } from "@/constants/wedding-info";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

declare global {
  interface Window {
    kakao: any;
  }
}

export function Location() {
  const { venue } = WEDDING_INFO;
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 카카오맵 스크립트 로드
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_APP_KEY&autoload=false`;
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

        const marker = new window.kakao.maps.Marker({
          position,
          map,
        });
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [venue.latitude, venue.longitude]);

  const openInMap = (type: "kakao" | "naver" | "google") => {
    const { latitude, longitude, address } = venue;

    const urls = {
      kakao: `https://map.kakao.com/link/map/${encodeURIComponent(
        venue.name
      )},${latitude},${longitude}`,
      naver: `https://map.naver.com/v5/search/${encodeURIComponent(address)}`,
      google: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
    };

    window.open(urls[type], "_blank");
  };

  return (
    <section className="w-full py-12 md:py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center text-gray-800 mb-8 md:mb-10">
          오시는 길
        </h2>

        <Card padding="none" className="overflow-hidden">
          {/* 지도 */}
          <div
            ref={mapRef}
            className="w-full h-72 sm:h-80 md:h-96 bg-gray-200"
          />

          <div className="p-6 sm:p-8">
            {/* 주소 */}
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-medium text-gray-800 mb-3">
                {venue.name}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {venue.address}
              </p>
            </div>

            {/* 지도 앱 버튼 */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button
                size="md"
                variant="outline"
                onClick={() => openInMap("kakao")}
                className="flex-1 touch-manipulation"
              >
                카카오맵
              </Button>
              <Button
                size="md"
                variant="outline"
                onClick={() => openInMap("naver")}
                className="flex-1 touch-manipulation"
              >
                네이버지도
              </Button>
              <Button
                size="md"
                variant="outline"
                onClick={() => openInMap("google")}
                className="flex-1 touch-manipulation"
              >
                구글맵
              </Button>
            </div>

            {/* 교통 정보 */}
            {venue.transportInfo && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm sm:text-base font-medium text-gray-700 mb-2">
                  대중교통
                </h4>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {venue.transportInfo}
                </p>
              </div>
            )}

            {/* 주차 정보 */}
            {venue.parkingInfo && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm sm:text-base font-medium text-gray-700 mb-2">
                  주차안내
                </h4>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {venue.parkingInfo}
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}
