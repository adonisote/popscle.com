import AccountForm from './account-form'
import { createClient } from '@/utils/supabase/server'
import { redirect } from "next/navigation";
import Nav from '@/components/ui/nav';


export default async function Account() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')

  }


  return (
    <div className='w-full h-full flex flex-col items-center'>
      <Nav />


      <AccountForm user={user} />


    </div>
  )
}