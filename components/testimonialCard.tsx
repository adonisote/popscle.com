import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const person = {
  name: 'Malik Piara',
  role: 'Product Enablement @ CarByte',
};

export default function TestimonialCard({
  name = person.name,
  role = person.role,
  image = '/people/malik.jpeg',
}) {
  return (
    <>
      <div className='py-8 px-4 mx-auto w-96 max-w-screen-xl text-center animate-in'>
        <Card className='rounded-xl bg-slate-900 border-slate-800 shadow-2xl min-h-80'>
          <CardHeader className='flex items-center'>
            <div className='rounded-full'>
              <Image
                alt='Malik'
                src={image}
                width={150}
                height={150}
                className='rounded-full w-24 h-24'
              />
            </div>
          </CardHeader>
          <CardContent className='lg:min-h-20 space-y-2'>
            <h1 className='mb-2 text-xl font-medium tracking-tight leading-none text-white'>
              {name}
            </h1>
            <p className='mb-2 font-normal text-slate-400 lg:text-md sm:px-16 md:min-h-12'>
              {role}
            </p>
          </CardContent>
          <CardFooter>
            <Sheet>
              <SheetTrigger className='h-10 px-4 py-2 w-full bg-slate-800 hover:bg-pink-400 hover:text-white text-slate-500 rounded-md inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
                Join {name.split(' ')[0]}
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Join {name.split(' ')[0]}</SheetTitle>
                  <SheetDescription>
                    Popscle is invite-only. If you'd like to become one of our
                    first contributors, drop Malik a message.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
