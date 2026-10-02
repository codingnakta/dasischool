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
    const result = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res.ok || !result?.ok) {
      console.error('[apply] sheet error', res.status, result);
      return NextResponse.json({ ok: false, error: 'sheet_failed' }, { status: 502 });
    }
  } catch (err) {
    console.error('[apply] sheet unreachable', err);
    return NextResponse.json({ ok: false, error: 'sheet_unreachable' }, { status: 502 });
  }

  return NextResponse.json({ ok: true, stored: true });
}
