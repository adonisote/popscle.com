import { createClient } from '@/utils/supabase/server';
import SpaceNotFound from './spaceNotFound';
import { redirect } from 'next/navigation';
import { ResourceForm } from './submitResourceForm';

export default async function Page({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: spaces, error: spaceError } = await supabase
    .from('spaces')
    .select('id, title, description, created_at')
    .ilike('title', params.slug); //replace with .eq() when making sure that all titles are lowercae

  // If there is no space with the id redirect to /home
  if (spaceError) {
    console.log('Error fetching space:', spaceError);
    redirect('/home');
  }
  if (!spaces || spaces.length === 0) {
    // return <SpaceNotFound />  //Use to redirect to home within 3 seconds
    redirect('/home');
  }

  //Get user id
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log('Error fetching user:', userError); // Improved error logging
    redirect('/login');
  }
  if (!user) {
    redirect('/login');
  }

  const spaceId = spaces[0]?.id;
  const spaceTitle = spaces[0]?.title;
  const userId = user?.id;

  // Function to convert a string to title case
  function toTitleCase(str: string): string {
    return str
      .toLowerCase() // Convert the entire string to lowercase
      .split(/[\s\-]+/) // Split the string by spaces or hyphens
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(' '); // Join the words back together with a space
  }

  return (
    <div className='space-y-5 md:w-[650px] m-auto'>
      <h1 className='text-2xl font-semibold leading-none tracking-tight'>
        Submit new resource for {toTitleCase(spaceTitle)}
      </h1>
      <ResourceForm spaceId={spaceId} userId={userId} slug={params.slug} />
    </div>
  );
}
