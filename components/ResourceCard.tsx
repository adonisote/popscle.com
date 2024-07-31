'use client';
import { createClient } from '@/utils/supabase/client';
import { AvatarStack } from './AvatarStack';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import UpvoteResource from '@/app/(community)/s/[slug]/upvote';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import { Pencil } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { useToast } from '@/components/ui/use-toast';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useEffect, useState } from 'react';
import { UserProfilePreview } from './userProfilePreview';

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ResourceForm } from '@/app/(community)/s/[slug]/submit/submitResourceForm';


interface ResourceCardProps {
  id: string;
  title: any;
  score: any;
  author: any;
  providerAvatar: string;
  url: any;
  upvotedBy: any[]; //array on uuid
  votes: number;
  onUpvote: (resourceId: string) => void;
  contributorId: string;
  userId: string;
  refreshData: () => void;
}
// interface Voter {
//   username: string;
// }

interface Voters {
  full_name: string;
  avatar_url: string;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  id,
  title,
  score,
  author,
  providerAvatar,//change to contributor -> Contributor: Person who submitted the resource
  url,
  upvotedBy,
  votes,
  onUpvote,
  contributorId,
  userId,
  refreshData,
}) => {
  const [voters, setVoters] = useState<Voters[]>([]);
  const [userIsAuthor, setUserIsAuthor] = useState(true); // If the user is the author, render a different button.
  const [logedUser, setLogedUser] = useState('')

  const supabase = createClient();

  useEffect(() => {
    const getUsernames = async () => {
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .in('id', upvotedBy)
      // .order('username', { ascending: true }); // TODO: Order users by reputation.

      // console.log('Upvoted by:', data);

      if (fetchError) {
        // console.log('Fetching error:', fetchError);
      } else {

        //Fetch signed Urls for voters with avatar_url
        const votersWithUrls = await Promise.all(
          data.map(async (voter) => {
            if (voter.avatar_url) {
              const { data: urlData } = await supabase.storage
                .from('avatars')
                .createSignedUrl(voter.avatar_url, 3600)
              return {
                ...voter, avatar_url: urlData?.signedUrl || ''
              }
            }
            return voter
          })
        )
        setVoters(votersWithUrls);

        // setVoterUsernames(upvotedBy_usernames);
      }
    };

    getUsernames();
  }, [upvotedBy, supabase]);


  function getMainDomain(url: string) {
    try {
      // Create a new URL object
      const parsedUrl = new URL(url);
      // Return the hostname which is the main domain
      return parsedUrl.hostname;
    } catch (e) {
      // Handle any errors, such as invalid URL
      // console.error('Invalid URL:', e);
      return null;
    }
  }
  const mainDomain = getMainDomain(url);

  //Function to delete a Resource, passed as props to Options component
  const { toast } = useToast()

  const deleteResource = async (resource_id: string) => {
    const { error } = await supabase
      .from('resources')
      .delete()
      .eq('id', resource_id)
    if (error) {
      console.log(error)
    } else {
      // alert('delet success')
      refreshData()//Call the refreshData function to update the UI
      toast({
        // title: "Resource Deleted",
        description: "Your contribution has been deleted",
      })
    }
  }

  return (
    <div className='flex items-center ease-in-out'>
      {/* The number 1 has to go */}
      {/* <div className='flex self-center text-sm'>{1}.</div> */}
      {/* <div className='p-3 hover:text-green-500 hover:animate-ping'>
        <ChevronUp />
        </div> */}
      <UpvoteResource
        resourceId={id}
        votes={votes}
        userIsAuthor={author == 'malik' ? userIsAuthor : !userIsAuthor} // TODO: Replace string with user. I would check user ids instead of usernames.
        isUpvoted={false} // TODO: Check if user upvoted the resource.
        onUpvote={onUpvote}
      />
      <div className='w-fit flex flex-col md:w-full rounded-md'>
        <div className='rounded-md px-2 py-3 flex flex-col md:flex-row space-x-4 hover:bg-muted transition-all delay-100 justify-between'>
          <div className='flex'>
            <div className='flex flex-col'>
              <Link className='' href={url}>
                {title}{' '}
                <span className='text-sm text-muted-foreground'>
                  ({mainDomain})
                </span>
              </Link>
              <div className='flex space-x-1'>
                <p className='text-muted-foreground text-sm'>{score} points</p>
                <p className='text-muted-foreground text-sm'>
                  by{' '}
                  <span className='hover:underline underline-offset-4'>
                    <UserProfilePreview author={author} providerAvatar={providerAvatar} />
                  </span>
                </p>
              </div>

              {/* Make them render only you are the one who created the resource */}
              <Options
                userId={userId}
                contributorId={contributorId}
                resourceId={id}
                deleteResource={deleteResource}
              />


            </div>
          </div>
          <div className='justify-end mr-20'>
            <>
              <Sheet>
                <SheetTrigger>
                  <AvatarStack voters={voters} />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Recommended By</SheetTitle>
                    <SheetDescription>
                      {voters.map((user) => (
                        <div
                          key={user.full_name}
                          className='text-lg flex gap-4 items-center mb-2'
                        >
                          <Avatar
                            key={user.full_name}
                            className='border-2 border-background'
                          >
                            <AvatarImage
                              src={user.avatar_url}
                              alt={`Avatar of ${user.full_name}`}
                            />
                            <AvatarFallback>
                              {user.full_name[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          {user.full_name}
                        </div>
                      ))}
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};


function Options(
  {
    userId,
    contributorId,
    resourceId,
    deleteResource,
  }: {
    userId: string;
    contributorId: string;
    resourceId: string;
    deleteResource: (resource_id: string) => void;
  }) {



  if (userId === contributorId) {

    return (

      <div>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant='outline' size='icon' className='hover:border hover:border-slate-200'>
              <Trash2 className='h-4 w-4' />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Wait a sec!</AlertDialogTitle>
              <AlertDialogDescription>
                Your contribution adds so much value! Deleting it would be a big loss. Are you sure?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  deleteResource(resourceId)
                }}
              >
                {/* <Button variant='destructive' > */}
                Yes, delete
                {/* </Button> */}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {/* Edit is being implemented */}
        <EditResourceButton slug='frontend' resourceId={resourceId} />

        {/* <Dialog >
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent >
            <DialogHeader>
              <DialogTitle>Update contribution</DialogTitle>
              <DialogDescription>
                The community will appreciate your updates
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={(e) => { e.preventDefault(); const formData = new FormData(e.target as HTMLFormElement); resourceUpdate(resourceId, formData) }}>
              Here will be the form prefilled
              <label htmlFor="test">test</label>
              <input type="text" id='test' />

              <DialogFooter >
                <DialogClose asChild>
                  <Button type='button' variant='secondary'>
                    Close
                  </Button>
                </DialogClose>
                <Button type='submit'>Update</Button>
                {/* <Button onClick={() => console.log("form submited")} >
                Submit
                </Button> 

              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog> */}



      </div>

    )
  }
}

function EditResourceButton({ slug, resourceId }: { slug: string, resourceId: string }) {
  console.log('slug', slug)

  return (
    <Button variant='outline' size='icon' className='hover:border hover:border-slate-200'>
      <Link href={`/s/${slug}/edit?resourceId=${resourceId}`}>
        <Pencil className='h-4 w-4' />
      </Link>

    </Button>

  )

} 