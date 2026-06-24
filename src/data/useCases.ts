import type { App, UseCaseId } from '@/types';

export const useCaseIds: UseCaseId[] = [
  'storage',
  'video',
  'social',
  'chat',
  'identity',
  'docs',
  'media',
  'devops',
  'support',
  'streaming',
  'protocol',
];

/** Practical use-case tags per app display name (extend as the catalog grows). */
const BY_NAME: Record<string, UseCaseId[]> = {
  PeerTube: ['video', 'streaming'],
  Mastodon: ['social'],
  Nextcloud: ['storage', 'docs'],
  Vaultwarden: ['identity'],
  Passbolt: ['identity'],
  Element: ['chat'],
  Lemmy: ['social'],
  'Jitsi Meet': ['chat', 'video'],
  BookStack: ['docs'],
  RSSHub: ['protocol'],
  Discourse: ['social', 'support'],
  Pixelfed: ['social', 'media'],
  Signal: ['chat'],
  'Stirling-PDF': ['docs'],
  ActivityPub: ['protocol'],
  Matrix: ['protocol', 'chat'],
  XMPP: ['protocol', 'chat'],
  Email: ['protocol'],
  Ghost: ['docs'],
  Misskey: ['social'],
  'Rocket.Chat': ['chat', 'support'],
  Plane: ['devops'],
  IPFS: ['storage', 'protocol'],
  Bitwarden: ['identity'],
  'Diaspora*': ['social'],
  Jellyfin: ['media'],
  Zulip: ['chat'],
  osTicket: ['support'],
  Friendica: ['social'],
  Pleroma: ['social'],
  Hubzilla: ['social'],
  Mattermost: ['chat', 'devops'],
  BigBlueButton: ['video'],
  GitLab: ['devops'],
  Gitea: ['devops'],
  OpenProject: ['devops'],
  'Uptime Kuma': ['devops'],
  Plex: ['media'],
  LanguageTool: ['docs'],
  Owncast: ['streaming', 'video'],
  AzuraCast: ['streaming'],
  Keycloak: ['identity'],
  WordPress: ['docs'],
  'AT Protocol': ['protocol'],
  Bluesky: ['social'],
  RSS: ['protocol'],
  Atom: ['protocol'],
  BitTorrent: ['protocol', 'storage'],
  Nostr: ['protocol', 'social'],
  Tor: ['protocol'],
  Grafana: ['devops'],
  Prometheus: ['devops'],
  Funkwhale: ['media'],
  IRC: ['chat', 'protocol'],
  'The Lounge': ['chat'],
  'La Suite': ['docs', 'storage'],
};

export function useCasesForApp(app: Pick<App, 'name' | 'categories'>): UseCaseId[] {
  if (BY_NAME[app.name]) return BY_NAME[app.name];
  // Fallback from category ids if name missing in map
  const fallback: UseCaseId[] = [];
  if (app.categories.includes('protocols')) fallback.push('protocol');
  if (app.categories.includes('messaging')) fallback.push('chat');
  if (app.categories.includes('social')) fallback.push('social');
  if (app.categories.includes('tools')) fallback.push('docs');
  return fallback.length ? fallback : ['docs'];
}

export function withUseCases(apps: App[]): App[] {
  return apps.map((app) => ({
    ...app,
    useCases: app.useCases?.length ? app.useCases : useCasesForApp(app),
  }));
}
