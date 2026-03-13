import type { AIProvider } from '@/shared/types';

const providers = new Map<string, AIProvider>();

export function registerProvider(provider: AIProvider): void {
  providers.set(provider.name, provider);
}

export function getProvider(name: string): AIProvider | undefined {
  return providers.get(name);
}

export function getAllProviders(): AIProvider[] {
  return Array.from(providers.values());
}

export function getProviderNames(): string[] {
  return Array.from(providers.keys());
}
