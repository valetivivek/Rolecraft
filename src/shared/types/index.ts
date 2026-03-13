export interface AIProvider {
  readonly name: string;
  readonly displayName: string;
  readonly models: ModelOption[];

  generateFill(prompt: string, context: FormContext): Promise<FillResult>;
  generateCoverLetter(context: CoverLetterContext): Promise<string>;
  validateKey(key: string): Promise<boolean>;
}

export interface ModelOption {
  id: string;
  name: string;
  contextWindow: number;
}

export interface FormField {
  id: string;
  type: string;
  label: string;
  name: string;
  placeholder: string;
  required: boolean;
  options?: string[];
}

export interface FormContext {
  url: string;
  jobTitle: string;
  company: string;
  fields: FormField[];
}

export interface FillResult {
  fields: Record<string, string>;
  confidence: number;
}

export interface CoverLetterContext {
  jobTitle: string;
  company: string;
  jobDescription: string;
  profile: UserProfile;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: string[];
}

export interface WorkExperience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  field: string;
  graduationDate: string;
}

export interface StorageSchema {
  profile: UserProfile;
  apiKeys: Record<string, string>;
  activeProvider: string;
  activeModel: string;
  preferences: UserPreferences;
  usage: UsageStats;
}

export interface UserPreferences {
  autoDetect: boolean;
  showOverlay: boolean;
  keyboardShortcut: string;
}

export interface UsageStats {
  totalFills: number;
  tokenEstimate: number;
}

export type ProviderErrorType =
  | 'INVALID_KEY'
  | 'RATE_LIMITED'
  | 'QUOTA_EXCEEDED'
  | 'NETWORK_ERROR'
  | 'MODEL_ERROR';

export class ProviderError extends Error {
  constructor(
    public readonly type: ProviderErrorType,
    message: string,
    public readonly provider: string,
  ) {
    super(message);
    this.name = 'ProviderError';
  }
}
