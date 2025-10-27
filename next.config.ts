import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 정적 사이트로 빌드
  images: {
    unoptimized: true, // GitHub Pages는 이미지 최적화 미지원
  },
  // GitHub Pages를 사용하는 경우, 리포지토리 이름을 basePath에 추가
  // basePath: '/hyojun-ahyoung', // 리포지토리가 username.github.io가 아닌 경우만
};

export default nextConfig;
