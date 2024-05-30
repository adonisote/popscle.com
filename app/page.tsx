import HeroHeader from '@/components/heroHeader';
import { Motto } from '@/components/motto';
import TestimonialCard from '@/components/testimonialCard';
import Image from 'next/image';
import Link from 'next/link';

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
          Join Our Community
        </span>

        <section className='flex flex-col md:flex-row'>
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
        <section className='flex flex-col md:flex-row'>
          <TestimonialCard
            name='Svitlana Midianko'
            role='Product Enablement, Google Labs'
            image='/people/svitlana.jpg'
          />
          <TestimonialCard
            name='Malik Piara'
            role='Product Enablement, CarByte'
            image='/people/malik.jpeg'
          />
          <TestimonialCard
            name='Maya Alroy'
            role='UX & Design Acessibility'
            image='/people/maya.png'
          />
        </section>
        <section className='flex flex-col md:flex-row'>
          <TestimonialCard
            name='Lennart Schoch'
            role='Senior Product Engineer, Bounce'
            image='/people/lennart.jpeg'
          />
          <TestimonialCard
            name='Jonathan Freiberger'
            role='Backend Development'
            image='/people/joni.jpeg'
          />
          <TestimonialCard
            name='Linus Bolls'
            role='Founding Engineer, Flamingo'
            image='/people/linus.png'
          />
        </section>
        <section className='flex flex-col md:flex-row'>
          <TestimonialCard
            name='Lion Reinacher'
            role='Founding Engineer, CircleSquare'
            image='/people/lion.png'
          />
          <TestimonialCard
            name='Zaid Zaim'
            role='Spatial Computing Expert, ignore gravity'
            image='/people/zaid.jpeg'
          />
          <TestimonialCard
            name='Pablo Schlesselmann'
            role='Founding Engineer, CircleSquare'
            image='/people/pablo.jpeg'
          />
        </section>

        <footer className='sm:items-center flex justify-end p-3'>
          {/*  <span className='text-slate-400 sm:text-center'>
            {'Built at '}
            <Link href='https://code.berlin/'>
              <span className='underline underline-offset-4'>CODE</span>
            </Link>
          </span> */}
          <div className='flex mt-4 sm:justify-center sm:mt-0'>
            <Link
              href='https://twitter.com/curiositydrivn'
              className='text-slate-400 hover:text-pink-400 transition-all ms-5'
              id='twitter-link'
            >
              <svg
                className='w-6 h-6 text-white'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z' />
              </svg>

              <span className='sr-only'>X</span>
            </Link>
          </div>
        </footer>
      </main>
      <Motto />
    </>
  );
}
