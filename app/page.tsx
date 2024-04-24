import HeroHeader from '@/components/heroHeader';
import TestimonialCard from '@/components/testimonialCard';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='bg-slate-900 flex min-h-screen flex-col items-center justify-between md:p-24'>
      <HeroHeader />
      <section className='flex flex-col md:flex-row overflow-x-scroll bg-slate-800 w-full rounded'>
        <TestimonialCard
          name='Ben Bachem'
          role='Founding Engineer @ Superchat'
          image='/people/ben.jpeg'
        />
        <TestimonialCard
          name='Malik Piara'
          role='Product Enablement @ CarByte'
          image='/people/malik.jpeg'
        />
        <TestimonialCard
          name='Johann Hemmann'
          role='Rust Developer @ Ferrous Systems'
          image='/people/johann.jpg'
        />
      </section>
    </main>
  );
}
