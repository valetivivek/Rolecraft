import React, { useCallback, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Zap, Settings, User, Sparkles } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Card } from '@/components/ui/card';
import { IconBadge } from '@/components/ui/icon-badge';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { NavPill } from '@/components/ui/nav-pill';
import { TextRotate } from '@/components/ui/text-rotate';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import '@/shared/styles/globals.css';

type Tab = 'fill' | 'profile' | 'settings';

function Popup() {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('fill');
  const [isDetected, setIsDetected] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    chrome.tabs?.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0]?.url ?? '';
      const jobSites = [
        'greenhouse.io',
        'lever.co',
        'workday.com',
        'linkedin.com/jobs',
        'indeed.com',
      ];
      setIsDetected(jobSites.some((site) => url.includes(site)));
    });
  }, []);

  const handleToggleTheme = useCallback(() => setIsDark((prev) => !prev), []);

  return (
    <div className={cn('w-[360px] overflow-hidden bg-background text-foreground')}>
      <div className="relative flex flex-col">
        {/* Header */}
        <div className="flex animate-in animate-in-delay-0 items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <IconBadge size="sm">
              <Sparkles className="h-4 w-4" />
            </IconBadge>
            <span className="text-sm font-bold tracking-tight">Rolecraft</span>
          </div>
          <ThemeToggle isDark={isDark} onToggle={handleToggleTheme} />
        </div>

        {/* Status Banner */}
        <div
          className={cn(
            'animate-in-blur animate-in-delay-100 mx-4 mt-3 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium',
            isDetected
              ? 'border border-success/30 bg-success/10 text-success'
              : 'border border-muted bg-muted/50 text-muted-foreground',
          )}
        >
          <div
            className={cn(
              'h-1.5 w-1.5 rounded-full',
              isDetected ? 'bg-success shadow-success-glow' : 'bg-muted-foreground',
            )}
          />
          {isDetected ? 'Job application detected' : 'No application form found'}
        </div>

        {/* Hero Section */}
        <div className="animate-in-blur animate-in-delay-200 flex flex-col items-center gap-3 px-4 py-6">
          <h2 className="text-center text-xl font-bold tracking-tight">
            <TextRotate
              texts={['Autofill with AI', 'Your key, your data', 'Apply in seconds']}
              rotationInterval={3000}
              mainClassName="justify-center"
              elementLevelClassName="text-primary"
            />
          </h2>
          <p className="text-center text-xs text-muted-foreground">
            Bring your own API key. No subscriptions, full privacy.
          </p>
          <div className="mt-2">
            <InteractiveHoverButton
              text="Autofill"
              className="w-36 border-primary/30 text-sm"
              disabled={!isDetected}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center border-t border-border px-4 pt-3 pb-3">
          <NavPill
            items={[
              { name: 'Fill', icon: Zap, onClick: () => setActiveTab('fill') },
              { name: 'Profile', icon: User, onClick: () => setActiveTab('profile') },
              { name: 'Settings', icon: Settings, onClick: () => setActiveTab('settings') },
            ]}
          />
        </div>

        {/* Tab Content */}
        <div key={activeTab} className="animate-in-slide px-4 pb-4">
          {activeTab === 'fill' && <FillTab isDetected={isDetected} />}
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
      </div>
    </div>
  );
}

function FillTab({ isDetected }: { isDetected: boolean }) {
  return (
    <div className="space-y-2">
      <Card variant="compact">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Fields detected</span>
          <span className="text-xs font-semibold">{isDetected ? '12' : '—'}</span>
        </div>
      </Card>
      <Card variant="compact">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Provider</span>
          <span className="text-xs font-semibold text-primary">OpenAI</span>
        </div>
      </Card>
      <Card variant="compact">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Fills today</span>
          <span className="text-xs font-semibold">3</span>
        </div>
      </Card>
    </div>
  );
}

function ProfileTab() {
  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">
        Manage your profile in the{' '}
        <button
          type="button"
          onClick={() => chrome.runtime.openOptionsPage()}
          className="font-medium text-primary underline-offset-2 hover:underline focus-ring rounded"
        >
          settings page
        </button>
        .
      </p>
      <div className="rounded-xl border border-border bg-card p-3">
        <div className="text-xs text-muted-foreground">
          Quick preview of your saved profile will appear here.
        </div>
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => chrome.runtime.openOptionsPage()}
        className="w-full rounded-xl border border-border bg-card p-3 text-left text-xs font-medium transition-colors hover:bg-accent focus-ring"
      >
        Open full settings
        <span className="ml-1 text-muted-foreground">→</span>
      </button>
    </div>
  );
}

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<Popup />);
}
