import { createClient } from "@/utils/supabase/server";
import Nav from "@/components/ui/nav";


export default async function PrivatePage() {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  return (
    <div className=" w-full h-full flex flex-col items-center">
      <Nav />


      <div className="w-full h-full flex flex-col items-center justify-center">
        <p>React</p>

      </div>
    </div>
  )


}