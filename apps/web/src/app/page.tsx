import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { IconBadge } from '@/components/ui/icon-badge';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-mesh">
      <header className="border-b border-border supports-[padding:env(safe-area-inset-top)]:pt-[env(safe-area-inset-top)]">
        <div className="container mx-auto flex min-h-[44px] flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <IconBadge size="md">
              <Sparkles className="h-5 w-5" />
            </IconBadge>
            <span className="font-display text-lg font-bold">Rolecraft</span>
          </div>
          <nav className="flex min-h-[44px] flex-wrap items-center gap-2 sm:gap-4">
            <Link
              href="/profile"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-sm text-muted-foreground hover:text-foreground focus-ring"
            >
              Profile
            </Link>
            <Link
              href="/profile"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-ring"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      </header>

      <main id="main-content" className="flex-1 flex flex-col items-center justify-center px-4 py-20 sm:py-28 md:py-36">
        <div className="max-w-2xl text-center space-y-8">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Build your profile once.
            <br />
            <span className="text-primary">Autofill everywhere.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Create your professional profile on the web. Sync with Google. Use it in the Rolecraft
            extension to autofill job applications with AI — your key, your data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href="/profile"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-[0_2px_12px_-2px_hsl(var(--primary)/0.4)] hover:bg-primary/90 hover:shadow-[0_4px_20px_-2px_hsl(var(--primary)/0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200"
            >
              Build Profile
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border-2 border-foreground/20 px-6 py-3 text-base font-semibold hover:border-primary/40 hover:bg-primary/5 hover:text-foreground focus-ring transition-all duration-200"
            >
              Install Extension
            </Link>
          </div>
        </div>

        <div className="mt-20 grid w-full max-w-4xl gap-6 sm:mt-28 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card variant="elevated">
            <h3 className="font-display font-bold text-lg">Upload API Key</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Add your OpenAI, Anthropic, or Gemini key in the extension. Never stored on our
              servers.
            </p>
          </Card>
          <Card variant="elevated">
            <h3 className="font-display font-bold text-lg">Build Profile</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Add experience, education, skills, projects. Sync with Google for easy updates.
            </p>
          </Card>
          <Card variant="elevated">
            <h3 className="font-display font-bold text-lg">AI Fills the Gaps</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Unknown fields? AI generates answers from your profile. Review before submitting.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
