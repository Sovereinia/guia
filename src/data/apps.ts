import type { App } from '../types';
import i18n from '@/i18n';

export const apps: App[] = [
  {
    name: 'PeerTube',
    description: i18n.global.t('apps.peertube.description'),
    longDescription: i18n.global.t('apps.peertube.longDescription'),
    features: [
      i18n.global.t('apps.peertube.features.1'),
      i18n.global.t('apps.peertube.features.2'),
      i18n.global.t('apps.peertube.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.peertube.links.1'), url: 'https://crianca.sovereinia.org' },
      {
        label: i18n.global.t('apps.peertube.links.2'),
        url: 'https://github.com/Chocobozzz/PeerTube',
      },
      {
        label: i18n.global.t('apps.peertube.links.3'),
        url: 'https://docs.joinpeertube.org/install-peer-to-peer-video-platform',
      },
    ],
    categories: ['social', 'tools'],
    alternatives: ['YouTube', 'Vimeo'],
    protocol: ['ActivityPub', 'Fediverso'],
    banner: {
      src: './apps/icons/peertube.svg',
      alt: 'Ícone do PeerTube',
    },
    modalBanner: {
      src: './apps/logos/peertube.png',
      alt: 'Logo do PeerTube',
    },
  },
  {
    name: 'Mastodon',
    description: i18n.global.t('apps.mastodon.description'),
    longDescription: i18n.global.t('apps.mastodon.longDescription'),
    features: [
      i18n.global.t('apps.mastodon.features.1'),
      i18n.global.t('apps.mastodon.features.2'),
      i18n.global.t('apps.mastodon.features.3'),
    ],
    links: [
      {
        label: i18n.global.t('apps.mastodon.links.1'),
        url: 'https://sovereinia.org/como-criar-uma-conta-no-mastodon/',
      },
      {
        label: i18n.global.t('apps.mastodon.links.2'),
        url: 'https://github.com/mastodon/mastodon',
      },
      {
        label: i18n.global.t('apps.mastodon.links.3'),
        url: 'https://sovereinia.org/como-auto-hospedar-sua-propria-instancia-do-mastodon/',
      },
    ],
    categories: ['social'],
    alternatives: ['Twitter', 'X.com'],
    protocol: ['ActivityPub', 'Fediverso'],
    banner: {
      src: './apps/icons/mastodon.png',
      alt: 'Ícone do Mastodon',
    },
    modalBanner: {
      src: './apps/logos/mastodon.png',
      alt: 'Logo do Mastodon',
    },
  },
  {
    name: 'Nextcloud',
    description: i18n.global.t('apps.nextcloud.description'),
    longDescription: i18n.global.t('apps.nextcloud.longDescription'),
    features: [
      i18n.global.t('apps.nextcloud.features.1'),
      i18n.global.t('apps.nextcloud.features.2'),
      i18n.global.t('apps.nextcloud.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.nextcloud.links.1'), url: 'https://nextcloud.com/' },
      {
        label: i18n.global.t('apps.nextcloud.links.2'),
        url: 'https://github.com/nextcloud/server',
      },
      {
        label: i18n.global.t('apps.nextcloud.links.3'),
        url: 'https://docs.nextcloud.com/server/latest/admin_manual/installation/',
      },
    ],
    categories: ['tools'],
    alternatives: ['Google Drive', 'OneDrive', 'Dropbox'],
    protocol: ['WebDAV'],
    recommendedForBeginners: true,
    banner: {
      src: './apps/icons/nextcloud.svg',
      alt: 'Ícone do Nextcloud',
    },
    modalBanner: {
      src: './apps/logos/nextcloud.png',
      alt: 'Logo do Nextcloud',
    },
  },
  {
    name: 'Vaultwarden',
    description: i18n.global.t('apps.vaultwarden.description'),
    longDescription: i18n.global.t('apps.vaultwarden.longDescription'),
    features: [
      i18n.global.t('apps.vaultwarden.features.1'),
      i18n.global.t('apps.vaultwarden.features.2'),
      i18n.global.t('apps.vaultwarden.features.3'),
    ],
    links: [
      {
        label: i18n.global.t('apps.vaultwarden.links.1'),
        url: 'https://github.com/dani-garcia/vaultwarden',
      },
      {
        label: i18n.global.t('apps.vaultwarden.links.2'),
        url: 'https://github.com/dani-garcia/vaultwarden/wiki/Installation',
      },
    ],
    categories: ['tools'],
    alternatives: ['Google Password Manager'],
    recommendedForBeginners: true,
    banner: {
      src: './apps/icons/vaultwarden.png',
      alt: 'Ícone do Vaultwarden',
    },
    modalBanner: {
      src: './apps/logos/vaultwarden.png',
      alt: 'Logo do Vaultwarden',
    },
  },
  {
    name: 'Passbolt',
    description: i18n.global.t('apps.passbolt.description'),
    longDescription: i18n.global.t('apps.passbolt.longDescription'),
    features: [
      i18n.global.t('apps.passbolt.features.1'),
      i18n.global.t('apps.passbolt.features.2'),
      i18n.global.t('apps.passbolt.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.passbolt.links.1'), url: 'https://www.passbolt.com/' },
      {
        label: i18n.global.t('apps.passbolt.links.2'),
        url: 'https://github.com/passbolt/passbolt_api',
      },
      {
        label: i18n.global.t('apps.passbolt.links.3'),
        url: 'https://www.passbolt.com/help/tech/install',
      },
    ],
    categories: ['tools'],
    alternatives: ['Google Password Manager'],
    banner: {
      src: './apps/icons/passbolt.svg',
      alt: 'Ícone do Passbolt',
    },
    modalBanner: {
      src: './apps/logos/passbolt.png',
      alt: 'Logo do Passbolt',
    },
  },

  {
    name: 'Element',
    description: i18n.global.t('apps.element.description'),
    longDescription: i18n.global.t('apps.element.longDescription'),
    features: [
      i18n.global.t('apps.element.features.1'),
      i18n.global.t('apps.element.features.2'),
      i18n.global.t('apps.element.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.element.links.1'), url: 'https://element.io/' },
      {
        label: i18n.global.t('apps.element.links.2'),
        url: 'https://github.com/vector-im/element-web',
      },
      { label: i18n.global.t('apps.element.links.3'), url: 'https://element.io/help/install' },
    ],
    categories: ['messaging'],
    alternatives: ['WhatsApp', 'Telegram', 'Slack'],
    protocol: ['Matrix'],
    banner: {
      src: './apps/icons/element.svg',
      alt: 'Ícone do Element',
    },
    modalBanner: {
      src: './apps/logos/element.png',
      alt: 'Logo do Element',
    },
  },
  {
    name: 'Lemmy',
    description: i18n.global.t('apps.lemmy.description'),
    longDescription: i18n.global.t('apps.lemmy.longDescription'),
    features: [
      i18n.global.t('apps.lemmy.features.1'),
      i18n.global.t('apps.lemmy.features.2'),
      i18n.global.t('apps.lemmy.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.lemmy.links.1'), url: 'https://join-lemmy.org/instances' },
      { label: i18n.global.t('apps.lemmy.links.2'), url: 'https://github.com/LemmyNet/lemmy' },
      {
        label: i18n.global.t('apps.lemmy.links.3'),
        url: 'https://join-lemmy.org/docs/en/administration/install/',
      },
    ],
    categories: ['social'],
    alternatives: ['Reddit', 'Hacker News'],
    protocol: ['ActivityPub', 'Fediverso'],
    banner: {
      src: './apps/icons/lemmy.svg',
      alt: 'Ícone do Lemmy',
    },
    modalBanner: {
      src: './apps/logos/lemmy.png',
      alt: 'Logo do Lemmy',
    },
  },

  {
    name: 'Jitsi Meet',
    description: i18n.global.t('apps.jitsimeet.description'),
    longDescription: i18n.global.t('apps.jitsimeet.longDescription'),
    features: [
      i18n.global.t('apps.jitsimeet.features.1'),
      i18n.global.t('apps.jitsimeet.features.2'),
      i18n.global.t('apps.jitsimeet.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.jitsimeet.links.1'), url: 'https://meet.jit.si/' },
      {
        label: i18n.global.t('apps.jitsimeet.links.2'),
        url: 'https://github.com/jitsi/jitsi-meet',
      },
      {
        label: i18n.global.t('apps.jitsimeet.links.3'),
        url: 'https://jitsi.github.io/handbook/docs/devops-guide/devops-guide-quickstart',
      },
    ],
    categories: ['tools'],
    alternatives: ['Zoom', 'Google Meet'],
    protocol: ['WebRTC'],
    banner: {
      src: './apps/icons/jitsi.png',
      alt: 'Ícone do Jitsi Meet',
    },
    modalBanner: {
      src: './apps/logos/jitsi.png',
      alt: 'Logo do Jitsi Meet',
    },
  },

  {
    name: 'BookStack',
    description: i18n.global.t('apps.bookstack.description'),
    longDescription: i18n.global.t('apps.bookstack.longDescription'),
    features: [
      i18n.global.t('apps.bookstack.features.1'),
      i18n.global.t('apps.bookstack.features.2'),
      i18n.global.t('apps.bookstack.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.bookstack.links.1'), url: 'https://www.bookstackapp.com/' },
      {
        label: i18n.global.t('apps.bookstack.links.2'),
        url: 'https://github.com/BookStackApp/BookStack',
      },
      {
        label: i18n.global.t('apps.bookstack.links.3'),
        url: 'https://www.bookstackapp.com/docs/admin/installation/',
      },
    ],
    categories: ['tools'],
    alternatives: ['Confluence', 'Notion', 'MediaWiki'],
    banner: {
      src: './apps/icons/bookstack.svg',
      alt: 'Ícone do BookStack',
    },
    modalBanner: {
      src: './apps/logos/bookstack.png',
      alt: 'Logo do BookStack',
    },
  },
  {
    name: 'RSSHub',
    description: i18n.global.t('apps.rsshub.description'),
    longDescription: i18n.global.t('apps.rsshub.longDescription'),
    features: [
      i18n.global.t('apps.rsshub.features.1'),
      i18n.global.t('apps.rsshub.features.2'),
      i18n.global.t('apps.rsshub.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.rsshub.links.1'), url: 'https://rsshub.app/' },
      { label: i18n.global.t('apps.rsshub.links.2'), url: 'https://github.com/DIYgod/RSSHub' },
      { label: i18n.global.t('apps.rsshub.links.3'), url: 'https://docs.rsshub.app/install/' },
    ],
    categories: ['tools'],
    alternatives: ['Newsletters'],
    protocol: ['RSS'],
    banner: {
      src: './apps/icons/rsshub.svg',
      alt: 'Ícone do RSSHub',
    },
    modalBanner: {
      src: './apps/logos/rsshub.png',
      alt: 'Logo do RSSHub',
    },
  },
  {
    name: 'Discourse',
    description: i18n.global.t('apps.discourse.description'),
    longDescription: i18n.global.t('apps.discourse.longDescription'),
    features: [
      i18n.global.t('apps.discourse.features.1'),
      i18n.global.t('apps.discourse.features.2'),
      i18n.global.t('apps.discourse.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.discourse.links.1'), url: 'https://www.discourse.org/' },
      {
        label: i18n.global.t('apps.discourse.links.2'),
        url: 'https://github.com/discourse/discourse',
      },
      {
        label: i18n.global.t('apps.discourse.links.3'),
        url: 'https://github.com/discourse/discourse/blob/main/docs/INSTALL-cloud.md',
      },
    ],
    categories: ['social', 'tools'],
    alternatives: ['Reddit', 'Facebook Groups'],
    banner: {
      src: './apps/icons/discourse.svg',
      alt: 'Ícone do Discourse',
    },
    modalBanner: {
      src: './apps/logos/discourse.png',
      alt: 'Logo do Discourse',
    },
  },

  {
    name: 'Pixelfed',
    description: i18n.global.t('apps.pixelfed.description'),
    longDescription: i18n.global.t('apps.pixelfed.longDescription'),
    features: [
      i18n.global.t('apps.pixelfed.features.1'),
      i18n.global.t('apps.pixelfed.features.2'),
      i18n.global.t('apps.pixelfed.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.pixelfed.links.1'), url: 'https://pixelfed.org/instances' },
      {
        label: i18n.global.t('apps.pixelfed.links.2'),
        url: 'https://github.com/pixelfed/pixelfed',
      },
      { label: i18n.global.t('apps.pixelfed.links.3'), url: 'https://docs.pixelfed.org/install/' },
    ],
    categories: ['social'],
    alternatives: ['Instagram'],
    protocol: ['ActivityPub', 'Fediverso'],
    banner: {
      src: './apps/icons/pixelfed.svg',
      alt: 'Ícone do Pixelfed',
    },
    modalBanner: {
      src: './apps/logos/pixelfed.png',
      alt: 'Logo do Pixelfed',
    },
  },

  {
    name: 'Signal',
    description: i18n.global.t('apps.signal.description'),
    longDescription: i18n.global.t('apps.signal.longDescription'),
    features: [
      i18n.global.t('apps.signal.features.1'),
      i18n.global.t('apps.signal.features.2'),
      i18n.global.t('apps.signal.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.signal.links.1'), url: 'https://signal.org/' },
      { label: i18n.global.t('apps.signal.links.2'), url: 'https://github.com/signalapp' },
      {
        label: i18n.global.t('apps.signal.links.3'),
        url: 'https://github.com/signalapp/Signal-Server',
      },
    ],
    categories: ['messaging'],
    alternatives: ['WhatsApp', 'Telegram'],
    protocol: ['Signal Protocol'],
    recommendedForBeginners: true,
    banner: {
      src: './apps/icons/signal.svg',
      alt: 'Ícone do Signal',
    },
    modalBanner: {
      src: './apps/logos/signal.png',
      alt: 'Logo do Signal',
    },
  },
  {
    name: 'Stirling-PDF',
    description: i18n.global.t('apps.stirling-pdf.description'),
    longDescription: i18n.global.t('apps.stirling-pdf.longDescription'),
    features: [
      i18n.global.t('apps.stirling-pdf.features.1'),
      i18n.global.t('apps.stirling-pdf.features.2'),
      i18n.global.t('apps.stirling-pdf.features.3'),
    ],
    links: [
      {
        label: i18n.global.t('apps.stirling-pdf.links.1'),
        url: 'https://github.com/Stirling-Tools/Stirling-PDF',
      },
      {
        label: i18n.global.t('apps.stirling-pdf.links.2'),
        url: 'https://github.com/Stirling-Tools/Stirling-PDF/wiki/Docker-Install',
      },
    ],
    categories: ['tools'],
    alternatives: ['iLovePDF', 'SmallPDF'],
    recommendedForBeginners: true,
    banner: {
      src: './apps/icons/stirling-pdf.png',
      alt: 'Ícone do Stirling-PDF',
    },
    modalBanner: {
      src: './apps/logos/stirling-pdf.png',
      alt: 'Logo do Stirling-PDF',
    },
  },
  {
    name: 'ActivityPub',
    description: i18n.global.t('apps.activitypub.description'),
    longDescription: i18n.global.t('apps.activitypub.longDescription'),
    features: [
      i18n.global.t('apps.activitypub.features.1'),
      i18n.global.t('apps.activitypub.features.2'),
      i18n.global.t('apps.activitypub.features.3'),
    ],
    links: [
      {
        label: i18n.global.t('apps.activitypub.links.1'),
        url: 'https://viniciusghise.com.br/blog/fediverso-o-que-e/',
      },
      {
        label: i18n.global.t('apps.activitypub.links.2'),
        url: 'https://www.w3.org/TR/activitypub/',
      },
      {
        label: i18n.global.t('apps.activitypub.links.3'),
        url: 'https://fediverse.party/en/fediverse/',
      },
    ],
    categories: ['protocols'],
    alternatives: ['OStatus', 'Zot'],
    banner: {
      src: './apps/icons/activitypub.svg',
      alt: 'Ícone do ActivityPub',
    },
    modalBanner: {
      src: './apps/logos/activitypub.png',
      alt: 'Logo do ActivityPub',
    },
  },

  {
    name: 'Matrix',
    description: i18n.global.t('apps.matrix.description'),
    longDescription: i18n.global.t('apps.matrix.longDescription'),
    features: [
      i18n.global.t('apps.matrix.features.1'),
      i18n.global.t('apps.matrix.features.2'),
      i18n.global.t('apps.matrix.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.matrix.links.1'), url: 'https://matrix.org/' },
      { label: i18n.global.t('apps.matrix.links.2'), url: 'https://spec.matrix.org/' },
      { label: i18n.global.t('apps.matrix.links.3'), url: 'https://matrix.org/ecosystem/clients/' },
    ],
    categories: ['protocols'],
    alternatives: ['XMPP', 'Signal Protocol'],
    banner: {
      src: './apps/icons/matrix.svg',
      alt: 'Ícone do Matrix',
    },
    modalBanner: {
      src: './apps/logos/matrix.png',
      alt: 'Logo do Matrix',
    },
  },
  {
    name: 'XMPP',
    description: i18n.global.t('apps.xmpp.description'),
    longDescription: i18n.global.t('apps.xmpp.longDescription'),
    features: [
      i18n.global.t('apps.xmpp.features.1'),
      i18n.global.t('apps.xmpp.features.2'),
      i18n.global.t('apps.xmpp.features.3'),
      i18n.global.t('apps.xmpp.features.4'),
    ],
    links: [
      { label: i18n.global.t('apps.xmpp.links.1'), url: 'https://xmpp.org/' },
      {
        label: i18n.global.t('apps.xmpp.links.2'),
        url: 'https://xmpp.org/about/technology-overview.html',
      },
      { label: i18n.global.t('apps.xmpp.links.3'), url: 'https://xmpp.org/software/' },
    ],
    categories: ['protocols'],
    alternatives: ['Matrix', 'Signal Protocol'],
    banner: {
      src: './apps/icons/xmpp.svg',
      alt: 'Ícone do XMPP',
    },
    modalBanner: {
      src: './apps/logos/xmpp.png',
      alt: 'Logo do XMPP',
    },
  },
  {
    name: 'Email',
    description: i18n.global.t('apps.email.description'),
    longDescription: i18n.global.t('apps.email.longDescription'),
    features: [
      i18n.global.t('apps.email.features.1'),
      i18n.global.t('apps.email.features.2'),
      i18n.global.t('apps.email.features.3'),
    ],
    links: [
      // { label: 'Guia para auto-hospedar e-mail', url: 'https://sovereinia.org/como-auto-hospedar-seu-proprio-servidor-de-email/' },
      {
        label: i18n.global.t('apps.email.links.1'),
        url: 'https://datatracker.ietf.org/doc/html/rfc5321',
      },
      {
        label: i18n.global.t('apps.email.links.2'),
        url: 'https://github.com/Kickball/awesome-selfhosted#email',
      },
    ],
    categories: ['protocols'],
    protocol: ['SMTP', 'IMAP', 'POP3'],
    banner: {
      src: './apps/icons/email.svg',
      alt: 'Ícone de Email',
    },
    modalBanner: {
      src: './apps/logos/email.png',
      alt: 'Logo de Email',
    },
  },
  {
    name: 'Ghost',
    description: i18n.global.t('apps.ghost.description'),
    longDescription: i18n.global.t('apps.ghost.longDescription'),
    features: [
      i18n.global.t('apps.ghost.features.1'),
      i18n.global.t('apps.ghost.features.2'),
      i18n.global.t('apps.ghost.features.3'),
      i18n.global.t('apps.ghost.features.4'),
    ],
    links: [
      { label: i18n.global.t('apps.ghost.links.1'), url: 'https://ghost.org/' },
      { label: i18n.global.t('apps.ghost.links.2'), url: 'https://github.com/TryGhost/Ghost' },
      { label: i18n.global.t('apps.ghost.links.3'), url: 'https://ghost.org/docs/install/' },
    ],
    categories: ['tools'],
    alternatives: ['WordPress', 'Medium'],
    banner: {
      src: './apps/icons/ghost.png',
      alt: 'Ícone do Ghost',
    },
    modalBanner: {
      src: './apps/logos/ghost.png',
      alt: 'Logo do Ghost',
    },
  },

  {
    name: 'Misskey',
    description: i18n.global.t('apps.misskey.description'),
    longDescription: i18n.global.t('apps.misskey.longDescription'),
    features: [
      i18n.global.t('apps.misskey.features.1'),
      i18n.global.t('apps.misskey.features.2'),
      i18n.global.t('apps.misskey.features.3'),
      i18n.global.t('apps.misskey.features.4'),
    ],
    links: [
      { label: i18n.global.t('apps.misskey.links.1'), url: 'https://misskey-hub.net/' },
      {
        label: i18n.global.t('apps.misskey.links.2'),
        url: 'https://github.com/misskey-dev/misskey',
      },
      {
        label: i18n.global.t('apps.misskey.links.3'),
        url: 'https://misskey-hub.net/docs/install/',
      },
    ],
    categories: ['social'],
    alternatives: ['Twitter', 'X.com'],
    protocol: ['ActivityPub', 'Fediverso'],
    banner: {
      src: './apps/icons/misskey.svg',
      alt: 'Ícone do Misskey',
    },
    modalBanner: {
      src: './apps/logos/misskey.png',
      alt: 'Logo do Misskey',
    },
  },
  {
    name: 'Rocket.Chat',
    description: i18n.global.t('apps.rocketchat.description'),
    longDescription: i18n.global.t('apps.rocketchat.longDescription'),
    features: [
      i18n.global.t('apps.rocketchat.features.1'),
      i18n.global.t('apps.rocketchat.features.2'),
      i18n.global.t('apps.rocketchat.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.rocketchat.links.1'), url: 'https://www.rocket.chat/' },
      {
        label: i18n.global.t('apps.rocketchat.links.2'),
        url: 'https://github.com/RocketChat/Rocket.Chat',
      },
      {
        label: i18n.global.t('apps.rocketchat.links.3'),
        url: 'https://docs.rocket.chat/installation/',
      },
    ],
    categories: ['messaging', 'tools'],
    alternatives: ['Slack', 'Microsoft Teams', 'Zendesk'],
    banner: {
      src: './apps/icons/rocketchat.svg',
      alt: 'Ícone do Rocket.Chat',
    },
    modalBanner: {
      src: './apps/logos/rocketchat.png',
      alt: 'Logo do Rocket.Chat',
    },
  },
  {
    name: 'Plane',
    description: i18n.global.t('apps.plane.description'),
    longDescription: i18n.global.t('apps.plane.longDescription'),
    features: [
      i18n.global.t('apps.plane.features.1'),
      i18n.global.t('apps.plane.features.2'),
      i18n.global.t('apps.plane.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.plane.links.1'), url: 'https://plane.so/' },
      { label: i18n.global.t('apps.plane.links.2'), url: 'https://github.com/makeplane/plane' },
      { label: i18n.global.t('apps.plane.links.3'), url: 'https://docs.plane.so/' },
    ],
    categories: ['tools'],
    alternatives: ['Trello', 'Jira'],
    banner: {
      src: './apps/icons/plane.svg',
      alt: 'Ícone do Plane',
    },
    modalBanner: {
      src: './apps/logos/plane.png',
      alt: 'Logo do Plane',
    },
  },
  {
    name: 'IPFS',
    description: i18n.global.t('apps.ipfs.description'),
    longDescription: i18n.global.t('apps.ipfs.longDescription'),
    features: [
      i18n.global.t('apps.ipfs.features.1'),
      i18n.global.t('apps.ipfs.features.2'),
      i18n.global.t('apps.ipfs.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.ipfs.links.1'), url: 'https://ipfs.tech/' },
      { label: i18n.global.t('apps.ipfs.links.2'), url: 'https://github.com/ipfs/kubo' },
      { label: i18n.global.t('apps.ipfs.links.3'), url: 'https://docs.ipfs.tech/install/' },
    ],
    categories: ['protocols'],
    alternatives: ['HTTP', 'BitTorrent'],
    banner: {
      src: './apps/icons/ipfs.svg',
      alt: 'Ícone do IPFS',
    },
    modalBanner: {
      src: './apps/logos/ipfs.png',
      alt: 'Logo do IPFS',
    },
  },
  {
    name: 'Bitwarden',
    description: i18n.global.t('apps.bitwarden.description'),
    longDescription: i18n.global.t('apps.bitwarden.longDescription'),
    features: [
      i18n.global.t('apps.bitwarden.features.1'),
      i18n.global.t('apps.bitwarden.features.2'),
      i18n.global.t('apps.bitwarden.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.bitwarden.links.1'), url: 'https://bitwarden.com/' },
      {
        label: i18n.global.t('apps.bitwarden.links.2'),
        url: 'https://github.com/bitwarden/server',
      },
      {
        label: i18n.global.t('apps.bitwarden.links.3'),
        url: 'https://bitwarden.com/help/install-on-premise/',
      },
    ],
    categories: ['tools'],
    alternatives: ['Google Password Manager'],
    banner: {
      src: './apps/icons/bitwarden.svg',
      alt: 'Ícone do Bitwarden',
    },
    modalBanner: {
      src: './apps/logos/bitwarden.png',
      alt: 'Logo do Bitwarden',
    },
  },

  {
    name: 'Diaspora*',
    description: i18n.global.t('apps.diaspora.description'),
    longDescription: i18n.global.t('apps.diaspora.longDescription'),
    features: [
      i18n.global.t('apps.diaspora.features.1'),
      i18n.global.t('apps.diaspora.features.2'),
      i18n.global.t('apps.diaspora.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.diaspora.links.1'), url: 'https://diasporafoundation.org/' },
      {
        label: i18n.global.t('apps.diaspora.links.2'),
        url: 'https://github.com/diaspora/diaspora',
      },
      {
        label: 'Auto-hospede o Diaspora*',
        url: 'https://wiki.diasporafoundation.org/Installation',
      },
    ],
    categories: ['social'],
    alternatives: ['Facebook'],
    protocol: ['Diaspora protocol'],
    banner: {
      src: './apps/icons/diaspora.svg',
      alt: 'Ícone do Diaspora*',
    },
    modalBanner: {
      src: './apps/logos/diaspora.png',
      alt: 'Logo do Diaspora*',
    },
  },
  {
    name: 'Jellyfin',
    description: i18n.global.t('apps.jellyfin.description'),
    longDescription: i18n.global.t('apps.jellyfin.longDescription'),
    features: [
      i18n.global.t('apps.jellyfin.features.1'),
      i18n.global.t('apps.jellyfin.features.2'),
      i18n.global.t('apps.jellyfin.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.jellyfin.links.1'), url: 'https://jellyfin.org/' },
      {
        label: i18n.global.t('apps.jellyfin.links.2'),
        url: 'https://github.com/jellyfin/jellyfin',
      },
      {
        label: i18n.global.t('apps.jellyfin.links.3'),
        url: 'https://jellyfin.org/docs/general/administration/installing/',
      },
    ],
    categories: ['tools'],
    alternatives: ['Plex'],
    banner: {
      src: './apps/icons/jellyfin.svg',
      alt: 'Ícone do Jellyfin',
    },
    modalBanner: {
      src: './apps/logos/jellyfin.png',
      alt: 'Logo do Jellyfin',
    },
  },
  {
    name: 'Zulip',
    description: i18n.global.t('apps.zulip.description'),
    longDescription: i18n.global.t('apps.zulip.longDescription'),
    features: [
      i18n.global.t('apps.zulip.features.1'),
      i18n.global.t('apps.zulip.features.2'),
      i18n.global.t('apps.zulip.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.zulip.links.1'), url: 'https://zulip.com/' },
      { label: i18n.global.t('apps.zulip.links.2'), url: 'https://github.com/zulip/zulip' },
      {
        label: i18n.global.t('apps.zulip.links.3'),
        url: 'https://zulip.readthedocs.io/en/latest/production/install.html',
      },
    ],
    categories: ['messaging', 'tools'],
    alternatives: ['Slack', 'Microsoft Teams', 'Discord'],
    banner: {
      src: './apps/icons/zulip.svg',
      alt: 'Ícone do Zulip',
    },
    modalBanner: {
      src: './apps/logos/zulip.png',
      alt: 'Logo do Zulip',
    },
  },
  {
    name: 'osTicket',
    description: i18n.global.t('apps.osticket.description'),
    longDescription: i18n.global.t('apps.osticket.longDescription'),
    features: [
      i18n.global.t('apps.osticket.features.1'),
      i18n.global.t('apps.osticket.features.2'),
      i18n.global.t('apps.osticket.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.osticket.links.1'), url: 'https://osticket.com/' },
      {
        label: i18n.global.t('apps.osticket.links.2'),
        url: 'https://github.com/osTicket/osTicket',
      },
      {
        label: i18n.global.t('apps.osticket.links.3'),
        url: 'https://docs.osticket.com/en/latest/',
      },
    ],
    categories: ['tools'],
    alternatives: ['Zendesk', 'Freshdesk', 'Help Scout'],
    banner: {
      src: './apps/icons/osticket.png',
      alt: 'Ícone do osTicket',
    },
    modalBanner: {
      src: './apps/logos/osticket.png',
      alt: 'Logo do osTicket',
    },
  },
  {
    name: 'Friendica',
    description: i18n.global.t('apps.friendica.description'),
    longDescription: i18n.global.t('apps.friendica.longDescription'),
    features: [
      i18n.global.t('apps.friendica.features.1'),
      i18n.global.t('apps.friendica.features.2'),
      i18n.global.t('apps.friendica.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.friendica.links.1'), url: 'https://friendi.ca/' },
      {
        label: i18n.global.t('apps.friendica.links.2'),
        url: 'https://github.com/friendica/friendica',
      },
      {
        label: i18n.global.t('apps.friendica.links.3'),
        url: 'https://wiki.friendi.ca/docs/admin/installation',
      },
    ],
    categories: ['social'],
    alternatives: ['Facebook', 'Mastodon', 'Diaspora*'],
    protocol: ['ActivityPub', 'Diaspora protocol', 'OStatus'],
    banner: {
      src: './apps/icons/friendica.svg',
      alt: 'Ícone do Friendica',
    },
    modalBanner: {
      src: './apps/logos/friendica.png',
      alt: 'Logo do Friendica',
    },
  },

  {
    name: 'Pleroma',
    description: i18n.global.t('apps.pleroma.description'),
    longDescription: i18n.global.t('apps.pleroma.longDescription'),
    features: [
      i18n.global.t('apps.pleroma.features.1'),
      i18n.global.t('apps.pleroma.features.2'),
      i18n.global.t('apps.pleroma.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.pleroma.links.1'), url: 'https://pleroma.social/' },
      {
        label: i18n.global.t('apps.pleroma.links.2'),
        url: 'https://akkoma.dev/AkkomaGang/pleroma',
      },
      {
        label: i18n.global.t('apps.pleroma.links.3'),
        url: 'https://docs-develop.pleroma.social/backend/installation/',
      },
    ],
    categories: ['social'],
    alternatives: ['Mastodon', 'Misskey'],
    protocol: ['ActivityPub', 'Fediverso'],
    banner: {
      src: './apps/icons/pleroma.svg',
      alt: 'Ícone do Pleroma',
    },
    modalBanner: {
      src: './apps/logos/pleroma.png',
      alt: 'Logo do Pleroma',
    },
  },
  {
    name: 'Hubzilla',
    description: i18n.global.t('apps.hubzilla.description'),
    longDescription: i18n.global.t('apps.hubzilla.longDescription'),
    features: [
      i18n.global.t('apps.hubzilla.features.1'),
      i18n.global.t('apps.hubzilla.features.2'),
      i18n.global.t('apps.hubzilla.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.hubzilla.links.1'), url: 'https://hubzilla.org/' },
      { label: i18n.global.t('apps.hubzilla.links.2'), url: 'https://framagit.org/hubzilla/core' },
      {
        label: i18n.global.t('apps.hubzilla.links.3'),
        url: 'https://project.hubzilla.org/help/Install',
      },
    ],
    categories: ['social', 'tools'],
    alternatives: ['Facebook', 'Diaspora*', 'Mastodon'],
    protocol: ['Zot', 'ActivityPub'],
    banner: {
      src: './apps/icons/hubzilla.svg',
      alt: 'Ícone do Hubzilla',
    },
    modalBanner: {
      src: './apps/logos/hubzilla.png',
      alt: 'Logo do Hubzilla',
    },
  },
  {
    name: 'Mattermost',
    description: i18n.global.t('apps.mattermost.description'),
    longDescription: i18n.global.t('apps.mattermost.longDescription'),
    features: [
      i18n.global.t('apps.mattermost.features.1'),
      i18n.global.t('apps.mattermost.features.2'),
      i18n.global.t('apps.mattermost.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.mattermost.links.1'), url: 'https://mattermost.com/' },
      {
        label: i18n.global.t('apps.mattermost.links.2'),
        url: 'https://github.com/mattermost/mattermost-server',
      },
      {
        label: i18n.global.t('apps.mattermost.links.3'),
        url: 'https://docs.mattermost.com/install/self-managed.html',
      },
    ],
    categories: ['messaging', 'tools'],
    alternatives: ['Slack', 'Microsoft Teams', 'Rocket.Chat', 'GitLab'],
    banner: {
      src: './apps/icons/mattermost.svg',
      alt: 'Ícone do Mattermost',
    },
    modalBanner: {
      src: './apps/logos/mattermost.png',
      alt: 'Logo do Mattermost',
    },
  },
  {
    name: 'BigBlueButton',
    description: i18n.global.t('apps.bigbluebutton.description'),
    longDescription: i18n.global.t('apps.bigbluebutton.longDescription'),
    features: [
      i18n.global.t('apps.bigbluebutton.features.1'),
      i18n.global.t('apps.bigbluebutton.features.2'),
      i18n.global.t('apps.bigbluebutton.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.bigbluebutton.links.1'), url: 'https://bigbluebutton.org/' },
      {
        label: i18n.global.t('apps.bigbluebutton.links.2'),
        url: 'https://github.com/bigbluebutton/bigbluebutton',
      },
      {
        label: i18n.global.t('apps.bigbluebutton.links.3'),
        url: 'https://bigbluebutton.org/hosting/',
      },
    ],
    categories: ['tools'],
    alternatives: ['Zoom', 'Google Meet', 'Microsoft Teams'],
    protocol: ['WebRTC'],
    banner: {
      src: './apps/icons/bigbluebutton.svg',
      alt: 'Ícone do BigBlueButton',
    },
    modalBanner: {
      src: './apps/logos/bigbluebutton.png',
      alt: 'Logo do BigBlueButton',
    },
  },
  {
    name: 'GitLab',
    description: i18n.global.t('apps.gitlab.description'),
    longDescription: i18n.global.t('apps.gitlab.longDescription'),
    features: [
      i18n.global.t('apps.gitlab.features.1'),
      i18n.global.t('apps.gitlab.features.2'),
      i18n.global.t('apps.gitlab.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.gitlab.links.1'), url: 'https://about.gitlab.com/' },
      { label: i18n.global.t('apps.gitlab.links.2'), url: 'https://gitlab.com/gitlab-org/gitlab' },
      { label: i18n.global.t('apps.gitlab.links.3'), url: 'https://about.gitlab.com/install/' },
    ],
    categories: ['tools'],
    alternatives: ['GitHub', 'Bitbucket', 'Gitea'],
    protocol: ['Git'],
    banner: {
      src: './apps/icons/gitlab.svg',
      alt: 'Ícone do GitLab',
    },
    modalBanner: {
      src: './apps/logos/gitlab.png',
      alt: 'Logo do GitLab',
    },
  },
  {
    name: 'Gitea',
    description: i18n.global.t('apps.gitea.description'),
    longDescription: i18n.global.t('apps.gitea.longDescription'),
    features: [
      i18n.global.t('apps.gitea.features.1'),
      i18n.global.t('apps.gitea.features.2'),
      i18n.global.t('apps.gitea.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.gitea.links.1'), url: 'https://gitea.io/' },
      { label: i18n.global.t('apps.gitea.links.2'), url: 'https://github.com/go-gitea/gitea' },
      {
        label: i18n.global.t('apps.gitea.links.3'),
        url: 'https://docs.gitea.io/en-us/install-from-binary/',
      },
    ],
    categories: ['tools'],
    alternatives: ['GitHub', 'GitLab'],
    protocol: ['Git'],
    banner: {
      src: './apps/icons/gitea.svg',
      alt: 'Ícone do Gitea',
    },
    modalBanner: {
      src: './apps/logos/gitea.png',
      alt: 'Logo do Gitea',
    },
  },
  {
    name: 'OpenProject',
    description: i18n.global.t('apps.openproject.description'),
    longDescription: i18n.global.t('apps.openproject.longDescription'),
    features: [
      i18n.global.t('apps.openproject.features.1'),
      i18n.global.t('apps.openproject.features.2'),
      i18n.global.t('apps.openproject.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.openproject.links.1'), url: 'https://www.openproject.org/' },
      {
        label: i18n.global.t('apps.openproject.links.2'),
        url: 'https://github.com/opf/openproject',
      },
      {
        label: i18n.global.t('apps.openproject.links.3'),
        url: 'https://www.openproject.org/docs/installation-and-operations/installation/',
      },
    ],
    categories: ['tools'],
    alternatives: ['Jira', 'Trello', 'Asana'],
    banner: {
      src: './apps/icons/openproject.svg',
      alt: 'Ícone do OpenProject',
    },
    modalBanner: {
      src: './apps/logos/openproject.png',
      alt: 'Logo do OpenProject',
    },
  },
  {
    name: 'Uptime Kuma',
    description: i18n.global.t('apps.uptimekuma.description'),
    longDescription: i18n.global.t('apps.uptimekuma.longDescription'),
    features: [
      i18n.global.t('apps.uptimekuma.features.1'),
      i18n.global.t('apps.uptimekuma.features.2'),
      i18n.global.t('apps.uptimekuma.features.3'),
    ],
    links: [
      {
        label: i18n.global.t('apps.uptimekuma.links.1'),
        url: 'https://github.com/louislam/uptime-kuma',
      },
      {
        label: i18n.global.t('apps.uptimekuma.links.2'),
        url: 'https://github.com/louislam/uptime-kuma/wiki',
      },
    ],
    categories: ['tools'],
    alternatives: [''],
    banner: {
      src: './apps/icons/uptimekuma.svg',
      alt: 'Ícone do Uptime Kuma',
    },
    modalBanner: {
      src: './apps/logos/uptimekuma.png',
      alt: 'Logo do Uptime Kuma',
    },
  },
  {
    name: 'Plex',
    description: i18n.global.t('apps.plex.description'),
    longDescription: i18n.global.t('apps.plex.longDescription'),
    features: [
      i18n.global.t('apps.plex.features.1'),
      i18n.global.t('apps.plex.features.2'),
      i18n.global.t('apps.plex.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.plex.links.1'), url: 'https://www.plex.tv/' },
      { label: i18n.global.t('apps.plex.links.2'), url: 'https://github.com/plexinc' },
      {
        label: i18n.global.t('apps.plex.links.3'),
        url: 'https://support.plex.tv/articles/200264746-installation/',
      },
    ],
    categories: ['tools'],
    alternatives: ['Jellyfin', 'Emby', 'Kodi'],
    banner: {
      src: './apps/icons/plex.svg',
      alt: 'Ícone do Plex',
    },
    modalBanner: {
      src: './apps/logos/plex.png',
      alt: 'Logo do Plex',
    },
  },
  {
    name: 'LanguageTool',
    description: i18n.global.t('apps.languagetool.description'),
    longDescription: i18n.global.t('apps.languagetool.longDescription'),
    features: [
      i18n.global.t('apps.languagetool.features.1'),
      i18n.global.t('apps.languagetool.features.2'),
      i18n.global.t('apps.languagetool.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.languagetool.links.1'), url: 'https://languagetool.org/' },
      {
        label: i18n.global.t('apps.languagetool.links.2'),
        url: 'https://github.com/languagetool-org/languagetool',
      },
      {
        label: i18n.global.t('apps.languagetool.links.3'),
        url: 'https://dev.languagetool.org/http-server',
      },
    ],
    categories: ['tools'],
    alternatives: ['Grammarly', 'Microsoft Editor'],
    banner: {
      src: './apps/icons/languagetool.png',
      alt: 'Ícone do LanguageTool',
    },
    modalBanner: {
      src: './apps/logos/languagetool.png',
      alt: 'Logo do LanguageTool',
    },
  },
  {
    name: 'Owncast',
    description: i18n.global.t('apps.owncast.description'),
    longDescription: i18n.global.t('apps.owncast.longDescription'),
    features: [
      i18n.global.t('apps.owncast.features.1'),
      i18n.global.t('apps.owncast.features.2'),
      i18n.global.t('apps.owncast.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.owncast.links.1'), url: 'https://owncast.online/' },
      { label: i18n.global.t('apps.owncast.links.2'), url: 'https://github.com/owncast/owncast' },
      {
        label: i18n.global.t('apps.owncast.links.3'),
        url: 'https://owncast.online/docs/quickstart/',
      },
    ],
    categories: ['tools'],
    alternatives: ['Twitch', 'YouTube Live', 'Facebook Live'],
    banner: {
      src: './apps/icons/owncast.svg',
      alt: 'Ícone do Owncast',
    },
    modalBanner: {
      src: './apps/logos/owncast.png',
      alt: 'Logo do Owncast',
    },
  },
  {
    name: 'AzuraCast',
    description: i18n.global.t('apps.azuracast.description'),
    longDescription: i18n.global.t('apps.azuracast.longDescription'),
    features: [
      i18n.global.t('apps.azuracast.features.1'),
      i18n.global.t('apps.azuracast.features.2'),
      i18n.global.t('apps.azuracast.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.azuracast.links.1'), url: 'https://www.azuracast.com/' },
      {
        label: i18n.global.t('apps.azuracast.links.2'),
        url: 'https://github.com/AzuraCast/AzuraCast',
      },
      { label: i18n.global.t('apps.azuracast.links.3'), url: 'https://www.azuracast.com/install/' },
    ],
    categories: ['tools'],
    alternatives: ['Radio.co', 'Shoutcast'],
    banner: {
      src: './apps/icons/azuracast.svg',
      alt: 'Ícone do AzuraCast',
    },
    modalBanner: {
      src: './apps/logos/azuracast.png',
      alt: 'Logo do AzuraCast',
    },
  },
  {
    name: 'Keycloak',
    description: i18n.global.t('apps.keycloak.description'),
    longDescription: i18n.global.t('apps.keycloak.longDescription'),
    features: [
      i18n.global.t('apps.keycloak.features.1'),
      i18n.global.t('apps.keycloak.features.2'),
      i18n.global.t('apps.keycloak.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.keycloak.links.1'), url: 'https://www.keycloak.org/' },
      {
        label: i18n.global.t('apps.keycloak.links.2'),
        url: 'https://github.com/keycloak/keycloak',
      },
      {
        label: i18n.global.t('apps.keycloak.links.3'),
        url: 'https://www.keycloak.org/getting-started/',
      },
    ],
    categories: ['tools'],
    alternatives: ['Auth0', 'Okta', 'Firebase Auth'],
    protocol: ['OIDC', 'SAML', 'OAuth2'],
    banner: {
      src: './apps/icons/keycloak.svg',
      alt: 'Ícone do Keycloak',
    },
    modalBanner: {
      src: './apps/logos/keycloak.png',
      alt: 'Logo do Keycloak',
    },
  },
  {
    name: 'WordPress',
    description: i18n.global.t('apps.wordpress.description'),
    longDescription: i18n.global.t('apps.wordpress.longDescription'),
    features: [
      i18n.global.t('apps.wordpress.features.1'),
      i18n.global.t('apps.wordpress.features.2'),
      i18n.global.t('apps.wordpress.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.wordpress.links.1'), url: 'https://wordpress.org/' },
      {
        label: i18n.global.t('apps.wordpress.links.2'),
        url: 'https://github.com/WordPress/WordPress',
      },
      {
        label: i18n.global.t('apps.wordpress.links.3'),
        url: 'https://wordpress.org/support/article/how-to-install-wordpress/',
      },
    ],
    categories: ['tools'],
    alternatives: ['Ghost', 'Wix', 'Squarespace'],
    banner: {
      src: './apps/icons/wordpress.svg',
      alt: 'Ícone do WordPress',
    },
    modalBanner: {
      src: './apps/logos/wordpress.png',
      alt: 'Logo do WordPress',
    },
  },
  {
    name: 'AT Protocol',
    description: i18n.global.t('apps.atprotocol.description'),
    longDescription: i18n.global.t('apps.atprotocol.longDescription'),
    features: [
      i18n.global.t('apps.atprotocol.features.1'),
      i18n.global.t('apps.atprotocol.features.2'),
      i18n.global.t('apps.atprotocol.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.atprotocol.links.1'), url: 'https://atproto.com/' },
      {
        label: i18n.global.t('apps.atprotocol.links.2'),
        url: 'https://github.com/bluesky-social/atproto',
      },
      { label: i18n.global.t('apps.atprotocol.links.3'), url: 'https://blueskyweb.xyz/' },
    ],
    categories: ['protocols'],
    alternatives: ['ActivityPub', 'Diaspora protocol'],
    banner: {
      src: './apps/icons/atprotocol.svg',
      alt: 'Ícone do AT Protocol',
    },
    modalBanner: {
      src: './apps/logos/atprotocol.png',
      alt: 'Logo do AT Protocol',
    },
  },

  {
    name: 'Bluesky',
    description: i18n.global.t('apps.bluesky.description'),
    longDescription: i18n.global.t('apps.bluesky.longDescription'),
    features: [
      i18n.global.t('apps.bluesky.features.1'),
      i18n.global.t('apps.bluesky.features.2'),
      i18n.global.t('apps.bluesky.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.bluesky.links.1'), url: 'https://blueskyweb.xyz/' },
      { label: i18n.global.t('apps.bluesky.links.2'), url: 'https://github.com/bluesky-social' },
      { label: i18n.global.t('apps.bluesky.links.3'), url: 'https://atproto.com/' },
    ],
    categories: ['social'],
    alternatives: ['Twitter'],
    protocol: ['AT Protocol'],
    banner: {
      src: './apps/icons/bluesky.svg',
      alt: 'Ícone do Bluesky',
    },
    modalBanner: {
      src: './apps/logos/bluesky.png',
      alt: 'Logo do Bluesky',
    },
  },
  {
    name: 'RSS',
    description: i18n.global.t('apps.rss.description'),
    longDescription: i18n.global.t('apps.rss.longDescription'),
    features: [
      i18n.global.t('apps.rss.features.1'),
      i18n.global.t('apps.rss.features.2'),
      i18n.global.t('apps.rss.features.3'),
    ],
    links: [
      {
        label: i18n.global.t('apps.rss.links.1'),
        url: 'https://www.mozilla.org/pt-BR/firefox/live-bookmarks/',
      },
      {
        label: i18n.global.t('apps.rss.links.2'),
        url: 'https://github.com/Kickball/awesome-selfhosted#feed-readers',
      },
      { label: i18n.global.t('apps.rss.links.3'), url: 'https://rsshub.app/' },
    ],
    categories: ['protocols'],
    alternatives: ['Newsletters', 'Atom'],
    banner: {
      src: './apps/icons/rss.svg',
      alt: 'Ícone do RSS',
    },
    modalBanner: {
      src: './apps/logos/rss.png',
      alt: 'Logo do RSS',
    },
  },
  {
    name: 'Atom',
    description: i18n.global.t('apps.atom.description'),
    longDescription: i18n.global.t('apps.atom.longDescription'),
    features: [
      i18n.global.t('apps.atom.features.1'),
      i18n.global.t('apps.atom.features.2'),
      i18n.global.t('apps.atom.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.atom.links.1'), url: 'https://tools.ietf.org/html/rfc4287' },
      {
        label: i18n.global.t('apps.atom.links.2'),
        url: 'https://github.com/Kickball/awesome-selfhosted#feed-readers',
      },
      { label: i18n.global.t('apps.atom.links.3'), url: 'https://rsshub.app/' },
    ],
    categories: ['protocols'],
    alternatives: ['RSS', 'Newsletters'],
    banner: {
      src: './apps/icons/atom.svg',
      alt: 'Ícone do Atom',
    },
    modalBanner: {
      src: './apps/logos/atom.png',
      alt: 'Logo do Atom',
    },
  },
  {
    name: 'BitTorrent',
    description: i18n.global.t('apps.bittorrent.description'),
    longDescription: i18n.global.t('apps.bittorrent.longDescription'),
    features: [
      i18n.global.t('apps.bittorrent.features.1'),
      i18n.global.t('apps.bittorrent.features.2'),
      i18n.global.t('apps.bittorrent.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.bittorrent.links.1'), url: 'https://www.bittorrent.com/pt-br/' },
      {
        label: i18n.global.t('apps.bittorrent.links.2'),
        url: 'https://github.com/Kickball/awesome-selfhosted#file-sharing',
      },
      {
        label: i18n.global.t('apps.bittorrent.links.3'),
        url: 'https://www.bittorrent.org/beps/bep_0000.html',
      },
    ],
    categories: ['protocols'],
    alternatives: ['IPFS', 'HTTP', 'Resilio Sync'],
    banner: {
      src: './apps/icons/bittorrent.svg',
      alt: 'Ícone do BitTorrent',
    },
    modalBanner: {
      src: './apps/logos/bittorrent.png',
      alt: 'Logo do BitTorrent',
    },
  },
  {
    name: 'Nostr',
    description: i18n.global.t('apps.nostr.description'),
    longDescription: i18n.global.t('apps.nostr.longDescription'),
    features: [
      i18n.global.t('apps.nostr.features.1'),
      i18n.global.t('apps.nostr.features.2'),
      i18n.global.t('apps.nostr.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.nostr.links.1'), url: 'https://nostr.com/' },
      {
        label: i18n.global.t('apps.nostr.links.2'),
        url: 'https://github.com/aljazceru/awesome-nostr',
      },
      {
        label: i18n.global.t('apps.nostr.links.3'),
        url: 'https://github.com/nostr-protocol/nostr',
      },
    ],
    categories: ['protocols'],
    alternatives: ['ActivityPub', 'AT Protocol'],
    banner: {
      src: './apps/icons/nostr.svg',
      alt: 'Ícone do Nostr',
    },
    modalBanner: {
      src: './apps/logos/nostr.png',
      alt: 'Logo do Nostr',
    },
  },
  {
    name: 'Tor',
    description: i18n.global.t('apps.tor.description'),
    longDescription: i18n.global.t('apps.tor.longDescription'),
    features: [
      i18n.global.t('apps.tor.features.1'),
      i18n.global.t('apps.tor.features.2'),
      i18n.global.t('apps.tor.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.tor.links.1'), url: 'https://www.torproject.org/' },
      { label: i18n.global.t('apps.tor.links.2'), url: 'https://gitweb.torproject.org/' },
      { label: i18n.global.t('apps.tor.links.3'), url: 'https://support.torproject.org/pt-BR/' },
    ],
    categories: ['protocols'],
    alternatives: ['VPN', 'I2P', 'Proxy'],
    banner: {
      src: './apps/icons/tor.svg',
      alt: 'Ícone do Tor',
    },
    modalBanner: {
      src: './apps/logos/tor.png',
      alt: 'Logo do Tor',
    },
  },
  {
    name: 'Grafana',
    description: i18n.global.t('apps.grafana.description'),
    longDescription: i18n.global.t('apps.grafana.longDescription'),
    features: [
      i18n.global.t('apps.grafana.features.1'),
      i18n.global.t('apps.grafana.features.2'),
      i18n.global.t('apps.grafana.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.grafana.links.1'), url: 'https://grafana.com/' },
      { label: i18n.global.t('apps.grafana.links.2'), url: 'https://github.com/grafana/grafana' },
      {
        label: i18n.global.t('apps.grafana.links.3'),
        url: 'https://grafana.com/docs/grafana/latest/setup/',
      },
    ],
    categories: ['tools'],
    alternatives: ['Kibana', 'Datadog', 'Tableau'],
    banner: {
      src: './apps/icons/grafana.svg',
      alt: 'Ícone do Grafana',
    },
    modalBanner: {
      src: './apps/logos/grafana.png',
      alt: 'Logo do Grafana',
    },
  },
  {
    name: 'Prometheus',
    description: i18n.global.t('apps.prometheus.description'),
    longDescription: i18n.global.t('apps.prometheus.longDescription'),
    features: [
      i18n.global.t('apps.prometheus.features.1'),
      i18n.global.t('apps.prometheus.features.2'),
      i18n.global.t('apps.prometheus.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.prometheus.links.1'), url: 'https://prometheus.io/' },
      {
        label: i18n.global.t('apps.prometheus.links.2'),
        url: 'https://github.com/prometheus/prometheus',
      },
      {
        label: i18n.global.t('apps.prometheus.links.3'),
        url: 'https://prometheus.io/docs/prometheus/latest/installation/',
      },
    ],
    categories: ['tools'],
    alternatives: ['Zabbix', 'Datadog'],
    banner: {
      src: './apps/icons/prometheus.svg',
      alt: 'Ícone do Prometheus',
    },
    modalBanner: {
      src: './apps/logos/prometheus.png',
      alt: 'Logo do Prometheus',
    },
  },
  {
    name: 'Funkwhale',
    description: i18n.global.t('apps.funkwhale.description'),
    longDescription: i18n.global.t('apps.funkwhale.longDescription'),
    features: [
      i18n.global.t('apps.funkwhale.features.1'),
      i18n.global.t('apps.funkwhale.features.2'),
      i18n.global.t('apps.funkwhale.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.funkwhale.links.1'), url: 'https://funkwhale.audio/' },
      {
        label: i18n.global.t('apps.funkwhale.links.2'),
        url: 'https://dev.funkwhale.audio/funkwhale/funkwhale',
      },
      {
        label: i18n.global.t('apps.funkwhale.links.3'),
        url: 'https://docs.funkwhale.audio/administrator/installation/index.html',
      },
    ],
    categories: ['tools'],
    alternatives: ['Spotify', 'SoundCloud'],
    protocol: ['ActivityPub', 'Fediverso'],
    banner: {
      src: './apps/icons/funkwhale.svg',
      alt: 'Ícone do Funkwhale',
    },
    modalBanner: {
      src: './apps/logos/funkwhale.png',
      alt: 'Logo do Funkwhale',
    },
  },

  {
    name: 'IRC',
    description: i18n.global.t('apps.irc.description'),
    longDescription: i18n.global.t('apps.irc.longDescription'),
    features: [
      i18n.global.t('apps.irc.features.1'),
      i18n.global.t('apps.irc.features.2'),
      i18n.global.t('apps.irc.features.3'),
    ],
    links: [
      {
        label: i18n.global.t('apps.irc.links.1'),
        url: 'https://pt.wikipedia.org/wiki/Internet_Relay_Chat',
      },
      {
        label: i18n.global.t('apps.irc.links.2'),
        url: 'https://github.com/Kickball/awesome-selfhosted#irc',
      },
      { label: i18n.global.t('apps.irc.links.3'), url: 'https://tools.ietf.org/html/rfc1459' },
    ],
    categories: ['protocols'],
    alternatives: ['Matrix', 'XMPP'],
    banner: {
      src: './apps/icons/irc.svg',
      alt: 'Ícone do IRC',
    },
    modalBanner: {
      src: './apps/logos/irc.png',
      alt: 'Logo do IRC',
    },
  },
  {
    name: 'The Lounge',
    description: i18n.global.t('apps.thelounge.description'),
    longDescription: i18n.global.t('apps.thelounge.longDescription'),
    features: [
      i18n.global.t('apps.thelounge.features.1'),
      i18n.global.t('apps.thelounge.features.2'),
      i18n.global.t('apps.thelounge.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.thelounge.links.1'), url: 'https://thelounge.chat/' },
      {
        label: i18n.global.t('apps.thelounge.links.2'),
        url: 'https://github.com/thelounge/thelounge',
      },
      {
        label: i18n.global.t('apps.thelounge.links.3'),
        url: 'https://thelounge.chat/docs/install-and-upgrade/',
      },
    ],
    categories: ['tools'],
    alternatives: ['Slack', 'Discord', 'Telegram', 'WhatsApp'],
    protocol: ['IRC'],
    banner: {
      src: './apps/icons/thelounge.svg',
      alt: 'Ícone do The Lounge',
    },
    modalBanner: {
      src: './apps/logos/thelounge.png',
      alt: 'Logo do The Lounge',
    },
  },
  {
    name: 'La Suite',
    description: i18n.global.t('apps.lasuite.description'),
    longDescription: i18n.global.t('apps.lasuite.longDescription'),
    features: [
      i18n.global.t('apps.lasuite.features.1'),
      i18n.global.t('apps.lasuite.features.2'),
      i18n.global.t('apps.lasuite.features.3'),
    ],
    links: [
      { label: i18n.global.t('apps.lasuite.links.1'), url: 'https://suite.numerique.gouv.fr/' },
      { label: i18n.global.t('apps.lasuite.links.2'), url: 'https://www.numerique.gouv.fr/' },
      {
        label: i18n.global.t('apps.lasuite.links.3'),
        url: 'https://github.com/ministere-numerique',
      },
    ],
    categories: ['tools'],
    alternatives: ['Google Workspace', 'Microsoft 365', 'Zoho Workplace'],
    banner: {
      src: './apps/icons/lasuite.svg',
      alt: 'Ícone da La Suite',
    },
    modalBanner: {
      src: './apps/logos/lasuite.png',
      alt: 'Logo da La Suite',
    },
  },
];
