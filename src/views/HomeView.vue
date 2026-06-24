<script setup lang="ts">
import AppCard from '@/components/AppCard.vue';
import AppSearch from '@/components/form/AppSearch.vue';
import CategorySelector from '@/components/form/CategorySelector.vue';
import UseCaseSelector from '@/components/form/UseCaseSelector.vue';
import ReshuffleButton from '@/components/form/ReshuffleButton.vue';
import SurpriseMeButton from '@/components/form/SurpriseMeButton.vue';
import RecommendationWizard from '@/components/RecommendationWizard.vue';
import ShortcutsHelp from '@/components/ShortcutsHelp.vue';
import { useSEO } from '@/composables/useSEO';
import { useApps } from '@/data/apps';
import { categories } from '@/data/categories';
import { useGlobalStore } from '@/stores/global';
import { useHeadersStore } from '@/stores/headers';
import type { App, CategoryId, UseCaseId } from '@/types';
import { filterApps, shuffleAppsPurely, sortAppsByLinksThenRandom } from '@/utils/filter';
import { getAppSlug } from '@/utils/global';
import {
  clearRecentApps,
  listRecentApps,
  pushRecentApp,
  resolveRecentApps,
} from '@/utils/recentApps';
import { computed, defineAsyncComponent, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

/** Modal is large and rarely needed on first paint — load on demand (issue #64). */
const AppModal = defineAsyncComponent(() => import('@/components/AppModal.vue'));

const { t } = useI18n();
const headersStore = useHeadersStore();
const globalStore = useGlobalStore();
const { updateSEO } = useSEO();
const { apps } = useApps();

const modalData = ref<Partial<App>>({});
const searchQuery = ref('');
const selectedCategory = ref<CategoryId>('all');
const selectedUseCase = ref<UseCaseId | 'all'>('all');
const showFilters = ref(false);
const showWizard = ref(false);
const showShortcuts = ref(false);
const beginnersOnly = ref(false);
const federatedOnly = ref(false);
/** Bump when recent list changes so the chip row re-renders. */
const recentTick = ref(0);
const route = useRoute();
const router = useRouter();

// Sugestões para o autocomplete
const suggestions = computed(() => apps.value.flatMap((app) => app.alternatives || []));

const orderedApps = computed(() => {
  globalStore.shuffleTrigger;
  return globalStore.isReshuffled 
    ? shuffleAppsPurely(apps.value) 
    : sortAppsByLinksThenRandom(apps.value);
});

const filteredApps = computed(() => {
  let list = filterApps(orderedApps.value, selectedCategory.value, searchQuery.value, selectedUseCase.value);
  if (beginnersOnly.value) {
    list = list.filter((a) => a.recommendedForBeginners);
  }
  if (federatedOnly.value) {
    list = list.filter(
      (a) =>
        (a.protocol || []).length > 0 ||
        a.categories.includes('protocols') ||
        (a.useCases || []).includes('protocol'),
    );
  }
  return list;
});

const recentApps = computed(() => {
  recentTick.value;
  return resolveRecentApps(apps.value, listRecentApps());
});

function recordRecent(app: App | Partial<App> | undefined) {
  if (!app?.name) return;
  pushRecentApp(app.name);
  recentTick.value += 1;
}

function onClearRecent() {
  clearRecentApps();
  recentTick.value += 1;
}

function onWizardApply(payload: {
  useCase: UseCaseId | 'all';
  beginnersOnly: boolean;
  federatedOnly: boolean;
}) {
  selectedUseCase.value = payload.useCase;
  beginnersOnly.value = payload.beginnersOnly;
  federatedOnly.value = payload.federatedOnly;
  showFilters.value = true;
  showWizard.value = false;
  globalStore.resetReshuffle();
}

const title = computed(() => t('app.title'));
const subtitleBase = computed(() => {
  const isMobile = window.innerWidth <= 600;
  const headers = isMobile ? headersStore.mobileHeaders : headersStore.desktopHeaders;
  const randomKey = headers[Math.floor(Math.random() * headers.length)];
  return t(randomKey);
});
const subtitleSuffix = computed(() => t('app.subtitle'));
const mostrarModal = ref(false);

const windowWidth = ref(window.innerWidth);
const updateWindowWidth = () => (windowWidth.value = window.innerWidth);

const searchPlaceholder = computed(() =>
  windowWidth.value > 600 ? t('search.placeholder.desktop') : t('search.placeholder.mobile'),
);

const isUpdatingFromURL = ref(false);

function isTypingTarget(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
}

function focusSearchInput() {
  showFilters.value = true;
  nextTick(() => {
    const input = document.querySelector<HTMLInputElement>(
      '[data-testid="app-search"] input, input[type="search"], header ~ section input',
    );
    const fallback = document.querySelector<HTMLInputElement>('input');
    (input || fallback)?.focus();
  });
}

function onGlobalKeydown(e: KeyboardEvent) {
  if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;

  if (e.key === '?' && !isTypingTarget(e.target)) {
    e.preventDefault();
    showShortcuts.value = !showShortcuts.value;
    return;
  }

  if (showShortcuts.value && e.key === 'Escape') {
    e.preventDefault();
    showShortcuts.value = false;
    return;
  }

  if (e.key === '/' && !isTypingTarget(e.target) && !mostrarModal.value && !showShortcuts.value) {
    e.preventDefault();
    focusSearchInput();
  }
}

onMounted(() => {
  const appSlug = route.query.app;
  if (appSlug) {
    const found = apps.value.find(app => getAppSlug(app) === appSlug);
    if (found) {
      handleAbrirModal(found);
    }
  }
});

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth);
  window.addEventListener('keydown', onGlobalKeydown);

  updateSEO({
    title: 'Sovereinia | Guia de Apps Descentralizados',
    description:
      'Descubra apps descentralizados que funcionam sem um único dono, com redes independentes, mais liberdade, privacidade e controle para quem participa.',
    keywords:
      'Sovereinia, Apps Descentralizados, Auto-hospedagem, Apps Alternativos, Redes Sociais, Ferramentas de Trabalho, Protocolos Abertos, Privacidade, Liberdade Digital',
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth);
  window.removeEventListener('keydown', onGlobalKeydown);
});

