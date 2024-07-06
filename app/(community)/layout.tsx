import MobileNav from '@/components/mobileNavigation';
import FeedbackSheet from '@/components/ui/feedback';
import Nav from '@/components/ui/nav';
import Link from 'next/link';
import Image from 'next/image';
import { HomeIcon, MessageSquare } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Nav />
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
        <main className='min-h-screen mx-4 flex flex-col flex-1 gap-4 md:gap-8 md:p-4 md:mb-8'>
          {children}
          <FeedbackSheet />
        </main>
        <MobileNav />
      </body>
    </html>
  );
}
