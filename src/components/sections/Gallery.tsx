"use client";

import { useState } from "react";
import Image from "next/image";
import { GALLERY_IMAGES } from "@/constants/wedding-info";

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section
      className="w-screen ml-[calc(50%-50vw)] bg-white bg-no-repeat bg-center py-12"
      style={{
        backgroundImage: "url(/gallery_bg.svg)",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="max-w-md mx-auto px-6">
        {/* 메인 이미지 영역 */}
        <div className="relative flex items-center justify-center mb-6">
          {/* 왼쪽 화살표 */}
          <button
            onClick={handlePrev}
            className="absolute left-0 z-20 w-10 h-10 flex items-center justify-center -translate-x-4"
          >
            <Image src="/gallery_left.svg" alt="이전" width={40} height={40} />
          </button>

          {/* 메인 이미지 + 지글지글 프레임 */}
          <div className="relative w-full max-w-[280px]">
            {/* 지글지글 프레임 */}
            <div
              className="absolute inset-0 rounded-lg pointer-events-none z-10"
              style={{
                border: "4px solid #E8A4B8",
                filter: "url(#squiggly-gallery)",
              }}
            />
            <div className="relative aspect-3/4 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={GALLERY_IMAGES[currentIndex].src}
                alt={GALLERY_IMAGES[currentIndex].alt}
                fill
                className="object-cover"
                sizes="280px"
                priority
              />
            </div>
            {/* SVG 필터 정의 */}
            <svg width="0" height="0" className="absolute">
              <defs>
                <filter id="squiggly-gallery">
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
                    scale="3"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
              </defs>
            </svg>
          </div>

          {/* 오른쪽 화살표 */}
          <button
            onClick={handleNext}
            className="absolute right-0 z-20 w-10 h-10 flex items-center justify-center translate-x-4"
          >
            <Image src="/gallery_right.svg" alt="다음" width={40} height={40} />
          </button>
        </div>

        {/* 썸네일 갤러리 - 5개 고정 */}
        <div className="flex justify-center gap-2">
          {GALLERY_IMAGES.slice(0, 5).map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-14 h-14 rounded-lg overflow-hidden transition-all ${
                index === currentIndex
                  ? "ring-2 ring-[#E8A4B8] ring-offset-2"
                  : "opacity-70"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="56px"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
