'use client';

import { useState, useCallback, useId } from 'react';
import Link from 'next/link';
import { Sparkles, ChevronLeft, Plus, Trash2, Pencil, Check } from 'lucide-react';
import {
  type UserProfile,
  type WorkExperience,
  type Education,
  type SkillGroup,
  type Project,
  type Certification,
  createEmptyProfile,
  generateId,
} from '@rolecraft/shared';

const SKILL_TYPES: SkillGroup['type'][] = ['technical', 'language', 'tool', 'soft', 'other'];

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

export default function ProfileBuilderPage() {
  const [profile, setProfile] = useState<UserProfile>(createEmptyProfile);
  const [isEditing, setIsEditing] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = useCallback(async (text: string, id: string) => {
    if (!text.trim()) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      // ignore
    }
  }, []);

  const updatePersonal = (field: keyof UserProfile['personal'], value: string | boolean) => {
    setProfile((p) => ({
      ...p,
      personal: { ...p.personal, [field]: value },
    }));
  };

  const addExperience = () => {
    setProfile((p) => ({
      ...p,
      experience: [
        ...p.experience,
        {
          id: generateId(),
          title: '',
          company: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
        },
      ],
    }));
  };

  const updateExperience = (id: string, data: Partial<WorkExperience>) => {
    setProfile((p) => ({
      ...p,
      experience: p.experience.map((e) => (e.id === id ? { ...e, ...data } : e)),
    }));
  };

  const removeExperience = (id: string) => {
    setProfile((p) => ({ ...p, experience: p.experience.filter((e) => e.id !== id) }));
  };

  const addEducation = () => {
    setProfile((p) => ({
      ...p,
      education: [
        ...p.education,
        {
          id: generateId(),
          degree: '',
          institution: '',
          field: '',
          startDate: '',
          graduationDate: '',
          gpa: '',
        },
      ],
    }));
  };

  const updateEducation = (id: string, data: Partial<Education>) => {
    setProfile((p) => ({
      ...p,
      education: p.education.map((e) => (e.id === id ? { ...e, ...data } : e)),
    }));
  };

  const removeEducation = (id: string) => {
    setProfile((p) => ({ ...p, education: p.education.filter((e) => e.id !== id) }));
  };

  const addSkillGroup = () => {
    setProfile((p) => ({
      ...p,
      skills: [
        ...p.skills,
        { id: generateId(), name: '', type: 'technical', items: [] },
      ],
    }));
  };

  const updateSkillGroup = (id: string, data: Partial<SkillGroup>) => {
    setProfile((p) => ({
      ...p,
      skills: p.skills.map((s) => (s.id === id ? { ...s, ...data } : s)),
    }));
  };

  const addSkillItem = (groupId: string, item: string) => {
    if (!item.trim()) return;
    setProfile((p) => ({
      ...p,
      skills: p.skills.map((s) =>
        s.id === groupId ? { ...s, items: [...s.items, item.trim()] } : s
      ),
    }));
  };

  const removeSkillItem = (groupId: string, index: number) => {
    setProfile((p) => ({
      ...p,
      skills: p.skills.map((s) =>
        s.id === groupId ? { ...s, items: s.items.filter((_, i) => i !== index) } : s
      ),
    }));
  };

  const removeSkillGroup = (id: string) => {
    setProfile((p) => ({ ...p, skills: p.skills.filter((s) => s.id !== id) }));
  };

  const addProject = () => {
    setProfile((p) => ({
      ...p,
      projects: [
        ...p.projects,
        {
          id: generateId(),
          name: '',
          description: '',
        },
      ],
    }));
  };

  const updateProject = (id: string, data: Partial<Project>) => {
    setProfile((p) => ({
      ...p,
      projects: p.projects.map((pr) => (pr.id === id ? { ...pr, ...data } : pr)),
    }));
  };

  const removeProject = (id: string) => {
    setProfile((p) => ({ ...p, projects: p.projects.filter((pr) => pr.id !== id) }));
  };

  const addCertification = () => {
    setProfile((p) => ({
      ...p,
      certifications: [
        ...p.certifications,
        { id: generateId(), name: '', issuer: '', date: '' },
      ],
    }));
  };

  const updateCertification = (id: string, data: Partial<Certification>) => {
    setProfile((p) => ({
      ...p,
      certifications: p.certifications.map((c) => (c.id === id ? { ...c, ...data } : c)),
    }));
  };

  const removeCertification = (id: string) => {
    setProfile((p) => ({ ...p, certifications: p.certifications.filter((c) => c.id !== id) }));
  };

  const updateLink = (key: keyof UserProfile['links'], value: string) => {
    setProfile((p) => ({
      ...p,
      links: { ...p.links, [key]: value },
    }));
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg supports-[padding:env(safe-area-inset-top)]:pt-[env(safe-area-inset-top)]">
        <div className="container mx-auto flex h-16 min-h-[44px] flex-wrap items-center justify-between gap-3 px-4 py-2 sm:py-0 sm:px-4">
          <Link href="/" className="flex min-h-[44px] min-w-[44px] shrink-0 items-center gap-2 self-center">
            <ChevronLeft className="h-5 w-5 text-muted-foreground" aria-hidden />
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" aria-hidden />
            </div>
            <span className="text-lg font-semibold">Rolecraft</span>
          </Link>
          <div className="flex min-h-[44px] flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing((e) => !e)}
              aria-label={isEditing ? 'Switch to view mode' : 'Switch to edit mode'}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:px-4"
            >
              {isEditing ? <Check className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
              <span className="hidden sm:inline">{isEditing ? 'Done' : 'Edit'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                const blob = new Blob([JSON.stringify(profile, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'rolecraft-profile.json';
                a.click();
                URL.revokeObjectURL(url);
              }}
              aria-label="Export profile as JSON"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:px-4"
            >
              <span className="hidden sm:inline">Export JSON</span>
              <span className="sm:hidden">Export</span>
            </button>
            <button
              type="button"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:px-4"
            >
              Save & Sync
            </button>
          </div>
        </div>
      </header>

      <main id="main-content" className="container mx-auto max-w-3xl px-4 py-6 space-y-8 sm:px-4 sm:py-8 sm:space-y-10">
        <div>
          <h1 className="text-2xl font-bold">Build Your Profile</h1>
          <p className="mt-1 text-muted-foreground">
            Add your details. AI will use this to fill job applications — and generate answers for
            unknown fields.
          </p>
        </div>

        {/* Personal Info */}
        <Section title="Personal Info">
          <div className="grid gap-4 sm:grid-cols-2">
            <CopyableField label="First name" value={profile.personal.firstName} onChange={(v) => updatePersonal('firstName', v)} isEditing={isEditing} copyId="personal-firstName" isCopied={copiedId === 'personal-firstName'} onCopy={copyToClipboard} />
            <CopyableField label="Last name" value={profile.personal.lastName} onChange={(v) => updatePersonal('lastName', v)} isEditing={isEditing} copyId="personal-lastName" isCopied={copiedId === 'personal-lastName'} onCopy={copyToClipboard} />
            <CopyableField label="Email" type="email" value={profile.personal.email} onChange={(v) => updatePersonal('email', v)} isEditing={isEditing} copyId="personal-email" isCopied={copiedId === 'personal-email'} onCopy={copyToClipboard} className="sm:col-span-2" />
            <div className="sm:col-span-2 space-y-2">
              <label className="text-sm text-muted-foreground">Phone</label>
              {isEditing ? (
                <div className="flex gap-2">
                  <select
                    value={profile.personal.phoneCountryCode ?? '+1'}
                    onChange={(e) => updatePersonal('phoneCountryCode', e.target.value)}
                    className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring w-24 shrink-0"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>{c.code} {c.country}</option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    value={profile.personal.phone}
                    onChange={(e) => updatePersonal('phone', e.target.value)}
                    placeholder={COUNTRY_CODES.find((c) => c.code === (profile.personal.phoneCountryCode ?? '+1'))?.example ?? '(555) 123-4567'}
                    className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              ) : (
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={profile.personal.phone ? 'Copy phone number' : undefined}
                  onClick={() => {
                    const full = (profile.personal.phoneCountryCode ?? '+1') + ' ' + profile.personal.phone;
                    if (full.trim().length > 2) copyToClipboard(full.trim(), 'personal-phone');
                  }}
                  onKeyDown={(e) => {
                    const full = (profile.personal.phoneCountryCode ?? '+1') + ' ' + profile.personal.phone;
                    if (full.trim().length > 2 && (e.key === 'Enter' || e.key === ' ')) copyToClipboard(full.trim(), 'personal-phone');
                  }}
                  className={`rounded-lg px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring ${profile.personal.phone ? 'cursor-pointer hover:bg-accent/50' : 'text-muted-foreground'}`}
                >
                  <span className="inline-flex items-center gap-2">
                    {profile.personal.phone ? `${profile.personal.phoneCountryCode ?? '+1'} ${profile.personal.phone}` : '—'}
                    {copiedId === 'personal-phone' && <Check className="inline h-3.5 w-3.5 text-success" />}
                  </span>
                </div>
              )}
            </div>
            <CopyableField label="City" value={profile.personal.city ?? ''} onChange={(v) => updatePersonal('city', v)} isEditing={isEditing} copyId="personal-city" isCopied={copiedId === 'personal-city'} onCopy={copyToClipboard} placeholder="e.g. San Francisco" />
            <CopyableField label="State" value={profile.personal.state ?? ''} onChange={(v) => updatePersonal('state', v)} isEditing={isEditing} copyId="personal-state" isCopied={copiedId === 'personal-state'} onCopy={copyToClipboard} placeholder="e.g. CA" />
            <CopyableField label="Zip code" value={profile.personal.zipCode ?? ''} onChange={(v) => updatePersonal('zipCode', v)} isEditing={isEditing} copyId="personal-zipCode" isCopied={copiedId === 'personal-zipCode'} onCopy={copyToClipboard} placeholder="e.g. 94102" className="sm:col-span-2" />
          </div>
        </Section>

        {/* Summary */}
        <Section title="Professional Summary">
          {isEditing ? (
            <textarea
              value={profile.summary}
              onChange={(e) => setProfile((p) => ({ ...p, summary: e.target.value }))}
              placeholder="A brief professional summary used for cover letters and 'about' fields..."
              rows={4}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          ) : (
            <div
              role="button"
              tabIndex={0}
              aria-label={profile.summary.trim() ? 'Copy summary' : undefined}
              onClick={() => profile.summary.trim() && copyToClipboard(profile.summary, 'summary')}
              onKeyDown={(e) => profile.summary.trim() && (e.key === 'Enter' || e.key === ' ') && copyToClipboard(profile.summary, 'summary')}
              className={`rounded-lg px-3 py-2 text-sm whitespace-pre-wrap outline-none focus-visible:ring-2 focus-visible:ring-ring ${profile.summary.trim() ? 'cursor-pointer hover:bg-accent/50' : 'text-muted-foreground'}`}
            >
              <span className="inline-flex items-start gap-2">
                {profile.summary || '—'}
                {copiedId === 'summary' && <Check className="inline h-3.5 w-3.5 text-success shrink-0 mt-0.5" />}
              </span>
            </div>
          )}
        </Section>

        {/* Education - first per user request */}
        <Section
          title="Education"
          action={isEditing && <Button onClick={addEducation} icon={<Plus className="h-4 w-4" />}>Add education</Button>}
        >
          <div className="space-y-6">
            {profile.education.map((edu) => (
              <Card key={edu.id}>
                <div className="flex justify-between gap-4">
                  <div className="flex-1 grid gap-3 sm:grid-cols-2">
                    <CopyableField label="Degree" value={edu.degree} onChange={(v) => updateEducation(edu.id, { degree: v })} isEditing={isEditing} copyId={`edu-${edu.id}-degree`} isCopied={copiedId === `edu-${edu.id}-degree`} onCopy={copyToClipboard} />
                    <CopyableField label="Institution" value={edu.institution} onChange={(v) => updateEducation(edu.id, { institution: v })} isEditing={isEditing} copyId={`edu-${edu.id}-institution`} isCopied={copiedId === `edu-${edu.id}-institution`} onCopy={copyToClipboard} />
                    <CopyableField label="Field of study" value={edu.field} onChange={(v) => updateEducation(edu.id, { field: v })} isEditing={isEditing} copyId={`edu-${edu.id}-field`} isCopied={copiedId === `edu-${edu.id}-field`} onCopy={copyToClipboard} />
                    <CopyableField label="Graduation date" value={edu.graduationDate} onChange={(v) => updateEducation(edu.id, { graduationDate: v })} isEditing={isEditing} copyId={`edu-${edu.id}-graduation`} isCopied={copiedId === `edu-${edu.id}-graduation`} onCopy={copyToClipboard} />
                    <CopyableField label="GPA" value={edu.gpa ?? ''} onChange={(v) => updateEducation(edu.id, { gpa: v })} isEditing={isEditing} copyId={`edu-${edu.id}-gpa`} isCopied={copiedId === `edu-${edu.id}-gpa`} onCopy={copyToClipboard} placeholder="e.g. 3.8/4.0 or 9.2/10" />
                  </div>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => removeEducation(edu.id)}
                      aria-label="Remove education"
                      className="text-destructive hover:text-destructive/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden />
                    </button>
                  )}
                </div>
              </Card>
            ))}
            {profile.education.length === 0 && (
              <p className="text-sm text-muted-foreground">No education added yet.</p>
            )}
          </div>
        </Section>

        {/* Work Experience */}
        <Section
          title="Work Experience"
          action={isEditing && <Button onClick={addExperience} icon={<Plus className="h-4 w-4" />}>Add job</Button>}
        >
          <div className="space-y-6">
            {profile.experience.map((exp) => (
              <Card key={exp.id}>
                <div className="flex justify-between gap-4">
                  <div className="flex-1 grid gap-3 sm:grid-cols-2">
                    <CopyableField label="Job title" value={exp.title} onChange={(v) => updateExperience(exp.id, { title: v })} isEditing={isEditing} copyId={`exp-${exp.id}-title`} isCopied={copiedId === `exp-${exp.id}-title`} onCopy={copyToClipboard} />
                    <CopyableField label="Company" value={exp.company} onChange={(v) => updateExperience(exp.id, { company: v })} isEditing={isEditing} copyId={`exp-${exp.id}-company`} isCopied={copiedId === `exp-${exp.id}-company`} onCopy={copyToClipboard} />
                    <CopyableField label="Start date" value={exp.startDate} onChange={(v) => updateExperience(exp.id, { startDate: v })} isEditing={isEditing} copyId={`exp-${exp.id}-start`} isCopied={copiedId === `exp-${exp.id}-start`} onCopy={copyToClipboard} placeholder="e.g. Jan 2022" />
                    <CopyableField label="End date" value={exp.endDate} onChange={(v) => updateExperience(exp.id, { endDate: v })} isEditing={isEditing} copyId={`exp-${exp.id}-end`} isCopied={copiedId === `exp-${exp.id}-end`} onCopy={copyToClipboard} placeholder="e.g. Present" disabled={exp.current} />
                    {isEditing && (
                      <div className="sm:col-span-2 flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`current-${exp.id}`}
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, { current: e.target.checked })}
                          className="rounded border-input"
                        />
                        <label htmlFor={`current-${exp.id}`} className="text-sm">I currently work here</label>
                      </div>
                    )}
                    <div className="sm:col-span-2">
                      {isEditing ? (
                        <>
                          <label className="text-sm text-muted-foreground">Description</label>
                          <textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                            rows={3}
                            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                          />
                        </>
                      ) : (
                        <div>
                          <label className="text-sm text-muted-foreground">Description</label>
                          <div
                            role="button"
                            tabIndex={0}
                            aria-label={exp.description.trim() ? 'Copy description' : undefined}
                            onClick={() => exp.description.trim() && copyToClipboard(exp.description, `exp-${exp.id}-desc`)}
                            onKeyDown={(e) => exp.description.trim() && (e.key === 'Enter' || e.key === ' ') && copyToClipboard(exp.description, `exp-${exp.id}-desc`)}
                            className={`mt-1 rounded-lg px-3 py-2 text-sm whitespace-pre-wrap outline-none focus-visible:ring-2 focus-visible:ring-ring ${exp.description.trim() ? 'cursor-pointer hover:bg-accent/50' : 'text-muted-foreground'}`}
                          >
                            <span className="inline-flex items-start gap-2">
                              {exp.description || '—'}
                              {copiedId === `exp-${exp.id}-desc` && <Check className="inline h-3.5 w-3.5 text-success shrink-0 mt-0.5" />}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => removeExperience(exp.id)}
                      aria-label="Remove experience"
                      className="text-destructive hover:text-destructive/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden />
                    </button>
                  )}
                </div>
              </Card>
            ))}
            {profile.experience.length === 0 && (
              <p className="text-sm text-muted-foreground">No experience added yet.</p>
            )}
          </div>
        </Section>

        {/* Projects */}
        <Section
          title="Projects"
          action={isEditing && <Button onClick={addProject} icon={<Plus className="h-4 w-4" />}>Add project</Button>}
        >
          <div className="space-y-6">
            {profile.projects.map((pr) => (
              <Card key={pr.id}>
                <div className="flex justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <CopyableField label="Project name" value={pr.name} onChange={(v) => updateProject(pr.id, { name: v })} isEditing={isEditing} copyId={`prj-${pr.id}-name`} isCopied={copiedId === `prj-${pr.id}-name`} onCopy={copyToClipboard} />
                    <CopyableField label="URL" value={pr.url ?? ''} onChange={(v) => updateProject(pr.id, { url: v })} isEditing={isEditing} copyId={`prj-${pr.id}-url`} isCopied={copiedId === `prj-${pr.id}-url`} onCopy={copyToClipboard} placeholder="https://..." />
                    {isEditing ? (
                      <div>
                        <label className="text-sm text-muted-foreground">Description</label>
                        <textarea
                          value={pr.description}
                          onChange={(e) => updateProject(pr.id, { description: e.target.value })}
                          placeholder="Description..."
                          rows={2}
                          className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="text-sm text-muted-foreground">Description</label>
                        <div
                          role="button"
                          tabIndex={0}
                          aria-label={pr.description.trim() ? 'Copy description' : undefined}
                          onClick={() => pr.description.trim() && copyToClipboard(pr.description, `prj-${pr.id}-desc`)}
                          onKeyDown={(e) => pr.description.trim() && (e.key === 'Enter' || e.key === ' ') && copyToClipboard(pr.description, `prj-${pr.id}-desc`)}
                          className={`mt-1 rounded-lg px-3 py-2 text-sm whitespace-pre-wrap outline-none focus-visible:ring-2 focus-visible:ring-ring ${pr.description.trim() ? 'cursor-pointer hover:bg-accent/50' : 'text-muted-foreground'}`}
                        >
                          <span className="inline-flex items-start gap-2">
                            {pr.description || '—'}
                            {copiedId === `prj-${pr.id}-desc` && <Check className="inline h-3.5 w-3.5 text-success shrink-0 mt-0.5" />}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => removeProject(pr.id)}
                      aria-label="Remove project"
                      className="text-destructive hover:text-destructive/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden />
                    </button>
                  )}
                </div>
              </Card>
            ))}
            {profile.projects.length === 0 && (
              <p className="text-sm text-muted-foreground">No projects added yet.</p>
            )}
          </div>
        </Section>

        {/* Skills */}
        <Section
          title="Skills"
          action={isEditing && <Button onClick={addSkillGroup} icon={<Plus className="h-4 w-4" />}>Add skill group</Button>}
        >
          <div className="space-y-6">
            {profile.skills.map((group) => (
              <Card key={group.id}>
                <div className="flex justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex gap-3">
                      <CopyableField label="Sub-heading name" value={group.name} onChange={(v) => updateSkillGroup(group.id, { name: v })} isEditing={isEditing} copyId={`skill-${group.id}-name`} isCopied={copiedId === `skill-${group.id}-name`} onCopy={copyToClipboard} placeholder="e.g. Programming" className="flex-1" />
                      {isEditing && (
                        <select
                          value={group.type}
                          onChange={(e) => updateSkillGroup(group.id, { type: e.target.value as SkillGroup['type'] })}
                          className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
                        >
                          {SKILL_TYPES.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      )}
                    </div>
                    <SkillTags items={group.items} onAdd={(item) => addSkillItem(group.id, item)} onRemove={(i) => removeSkillItem(group.id, i)} isEditing={isEditing} onCopy={copyToClipboard} copiedId={copiedId} groupId={group.id} />
                  </div>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => removeSkillGroup(group.id)}
                      aria-label="Remove skill group"
                      className="text-destructive hover:text-destructive/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden />
                    </button>
                  )}
                </div>
              </Card>
            ))}
            {profile.skills.length === 0 && (
              <p className="text-sm text-muted-foreground">No skill groups added yet.</p>
            )}
          </div>
        </Section>

        {/* Certifications */}
        <Section
          title="Certifications"
          action={isEditing && <Button onClick={addCertification} icon={<Plus className="h-4 w-4" />}>Add certification</Button>}
        >
          <div className="space-y-6">
            {profile.certifications.map((cert) => (
              <Card key={cert.id}>
                <div className="flex justify-between gap-4">
                  <div className="flex-1 grid gap-3 sm:grid-cols-2">
                    <Input label="Name" value={cert.name} onChange={(v) => updateCertification(cert.id, { name: v })} />
                    <Input label="Issuer" value={cert.issuer} onChange={(v) => updateCertification(cert.id, { issuer: v })} />
                    <Input label="Date" value={cert.date} onChange={(v) => updateCertification(cert.id, { date: v })} />
                    <Input label="URL" value={cert.url ?? ''} onChange={(v) => updateCertification(cert.id, { url: v })} />
                  </div>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => removeCertification(cert.id)}
                      aria-label="Remove certification"
                      className="text-destructive hover:text-destructive/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden />
                    </button>
                  )}
                </div>
              </Card>
            ))}
            {profile.certifications.length === 0 && (
              <p className="text-sm text-muted-foreground">No certifications added yet.</p>
            )}
          </div>
        </Section>

        {/* Links */}
        <Section title="Links">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="LinkedIn" value={profile.links.linkedin ?? ''} onChange={(v) => updateLink('linkedin', v)} placeholder="https://linkedin.com/in/..." />
            <Input label="GitHub" value={profile.links.github ?? ''} onChange={(v) => updateLink('github', v)} placeholder="https://github.com/..." />
            <Input label="Portfolio" value={profile.links.portfolio ?? ''} onChange={(v) => updateLink('portfolio', v)} placeholder="https://..." className="sm:col-span-2" />
            <Input label="Website" value={profile.links.website ?? ''} onChange={(v) => updateLink('website', v)} placeholder="https://..." />
          </div>
        </Section>

        <div className="flex flex-wrap justify-end gap-3 pt-4 sm:gap-4">
          <Link
            href="/"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Cancel
          </Link>
          <button
            type="button"
            className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Save & Sync with Google
          </button>
        </div>
      </main>
    </div>
  );
}

