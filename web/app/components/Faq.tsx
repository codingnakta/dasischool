'use client';

import { useState } from 'react';
import s from '../landing.module.css';

const FAQS: [string, string][] = [
  ['정말 무료인가요?', '0기는 정식 운영 전 한 달짜리 베타 기수로 참가비 없이 운영해요. 단, 식사나 카페 등 개인적으로 발생하는 비용은 각자 부담해요.'],
  ['혼자 신청해도 되나요?', '다시학교는 기본적으로 모두 혼자 신청하는 것을 전제로 운영해요.'],
  ['낯을 많이 가려도 괜찮나요?', '괜찮아요. 처음부터 활발하게 행동할 필요는 없어요. 운영자가 소그룹과 자리 등을 조정해 자연스럽게 이야기할 기회를 만들어요.'],
  ['술모임인가요?', '아니에요. 술은 선택이며 음주를 전제로 프로그램을 운영하지 않아요.'],
  ['소개팅 모임인가요?', '아니에요. 연애가 생기는 것을 제한하지는 않지만, 특정 성별과의 만남이나 연애를 목적으로 운영하지 않아요.'],
  ['왜 매주 같은 사람을 만나나요?', '다시학교가 가장 중요하게 생각하는 것이 반복되는 만남이기 때문이에요.'],
  ['한 달이 끝나면 어떻게 되나요?', '4주차 졸업식과 함께 담임의 정규 프로그램은 종료돼요. 반 단체채팅방은 유지되며, 졸업생은 전체 동창 커뮤니티와 자율 동아리에 참여할 수 있어요.'],
  ['꼭 4번 모두 참여해야 하나요?', '가급적 모든 일정 참석을 권장하며, 최소 3회 이상 참여 가능한 사람을 우선적으로 모집해요.'],
  ['친구와 함께 신청해도 되나요?', '신청은 가능하지만 같은 반 배정은 보장하지 않아요.'],
];

// 아코디언: 한 번에 하나만 열림
export default function Faq() {
  const [open, setOpen] = useState(-1);
  return (
    <div className={s.faqList}>
      {FAQS.map(([q, a], i) => {
        const isOpen = open === i;
        return (
          <div key={q} className={s.faqItem}>
            <button
              type="button"
              className={s.faqQ}
              aria-expanded={isOpen}
              aria-controls={`faq-a-${i}`}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span>{q}</span>
              <span className={s.faqIcon} aria-hidden>{isOpen ? '−' : '+'}</span>
            </button>
            <div id={`faq-a-${i}`} className={s.faqA} data-open={isOpen || undefined}>
              <div><p>{a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
