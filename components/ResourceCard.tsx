'use client';
import { createClient } from '@/utils/supabase/client';
import { AvatarStack } from './AvatarStack';
import Link from 'next/link';
import { ChevronUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import UpvoteResource from '@/app/(community)/s/[slug]/upvote';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CalendarDays } from 'lucide-react';
import { useEffect, useState } from 'react';
import { UserProfilePreview } from './userProfilePreview';

interface ResourceCardProps {
  id: string;
  title: any;
  score: any;
  author: any;
  url: any;
  upvotedBy: any[]; //array on uuid
  votes: number;
  onUpvote: (resourceId: string) => void;
}
interface Voter {
  username: string;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  id,
  title,
  score,
  author,
  url,
  upvotedBy,
  votes,
  onUpvote,
}) => {
  const [voterUsernames, setVoterUsernames] = useState<Voter[]>([]);

  const supabase = createClient();

  useEffect(() => {
    const getUsernames = async () => {
      const { data: upvotedBy_usernames, error: fetchError } = await supabase
        .from('profiles')
        .select('username')
        .in('id', upvotedBy)
        .order('username', { ascending: true }); // TODO: Order users by reputation.

      console.log(upvotedBy_usernames);
      if (fetchError) {
        console.log('Fetching error:', fetchError);
      } else {
        setVoterUsernames(upvotedBy_usernames);
      }
    };
    getUsernames();
  }, [upvotedBy, supabase]);

  function getMainDomain(url: string) {
    try {
      // Create a new URL object
      const parsedUrl = new URL(url);
      // Return the hostname which is the main domain
      return parsedUrl.hostname;
    } catch (e) {
      // Handle any errors, such as invalid URL
      console.error('Invalid URL:', e);
      return null;
    }
  }
  const mainDomain = getMainDomain(url);

  // console.log(voterUsernames)
  return (
    <div className='flex items-center ease-in-out'>
      {/* The number 1 has to go */}
      {/* <div className='flex self-center text-sm'>{1}.</div> */}
      {/* <div className='p-3 hover:text-green-500 hover:animate-ping'>
        <ChevronUp />
      </div> */}
      <UpvoteResource resourceId={id} votes={votes} onUpvote={onUpvote} />
      <div className='w-fit flex flex-col md:w-full rounded-md'>
        <div className='rounded-md px-2 py-3 flex flex-col md:flex-row space-x-4 hover:bg-muted transition-all delay-100 justify-between'>
          <div className='flex'>
            <div className='flex flex-col'>
              <Link className='' href={url}>
                {title}{' '}
                <span className='text-sm text-muted-foreground'>
                  ({mainDomain})
                </span>
              </Link>
              <div className='flex space-x-1'>
                <p className='text-muted-foreground text-sm'>{score} points</p>
                <p className='text-muted-foreground text-sm'>
                  by{' '}
                  <span className='hover:underline underline-offset-4'>
                    <UserProfilePreview author={author} />
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className='justify-end mr-20'>
            <>
              <Sheet>
                <SheetTrigger>
                  <AvatarStack voterUsernames={voterUsernames} />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Recommended By</SheetTitle>
                    <SheetDescription>
                      {voterUsernames.map((user) => (
                        <div
                          key={user.username}
                          className='text-lg flex gap-4 items-center mb-2'
                        >
                          <Avatar
                            key={user.username}
                            className='border-2 border-background'
                          >
                            <AvatarImage
                              src='#'
                              alt={`Avatar of ${user.username}`}
                            />
                            <AvatarFallback>
                              {user.username[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          {user.username}
                        </div>
                      ))}
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};
