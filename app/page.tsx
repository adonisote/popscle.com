import HeroHeader from '@/components/heroHeader';
import { Motto } from '@/components/motto';
import TestimonialCard from '@/components/testimonialCard';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <main className='bg-slate-900 flex min-h-screen flex-col items-center justify-between p-6 md:p-24'>
        <div className='relative isolate px-6 pt-14 lg:px-8'>
          <div
            className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
            aria-hidden='true'
          >
            <div
              className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </div>

        <HeroHeader />

        <span className='text-pink-400 text-base font-semibold leading-7 animate-in'>
          Community Contributors
        </span>

        <section className='flex flex-col md:flex-row overflow-x-scroll w-full'>
          <TestimonialCard
            name='Ben Bachem'
            role='Founding Engineer, Superchat'
            image='/people/ben.jpeg'
          />
          <TestimonialCard
            name='Manuel Dolderer'
            role='Co-Founder, CODE'
            image='/people/manuel.jpeg'
          />
          <TestimonialCard
            name='Johann Hemmann'
            role='Rust Developer, Ferrous Systems'
            image='/people/johann2.jpg'
          />
        </section>
        <section className='flex flex-col md:flex-row overflow-x-scroll w-full'>
          <TestimonialCard
            name='Malik Piara'
            role='Product Enablement, CarByte'
            image='/people/malik.jpeg'
          />
        </section>
      </main>
      <Motto />
    </>
  );
}
