import Link from "next/link";
import { Button } from '@/components/ui/button'
import { createClient } from "@/utils/supabase/server";

export default async function Nav() {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  return (
    <div className="w-full flex justify-between p-4">
      <p className="p-2 start">Hello, {user ? `${user?.email}!` : 'stranger!'} </p>
      <div className="flex space-x-4">
        {user && (

          <Link className='p-2 hover:underline hover:underline-offset-4' href="/hello">Welcome</Link>

        )}

        <Link className='p-2 hover:underline hover:underline-offset-4' href="/spaces">Spaces</Link>
        {user && (
          <>
            <Link className=" p-2 hover:underline hover:underline-offset-4" href={`/account`}>Profile</Link>

            <form action="/auth/signout" method="post">
              <Button type="submit">
                Sign out
              </Button>
            </form>

          </>
        )}
      </div>
    </div>
  )
}