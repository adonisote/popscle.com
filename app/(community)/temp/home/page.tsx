import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Space } from '@/types/types';
import { Popsicle, Ellipsis, ChevronUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default async function PrivatePage() {
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
  if (!spaces) {
    return (
      <>
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

        <div className='mt-5'>
          <SpaceInfoCard />
        </div>

        <div className='w-[650px] p-4 border-b'>
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

export function SpaceInfoCard() {
  return (
    <Card className='sm:col-span-2 w-[650px] rounded-lg'>
      <CardHeader className='pb-3'>
        <CardTitle>Frontend</CardTitle>
        <CardDescription className='max-w-lg text-balance leading-relaxed'>
          For front end web developers who want to move the web forward.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>Add A New Resource</Button>
      </CardFooter>
    </Card>
  );
}
