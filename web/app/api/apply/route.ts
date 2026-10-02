import { NextResponse } from 'next/server';
import { validateAnswers } from '@/lib/apply';

// 구글 시트 Apps Script 웹 앱. 둘 다 Vercel 환경변수로 넣는다 (README 참고).
const SHEET_URL = process.env.APPLY_SHEET_URL;
const SHEET_TOKEN = process.env.APPLY_SHEET_TOKEN;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const answers = validateAnswers(body);
  if (!answers) {
    return NextResponse.json({ ok: false, error: 'invalid_answers' }, { status: 422 });
  }

  // 저장소가 연결되지 않은 환경(로컬 개발 등)에서는 로그만 남긴다.
  if (!SHEET_URL || !SHEET_TOKEN) {
    console.warn('[apply] APPLY_SHEET_URL / APPLY_SHEET_TOKEN 미설정. 저장하지 않음:', answers);
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const res = await fetch(SHEET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: SHEET_TOKEN, answers }),
      // Apps Script 는 POST 후 302 로 결과 페이지로 보낸다. 기본값(follow)으로 따라간다.
      signal: AbortSignal.timeout(15_000),
    });
    const text = await res.text();
    let result: { ok?: boolean; error?: string } | null = null;
    try { result = JSON.parse(text); } catch {}
    if (!res.ok || !result?.ok) {
      // 진단용. JSON 이 아니면(구글 로그인 페이지 등) 배포 권한이 "모든 사용자" 가 아닌 경우가 대부분.
      const detail = result?.error ?? (text.trim().startsWith('<') ? 'not_json (배포 액세스 권한이 "모든 사용자"인지 확인)' : `http ${res.status}`);
      console.error('[apply] sheet error', res.status, detail, text.slice(0, 200));
      return NextResponse.json({ ok: false, error: 'sheet_failed', detail }, { status: 502 });
    }
  } catch (err) {
    console.error('[apply] sheet unreachable', err);
    return NextResponse.json({ ok: false, error: 'sheet_unreachable', detail: String(err) }, { status: 502 });
  }

  return NextResponse.json({ ok: true, stored: true });
}
