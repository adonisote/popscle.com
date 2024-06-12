import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function PrivatePage() {
  const supabase = createClient()

  const { data: { user }, error } = await supabase.auth.getUser()
  console.log(user)
  if (error || !user) {
    redirect('/login')
  }

  return (
    <div className=" w-full h-full flex flex-col items-center">
      <div className="w-full flex justify-between p-4">
        <p className="p-2 start">Hello, {user.email} </p>
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
        <p>React</p>

      </div>

    </div>
  )


}