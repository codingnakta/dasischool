'use client';

import Link from 'next/link';
import { useEffect, useState, type KeyboardEvent } from 'react';
import {
  DAYS, REASON_MAX, RULES, STEPS, TIMES, emptyAnswers, formatSchedule, isStepValid,
  type Answers,
} from '@/lib/apply';
import s from './apply.module.css';

const STORAGE_KEY = 'dasischool:apply';
const N = STEPS.length;
const INTRO = -1;
const DONE = N;

type Saved = { step: number; a: Answers };

export default function ApplyForm() {
  // step: -1 인트로 | 0..9 질문 | 10 완료
  const [step, setStep] = useState(INTRO);
  const [a, setA] = useState<Answers>(emptyAnswers);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [restored, setRestored] = useState(false);

  // 새로고침 대비: sessionStorage 에서 복원
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Saved;
        setA({ ...emptyAnswers, ...saved.a });
        if (saved.step >= INTRO && saved.step < N) setStep(saved.step);
      }
    } catch {}
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored || step === DONE) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ step, a } satisfies Saved));
    } catch {}
  }, [restored, step, a]);

  const go = (n: number) => {
    setError(false);
    setStep(n);
    window.scrollTo(0, 0);
  };

  const set = <K extends keyof Answers>(key: K, v: Answers[K]) => setA(prev => ({ ...prev, [key]: v }));
  const toggleIn = (key: 'days' | 'times', v: string) =>
    setA(prev => ({ ...prev, [key]: prev[key].includes(v) ? prev[key].filter(x => x !== v) : [...prev[key], v] }));

  const inForm = step >= 0 && step < N;
  const st = inForm ? STEPS[step] : null;
  const ok = st ? isStepValid(st, a) : false;
  const last = step === N - 1;

  const submit = async () => {
    setSubmitting(true);
    setError(false);
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(a),
      });
      if (!res.ok) throw new Error(String(res.status));
      try { sessionStorage.removeItem(STORAGE_KEY); } catch {}
      go(DONE);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const next = () => {
    if (!ok || submitting) return;
    if (last) submit();
    else go(step + 1);
  };

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    // 한글 IME 조합 중 Enter 는 무시 (조합 확정용)
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      next();
    }
  };

  let nextLabel = '다음';
  if (last) nextLabel = submitting ? '제출하는 중…' : '신청 완료하기';
  else if (st?.type === 'text' && st.optional && !a[st.key]) nextLabel = '건너뛰기';

  return (
    <div className={s.page}>
      <header className={s.header}>
        <Link href="/" className={s.logo}>다시학교</Link>
        {inForm && <span className={s.stepLabel}>{step + 1} / {N}</span>}
      </header>

      {inForm && (
        <div
          className={s.progressTrack}
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={N}
          aria-valuenow={step + 1}
        >
          <div className={s.progressFill} style={{ width: `${((step + 1) / N) * 100}%` }} />
        </div>
      )}

      {step === INTRO && (
        <section className={`${s.screen} ${s.screenWide}`}>
          <div className={s.stack} style={{ gap: 20 }}>
            <span className={s.label}>다시학교 0기 · 입학 신청</span>
            <h1 className={s.h1}>같은 반이 되기 전,<br />몇 가지만 알려주세요.</h1>
            <p className={s.body}>10개 질문, 3분 정도 걸려요.<br />선착순이 아니라 지원 내용과 참여 가능한 일정을 보고 반을 구성해요.</p>
          </div>
          <div className={s.stack} style={{ gap: 12 }}>
            <div className={s.introMeta}>
              <span>· 서울 · 12~16명 · 4주 · 무료</span>
              <span>· 4주 중 최소 3회 이상 참여 가능해야 해요</span>
            </div>
            <button type="button" className={s.primary} onClick={() => go(0)}>시작하기</button>
          </div>
        </section>
      )}

      {st && (
        <section key={step} className={`${s.screen} ${s.screenQuestion}`}>
          <div className={s.stack} style={{ gap: 28 }}>
            <div className={s.stack} style={{ gap: 10 }}>
              <h2 className={s.h2} id="q-title">{st.title}</h2>
              {st.hint && <p className={s.hint}>{st.hint}</p>}
            </div>

            {st.type === 'text' && (
              <input
                className={s.input}
                type={st.inputType ?? 'text'}
                inputMode={st.inputType === 'email' ? 'email' : undefined}
                autoComplete={st.inputType === 'email' ? 'email' : 'off'}
                aria-labelledby="q-title"
                value={a[st.key]}
                onChange={e => set(st.key, e.target.value)}
                onKeyDown={onEnter}
                placeholder={st.placeholder}
                maxLength={st.maxLength}
                autoFocus
              />
            )}

            {st.type === 'textarea' && (
              <div className={s.stack} style={{ gap: 8 }}>
                <textarea
                  className={s.textarea}
                  aria-labelledby="q-title"
                  value={a.reason}
                  onChange={e => set('reason', e.target.value)}
                  placeholder={st.placeholder}
                  rows={6}
                  maxLength={REASON_MAX}
                  autoFocus
                />
                <span className={s.count}>{a.reason.length} / {REASON_MAX}</span>
              </div>
            )}

            {st.type === 'choice' && (
              <div className={s.stack} style={{ gap: 8 }} role="group" aria-labelledby="q-title">
                {st.options.map(o => {
                  const on = a[st.key] === o;
                  return (
                    <button key={o} type="button" className={s.option} aria-pressed={on} onClick={() => set(st.key, o)}>
                      <span>{o}</span>
                      <span className={s.optionMark}>{on ? '✓' : ''}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {st.type === 'schedule' && (
              <div className={s.stack} style={{ gap: 20 }}>
                <div className={s.stack} style={{ gap: 10 }}>
                  <span className={s.chipGroupLabel} id="days-label">요일 (복수 선택)</span>
                  <div className={`${s.chipGrid} ${s.days}`} role="group" aria-labelledby="days-label">
                    {DAYS.map(d => (
                      <button key={d} type="button" className={s.chip} aria-pressed={a.days.includes(d)} onClick={() => toggleIn('days', d)}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={s.stack} style={{ gap: 10 }}>
                  <span className={s.chipGroupLabel} id="times-label">시간대 (복수 선택)</span>
                  <div className={`${s.chipGrid} ${s.times}`} role="group" aria-labelledby="times-label">
                    {TIMES.map(t => (
                      <button key={t} type="button" className={s.chip} aria-pressed={a.times.includes(t)} onClick={() => toggleIn('times', t)}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {st.type === 'consent' && (
              <div className={s.stack} style={{ gap: 20 }}>
                <ul className={s.rules}>
                  {RULES.map(r => <li key={r}>{r}</li>)}
                </ul>
                <button type="button" role="checkbox" aria-checked={a.rules} className={s.check} onClick={() => set('rules', !a.rules)}>
                  <span className={s.checkBox} aria-hidden>{a.rules ? '✓' : ''}</span>
                  <span>다시학교 교칙을 읽었고 지킬게요.</span>
                </button>
                <button type="button" role="checkbox" aria-checked={a.privacy} className={s.check} onClick={() => set('privacy', !a.privacy)}>
                  <span className={s.checkBox} aria-hidden>{a.privacy ? '✓' : ''}</span>
                  <span className={s.stack} style={{ gap: 2 }}>
                    <span>개인정보 수집·이용에 동의해요.</span>
                    <span className={s.checkSub}>반 배정과 연락 목적으로만 쓰고, 기수 종료 후 파기해요.</span>
                  </span>
                </button>
              </div>
            )}
          </div>

          <div className={s.stack} style={{ gap: 12 }}>
            {error && <p className={s.error} role="alert">제출하지 못했어요. 잠시 후 다시 시도해주세요.</p>}
            <div className={s.navRow}>
              <button type="button" className={s.back} aria-label="이전" onClick={() => go(step - 1)} disabled={submitting}>←</button>
              <button type="button" className={`${s.primary} ${s.next}`} onClick={next} disabled={!ok || submitting}>
                {nextLabel}
              </button>
            </div>
          </div>
        </section>
      )}

      {step === DONE && (
        <section className={`${s.screen} ${s.screenWide}`}>
          <div className={s.stack} style={{ gap: 24 }}>
            <span className={s.doneMark} aria-hidden>✓</span>
            <h1 className={s.h1}>{a.nickname.trim() || '학생'}님,<br />신청이 접수됐어요.</h1>
            <p className={s.body}>선착순이 아니라서 바로 확정되지는 않아요.<br />지원 내용과 참여 가능한 일정을 보고 반을 구성한 뒤, 남겨주신 연락처로 결과를 알려드릴게요.</p>
            <dl className={s.summary}>
              <div><dt>닉네임</dt><dd>{a.nickname.trim() || '학생'}</dd></div>
              <div><dt>가능 일정</dt><dd>{formatSchedule(a)}</dd></div>
              <div><dt>연락처</dt><dd>{a.contact.trim() || '-'}</dd></div>
            </dl>
            <p className={s.caption}>
              결과 안내까지 보통 1~2주 정도 걸려요. 궁금한 점은{' '}
              <a href="mailto:dasischool.nakta@gmail.com">dasischool.nakta@gmail.com</a>으로 보내주세요.
            </p>
          </div>
          <div className={s.stack} style={{ gap: 10 }}>
            <a href="https://instagram.com/dasihakkyo" className={s.primary}>인스타그램에서 소식 받기</a>
            <Link href="/" className={s.textLink}>처음으로 돌아가기</Link>
          </div>
        </section>
      )}
    </div>
  );
}
