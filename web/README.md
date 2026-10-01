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
- `app/page.tsx` — 랜딩 자리(임시). 랜딩 풀페이지는 아직 미구현.
