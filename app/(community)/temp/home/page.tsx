import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { ChevronUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SpaceHeader } from '@/components/spaceHeader';
import { Space } from '@/components/spaceHeader';

export default async function PrivatePage() {
  const spaceTitle = 'Frontend';
  const spaceDescription =
    'For front end web developers who want to move the web forward.';

  const space: Space = {
    title: spaceTitle,
    description: spaceDescription,
    id: '',
    created_at: '',
  };

  const postData = [
    {
      name: 'MDN Web Docs',
      score: 87,
      author: 'Adonis',
      url: 'https://developer.mozilla.org/',
      isFree: true,
      upvotedBy: [],
    },
    {
      name: 'MDN Web Docs',
      score: 32,
      author: 'Malik',
      url: 'https://developer.mozilla.org/',
      isFree: true,
      upvotedBy: [],
    },
    {
      name: 'MDN Web Docs',
      score: 87,
      author: 'Adonis',
      url: 'https://developer.mozilla.org/',
      isFree: false,
      upvotedBy: [],
    },
    {
      name: 'React Reference Overview',
      score: 22,
      author: 'Adonis',
      url: 'https://react.dev/reference/react',
      isFree: true,
      upvotedBy: [],
    },
    {
      name: 'MDN Web Docs',
      score: 87,
      author: 'Adonis',
      url: 'https://developer.mozilla.org/',
      isFree: true,
      upvotedBy: [],
    },
  ];

  const supabase = createClient();
  // const { data: { user }, error } = await supabase.auth.getUser()
  const { data: spaces, error } = await supabase.from('spaces').select();

  if (error) {
    console.error('Error fetching spaces:', error);
  }
  if (spaces) {
    return (
      <>
        <div className='mt-5'>
          <SpaceHeader space={space} />
        </div>

        <div className='w-[850px] p-4 border-b'>
          <Tabs defaultValue='free'>
            <TabsList>
              <TabsTrigger value='free'>Free</TabsTrigger>
              <TabsTrigger value='paid'>Paid</TabsTrigger>
            </TabsList>
            <TabsContent value='free'>
              {postData
                .filter((item) => item.isFree)
                .map((item, i) => {
                  return (
                    <>
                      <Link href={item.url}>
                        <div
                          className='rounded-md px-2 py-3 flex space-x-4 hover:bg-muted transition-all delay-100 justify-between'
                          key={i}
                        >
                          <div className='flex'>
                            <div className='flex self-center text-sm'>
                              {i + 1}.
                            </div>
                            <div className='p-3 hover:text-green-500 hover:animate-ping'>
                              <ChevronUp />
                            </div>
                            <div className='flex flex-col'>
                              <p>
                                {item.name}{' '}
                                <span className='text-sm text-muted-foreground'>
                                  ({item.url.split('https://')})
                                </span>
                              </p>
                              <div className='flex space-x-1'>
                                <p className='text-muted-foreground text-sm'>
                                  {item.score} points
                                </p>
                                <p className='text-muted-foreground text-sm'>
                                  by{' '}
                                  <span className='hover:underline underline-offset-4'>
                                    {item.author}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className='justify-end mr-20'>
                            <AvatarStack />
                          </div>
                        </div>
                      </Link>
                    </>
                  );
                })}
            </TabsContent>
            <TabsContent value='paid'>
              {postData
                .filter((item) => !item.isFree)
                .map((item, i) => {
                  return (
                    <>
                      <Link href={item.url}>
                        <div
                          className='rounded-md px-2 py-3 flex space-x-4 hover:bg-muted transition-all delay-100'
                          key={i}
                        >
                          <div className='p-3 hover:text-green-500 hover:animate-ping'>
                            <ChevronUp />
                          </div>
                          <div className='flex flex-col'>
                            <p>{item.name}</p>
                            <div className='flex space-x-1'>
                              <p className='text-muted-foreground text-sm'>
                                {item.score} points
                              </p>
                              <p className='text-muted-foreground text-sm'>
                                by {item.author}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </>
                  );
                })}
            </TabsContent>
          </Tabs>
        </div>
      </>
    );
  }
}

export function AvatarStack() {
  const users = [
    {
      name: 'Adonis Almagro',
      initials: 'AA',
    },
    {
      name: 'Malik Piara',
      initials: 'MP',
    },
    {
      name: 'Erhan Evin',
      initials: 'EE',
    },
  ];

  return (
    <>
      <div className='flex -space-x-3 rtl:space-x-reverse'>
        {users.map((user, i) => {
          return (
            <Avatar className='border-2 border-background' key={i}>
              <AvatarImage src='#' />
              <AvatarFallback>{user.initials}</AvatarFallback>
            </Avatar>
          );
        })}
        <div className='flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-gray-800 rounded-full hover:bg-gray-600'>
          +22
        </div>
      </div>
    </>
  );
}
