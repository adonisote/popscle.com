import { createClient } from "@/utils/supabase/server"
import Link from "next/link"
import { Resource } from "@/types/types"

export default async function Page({ params }: { params: { slug: string } }) {
  const supabase = createClient()

  const { data: resources, error } = await supabase
    .from('resources')
    .select()
  // need to find a way to select only the resources from the respective space
  console.log(resources)
  if (error) {
    console.error('Error fetching spaces:', error);
  }

  return (
    <div className="flex flex-col items-center">
      <p>{params.slug}</p>

      <div>
        {resources.map((resource: Resource) => (
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