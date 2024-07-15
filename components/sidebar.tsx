import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip';
import { HomeIcon, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function Sidebar() {
  return (
    <nav className='w-20 border-r h-screen bg-background sm:flex justify-center top-0 fixed hidden'>
      <div className='flex flex-col mt-2 justify-between'>
        <Link href={'/home'} className='hover:animate-pulse ml-2'>
          <Image
            className='-space-y-10'
            src={'/logo.svg'}
            alt='logo'
            width={50}
            height={50}
          />
        </Link>
        <div className='flex flex-col items-center gap-8 mb-20'>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <HomeIcon className='h-8 w-8' />
              </TooltipTrigger>
              <TooltipContent side='right' sideOffset={30}>
                <p>Home</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <MessageSquare className='h-8 w-8' />
              </TooltipTrigger>
              <TooltipContent side='right' sideOffset={30}>
                <p>Feedback</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div />
      </div>
    </nav>
  );
}
