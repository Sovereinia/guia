---
name: guia-deploy
description: >
  Local build/deploy for sovereinia/guia using scripts/deploy-local.sh (mirrors
  .github/workflows/deploy-to-vm.yml). Trigger on /guia-deploy, deploy guia,
  ship guia, verify guia build, smoke-test sovereinia.org/guia, merge/land a PR
  to main (that is a production deploy via CI), or skip slow Actions when VM SSH
  is available. Prefer this over reimplementing npm/rsync/curl. After any merge
  to main, always run deploy checks (verify and/or smoke).
compatibility: >
  Node 22+ (required; Node 18 fails vite/tailwind native bindings). npm, curl.
  rsync+ssh only for rsync/deploy/ship. deploy@sovereinia.org key for production push.
metadata:
  short-description: "guia verify/build/deploy/smoke; checks required on PR merge"
---

# guia-deploy

Fast local path for the same pipeline CI runs on `main`. **Do not modify or remove** `.github/workflows/deploy-to-vm.yml` — keep Actions for merges and contributors without VM access.

Entrypoint (always from **guia repo root**):

```bash
chmod +x scripts/deploy-local.sh   # once if needed
./scripts/deploy-local.sh <cmd>
```

Script enforces Node 22+ and checks for `rsync`/`ssh`/`curl` on relevant steps.

## Command chooser (pick one)

| User intent | Command | Needs SSH key? | Touches prod? |
|-------------|---------|----------------|---------------|
| Tests + build only / PR gate (before merge) | `verify` | No | No |
| Just produce `dist/` | `build` | No | No |
| Is production up? / post-deploy health | `smoke` | No | No (read-only HTTP) |
| Merge/land PR to `main` (CI will deploy — **treat as deploy**) | see **PR merge = deployment** below | No for checks | **Yes** (via Actions) |
| Push current tree fast (no unit tests) | `deploy` | Yes | **Yes** |
| Push with checks (default for “ship/release/deploy properly”) | `ship` | Yes | **Yes** |
| Only sync existing `dist/` | `rsync` | Yes | **Yes** |

If unclear and they want production updated without going through GitHub → **`ship`** (if key) else **`verify`** + explain CI-on-merge path.

## PR merge = deployment (mandatory checks)

Merging a PR into **`main` is a production deployment** for this repo: `.github/workflows/deploy-to-vm.yml` runs on push to `main` and rsyncs `dist/` to `https://sovereinia.org/guia/`. Treat any “merge/land/ship this PR” request as **deploy work**, not a pure git chore.

### Before merge (agent must run checks)

Do **not** merge until local gate passes (unless user explicitly overrides after you report failure):

1. Preflight (repo root, Node 22+).
2. **`./scripts/deploy-local.sh verify`** on the PR head / branch about to merge (checkout that ref if needed).
3. Report pass/fail with short SHA. On failure: fix or stop — do not merge broken builds.
4. Only then merge if the user asked to merge (e.g. `gh pr merge`), or tell them it’s safe to merge.

Optional extra before merge: **`smoke`** against current production (baseline only; does not validate the new build yet).

### After merge (agent must run checks)

CI deploys asynchronously. Still run skill checks so the session confirms the deploy path:

1. Note merged SHA / PR number.
2. **`./scripts/deploy-local.sh verify`** on updated **`main`** (`git fetch && git checkout main && git pull`) — confirms what CI is building still passes locally.
3. Wait briefly for Actions if useful (`gh run list --branch main --limit 1` or `gh pr checks` / workflow runs), but **do not skip local checks** just because CI exists.
4. **`./scripts/deploy-local.sh smoke`** — confirm live `https://sovereinia.org/guia/` returns 200 after deploy (retry once after ~30–60s if first smoke fails and workflow may still be running; then report failure, don’t loop forever).
5. If user has deploy key and CI is slow/stuck and they want the same commit live now: **`ship`** from `main` (coordinates with “last rsync wins”).

### What “checks” means here

| Step | Command | Why |
|------|---------|-----|
| Gate | `verify` | Same confidence as tests + production build before/after land |
| Live | `smoke` | Site actually serving after deploy |
| Optional maintainer fast path | `ship` / `deploy` | Local rsync when bypassing or backing up CI |

Merging without `verify` (before) and without `verify` + `smoke` (after, once merge is done) is incomplete deploy handling unless the user clearly waived checks.

