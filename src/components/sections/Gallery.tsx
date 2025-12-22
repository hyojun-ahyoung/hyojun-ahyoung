"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { createPortal } from "react-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// 이미지 목록 생성 (0.jpg ~ 12.jpg)
const GALLERY_IMAGES = Array.from({ length: 13 }, (_, i) => ({
  src: `/images/gallery/${i}.jpg`,
  alt: `Gallery Image ${i}`,
}));

export function Gallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  return (
    <section className="w-full bg-white pb-12 mt-[100px] flex flex-col items-center">


      <div className="w-full flex flex-col gap-0 px-0">
        {/* 메인 이미지 (1번 - 인덱스 0) */}
        <div 
          className="w-full relative cursor-pointer" 
          onClick={() => openLightbox(0)}
        >
          <Image
            src={GALLERY_IMAGES[0].src}
            alt={GALLERY_IMAGES[0].alt}
            width={400} // Approximate responsive width
            height={600}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        {/* 그리드 (2번 ~ 12번) - 3열 */}
        <div className="w-full grid grid-cols-3 gap-0">
          {GALLERY_IMAGES.slice(1).map((image, i) => {
            const imageIndex = i + 1;
            const isTopAligned = [1, 2, 5, 6, 7, 10].includes(imageIndex);
            
            return (
              <div
                key={imageIndex}
                className="relative aspect-square cursor-pointer overflow-hidden bg-gray-100"
                onClick={() => openLightbox(imageIndex)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className={`object-cover transition-transform duration-300 hover:scale-110 ${
                    isTopAligned ? "object-top" : "object-center"
                  }`}
                  sizes="(max-width: 768px) 33vw, 125px"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal - Portal 사용 */}
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] bg-black/95 flex flex-col items-center justify-center h-[100svh]">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white p-2 z-[10000] rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <Swiper
              modules={[Pagination, Navigation]}
              initialSlide={currentIndex}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              className="w-full h-full max-w-4xl"
            >
              {GALLERY_IMAGES.map((image, index) => (
                <SwiperSlide key={index} className="flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={800}
                      height={1200}
                      className="max-w-full max-h-[90svh] object-contain"
                      priority={index === currentIndex}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <style jsx global>{`
              .swiper-pagination-bullet {
                background: #fff;
                opacity: 0.5;
              }
              .swiper-pagination-bullet-active {
                background: #E8A4B8;
                opacity: 1;
              }
              .swiper-button-next, .swiper-button-prev {
                color: white;
              }
              .swiper-button-next::after, .swiper-button-prev::after {
                font-size: 24px;
                font-weight: bold;
              }
            `}</style>
          </div>,
          document.body
        )}
    </section>
  );
}
