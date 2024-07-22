import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { string } from 'zod';

export default async function Nav() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const { data: avatar, error: fetchError } = await supabase
    .from('profiles')
    .select('avatar_url')
    .eq('id', user?.id)
    .single();

  let signedAvatarUrl = '';
  if (avatar) {
    const { data, error } = await supabase
      .storage
      .from('avatars')
      .createSignedUrl(avatar?.avatar_url, 3600)
    if (error) {
    } else if (data) {
      signedAvatarUrl = data.signedUrl;
    }
  }


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

      <div className='flex'>
        {user && (
          <>
            <DropdownMenu>
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <DropdownMenuTrigger asChild>
                      <Avatar className='border-2 border-background'>
                        <AvatarImage src={signedAvatarUrl} />
                        <AvatarFallback>
                          {user?.email?.[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent
                    side='left'
                    sideOffset={30}
                    className='text-sm'
                  >
                    <p>Account</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DropdownMenuContent align='end' className='w-48'>
                <DropdownMenuItem className='text-muted-foreground'>
                  <Link className='w-full' href={`/account`}>
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <form action='/auth/signout' method='post'>
                    <Button
                      variant={'ghost'}
                      className='p-0 m-0 text-muted-foreground'
                      type='submit'
                    >
                      Sign out
                    </Button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </div>
  );
}
