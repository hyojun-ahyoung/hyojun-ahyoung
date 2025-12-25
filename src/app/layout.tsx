import type { Metadata } from "next";
import { Suspense } from "react";
import { Noto_Sans_KR, Noto_Serif_KR, Vesper_Libre } from "next/font/google";
import "./globals.css";
import { SplashScreen } from "@/components/ui/SplashScreen";
import { ViewportHeight } from "@/components/ui/ViewportHeight";
import { BackgroundMusic } from "@/components/ui/BackgroundMusic";
import { SplashProvider } from "@/context/SplashContext";
import { WEDDING_INFO } from "@/constants/wedding-info";

const notoSansKr = Noto_Sans_KR({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
});

const notoSerifKr = Noto_Serif_KR({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: "swap",
});

const vesperLibre = Vesper_Libre({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-vesper",
  display: "swap",
});

const { groom, bride, date } = WEDDING_INFO;
const days = ["일", "월", "화", "수", "목", "금", "토"];
const dayOfWeek = days[date.getDay()];
const hour = date.getHours();
const minute = date.getMinutes();
const ampm = hour >= 12 ? "오후" : "오전";
const displayHour = hour > 12 ? hour - 12 : hour;
const dateStr = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일(${dayOfWeek}) ${ampm} ${displayHour}시${minute > 0 ? ` ${minute}분` : ""}`;

export const metadata: Metadata = {
  title: `${groom.fullName}♥${bride.fullName}의 결혼식에 초대합니다.`,
  description: `예식일: ${dateStr}`,
  openGraph: {
    title: `${groom.fullName}♥${bride.fullName}의 결혼식에 초대합니다.`,
    description: `예식일: ${dateStr}`,
    type: "website",
    images: [
      {
        url: "/images/gallery/5.jpg",
        width: 900,
        height: 1332,
      },
    ],
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/android-icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/favicon/apple-icon-precomposed.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body
        className={`${notoSansKr.variable} ${notoSerifKr.variable} ${vesperLibre.variable} font-sans antialiased`}
      >
        <SplashProvider>
          <ViewportHeight />
          <BackgroundMusic />
          <Suspense fallback={null}>
            <SplashScreen />
          </Suspense>
          <div className="min-h-screen w-full flex justify-center bg-gray-50">
            <div className="w-full min-w-[360px] max-w-[440px] bg-white shadow-xl overflow-hidden">
              {children}
            </div>
          </div>
        </SplashProvider>

        {/* 전역 SVG 필터 - 서버에서 미리 렌더링 */}
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
      </body>
    </html>
  );
}
