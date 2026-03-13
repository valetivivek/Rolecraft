# Development Setup

## Prerequisites

| Tool    | Version | Check            |
| ------- | ------- | ---------------- |
| Node.js | 20+     | `node --version` |
| npm     | 10+     | `npm --version`  |
| Chrome  | 120+    | For testing      |

## Installation

```bash
git clone https://github.com/YOUR_USERNAME/Rolecraft.git
cd Rolecraft
npm install
```

This installs dependencies for the root (extension), `apps/web`, and `packages/shared` via npm workspaces.

## Extension Development

```bash
# Start dev server with hot reload
npm run dev

# The built extension will be in dist/
```

### Loading in Chrome

1. Open `chrome://extensions`
2. Toggle **Developer mode** (top right)
3. Click **Load unpacked**
4. Select the `dist/` directory
5. The extension icon appears in your toolbar

### Loading in Firefox

1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on**
3. Select `dist/manifest.json`

## Web Dashboard Development

```bash
# Start Next.js dev server
npm run dev:web

# Or from apps/web:
cd apps/web && npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Supabase Setup (Optional — for Google sync)

1. Create a project at [supabase.com](https://supabase.com)
2. Enable Google OAuth in Authentication → Providers
3. Create a `profiles` table:

```sql
create table profiles (
  id uuid references auth.users primary key,
  profile jsonb not null default '{}',
  updated_at timestamptz default now()
);

-- RLS
alter table profiles enable row level security;

create policy "Users can read own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can upsert own profile"
  on profiles for all using (auth.uid() = id);
```

4. Copy `apps/web/.env.example` to `apps/web/.env.local`
5. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Without Supabase, the profile builder works locally — users can export/import profile JSON to sync with the extension.

## Project Scripts

| Script              | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Extension dev build (watch)           |
| `npm run dev:web`   | Web dashboard dev server              |
| `npm run build`     | Extension production build            |
| `npm run test`      | Run unit tests                        |
| `npm run lint`      | ESLint checks                         |
| `npm run typecheck` | TypeScript type checking              |

## Profile Sync Flow

1. **Web**: User builds profile at `/profile`, signs in with Google (if Supabase configured)
2. **Web**: Profile saved to Supabase on "Save & Sync"
3. **Extension**: User logs in (future) or imports exported JSON
4. **Extension**: Uses profile for autofill; AI fills unknown fields from profile context
