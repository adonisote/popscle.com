import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserProfilePreview } from './userProfilePreview';

interface AvatarStackProps {
  voterUsernames: { username: string }[]; // Define the structure of the voterUsernames data
}

export function AvatarStack({ voterUsernames }: AvatarStackProps) {
  return (
    <>
      <div className='flex -space-x-3 rtl:space-x-reverse'>
        {voterUsernames?.slice(0, 2).map((voter) => (
          <Avatar key={voter?.username} className='border-2 border-background'>
            <AvatarImage src='#' alt={`Avatar of ${voter?.username}`} />
            <AvatarFallback>{voter?.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        ))}
        {voterUsernames?.length > 2 && ( // Conditionally render the "+n" when there are more than 2 voters
          <div className='flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-gray-800 rounded-full hover:bg-gray-600'>
            +{voterUsernames.length - 2}
          </div>
        )}
      </div>
    </>
  );
}
