import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Space } from '@/types/types';
import { Popsicle, Ellipsis, ChevronUp, Plus } from 'lucide-react';

const spaceData = [
  {
    name: 'Frontend',
    description:
      'For front end web developers who want to move the web forward.',
    slug: 'frontend',
  },
  {
    name: 'Backend',
    description: 'For back-end programming learning resources.',
    slug: 'backend',
  },
  {
    name: 'Mobile Development',
    description:
      'For anything related with mobile development. Apple, Google or else.',
    slug: 'mobile',
  },
];

export default async function PrivatePage() {
  const supabase = createClient();
  // const { data: { user }, error } = await supabase.auth.getUser()
  const { data: spaces, error } = await supabase.from('spaces').select();

  if (error) {
    console.error('Error fetching spaces:', error);
  }
  if (!spaces) {
    return <div>No space available at the moment</div>;
  }

  return (
    /*  <div className=' w-full h-full flex flex-col items-center'>
      <div className='w-full h-full flex flex-col items-center justify-center'>
        <p className='text-xl'>Spaces</p>

        <div className='w-full md:max-w-[800px]'>
          {spaces?.map((space: Space) => (
            <div
              key={space.id}
              className='flex flex-col border rounded-lg m-4 border-slate-200 hover:bg-primary/90'
            >
              <Link
                href={`/s/${space.title.toLocaleLowerCase()}`}
                className=' w-full flex items-center h-[100px] mx-4 '
              >
                <div className='flex-grow'>
                  <p className='text-center p-2'>{space.title}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div> */
    <div className='w-[650px] p-4 border-b'>
      <h1 className='pb-2 text-xl font-semibold tracking-tight first:mt-0 mb-2'>
        Your Spaces
      </h1>

      <div className='flex flex-col gap-2'>
        {spaceData.map((item, i) => {
          return (
            <Link href={item.slug} key={i}>
              <div className='rounded-md px-2 py-3 flex items-center space-x-4 hover:bg-muted transition-all delay-100'>
                <div className='bg-red-500 p-3 rounded-xl'>
                  <Popsicle />
                </div>
                <div className='flex-1 space-y-1'>
                  <p className='text-sm font-medium leading-none'>
                    {item.name}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {item.description}
                  </p>
                </div>
                <Ellipsis className='text-muted-foreground' />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
