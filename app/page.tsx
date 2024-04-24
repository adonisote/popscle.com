import HeroHeader from '@/components/heroHeader';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between md:p-24'>
      <HeroHeader />
    </main>
  );
}
