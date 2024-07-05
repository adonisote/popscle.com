'use client'
import Avatar from './avatar'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { resolve } from 'path'


const formSchema = z.object({
  username: z.string().min(5, { message: "Username must be at least 5 characters" }).max(20, {
    message: "Username must not be longer than 20 characters"
  }),
  full_name: z.string().min(3, {
    message: "Full name must be at least 3 characters"
  }).max(30, {
    message: "Full name must not be longer than 30 characters"
  }),
  website: z.string().url().optional(),
  avatar_url: z.string().url().optional(),
})

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [full_name, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        console.log(error)
        throw error
      }
      console.log(data)

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  //1. Define the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: username ?? '',
      full_name: full_name ?? '',
      website: website ?? '',
      avatar_url: avatar_url ?? '',
    }
  })

  // Update form default values when state variables change
  useEffect(() => {
    form.reset({
      username: username ?? '',
      full_name: full_name ?? '',
      website: website ?? '',
      avatar_url: avatar_url ?? '',
    })
  }, [username, full_name, website, avatar_url, form])


  //2. Define a submit handler

  async function updateProfile(
    data: z.infer<typeof formSchema>
    //   { data
    //   username,
    //   website,
    //   avatar_url,
    // }: {
    //   username: string | null
    //   fullname: string | null
    //   website: string | null
    //   avatar_url: string | null
    // }
  ) {
    //Destructured Block-scope variables not interfering with state variables, because take precedence
    console.log('inside update profile', data)
    const { full_name, username, website, avatar_url } = data

    console.log('Updating profile:', full_name, username, website, avatar_url)
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
      setFullname(full_name)
      setUsername(username)
      setWebsite(website)
      setAvatarUrl(avatar_url)
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(updateProfile)} className='w-full h-full flex flex-col items-center justify-center'>


        <div className='flex flex-col items-center'>
          <Avatar
            uid={user?.id ?? null}
            url={avatar_url}
            size={150}
            onUpload={(url) => {
              setAvatarUrl(url)
              updateProfile({ full_name, username, website, avatar_url: url })
            }}
          />
          <FormItem>
            <FormLabel>Email</FormLabel>
            <Input className='md:w-[250px]' value={user?.email} disabled />
          </FormItem>

          <FormField
            control={form.control}
            name='full_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder='Full Name' {...field} />
                </FormControl>
                <FormDescription>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}

          />


          {/* <Label htmlFor="fullName">Full Name</Label>
          <Input
            className='md:w-[250px]'
            id="fullName"
            type="text"
            value={full_name || ''}
            onChange={(e) => setFullname(e.target.value)}
          /> */}

          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='Username' {...field} />
                </FormControl>
                <FormDescription>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <div>
            <Label htmlFor="username">Username</Label>
            <Input
              className='md:w-[250px]'
              id="username"
              type="text"
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div> */}

          <FormField
            control={form.control}
            name='website'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder='Website' {...field} />
                </FormControl>
                <FormDescription>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <div>
            <Label htmlFor="website">Website</Label>
            <Input
              className='md:w-[250px]'
              id="website"
              type="url"
              value={website || ''}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div> */}


        </div>

        <Button
          type='submit'
          // onClick={() => updateProfile({ full_name, username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </Button>
      </form>
    </Form>
  )
}