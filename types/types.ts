type FormEvent = React.FormEvent<HTMLFormElement>

type Space = {
  id: string,
  created_at: string,
  title: string,
  description: string,
  icon_url?: string,
  updated_at: string
}

export type {
  FormEvent,
  Space
} 