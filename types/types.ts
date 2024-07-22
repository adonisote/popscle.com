type FormEvent = React.FormEvent<HTMLFormElement>

type Space = {
  id: string,
  created_at: string,
  title: string,
  description: string,
  icon_url?: string,
  updated_at?: string
}

type Profile = {
  full_name: string;
  avatar_url: string;
};
type Resource = {
  id: string;
  created_at: string;
  title: string;
  description: string;
  url: string;
  votes: number;
  updated_at?: string;
  user_id: string;
  space_id: string;
  type_id: number;
  isPaid: boolean;
  upvoted_by: any;
  profiles: Profile; // Add the
};


export type {
  FormEvent,
  Space,
  Resource
} 