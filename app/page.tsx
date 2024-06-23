import HeroHeader from '@/components/heroHeader';
import { Motto } from '@/components/motto';
import PeopleCardAndSheet from '@/components/peopleCardAndSheet';
import Image from 'next/image';
import Link from 'next/link';

// bg-[#0f0f0f] - Black but with some white
// bg-[#060912] - Black Blue from Figma
// bg-[#0b101e] - Black Blue from Figma with a bit of white

export default function Home() {
  return (
    <>
      <main className='bg-[#101017] flex min-h-screen flex-col items-center justify-between p-6 md:p-24'>
        <div className='fixed inset-0 h-full w-full bg-[#101017] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_0px,transparent_0px)] bg-[size:11.5rem_4rem]' />

        <div className='relative isolate px-6 pt-14 lg:px-8'>
          <div className='absolute bottom-auto left-auto right-40 top-40 h-[500px] w-[500px] rounded-full bg-gradient-to-b from-[#FF72E1] to-[#F54C7A] opacity-25 blur-[60px]  animate-blob-landing animate-in-blob' />

          <div
            className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-[60px] sm:-top-80 animate-in-blob'
            aria-hidden='true'
          >
            <div
              className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#F6B0E6] to-[#b5b0f6]  sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] animate-blob-landing'
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </div>

        <HeroHeader />

        <span className='text-pink-400 text-base font-semibold leading-7 animate-in-after'>
          Join Our Community
        </span>

        <section className='flex flex-col md:flex-row animate-in-after'>
          <PeopleCardAndSheet
            name='Ben Bachem'
            role='Founding Engineer, Superchat'
            image='/people/ben.jpeg'
          />
          <PeopleCardAndSheet
            name='Manuel Dolderer'
            role='Co-Founder, CODE'
            image='/people/manuel.jpeg'
          />
          <PeopleCardAndSheet
            name='Johann Hemmann'
            role='Rust Developer, Ferrous Systems'
            image='/people/johann2.jpg'
          />
        </section>
        <section className='flex flex-col md:flex-row'>
          <PeopleCardAndSheet
            name='Svitlana Midianko'
            role='Product Enablement, Google Labs'
            image='/people/svitlana.jpg'
          />
          <PeopleCardAndSheet
            name='Malik Piara'
            role='Product Enablement, CarByte'
            image='/people/malik.jpeg'
          />
          <PeopleCardAndSheet
            name='Linus Bolls'
            role='Founding Engineer, Flamingo'
            image='/people/linus.png'
          />
        </section>
        <section className='flex flex-col md:flex-row'>
          <PeopleCardAndSheet
            name='Lennart Schoch'
            role='Senior Product Engineer, Bounce'
            image='/people/lennart.jpeg'
          />
          <PeopleCardAndSheet
            name='Jonathan Freiberger'
            role='Backend Development'
            image='/people/joni.jpeg'
          />
          <PeopleCardAndSheet
            name='Maya Alroy'
            role='UX & Design Acessibility'
            image='/people/maya.png'
          />
        </section>
        <section className='flex flex-col md:flex-row'>
          <PeopleCardAndSheet
            name='Lion Reinacher'
            role='Founding Engineer, CircleSquare'
            image='/people/lion.png'
          />
          <PeopleCardAndSheet
            name='Zaid Zaim'
            role='Spatial Computing Expert, ignore gravity'
            image='/people/zaid.jpeg'
          />
          <PeopleCardAndSheet
            name='Pablo Schlesselmann'
            role='Founding Engineer, CircleSquare'
            image='/people/pablo.jpeg'
          />
        </section>
        <section className='flex flex-col md:flex-row'>
          <PeopleCardAndSheet
            name='Emely Henninger'
            role='Software Engineer, CERN'
            image='/people/emely.jpeg'
          />
          <PeopleCardAndSheet
            name='Heiko Damaske'
            role='Founders Associate, Flinn Comply'
            image='/people/heiko.jpeg'
          />
          <PeopleCardAndSheet
            name='Moritz Eich'
            role='AI Developer, Patient21'
            image='/people/moritz.jpeg'
          />
        </section>

        {/* <div className='relative w-full max-w-lg'>
          <div className='absolute top-0 -left-50 w-96 h-96 bg-pink-300 mix-blend-screen blur-3xl opacity-30 rounded-full animate-blob-landing' />
          <div className='absolute top-0 -right-20 w-80 h-80 bg-pink-400 mix-blend-screen blur-2xl opacity-30 rounded-full animate-blob-landing' />
          <div className='absolute top-40 -bottom-8 left-20 w-80 h-80 bg-[#F54C7A] mix-blend-burn blur-2xl opacity-30 rounded-full animate-blob-landing' />
        </div> */}

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
