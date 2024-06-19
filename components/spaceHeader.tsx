import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ResourceSheet from '@/app/(community)/s/[slug]/submitResource';

export type Space = {
  title: string;
  description: string;
  id: '';
  created_at: '';
};

export function SpaceHeader({ space }: { space: Space }) {
  return (
    <Card className='sm:col-span-2 w-[850px] min-w-[650px] rounded-lg'>
      <CardHeader className='pb-3'>
        <div className='bg-gradient-to-tr from-[#FF72E1] to-[#F54C7A] w-full h-12 rounded-md relative' />
        <div className='flex justify-between items-center py-8'>
          <div className='flex flex-col'>
            <CardTitle>{space.title}</CardTitle>
            <CardDescription className='max-w-lg text-balance leading-relaxed'>
              {space.description}
            </CardDescription>
          </div>

          <ResourceSheet />

          {/* <Button className='self-start'>
            <Plus className='mr-2 h-4 w-4' />
            Add New Resource
          </Button> */}
        </div>
      </CardHeader>
    </Card>
  );
}
