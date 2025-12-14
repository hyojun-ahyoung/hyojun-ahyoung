"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { GALLERY_IMAGES } from "@/constants/wedding-info";

import "swiper/css";
import "swiper/css/pagination";

export function Gallery() {
  return (
    <section className="w-full bg-white py-12">
      {/* 갤러리 타이틀 */}
      <div className="w-full mb-6">
        <Image
          src="/gallery_title.svg"
          alt="Gallery"
          width={600}
          height={200}
          className="w-full h-auto"
        />
      </div>

      {/* 버튼 크기만큼 패딩 유지: px-4 + 버튼(32px) + gap(4px) = 약 px-13 */}
      <div className="w-full px-13 mb-6">
        {/* Swiper 슬라이더 */}
        <div className="relative w-full">
          {/* 지글지글 프레임 */}
          <div
            className="absolute inset-0 rounded-lg pointer-events-none z-10"
            style={{
              border: "4px solid #E8A4B8",
              filter: "url(#squiggly-gallery)",
            }}
          />

          {/* SVG 필터 정의 - 테두리보다 먼저 렌더링되도록 여기에 배치 */}
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

          <Swiper
            modules={[Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            pagination={{
              clickable: true,
              el: ".gallery-pagination",
              bulletClass: "gallery-bullet",
              bulletActiveClass: "gallery-bullet-active",
            }}
            className="rounded-lg overflow-hidden"
          >
            {GALLERY_IMAGES.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative aspect-3/4 bg-gray-100">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="400px"
                    priority={index === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* 페이지네이션 Dots */}
      <div className="gallery-pagination flex justify-center gap-2" />

      {/* Swiper 커스텀 스타일 */}
      <style jsx global>{`
        .gallery-bullet {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #d1d5db;
          cursor: pointer;
          transition: all 0.2s;
        }
        .gallery-bullet-active {
          background-color: #e8a4b8 !important;
        }
      `}</style>
    </section>
  );
}
