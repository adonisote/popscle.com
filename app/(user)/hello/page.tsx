import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"


export default async function Page() {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/login')
  }
  return (
    <div className=" w-full h-full flex flex-col items-center">
      <div className="w-full flex justify-end p-4">
        <div className="flex space-x-4">

          <Link className='p-2 hover:underline hover:underline-offset-4' href="/hello">Welcome</Link>
          <Link className='p-2 hover:underline hover:underline-offset-4' href="/private/react">Resources</Link>
          <Link className=" p-2 hover:underline hover:underline-offset-4" href={`/account`}>Profile</Link>

          <form action="/auth/signout" method="post">
            <Button type="submit">
              Sign out
            </Button>
          </form>
        </div>
      </div>


      <div className="w-full h-full flex flex-col items-center justify-center">
        <p>Hello, {user.email} </p>
      </div>

    </div>
  )

}