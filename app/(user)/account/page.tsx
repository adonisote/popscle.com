import AccountForm from './account-form'
import { createClient } from '@/utils/supabase/server'
import { redirect } from "next/navigation";
import Nav from '@/components/ui/nav';
import AccountForm2 from './newform';


export default async function Account() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')

  }

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <Nav />

      <AccountForm2 user={user} />
      {/* <AccountForm user={user} /> */}


    </div>
  )
}