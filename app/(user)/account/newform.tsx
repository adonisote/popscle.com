'use client'
import { createClient } from "@/utils/supabase/client"
import { useCallback, useEffect, useState } from "react"
import { type User } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Avatar from './avatar'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

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
  avatar_url: z.string().optional(), //it is not really a url that is why .url() is not needed
  updated_at: z.string()
})





export default function AccountForm2({ user }: { user: User }) {

  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [profile, setProfile] = useState({
    full_name: '',
    username: '',
    website: '',
    avatar_url: '',
    updated_at: ''
  })


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      full_name: '',
      website: '',
      avatar_url: '',
      updated_at: ''
    }
  })
  const fetchProfile = useCallback(
    async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', user.id)
        .single()

      setProfile(data)
      form.reset(data)
      setLoading(false)
      // console.log('Form after fetch:', form.getValues())


    }, [user, supabase, form])


  // 1. Define the form
  useEffect(() => {
    fetchProfile()
    setLoading(false)
  }, [fetchProfile])
  // 2. Define a submit handler
  // form.reset(profile)

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      console.log('On submit:', values)
      const updatedValues = {
        ...values,
        id: user?.id,
        updated_at: new Date().toISOString(),
        website: values.website || '',
        avatar_url: values.avatar_url || ''
      }
      console.log('Updated values:', updatedValues)

      const { error } = await supabase
        .from('profiles')
        .upsert(updatedValues)
      // .eq('id', user.id)

      if (error) {
        setError(error.message)
      } else {
        alert('Profile updated!')
        setProfile(updatedValues);
      }
    }, [supabase, user.id]
  )




  // form.reset(profile)
  if (loading) return <p>Loading...</p>



  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* <h1>Profile</h1> */}
      <p className=" text-lg">{profile.full_name ?? 'My Profile'}</p>
      <Avatar
        uid={user.id}
        url={profile.avatar_url}
        size={150}
        onUpload={(url) => {
          setProfile({ ...profile, avatar_url: url })
          form.setValue('avatar_url', url)
        }}
      />

      <div>
        <Label htmlFor="email">Email:</Label>
        <Input id="email" className='md:w-[250px] text-center' value={user?.email} disabled />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center"
        >
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input className="md:w-[250px] text-center" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input className="md:w-[250px] text-center" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input className="md:w-[250px] text-center" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="avatar_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input  {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <Button type="submit" className="m-4">Update profile</Button>
        </form>
      </Form>
    </div>
  )
}

