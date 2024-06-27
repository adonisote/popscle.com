'use client'

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { ResourceForm } from "./submitResourceForm"

export default function SubmitPage({ params }: { params: { slug: string } }) {
  return (
    <div>
      <p>Submit Resource {params.slug}</p>
      <ResourceForm />
    </div>
  )
}