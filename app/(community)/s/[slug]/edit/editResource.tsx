'use client';
//To dos
//1. Way to check if the url hasn't been already submited under another form. //consider tinyurls?.
//What if we have more routes /resourceX/view or resourceX/intro. How to manage that?
//prohibited urls?

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import {
  LaptopIcon,
  FileTextIcon,
  Book,
  Video,
  Podcast,
  ComputerIcon,
} from 'lucide-react';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

const iconMap: Record<string, JSX.Element> = {
  book: <Book className='h-6 w-6' />,
  video: <Video className='h-6 w-6' />,
  article: <FileTextIcon className='h-6 w-6' />,
  'practical project': <LaptopIcon className='h-6 w-6' />,
  podcast: <Podcast className='h-6 w-6' />,
  'online course': <LaptopIcon className='h-6 w-6' />,
};

const contentTypeMap: Record<string, string> = {
  book: 'A great book for in-depth learning.',
  article: 'An interesting article to spread knowledge.',
  video: 'Something you came across on Youtube or elsewhere.',
  'interactive content': 'Interactive content for hands-on fun.',
  'practical project': 'A practical project for real-world practice.',
  'online course': 'A structured online course.',
  podcast: 'A helpful podcast episode.',
};

const formSchema = z.object({
  title: z
    .string({
      required_error: 'Resource title is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(2)
    .max(100),
  description: z
    .string()
    .min(10, {
      message: 'Description must be at least 10 characters.',
    })
    .max(255, {
      message: 'Description must not be longer than 255 characters.',
    }),
  url: z.string().url(),
  // user_id: z.string().uuid(),
  space_id: z.string().uuid(),
  type_id: z.coerce.number().int(),
  isPaid: z.boolean().default(false),
});

interface ResourceType {
  id: number;
  name: string;
}

export function ResourceEditForm({
  spaceId, //Not necesary to be passed as props because I fetch it from resource data
  userId,
  slug,
  resourceId,
}: {
  spaceId: string;
  userId: string;
  slug: string;
  resourceId: string;
}) {
  const supabase = createClient();
  const [resourceTypes, setResourceTypes] = useState<ResourceType[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  // const [resource, setResource] = useState({
  //   id: '',
  //   title: '',
  //   description: '',
  //   url: '',
  //   // user_id: '',//No need of userId
  //   space_id: '',
  //   type_id: 1,
  //   isPaid: false
  // })



  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // user_id: userId, //Need to be passed from props
      // space_id: spaceId, //Need to be passed from props
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log('Form submitted: ', values);
    const { error: submitError } = await supabase
      .from('resources')
      .update([values])
      .eq('id', resourceId);

    if (submitError) {
      console.log('Error submiting form:', submitError);
      setError(submitError.message);
    } else {
      console.log('Form submitted');
      setIsSubmitted(true);
      //Reset the form values after successful submission
      form.reset({
        title: '',
        description: '',
        url: '',
        // user_id: userId,
        space_id: spaceId,
        type_id: 1,
        isPaid: false,
      });
      setTimeout(() => {
        router.push(`/s/${slug}`);
      }, 3000);
    }
  }

  const fetchResource = useCallback(async () => {
    const { data: resource, error: fetchError } = await supabase
      .from('resources')
      .select('id, title, description, url, user_id, space_id, type_id, isPaid')
      .eq('id', resourceId)
      .single()
    if (fetchError) {
      console.log('Error fetching resource:', fetchError);
    }
    if (resource) {
      console.log('Resource:', resource);
      // setResource(resource);
      form.reset({
        title: resource.title,
        description: resource.description,
        url: resource.url,
        // user_id: resource.user_id, // If needed
        space_id: resource.space_id,
        type_id: resource.type_id,
        isPaid: resource.isPaid,
      });
    }
  }, [supabase, resourceId, form])

  const fetchResourceTypes = useCallback(async () => {
    const { data, error: typesError } = await supabase.from('types').select();
    // console.log(data);
    if (typesError) {
      console.log('Fetching types error:', typesError);
    } else {
      setResourceTypes(data);
    }
  }, [supabase])

  useEffect(() => {

    fetchResourceTypes();
    fetchResource();
  }, [fetchResource, fetchResourceTypes]);

  return (
    <div className='flex flex-col'>
      {isSubmitted ? (
        <div className='h-min-[500px] h-full flex flex-col items-center justify-center'>
          <p className='text-2xl'>Thank You! 💖</p>
          {/* <Button onClick={() => setIsSubmitted(false)}>Start again</Button> */}
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 mb-20 sm:mb-0'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Resource title' {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Short resource description to help others recognize its value '
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Short resource description. Max 255 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='url'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Original resource url</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* // Old Select Field for content type. Keeping it becaue it might be useful.
            
            <FormField
              control={form.control}
              name='type_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Resource type' />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {resourceTypes?.map((type) => (
                        <SelectItem key={type.id} value={String(type.id)}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name='type_id'
              render={({ field }) => (
                <FormItem className='space-y-3 w-full md:w-auto'>
                  <FormLabel className='text-xl font-semibold leading-none tracking-tight'>
                    Content Type
                  </FormLabel>
                  <FormDescription>
                    Select the type of content you&apos;re submitting.
                  </FormDescription>

                  <FormControl>
                    <RadioGroup
                      value={String(field.value)}//useValue instead of defaultValue
                      onValueChange={field.onChange}
                      // defaultValue={String(field.value)}
                      className=' flex-col space-y-1 grid grid-cols-1 md:grid-cols-2 gap-4'
                    >
                      {resourceTypes?.map((type) => (
                        <FormItem
                          key={type.id}
                          className='flex items-center space-x-3 space-y-0  justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
                        >
                          <FormControl>
                            <RadioGroupItem
                              className='peer sr-only'
                              value={String(type.id)}
                            />
                          </FormControl>
                          <FormLabel className='font-normal w-full cursor-pointer h-full m-0'>
                            <div className='flex items-center gap-4'>
                              <div className='bg-muted rounded-md flex items-center justify-center w-10 h-10'>
                                {iconMap[type.name] || (
                                  <ComputerIcon className='h-6 w-6' />
                                )}
                              </div>
                              <div className='flex flex-col'>
                                {type.name.charAt(0).toUpperCase() +
                                  type.name.slice(1)}
                                <p className='text-sm text-muted-foreground'>
                                  {contentTypeMap[type.name]}
                                </p>
                              </div>
                            </div>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='isPaid'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel className='text-xl font-semibold leading-none tracking-tight'>
                    Is the resource free or do you have to pay for it?
                  </FormLabel>

                  <FormControl>
                    <RadioGroup
                      value={field.value ? 'true' : 'false'} //useValue instead of defaultValue
                      onValueChange={(value) =>
                        field.onChange(value === 'true')
                      }
                      // defaultValue={field.value ? 'true' : 'false'}
                      className='flex'
                    >
                      <FormItem className='space-y-0'>
                        <FormControl>
                          <RadioGroupItem
                            value='false'
                            className='peer sr-only'
                          />
                        </FormControl>
                        <FormLabel className='font-normal flex items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary w-40 cursor-pointer'>
                          Free
                        </FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem
                            value='true'
                            className='peer sr-only'
                          />
                        </FormControl>
                        <FormLabel className='font-normal flex items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary w-40 cursor-pointer'>
                          Paid
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {error && (
              <p className='text-yellow-400 p-4'>
                Ups.🙈 That did not work. Maybe the url was already submited.
              </p>
            )}

            <Button className='w-full' type='submit'>
              Submit Resource
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}


