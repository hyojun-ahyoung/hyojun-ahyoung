import { TextVariant } from "@/types";

// 텍스트 변환 맵
const TEXT_VARIANTS: Record<string, { polite: string; casual: string }> = {
  // 동사 변환
  와주세요: { polite: "와주세요", casual: "와줘" },
  참석해주세요: { polite: "참석해주세요", casual: "참석해줘" },
  축하해주세요: { polite: "축하해주세요", casual: "축하해줘" },
  보내주세요: { polite: "보내주세요", casual: "보내줘" },
  해주세요: { polite: "해주세요", casual: "해줘" },

  // 명사/호칭 변환
  님: { polite: "님", casual: "야" },
  귀하: { polite: "귀하", casual: "너" },
  여러분: { polite: "여러분", casual: "얘들아" },

  // 문장 종결
  니다: { polite: "니다", casual: "어" },
  습니다: { polite: "습니다", casual: "어" },
  세요: { polite: "세요", casual: "어" },
  시면: { polite: "시면", casual: "으면" },
  하시: { polite: "하시", casual: "하" },
};

/**
 * 존댓말/반말 텍스트를 변환합니다
 */
export function convertTextVariant(text: string, variant: TextVariant): string {
  if (variant === "polite") {
    return text;
  }

  let result = text;

  // 간단한 변환 규칙 적용
  Object.entries(TEXT_VARIANTS).forEach(([key, variants]) => {
    const regex = new RegExp(variants.polite, "g");
    result = result.replace(regex, variants.casual);
  });

  return result;
}

/**
 * 날짜를 포맷팅합니다
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];

  return `${year}년 ${month}월 ${day}일 ${dayOfWeek}요일`;
}

/**
 * 시간을 포맷팅합니다
 */
export function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const period = hours < 12 ? "오전" : "오후";
  const displayHours = hours > 12 ? hours - 12 : hours;

  return `${period} ${displayHours}시${
    minutes !== "00" ? ` ${minutes}분` : ""
  }`;
}

/**
 * D-day를 계산합니다
 */
export function calculateDday(targetDate: Date): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

/**
 * 클립보드에 텍스트를 복사합니다
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("클립보드 복사 실패:", error);
    return false;
  }
}
