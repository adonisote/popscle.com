'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';

import { createClient } from '@/utils/supabase/client';
import { Resource } from '@/types/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import UpvoteResource from './upvote';
import { SkeletonResourceCard } from '@/components/SkeletonResourceCard';
import { ResourceCard } from '@/components/ResourceCard';

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
      console.log(error);
    } else {
      setTypes(data);
    }
  }, [supabase]);
  console.log(types);

  const getData = useCallback(async () => {
    let query = supabase
      .from('resources')
      .select(`*, profiles (username)`).eq('space_id', spaceId);

    // let query = supabase.from('resources').select().eq('space_id', spaceId);

    if (filter === 'FREE') {
      query = query.eq('paid', false);
    } else if (filter === 'PAID') {
      query = query.eq('paid', true);
    }

    if (typeFilters.length > 0) {
      query = query.in('type_id', typeFilters);
    }

    const { data, error } = await query;
    if (error) {
      console.log('Error fetching resources:', error);
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

  const toogleTypeFilter = (typeId: number) => {
    setTypeFilters((prev) => {
      if (prev.includes(typeId)) {
        return prev.filter((id) => id != typeId);
      } else {
        return [...prev, typeId];
      }
    });
  };

  const handleUpvote = async (resourceId: string) => {
    const { error } = await supabase.rpc('increment_votes', { resource_id: resourceId });
    if (error) {
      console.log('Error updating vote', error);
    } else {
      setData((prevData) =>
        prevData.map((resource) =>
          resource.id === resourceId ? { ...resource, votes: resource.votes + 1 } : resource
        )
      );
    }
  };

  return (
    <div className='md:w-max-[800px] mx-4'>
      <div className='my-4 w-full flex flex-col  items-end '>
        <div>
          <Button
            variant='outline'
            onClick={() => setFilter('ALL')}
            className='mx-4'
          >
            All
          </Button>
          <Button
            variant='outline'
            onClick={() => setFilter('FREE')}
            className='mx-4'
          >
            Free
          </Button>
          <Button
            variant='outline'
            onClick={() => setFilter('PAID')}
            className='mx-4'
          >
            Paid
          </Button>
        </div>
      </div>
      <div>
        <div className=' flex justify-between'>
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
        </div>

        {isLoading && (
          <>
            <div className='w-[850px] p-4 border-b'>
              <SkeletonResourceCard />
              <SkeletonResourceCard />
              <SkeletonResourceCard />
              <SkeletonResourceCard />
            </div>
          </>
        )}

        {data?.map((resource: Resource) => (
          <>
            <ResourceCard
              key={resource.id}
              id={resource.id}
              name={resource.title}
              score={resource.votes}
              author={resource.profiles.username}
              url={resource.url}
              upvotedBy=''
              votes={resource.votes}
              onUpvote={handleUpvote}
            />



            {/* <div
              key={resource.id}
              className='my-4 flex border rounded-lg border-slate-200 hover:bg-primary/90 '
            >
              <div className='p-2 flex flex-col items-center justify-center'>
                <UpvoteResource resourceId={resource.id} />
              </div>
              <Link href={resource.url}>
                <p>{resource.title}</p>
                <p>{resource.description}</p>
              </Link>
              <p>{resource.type_id}</p>
            </div> */}
          </>
        ))}
      </div>
    </div>
  );
}
