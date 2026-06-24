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
import { applyQuickFilters } from '@/utils/quickFilters';
import { filterStarredOnly, hasActiveHomeFilters } from '@/utils/homeFilters';
import { countActiveFilters, describeActiveFilters } from '@/utils/activeFilters';
import { parseSearchQueryParam, withSearchQueryParam } from '@/utils/searchQueryUrl';
import { currentPageLink } from '@/utils/pageLink';
import { resolveEscapeAction } from '@/utils/escapeAction';
import { copyTextToClipboard } from '@/utils/clipboardCopy';
import { isEditableTarget, shouldHandleGlobalShortcut } from '@/utils/keyboardTarget';
import {
  clearRecentApps,
  listRecentApps,
  pushRecentApp,
  resolveRecentApps,
} from '@/utils/recentApps';
import {
  exportStarredAsText,
  listStarredApps,
  resolveStarredApps,
} from '@/utils/starredApps';
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
const starredOnly = ref(false);
/** Bump when recent list changes so the chip row re-renders. */
const recentTick = ref(0);
/** Bump when stars change so favorites row re-renders (stars toggle in modal). */
const starsTick = ref(0);
const favoritesCopied = ref(false);
const pageLinkCopied = ref(false);
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
  const list = filterApps(
    orderedApps.value,
    selectedCategory.value,
    searchQuery.value,
    selectedUseCase.value,
  );
  const quick = applyQuickFilters(list, {
    beginnersOnly: beginnersOnly.value,
    federatedOnly: federatedOnly.value,
  });
  return filterStarredOnly(quick, listStarredApps(), starredOnly.value);
});

function toggleBeginnersOnly() {
  beginnersOnly.value = !beginnersOnly.value;
  showFilters.value = true;
  globalStore.resetReshuffle();
}

function toggleFederatedOnly() {
  federatedOnly.value = !federatedOnly.value;
  showFilters.value = true;
  globalStore.resetReshuffle();
}

function toggleStarredOnly() {
  starredOnly.value = !starredOnly.value;
  showFilters.value = true;
  starsTick.value += 1;
  globalStore.resetReshuffle();
}

const homeFilterState = computed(() => ({
  searchQuery: searchQuery.value,
  selectedCategory: selectedCategory.value,
  selectedUseCase: selectedUseCase.value,
  beginnersOnly: beginnersOnly.value,
  federatedOnly: federatedOnly.value,
  starredOnly: starredOnly.value,
}));

const filtersActive = computed(() => hasActiveHomeFilters(homeFilterState.value));

const activeFilterDescriptors = computed(() => describeActiveFilters(homeFilterState.value));
const activeFilterCount = computed(() => countActiveFilters(homeFilterState.value));
const activeFilterKeys = computed(() => activeFilterDescriptors.value.map((d) => d.key));

function clearAllFilters() {
  searchQuery.value = '';
  selectedCategory.value = 'all';
  selectedUseCase.value = 'all';
  beginnersOnly.value = false;
  federatedOnly.value = false;
  starredOnly.value = false;
  globalStore.resetReshuffle();
}

const recentApps = computed(() => {
  recentTick.value;
  return resolveRecentApps(apps.value, listRecentApps());
});

