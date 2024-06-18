type FormEvent = React.FormEvent<HTMLFormElement>

type Space = {
  id: string,
  created_at: string,
  title: string,
  description: string,
  icon_url?: string,
  updated_at?: string
}
type Resource = {
  id: string;
  created_at: string;
  title: string;
  description: string;
  votes: number;
  url: string;
  updated_at?: string;
  user_id: string;
  space_id: string;
  type_id: number;
  paid: boolean;
};


export type {
  FormEvent,
  Space,
  Resource
} 