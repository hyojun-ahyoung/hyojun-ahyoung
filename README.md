# 효준 ♥ 아영 청첩장

모바일 최적화된 웨딩 청첩장 웹사이트입니다.

## 주요 기능

### 🎯 개인화 기능

- **쿼리스트링으로 게스트 이름 개인화**: `/?name=철수&polite=true`
- **존댓말/반말 자동 전환**: `polite` 파라미터로 텍스트 톤 조절

### 📱 모바일 최적화

- 터치 친화적인 UI (최소 44px 터치 영역)
- 반응형 디자인 (모바일 우선)
- 스와이프 가능한 갤러리
- 모바일에 최적화된 폰트 크기와 간격
- 부드러운 애니메이션과 트랜지션

### ❄️ 특별한 효과

- 겨울 결혼식 분위기의 눈 내리는 효과
- 미니멀/모던 디자인

### 🎨 포함된 섹션

- Hero: 개인화된 인사말
- D-day 카운터
- 신랑신부 소개
- 예식 일정
- 달력
- 갤러리 (스와이프 지원)
- 타임라인
- 오시는 길 (카카오맵/네이버지도/구글맵)
- 계좌번호 (클립보드 복사 기능)

## 시작하기

### 개발 서버 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 사용 예시

```bash
# 반말 모드
http://localhost:3000/?name=철수&polite=false

# 존댓말 모드 (기본값)
http://localhost:3000/?name=영희&polite=true
```

## 커스터마이징

### 결혼식 정보 수정

`src/constants/wedding-info.ts` 파일에서 다음 정보를 수정하세요:

- 신랑신부 이름 및 정보
- 예식 날짜/시간/장소
- 계좌번호
- 타임라인
- 갤러리 이미지

### 갤러리 이미지 교체

`public/images/gallery/` 폴더에 실제 사진을 추가하세요.

### 카카오맵 API 키

`src/components/sections/Location.tsx`에서 `YOUR_KAKAO_APP_KEY`를 실제 API 키로 교체하세요.

## 기술 스택

- **프레임워크**: Next.js 16 (App Router)
- **스타일링**: Tailwind CSS v4
- **언어**: TypeScript
- **폰트**: Noto Sans KR, Noto Serif KR

## 배포

### Vercel 배포 (권장)

```bash
npm run build
```

[Vercel](https://vercel.com)에 배포하면 자동으로 정적 사이트로 빌드됩니다.

## 라이선스

개인 사용을 위한 프로젝트입니다.
