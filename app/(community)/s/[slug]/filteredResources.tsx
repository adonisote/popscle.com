"use client"

import { useEffect, useState, useCallback } from "react"

import { createClient } from "@/utils/supabase/client"
import { Resource } from "@/types/types"
import Link from "next/link"
import { Button } from "@/components/ui/button"


export default function Resources({ spaceId }: { spaceId: string }) {
  const [data, setData] = useState<Resource[]>([])
  const [filter, setFilter] = useState('ALL')

  const supabase = createClient()
  const getData = useCallback(async () => {
    let query = supabase
      .from('resources')
      .select()
      .eq("space_id", spaceId)

    if (filter === 'FREE') {
      query = query.eq("paid", false)
    } else if (filter === 'PAID') {
      query = query.eq("paid", true)
    }

    const { data, error } = await query
    if (error) {
      console.error(error)
    } else {
      setData(data)
    }
  }, [spaceId, supabase, filter])

  useEffect(() => {
    getData()
  }, [getData])
  return (
    <div>
      <div className=" w-full flex flex-col  items-end md:w-max-[800px]">
        <div>
          <Button onClick={() => setFilter('ALL')} className="mx-4">All</Button>
          <Button onClick={() => setFilter('FREE')} className="mx-4">Free</Button>
          <Button onClick={() => setFilter('PAID')} className="mx-4">Paid</Button>
        </div>
      </div>
      {data?.map((resource: Resource) =>
        <div key={resource.id} className="m-4 flex border rounded-lg border-slate-200 hover:bg-primary/90 ">
          <div className="p-2 flex flex-col items-center justify-center">
            {resource.votes}
          </div>
          <Link
            href={resource.url}
          >
            <p>
              {resource.title}
            </p>
            <p>{resource.description}</p>
          </Link>
        </div>

      )}
    </div>
  )
}