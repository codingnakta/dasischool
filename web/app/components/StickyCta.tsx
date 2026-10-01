'use client';

import { useEffect, useState } from 'react';
import ApplyLink from './ApplyLink';
import s from '../landing.module.css';

// 히어로 또는 마지막 CTA 가 뷰포트 15~85% 구간에 보일 때는 숨김
export default function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('top');
    const fin = document.getElementById('final');
    const visible = (el: HTMLElement | null) => {
      if (!el) return false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      return r.bottom > vh * 0.15 && r.top < vh * 0.85;
    };
    const update = () => setShow(!visible(hero) && !visible(fin));
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);

  return (
    <div className={s.sticky} data-show={show || undefined} aria-hidden={!show}>
      <ApplyLink event="sticky_apply_click" className={s.stickyBtn}>0기 입학 신청</ApplyLink>
    </div>
  );
}
