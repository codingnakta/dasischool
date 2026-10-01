'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// 신청 버튼. 위치별 클릭 이벤트(header_apply_click 등)를 gtag 로 보낸다.
export default function ApplyLink({ event, className, children }: { event: string; className?: string; children: ReactNode }) {
  return (
    <Link href="/apply" className={className} onClick={() => { try { window.gtag?.('event', event); } catch {} }}>
      {children}
    </Link>
  );
}
