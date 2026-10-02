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
- `app/api/apply/route.ts` — 제출 엔드포인트. 서버 재검증 후 구글 시트(Apps Script)로 전송. 환경변수 없으면 로그만.
- `app/page.tsx` + `app/landing.module.css` + `app/components/` — 랜딩. 헤더(히어로 위 투명 → 스크롤 후 흰 배경), FAQ 아코디언, 하단 고정 CTA(히어로·마지막 CTA 구간에서 숨김), 신청 버튼 클릭 이벤트(gtag).
- 사진: 히어로 `public/hero.webp` (1280px), 문제 제기 섹션 `public/about.webp` (1080px, 풀블리드 + 흰 글씨). 마지막 CTA `public/final.webp` (1080px). 학생증 예시 사진은 `public/student.webp` (320px 정사각 크롭).
- 미제작 페이지: `/rules`, `/privacy` (링크만 있음).

## 신청 데이터 저장 (구글 시트)

신청마다 시트에 한 줄씩 쌓인다. 한 번만 설정하면 된다.

1. [sheets.new](https://sheets.new) 에서 새 시트 만들기. 이름은 아무거나 (예: 다시학교 0기 신청).
2. 시트 메뉴 **확장 프로그램 > Apps Script** 클릭. 열리는 편집기의 내용을 전부 지우고 `google-sheet/Code.gs` 내용을 붙여넣기.
3. 맨 위 `TOKEN = '여기에-비밀-토큰-입력'` 을 아무 긴 문자열로 바꾸기 (예: 비밀번호 생성기로 30자). 이 값은 4번에서 다시 쓴다.
4. 저장(Ctrl+S) 후 오른쪽 위 **배포 > 새 배포**:
   - 유형 선택(톱니바퀴) → **웹 앱**
   - 다음 사용자 인증 정보로 실행: **나**
   - 액세스 권한이 있는 사용자: **모든 사용자**
   - 배포 → 권한 승인(본인 구글 계정 선택 → "고급" → "이동" → 허용)
   - 나오는 **웹 앱 URL** 복사 (`https://script.google.com/macros/s/.../exec`)
5. Vercel 프로젝트 **Settings > Environment Variables** 에 두 개 추가:
   - `APPLY_SHEET_URL` = 4번의 웹 앱 URL
   - `APPLY_SHEET_TOKEN` = 3번의 토큰
   저장 후 **Deployments > 최신 배포 > Redeploy** (환경변수는 재배포해야 적용됨).
6. 사이트에서 신청 한 번 해보고 시트에 줄이 생기는지 확인.

Code.gs 를 고치면 **배포 > 배포 관리 > 연필 > 버전: 새 버전 > 배포** 를 해야 반영된다 (저장만으로는 안 됨). URL 은 그대로.
