# Rolecraft Design System

## Design Tokens

### Colors (HSL)
Defined in `src/shared/styles/globals.css` (extension) and `apps/web/src/app/globals.css` (web).

| Token | Purpose |
|-------|---------|
| `--background` | Page background |
| `--foreground` | Primary text |
| `--primary` | Brand accent (coral) |
| `--muted`, `--muted-foreground` | Secondary text |
| `--card`, `--border`, `--input` | Surfaces |
| `--destructive`, `--success` | Semantic states |
| `--ring` | Focus ring color |

### Shadows
| Token | Usage |
|-------|-------|
| `--shadow-card` | Card elevation |
| `--shadow-card-hover` | Card hover state |
| `--shadow-primary` | Primary button |
| `--shadow-primary-hover` | Primary button hover |
| `--shadow-success-glow` | Success indicator glow |

### Utilities
- **`.focus-ring`** — Use on interactive elements for consistent keyboard focus: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`

## Components

### Extension (`src/components/ui/`)

| Component | Purpose |
|-----------|---------|
| `Button` | Primary, outline, ghost, destructive variants |
| `Card` | Container with `compact`, `default`, `elevated` variants |
| `IconBadge` | Icon container with primary-tinted background (`sm`, `md`, `lg`) |
| `InteractiveHoverButton` | Animated CTA button |
| `GetStartedButton` | Chevron-reveal CTA |
| `AnimatedInput` | Floating label input |
| `AnimatedContainer` | CSS entrance animation wrapper |
| `ThemeToggle` | Light/dark mode switch |
| `MinimalToggle` | Compact toggle switch |
| `NavPill` | Tab navigation |
| `TextRotate` | Rotating text hero |

### Web (`apps/web/src/components/ui/`)

| Component | Purpose |
|-----------|---------|
| `Card` | Same API as extension; `elevated` adds shadow + hover |
| `IconBadge` | Same API as extension |

## Usage

```tsx
// Card
<Card variant="compact">...</Card>
<Card variant="elevated" className="shadow-card">...</Card>

// IconBadge
<IconBadge size="sm"><Sparkles className="h-4 w-4" /></IconBadge>

// Focus ring
<button className="focus-ring">...</button>
```
