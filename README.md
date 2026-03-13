# Rolecraft

**AI-powered job application autofill — bring your own API key.**

Rolecraft is an open-source browser extension that fills out job applications using AI. Unlike subscription-based tools, you use your own API key from OpenAI, Anthropic, Google Gemini, or a local model via Ollama. No middleman, no monthly fees, full privacy.

---

## Features

- **Bring Your Own Key (BYOK)** — Use your existing API key from any supported provider
- **Multi-Provider Support** — OpenAI, Anthropic, Google Gemini, Ollama (local)
- **Smart Form Detection** — Automatically detects job application form fields
- **Profile Management** — Save your info once, autofill everywhere
- **Cover Letter Generation** — AI-generated cover letters tailored to each job
- **Privacy-First** — Your data stays in your browser. No telemetry, no analytics, no external servers
- **Open Source** — MIT licensed, fully transparent

## Supported Providers

| Provider  | Models                          | Local? |
| --------- | ------------------------------- | ------ |
| OpenAI    | GPT-4o, GPT-4o-mini, etc.      | No     |
| Anthropic | Claude 3.5 Sonnet, Haiku, etc. | No     |
| Gemini    | Gemini Pro, Flash, etc.         | No     |
| Ollama    | Any local model                 | Yes    |

## Quick Start

### 1. Build Your Profile (Web)

```bash
cd Rolecraft
npm install
npm run dev:web
```

Open [http://localhost:3000](http://localhost:3000) → **Build Profile** to add your details (name, experience, education, skills, projects). Export as JSON when done.

### 2. Install the Extension

```bash
npm run build
```

Load the `dist/` folder as an unpacked extension in Chrome (`chrome://extensions` → Load unpacked). Add your API key in the extension options, then import your profile (or use the synced profile once Google auth is configured).

### Usage

1. Click the Rolecraft extension icon
2. Go to **Settings** and add your API key
3. Fill in your profile (name, experience, education, skills)
4. Navigate to any job application
5. Click the Rolecraft overlay or use the keyboard shortcut to autofill

## Development

```bash
# Install dependencies
npm install

# Start dev server with hot reload
npm run dev

# Run tests
npm run test

# Lint and type check
npm run lint && npm run typecheck
```

See [docs/SETUP.md](docs/SETUP.md) for detailed setup instructions.

## Documentation

- [Architecture](docs/ARCHITECTURE.md) — Extension + web dashboard overview
- [AI Fill Strategy](docs/AI_FILL_STRATEGY.md) — How AI fills known vs unknown fields
- [Setup](docs/SETUP.md) — Development environment setup
- [Contributing](docs/CONTRIBUTING.md) — How to contribute
- [Adding Providers](docs/ADDING_PROVIDERS.md) — How to add a new AI provider

## Contributing

Contributions are welcome! Please read our [Contributing Guide](docs/CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before getting started.

## Security

Found a vulnerability? Please see [SECURITY.md](SECURITY.md) for responsible disclosure guidelines.

## License

[MIT](LICENSE) — Use it, fork it, build on it.
