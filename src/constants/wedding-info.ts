import { WeddingInfo, AccountInfo, TimelineItem } from "@/types";

// 결혼식 기본 정보
export const WEDDING_INFO: WeddingInfo = {
  groom: {
    name: "효준",
    fullName: "박효준",
    fatherName: "박OO",
    motherName: "김OO",
    isFirstChild: true,
    phone: "010-0000-0000",
  },
  bride: {
    name: "아영",
    fullName: "김아영",
    fatherName: "김OO",
    motherName: "이OO",
    isFirstChild: false,
    phone: "010-0000-0000",
  },
  date: new Date("2025-02-15T14:00:00"),
  venue: {
    name: "서울 웨딩홀",
    address: "서울특별시 강남구 테헤란로 123",
    floor: "3층",
    hall: "그랜드홀",
    latitude: 37.5665,
    longitude: 126.978,
    parkingInfo: "건물 지하 1층~3층 주차 가능 (2시간 무료)",
    transportInfo: "지하철 2호선 강남역 3번 출구에서 도보 5분",
  },
  message: {
    greeting: {
      polite:
        "저희 두 사람이 사랑과 믿음으로\n한 가정을 이루게 되었습니다.\n귀한 걸음 하시어 축복해 주시면\n큰 기쁨으로 간직하겠습니다.",
      casual:
        "우리 둘이 사랑과 믿음으로\n한 가정을 이루게 되었어.\n와서 축복해주면\n정말 기쁠 것 같아!",
    },
    invitation: {
      polite: "참석해 주셔서 감사합니다",
      casual: "와줘서 고마워",
    },
  },
};

// 계좌 정보
export const ACCOUNT_INFO: {
  groom: AccountInfo[];
  bride: AccountInfo[];
} = {
  groom: [
    {
      holder: "박효준",
      bank: "카카오뱅크",
      accountNumber: "3333-00-0000000",
    },
    {
      holder: "박OO (부)",
      bank: "국민은행",
      accountNumber: "000000-00-000000",
    },
  ],
  bride: [
    {
      holder: "김아영",
      bank: "토스뱅크",
      accountNumber: "1000-0000-0000",
    },
    {
      holder: "김OO (부)",
      bank: "신한은행",
      accountNumber: "110-000-000000",
    },
  ],
};

// 타임라인 데이터
export const TIMELINE_DATA: TimelineItem[] = [
  {
    date: "2020.03",
    title: "첫 만남",
    description: "공통 친구의 소개로 처음 만났습니다",
  },
  {
    date: "2020.06",
    title: "연인이 되다",
    description: "서로에게 특별한 사람이 되었습니다",
  },
  {
    date: "2023.12",
    title: "프러포즈",
    description: "평생을 함께하기로 약속했습니다",
  },
  {
    date: "2025.02",
    title: "결혼",
    description: "부부의 연을 맺습니다",
  },
];

// 갤러리 이미지 (실제 이미지 경로로 변경 필요)
export const GALLERY_IMAGES = [
  { src: "/images/gallery/1.jpg", alt: "사진 1" },
  { src: "/images/gallery/2.jpg", alt: "사진 2" },
  { src: "/images/gallery/3.jpg", alt: "사진 3" },
  { src: "/images/gallery/4.jpg", alt: "사진 4" },
  { src: "/images/gallery/5.jpg", alt: "사진 5" },
  { src: "/images/gallery/6.jpg", alt: "사진 6" },
];
