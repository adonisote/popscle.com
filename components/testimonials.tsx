const content = {
  title: 'The Best Resources for Learning Anything, Curated by the Internet.',
  subtitle:
    'There are more books and online courses out there than ever before. Popscle lets you discover, rank and curate them.',
};

export default function Testimonials() {
  return (
    <>
      <div className='py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 animate-in'>
        <h1 className='mb-8 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
          {content.title}
        </h1>
        <p className='mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400'>
          {content.subtitle}
        </p>
      </div>
    </>
  );
}
