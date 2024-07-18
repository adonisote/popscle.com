import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/utils/supabase/server'

// Creating a handler to a GET request to route /auth/confirm
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  console.log('Next before: ', searchParams.get('next'))
  const next = searchParams.get('next') ?? '/home'
  // const next = '/'

  // Create redirect link without the secret token
  const redirectTo = request.nextUrl.clone()
  console.log('Incoming URL: ', redirectTo)
  redirectTo.pathname = next
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')

  console.log('Received token:', token_hash)
  console.log('Received type:', type)
  console.log('Redirecting to:', redirectTo)


  if (token_hash && type) {
    const supabase = createClient()

    const { error } = await supabase.auth.verifyOtp({ token_hash, type })

    if (!error) {
      redirectTo.searchParams.delete('next')
      return NextResponse.redirect(redirectTo)
    }
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = '/error'
  return NextResponse.redirect(redirectTo)
}