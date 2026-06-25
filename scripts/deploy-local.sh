#!/usr/bin/env bash
# Local mirror of .github/workflows/deploy-to-vm.yml
# Commands: verify | build | rsync | smoke | deploy | ship
set -euo pipefail
cd "$(dirname "$0")/.."

# Match CI (actions/setup-node node-version: 22)
node_major="$(node -p "process.versions.node.split('.')[0]" 2>/dev/null || echo 0)"
if [[ "$node_major" -lt 22 ]]; then
  echo "error: Node 22+ required (CI uses 22); current: $(node -v 2>/dev/null || echo none)" >&2
  exit 1
fi

DEPLOY_HOST="${DEPLOY_HOST:-sovereinia.org}"
DEPLOY_USER="${DEPLOY_USER:-deploy}"
DEPLOY_PATH="${DEPLOY_PATH:-/srv/apps/sovereinia/guia/}"
SMOKE_URL="${SMOKE_URL:-https://sovereinia.org/guia/}"

die() { echo "error: $*" >&2; exit 1; }

ensure_deps() {
  if [[ ! -d node_modules ]] || [[ package-lock.json -nt node_modules ]] || [[ "${FORCE_NPM_CI:-}" == "1" ]]; then
    [[ "${SKIP_NPM_CI:-}" == "1" && -d node_modules ]] || npm ci
  fi
}

do_build()  { ensure_deps; npm run build; [[ -d dist ]] || die "no dist/"; }
do_verify() { ensure_deps; npm run test:unit -- --run; npm run build; [[ -d dist ]] || die "no dist/"; }

ssh_base() {
  local opts=(-o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new)
  local key="${SSH_IDENTITY_FILE:-${HOME}/.ssh/deploy_key}"
  [[ -f "$key" ]] && opts+=(-i "$key")
  printf '%q ' "${opts[@]}"
}

need_cmd() { command -v "$1" >/dev/null 2>&1 || die "missing command: $1"; }

do_rsync() {
  [[ -d dist ]] || die "run build/verify first"
  need_cmd rsync
  need_cmd ssh
  # shellcheck disable=SC2046
  rsync -az --delete -e "ssh $(ssh_base)" dist/ "${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}"
}

do_smoke() {
  need_cmd curl
  local code
  code="$(curl -s -o /dev/null -w "%{http_code}" --max-time 20 "$SMOKE_URL")"
  echo "GET $SMOKE_URL -> $code"
  [[ "$code" == "200" ]] || die "smoke failed"
}

case "${1:-}" in
  build)  do_build ;;
  verify) do_verify ;;
  rsync)  do_rsync ;;
  smoke)  do_smoke ;;
  deploy) do_build && do_rsync && do_smoke ;;
  ship)   do_verify && do_rsync && do_smoke ;;
  *) echo "usage: $0 {verify|build|rsync|smoke|deploy|ship}" >&2; exit 1 ;;
esac
