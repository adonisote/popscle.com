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
  providerAvatar: string;
}

export const UserProfilePreview: React.FC<UserProfilePreviewProps> = ({
  author,
  providerAvatar
}) => {
  console.log('Avatar URL:', providerAvatar);
  return (
    <HoverCard>
      <HoverCardTrigger>{author}</HoverCardTrigger>
      <HoverCardContent className='w-80'>
        <div className='flex justify-between space-x-4'>
          <Avatar>
            <AvatarImage src={providerAvatar} /> {/* TODO: Replace with user profile photo */}
            <AvatarFallback>{author[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className='space-y-1'>
            <h4 className='text-sm font-semibold'>{author}</h4>
            <p className='text-sm'>
              PM Student at CODE University. Or maybe Software Engineering 🤷‍♂️ ✨
              {/* TODO: Replace with user biography */}
            </p>
            <div className='flex items-center pt-2'>
              <CalendarDays className='mr-2 h-4 w-4 opacity-70' />{' '}
              <span className='text-xs text-muted-foreground'>
                Joined June 2024 {/* TODO: Replace with joinedDate */}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
