import HeroHeader from '@/components/heroHeader';
import TestimonialCard from '@/components/testimonialCard';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between md:p-24'>
      <HeroHeader />
      <section className='flex flex-col md:flex-row'>
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
      </section>
    </main>
  );
}
