import { createClient } from '@/utils/supabase/server';
import { Resource } from '@/types/types';
import { redirect } from 'next/navigation';
import Resources from './filteredResources';
import { SpaceHeader } from '@/components/spaceHeader';
import { Space } from '@/components/spaceHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SkeletonResourceCard } from '@/components/SkeletonResourceCard';

export default async function Page({ params }: { params: { slug: string } }) {
  const supabase = createClient();

  const { data: spaces, error: spaceError } = await supabase
    .from('spaces')
    .select('id, title, description')
    .ilike('title', params.slug);

  // If there is no space with the id redirect to /home
  if (!spaces || spaces.length === 0) {
    console.log('spaceError;:', spaceError);
    redirect('/home');
  }
  const spaceId = spaces[0]?.id;
  const spaceTitle = spaces[0]?.title;
  const spaceDescription = spaces[0]?.description;

  //Fetch resources matching the space_id
  const { data: resources, error: resourcesError } = await supabase
    .from('resources')
    .select()
    .eq('space_id', spaceId);

  if (!resources) {
    return <div>No resources available for the space</div>;
    console.log(resourcesError);
  }

  //separate free resources from paid// This should change later to not fetch the whole data from the database
  const paidResources = resources?.filter(
    (resource: Resource) => resource.paid
  );
  const freeResources = resources?.filter(
    (resource: Resource) => !resource.paid
  );

  const space: Space = {
    title: spaceTitle,
    description: spaceDescription,
    id: '',
    created_at: '',
  };
  return (
    <div className='flex flex-col items-center'>
      <SpaceHeader space={space} />

      <div className='w-[850px] p-4 border-b'>
        <Tabs defaultValue='all'>
          <TabsList>
            <TabsTrigger value='all'>All</TabsTrigger>
            <TabsTrigger value='free'>Free</TabsTrigger>
            <TabsTrigger value='paid'>Paid</TabsTrigger>
          </TabsList>
          <TabsContent value='all'>
            <Resources spaceId={spaceId} />
          </TabsContent>
          <TabsContent value='free'>
            <Resources spaceId={spaceId} />
          </TabsContent>
          <TabsContent value='paid'></TabsContent>
        </Tabs>
      </div>

      <div className='w-[850px] p-4 border-b'>
        <h2 className='pb-2 text-xl font-semibold tracking-tight first:mt-0 mb-2'>
          Online Courses
        </h2>
        <SkeletonResourceCard />
        <SkeletonResourceCard />
        <SkeletonResourceCard />
        <SkeletonResourceCard />
      </div>

      <div className='w-[850px] p-4 border-b'>
        <h2 className='pb-2 text-xl font-semibold tracking-tight first:mt-0 mb-2'>
          Books
        </h2>
        <SkeletonResourceCard />
        <SkeletonResourceCard />
        <SkeletonResourceCard />
        <SkeletonResourceCard />
      </div>
    </div>
  );
}
