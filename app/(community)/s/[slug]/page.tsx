import { createClient } from "@/utils/supabase/server"
import Link from "next/link"
import { Resource } from "@/types/types"

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
  const spaceId = spaces[0].id
  console.log('spaceId: ', spaceId)
  if (spaceError) {
    console.log(spaceError)
    return <div>Space couldn&#39;t be found</div>
  }
  const { data: resources, error: resourcesError } = await supabase
    .from('resources')
    .select()
    .eq("space_id", spaceId)
  // need to find a way to select only the resources from the respective space
  // console.log(resources)
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