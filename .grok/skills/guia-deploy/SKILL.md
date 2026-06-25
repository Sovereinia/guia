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

### After merge / push to `main` (agent must run checks)

CI deploys asynchronously. Local **`verify`** can run in parallel with Actions; **`smoke` must wait until the deploy workflow has finished** for that commit — otherwise you may pass/fail against the *previous* live site.

1. Note merged/pushed SHA / PR number (`HEAD` on `main`).
2. **`./scripts/deploy-local.sh verify`** on updated **`main`** (`git fetch && git checkout main && git pull`) — confirms what CI is building still passes locally. OK to run while Actions is in progress.
3. **Wait for production deploy workflow (required before smoke):**
   - Find the run for this commit:  
     `gh run list --branch main --workflow "Deploy to VM" --limit 5`  
     (or match `headSha` / display title to your SHA).
   - Block until that run completes:  
     `gh run watch <run-id> --exit-status`  
     (or poll `gh run view <run-id> --json status,conclusion` until `status` is `completed`).
   - If **`conclusion` is not `success`**: report CI failure (logs via `gh run view <run-id> --log-failed`); do **not** treat site as updated. Fix/re-run only if user wants; optional maintainer **`ship`** from `main` if key available and they accept bypassing broken Actions.
   - If no run appears within ~2 minutes after push: warn (workflow disabled / permissions / wrong branch) and either wait longer or use **`ship`** only with explicit user OK.
4. **Only after step 3 succeeds:** **`./scripts/deploy-local.sh smoke`** — confirm live `https://sovereinia.org/guia/` returns 200 for the newly deployed build.
   - One optional extra smoke ~15–30s later if first fails (CDN/nginx lag), then stop and diagnose — do not spam smoke while CI is still `in_progress`.
5. If user has deploy key, CI is failed/stuck, and they want the same commit live now: **`ship`** from `main` (last rsync wins; still run **`smoke` after local rsync**, not after a still-running Actions job).

### What “checks” means here

| Step | Command / action | Why |
|------|------------------|-----|
| Gate | `verify` | Same confidence as tests + production build before/after land |
| Deploy done? | `gh run watch` on **Deploy to VM** for this SHA | Smoke is meaningless until rsync on the VM finished |
| Live | `smoke` (**after** workflow `success`) | Site actually serving the new build |
| Optional maintainer fast path | `ship` / `deploy` then `smoke` | Local rsync when bypassing or backing up CI |

Merging/pushing without **`verify` before** (when you control the land) and without **`verify` + wait for Deploy to VM + `smoke` after** is incomplete deploy handling unless the user clearly waived checks.

### Anti-patterns (do not do this)

- Run **`smoke` immediately after `git push` / `gh pr merge`** while Actions is still queued or in progress.
- Report “site is live with commit X” based only on a green **`verify`** or an in-progress workflow.
- Treat **`smoke` 200** as proof of *this* deploy if you never confirmed the workflow for *this* SHA succeeded (could be previous deploy still serving).

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
- Claim production was updated unless: local **`ship`/`deploy` rsync completed + `smoke` 200**, **or** (CI path) **Deploy to VM succeeded for this SHA + `smoke` 200**
- Merge/push to `main` without **`verify` first** (when feasible) and without **`verify` + wait for Deploy to VM + `smoke` after**, unless the user explicitly skips checks after you warned them
- Run post-merge **`smoke` before** the deploy workflow for that commit has **`conclusion: success`**