function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      {children}
    </div>
  );
}

function Input({
  id: providedId,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  disabled,
  className,
}: {
  id?: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}) {
  const fallbackId = useId();
  const inputId = providedId ?? fallbackId;
  return (
    <div className={className}>
      <label htmlFor={inputId} className="text-sm text-muted-foreground">
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="mt-1 w-full min-w-0 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}

function CopyableField({
  label,
  value,
  onChange,
  isEditing,
  copyId,
  isCopied,
  onCopy,
  placeholder,
  type = 'text',
  disabled,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  isEditing: boolean;
  copyId: string;
  isCopied: boolean;
  onCopy: (text: string, id: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
}) {
  if (isEditing) {
    return (
      <Input
        label={label}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={className}
      />
    );
  }
  return (
    <div className={className}>
      <label className="text-sm text-muted-foreground">{label}</label>
      <div
        role="button"
        tabIndex={0}
        aria-label={value.trim() ? 'Copy to clipboard' : undefined}
        onClick={() => value.trim() && onCopy(value, copyId)}
        onKeyDown={(e) => value.trim() && (e.key === 'Enter' || e.key === ' ') && onCopy(value, copyId)}
        className={`mt-1 rounded-lg px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring ${value.trim() ? 'cursor-pointer hover:bg-accent/50' : 'text-muted-foreground'}`}
      >
        <span className="inline-flex min-w-0 items-center gap-2 break-words">
          {value || '—'}
          {isCopied && <Check className="inline h-3.5 w-3.5 shrink-0 text-success" aria-hidden />}
        </span>
      </div>
    </div>
  );
}

function Button({
  onClick,
  children,
  icon,
}: {
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm font-medium hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {icon}
      {children}
    </button>
  );
}

function SkillTags({
  items,
  onAdd,
  onRemove,
  isEditing,
  onCopy,
  copiedId,
  groupId,
}: {
  items: string[];
  onAdd: (item: string) => void;
  onRemove: (index: number) => void;
  isEditing?: boolean;
  onCopy?: (text: string, id: string) => void;
  copiedId?: string | null;
  groupId?: string;
}) {
  const [input, setInput] = useState('');
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span
            key={i}
            role={!isEditing && onCopy ? 'button' : undefined}
            tabIndex={!isEditing && onCopy ? 0 : undefined}
            aria-label={!isEditing && onCopy ? 'Copy to clipboard' : undefined}
            onClick={() => !isEditing && onCopy && groupId && onCopy(item, `skill-${groupId}-item-${i}`)}
            onKeyDown={(e) => !isEditing && onCopy && groupId && (e.key === 'Enter' || e.key === ' ') && onCopy(item, `skill-${groupId}-item-${i}`)}
            className={`inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-sm text-primary min-w-0 ${!isEditing && onCopy ? 'cursor-pointer hover:bg-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1' : ''}`}
          >
            <span className="truncate">{item}</span>
            {isEditing && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onRemove(i); }}
                aria-label={`Remove ${item}`}
                className="shrink-0 hover:text-destructive focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              >
                ×
              </button>
            )}
            {!isEditing && copiedId === `skill-${groupId}-item-${i}` && <Check className="h-3 w-3 shrink-0" aria-hidden />}
          </span>
        ))}
        {isEditing && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onAdd(input);
              setInput('');
            }}
            className="inline-flex"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="+ Add skill"
              aria-label="Add skill"
              className="w-24 min-w-0 rounded border-0 bg-transparent px-1 py-0.5 text-sm outline-none focus:ring-0"
            />
          </form>
        )}
      </div>
    </div>
  );
}
