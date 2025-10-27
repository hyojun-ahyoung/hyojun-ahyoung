"use client";

import { useEffect, useState } from "react";
import { WEDDING_INFO } from "@/constants/wedding-info";
import { calculateDday } from "@/utils/text";
import { Card } from "@/components/ui/Card";

export function DdayCounter() {
  const [dday, setDday] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDday(calculateDday(WEDDING_INFO.date));
  }, []);

  if (!mounted) {
    return null;
  }

  const getDdayText = () => {
    if (dday > 0) {
      return `D-${dday}`;
    } else if (dday === 0) {
      return "D-Day";
    } else {
      return `D+${Math.abs(dday)}`;
    }
  };

  return (
    <section className="w-full py-8 md:py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <Card className="text-center py-8">
          <p className="text-sm sm:text-base text-gray-500 mb-3">
            우리의 결혼식까지
          </p>
          <p className="text-5xl sm:text-6xl md:text-7xl font-light text-gray-800">
            {getDdayText()}
          </p>
          {dday > 0 && (
            <p className="text-sm sm:text-base text-gray-500 mt-3">
              {dday}일 남았습니다
            </p>
          )}
        </Card>
      </div>
    </section>
  );
}
