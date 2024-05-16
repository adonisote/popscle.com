'use client';
import { Button } from './ui/button';
import Confetti from 'react-canvas-confetti/dist/presets/realistic';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import Image from 'next/image';
import catGif from '../public/people/cat.webp';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import posthog from 'posthog-js';
import { useState } from 'react';
import ConfettiButton from './confettiButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Textarea } from './ui/textarea';

const formSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  whatAreYouLearning: z.string().min(5),
});

const person = {
  name: 'Malik Piara',
  role: 'Product Enablement @ CarByte',
};

// This handler is letting us capture and visualise the
// person who our visiting users click on the most.
const handleClick = (person_name: string) => {
  posthog.capture('click_join_person', {
    name: person_name,
  });
};

export default function TestimonialCard({
  name = person.name,
  role = person.role,
  image = '/people/malik.jpeg',
}) {
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);

  return (
    <>
      <div className='py-8 px-4 mx-auto w-96 max-w-screen-xl text-center animate-in'>
        <Card className='rounded-xl bg-slate-900 border-slate-800 shadow-2xl min-h-80'>
          <CardHeader className='flex items-center'>
            <div className='rounded-full'>
              <Image
                alt='Malik'
                src={image}
                width={150}
                height={150}
                className='rounded-full w-24 h-24'
              />
            </div>
          </CardHeader>
          <CardContent className='lg:min-h-20 space-y-2'>
            <h3 className='mb-2 text-xl font-medium tracking-tight leading-none text-white'>
              {name}
            </h3>
            <p className='mb-2 font-normal text-slate-400 lg:text-md sm:px-16 md:min-h-12'>
              {role}
            </p>
          </CardContent>
          <CardFooter>
            <Sheet>
              <SheetTrigger
                className='h-10 px-4 py-2 w-full bg-slate-800 hover:bg-pink-400 hover:text-white text-slate-500 rounded-md inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
                onClick={() => handleClick(name)}
              >
                Join {name.split(' ')[0]}
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Join {name.split(' ')[0]} on Popscle</SheetTitle>
                  <SheetDescription>
                    {`We're rolling out Popscle by invitation. If you'd like to be the first to try it, signup below ✨`}
                    <section className='mt-10'>
                      <SignupForm setFormIsSubmitted={setFormIsSubmitted} />
                    </section>
                  </SheetDescription>
                </SheetHeader>

                {formIsSubmitted && <SuccessMessage />}
              </SheetContent>
            </Sheet>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export function SignupForm({ setFormIsSubmitted }) {
  const [isVisible, setIsVisible] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur', // Validate on every change to disable/enable the button
  });

  const { isValid } = form.formState; // Track overall form validity

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    setFormIsSubmitted(true);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='Ada Lovelace'
                  className='placeholder:opacity-60'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='ada.lovelace@code.berlin'
                  className='placeholder:opacity-60'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='whatAreYouLearning'
          render={({ field }) => (
            <FormItem>
              <FormLabel>What are you learning right now?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Tell us more about what you are learning and why. There are no right or wrong answers!'
                  className='placeholder:opacity-60 resize-none'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          disabled={!isValid}
          className='w-full transition-all'
          onClick={() => setIsVisible(true)}
        >
          {isVisible && (
            <Confetti
              className='overflow-visible fixed w-full h-full top-0 pointer-events-none'
              autorun={{ speed: 0.3, duration: 2500 }}
            />
          )}
          Join the waitlist
        </Button>
      </form>
    </Form>
  );
}

export function SuccessMessage() {
  return (
    <>
      <Image
        className='mt-10 rounded'
        alt={'cat'}
        src={catGif}
        width={350}
        height={200}
      />
    </>
  );
}
