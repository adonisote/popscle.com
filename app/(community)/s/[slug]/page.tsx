import { createClient } from "@/utils/supabase/server"
import Link from "next/link"
import { Resource } from "@/types/types"
import { redirect } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import Resources from "./filteredResources";

export default async function Page({
  params
}: {
  params: { slug: string };
}) {
  const supabase = createClient();

  const { data: spaces, error: spaceError } = await supabase
    .from("spaces")
    .select("id, title, description")
    .ilike("title", params.slug)
  // If there is no space with the id redirect to /home
  if (!spaces || spaces.length === 0) {
    console.log('spaceError;:', spaceError)
    redirect('/home')
  }
  const spaceId = spaces[0]?.id
  const spaceTitle = spaces[0]?.title
  const spaceDescription = spaces[0]?.description
  console.log('spaceId: ', spaceId)


  //Fetch resources matching the space_id
  const { data: resources, error: resourcesError } = await supabase
    .from('resources')
    .select()
    .eq("space_id", spaceId)

  if (!resources) {
    return <div>No resources available for the space</div>
    console.log(resourcesError)
  }

  //separate free resources from paid// This should change later to not fetch the whole data from the database
  const paidResources = resources?.filter((resource: Resource) => resource.paid)
  const freeResources = resources?.filter((resource: Resource) => !resource.paid)
  return (


    <div className="flex flex-col items-center">
      <div className="text-center">
        <p className="text-xl">{spaceTitle}</p>
        <p>{spaceDescription}</p>
      </div>

      <Resources spaceId={spaceId} />
    </div>


  )
}