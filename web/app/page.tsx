import type { Metadata } from 'next';
import { RULES } from '@/lib/apply';
import ApplyLink from './components/ApplyLink';
import Faq from './components/Faq';
import Header from './components/Header';
import StickyCta from './components/StickyCta';
import s from './landing.module.css';

export const metadata: Metadata = {
  title: '다시학교 | 어른들의 새로운 같은 반',
  description: '처음 보는 사람들이 한 달 동안 같은 반이 되어 반복해서 만나는 성인 소셜클럽. 다시학교 0기 학생을 모집합니다.',
  openGraph: {
    title: '학교에서는 친구 사귀는 게 쉬웠는데.',
    description: '어른이 된 지금, 한 달 동안 다시 같은 반이 되어봅니다. 다시학교 0기.',
  },
};

// 사진은 아직 미정. 준비되면 public/ 에 넣고 여기 경로를 채우면 된다.
const HERO_PHOTO: string | null = null;
const FINAL_PHOTO: string | null = null;
const STUDENT_PHOTO: string | null = null; // 없으면 닉네임 첫 글자로 표시

const WEEKS = [
  ['WEEK 01', '입학식', <>같은 반 친구들을 처음 만나요.<br />모든 사람과 한 번씩 이야기하는 것이 첫 번째 목표.</>],
  ['WEEK 02', '짝꿍주간', <>3~4명의 소그룹으로 나뉘어요.<br />카페든, 저녁이든, 산책이든. 이번에는 조금 더 천천히 이야기해요.</>],
  ['WEEK 03', '우리반 활동', <>반 전체가 함께 하나의 활동을 해요.<br />볼링, 보드게임, 피크닉 등 활동은 기수마다 달라질 수 있어요.</>],
  ['WEEK 04', '졸업식', <>4주 동안의 추억을 정리해요.<br />담임이 운영하는 공식 4주 프로그램은 여기서 끝나요.</>],
] as const;

const WHY = [
  ['01', '같은 사람', '매번 새로운 사람을 만나지 않아요.'],
  ['02', '반복되는 만남', '한 번 만나고 끝나지 않아요.'],
  ['03', '작은 그룹', '대규모 네트워킹보다 서로 이름을 기억할 수 있는 규모.'],
  ['04', '자연스러운 관계', '누군가와 꼭 친해져야 한다는 압박을 만들지 않아요.'],
];

const FOR = [
  '새로운 친구가 있었으면 하는 사람',
  '회사와 집 외의 새로운 관계가 필요한 사람',
  '한 번보다 여러 번 만나보고 싶은 사람',
  '혼자 모임에 참여하는 것이 조금 어색했던 사람',
  '소개팅이 아닌 자연스러운 관계를 원하는 사람',
  '4주 동안 실제로 참여할 수 있는 사람',
];

const NOT_FOR = [
  '연애 상대를 찾는 것이 주목적인 경우',
  '영업, 투자, 종교 등의 목적으로 참여하는 경우',
  '대부분의 일정에 참여하기 어려운 경우',
  '상대방의 경계를 존중하기 어려운 경우',
];

function Photo({ src, alt }: { src: string | null; alt: string }) {
  return <div className={s.photo}>{src && <img src={src} alt={alt} />}</div>;
}

