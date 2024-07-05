// components/UserProfilePreview.tsx
'use client';

import { CalendarDays } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

interface UserProfilePreviewProps {
  author: string;
}

export const UserProfilePreview: React.FC<UserProfilePreviewProps> = ({
  author,
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger>{author}</HoverCardTrigger>
      <HoverCardContent className='w-80'>
        <div className='flex justify-between space-x-4'>
          <Avatar>
            <AvatarImage src='' />
            <AvatarFallback>{author[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className='space-y-1'>
            <h4 className='text-sm font-semibold'>{author}</h4>
            <p className='text-sm'>
              PM Student at CODE University. Or maybe Software Engineering 🤷‍♂️ ✨
            </p>
            <div className='flex items-center pt-2'>
              <CalendarDays className='mr-2 h-4 w-4 opacity-70' />{' '}
              <span className='text-xs text-muted-foreground'>
                Joined June 2024
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
