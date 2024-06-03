'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'

export async function login(formData: FormData) {
  const supabase = createClient()


  // type-casting here for convenience
  // in practice, you should validate your inputs
  // const data = {
  //   email: formData.get('email') as string,
  //   // password: formData.get('password') as string,
  // }

  //Retrieve email from form data
  const email = formData.get('email') as string
  // const origin = headers().get('origin'); // Get the origin from the headers

  const { error } = await supabase.auth.signInWithOtp({
    email, options: {
      shouldCreateUser: false,
      // emailRedirectTo: `${origin}/auth/confirm`
    }
  })

  if (error) {
    console.log('Loging error: ', error.message)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  console.log('Magic Link sent to your email')
  // redirect('/account')
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
  redirect('/account')
}