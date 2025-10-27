// 쿼리 파라미터 타입
export interface QueryParams {
  name?: string;
  polite?: boolean;
}

// 결혼식 정보 타입
export interface WeddingInfo {
  groom: PersonInfo;
  bride: PersonInfo;
  date: Date;
  venue: VenueInfo;
  message: MessageTexts;
}

export interface PersonInfo {
  name: string;
  fullName: string;
  fatherName?: string;
  motherName?: string;
  isFirstChild?: boolean;
  profileImage?: string;
  phone?: string;
}

export interface VenueInfo {
  name: string;
  address: string;
  floor?: string;
  hall?: string;
  latitude: number;
  longitude: number;
  parkingInfo?: string;
  transportInfo?: string;
}

export interface MessageTexts {
  greeting: {
    polite: string;
    casual: string;
  };
  invitation: {
    polite: string;
    casual: string;
  };
}

// 계좌 정보 타입
export interface AccountInfo {
  holder: string;
  bank: string;
  accountNumber: string;
  kakaoPayUrl?: string;
}

// 갤러리 이미지 타입
export interface GalleryImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

// 타임라인 아이템 타입
export interface TimelineItem {
  date: string;
  title: string;
  description: string;
}

// 텍스트 변환 타입
export type TextVariant = "polite" | "casual";