export default function Home() {
  return (
    <div className={s.page}>
      <Header />

      <section id="top" className={s.hero}>
        <Photo src={HERO_PHOTO} alt="한 반이 함께 있는 사진" />
        <div className={s.heroShade} />
        <div className={s.heroText}>
          <span className={s.heroLabel}>다시학교 0기 학생 모집</span>
          <h1 className={s.heroH1}>학교에서는<br />친구 사귀는 게 쉬웠는데.</h1>
          <p className={s.heroP}>같은 반이었고, 자주 마주쳤고,<br />같이 시간을 보냈으니까요.<br />어른이 된 지금, 다시 그런 환경을 만들어보려고 해요.</p>
        </div>
      </section>

      <section className={s.heroInfo}>
        <dl className={s.stats}>
          <div><dt>지역</dt><dd>서울</dd></div>
          <div><dt>인원</dt><dd>12~16명</dd></div>
          <div><dt>기간</dt><dd>4주</dd></div>
          <div><dt>참가비</dt><dd>무료</dd></div>
        </dl>
        <div className={s.stack} style={{ gap: 8 }}>
          <ApplyLink event="hero_apply_click" className={`${s.btn} ${s.btnDark}`}>0기 입학 신청하기</ApplyLink>
          <a href="#about" className={s.textLink}>어떤 곳인지 먼저 볼게요 ↓</a>
        </div>
        <div className={s.intro}>
          <span className={s.introName}>다시학교</span>
          <p className={s.introP}>처음 보는 사람들이 한 달 동안 같은 반이 되어 친해질 때까지 반복해서 만나는 부담 없는 성인 친목학교.</p>
        </div>
      </section>

      <section id="about" className={`${s.section} ${s.alt}`}>
        <h2 className={s.h2}>친구를 만드는 방법이 어려워진 게 아니라<br />친구가 생길 환경이 사라진 건 아닐까요?</h2>
        <p className={s.body}>학교에서는 친구를 만들기 위해 사람을 찾아다니지 않았어요. 같은 반에 배정되고, 매일 얼굴을 보고, 같이 밥을 먹고, 같은 일을 하다 보니 어느 순간 친구가 되어 있었죠.<br /><br />하지만 성인이 되면 새로운 사람을 반복해서 만나는 환경이 거의 사라져요.</p>
        <div className={s.flow}>
          <span className={s.flowItem}>같은 반</span>
          <span className={s.flowArrow}>↓</span>
          <span className={s.flowItem}>자주 만남</span>
          <span className={s.flowArrow}>↓</span>
          <span className={s.flowItem}>같이 시간을 보냄</span>
          <span className={s.flowArrow}>↓</span>
          <span className={s.flowEnd}>친구</span>
        </div>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>그래서 다시,<br />같은 반을 만들었어요.</h2>
        <p className={s.body}>다시학교는 사람을 한 번에 많이 만나게 하지 않아요. 대신 같은 사람을 여러 번 만나게 해요.<br /><br />12~16명이 한 반이 되어 한 달 동안 함께 활동해요.</p>
        <ul className={s.numbered}>
          {WHY.map(([n, title, desc]) => (
            <li key={n}>
              <span className={s.num}>{n}</span>
              <div className={s.stack} style={{ gap: 4 }}>
                <span className={s.numTitle}>{title}</span>
                <span className={s.numDesc}>{desc}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${s.section} ${s.alt}`}>
        <h2 className={s.h2}>한 번 만나는 모임과는<br />조금 달라요.</h2>
        <div className={s.compare}>
          <div className={`${s.card} ${s.cardLight}`}>
            <span className={s.cardTitle}>일반 친목모임</span>
            <div className={s.cardFlow}>
              <span>오늘 처음 만남</span><span className={s.cardArrow}>↓</span>
              <span>술 / 활동</span><span className={s.cardArrow}>↓</span>
              <span>인스타 교환</span><span className={s.cardArrow}>↓</span>
              <span>언젠가 보자</span><span className={s.cardArrow}>↓</span>
              <span className={s.cardEndLight}>끝</span>
            </div>
          </div>
          <div className={`${s.card} ${s.cardDark}`}>
            <span className={s.cardTitle}>다시학교</span>
            <div className={s.cardFlow}>
              <span>같은 반 배정</span><span className={s.cardArrow}>↓</span>
              <span>첫 만남</span><span className={s.cardArrow}>↓</span>
              <span>다시 만남</span><span className={s.cardArrow}>↓</span>
              <span>소그룹 만남</span><span className={s.cardArrow}>↓</span>
              <span>또 만남</span><span className={s.cardArrow}>↓</span>
              <span className={s.cardEndDark}>친구</span>
            </div>
          </div>
        </div>
      </section>

      <section id="cohort" className={s.section}>
        <div className={s.stack} style={{ gap: 10 }}>
          <span className={s.eyebrow}>0기 · BETA</span>
          <h2 className={s.h2}>다시학교 0기</h2>
        </div>
        <p className={s.body}>정식 운영 전에 진행하는 첫 번째 한 달짜리 베타 기수예요.<br />처음 만나는 12~16명이 4주 동안 하나의 반으로 생활해요.</p>
        <dl className={s.dl}>
          <div><dt>인원</dt><dd>12~16명</dd></div>
          <div><dt>기간</dt><dd>4주</dd></div>
          <div><dt>지역</dt><dd>서울</dd></div>
          <div><dt>참가비</dt><dd>무료</dd></div>
          <div><dt>참여 조건</dt><dd>4주 중 최소 3회 이상 참여 가능</dd></div>
          <div><dt>이름</dt><dd>실명 대신 짧은 닉네임 사용</dd></div>
        </dl>
        <p className={s.caption}>식사, 카페, 액티비티 등 개인 이용 비용은 각자 부담해요.</p>
      </section>

      <section className={`${s.section} ${s.alt}`} style={{ gap: 32 }}>
        <h2 className={s.h2}>한 달은 이렇게 흘러가요.</h2>
        <ol className={s.timeline}>
          {WEEKS.map(([week, title, desc], i) => (
            <li key={week}>
              <div className={s.tlRail}>
                <span className={s.tlDot} />
                {i < WEEKS.length - 1 && <span className={s.tlLine} />}
              </div>
              <div className={s.tlBody}>
                <span className={s.week}>{week}</span>
                <span className={s.tlTitle}>{title}</span>
                <p className={s.tlP}>{desc}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className={s.after}>
          <span className={s.afterLabel}>졸업 후</span>
          <p className={s.afterP}>담임은 더 이상 주간 모임을 만들지 않아요.<br />반 단체채팅방은 그대로 남고, 졸업생은 전체 동창 커뮤니티에 합류해요.</p>
          <p className={`${s.afterP} ${s.afterQuote}`}>그래도 누군가 먼저<br /><strong>“이번 주는 우리 안 봐?”</strong><br />라고 말하게 되는지 보고 싶어요.</p>
          <p className={s.afterNote}>그게 0기에서 우리가 가장 궁금한 것이에요.</p>
        </div>
        <ApplyLink event="program_apply_click" className={`${s.btn} ${s.btnOutline}`}>0기 입학 신청하기</ApplyLink>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>이런 학생을<br />기다리고 있어요.</h2>
        <ul className={s.checks}>
          {FOR.map(t => (
            <li key={t}><span className={s.checkMark} aria-hidden>✓</span><span>{t}</span></li>
          ))}
        </ul>
        <div className={s.notFor}>
          <span className={s.notForTitle}>이런 경우에는 맞지 않을 수 있어요</span>
          <ul className={s.dashes}>
            {NOT_FOR.map(t => (
              <li key={t}><span className={s.dash} aria-hidden>—</span><span>{t}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${s.section} ${s.alt}`}>
        <h2 className={s.h2}>다시학교에서는<br />새로운 이름으로 만나요.</h2>
        <p className={s.body}>처음부터 실명, 직장, 학교 같은 정보로 사람을 판단하지 않았으면 해요.<br />그래서 다시학교에서는 짧은 닉네임을 사용해요.</p>
        <div className={s.idCard}>
          <div className={s.idBand}>
            <span className={s.idBandLabel}>다시학교 학생증</span>
            <span className={s.idBandTitle}>다시학교</span>
            <span className={s.idBandCorner}>0기</span>
          </div>
          <div className={s.idPhoto}>{STUDENT_PHOTO ? <img src={STUDENT_PHOTO} alt="" /> : <span aria-hidden>모</span>}</div>
          <div className={s.idIdentity}>
            <span className={s.idName}>모아</span>
            <span className={s.idSub}>0기 · 1반</span>
          </div>
          <dl className={s.idRows}>
            <div><dt>기수</dt><dd>0기 (BETA)</dd></div>
            <div><dt>반</dt><dd>1반</dd></div>
            <div><dt>관심사</dt><dd>영화 · 카페 · 여행</dd></div>
          </dl>
        </div>
        <p className={s.caption}>2~3글자 닉네임 권장. 한 반에서는 동일 닉네임을 사용할 수 없어요.</p>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>한 달은 같은 반으로,<br />졸업 후에는 동창으로 남아요.</h2>
        <p className={s.body}>한 달 동안 반 구성은 유지돼요. 조금 어색했던 사람을 다음 주에 다시 만나고, 지난주에 잠깐 이야기한 사람과 이번에는 더 오래 이야기해요.<br /><br />관계가 쌓일 시간을 만드는 것. 그것이 다시학교의 가장 중요한 시스템이에요.<br /><br />4주차 졸업 후에는 기수별 반 관계를 유지하면서 전체 동창 커뮤니티에 합류하고, 동아리와 번개는 졸업생이 자율적으로 만들어요.</p>
      </section>

      <section className={`${s.section} ${s.alt}`} style={{ gap: 24 }}>
        <h2 className={s.h2}>편하게 친해지기 위해<br />지켜야 할 것들</h2>
        <ul className={s.rules}>
          {RULES.map(r => <li key={r}>{r}</li>)}
        </ul>
        <a href="/rules" className={s.rulesLink}>다시학교 교칙 자세히 보기 →</a>
      </section>

      <section id="faq" className={s.section} style={{ gap: 24 }}>
        <h2 className={s.h2}>자주 묻는 질문</h2>
        <Faq />
      </section>

      <section id="final" className={s.final}>
        <Photo src={FINAL_PHOTO} alt="졸업식 또는 반 활동 사진" />
        <div className={s.finalShade} />
        <div className={s.finalText}>
          <h2 className={s.finalH2}>다시 친구를 만드는<br />가장 익숙한 방법.</h2>
          <p className={s.finalP}>우리, 다시 같은 반이 되어볼까요?</p>
          <div className={s.finalMeta}>
            <span>다시학교 0기</span>
            <span>12~16명 · 서울 · 4주 · 무료</span>
          </div>
          <ApplyLink event="bottom_apply_click" className={`${s.btn} ${s.btnWhite}`}>0기 입학 신청하기</ApplyLink>
          <p className={s.finalNote}>선착순 모집이 아니에요.<br />지원 내용과 참여 가능한 일정을 고려해 반을 구성해요.</p>
        </div>
      </section>

      <footer className={s.footer}>
        <div className={s.footerBrand}>
          <span>다시학교</span>
          <span>친해질 때까지 만납니다.</span>
        </div>
        <nav className={s.footerNav}>
          <a href="https://instagram.com/dasihakkyo">Instagram</a>
          <a href="/privacy">개인정보 안내</a>
          <a href="/rules">다시학교 교칙</a>
          <a href="mailto:dasischool.nakta@gmail.com">문의하기</a>
        </nav>
        <div className={s.footerMeta}>
          <span>dasischool.nakta@gmail.com</span>
          <span>© 2026 다시학교</span>
        </div>
      </footer>

      <StickyCta />
    </div>
  );
}
