"use client"

import { useEffect, useState, useCallback } from "react"

import { createClient } from "@/utils/supabase/client"
import { Resource } from "@/types/types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import clsx from "clsx"

export default function Resources({ spaceId }: { spaceId: string }) {
  const [data, setData] = useState<Resource[]>([])
  const [filter, setFilter] = useState('ALL')
  const [typeFilters, setTypeFilters] = useState<number[]>([])
  const [types, setTypes] = useState<{ id: number, name: string }[]>([])


  const supabase = createClient()
  const getTypes = useCallback(async () => {
    const { data, error } = await supabase
      .from('types')
      .select()
    if (error) {
      console.log(error)
    } else {
      setTypes(data)
    }
  }, [supabase])
  console.log(types)

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

    if (typeFilters.length > 0) {
      query = query.in("type_id", typeFilters)
    }

    const { data, error } = await query
    if (error) {
      console.error(error)
    } else {
      setData(data)
    }
  }, [spaceId, supabase, filter, typeFilters])

  useEffect(() => {
    getData()
    getTypes()
  }, [getData, getTypes])

  const toogleTypeFilter = (typeId: number) => {
    setTypeFilters((prev) => {
      if (prev.includes(typeId)) {
        return prev.filter(id => id != typeId)
      } else {
        return [...prev, typeId]
      }
    })

  }

  return (
    <div className="md:w-max-[800px] mx-4">
      <div className="my-4 w-full flex flex-col  items-end ">
        <div>
          <Button onClick={() => setFilter('ALL')} className="mx-4">All</Button>
          <Button onClick={() => setFilter('FREE')} className="mx-4">Free</Button>
          <Button onClick={() => setFilter('PAID')} className="mx-4">Paid</Button>
        </div>
      </div>
      <div>
        <div className=" flex justify-between">

          <Button variant='outline' size='sm' onClick={() => setTypeFilters([])}> All types</Button>
          {types?.map(type =>
          (
            <Button
              key={type.id}
              variant='outline'
              size='sm'
              onClick={() => toogleTypeFilter(type.id)}
              className={clsx({ "bg-accent text-accent-foreground": typeFilters.includes(type.id) })}
            >{type.name}</Button>

          )
          )}
        </div>



        {data?.map((resource: Resource) =>
          <div key={resource.id} className="my-4 flex border rounded-lg border-slate-200 hover:bg-primary/90 ">
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
            <p>{resource.type_id}</p>
          </div>

        )}


      </div>

    </div >
  )
}