## Preflight (agent does this before running)

1. **Repo root** — has `package.json`, `scripts/deploy-local.sh`, `vite.config.ts` with `base: '/guia/'`.
2. **Node** — `node -v` major ≥ 22. If not, stop and tell user to install/use Node 22 (CI uses `node-version: 22`). Do not proceed with Node 18 even if npm ci “works”.
3. **Git context** (before any prod command) — `git status -sb` and `git log -1 --oneline`. Warn if dirty; proceed only if user accepts deploying this working tree.
4. **Prod commands only** (`rsync`/`deploy`/`ship`):
   - `command -v rsync ssh curl`
   - Key: file exists at `SSH_IDENTITY_FILE` or `~/.ssh/deploy_key`, **or** agent has a key that works for `deploy@sovereinia.org`. If neither, run `verify`/`smoke` instead and explain how to set the key (same material as CI `secrets.SSH_PRIVATE_KEY`).

Optional env (defaults match workflow `env:`):

| Var | Default |
|-----|---------|
| `DEPLOY_HOST` | `sovereinia.org` |
| `DEPLOY_USER` | `deploy` |
| `DEPLOY_PATH` | `/srv/apps/sovereinia/guia/` |
| `SMOKE_URL` | `https://sovereinia.org/guia/` |
| `SSH_IDENTITY_FILE` | `~/.ssh/deploy_key` if present |
| `FORCE_NPM_CI=1` | force `npm ci` |
| `SKIP_NPM_CI=1` | skip install when `node_modules` exists |

Never change `DEPLOY_PATH` unless the user explicitly sets it (rsync `--delete` is destructive on the wrong path).

## Execute

```bash
./scripts/deploy-local.sh verify|build|smoke|deploy|ship|rsync
```

- Do **not** hand-roll parallel npm/rsync/curl unless the script is missing; fix/restore the script instead.
- One shot; on failure stop (no retry loops). Re-run only after fixing the reported error or on explicit user request.
- `deploy`/`ship` order: build or verify → rsync → smoke. If rsync fails, smoke is skipped (script stops).

## Interpret results

| Outcome | What to report |
|---------|----------------|
| `verify`/`build` OK | Short SHA; tests passed (verify); `dist/` built with `/guia/` assets |
| `smoke` OK | `GET https://sovereinia.org/guia/ -> 200` |
| `ship`/`deploy` OK | SHA + branch/dirty note; build OK; rsync OK; smoke 200; live URL |
| Node < 22 | Install/switch Node 22; cite CI workflow setup-node |
| `missing command: rsync` | Install rsync (or use verify/smoke only in this environment) |
| `Permission denied` / rsync 255 | Deploy key not loaded; point at `SSH_IDENTITY_FILE` / `~/.ssh/deploy_key` / `ssh-add`; do not fall back to force-pushing unless user wants Actions deploy via `main` |
| Unit/build errors | Paste failing command output; fix only if user asked to fix |
| Smoke non-200 after successful rsync | Remote/nginx issue possible; run `smoke` once more; optional `ssh deploy@… 'ls /srv/apps/sovereinia/guia/'` if SSH works — do not mass re-rsync |

## CI vs local

| | GitHub Actions | This skill |
|--|----------------|------------|
| Trigger | push `main`, `workflow_dispatch` | agent / maintainer on demand |
| Node | 22 on runner | 22+ on your machine (script-enforced) |
| Auth | `secrets.SSH_PRIVATE_KEY` | local key / agent |
| Artifact | runner `dist/` | local `dist/` |
| Overwrite risk | last successful rsync wins (Actions or local) | same — coordinate with team |

Contributors without VM SSH: run **`verify`** locally; merge/push `main` lets Actions deploy — still run **`verify` + `smoke`** around that merge (see **PR merge = deployment**).

## Do not

- Commit keys, tokens, or `~/.ssh/*`
- Disable/remove/bypass the Deploy to VM workflow
- Deploy from an unknown/wrong directory or override `DEPLOY_PATH` casually
- Claim production was updated unless rsync completed and smoke returned 200 **or** (CI-only path) merge completed **and** post-merge `smoke` returned 200
- Merge a PR to `main` without running **`verify` first** (and **`verify` + `smoke` after**) unless the user explicitly skips checks after you warned them
