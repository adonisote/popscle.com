import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserProfilePreview } from './userProfilePreview';

import { createClient } from '@/utils/supabase/client';

const supabase = createClient();




interface AvatarStackProps {
  //Problem because not acception url
  voters: { full_name: string, avatar_url: string }[]; // Define the structure of the voterUsernames data
}


export function AvatarStack({ voters }: AvatarStackProps) {
  return (
    <>
      <div className='flex -space-x-3 rtl:space-x-reverse'>
        {voters?.slice(0, 2).map((voter) => (
          <Avatar key={voter?.full_name} className='border-2 border-background'>
            <AvatarImage src={voter?.avatar_url} alt={`Avatar of ${voter?.full_name}`} />
            <AvatarFallback>{voter?.full_name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        ))}
        {voters?.length > 2 && ( // Conditionally render the "+n" when there are more than 2 voters
          <div className='flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-gray-800 rounded-full hover:bg-gray-600'>
            +{voters.length - 2}
          </div>
        )}
      </div>
    </>
  );
}
