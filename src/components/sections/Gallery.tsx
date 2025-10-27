"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { GALLERY_IMAGES } from "@/constants/wedding-info";

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  // 스와이프 처리
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || selectedImage === null) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && selectedImage < GALLERY_IMAGES.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
    if (isRightSwipe && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;

      if (e.key === "ArrowLeft" && selectedImage > 0) {
        setSelectedImage(selectedImage - 1);
      }
      if (e.key === "ArrowRight" && selectedImage < GALLERY_IMAGES.length - 1) {
        setSelectedImage(selectedImage + 1);
      }
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <section className="w-full py-12 md:py-16 px-6 bg-gray-50/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center text-gray-800 mb-8 md:mb-10">
          우리의 순간들
        </h2>

        {/* 갤러리 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {GALLERY_IMAGES.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className="relative aspect-square overflow-hidden rounded-xl sm:rounded-2xl bg-gray-200 active:opacity-80 transition-opacity touch-manipulation"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </button>
          ))}
        </div>

        {/* 이미지 모달 */}
        {selectedImage !== null && (
          <div
            ref={modalRef}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* 닫기 버튼 */}
            <button
              className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center text-white text-4xl font-light hover:bg-white/10 rounded-full transition-colors touch-manipulation"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              ×
            </button>

            {/* 이전/다음 버튼 */}
            {selectedImage > 0 && (
              <button
                className="absolute left-4 z-10 w-12 h-12 flex items-center justify-center text-white text-3xl hover:bg-white/10 rounded-full transition-colors touch-manipulation"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(selectedImage - 1);
                }}
              >
                ‹
              </button>
            )}
            {selectedImage < GALLERY_IMAGES.length - 1 && (
              <button
                className="absolute right-4 z-10 w-12 h-12 flex items-center justify-center text-white text-3xl hover:bg-white/10 rounded-full transition-colors touch-manipulation"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(selectedImage + 1);
                }}
              >
                ›
              </button>
            )}

            {/* 이미지 */}
            <div
              className="relative w-full h-full max-w-4xl max-h-[90vh] px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY_IMAGES[selectedImage].src}
                alt={GALLERY_IMAGES[selectedImage].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* 이미지 인디케이터 */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
              {GALLERY_IMAGES.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === selectedImage ? "bg-white w-6" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
