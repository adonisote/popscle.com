import AccountForm from './account-form'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function Account() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <>
      <AccountForm user={user} />
      <Link href="/private/react">Resources</Link>

    </>
  )
}