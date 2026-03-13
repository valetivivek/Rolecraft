/**
 * Full Rolecraft profile schema — used by web dashboard and extension.
 * AI fills unknown fields during autofill based on known profile data.
 */

export interface UserProfile {
  /** Personal info */
  personal: PersonalInfo;

  /** Work history — previous and current jobs */
  experience: WorkExperience[];

  /** Education history */
  education: Education[];

  /** Skills — technical, soft, tools, languages */
  skills: SkillGroup[];

  /** Projects — side projects, open source, portfolio */
  projects: Project[];

  /** Certifications, licenses */
  certifications: Certification[];

  /** Links — LinkedIn, portfolio, GitHub, etc. */
  links: ProfileLinks;

  /** Professional summary — used for cover letters and "about" fields */
  summary: string;

  /** Optional: preferred job types, locations, salary (for AI context) */
  preferences?: JobPreferences;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  /** Country code for phone, e.g. +1, +91 */
  phoneCountryCode?: string;
  /** City */
  city?: string;
  /** State or province */
  state?: string;
  /** Zip or postal code */
  zipCode?: string;
  /** Full location string (legacy / fallback) */
  location: string;
  timezone?: string;
  willingToRelocate?: boolean;
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  /** Key achievements, bullet points */
  highlights?: string[];
  /** Skills used in this role (for matching) */
  skillsUsed?: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  field: string;
  location?: string;
  startDate: string;
  graduationDate: string;
  /** GPA, e.g. 3.8/4.0 or 9.2/10 */
  gpa?: string;
  /** Honors, activities */
  highlights?: string[];
}

export interface SkillGroup {
  id: string;
  name: string;
  /** e.g. "Technical", "Languages", "Tools", "Soft Skills" */
  type: 'technical' | 'language' | 'tool' | 'soft' | 'other';
  items: string[];
  /** Proficiency: beginner, intermediate, advanced, expert */
  proficiency?: Record<string, 'beginner' | 'intermediate' | 'advanced' | 'expert'>;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  /** Tech stack, role, outcomes */
  highlights?: string[];
  /** Skills demonstrated */
  skills?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  expiryDate?: string;
}

export interface ProfileLinks {
  linkedin?: string;
  github?: string;
  portfolio?: string;
  website?: string;
  twitter?: string;
  other?: { label: string; url: string }[];
}

export interface JobPreferences {
  jobTypes?: string[];
  locations?: string[];
  remotePreference?: 'remote' | 'hybrid' | 'onsite' | 'any';
  salaryMin?: number;
  salaryMax?: number;
  noticePeriod?: string;
}

/** Minimal profile for backward compatibility and extension storage */
export interface MinimalProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneCountryCode?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
  experience: { title: string; company: string; startDate: string; endDate: string; current: boolean; description: string }[];
  education: { degree: string; institution: string; field: string; graduationDate: string; gpa?: string }[];
  skills: string[];
}

/** Convert full profile to minimal (for extension fallback) */
export function toMinimalProfile(profile: UserProfile): MinimalProfile {
  const loc = [profile.personal.city, profile.personal.state, profile.personal.zipCode]
    .filter(Boolean)
    .join(', ') || profile.personal.location;
  return {
    firstName: profile.personal.firstName,
    lastName: profile.personal.lastName,
    email: profile.personal.email,
    phone: profile.personal.phone,
    phoneCountryCode: profile.personal.phoneCountryCode,
    city: profile.personal.city,
    state: profile.personal.state,
    zipCode: profile.personal.zipCode,
    location: loc,
    linkedin: profile.links.linkedin ?? '',
    website: profile.links.website ?? profile.links.portfolio ?? '',
    summary: profile.summary,
    experience: profile.experience.map((e) => ({
      title: e.title,
      company: e.company,
      startDate: e.startDate,
      endDate: e.endDate,
      current: e.current,
      description: e.description,
    })),
    education: profile.education.map((e) => ({
      degree: e.degree,
      institution: e.institution,
      field: e.field,
      graduationDate: e.graduationDate,
      gpa: e.gpa,
    })),
    skills: profile.skills.flatMap((g) => g.items),
  };
}

export function generateId(): string {
  return crypto.randomUUID();
}

/** Create empty profile template */
export function createEmptyProfile(): UserProfile {
  return {
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    links: {},
    summary: '',
  };
}
