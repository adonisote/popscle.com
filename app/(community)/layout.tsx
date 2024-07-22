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

        <main className='mx-4 flex flex-col flex-1 gap-4 md:gap-8 md:p-4 md:mb-8'>
          {children}
          <FeedbackSheet />
        </main>
        <MobileNav />
      </body>
    </html>
  );
}
