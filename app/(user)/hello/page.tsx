import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import Nav from "@/components/ui/nav"



export default async function Page() {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/login')
  }
  return (
    <div className=" w-full h-full flex flex-col items-center">
      <Nav />
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p>Hello, {user.email} </p>
      </div>

    </div>
  )

}