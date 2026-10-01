'use client';

import { useEffect, useState } from 'react';
import ApplyLink from './ApplyLink';
import s from '../landing.module.css';

// 히어로 구간에서는 투명 + 흰 글자, 스크롤 후 흰 배경으로 전환
export default function Header() {
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    const hero = document.getElementById('top');
    if (!hero) return;
    const update = () => setOverHero(hero.getBoundingClientRect().bottom > 61);
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);

  return (
    <header className={s.header} data-over-hero={overHero || undefined}>
      <a href="#top" className={s.logo}>다시학교</a>
      <nav className={s.nav}>
        <a href="#about">소개</a>
        <a href="#cohort">0기</a>
        <a href="#faq">FAQ</a>
        <ApplyLink event="header_apply_click" className={s.navApply}>입학 신청</ApplyLink>
      </nav>
    </header>
  );
}
