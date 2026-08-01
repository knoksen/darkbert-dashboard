# Contributing to DarkBERT Dashboard

This document defines the expected workflow for contributing code, tests, and documentation to this repository.

## Development Workflow

1. Fork or clone the repository.
2. Create a feature branch from your working base.
3. Make focused changes (single concern per PR where possible).
4. Run quality checks locally.
5. Open a pull request with clear description and validation evidence.

Recommended branch naming:

- `feat/<short-description>`
- `fix/<short-description>`
- `docs/<short-description>`
- `chore/<short-description>`

---

## Local Setup

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Configure environment values before running locally:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

---

## Code Style and Quality Requirements

Use the existing project tooling and configuration:

- ESLint config: `.eslintrc.cjs`
- Prettier config: `.prettierrc`
- TypeScript config: `tsconfig.json`

Run before creating a PR:

```bash
npm run lint
npm run format
npm run test
npm run build
```

Expectations:

- Keep changes type-safe and lint-clean.
- Avoid unrelated formatting-only diffs in feature PRs unless explicitly scoped.
- Add or update tests when behavior changes.

---

## Pull Request Requirements

Each pull request should include:

1. **Summary**
   - What changed and why.
2. **Scope**
   - Frontend/backend/docs areas touched.
3. **Validation**
   - Commands run (`lint`, `test`, `build`, manual checks).
4. **UI evidence (if applicable)**
   - Screenshots or short recordings for visual changes.
5. **Risk / rollback notes**
   - Any migration, env, or deployment impact.

Checklist before requesting review:

- [ ] Changes are focused and coherent.
- [ ] Lint/tests/build pass locally.
- [ ] Documentation updated (README/docs) if behavior/config changed.
- [ ] No secrets or credentials committed.
- [ ] PR title and description are clear.

---

## Testing Guidance

Minimum expectation for code changes:

- Run:
  ```bash
  npm run test
  ```
- If frontend behavior changes, include component/integration coverage where practical.
- If backend contracts change, document request/response updates in `README.md`.

---

## Commit Message Guidance

Use clear, scoped messages. Examples:

- `feat(dashboard): add training trend tooltip`
- `fix(api): handle timeout errors in metrics fetch`
- `docs(readme): expand docker and env setup steps`

---

## Reporting Issues

When opening an issue, include:

- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node/Python versions, Docker version)
- Relevant logs or screenshots

---

## Security

Do not disclose vulnerabilities publicly in issues or PRs.  
Follow the process in [SECURITY.md](SECURITY.md) for responsible disclosure.
