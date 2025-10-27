"use client";

import { TIMELINE_DATA } from "@/constants/wedding-info";

export function Timeline() {
  return (
    <section className="w-full py-12 md:py-16 px-6 bg-gray-50/50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center text-gray-800 mb-12 md:mb-16">
          우리의 이야기
        </h2>

        <div className="relative">
          {/* 세로 라인 */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gray-300" />

          {/* 타임라인 아이템 */}
          <div className="space-y-10 sm:space-y-12">
            {TIMELINE_DATA.map((item, index) => (
              <div
                key={index}
                className="relative flex items-start gap-4 sm:gap-6"
              >
                {/* 점 */}
                <div className="relative z-10 shrink-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white border-2 border-gray-800 flex items-center justify-center shadow-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium">
                      {item.date}
                    </span>
                  </div>
                </div>

                {/* 내용 */}
                <div className="flex-1 pt-2 sm:pt-4">
                  <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
