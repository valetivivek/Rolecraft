import React, { useCallback, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Key,
  User,
  Cpu,
  Sliders,
  Sparkles,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Plus,
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { AnimatedInput } from '@/components/ui/animated-input';
import { AnimatedContainer } from '@/components/ui/animated-container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IconBadge } from '@/components/ui/icon-badge';
import { GetStartedButton } from '@/components/ui/get-started-button';
import { MinimalToggle } from '@/components/ui/toggle';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import '@/shared/styles/globals.css';

type Section = 'provider' | 'profile' | 'preferences';

const PROVIDERS = [
  { id: 'openai', name: 'OpenAI', models: ['gpt-4o', 'gpt-4o-mini'] },
  { id: 'anthropic', name: 'Anthropic', models: ['claude-3.5-sonnet', 'claude-3-haiku'] },
  { id: 'gemini', name: 'Google Gemini', models: ['gemini-pro', 'gemini-flash'] },
  { id: 'ollama', name: 'Ollama (Local)', models: ['llama3', 'mistral', 'codellama'] },
];

function Options() {
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>('provider');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const handleToggleTheme = useCallback(() => setIsDark((prev) => !prev), []);

  const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
    { id: 'provider', label: 'AI Provider', icon: <Cpu className="h-4 w-4" /> },
    { id: 'profile', label: 'Profile', icon: <User className="h-4 w-4" /> },
    { id: 'preferences', label: 'Preferences', icon: <Sliders className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 animate-in animate-in-delay-0 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <IconBadge size="md">
              <Sparkles className="h-5 w-5" />
            </IconBadge>
            <div>
              <h1 className="text-base font-semibold">Rolecraft</h1>
              <p className="text-xs text-muted-foreground">Settings</p>
            </div>
          </div>
          <ThemeToggle isDark={isDark} onToggle={handleToggleTheme} />
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Section Nav */}
        <AnimatedContainer delay={0.1} className="mb-8">
          <div className="flex flex-wrap gap-1 rounded-xl border border-border bg-card p-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  'flex min-h-[44px] min-w-[44px] flex-1 basis-24 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 sm:px-4',
                  activeSection === item.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </AnimatedContainer>

        {/* Section Content */}
        <div key={activeSection} className="animate-in-blur animate-in-delay-100">
          {activeSection === 'provider' && <ProviderSection />}
          {activeSection === 'profile' && <ProfileSection />}
          {activeSection === 'preferences' && <PreferencesSection />}
        </div>
      </div>
    </div>
  );
}

