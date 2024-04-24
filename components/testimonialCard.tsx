import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import Image from 'next/image';

const person = {
  name: 'Malik Piara',
  role: 'Product Enablement',
};

export default function TestimonialCard() {
  return (
    <>
      <div className='py-8 px-4 mx-auto max-w-screen-xl text-center animate-in'>
        <Card>
          <CardHeader className='flex items-center'>
            <div className='rounded-full'>
              <Image
                alt='Malik'
                src='/people/malik.jpeg'
                width={150}
                height={150}
                className='rounded-full w-24 h-24'
              />
            </div>
          </CardHeader>
          <CardContent>
            <h1 className='mb-2 text-xl font-medium tracking-tight leading-none text-gray-900 dark:text-white'>
              {person.name}
            </h1>
            <p className='mb-2 font-normal text-gray-500 lg:text-md sm:px-16 dark:text-gray-400'>
              {person.role}
            </p>
          </CardContent>
          <CardFooter className='flex items-center'>
            <Button variant='secondary' className='w-full'>
              Join {person.name.split(' ')[0]}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
