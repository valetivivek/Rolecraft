# AI Fill Strategy — Unknown Fields

Rolecraft uses AI to fill job application fields. When a field has a direct match in the user's profile, we use that value. When a field is **unknown** (no clear mapping, or requires synthesis), we ask the AI to generate an appropriate answer.

## Data Flow

```
Form Field (label, type, context)
       │
       ▼
┌──────────────────┐
│ Field Mapper     │  → Known field? Use profile value
└────────┬─────────┘
         │ Unknown / needs synthesis?
         ▼
┌──────────────────┐
│ AI Provider      │  → Generate from profile + job context
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Fill Result      │  → User reviews before submit (optional)
└──────────────────┘
```

## Known vs Unknown Fields

### Known Fields (Direct Mapping)

| Form Field Type | Profile Source | Example |
|-----------------|----------------|---------|
| First name | `profile.personal.firstName` | "Jane" |
| Last name | `profile.personal.lastName` | "Doe" |
| Email | `profile.personal.email` | "jane@example.com" |
| Phone | `profile.personal.phone` | "+1 555-123-4567" |
| Location | `profile.personal.location` | "San Francisco, CA" |
| LinkedIn | `profile.links.linkedin` | "https://linkedin.com/in/janedoe" |
| Portfolio | `profile.links.portfolio` | "https://janedoe.dev" |
| Summary / About | `profile.summary` | Full summary text |
| Work history | `profile.experience` | Formatted bullets |
| Education | `profile.education` | Formatted list |
| Skills | `profile.skills` (flattened) | "React, TypeScript, Node.js" |

### Unknown Fields (AI Generation)

These require AI to synthesize an answer from profile + job context:

| Form Field Type | AI Strategy | Example Prompt Context |
|-----------------|-------------|------------------------|
| "Why do you want to work here?" | Use summary + job title + company | "Generate 2-3 sentences for a Software Engineer role at Acme Corp" |
| "Describe a challenge you overcame" | Use experience highlights | "Pick a relevant example from work history, expand into STAR format" |
| "Salary expectations" | Use preferences if set, else suggest based on role/location | "Role: Senior Engineer, Location: SF. Suggest reasonable range." |
| "Availability / Start date" | Use preferences.noticePeriod or generate | "Standard 2 weeks notice" |
| "How did you hear about us?" | Generate plausible options | "LinkedIn, company website, referral" |
| Custom essay questions | Full context: profile + job description | "Answer in 150 words based on profile and job requirements" |
| Cover letter | `generateCoverLetter()` | Full letter from profile + job |

## Prompt Structure for Unknown Fields

When the AI fills an unknown field, we send:

```typescript
{
  systemPrompt: "You are helping fill a job application. Use ONLY the provided profile. Be concise and professional.",
  userPrompt: `
    Job: ${jobTitle} at ${company}
    Field: "${fieldLabel}" (type: ${fieldType})
    Max length: ${maxLength} chars
    
    Profile summary: ${profile.summary}
    Relevant experience: ${relevantExperience}
    Skills: ${skills}
    
    Generate an appropriate value for this field. Output ONLY the value, no explanation.
  `
}
```

## Confidence & Review

- **High confidence**: Direct profile match → auto-fill
- **Medium confidence**: AI generation from strong profile context → suggest, user can edit
- **Low confidence**: Ambiguous field or thin profile → show placeholder, prompt user to fill manually

## Profile Completeness

The more complete the profile, the better AI fills:

- **Personal info**: Required for basic fields
- **Experience + highlights**: Critical for behavioral questions
- **Skills**: Required for "skills" fields and matching
- **Projects**: Helps with "portfolio" and "side projects" questions
- **Summary**: Used for "about" and cover letter generation

Empty or sparse profile sections reduce AI quality. The web dashboard encourages users to fill all sections.
