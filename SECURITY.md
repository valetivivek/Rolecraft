# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| latest  | Yes                |

## Reporting a Vulnerability

If you discover a security vulnerability in Rolecraft, please report it responsibly.

**Do NOT open a public GitHub issue for security vulnerabilities.**

Instead, please email **[INSERT EMAIL]** with:

1. Description of the vulnerability
2. Steps to reproduce
3. Potential impact
4. Suggested fix (if any)

We will acknowledge your report within 48 hours and aim to release a fix within 7 days for critical issues.

## Security Design Principles

Rolecraft is designed with security as a core principle:

- **No backend server** — The extension communicates directly with AI provider APIs. There is no intermediary server that could be compromised.
- **Local storage only** — API keys are stored in `chrome.storage.local` and never leave the browser.
- **No telemetry** — We collect zero data about users or their usage.
- **Strict CSP** — Content Security Policy prevents code injection.
- **No eval** — No dynamic code execution anywhere in the codebase.
- **Shadow DOM isolation** — Extension UI is isolated from host page scripts and styles.
- **HTTPS only** — All API calls use HTTPS.

## Scope

The following are in scope for security reports:

- API key exposure or leakage
- Cross-site scripting (XSS) in extension pages
- Content script injection vulnerabilities
- Privilege escalation
- Data exfiltration from stored profiles
- CSP bypass

## Out of Scope

- Security issues in third-party AI provider APIs
- Social engineering attacks
- Issues requiring physical access to the user's machine
- Browser vulnerabilities
