import { ResourceEditForm } from "./editResource"
import { createClient } from "@/utils/supabase/server"
import { redirect } from 'next/navigation'

export default async function Page({ params, searchParams }: { params: { slug: string }, searchParams: { resourceId: string } }) {
  const supabase = createClient()

  //Fetch space id and title
  const { data: space, error: spaceError } = await supabase
    .from('spaces')
    .select('id, title')
    .ilike('title', params.slug) //replace with .eq() when making sure that all titles are lowercae
    .single()

  if (spaceError) {
    console.log('Error fetching space:', spaceError)
    redirect('/home')
  }
  if (!space) {
    redirect('home')
  }

  //Fetch logged user id
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError) {
    console.log('Error fetching user:', userError)
    redirect('/login')
  }
  if (!user) {
    redirect('/login')
  }



  return (
    <div>
      <p>Edit contribution</p>
      <ResourceEditForm spaceId={space?.id} userId={user?.id} slug={params?.slug} resourceId={searchParams.resourceId} />

    </div>
  )

}