function ProviderSection() {
  const [selectedProvider, setSelectedProvider] = useState('openai');
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const [keyStatus, setKeyStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');

  const currentProvider = PROVIDERS.find((p) => p.id === selectedProvider);

  const handleValidateKey = () => {
    setKeyStatus(apiKey.length > 10 ? 'valid' : 'invalid');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-1 text-lg font-semibold">AI Provider</h2>
        <p className="text-sm text-muted-foreground">
          Choose your AI provider and enter your API key.
        </p>
      </div>

      {/* Provider Selection */}
      <div className="grid grid-cols-2 gap-3">
        {PROVIDERS.map((provider, index) => (
          <AnimatedContainer key={provider.id} delay={0.05 + index * 0.05}>
            <button
              type="button"
              onClick={() => {
                setSelectedProvider(provider.id);
                setSelectedModel(provider.models[0] ?? '');
                setKeyStatus('idle');
              }}
              className={cn(
                'w-full rounded-xl border p-4 text-left transition-all duration-200 focus-ring',
                selectedProvider === provider.id
                  ? 'border-primary bg-primary/5 shadow-sm shadow-primary/10'
                  : 'border-border bg-card hover:border-primary/30',
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-lg',
                    selectedProvider === provider.id ? 'bg-primary/10' : 'bg-muted',
                  )}
                >
                  <Key
                    className={cn(
                      'h-4 w-4',
                      selectedProvider === provider.id ? 'text-primary' : 'text-muted-foreground',
                    )}
                  />
                </div>
                <span className="text-sm font-medium">{provider.name}</span>
              </div>
            </button>
          </AnimatedContainer>
        ))}
      </div>

      {/* API Key Input */}
      <Card className="space-y-3">
        <label className="text-sm font-medium">API Key</label>
        <div className="relative">
          <input
            type={showKey ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.target.value);
              setKeyStatus('idle');
            }}
            placeholder={`Enter your ${currentProvider?.name ?? ''} API key`}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 pr-10 text-sm outline-none transition-shadow focus:border-ring focus:ring-[3px] focus:ring-ring/20"
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            aria-label={showKey ? 'Hide API key' : 'Show API key'}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground focus-ring"
          >
            {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {keyStatus !== 'idle' && (
          <div
            className={cn(
              'flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium',
              keyStatus === 'valid'
                ? 'bg-success/10 text-success'
                : 'bg-destructive/10 text-destructive',
            )}
          >
            {keyStatus === 'valid' ? (
              <Check className="h-3 w-3" />
            ) : (
              <AlertCircle className="h-3 w-3" />
            )}
            {keyStatus === 'valid' ? 'API key is valid' : 'Invalid API key'}
          </div>
        )}

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleValidateKey} disabled={!apiKey}>
            Validate Key
          </Button>
          <GetStartedButton text="Save" className="h-9 rounded-md px-3 text-xs" />
        </div>
      </Card>

      {/* Model Selection */}
      <Card className="space-y-3">
        <label className="text-sm font-medium">Model</label>
        <div className="flex flex-wrap gap-2">
          {currentProvider?.models.map((model) => (
            <button
              key={model}
              type="button"
              onClick={() => setSelectedModel(model)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200 focus-ring',
                selectedModel === model
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:border-primary/30 hover:text-foreground',
              )}
            >
              {model}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  field: string;
  graduationDate: string;
  gpa: string;
}

const COUNTRY_CODES = [
  { code: '+1', country: 'USA', example: '(555) 123-4567' },
  { code: '+91', country: 'India', example: '98765 43210' },
  { code: '+44', country: 'UK', example: '7700 900123' },
  { code: '+49', country: 'Germany', example: '151 23456789' },
  { code: '+33', country: 'France', example: '6 12 34 56 78' },
  { code: '+81', country: 'Japan', example: '90-1234-5678' },
  { code: '+86', country: 'China', example: '138 1234 5678' },
  { code: '+61', country: 'Australia', example: '412 345 678' },
  { code: '+55', country: 'Brazil', example: '11 98765-4321' },
  { code: '+27', country: 'South Africa', example: '82 123 4567' },
] as const;

function generateId() {
  return crypto.randomUUID();
}

function ProfileSection() {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    phoneCountryCode: '+1',
    city: '',
    state: '',
    zipCode: '',
    linkedin: '',
    website: '',
    summary: '',
  });
  const [experience, setExperience] = useState<ExperienceItem[]>([]);
  const [education, setEducation] = useState<EducationItem[]>([]);

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setProfile((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const addExperience = () => {
    setExperience((prev) => [
      ...prev,
      {
        id: generateId(),
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
      },
    ]);
  };

  const updateExperience = (id: string, data: Partial<ExperienceItem>) => {
    setExperience((prev) => prev.map((e) => (e.id === id ? { ...e, ...data } : e)));
  };

  const removeExperience = (id: string) => {
    setExperience((prev) => prev.filter((e) => e.id !== id));
  };

  const addEducation = () => {
    setEducation((prev) => [
      ...prev,
      {
        id: generateId(),
        degree: '',
        institution: '',
        field: '',
        graduationDate: '',
        gpa: '',
      },
    ]);
  };

  const updateEducation = (id: string, data: Partial<EducationItem>) => {
    setEducation((prev) => prev.map((e) => (e.id === id ? { ...e, ...data } : e)));
  };

  const removeEducation = (id: string) => {
    setEducation((prev) => prev.filter((e) => e.id !== id));
  };

  const fields: { key: string; label: string }[] = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'linkedin', label: 'LinkedIn URL' },
    { key: 'website', label: 'Website' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-1 text-lg font-semibold">Your Profile</h2>
        <p className="text-sm text-muted-foreground">
          This info is sent to the AI to fill applications. Stored locally in your browser only.
        </p>
      </div>

      <Card variant="elevated" className="space-y-5">
        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          {fields.map((field, index) => (
            <AnimatedContainer key={field.key} delay={0.05 + index * 0.04}>
              <AnimatedInput
                label={field.label}
                value={profile[field.key as keyof typeof profile]}
                onChange={handleChange(field.key)}
              />
            </AnimatedContainer>
          ))}
        </div>

        <AnimatedContainer delay={0.2}>
          <label className="mb-2 block text-sm font-medium text-muted-foreground">Phone</label>
          <div className="flex gap-2">
            <select
              value={profile.phoneCountryCode}
              onChange={handleChange('phoneCountryCode')}
              className="w-24 shrink-0 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-shadow focus:border-ring focus:ring-[3px] focus:ring-ring/20"
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} {c.country}
                </option>
              ))}
            </select>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
              placeholder={
                COUNTRY_CODES.find((c) => c.code === profile.phoneCountryCode)?.example ??
                '(555) 123-4567'
              }
              className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-shadow focus:border-ring focus:ring-[3px] focus:ring-ring/20"
            />
          </div>
        </AnimatedContainer>

        <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
          <AnimatedContainer delay={0.22}>
            <AnimatedInput
              label="City"
              value={profile.city}
              onChange={handleChange('city')}
              placeholder="e.g. San Francisco"
            />
          </AnimatedContainer>
          <AnimatedContainer delay={0.24}>
            <AnimatedInput
              label="State"
              value={profile.state}
              onChange={handleChange('state')}
              placeholder="e.g. CA"
            />
          </AnimatedContainer>
          <AnimatedContainer delay={0.26}>
            <AnimatedInput
              label="Zip code"
              value={profile.zipCode}
              onChange={handleChange('zipCode')}
              placeholder="e.g. 94102"
            />
          </AnimatedContainer>
        </div>

        <AnimatedContainer delay={0.3}>
          <label className="mb-2 block text-sm font-medium text-muted-foreground">Summary</label>
          <textarea
            value={profile.summary}
            onChange={handleChange('summary')}
            placeholder="A brief professional summary..."
            rows={3}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-shadow focus:border-ring focus:ring-[3px] focus:ring-ring/20"
          />
        </AnimatedContainer>
      </Card>

      {/* Education */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Education</h3>
          <button
            type="button"
            onClick={addEducation}
            aria-label="Add education"
            className="inline-flex min-h-[44px] min-w-[44px] items-center gap-1 rounded-lg border border-border px-2 py-1 text-xs font-medium hover:bg-accent focus-ring"
          >
            <Plus className="h-3 w-3" />
            Add
          </button>
        </div>
        <div className="space-y-3">
          {education.map((edu) => (
            <Card key={edu.id} variant="compact" className="rounded-lg">
              <div className="mb-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeEducation(edu.id)}
                  aria-label="Remove education"
                  className="text-destructive text-xs hover:underline focus-ring rounded"
                >
                  Remove
                </button>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <Input
                  label="Degree"
                  value={edu.degree}
                  onChange={(v) => updateEducation(edu.id, { degree: v })}
                />
                <Input
                  label="Institution"
                  value={edu.institution}
                  onChange={(v) => updateEducation(edu.id, { institution: v })}
                />
                <Input
                  label="Field"
                  value={edu.field}
                  onChange={(v) => updateEducation(edu.id, { field: v })}
                />
                <Input
                  label="Graduation"
                  value={edu.graduationDate}
                  onChange={(v) => updateEducation(edu.id, { graduationDate: v })}
                />
                <Input
                  label="GPA"
                  value={edu.gpa}
                  onChange={(v) => updateEducation(edu.id, { gpa: v })}
                  placeholder="e.g. 3.8/4.0 or 9.2/10"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Experience</h3>
          <button
            type="button"
            onClick={addExperience}
            aria-label="Add experience"
            className="inline-flex min-h-[44px] min-w-[44px] items-center gap-1 rounded-lg border border-border px-2 py-1 text-xs font-medium hover:bg-accent focus-ring"
          >
            <Plus className="h-3 w-3" />
            Add
          </button>
        </div>
        <div className="space-y-3">
          {experience.map((exp) => (
            <Card key={exp.id} variant="compact" className="rounded-lg">
              <div className="mb-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeExperience(exp.id)}
                  aria-label="Remove experience"
                  className="text-destructive text-xs hover:underline focus-ring rounded"
                >
                  Remove
                </button>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <Input
                  label="Job title"
                  value={exp.title}
                  onChange={(v) => updateExperience(exp.id, { title: v })}
                />
                <Input
                  label="Company"
                  value={exp.company}
                  onChange={(v) => updateExperience(exp.id, { company: v })}
                />
                <Input
                  label="Start"
                  value={exp.startDate}
                  onChange={(v) => updateExperience(exp.id, { startDate: v })}
                />
                <Input
                  label="End"
                  value={exp.endDate}
                  onChange={(v) => updateExperience(exp.id, { endDate: v })}
                  placeholder="Present"
                />
                <div className="sm:col-span-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`c-${exp.id}`}
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, { current: e.target.checked })}
                    className="rounded border-input"
                  />
                  <label htmlFor={`c-${exp.id}`} className="text-xs">
                    Current
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-muted-foreground">Description</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                    rows={2}
                    className="mt-1 w-full rounded-lg border border-input bg-background px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <GetStartedButton text="Save Profile" className="h-10 rounded-lg px-4 text-sm" />
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs text-muted-foreground">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-0.5 w-full rounded border border-input bg-background px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}

function PreferencesSection() {
  const [prefs, setPrefs] = useState({
    autoDetect: true,
    showOverlay: true,
  });

  const togglePref = (key: keyof typeof prefs) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-1 text-lg font-semibold">Preferences</h2>
        <p className="text-sm text-muted-foreground">Configure how Rolecraft behaves.</p>
      </div>

      <div className="space-y-3">
        <AnimatedContainer delay={0.05}>
          <Card className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Auto-detect forms</div>
              <div className="text-xs text-muted-foreground">
                Automatically detect job application forms on page load
              </div>
            </div>
            <MinimalToggle checked={prefs.autoDetect} onChange={() => togglePref('autoDetect')} />
          </Card>
        </AnimatedContainer>

        <AnimatedContainer delay={0.1}>
          <Card className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Show overlay button</div>
              <div className="text-xs text-muted-foreground">
                Display the Rolecraft button on detected application pages
              </div>
            </div>
            <MinimalToggle checked={prefs.showOverlay} onChange={() => togglePref('showOverlay')} />
          </Card>
        </AnimatedContainer>

        <AnimatedContainer delay={0.15}>
          <Card>
            <div className="text-sm font-medium">Keyboard Shortcut</div>
            <div className="mt-2 flex items-center gap-2">
              <kbd className="rounded-md border border-border bg-muted px-2 py-0.5 text-xs font-mono text-muted-foreground">
                Ctrl
              </kbd>
              <span className="text-xs text-muted-foreground">+</span>
              <kbd className="rounded-md border border-border bg-muted px-2 py-0.5 text-xs font-mono text-muted-foreground">
                Shift
              </kbd>
              <span className="text-xs text-muted-foreground">+</span>
              <kbd className="rounded-md border border-border bg-muted px-2 py-0.5 text-xs font-mono text-muted-foreground">
                F
              </kbd>
            </div>
          </Card>
        </AnimatedContainer>
      </div>
    </div>
  );
}

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<Options />);
}
