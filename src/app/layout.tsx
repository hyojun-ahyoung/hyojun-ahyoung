import type { Metadata } from "next";
import { Suspense } from "react";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";
import { SplashScreen } from "@/components/ui/SplashScreen";
import { ViewportHeight } from "@/components/ui/ViewportHeight";
import { BackgroundMusic } from "@/components/ui/BackgroundMusic";

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

export const metadata: Metadata = {
  title: "효준 ♥ 아영 결혼식에 초대합니다",
  description:
    "2025년 2월 15일 오후 2시, 저희 두 사람의 소중한 순간에 함께해 주세요",
  openGraph: {
    title: "효준 ♥ 아영 결혼식",
    description: "2025년 2월 15일 오후 2시",
    type: "website",
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
        className={`${notoSansKr.variable} ${notoSerifKr.variable} font-sans antialiased`}
      >
        <ViewportHeight />
        <BackgroundMusic />
        <Suspense fallback={null}>
          <SplashScreen />
        </Suspense>
        <div className="min-h-screen w-full flex justify-center bg-gray-50">
          <div className="w-full min-w-[360px] max-w-[440px] bg-white shadow-xl overflow-y-auto overflow-x-hidden snap-y snap-mandatory h-screen">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
