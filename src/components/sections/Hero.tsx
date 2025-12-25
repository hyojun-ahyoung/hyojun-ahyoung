"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useSplash } from "@/context/SplashContext";

export function Hero() {
  const { isSplashComplete } = useSplash();
  return (
    <section className="relative w-full flex flex-col items-center">
      {/* 타이틀 이미지 */}
      <div className="absolute top-4 z-20 w-full px-6">
        <Image
          src="/images/main_title.png"
          alt="Save the Date"
          width={400}
          height={200}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      {/* 메인 이미지 */}
      <motion.div 
        className="relative mt-36 mx-3 w-[calc(100%-24px)]"
        initial={{ opacity: 0 }}
        animate={isSplashComplete ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src="/images/main.png"
          alt="Wedding Main"
          width={351}
          height={424}
          className="w-full h-auto"
          priority
        />
      </motion.div>
      </section>
  );
}
