import { Button } from '@/components/ui/button'
import { ChevronUp } from 'lucide-react'

export default function UpvoteResource() {
  return (
    <Button variant="outline" size="icon">
      <ChevronUp className="h-4 w-4" />
    </Button>
  )
}