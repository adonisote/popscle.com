const content = {
  title: 'The Best Resources for Learning Anything, Curated by the Internet.',
  subtitle:
    'There are more books and online courses out there than ever before. Popscle lets you discover, rank and curate them.',
};

export default function HeroHeader() {
  return (
    <>
      <div className='py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 animate-in'>
        <h1 className='mb-8 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl'>
          {content.title}
        </h1>
        <p className='mb-8 text-lg font-normal text-slate-400 lg:text-xl sm:px-16 xl:px-48'>
          {content.subtitle}
        </p>
        <div
          className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
          aria-hidden='true'
        >
          <div
            className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </>
  );
}
