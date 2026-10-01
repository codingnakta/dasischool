import { NextResponse } from 'next/server';
import { validateAnswers } from '@/lib/apply';

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

  // TODO: 저장소 연결 (Google Sheets Apps Script, Supabase, Airtable, Notion 등).
  // 지금은 서버 로그에만 남긴다.
  console.log('[apply] submit', { ...answers, submittedAt: new Date().toISOString() });

  return NextResponse.json({ ok: true });
}
