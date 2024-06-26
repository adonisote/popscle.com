'use client'

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"


export default function SubmitFinal({ params }: { params: { slug: string } }) {
  return (
    <div>

      <p>Submit Resource {params.slug}</p>

    </div>
  )
}