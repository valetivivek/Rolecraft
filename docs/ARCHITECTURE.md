# Architecture

## High-Level Overview

Rolecraft has two parts:

1. **Browser extension** — Detects job forms, autofills using AI. API keys stored locally (BYOK).
2. **Web dashboard** — Profile builder with Google sync. Users create/edit profile, sync to cloud.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Rolecraft System                                 │
│                                                                          │
│  ┌─────────────────────────────┐    ┌─────────────────────────────────┐ │
│  │      Web Dashboard          │    │     Browser Extension            │ │
│  │      (Next.js)              │    │     (Manifest V3)                │ │
│  │                             │    │                                  │ │
│  │  • Build profile             │    │  • Popup UI                      │ │
│  │  • Personal, jobs,          │    │  • Options (API key, settings)   │ │
│  │    education, skills,       │    │  • Content scripts (form detect) │ │
│  │    projects, certs          │    │  • Background (AI calls)          │ │
│  │  • Sign in with Google      │    │  • Profile from storage or sync   │ │
│  │  • Sync profile to Supabase │    │                                  │ │
│  └──────────────┬──────────────┘    └──────────────┬──────────────────┘ │
│                 │                                 │                     │
│                 │  Profile sync                    │  Fetch profile      │
│                 ▼                                 │  (when logged in)   │
│  ┌─────────────────────────────┐                  │                     │
│  │       Supabase               │◄─────────────────┘                     │
│  │  • Auth (Google OAuth)       │                                        │
│  │  • Profiles table            │                                        │
│  └─────────────────────────────┘                                        │
│                                                                          │
│  Extension → AI Provider APIs (OpenAI, Anthropic, Gemini) — direct      │
│  API keys stay in chrome.storage.local, never sent to our servers        │
└─────────────────────────────────────────────────────────────────────────┘
```

## Components

### Content Scripts (`src/content/`)

Injected into job application pages. Responsible for:

- **Form Detection**: Scan the page for application forms using heuristics (field labels, names, types, ARIA attributes)
- **Field Mapping**: Map detected fields to a standardized schema (name, email, phone, experience, education, etc.)
- **Autofill Execution**: Receive fill data from the service worker and inject values into form fields
- **Overlay UI**: Render a small floating button/panel using Shadow DOM (isolated from host page styles)

### Background Service Worker (`src/background/`)

The orchestration layer. Responsible for:

- **AI Communication**: Send prompts to the user's chosen AI provider and parse responses
- **Profile Management**: Load user profile data from storage
- **Provider Routing**: Select the correct AI provider adapter based on user settings
- **Message Handling**: Receive requests from content scripts and popup, coordinate responses

### Popup (`src/popup/`)

Quick-access UI when clicking the extension icon:

- Show current page detection status
- Quick-fill button
- Profile selector
- Provider status indicator

### Options Page (`src/options/`)

Extension settings:

- API key management (per provider)
- Provider selection and model configuration
- Import profile (from web dashboard export or manual)
- Keyboard shortcut configuration
- Link to web dashboard for full profile builder

### Web Dashboard (`apps/web/`)

Next.js app for profile creation and sync:

- **Profile builder**: Personal info, work experience, education, skills, projects, certifications, links
- **Google sign-in**: Supabase Auth with Google OAuth
- **Profile sync**: Save to Supabase, fetch in extension when user is logged in
- **API key**: Stored only in extension (chrome.storage.local), never on our servers

### AI Providers (`src/providers/`)

Adapter pattern for AI services:

- Each provider implements the `AIProvider` interface
- Provider registry manages available providers
- Handles API key validation, rate limiting, error mapping
- Supports: OpenAI, Anthropic, Google Gemini, local models via Ollama

### Shared (`src/shared/`)

Cross-cutting concerns:

- TypeScript types and interfaces
- Prompt templates
- Constants and configuration
- Utility functions
- Storage helpers

## Data Flow: Autofill

1. User navigates to a job application page
2. Content script detects form fields and extracts field metadata
3. Content script sends field data to service worker via `chrome.runtime.sendMessage`
4. Service worker loads user profile from `chrome.storage.local`
5. Service worker constructs prompt with field context + user profile
6. Service worker calls AI provider API
7. AI returns structured fill data
8. Service worker sends fill data back to content script
9. Content script fills form fields with appropriate values

## Storage Schema

```typescript
interface StorageSchema {
  // User profile
  profile: UserProfile;

  // API keys (per provider)
  apiKeys: Record<string, string>;

  // Active provider + model
  activeProvider: string;
  activeModel: string;

  // User preferences
  preferences: {
    autoDetect: boolean;
    showOverlay: boolean;
    keyboardShortcut: string;
  };

  // Usage tracking (local only, for user's own awareness)
  usage: {
    totalFills: number;
    tokenEstimate: number;
  };
}
```

## Security Model

- API keys never leave the browser (stored in `chrome.storage.local`)
- No external servers — all AI calls go directly from the extension to provider APIs
- Content Security Policy restricts script sources
- No `eval()`, no dynamic code execution
- Shadow DOM isolation prevents CSS/JS leakage between extension UI and host pages
