import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export type Space = {
  title: string;
  description: string;
  id: '';
  created_at: '';
};

//Alternative: submit resource in a new page
function AddResourceButton({ slug }: { slug: string }) {
  return (
    <Button className='' asChild>
      <Link href={`/s/${slug}/submit`}>
        <Plus className='mr-2 h-4 w-4' />
        Add Resource
      </Link>
    </Button>
  );
}

export function SpaceHeader({ space, slug }: { space: Space; slug: string }) {
  return (
    <Card className='sm:w-full rounded-lg w-screen -m-4 sm:m-0 border-0 sm:border'>
      <CardHeader className='pb-3 pt-3 px-3'>
        <div className='bg-gradient-to-tr from-[#FF72E1] to-[#F54C7A] flex w-full h-12 rounded-md p-8 m-0' />
        <div className='flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center gap-2 sm:gap-0 py-8 px-3'>
          <div className='flex flex-col'>
            <CardTitle>{space.title}</CardTitle>
            <CardDescription className='max-w-lg text-balance leading-relaxed'>
              {space.description}
            </CardDescription>
          </div>
          {/* Submit resource in a new page */}
          <AddResourceButton slug={slug} />
        </div>
      </CardHeader>
    </Card>
  );
}
