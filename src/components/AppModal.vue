<script setup lang="ts">
import { ref, type Ref, defineProps, watch, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import { getAlternativeIcon } from '@/utils/global.ts';
import { getProtocolInfo } from '@/utils/global.ts';
import { getFaviconPath } from '@/utils/global.ts';
import type { App } from '@/types';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';


const { abrir, app } = defineProps<{
  abrir: boolean;
  app: Partial<App> & { _openCount?: number };
}>();

const emit = defineEmits(['atualizarAbrir'])

const expandido = ref(false);

const bannerErrored = ref(false);

const visible = ref(false);

const localApp = ref<Partial<App>>({});

const route = useRoute();
const shareToast = ref(false);

const myModal = ref<HTMLDialogElement | null>(null)

watch(() => app._openCount, async (newValue) => {
  if (!app) return;
  if (app) {
    bannerErrored.value = false;
    expandido.value = false;
    visible.value = false;
    localApp.value = {};
    visibleAlternatives.value = {}; 
    favicons.value = [];

    await nextTick(); // desmonta com segurança

    localApp.value = { ...app };
    myModal.value?.showModal();

    await nextTick(); // garante render
    visible.value = true;
  } else {
    visible.value = false;
    myModal.value?.close();
    emit('atualizarAbrir', false);
  }
});

function handleDialogClose() {
  emit('atualizarAbrir', false); // fecha o modal de verdade
  bannerErrored.value = false
  expandido.value = false
  visible.value = false
  localApp.value = {}
}

function getAppSlug(app: Partial<App>) {
  // Simple slugify: lowercase, remove spaces, remove special chars
  return (app.name || '')
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
}

async function shareApp() {
  const slug = getAppSlug(localApp.value);
  // Build the shareable URL with ?app=slug
  const basePath = window.location.origin + route.fullPath.split('?')[0];
  const url = `${basePath}?app=${slug}`;
  await navigator.clipboard.writeText(url);
  shareToast.value = true;
  setTimeout(() => (shareToast.value = false), 2000);
}

function openModal() {
  myModal.value?.showModal()
  //console.log('Modal aberto aqui no appModal')
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
    }
  },
  { immediate: true } // roda logo de cara
);

const isMobile = ref(false);

onMounted(() => {
  isMobile.value = window.innerWidth < 640;
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
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
  <!-- ✅ Atualizado aqui: @cancel → @click.self -->
  <dialog 
    ref="myModal" 
    :key="app._openCount"
    class="modal fixed inset-0 flex items-center justify-center p-2 sm:p-4 overflow-auto" 
    @click.self="closeModal"
    @close="handleDialogClose"
  >
  <div v-if="visible" class="modal-box w-full max-w-[880px] max-h-[calc(100vh-2rem)] overflow-y-auto rounded-xl relative bg-base-100 sm:px-6 sm:py-6 box-border">


    <!-- Botão de fechar -->
    <button
      type="button"
      class="absolute top-4 right-4 z-20 bg-base-200 hover:bg-base-300 rounded-full p-2 shadow-md"
      @click="closeModal"
      :aria-label="t('appModal.close')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 stroke-current"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

      
      <!-- Banner -->
      <div class="px-6 sm:px-10 
        mb-2  sm:mb-4 
        mt-0 sm:mt-2 md:mt-4"
      >
        <img
          :src="bannerErrored ? localApp.banner?.src : localApp.modalBanner?.src || localApp.banner?.src"
          :alt="bannerErrored ? localApp.banner?.alt : localApp.modalBanner?.alt || localApp.banner?.alt"
          @error="bannerErrored = true"
          class="mx-auto w-full max-w-lg max-h-[120px] object-contain mb-2"
        />
      </div>

      <!-- Texto e conteúdos -->
      <div class="w-full flex flex-col md:px-4 lg:px-6">
        <!-- <h3 class="text-xl font-bold mb-2">{{ localApp.name }}</h3> -->
        <div
          class="mb-4 rounded-lg px-3 sm:px-4 py-1 sm:mt-3 text-sm sm:text-base leading-relaxed transition-all duration-300 cursor-pointer sm:cursor-default"
          :class="[
            'text-base',
            expandido ? '' : 'line-clamp-2 overflow-hidden',
            'bg-[var(--color-modal-description)]'
          ]"
          @click="(expandido = !expandido)"
        >
          {{ localApp.longDescription }}
        </div>


      <!-- Caracteristicas -->
        <ul v-if="localApp.features?.length" class="list-disc text-sm sm:text-base space-y-2 list-inside mb-4">
          <li v-for="(feature, index) in localApp.features" :key="index">{{ feature }}</li>
        </ul>

        <div class="mt-2">
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h4 v-if="localApp.protocol?.length" class="sm:text-lg font-semibold mb-2">{{ t('appModal.protocols') }}</h4>
              <div class="flex flex-wrap gap-2">
                <a
                  v-for="proto in protocolInfos"
                  :key="proto.alt"
                  :href="proto.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:opacity-80 transition-opacity"
                >
                  <img
                    :src="proto.src"
                    :alt="proto.alt"
                    class="h-6 object-contain"
                    :title="proto.alt"
                  />
                </a>
              </div>
            </div>


            <!-- Botoes -->
            <div v-if="favicons.length" class="flex gap-2 py-2 flex-wrap justify-start">
              <a
                v-for="(link, index) in favicons"
                :key="index"
                :href="link.url"
                class="btn btn-outline btn-sm flex items-center gap-2 xs:text-sm sm:text-sm"
                target="_blank" rel="noopener noreferrer"
              >
                <!-- Favicon visível só se não deu erro -->
                <img
                  v-if="link.faviconVisible"
                  :src="link.faviconSrc"
                  class="w-4 h-4"
                  @error="link.faviconError"
                  alt=""
                />

                <!-- Bandeira BR -->
                <img
                  v-if="link.url.includes('sovereinia.org')"
                  src="/br-flag.svg"
                  :alt="t('appModal.br')"
                  class="w-4 h-4"
                />

                {{ link.label }}
              </a>
              <!-- Share Button -->
              <button
                type="button"
                class="btn btn-outline btn-sm flex items-center gap-2"
                @click="shareApp"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 8a3 3 0 11-6 0 3 3 0 016 0zm6 8a6 6 0 10-12 0 6 6 0 0012 0zm-6-6v6" />
                </svg>{{ t('appModal.share') || 'Share' }}
              </button>
            </div>


          </div>
        </div>

        <div v-if="localApp.alternatives?.length" class="mt-4">
          <h4 class="sm:text-lg font-semibold mb-2">{{ t('appModal.alternatives') }}</h4>
          <div class="flex flex-wrap gap-2">
            <span v-for="(alt, index) in localApp.alternatives" :key="alt">
              <img
                v-if="visibleAlternatives[alt]"
                :src="getAlternativeIcon(alt)"
                :alt="alt"
                :title="alt"
                class="w-12 h-12 rounded-full object-contain border border-gray-500"
                @error="visibleAlternatives[alt] = false"
              />
            </span>

          </div>
        </div>
    </div>
  </div>
</dialog>
<!-- Toast for "Link copied!" -->
    <Teleport to="body">
      <div
        v-if="shareToast"
        class="fixed bottom-8 left-1/2 -translate-x-1/2 bg-base-200 text-base-content px-4 py-2 rounded shadow-lg z-[9999]"
        style="pointer-events: none;"
      >
        {{ t('appModal.linkCopied') || 'Link copied!' }}
      </div>
    </Teleport>


  </div>
</template>

