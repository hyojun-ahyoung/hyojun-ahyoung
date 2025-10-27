import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
