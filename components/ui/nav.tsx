import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import { Popsicle } from 'lucide-react';
import logo from '@/logo.svg';
import Image from 'next/image';

export default async function Nav() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <div className='w-full flex justify-between p-4'>
      <div className='flex'>
        <Link href={'/home'} className='hover:animate-pulse'>
          <Image
            className='-space-y-10'
            src={'/logo.svg'}
            alt='logo'
            width={50}
            height={50}
          />
        </Link>
      </div>

      <div className='flex space-x-4'>
        <div className='flex'>
          <Link
            className='p-2 hover:underline hover:underline-offset-4'
            href='/home'
          >
            Spaces
          </Link>
          {user && (
            <>
              <Link
                className=' p-2 hover:underline hover:underline-offset-4'
                href={`/account`}
              >
                Profile
              </Link>

              <form action='/auth/signout' method='post'>
                <Button type='submit'>Sign out</Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
