'use client'

import { Button } from '@/components/ui/button'
import { ChevronUp } from 'lucide-react'


import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function UpvoteResource({ resourceId }: { resourceId: string }) {
  console.log('resource.id:', resourceId)
  const supabase = createClient()
  const [votes, setVotes] = useState<number>(0)

  useEffect(() => {
    const getUpvote = async () => {
      const { data, error } = await supabase
        .from('resources')
        .select('votes')
        .eq('id', resourceId)

      if (error) {
        console.log('Error getting the votes number: ', error)
      } else if (data[0].votes === null) {
        console.log('data length is 0:', data)
        setVotes(0)
      } else {
        console.log('Else:', data)
        setVotes(data[0].votes)
      }
    }

    getUpvote()
  }, [resourceId, supabase])

  console.log(votes)

  return (
    <div className='flex flex-col items-center'>
      <Button variant="outline" size="icon">
        <ChevronUp className="h-4 w-4" />
      </Button>
      {votes}
    </div>
  )
}