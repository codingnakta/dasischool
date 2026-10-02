import type { Metadata } from 'next';
import Link from 'next/link';
import s from '../doc.module.css';

export const metadata: Metadata = {
  title: '다시학교 교칙',
  description: '편하게 친해지기 위해 다 같이 지키는 약속이에요.',
};

// 랜딩·신청 폼의 교칙 6줄과 같은 순서. 제목을 바꾸면 lib/apply.ts 의 RULES 도 같이 바꿀 것.
const RULES: { title: string; body: React.ReactNode }[] = [
  {
    title: '술은 선택이에요.',
    body: <>마셔도 되고 안 마셔도 돼요. 안 마시는 사람에게 권하지 않고, 마시는 사람을 이상하게 보지도 않아요. 술을 전제로 한 자리는 만들지 않아요.</>,
  },
  {
    title: '연애는 자유지만 소개팅 모임은 아니에요.',
    body: <>같은 반에서 좋아하는 마음이 생기는 걸 막지는 않아요. 다만 다시학교는 친구를 만드는 곳이에요. 특정 성별이나 연애를 목적으로 참여하면 다른 사람이 불편해져요. 반 전체의 분위기를 먼저 생각해주세요.</>,
  },
  {
    title: '원하지 않는 연락을 반복하지 않아요.',
    body: <>답이 없거나 거절 의사를 보였다면 거기서 멈춰요. 개인 연락처는 상대가 먼저 알려줬을 때만 써요. 반 단체채팅방에서 개인 채팅으로 넘어갈 때도 마찬가지예요.</>,
  },
  {
    title: '영업 / 투자 / 종교 권유는 하지 않아요.',
    body: <>보험, 다단계, 투자, 종교, 정치 등 어떤 형태의 권유도 안 돼요. 직업 이야기는 괜찮지만 영업으로 이어지면 안 돼요. 한 번이라도 확인되면 바로 반에서 제외돼요.</>,
  },
  {
    title: '사진이나 개인정보를 허락 없이 공유하지 않아요.',
    body: <>모임 사진을 SNS에 올릴 때는 찍힌 사람 모두에게 먼저 물어봐요. 다른 사람의 실명, 직장, 연락처 같은 정보를 반 밖으로 가져가지 않아요. 다시학교에서는 닉네임으로 만나는 이유이기도 해요.</>,
  },
  {
    title: '불편한 일이 있다면 운영진에게 이야기할 수 있어요.',
    body: (
      <>
        작은 일이라도 괜찮아요. 담임에게 직접 말하거나 <a href="mailto:dasischool.nakta@gmail.com">dasischool.nakta@gmail.com</a>으로 알려주세요. 비공개로 확인하고 필요한 조치를 해요. 누가 이야기했는지는 알리지 않아요.
      </>
    ),
  },
];

export default function RulesPage() {
  return (
    <div className={s.page}>
      <header className={s.header}>
        <Link href="/" className={s.logo}>다시학교</Link>
        <Link href="/apply" className={s.headerApply}>입학 신청</Link>
      </header>

      <main className={s.main}>
        <div className={s.title}>
          <span className={s.eyebrow}>다시학교 교칙</span>
          <h1 className={s.h1}>편하게 친해지기 위해<br />지켜야 할 것들</h1>
          <p className={s.lead}>규칙이 많으면 어색해져요. 그래서 여섯 가지만 정했어요. 이것만 지키면 나머지는 자유예요.</p>
        </div>

        <ol className={s.sections}>
          {RULES.map((r, i) => (
            <li key={r.title}>
              <span className={s.num}>{String(i + 1).padStart(2, '0')}</span>
              <div className={s.sectionBody}>
                <h2 className={s.h2}>{r.title}</h2>
                <p className={s.p}>{r.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className={s.note}>
          <span className={s.noteTitle}>교칙을 지키지 않으면</span>
          <p className={s.p}>운영진이 상황을 확인한 뒤 반에서 제외될 수 있어요. 경우에 따라 다음 기수 참여도 어려워져요. 대부분은 서로 조금만 신경 쓰면 생기지 않는 일이에요.</p>
        </div>

        <div className={s.actions}>
          <Link href="/apply" className={s.primary}>0기 입학 신청하기</Link>
          <Link href="/" className={s.textLink}>처음으로 돌아가기</Link>
          <span className={s.updated} style={{ textAlign: 'center' }}>2026년 10월 기준</span>
        </div>
      </main>
    </div>
  );
}
