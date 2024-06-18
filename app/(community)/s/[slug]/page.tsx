import { createClient } from "@/utils/supabase/server"
import Link from "next/link"
import { Resource } from "@/types/types"

import { redirect } from "next/navigation";


export default async function Page({
  params
}: {
  params: { slug: string };
}) {
  const supabase = createClient();

  const { data: spaces, error: spaceError } = await supabase
    .from("spaces")
    .select("id, title")
    .ilike("title", params.slug)
  const spaceId = spaces[0]?.id
  console.log('spaceId: ', spaceId)
  // If there is no space with the id redirect to /home
  if (!spaceId) {
    console.log('spaceError;:', spaceError)
    redirect('/home')
  }

  //Fetch resources matching the space_id
  const { data: resources, error: resourcesError } = await supabase
    .from('resources')
    .select()
    .eq("space_id", spaceId)

  if (!resources) {
    return <div>No resources available for the space</div>
    console.log(resourcesError)
  }

  return (
    <div className="flex flex-col items-center">
      <p>{params.slug}</p>

      <div>
        {resources?.map((resource: Resource) => (
          <div key={resource.id} className="m-4 flex border rounded-lg border-slate-200 hover:bg-primary/90 ">
            <div className="p-2 flex flex-col items-center justify-center">
              {resource.votes}
            </div>
            <Link
              href={resource.url}
            >
              <p>
                {resource.title}
              </p>
              <p>{resource.description}</p>
            </Link>
          </div>
        ))}
      </div>

    </div>


  )
}