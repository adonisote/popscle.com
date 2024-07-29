# Popscle
A Peer2Peer Learning Platform. Self-Directed-Learning comes with alot of challenges: deciding what to learn, picking a direction, lack of structure, keep the motivation up, finding updated resources, starting from zero, slow progress, non-visible progress, non-visible external recognition. We want to build Peer2Peer Learning communities, both public and private ones.

Popscle allows you to learn from people you look up to. 

Tech stack:
- Typescript
- Tailwind
- Framework: Nextjs
- Database: Postgres - Supabase
- Analytics: Posthog
- Deployment: Vercel

# Deployed version:

You will need an account to be able to access to the app, at the moment it runs by invite only. 

Login: [Popscle.com](https://popscle-com.vercel.app/login)

Check our [landing page](https://popscle-com.vercel.app/)

## Instalation
```zsh
pnpm i
```

## Run locally using supabase
[Full instruction](https://supabase.com/docs/guides/cli/getting-started?queryGroups=platform&platform=macos)

1. Install supabase cli
```zsh
pnpm add supabase --save-dev
```
2. Run supabase inside your project folder
```zsh
pnpm supabase init
```
3. Now, to start the Supabase stack, run:
```zsh
pnpm supabase start
```
The local development environment includes Supabase Studio, a graphical interface for working with your database, running by default on localhost:54323.


4. Once all of the Supabase services are running, you'll see output containing your local Supabase credentials. It should look like this, with urls and keys that you'll use in your local project:
```zsh

Started supabase local development setup.

         API URL: http://localhost:54321
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
        anon key: eyJh......
service_role key: eyJh......
```
5. Add API URL and Anon Key to your .env.local, you will also need some key for Posthog services. Contact Adonis: 

.env.local
```zsh
NEXT_PUBLIC_SUPABASE_URL="http://localhost:54321"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJh......"
NEXT_PUBLIC_POSTHOG_KEY=""
NEXT_PUBLIC_POSTHOG_HOST=""
```


## Getting Started

Run the development server:

```zsh
pnpm dev
```

## Main route
```zsh
/home
```