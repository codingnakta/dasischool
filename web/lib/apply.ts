// 입학 신청 폼의 단계 정의와 검증. 클라이언트 폼과 /api/apply 가 함께 쓴다.

export type Answers = {
  nickname: string;
  age: string;
  region: string;
  days: string[];
  times: string[];
  reason: string;
  contact: string;
  email: string;
  insta: string;
  source: string;
  rules: boolean;
  privacy: boolean;
};

type TextKey = 'nickname' | 'contact' | 'email' | 'insta';
type ChoiceKey = 'age' | 'region' | 'source';

export type Step =
  | { type: 'text'; key: TextKey; title: string; hint?: string; placeholder: string; inputType?: 'text' | 'email'; maxLength: number; optional?: boolean }
  | { type: 'choice'; key: ChoiceKey; title: string; hint?: string; options: string[] }
  | { type: 'schedule'; key: 'schedule'; title: string; hint?: string }
  | { type: 'textarea'; key: 'reason'; title: string; hint?: string; placeholder: string }
  | { type: 'consent'; key: 'consent'; title: string; hint?: string };

export const emptyAnswers: Answers = {
  nickname: '', age: '', region: '', days: [], times: [], reason: '',
  contact: '', email: '', insta: '', source: '', rules: false, privacy: false,
};

export const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
export const TIMES = ['오전', '오후', '저녁'];
export const REASON_MAX = 500;

export const RULES = [
  '술은 선택이에요.',
  '연애는 자유지만 소개팅 모임은 아니에요.',
  '원하지 않는 연락을 반복하지 않아요.',
  '영업 / 투자 / 종교 권유는 하지 않아요.',
  '사진이나 개인정보를 허락 없이 공유하지 않아요.',
  '불편한 일이 있다면 운영진에게 이야기할 수 있어요.',
];

export const STEPS: Step[] = [
  { key: 'nickname', type: 'text', title: '다시학교에서 쓸 닉네임을 알려주세요.', hint: '2~3글자를 권장해요. 실명, 직장, 학교 대신 이 이름으로 만나요.', placeholder: '예: 모아', maxLength: 6 },
  { key: 'age', type: 'choice', title: '나이대는 어디쯤인가요?', options: ['20대 초반', '20대 중후반', '30대 초반', '30대 중후반', '40대 이상'] },
  { key: 'region', type: 'choice', title: '주로 어디서 생활하세요?', hint: '0기는 서울에서 모여요. 모임 장소를 정할 때 참고해요.', options: ['서울 강북권', '서울 강남권', '서울 서부 (마포·영등포 등)', '서울 동부 (성동·광진 등)', '경기 · 인천'] },
  { key: 'schedule', type: 'schedule', title: '참여할 수 있는 요일과 시간대를 골라주세요.', hint: '4주 중 최소 3회 이상 참여할 수 있어야 해요.' },
  { key: 'reason', type: 'textarea', title: '다시학교에 신청하는 이유가 궁금해요.', hint: '길지 않아도 괜찮아요. 요즘 어떤 마음인지 편하게 적어주세요.', placeholder: '예: 회사 밖에서 편하게 볼 수 있는 친구가 있었으면 해서요.' },
  { key: 'contact', type: 'text', title: '결과를 알려드릴 연락처를 남겨주세요.', hint: '전화번호 또는 카카오톡 ID. 반 배정 안내에만 써요.', placeholder: '010-0000-0000 또는 카카오 ID', maxLength: 40 },
  { key: 'email', type: 'text', title: '이메일 주소도 하나 적어주세요.', hint: '연락이 닿지 않을 때 보조로 사용해요.', placeholder: 'name@example.com', inputType: 'email', maxLength: 80 },
  { key: 'insta', type: 'text', title: '인스타그램 계정이 있다면 알려주세요.', hint: '선택 사항이에요. 비워두셔도 돼요.', placeholder: '@', optional: true, maxLength: 40 },
  { key: 'source', type: 'choice', title: '다시학교는 어떻게 알게 되셨어요?', options: ['인스타그램', '지인 소개', '검색', '커뮤니티 · 블로그', '기타'] },
  { key: 'consent', type: 'consent', title: '마지막으로, 교칙을 확인해주세요.', hint: '편하게 친해지기 위해 다 같이 지키는 약속이에요.' },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isStepValid(step: Step, a: Answers): boolean {
  switch (step.type) {
    case 'text':
      if (step.optional) return true;
      if (step.inputType === 'email') return EMAIL_RE.test(a.email.trim());
      return a[step.key].trim().length > 0;
    case 'textarea':
      return a.reason.trim().length >= 10;
    case 'choice':
      return !!a[step.key];
    case 'schedule':
      return a.days.length > 0 && a.times.length > 0;
    case 'consent':
      return a.rules && a.privacy;
  }
}

// 서버 측 재검증: 모든 단계 통과 + 길이/옵션 범위 확인
export function validateAnswers(input: unknown): Answers | null {
  if (!input || typeof input !== 'object') return null;
  const r = input as Record<string, unknown>;
  const str = (k: string, max: number) => (typeof r[k] === 'string' ? (r[k] as string).trim().slice(0, max) : '');
  const list = (k: string, allowed: string[]) =>
    Array.isArray(r[k]) ? allowed.filter(v => (r[k] as unknown[]).includes(v)) : [];
  const a: Answers = {
    nickname: str('nickname', 6),
    age: str('age', 20),
    region: str('region', 40),
    days: list('days', DAYS),
    times: list('times', TIMES),
    reason: str('reason', REASON_MAX),
    contact: str('contact', 40),
    email: str('email', 80),
    insta: str('insta', 40),
    source: str('source', 20),
    rules: r.rules === true,
    privacy: r.privacy === true,
  };
  for (const st of STEPS) {
    if (!isStepValid(st, a)) return null;
    if (st.type === 'choice' && !st.options.includes(a[st.key])) return null;
  }
  return a;
}

// 완료 화면 "가능 일정": 요일 나열 + 시간대 `·` 연결 (예: "월 수 토 오후·저녁")
export function formatSchedule(a: Answers): string {
  const days = DAYS.filter(d => a.days.includes(d));
  const times = TIMES.filter(t => a.times.includes(t)).join('·');
  return [...days, times].filter(Boolean).join(' ') || '-';
}
