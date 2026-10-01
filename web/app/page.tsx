import Link from 'next/link';

// 랜딩(`다시학교 랜딩 풀페이지.dc.html`)은 아직 미구현. 그 전까지 신청 폼으로 안내만 한다.
export default function Home() {
  return (
    <main style={{ maxWidth: 640, margin: '0 auto', padding: '56px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: '-.02em' }}>다시학교</span>
      <Link
        href="/apply"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 56, background: '#191f28', color: '#fff', fontSize: 16, fontWeight: 700, borderRadius: 12, textDecoration: 'none' }}
      >
        0기 입학 신청하기
      </Link>
    </main>
  );
}
