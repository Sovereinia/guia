---
name: guia-deploy
description: >
  Local build/deploy for sovereinia/guia using scripts/deploy-local.sh (mirrors
  .github/workflows/deploy-to-vm.yml). Trigger on /guia-deploy, deploy guia,
  ship guia, verify guia build, smoke-test sovereinia.org/guia, or skip slow
  GitHub Actions when VM SSH is available. Prefer this over reimplementing npm/rsync/curl.
compatibility: >
  Node 22+ (required; Node 18 fails vite/tailwind native bindings). npm, curl.
  rsync+ssh only for rsync/deploy/ship. deploy@sovereinia.org key for production push.
metadata:
  short-description: "guia local verify/build/deploy/smoke via deploy-local.sh"
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
| Tests + build only / PR gate | `verify` | No | No |
| Just produce `dist/` | `build` | No | No |
| Is production up? | `smoke` | No | No (read-only HTTP) |
| Push current tree fast (no unit tests) | `deploy` | Yes | **Yes** |
| Push with checks (default for “ship/release/deploy properly”) | `ship` | Yes | **Yes** |
| Only sync existing `dist/` | `rsync` | Yes | **Yes** |

If unclear and they want production updated → **`ship`**. If no deploy key / sandbox / contributor → **`verify`** only and say CI will deploy on `main` merge.

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

Contributors without VM SSH: run **`verify`** locally; merge/push `main` lets Actions deploy.

## Do not

- Commit keys, tokens, or `~/.ssh/*`
- Disable/remove/bypass the Deploy to VM workflow
- Deploy from an unknown/wrong directory or override `DEPLOY_PATH` casually
- Claim production was updated unless rsync completed and smoke returned 200
