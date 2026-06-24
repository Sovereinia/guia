<script setup lang="ts">
import { ref, type Ref, watch, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import { getAlternativeIcon } from '@/utils/global.ts';
import { getProtocolInfo } from '@/utils/global.ts';
import { getFaviconPath } from '@/utils/global.ts';
import { getAppSlug } from '@/utils/global.ts';
import { canGoNext, canGoPrevious, getNextApp, getPreviousApp } from '@/utils/modalNavigation';
import type { App } from '@/types';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';


const props = defineProps<{
  abrir: boolean;
  app: Partial<App> & { _openCount?: number };
  /** Currently visible apps (after filters/search) used for prev/next navigation. */
  apps?: App[];
}>();

const emit = defineEmits<{
  atualizarAbrir: [value: boolean];
  navigate: [app: App];
}>();

const expandido = ref(false);

const bannerErrored = ref(false);

const visible = ref(false);

const localApp = ref<Partial<App>>({});

const route = useRoute();
const shareToast = ref(false);

const myModal = ref<HTMLDialogElement | null>(null)

const previousActiveElement = ref<HTMLElement | null>(null);

const visibleApps = computed(() => props.apps ?? []);

const hasPrevious = computed(() => canGoPrevious(visibleApps.value, localApp.value.name));
const hasNext = computed(() => canGoNext(visibleApps.value, localApp.value.name));

function goToPrevious() {
  const prev = getPreviousApp(visibleApps.value, localApp.value.name);
  if (prev) emit('navigate', prev);
}

function goToNext() {
  const next = getNextApp(visibleApps.value, localApp.value.name);
  if (next) emit('navigate', next);
}

function onKeydown(event: KeyboardEvent) {
  if (!props.abrir || !visible.value) return;
  const target = event.target as HTMLElement | null;
  if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
    return;
  }
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    goToPrevious();
  } else if (event.key === 'ArrowRight') {
    event.preventDefault();
    goToNext();
  }
}

async function loadAppIntoModal(source: Partial<App>) {
  bannerErrored.value = false;
  expandido.value = false;
  visible.value = false;
  localApp.value = {};
  visibleAlternatives.value = {};
  favicons.value = [];

  await nextTick();

  localApp.value = { ...source };
  visible.value = true;
}

watch(() => props.abrir, async (newValue) => {
  if (newValue && props.app) {
    previousActiveElement.value = document.activeElement as HTMLElement;

    await loadAppIntoModal(props.app);

    await nextTick();
    myModal.value?.showModal();

    const firstFocusable = myModal.value?.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') as HTMLElement;
    if (firstFocusable) {
      firstFocusable.focus();
    }
  } else if (!newValue) {
    if (myModal.value?.open) {
      myModal.value.close();
    }
  }
});

// Keep modal content in sync when parent navigates to another app while open.
watch(
  () => props.app.name,
  async (newName, oldName) => {
    if (!props.abrir || !newName || newName === oldName) return;
    await loadAppIntoModal(props.app);
  },
);

watch(() => props.app._openCount, async (newValue) => {
  if (!props.app || !newValue) return;
});

function handleDialogClose() {
  emit('atualizarAbrir', false);
  bannerErrored.value = false
  expandido.value = false
  visible.value = false
  localApp.value = {}
}


async function shareApp() {
  const slug = getAppSlug(localApp.value);
  const basePath = window.location.origin + window.location.pathname;
  const url = `${basePath}?app=${slug}`;
  await navigator.clipboard.writeText(url);
  shareToast.value = true;
  setTimeout(() => (shareToast.value = false), 2000);
}

function openModal() {
  myModal.value?.showModal()
}

function closeModal() {
  if (myModal.value?.open) {
    myModal.value.close();
  }

  bannerErrored.value = false;
  expandido.value = false;
  visibleAlternatives.value = {};
  favicons.value = [];
  localApp.value = {};

  emit('atualizarAbrir', false);
}

const visibleAlternatives = ref<Record<string, boolean>>({});

watch(
  () => localApp.value.alternatives,
  (alts) => {
    visibleAlternatives.value = {};
    (alts || []).forEach((alt) => {
      visibleAlternatives.value[alt] = true;
    });
  },
  { immediate: true }
);



function faviconSrc(url: string): { src: string; visible: Ref<boolean>; onError: () => void } {
  const src = getFaviconPath(url);
  const visible = ref(true);
  const onError = () => (visible.value = false);
  return { src, visible, onError };
}

const favicons = ref<{ 
  label: string; 
  url: string; 
  faviconSrc: string; 
  faviconVisible: Ref<boolean>; 
  faviconError: () => void;
}[]>([]);

watch(
  () => localApp.value.links,
  (newLinks) => {
    if (newLinks?.length) {
      favicons.value = newLinks.map(link => {
        const { src, visible, onError } = faviconSrc(link.url);
        return { ...link, faviconSrc: src, faviconVisible: visible, faviconError: onError };
      });
    } else {
      favicons.value = [];
    }
  },
  { immediate: true }
);

const isMobile = ref(false);

