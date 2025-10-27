"use client";

import { useSearchParams } from "next/navigation";
import { QueryParams } from "@/types";

/**
 * URL 쿼리 파라미터에서 name과 polite 값을 추출합니다
 * @returns {QueryParams} name과 polite 값
 */
export function useQueryParams(): QueryParams {
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || undefined;
  const politeParam = searchParams.get("polite");

  // polite 파라미터가 'false'가 아니면 기본적으로 true (존댓말)
  const polite = politeParam === "false" ? false : true;

  return {
    name,
    polite,
  };
}
