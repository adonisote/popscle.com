import AccountForm from './account-form'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function Account() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className='w-full h-full flex flex-col items-center'>
      <div className="w-full flex justify-end p-8">
        <Link className='p-2 hover:underline hover:underline-offset-4' href="/private/react">Resources</Link>
        <Link className=" p-2 hover:underline hover:underline-offset-4" href={`/account`}>Profile</Link>

        <form action="/auth/signout" method="post">
          <Button type="submit">
            Sign out
          </Button>
        </form>
      </div>


      <AccountForm user={user} />


    </div>
  )
}