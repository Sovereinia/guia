<script setup lang="ts">
import AppCard from '@/components/AppCard.vue';
import AppModal from '@/components/AppModal.vue';
import AppSearch from '@/components/form/AppSearch.vue';
import CategorySelector from '@/components/form/CategorySelector.vue';
import ReshuffleButton from '@/components/form/ReshuffleButton.vue';
import SurpriseMeButton from '@/components/form/SurpriseMeButton.vue';
import { useSEO } from '@/composables/useSEO';
import { apps } from '@/data/apps';
import { categories } from '@/data/categories';
import { useGlobalStore } from '@/stores/global';
import { useHeadersStore } from '@/stores/headers';
import type { App, CategoryId } from '@/types';
import { filterApps, shuffleAppsPurely, sortAppsByLinksThenRandom } from '@/utils/filter';
import { getAppSlug } from '@/utils/global';
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

const { t } = useI18n();
const headersStore = useHeadersStore();
const globalStore = useGlobalStore();
const { updateSEO } = useSEO();

const modalData = ref<Partial<App>>({});
const searchQuery = ref('');
const selectedCategory = ref<CategoryId>('all');
const showFilters = ref(false);
const route = useRoute();
const router = useRouter();

// Sugestões para o autocomplete
const suggestions = apps.flatMap((app) => app.alternatives || []);

const orderedApps = computed(() => {
  // Access shuffleTrigger to ensure re-computation on each shuffle
  globalStore.shuffleTrigger;
  return globalStore.isReshuffled 
    ? shuffleAppsPurely(apps) 
    : sortAppsByLinksThenRandom(apps);
});

const filteredApps = computed(() => {
  return filterApps(orderedApps.value, selectedCategory.value, searchQuery.value);
});

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

onMounted(() => {
  const appSlug = route.query.app;
  if (appSlug) {
    const found = apps.find(app => getAppSlug(app) === appSlug);
    if (found) {
      handleAbrirModal(found);
    }
  }
});

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth);

  // This section sets initial SEO for home page
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
});

function handleAbrirModal(app: App) {
  if (isUpdatingFromURL.value) return;
  modalData.value = {};
  nextTick(() => {
    modalData.value = { ...app };
    mostrarModal.value = true;
    router.replace({ query: { ...route.query, app: getAppSlug(app) } });

  });
}

function handleSurpriseMe(app: App) {
  // Reuse existing modal logic
  handleAbrirModal(app);
}

// When closing modal
function handleFecharModal() {
  mostrarModal.value = false;
  modalData.value = {};
  // Remove 'app' from query
  const { app, ...rest } = route.query;
  router.replace({ query: rest });
}

watch(
  () => route.query.app,
  (appSlug) => {
    if (appSlug && !mostrarModal.value) {
      const found = apps.find(app => getAppSlug(app) === appSlug);
      if (found) {
        isUpdatingFromURL.value = true;
        modalData.value = {};
        nextTick(() => {
          modalData.value = { ...found };
          mostrarModal.value = true;
          isUpdatingFromURL.value = false;
        });
      }
    } else if (!appSlug && mostrarModal.value) {
      // URL was cleared but modal is still open - close it
      mostrarModal.value = false;
      modalData.value = {};
    }
  }
);

//This section watch for modal changes to update SEO dynamically
watch([mostrarModal, modalData], ([isOpen, app]) => {
  if (isOpen && app?.name) {
    // this unit updates SEO when modal opens
    updateSEO({
      title: `${app.name} - Sovereinia | Guia de Apps`,
      description: `${app.name}: ${app.description || 'App descentralizado para mais liberdade e privacidade'}. Descubra alternativas descentralizadas.`,
      ogTitle: `${app.name} - App Descentralizado`,
      ogDescription: `${app.name}: ${app.description || 'App descentralizado para mais liberdade e privacidade'}`,
      twitterTitle: `${app.name} - App Descentralizado`,
      twitterDescription: `${app.name}: ${app.description || 'App descentralizado para mais liberdade e privacidade'}`,
    });
  } else if (!isOpen) {
    // this section resets the SEO when modal closes
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

// This is section watch for search/filter changes to update SEO
watch([searchQuery, selectedCategory], ([query, category]) => {
  // Reset reshuffle when user searches or changes category
  if ((query && query.length > 0) || category !== 'all') {
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
    <CategorySelector v-if="showFilters" v-model="selectedCategory" :categories="categories" />
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
    class="grid grid-cols-1 w-full max-w-full md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-12 mt-2"
  >
    <AppCard v-for="app in filteredApps" :key="app.name" :app="app" @abrir="handleAbrirModal" />

    <AppModal :abrir="mostrarModal" :app="modalData" @atualizarAbrir="handleFecharModal" />
  </section>
</template>
