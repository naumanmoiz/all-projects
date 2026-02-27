# Security Policy

## Reporting a Vulnerability

**Do NOT open a public GitHub issue for security vulnerabilities.**

If you discover a security vulnerability in this project, please report it responsibly through one of the following channels:

1. **GitHub Private Vulnerability Reporting**: Use [GitHub's private vulnerability reporting](https://github.com/naumanmoiz/all-projects/security/advisories/new) to submit a confidential report directly through the repository.
2. **Email**: Send a detailed report to the repository owner via their [GitHub profile](https://github.com/naumanmoiz).

### What to Include in Your Report

- Description of the vulnerability and its potential impact
- Steps to reproduce the issue
- Affected files, components, or versions
- Any proof-of-concept code or screenshots
- Suggested fix, if available

### Response Timeline

| Action | Timeframe |
|---|---|
| Acknowledgment of report | 48 hours |
| Initial assessment | 5 business days |
| Fix development and testing | 14 business days |
| Public disclosure (after fix) | 30 days from report |

We will work with you to understand and address the issue before any public disclosure.

---

## Supported Versions

Only the latest commit on the `master` branch is supported with security updates. There are no versioned releases.

| Branch | Supported |
|---|---|
| `master` (latest) | Yes |
| All other branches | No |

---

## Security Requirements

### Secrets and Credentials

- **NEVER** hardcode credentials, API keys, tokens, passwords, or connection strings in source code
- **ALL** secrets must be loaded from environment variables (`process.env.*`) or a secrets manager
- `.env` files must **NEVER** be committed — they are excluded via `.gitignore`
- Use `.env.example` as a template with placeholder values only (no real credentials)
- Database connection strings, including MongoDB URIs, must always use environment variables

### Code Contributions

All contributions must adhere to the following:

1. **No secrets in code or commit messages** — Commits containing secrets will be rejected and scrubbed from history
2. **No secrets in comments or documentation** — Do not reference real credentials, even partially
3. **Dependency review** — New dependencies must not introduce known vulnerabilities
4. **Input validation** — All user-facing input must be validated and sanitized
5. **No eval or dynamic code execution** — Avoid `eval()`, `Function()`, and similar constructs
6. **Parameterized queries** — Never construct database queries via string concatenation

### Dependency Management

- Dependencies should be kept up to date
- `npm audit` (or equivalent) must pass with zero critical or high severity vulnerabilities before merging
- Lock files (`package-lock.json`) must be committed to ensure reproducible builds
- Avoid dependencies with no maintenance activity, known vulnerabilities, or excessive permissions

---

## Prohibited Practices

The following are **strictly prohibited** in this repository:

| Practice | Reason |
|---|---|
| Hardcoded secrets in any file | Credential exposure risk |
| Committing `.env` files | Contains live secrets |
| Disabling SSL/TLS verification | Man-in-the-middle attack risk |
| Using `--no-verify` on git hooks | Bypasses security checks |
| Storing secrets in git history | Persists in repo even after deletion |
| Using HTTP for external API calls | Data transmitted in plaintext |
| Wildcard CORS (`*`) in production | Cross-origin attack surface |
| Running applications as root | Privilege escalation risk |
| Logging secrets or tokens | Credential exposure via log files |
| Committing private keys or certificates | Key compromise risk |

---

## Automated Security Controls

### GitHub Features (Enabled)

- **Secret Scanning** — Detects accidentally committed secrets
- **Secret Scanning Push Protection** — Blocks pushes containing detected secrets
- **Dependabot Alerts** — Monitors dependencies for known vulnerabilities

### Pre-commit Protections (Recommended)

Contributors should install pre-commit hooks to catch issues before they reach the repository:

```bash
# Install gitleaks for local secret scanning
# https://github.com/gitleaks/gitleaks
gitleaks detect --source . --verbose
```

---

## Incident Response

In the event of a confirmed security incident:

1. **Contain** — Immediately revoke or rotate any exposed credentials
2. **Assess** — Determine the scope and impact of the exposure
3. **Remediate** — Scrub secrets from git history using `git-filter-repo`, force push cleaned history
4. **Notify** — Inform affected parties if data was exposed
5. **Review** — Conduct a post-incident review and update controls to prevent recurrence

---

## Disclosure Policy

- Vulnerabilities will be disclosed publicly only **after** a fix has been deployed
- Credit will be given to the reporter unless they request anonymity
- We follow [coordinated vulnerability disclosure](https://en.wikipedia.org/wiki/Coordinated_vulnerability_disclosure) principles

---

## Security Contact

For security-related inquiries, use [GitHub Private Vulnerability Reporting](https://github.com/naumanmoiz/all-projects/security/advisories/new) or contact the repository owner through their [GitHub profile](https://github.com/naumanmoiz).
