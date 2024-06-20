import { AvatarStack } from './AvatarStack';
import Link from 'next/link';
import { ChevronUp } from 'lucide-react';
import UpvoteResource from '@/app/(community)/s/[slug]/upvote';

interface ResourceCardProps {
  id: string;
  name: any;
  score: any;
  author: any;
  url: any;
  upvotedBy: any;
  votes: number;
  onUpvote: (resourceId: string) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  id,
  name,
  score,
  author,
  url,
  upvotedBy,
  votes,
  onUpvote,
}) => {
  return (
    <div className='flex items-center ease-in-out'>
      {/* The number 1 has to go */}
      {/* <div className='flex self-center text-sm'>{1}.</div> */}
      {/* <div className='p-3 hover:text-green-500 hover:animate-ping'>
        <ChevronUp />
      </div> */}
      <UpvoteResource resourceId={id} votes={votes} onUpvote={onUpvote} />
      <Link className='w-full' href={url}>
        <div className='rounded-md px-2 py-3 flex space-x-4 hover:bg-muted transition-all delay-100 justify-between'>
          <div className='flex'>
            <div className='flex flex-col'>
              <p>
                {name}{' '}
                <span className='text-sm text-muted-foreground'>
                  ({url.split('https://')})
                </span>
              </p>
              <div className='flex space-x-1'>
                <p className='text-muted-foreground text-sm'>{score} points</p>
                <p className='text-muted-foreground text-sm'>
                  by{' '}
                  <span className='hover:underline underline-offset-4'>
                    {author}
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
    </div>
  );
};
