'use client'

import { createClient } from "@/utils/supabase/client"
import { ResourceForm } from "./submitResourceForm"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"


export default function SubmitPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSpace = async () => {
      const { data: spaces, error: spaceError } = await supabase
        .from('spaces')
        .select('id, title')
        .ilike('title', params.slug); //all space titels have to be change to be lowercase as entries. then we can use .eq()
      if (!spaces || spaces.length === 0) {
        console.log('Error fetching Space:', spaceError)
        setError('Space not found. Redirecting to home...')
        setTimeout(() => {
          router.push('/home')
        }, 3000) // Wait for 2 seconds before redirecting
      } else {
        setLoading(false)
      }
    }
    fetchSpace()
  }, [supabase, router, params.slug])

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    )
  }
  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }
  // Function to convert a string to title case
  function toTitleCase(str: string): string {
    return str
      .toLowerCase() // Convert the entire string to lowercase
      .split(/[\s\-]+/) // Split the string by spaces or hyphens
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(' '); // Join the words back together with a space
  }

  return (
    <div>
      <p>Submit a new resource  for {toTitleCase(params.slug)}</p>
      <ResourceForm />
    </div>
  )
}