# Global Digital Maulud – PRO (Next.js)

## Features
- EN / AR / FR language toggle
- Registration API (Supabase-ready)
- Global Salawat Wall (POST + GET)
- Certificate Verify API + `/verify/[id]`
- Countdown fixed for hydration + Date set to **Sept 20, 2025 7:00 PM WAT**

## Run
```bash
npm i
npm run dev
# http://localhost:3000
```

## Env (optional – Supabase)
Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=YOUR_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_KEY=YOUR_SERVICE_KEY
```
SQL:
```sql
create table if not exists registrations (
  id uuid primary key default gen_random_uuid(),
  name text, email text, country text, lang text, created_at timestamptz default now()
);
create table if not exists salawat (
  id uuid primary key default gen_random_uuid(),
  text text, lang text, created_at timestamptz default now()
);
create table if not exists certificates (
  id text primary key,
  name text, issued_at timestamptz default now()
);
```

## Deploy (Vercel)
1. Push this folder to GitHub (or import directly).
2. On Vercel → New Project → Import repo.
3. Add env vars above in **Settings → Environment Variables**.
4. Deploy. Your site appears at `https://<project>.vercel.app`.
5. Point your domain (optional) and set QR links to `https://YOURDOMAIN/verify/<CERT_ID>`.
