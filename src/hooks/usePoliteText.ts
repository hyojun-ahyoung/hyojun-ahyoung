"use client";

import { TextVariant } from "@/types";
import { convertTextVariant } from "@/utils/text";

/**
 * 존댓말/반말 텍스트를 반환하는 훅
 * @param polite 존댓말 여부
 * @returns 텍스트 변환 함수
 */
export function usePoliteText(polite: boolean) {
  const variant: TextVariant = polite ? "polite" : "casual";

  /**
   * 주어진 텍스트 객체에서 적절한 variant를 선택합니다
   */
  const getText = (texts: { polite: string; casual: string }): string => {
    return texts[variant];
  };

  /**
   * 단일 텍스트를 변환합니다 (고급 변환)
   */
  const convertText = (text: string): string => {
    return convertTextVariant(text, variant);
  };

  return {
    getText,
    convertText,
    variant,
    isPolite: polite,
  };
}
