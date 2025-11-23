"use client";

import Image from "next/image";

export function Calendar() {
  return (
    <section className="w-full py-12">
      <div className="max-w-md mx-auto flex items-center justify-center">
        <Image
          src="/calendar.svg"
          alt="Wedding Calendar"
          width={285}
          height={161}
        />
      </div>
    </section>
  );
}
