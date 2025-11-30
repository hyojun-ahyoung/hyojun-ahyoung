import { WeddingInfo, TimelineItem } from "@/types";

// 결혼식 기본 정보
export const WEDDING_INFO: WeddingInfo = {
  groom: {
    name: "효준",
    fullName: "박효준",
    fatherName: "박대경",
    motherName: "최인숙",
    isFirstChild: true,
    phone: "010-7329-8855",
  },
  bride: {
    name: "아영",
    fullName: "이아영",
    fatherName: "이동철",
    motherName: "김유임",
    isFirstChild: true,
    phone: "010-8709-3027",
  },
  date: new Date("2026-02-08T11:00:00"),
  venue: {
    name: "AW컨벤션",
    city: "안산",
    address: "경기 안산시 단원구 광덕1로 171",
    floor: "6층",
    hall: "테라스볼룸홀",
    latitude: 37.30819646136707,
    longitude: 126.82884037016814,
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
  groom: { role: string; name: string; bank: string; accountNumber: string }[];
  bride: { role: string; name: string; bank: string; accountNumber: string }[];
} = {
  groom: [
    {
      role: "신랑",
      name: "박효준",
      bank: "카카오뱅크",
      accountNumber: "3333-02-9995632",
    },
    {
      role: "아버지",
      name: "박대경",
      bank: "국민은행",
      accountNumber: "5935-01-01-036237",
    },
    {
      role: "어머니",
      name: "최인숙",
      bank: "우리은행",
      accountNumber: "1002-136-992717",
    },
  ],
  bride: [
    {
      role: "신부",
      name: "이아영",
      bank: "카카오뱅크",
      accountNumber: "3333-08-9560455",
    },
    {
      role: "아버지",
      name: "이동철",
      bank: "농협은행",
      accountNumber: "352-1240-2411-93",
    },
    {
      role: "어머니",
      name: "김유임",
      bank: "국민은행",
      accountNumber: "263-21-0092-460",
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