const starredApps = computed(() => {
  starsTick.value;
  return resolveStarredApps(apps.value, listStarredApps());
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

function refreshStarsTick() {
  starsTick.value += 1;
}


async function onCopyPageLink() {
  const url = currentPageLink(window.location);
  await copyTextToClipboard(url);
  pageLinkCopied.value = true;
  window.setTimeout(() => {
    pageLinkCopied.value = false;
  }, 2000);
}

async function onExportFavorites() {
  const text = exportStarredAsText(listStarredApps());
  if (!text) return;
  await copyTextToClipboard(text);
  favoritesCopied.value = true;
  window.setTimeout(() => {
    favoritesCopied.value = false;
  }, 2000);
  refreshStarsTick();
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

/** Re-read stars when modal closes (user may have toggled star inside modal). */
watch(mostrarModal, (open) => {
  if (!open) refreshStarsTick();
});

const windowWidth = ref(window.innerWidth);
const updateWindowWidth = () => (windowWidth.value = window.innerWidth);

const searchPlaceholder = computed(() =>
  windowWidth.value > 600 ? t('search.placeholder.desktop') : t('search.placeholder.mobile'),
);

const isUpdatingFromURL = ref(false);

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
  if (e.defaultPrevented) return;

  // Esc may clear filters even from search; other chords use the shared guard.
  if (e.key === 'Escape') {
    const action = resolveEscapeAction({
      shortcutsOpen: showShortcuts.value,
      modalOpen: mostrarModal.value,
      filtersActive: filtersActive.value,
    });
    if (action === 'close-shortcuts') {
      e.preventDefault();
      showShortcuts.value = false;
      return;
    }
    if (action === 'clear-filters') {
      // Allow Esc from the search field too (clears query/filters).
      e.preventDefault();
      clearAllFilters();
      return;
    }
    // modalOpen: let dialog handle Esc
    return;
  }

  if (!shouldHandleGlobalShortcut(e)) return;

  if (e.key === '?' && !isEditableTarget(e.target)) {
    e.preventDefault();
    showShortcuts.value = !showShortcuts.value;
    return;
  }

  if (e.key === '/' && !isEditableTarget(e.target) && !mostrarModal.value && !showShortcuts.value) {
    e.preventDefault();
    focusSearchInput();
  }
}

onMounted(() => {
  const fromUrl = parseSearchQueryParam(route.query.q);
  if (fromUrl) {
    searchQuery.value = fromUrl;
    showFilters.value = true;
  }
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


/** Keep ?q= in sync so filtered views are shareable / reloadable. */
watch(searchQuery, (q) => {
  const cur = parseSearchQueryParam(route.query.q);
  const trimmed = q.trim();
  if (trimmed === cur) return;
  const next = withSearchQueryParam({ ...route.query } as Record<string, unknown>, q);
  router.replace({ query: next as typeof route.query });
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
    <p
      class="text-center text-sm text-base-content/70 mb-3"
      data-testid="app-count-badge"
      aria-live="polite"
    >
      {{ t('filters.appCount', { shown: filteredApps.length, total: apps.length }) }}
    </p>
    <p
      v-if="activeFilterCount > 0"
      class="text-center text-xs text-base-content/60 mb-2"
      data-testid="active-filters-summary"
      aria-live="polite"
    >
      {{ t('filters.activeSummary', { count: activeFilterCount }) }}
      <span class="sr-only">{{ activeFilterKeys.join(', ') }}</span>
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
      <button
        type="button"
        class="btn btn-ghost btn-sm"
        data-testid="copy-page-link"
        @click="onCopyPageLink"
      >
        {{ pageLinkCopied ? t('share.copied') : t('share.copyLink') }}
      </button>
    </div>
    <div
      class="flex justify-center gap-2 flex-wrap"
      data-testid="quick-filter-chips"
      role="group"
      :aria-label="t('filters.quickLabel')"
    >
      <button
        type="button"
        class="btn btn-sm"
        :class="beginnersOnly ? 'btn-primary' : 'btn-outline'"
        data-testid="chip-beginners"
        :aria-pressed="beginnersOnly"
        @click="toggleBeginnersOnly"
      >
        {{ t('filters.beginners') }}
      </button>
      <button
        type="button"
        class="btn btn-sm"
        :class="federatedOnly ? 'btn-primary' : 'btn-outline'"
        data-testid="chip-federated"
        :aria-pressed="federatedOnly"
        @click="toggleFederatedOnly"
      >
        {{ t('filters.federated') }}
      </button>
      <button
        type="button"
        class="btn btn-sm"
        :class="starredOnly ? 'btn-primary' : 'btn-outline'"
        data-testid="chip-starred"
        :aria-pressed="starredOnly"
        @click="toggleStarredOnly"
      >
        {{ t('filters.starred') }}
      </button>
      <button
        v-if="filtersActive"
        type="button"
        class="btn btn-ghost btn-sm"
        data-testid="clear-filters"
        @click="clearAllFilters"
      >
        {{ t('filters.clear') }}
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
          :apps="filteredApps" 
          @surprise="handleSurpriseMe"
        />
        <ReshuffleButton />
      </div>
    </div>
  </section>

  <section
    v-if="starredApps.length > 0"
    class="mb-4"
    data-testid="favorites-export"
    aria-labelledby="favorites-heading"
  >
    <div class="flex items-center justify-between gap-2 mb-2 px-1 flex-wrap">
      <h2 id="favorites-heading" class="text-sm font-semibold text-base-content/80">
        {{ t('favorites.title') }}
        <span class="font-normal opacity-70">({{ starredApps.length }})</span>
      </h2>
      <button
        type="button"
        class="btn btn-ghost btn-xs"
        data-testid="export-favorites"
        @click="onExportFavorites"
      >
        {{ favoritesCopied ? t('favorites.copied') : t('favorites.export') }}
      </button>
    </div>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="app in starredApps"
        :key="'star-' + app.name"
        type="button"
        class="btn btn-sm btn-outline"
        :data-testid="'favorite-chip-' + app.name"
        @click="handleAbrirModal(app)"
      >
        {{ app.name }}
      </button>
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
    v-else
    class="text-center text-xs text-base-content/50 mb-3 px-2"
    data-testid="recent-empty-hint"
  >
    {{ t('recent.empty') }}
  </p>

  <p
    v-if="filtersActive"
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
