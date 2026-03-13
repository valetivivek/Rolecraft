# Contributing to Rolecraft

Thanks for your interest in contributing to Rolecraft! This guide will help you get started.

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- Chrome or Firefox (for testing)

### Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/Rolecraft.git
cd Rolecraft

# Install dependencies
npm install

# Start development server
npm run dev
```

### Loading the Extension

**Chrome:**
1. Navigate to `chrome://extensions`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `dist/` folder

**Firefox:**
1. Navigate to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select any file in the `dist/` folder

## Development Workflow

### Branch Naming

- `feature/<description>` — New features
- `fix/<description>` — Bug fixes
- `docs/<description>` — Documentation
- `refactor/<description>` — Code restructuring

### Making Changes

1. Fork the repository
2. Create a feature branch from `dev`
3. Make your changes
4. Write/update tests
5. Run the full check suite:

```bash
npm run lint
npm run typecheck
npm run test
```

6. Commit using [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add Google Gemini provider support
fix: handle empty form fields in autofill
docs: update provider integration guide
```

7. Push and open a Pull Request against `dev`

### Code Style

- TypeScript strict mode — no `any` unless absolutely necessary
- Functional React components with hooks
- Prettier for formatting (runs on save)
- ESLint for linting

### Testing

- Write unit tests for all utility functions and provider adapters
- Write component tests for React UI using Testing Library
- Test content scripts with jsdom mocks for `chrome.*` APIs
- E2E tests for critical user flows

### Adding a New AI Provider

See [docs/ADDING_PROVIDERS.md](./ADDING_PROVIDERS.md) for a step-by-step guide.

## Pull Request Guidelines

- Keep PRs focused — one feature or fix per PR
- Include a description of what changed and why
- Add screenshots for UI changes
- Ensure all CI checks pass
- Be responsive to review feedback

## Reporting Issues

- Use GitHub Issues
- Include browser version and OS
- Include steps to reproduce
- Include expected vs actual behavior
- Add screenshots if relevant

## Community

- Be respectful and constructive
- Follow our [Code of Conduct](../CODE_OF_CONDUCT.md)
- Ask questions in GitHub Discussions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
