import { login, signup } from './actions'

import Image from 'next/image'
import Link from 'next/link'


import { Button } from '@/components/ui/button' // to be implemented
import { Input } from '@/components/ui/input' // to be implemented
import { Label } from '@/components/ui/label'

import { Form } from '@/components/ui/form' // to be implemented

export default function LoginPage() {
  return (
    <>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            {/* <form> */}


            <div className="grid gap-4">
              <form className='grid gap-4'>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
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
                <Button formAction={login} className="w-full">
                  Login
                </Button>
                {/* <Button formAction={signup} className="w-full">
                  Sign up
                </Button> */}


              </form>

              {/* Login with Github will come here:

              <Button formAction={'#'} variant="outline" className="w-full">
                Login with Github
              </Button> */}
            </div>
            {/* </form> */}

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/" className="underline">
                Get an invitation
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block lg:bg-white">
          <Image
            src="/placeholder.svg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>

    </>

  )
}