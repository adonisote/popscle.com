import { createClient } from "@/utils/supabase/server";

import Link from "next/link";

const spaces = ['React', 'NextJs', 'Automotive']

export default async function PrivatePage() {
  const supabase = createClient()
  // const { data: { user }, error } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('resources')
    .select()
  console.log(data)

  return (
    <div className=" w-full h-full flex flex-col items-center">


      <div className="w-full h-full flex flex-col items-center justify-center">
        <p className="text-xl">Spaces</p>
        {/* I need to create a table containing spaces that contain ressources */}

        <div>
          {spaces.map(space => (
            <div key={``} className="border rounded-lg m-4 border-slate-200">
              <Link href={`/s/${space.toLocaleLowerCase()}`} >
                <p className="text-center p-2">{space}</p>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