function handleAbrirModal(app: App) {
  if (isUpdatingFromURL.value) return;
  modalData.value = {};
  nextTick(() => {
    modalData.value = { ...app };
    mostrarModal.value = true;
    recordRecent(app);
    router.replace({ query: { ...route.query, app: getAppSlug(app) } });
  });
}

function handleSurpriseMe(app: App) {
  handleAbrirModal(app);
}

function handleFecharModal() {
  mostrarModal.value = false;
  modalData.value = {};
  const { app, ...rest } = route.query;
  router.replace({ query: rest });
}

/** Navigate to another app while the modal stays open (prev/next arrows). */
function handleNavigateModal(app: App) {
  modalData.value = { ...app };
  recordRecent(app);
  router.replace({ query: { ...route.query, app: getAppSlug(app) } });
}

watch(
  () => route.query.app,
  (appSlug) => {
    if (appSlug && !mostrarModal.value) {
      const found = apps.value.find(app => getAppSlug(app) === appSlug);
      if (found) {
        isUpdatingFromURL.value = true;
        modalData.value = {};
        nextTick(() => {
          modalData.value = { ...found };
          mostrarModal.value = true;
          recordRecent(found);
          isUpdatingFromURL.value = false;
        });
      }
    } else if (!appSlug && mostrarModal.value) {
      mostrarModal.value = false;
      modalData.value = {};
    }
  }
);

watch([mostrarModal, modalData], ([isOpen, app]) => {
  if (isOpen && app?.name) {
    updateSEO({
      title: `${app.name} - Sovereinia | Guia de Apps`,
      description: `${app.name}: ${app.description || 'App descentralizado para mais liberdade e privacidade'}. Descubra alternativas descentralizadas.`,
      ogTitle: `${app.name} - App Descentralizado`,
      ogDescription: `${app.name}: ${app.description || 'App descentralizado para mais liberdade e privacidade'}`,
      twitterTitle: `${app.name} - App Descentralizado`,
      twitterDescription: `${app.name}: ${app.description || 'App descentralizado para mais liberdade e privacidade'}`,
    });
  } else if (!isOpen) {
    updateSEO({
      title: 'Sovereinia | Guia de Apps Descentralizados',
      description:
        'Descubra apps descentralizados que funcionam sem um único dono, com redes independentes, mais liberdade, privacidade e controle para quem participa.',
      ogTitle: 'Sovereinia | Guia de Apps',
      ogDescription:
        'Apps descentralizados que funcionam sem um único dono, com redes independentes, mais liberdade, privacidade e controle para quem participa.',
      twitterTitle: 'Sovereinia | Guia de Apps',
      twitterDescription:
        'Apps descentralizados que funcionam sem um único dono, com redes independentes, mais liberdade, privacidade e controle para quem participa.',
    });
  }
});

