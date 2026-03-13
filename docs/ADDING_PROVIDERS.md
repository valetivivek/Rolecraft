# Adding a New AI Provider

This guide walks through adding a new AI provider to Rolecraft.

## Step 1: Create the Provider Adapter

Create `src/providers/<provider-name>.ts`:

```typescript
import type { AIProvider, FormContext, FillResult, ModelOption } from '../shared/types';

export class MyProvider implements AIProvider {
  readonly name = 'my-provider';
  readonly displayName = 'My Provider';
  readonly models: ModelOption[] = [
    { id: 'model-1', name: 'Model One', contextWindow: 128000 },
  ];

  async generateFill(prompt: string, context: FormContext): Promise<FillResult> {
    // Implement API call and response parsing
  }

  async generateCoverLetter(context: CoverLetterContext): Promise<string> {
    // Implement cover letter generation
  }

  async validateKey(key: string): Promise<boolean> {
    // Make a lightweight API call to verify the key works
  }
}
```

## Step 2: Register the Provider

Add to `src/providers/registry.ts`:

```typescript
import { MyProvider } from './my-provider';

export const providers = {
  // ...existing providers
  'my-provider': new MyProvider(),
};
```

## Step 3: Add UI Options

Update the options page to include the new provider:
- Add API key input field
- Add model selector
- Add any provider-specific settings

## Step 4: Write Tests

Create `src/providers/__tests__/my-provider.test.ts`:

- Test `validateKey` with valid and invalid keys
- Test `generateFill` with sample form contexts
- Test error handling (network errors, invalid responses, rate limits)
- Mock the HTTP calls — don't hit real APIs in tests

## Step 5: Update Documentation

- Add provider to the README's supported providers list
- Document any provider-specific setup (e.g., "create an API key at ...")

## Provider Requirements

- Must implement the full `AIProvider` interface
- Must handle all error types and map to `ProviderError`
- Must validate API keys without consuming significant quota
- Must support streaming responses (optional but preferred)
- Must not store API keys anywhere other than `chrome.storage.local`
