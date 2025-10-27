"use client";

import { WEDDING_INFO } from "@/constants/wedding-info";
import { formatDate, formatTime } from "@/utils/text";
import { Card } from "@/components/ui/Card";

export function DateTime() {
  const { date, venue } = WEDDING_INFO;

  return (
    <section className="w-full py-12 md:py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center text-gray-800 mb-8 md:mb-10">
          예식 일정
        </h2>
        <Card className="text-center" padding="lg">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-lg sm:text-xl text-gray-700">
                {formatDate(date)}
              </p>
              <p className="text-lg sm:text-xl text-gray-700">
                {formatTime(date)}
              </p>
            </div>
            <div className="w-16 h-px bg-gray-300 mx-auto my-8" />
            <div className="space-y-3">
              <p className="text-xl sm:text-2xl font-light text-gray-800">
                {venue.name}
              </p>
              {venue.hall && (
                <p className="text-sm sm:text-base text-gray-600">
                  {venue.floor} {venue.hall}
                </p>
              )}
              <p className="text-sm sm:text-base text-gray-500 mt-4 leading-relaxed">
                {venue.address}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