watch([searchQuery, selectedCategory, selectedUseCase], ([query, category, useCase]) => {
  if ((query && query.length > 0) || category !== 'all' || useCase !== 'all') {
    globalStore.resetReshuffle();
  }

  let title = 'Sovereinia | Guia de Apps Descentralizados';
  let description =
    'Descubra apps descentralizados que funcionam sem um único dono, com redes independentes, mais liberdade, privacidade e controle para quem participa.';

  if (query) {
    title = `Busca: ${query} - Sovereinia | Guia de Apps`;
    description = `Resultados da busca por "${query}" em apps descentralizados. Encontre alternativas com mais liberdade e privacidade.`;
  } else if (category !== 'all') {
    const categoryName = categories.find((cat) => cat.id === category) || category;
    title = `${categoryName} - Sovereinia | Guia de Apps`;
    description = `Apps descentralizados na categoria ${categoryName}. Descubra alternativas com mais liberdade e privacidade.`;
  }

  updateSEO({ title, description });
});
</script>

<template>
  <header>
    <h1 class="text-3xl font-bold text-color text-center mb-4">{{ title }}</h1>
    <p class="text-center text-base mb-5 px-2">
      {{ subtitleBase }} <span class="font-bold">{{ subtitleSuffix }}</span>
    </p>
  </header>

  <section class="w-full space-y-5">
    <div class="flex justify-center gap-2 flex-wrap">
      <button
        type="button"
        class="btn btn-outline btn-sm"
        data-testid="open-wizard"
        @click="showWizard = !showWizard"
      >
        {{ t('wizard.open') }}
      </button>
      <button
        type="button"
        class="btn btn-ghost btn-sm"
        data-testid="open-shortcuts"
        :aria-label="t('shortcuts.open')"
        @click="showShortcuts = true"
      >
        {{ t('shortcuts.open') }}
        <kbd class="ml-1 opacity-60 font-mono text-xs">?</kbd>
      </button>
    </div>
    <RecommendationWizard
      v-if="showWizard"
      :apps="apps"
      @apply="onWizardApply"
      @close="showWizard = false"
    />
    <CategorySelector v-if="showFilters" v-model="selectedCategory" :categories="categories" />
    <UseCaseSelector v-if="showFilters" v-model="selectedUseCase" />
    <div class="mb-8 flex gap-2 items-start w-full">
      <div class="flex-1 min-w-0">
        <AppSearch
          v-model="searchQuery"
          :suggestions="suggestions"
          :placeholder="searchPlaceholder"
          @focus="showFilters = true"
          @click="showFilters = true"
        />
      </div>
      <div class="flex-shrink-0 flex gap-2">
        <SurpriseMeButton 
          :apps="orderedApps" 
          @surprise="handleSurpriseMe"
        />
        <ReshuffleButton />
      </div>
    </div>
  </section>

  <section
    v-if="recentApps.length > 0"
    class="mb-4"
    data-testid="recent-apps"
    aria-labelledby="recent-apps-heading"
  >
    <div class="flex items-center justify-between gap-2 mb-2 px-1">
      <h2 id="recent-apps-heading" class="text-sm font-semibold text-base-content/80">
        {{ t('recent.title') }}
      </h2>
      <button
        type="button"
        class="btn btn-ghost btn-xs"
        data-testid="clear-recent"
        @click="onClearRecent"
      >
        {{ t('recent.clear') }}
      </button>
    </div>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="app in recentApps"
        :key="'recent-' + app.name"
        type="button"
        class="btn btn-sm btn-outline"
        :data-testid="'recent-chip-' + app.name"
        @click="handleAbrirModal(app)"
      >
        {{ app.name }}
      </button>
    </div>
  </section>

  <p
    v-if="searchQuery.trim() || selectedCategory !== 'all' || selectedUseCase !== 'all' || beginnersOnly || federatedOnly"
    class="text-sm text-center text-base-content/70 mb-3"
    data-testid="search-result-count"
    aria-live="polite"
  >
    {{ t('search.resultCount', { count: filteredApps.length }) }}
  </p>

  <p
    v-if="filteredApps.length === 0"
    class="text-center text-base-content/80 py-10 px-4"
    data-testid="search-no-results"
    role="status"
  >
    {{ t('search.noResults') }}
  </p>

  <section
    v-else
    class="grid grid-cols-1 w-full max-w-full md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-12 mt-2"
  >
    <AppCard v-for="app in filteredApps" :key="app.name" :app="app" @abrir="handleAbrirModal" />
  </section>

  <AppModal
    :abrir="mostrarModal"
    :app="modalData"
    :apps="filteredApps"
    @atualizarAbrir="handleFecharModal"
    @navigate="handleNavigateModal"
  />

  <ShortcutsHelp :open="showShortcuts" @close="showShortcuts = false" />
</template>
