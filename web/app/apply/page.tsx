import type { Metadata } from 'next';
import ApplyForm from './ApplyForm';

export const metadata: Metadata = {
  title: '다시학교 0기 입학 신청',
};

export default function ApplyPage() {
  return <ApplyForm />;
}
