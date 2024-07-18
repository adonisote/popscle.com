'use client';

import { useEffect, useState, useCallback } from 'react';

import { createClient } from '@/utils/supabase/client';
import { Resource } from '@/types/types';
import { SkeletonResourceCard } from '@/components/SkeletonResourceCard';
import { ResourceCard } from '@/components/ResourceCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Book,
  ComputerIcon,
  Video,
  LaptopIcon,
  FileTextIcon,
  Podcast,
} from 'lucide-react';

export default function Resources({ spaceId }: { spaceId: string }) {
  const [data, setData] = useState<Resource[]>([]);
  const [filter, setFilter] = useState('ALL');
  const [typeFilters, setTypeFilters] = useState<number[]>([]);
  const [types, setTypes] = useState<{ id: number; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Adding a loading state.

  const supabase = createClient();
  const getTypes = useCallback(async () => {
    const { data, error } = await supabase.from('types').select();
    if (error) {
      // console.log(error);
    } else {
      setTypes(data);
    }
  }, [supabase]);
  // console.log(types);

  const getData = useCallback(async () => {
    let query = supabase
      .from('resources')
      .select(`*, profiles (username)`)
      .eq('space_id', spaceId)
      .order('votes', { ascending: false }); // TODO: Order users by reputation.

    // let query = supabase.from('resources').select().eq('space_id', spaceId);

    if (filter === 'FREE') {
      query = query.eq('isPaid', false);
    } else if (filter === 'PAID') {
      query = query.eq('isPaid', true);
    }

    if (typeFilters.length > 0) {
      query = query.in('type_id', typeFilters);
    }

    const { data, error } = await query;
    if (error) {
      // console.log('Error fetching resources:', error);
    } else {
      setData(data);
    }
  }, [spaceId, supabase, filter, typeFilters]);

  useEffect(() => {
    setIsLoading(true);
    getData();
    getTypes();
  }, [getData, getTypes]);

  // This updates the loading state when the data fetching is complete.
  // There might be more efficient ways of implementing data fetching that work asynchronously and use Suspense.
  useEffect(() => {
    if (data && types) {
      setIsLoading(false);
    }
  }, [data, types]);

  const toggleTypeFilter = (typeId: number) => {
    setTypeFilters((prev) =>
      prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleUpvote = async (resourceId: string) => {
    const {
      data: { user },
      error: errorUSer,
    } = await supabase.auth.getUser();

    if (errorUSer) {
      // console.log('Error fetching user');
      return;
    }

    const userId = user?.id;
    // Fetch the current upvoted_by array
    let { data: resource, error: fetchError } = await supabase
      .from('resources')
      .select('user_id, upvoted_by, votes')
      .eq('id', resourceId)
      .single();

    if (fetchError) {
      // console.log('Error fetching upvoted_by array:', fetchError);
      return;
    }
    // User who submited should not be able to upvote
    if (resource && userId === resource.user_id) {
      console.log('User who submited should not be able to upvote');
      return;
    }
    const upvotedBy = resource?.upvoted_by ?? [];
    //console.log('Resource: ', resource);
    //console.log('Array resource:', upvotedBy);

    let updateUpvotedBy = upvotedBy;

    if (upvotedBy.includes(userId)) {
      // console.log('Devoting......');
      updateUpvotedBy = updateUpvotedBy.filter(
        (voter: string) => voter !== userId
      );
      const { error: updateError } = await supabase
        .from('resources')
        .update({ upvoted_by: updateUpvotedBy, votes: resource?.votes - 1 })
        .eq('id', resourceId);

      if (updateError) {
        console.log('Error updating: Devoting.........:', updateError);
        return;
      } else {
        setData((prevData) =>
          prevData.map((resource) =>
            resource.id === resourceId
              ? {
                ...resource,
                votes: resource.votes - 1,
                upvoted_by: updateUpvotedBy,
              }
              : resource
          )
        );
      }
      // return
    } else {
      updateUpvotedBy = [...upvotedBy, userId];
      // console.log('New entry in voters');
      // Update the resource with the new upvoted_by array
      const { error: updateError } = await supabase
        .from('resources')
        .update({ upvoted_by: updateUpvotedBy, votes: resource?.votes + 1 })
        .eq('id', resourceId);

      if (updateError) {
        // console.log('Error updating upvoted_by array:', updateError);
        return;
      } else {
        setData((prevData) =>
          prevData.map((resource) =>
            resource.id === resourceId
              ? {
                ...resource,
                votes: resource.votes + 1,
                upvoted_by: updateUpvotedBy,
              }
              : resource
          )
        );
      }
    }

    // const { error } = await supabase.rpc('increment_votes', {
    //   resource_id: resourceId,
    // });

    // if (error) {
    //   console.log('Error updating vote', error);
    // } else {
    //   setData((prevData) =>
    //     prevData.map((resource) =>
    //       resource.id === resourceId
    //         ? { ...resource, votes: resource.votes + 1 }
    //         : resource
    //     )
    //   );
    // }
  };

  const handleTabChange = (newValue: string) => {
    console.log('Active tab changed to:', newValue);
    setFilter(newValue);
  };

  // console.log(data);

  const groupedResources = types.map((type) => {
    return {
      type: type.name,
      resources: data.filter((resource) => resource.type_id === type.id),
    };
  });

  const capitalizeFirstLetter = (str: string): string => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <div className='md:w-max-[800px] '>
      <div className='w-[850px] py-4'>
        <Tabs defaultValue='ALL' onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value='ALL'>All</TabsTrigger>
            <TabsTrigger value='FREE'>Free</TabsTrigger>
            <TabsTrigger value='PAID'>Paid</TabsTrigger>
          </TabsList>
          <TabsContent value='ALL'>
            {/* <Resources spaceId={spaceId} /> */}
          </TabsContent>
          <TabsContent value='FREE'>
            {/* <Resources spaceId={spaceId} /> */}
          </TabsContent>
          <TabsContent value='PAID'>
            {/* <Resources spaceId={spaceId} /> */}
          </TabsContent>
        </Tabs>
      </div>
      <div>
        {/* Filtering by type */}
        {/* <div className=' flex justify-between'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setTypeFilters([])}
          >
            {' '}
            All types
          </Button>
          {types?.map((type) => (
            <Button
              key={type.id}
              variant='outline'
              size='sm'
              onClick={() => toogleTypeFilter(type.id)}
              className={clsx({
                'bg-accent text-accent-foreground': typeFilters.includes(
                  type.id
                ),
              })}
            >
              {type.name}
            </Button>
          ))}
        </div> */}

        {isLoading ? (
          <>
            {types.map((type) => (
              <div key={type.id} className='w-[850px] py-4 border-b'>
                <p className='pb-2 text-xl font-semibold tracking-tight first:mt-0 mb-2'>
                  {capitalizeFirstLetter(type.name)}
                </p>
                <SkeletonResourceCard />
                <SkeletonResourceCard />
                <SkeletonResourceCard />
                <SkeletonResourceCard />
              </div>
            ))}
          </>
        ) : (
          // group.resources.length > 0 &&
          groupedResources
            .filter((group) => group.resources.length > 0)
            .map((group) => (
              <div key={group.type} className='w-[850px] py-4 border-b'>
                <div className='flex items-center gap-4 mb-4'>
                  <div className='bg-muted rounded-md flex items-center justify-center w-10 h-10'>
                    {iconMap[group.type] || (
                      <ComputerIcon className='h-6 w-6' />
                    )}
                  </div>
                  <h2 className='text-xl font-semibold tracking-tight first:mt-0'>
                    {capitalizeFirstLetter(group.type) +
                      (group.type === 'interactive content' ? '' : 's')}
                  </h2>
                </div>
                {group.resources.map((resource) => (
                  <>
                    <ResourceCard
                      key={resource.id}
                      id={resource.id}
                      title={resource.title}
                      score={resource.votes}
                      author={resource.profiles.username}
                      url={resource.url}
                      upvotedBy={resource.upvoted_by}
                      votes={resource.votes}
                      onUpvote={handleUpvote}
                    />
                  </>
                ))}
              </div>
            ))
        )}
      </div>
    </div>
  );
}

const iconMap: any = {
  book: <Book className='h-6 w-6' />,
  video: <Video className='h-6 w-6' />,
  article: <FileTextIcon className='h-6 w-6' />,
  'practical project': <LaptopIcon className='h-6 w-6' />,
  podcast: <Podcast className='h-6 w-6' />,
  'online course': <LaptopIcon className='h-6 w-6' />,
};