onMounted(() => {
  isMobile.value = window.innerWidth < 640;
  window.addEventListener('resize', handleResize);
  window.addEventListener('keydown', onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('keydown', onKeydown);
  if (previousActiveElement.value) {
    previousActiveElement.value.focus();
  }
});

function handleResize() {
  isMobile.value = window.innerWidth < 640;
}

const protocolInfos = computed(() =>
  (localApp.value.protocol || [])
    .map(p => getProtocolInfo(p))
    .filter((info): info is { src: string; alt: string; url: string } => !!info)
);

const { t } = useI18n();

</script>


<template>
  <div>
  <dialog 
    ref="myModal" 
    :key="props.app._openCount"
    class="modal fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden"
    @click.self="closeModal"
    @close="handleDialogClose"
    role="dialog"
    :aria-label="t('appModal.details', { name: localApp.name })"
    aria-modal="true"
  >
  <div
    v-if="visible"
    data-testid="app-modal-box"
    class="modal-box relative flex flex-col w-full max-w-[880px]
      h-[min(100dvh,100vh)] sm:h-auto sm:max-h-[min(90dvh,calc(100vh-2rem))]
      m-0 sm:m-auto rounded-t-2xl sm:rounded-2xl
      bg-base-100 text-base-content shadow-2xl
      p-0 overflow-hidden box-border"
  >
    <!-- Sticky chrome: close always visible (light + dark) -->
    <div
      class="sticky top-0 z-30 flex items-center justify-end gap-2
        px-3 py-2 sm:px-4 sm:py-3
        bg-base-100/95 backdrop-blur-sm border-b border-base-200"
    >
      <button
        type="button"
        data-testid="modal-close"
        class="btn btn-sm btn-circle border border-base-300 bg-base-200 text-base-content
          hover:bg-base-300 shadow-sm shrink-0"
        @click="closeModal"
        :aria-label="t('appModal.close')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Scrollable body -->
    <div class="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 pb-6 pt-2 sm:px-8 sm:pb-8 sm:pt-3">
      <!-- Toast -->
      <div
        v-if="shareToast"
        class="fixed sm:absolute bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2
          bg-base-200 text-base-content px-4 py-2 rounded-lg shadow-lg z-50 border border-base-300"
        style="pointer-events: none;"
        role="status"
        aria-live="polite"
      >
        {{ t('appModal.linkCopied') || 'Link copied!' }}
      </div>

      <!-- Banner -->
      <div class="mb-4 sm:mb-5 px-2 sm:px-6">
        <img
          :src="bannerErrored ? localApp.banner?.src : localApp.modalBanner?.src || localApp.banner?.src"
          :alt="bannerErrored ? localApp.banner?.alt : localApp.modalBanner?.alt || localApp.banner?.alt"
          @error="bannerErrored = true"
          class="mx-auto w-full max-w-md max-h-[100px] sm:max-h-[120px] object-contain"
        />
      </div>

      <!-- Title + badge -->
      <header class="mb-3 sm:mb-4 pr-1">
        <div class="flex flex-wrap items-center gap-2 sm:gap-3">
          <h3 class="text-xl sm:text-2xl font-bold leading-tight text-base-content">{{ localApp.name }}</h3>
          <div
            v-if="localApp.recommendedForBeginners"
            class="badge badge-success badge-sm text-xs font-medium
              bg-green-600 dark:bg-green-500 text-white border-none shrink-0"
            :title="t('appModal.goodFirstApp')"
          >
            {{ t('appModal.goodFirstApp') }}
          </div>
        </div>
      </header>

      <!-- Description -->
      <div
        class="mb-5 rounded-xl px-3.5 py-3 sm:px-4 sm:py-3.5 text-sm sm:text-base leading-relaxed
          transition-all duration-300 cursor-pointer
          bg-[var(--color-modal-description)] text-base-content"
        :class="expandido ? '' : 'line-clamp-3 sm:line-clamp-2 overflow-hidden'"
        tabindex="0"
        role="button"
        :aria-expanded="expandido"
        :aria-label="t('accessibility.toggleDescription')"
        @click="expandido = !expandido"
        @keydown.enter="expandido = !expandido"
        @keydown.space.prevent="expandido = !expandido"
      >
        {{ localApp.longDescription }}
      </div>

      <!-- Content sections with consistent vertical rhythm -->
      <div class="flex flex-col gap-5 sm:gap-6">
        <ul v-if="localApp.features?.length" class="list-disc text-sm sm:text-base space-y-2 list-inside marker:text-primary/70">
          <li v-for="(feature, index) in localApp.features" :key="index" class="pl-0.5">{{ feature }}</li>
        </ul>

        <section v-if="localApp.reasonToUse">
          <h4 class="text-base sm:text-lg font-semibold mb-2 text-base-content">{{ t('appModal.reasonToUse') }}</h4>
          <p class="text-sm sm:text-base leading-relaxed text-base-content/90">{{ localApp.reasonToUse }}</p>
        </section>

        <section v-if="localApp.challenges?.length">
          <h4 class="text-base sm:text-lg font-semibold mb-2 text-base-content">{{ t('appModal.challenges') }}</h4>
          <ul class="list-disc text-sm sm:text-base space-y-2 list-inside marker:text-primary/70">
            <li v-for="(challenge, index) in localApp.challenges" :key="index">{{ challenge }}</li>
          </ul>
        </section>

        <!-- Protocols + actions: stack on mobile, side-by-side on larger screens -->
        <div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <section v-if="localApp.protocol?.length" class="min-w-0">
            <h4 class="text-base sm:text-lg font-semibold mb-2.5">{{ t('appModal.protocols') }}</h4>
            <div class="flex flex-wrap gap-2.5">
              <a
                v-for="proto in protocolInfos"
                :key="proto.alt"
                :href="proto.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center rounded-lg border border-base-300 bg-base-200/50 p-1.5 hover:opacity-80 transition-opacity"
              >
                <img :src="proto.src" :alt="proto.alt" class="h-6 object-contain" :title="proto.alt" />
              </a>
            </div>
          </section>

          <div v-if="favicons.length" class="flex flex-wrap gap-2 content-start">
            <a
              v-for="(link, index) in favicons"
              :key="index"
              :href="link.url"
              class="btn btn-outline btn-sm h-auto min-h-9 py-1.5 flex items-center gap-2 whitespace-normal text-left"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                v-if="link.faviconVisible"
                :src="link.faviconSrc"
                class="w-4 h-4 shrink-0"
                @error="link.faviconError"
                alt=""
              />
              <img
                v-if="link.url.includes('sovereinia.org')"
                src="/br-flag.svg"
                :alt="t('appModal.br')"
                class="w-4 h-4 shrink-0"
              />
              <span>{{ link.label }}</span>
            </a>
            <button type="button" class="btn btn-outline btn-sm h-auto min-h-9 py-1.5 flex items-center gap-2" @click="shareApp">
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 8a3 3 0 11-6 0 3 3 0 016 0zm6 8a6 6 0 10-12 0 6 6 0 0012 0zm-6-6v6" />
              </svg>
              {{ t('appModal.share') || 'Share' }}
            </button>
          </div>
        </div>

        <div
          v-if="localApp.selfHostingLevel"
          class="flex flex-wrap items-center gap-2 rounded-lg border border-base-200 bg-base-200/40 px-3 py-2"
        >
          <span class="text-sm sm:text-base font-semibold" :title="t('appModal.selfHostingTooltip') || 'Self-hosting difficulty'">
            {{ t('appModal.selfHostingLabel') || 'Self-hosting difficulty:' }}
          </span>
          <span
            :class="[
              'inline-flex items-center gap-1 text-lg',
              localApp.selfHostingLevel === 1 ? 'text-green-500' :
              localApp.selfHostingLevel === 2 ? 'text-yellow-500' :
              'text-red-500'
            ]"
          >
            <template v-for="n in 3" :key="n">
              <span v-if="n <= (localApp.selfHostingLevel || 0)">⭐</span>
              <span v-else>◽️</span>
            </template>
          </span>
        </div>

        <section v-if="localApp.alternatives?.length" class="pb-2">
          <h4 class="text-base sm:text-lg font-semibold mb-2.5" id="alternatives-heading">{{ t('appModal.alternatives') }}</h4>
          <div class="flex flex-wrap gap-2.5" role="list" aria-labelledby="alternatives-heading">
            <span v-for="alt in localApp.alternatives" :key="alt" role="listitem">
              <img
                v-if="visibleAlternatives[alt]"
                :src="getAlternativeIcon(alt)"
                :alt="t('accessibility.alternativeApp', { name: alt })"
                :title="alt"
                class="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-contain border border-base-300 bg-base-200/30"
                @error="visibleAlternatives[alt] = false"
              />
            </span>
          </div>
        </section>
      </div>
    </div>

    <!-- Prev / next: footer on small screens, side rails on sm+ -->
    <div
      class="sticky bottom-0 z-30 flex items-center justify-between gap-3
        px-3 py-2.5 sm:px-4 border-t border-base-200 bg-base-100/95 backdrop-blur-sm
        pb-[max(0.625rem,env(safe-area-inset-bottom))]"
    >
      <button
        type="button"
        data-testid="modal-prev"
        class="btn btn-sm btn-circle sm:btn-md border border-base-300 bg-base-200 text-base-content
          hover:bg-base-300 disabled:opacity-35 disabled:cursor-not-allowed shadow-sm"
        :disabled="!hasPrevious"
        :aria-label="t('appModal.previousApp')"
        @click="goToPrevious"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <span class="text-xs sm:text-sm text-base-content/60 truncate px-1 max-w-[50%] text-center">{{ localApp.name }}</span>
      <button
        type="button"
        data-testid="modal-next"
        class="btn btn-sm btn-circle sm:btn-md border border-base-300 bg-base-200 text-base-content
          hover:bg-base-300 disabled:opacity-35 disabled:cursor-not-allowed shadow-sm"
        :disabled="!hasNext"
        :aria-label="t('appModal.nextApp')"
        @click="goToNext"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</dialog>

  </div>
</template>
