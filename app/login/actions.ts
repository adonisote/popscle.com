'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'

export async function login(formData: FormData) {
  const supabase = createClient()

  //Retrieve email from form data
  const email = formData.get('email') as string

  const { error } = await supabase.auth.signInWithOtp({
    email, options: {
      shouldCreateUser: false,

    }
  })

  if (error) {
    console.log('Loging error: ', error.message)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  console.log('Magic Link sent to your email') //Implement pop up to 'check your email'.

}

export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  console.log('Check your Email')
  redirect('/account') //To be change. Popup for Check your email. 
}

export async function signInWithGithub() {
  const supabase = createClient()
  const origin = headers().get('origin')
  const redirectToUrl = `${origin}/auth/callback`

  console.log('Redirecting to:', redirectToUrl)

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: redirectToUrl,
    },
  })
  if (error) {
    console.log('Loging error: ', error.message)
    redirect('/error')
  } else {
    console.log('Redirecting to OAuth URL:', data.url)
    redirect(data.url) // use the redirect API for your server framework
  }
}
