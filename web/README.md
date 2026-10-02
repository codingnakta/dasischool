# 다시학교 web

Next.js (App Router) + TypeScript. 디자인 원본: `../project/다시학교 입학 신청.dc.html`, 명세: `../project/design_handoff_dasischool/README.md`.

```bash
npm install
npm run dev     # http://localhost:3000/apply
npm run build
```

## 구조
- `app/apply/` — 입학 신청 폼 (인트로 → 10단계 → 완료). 단계 전환 200ms 페이드, 입력값은 `sessionStorage`에 보관(새로고침 대비), 제출 성공 시 삭제.
- `lib/apply.ts` — 질문 정의, 단계별 검증, 서버 재검증, 일정 포맷. 폼과 API가 공유.
- `app/api/apply/route.ts` — 제출 엔드포인트. 검증 후 지금은 서버 로그만 남김 → **저장소 연결 필요** (TODO 위치).
- `app/page.tsx` + `app/landing.module.css` + `app/components/` — 랜딩. 헤더(히어로 위 투명 → 스크롤 후 흰 배경), FAQ 아코디언, 하단 고정 CTA(히어로·마지막 CTA 구간에서 숨김), 신청 버튼 클릭 이벤트(gtag).
- 사진: 히어로 `public/hero.webp` (1280px), 문제 제기 섹션 `public/about.webp` (1080px, 풀블리드 + 흰 글씨). 마지막 CTA `public/final.webp` (1080px). 학생증 예시 사진은 `public/student.webp` (320px 정사각 크롭).
- 미제작 페이지: `/rules`, `/privacy` (링크만 있음).
