"use client";

import { useEffect } from "react";

export function ViewportHeight() {
  useEffect(() => {
    // 초기 뷰포트 높이를 한 번만 계산해서 CSS 변수로 설정
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    // 초기 설정만 하고 리사이즈 이벤트는 무시 (스크롤 시 높이 변화 방지)
    setVh();
  }, []);

  return null;
}
