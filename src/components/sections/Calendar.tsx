"use client";

import { WEDDING_INFO } from "@/constants/wedding-info";
import { Card } from "@/components/ui/Card";

export function Calendar() {
  const weddingDate = WEDDING_INFO.date;
  const year = weddingDate.getFullYear();
  const month = weddingDate.getMonth();
  const date = weddingDate.getDate();

  // 해당 월의 첫날과 마지막 날
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  // 달력 날짜 배열 생성
  const calendarDays = [];

  // 이전 달 빈 칸
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  // 현재 달 날짜
  for (let i = 1; i <= lastDate; i++) {
    calendarDays.push(i);
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <section className="w-full py-12 md:py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center text-gray-800 mb-8 md:mb-10">
          Wedding Day
        </h2>

        <Card padding="lg">
          <div className="text-center mb-6">
            <p className="text-2xl font-light text-gray-800">
              {year}. {String(month + 1).padStart(2, "0")}
            </p>
            <p className="text-sm text-gray-500 mt-1">{monthNames[month]}</p>
          </div>

          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 gap-2 sm:gap-3 mb-3">
            {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
              <div
                key={day}
                className={`text-center text-sm sm:text-base font-medium ${
                  index === 0
                    ? "text-red-500"
                    : index === 6
                    ? "text-blue-500"
                    : "text-gray-600"
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* 날짜 그리드 */}
          <div className="grid grid-cols-7 gap-2 sm:gap-3">
            {calendarDays.map((day, index) => {
              const isWeddingDay = day === date;
              const dayOfWeek = index % 7;

              return (
                <div
                  key={index}
                  className={`
                    aspect-square flex items-center justify-center text-sm sm:text-base rounded-lg
                    ${
                      !day
                        ? ""
                        : isWeddingDay
                        ? "bg-gray-800 text-white font-medium shadow-lg"
                        : dayOfWeek === 0
                        ? "text-red-500"
                        : dayOfWeek === 6
                        ? "text-blue-500"
                        : "text-gray-700"
                    }
                  `}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </section>
  );
}
