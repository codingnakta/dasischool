import type { Metadata } from 'next';
import Link from 'next/link';
import s from '../doc.module.css';

export const metadata: Metadata = {
  title: '다시학교 개인정보 안내',
  description: '입학 신청 때 받는 정보를 어디에, 왜, 언제까지 쓰는지 알려드려요.',
};

const EMAIL = 'dasischool.nakta@gmail.com';

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: '이런 정보를 받아요.',
    body: (
      <>
        입학 신청 폼에서 직접 적어주신 것만 받아요.
        <br />닉네임, 나이대, 거주 지역, 참여 가능한 요일과 시간대, 신청 이유, 연락처(전화번호 또는 카카오톡 ID), 이메일, 인스타그램 계정(선택), 다시학교를 알게 된 경로.
        <br />실명, 직장, 학교, 생년월일은 받지 않아요.
      </>
    ),
  },
  {
    title: '이렇게만 써요.',
    body: (
      <>
        반을 구성하고, 선정 결과를 알려드리고, 반 배정 뒤 모임 일정을 안내하는 데만 써요. 인스타그램 계정은 반을 구성할 때 참고용으로만 봐요. 광고나 다른 서비스 홍보에는 쓰지 않아요.
      </>
    ),
  },
  {
    title: '기수가 끝나면 지워요.',
    body: (
      <>
        신청하신 기수가 끝난 뒤 1개월 안에 모두 삭제해요. 선정되지 않은 분의 정보는 결과 안내가 끝나면 바로 지워요. 그 전이라도 삭제를 원하시면 아래 연락처로 알려주세요. 확인 후 3일 안에 지워요.
      </>
    ),
  },
  {
    title: '다른 곳에 넘기지 않아요.',
    body: (
      <>
        받은 정보를 다른 회사나 사람에게 제공하거나 팔지 않아요. 같은 반 학생들에게도 닉네임 외의 정보는 공유하지 않아요. 법령에 따라 요청받는 경우에만 예외예요.
      </>
    ),
  },
  {
    title: '이런 도구에 저장돼요.',
    body: (
      <>
        신청 내용은 운영진의 구글 스프레드시트(Google)에 저장되고, 사이트는 Vercel에서 운영돼요. 두 서비스 모두 정보를 전송·보관하는 용도로만 쓰고, 운영진 외에는 접근할 수 없게 관리해요.
      </>
    ),
  },
  {
    title: '동의하지 않아도 돼요.',
    body: (
      <>
        개인정보 수집에 동의하지 않을 수 있어요. 다만 연락처가 없으면 결과를 알려드릴 수 없어서, 그 경우 신청은 접수되지 않아요.
      </>
    ),
  },
  {
    title: '언제든 물어보고, 고치고, 지울 수 있어요.',
    body: (
      <>
        내 정보가 어떻게 저장돼 있는지 확인하거나, 고치거나, 지우고 싶으면 <a href={`mailto:${EMAIL}`}>{EMAIL}</a>으로 보내주세요. 본인 확인 후 3일 안에 처리하고 결과를 알려드려요.
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div className={s.page}>
      <header className={s.header}>
        <Link href="/" className={s.logo}>다시학교</Link>
        <Link href="/apply" className={s.headerApply}>입학 신청</Link>
      </header>

      <main className={s.main}>
        <div className={s.title}>
          <span className={s.eyebrow}>개인정보 안내</span>
          <h1 className={s.h1}>받은 정보는<br />반 배정에만 써요.</h1>
          <p className={s.lead}>입학 신청 때 적어주신 정보를 어디에, 왜, 언제까지 쓰는지 알려드려요. 어려운 말 없이 적었어요.</p>
        </div>

        <ol className={s.sections}>
          {SECTIONS.map((sec, i) => (
            <li key={sec.title}>
              <span className={s.num}>{String(i + 1).padStart(2, '0')}</span>
              <div className={s.sectionBody}>
                <h2 className={s.h2}>{sec.title}</h2>
                <p className={s.p}>{sec.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className={s.note}>
          <span className={s.noteTitle}>개인정보 담당</span>
          <p className={s.p}>
            다시학교 운영진 · <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <br />이 안내가 바뀌면 이 페이지에 먼저 올리고, 신청하신 분께는 이메일로 알려드려요.
          </p>
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
