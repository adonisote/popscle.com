'use client'

import { login, signup, signInWithGithub } from './actions'

import Image from 'next/image'
import Link from 'next/link'
import { FormEvent } from '@/types/types'


import { Button } from '@/components/ui/button' // to be implemented
import { Input } from '@/components/ui/input' // to be implemented
import { Label } from '@/components/ui/label'

import { Form } from '@/components/ui/form' // to be implemented
import { useState } from 'react'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSucess] = useState<boolean>(false)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault() // Prevent the default form submission behavior
    const formData = new FormData(e.currentTarget) // Extract form data from the form element that triggered the event
    const result = await login(formData) // Call the login function and wait for the result
    if (result.error) {
      setError(result.error) // Set the error state with the error message
      setSucess(false) // Set the success state to false
    } else {
      setError(null) // Clear the error state
      setSucess(true) // Set the success state to true
    }

  }


  return (
    <div className='w-full h-full flex flex-col items-center  justify-center  '>
      <div className="w-full h-full flex flex-col item-center justify-center lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="hidden bg-muted lg:block lg:bg-white">
          <p>Popscle</p>
          {/* <Image
            src="/placeholder.svg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          /> */}
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>



            <div className="grid gap-4">
              <form onSubmit={handleLogin} className='grid gap-4'>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@popscle.com"
                    required
                  />
                </div>
                {/* Password to be eliminate when magic link is working */}
                {/* <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="#"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                  />
                </div> */}
                <Button type='submit' className="w-full">
                  Login
                </Button>

              </form>
              {error && (
                <div className='text-red-500 text-center'>
                  {error}
                </div>
              )

              }

              {success && (
                <div className='text-green-500 text-center'>
                  Check your email
                </div>
              )}



              {/* Login with Github */}

              <form>
                <Button formAction={signInWithGithub} variant="outline" className="w-full">
                  Login with Github
                </Button>

              </form>

            </div>


            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/" className="underline">
                Get an invitation
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>

  )
}