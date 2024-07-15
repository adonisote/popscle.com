'use client';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

interface UpvoteResourceProps {
  resourceId: string;
  votes: number;
  onUpvote: (resourceId: string) => void;
  userIsAuthor: boolean;
  isUpvoted: boolean;
}

export default function UpvoteResource({
  resourceId,
  votes,
  onUpvote,
  userIsAuthor,
  isUpvoted,
}: UpvoteResourceProps) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 300); // Reset clicked state after 200ms
  };

  return (
    <div className='flex flex-col items-center'>
      {/* Not the same effect with a div. Needs to be fixed */}
      <button
        className={
          userIsAuthor // If the user is the author, disable the cursor.
            ? `p-3 cursor-not-allowed opacity-10`
            : `p-3 hover:text-green-500 transition-all ${
                isUpvoted && 'text-green-500'
              } ${clicked && 'animate-ping'}`
        }
        onClick={() => {
          onUpvote(resourceId);
          handleClick();
        }}
      >
        <ArrowUp />
      </button>
    </div>
  );
}
