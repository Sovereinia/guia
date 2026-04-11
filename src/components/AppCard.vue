<script setup lang="ts">
import { sliceText } from '../utils/global';
import { getAlternativeIcon } from '@/utils/global.ts';
import type { App } from '@/types';
import { getProtocolInfo } from '@/utils/global.ts';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useFavoritesStore } from '@/stores/favorites';

const props = defineProps<{
  app: App;
}>();

const { t } = useI18n();
const base = import.meta.env.BASE_URL;
const favoritesStore = useFavoritesStore();
const isStarred = computed(() => favoritesStore.isStarred(props.app.name));

let openCount = 0;

const emit = defineEmits(['abrir']);

function abrirModal() {
  //console.log('📦 Dados enviados para o modal:', props.app);
  openCount++;
  emit('abrir', { ...props.app, _openCount: openCount });
}

const hiddenAlternatives = ref(new Set<string>());
const hiddenProtocols = ref(new Set<string>());

const protocolInfos = computed(() =>
  (props.app.protocol || [])
    .map(proto => {
      const info = getProtocolInfo(proto);
      return info ? { proto, info } : null;
    })
    .filter((x): x is { proto: string; info: { src: string; alt: string; url: string } } => x !== null)
);



const windowWidth = ref(window.innerWidth)

const updateWidth = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWidth)
})
onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})

const slicedDescription = computed(() => {
    let limit = 43; // 320px

  if (windowWidth.value >= 580) {
    limit = 220;
  } else if (windowWidth.value >= 500) {
    limit = 90;
  } else if (windowWidth.value >= 440) {
    limit = 75;
  } else if (windowWidth.value >= 370) {
    limit = 55;
  }

  return sliceText(props.app.description, limit)
})

</script>

<template>
  <div
    @click="abrirModal"
    @keydown.enter="abrirModal"
    @keydown.space.prevent="abrirModal"
    tabindex="0"
    role="button"
    :aria-label="$t('accessibility.openAppDetails', { name: app.name })"
    class="card bg-[var(--color-card-primary)] w-full shadow-lg 
    rounded-xl sm:rounded-3xl overflow-hidden transform transition-transform duration-200 
    hover:scale-[1.03] hover:shadow-xl flex flex-row sm:flex-col cursor-pointer relative
    focus:outline-none focus:ring-4 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-100"
  >
<!-- Badge for beginner-friendly apps -->
    <div
      v-if="app.recommendedForBeginners"
      class="absolute top-2 left-2 z-10 badge badge-success badge-sm text-xs font-medium
             bg-green-600 dark:bg-green-500 text-white border-none shadow-md"
      :title="t('appModal.goodFirstApp')"
    >
      {{ t('appModal.goodFirstApp') }}
    </div>
    <!-- Star indicator for favorited apps -->
    <div
      v-if="isStarred"
      class="absolute top-2 right-2 z-10 text-yellow-400 drop-shadow-md"
      :aria-label="t('appModal.starred')"
    >
      <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    </div>
    <article class="w-full flex flex-row sm:flex-col">
      <figure class="p-2 w-20 sm:w-auto sm:p-10 sm:h-64 flex items-center justify-center">
        <img
          :src="app.banner.src"
          :alt="app.banner.alt"
          class="h-20 sm:w-60 sm:h-40
           object-contain"
        />
      </figure>

      <div class="card-body flex-1 min-w-0 bg-[var(--color-card-secondary)] rounded-none sm:rounded-r-3xl p-2 sm:p-6">
    
        <!-- LAYOUT PC --> 
        <div class="hidden sm:flex sm:flex-col gap-2 flex-grow">
          <div class="flex items-baseline">
            <h2 class="card-title text-2xl text-gray-200">{{ app.name }}</h2>
            <ul class="flex flex-col items-end gap-1 max-h-14 overflow-hidden ml-auto" aria-label="Protocols">
              <li v-for="{ proto, info } in protocolInfos"
                :key="proto"
                v-show="!hiddenProtocols.has(proto)">
                <img
                  :src="info.src"
                  :alt="info.alt"
                  class="h-5 object-contain"
                  :title="proto"
                  @error="() => hiddenProtocols.add(proto)"
                />
              </li>
            </ul>
          </div>

          <!-- descrição -->
          <p class="text-gray-200">
            {{ sliceText(app.description, 220) }}
          </p>

          <div v-if="app.alternatives?.length" class="mt-auto justify-end flex gap-2">
            <ul class="flex gap-2" aria-label="Alternative apps">
              <li v-for="(alt, index) in app.alternatives"
                  :key="alt"
                  v-show="!hiddenAlternatives.has(alt)">
                <img
                  :src="getAlternativeIcon(alt)"
                  :alt="$t('accessibility.alternativeApp', { name: alt })"
                  class="w-12 h-12 rounded-full object-contain border border-gray-500"
                  :title="alt"
                  @error="() => hiddenAlternatives.add(alt)"
                />
              </li>
            </ul>
          </div>
        </div> 

          <!-- LAYOUT MOBILE-->
          <div class="flex sm:hidden flex-row justify-between gap-2">
            <!-- Lado esquerdo: título + protocolos -->
            <div class="flex flex-col gap-1">
              <!-- Título -->
              <h2 class="card-title text-gray-200">{{ app.name }}</h2>
              
              <!-- descrição -->
              <div class="flex-1 min-w-0">
                <p class="text-gray-200 text-sm leading-snug break-words">
                  {{ slicedDescription }}
                </p>
              </div>

              <!-- Protocolos -->
              <ul class="flex pt-2 gap-1 justify-end" aria-label="Protocols">
                <li v-for="{ proto, info } in protocolInfos"
                    :key="proto"
                    v-show="!hiddenProtocols.has(proto)">
                  <img
                    :src="info.src"
                    :alt="info.alt"
                    class="h-3 object-contain"
                    :title="proto"
                    @error="() => hiddenProtocols.add(proto)"
                  />
                </li>
              </ul>
            </div>

            <!-- Lado direito: Alternativas em coluna -->
            <div v-if="app.alternatives?.length" class="flex flex-col gap-2 items-end">
              <ul class="flex flex-col gap-2" aria-label="Alternative apps">
                <li v-for="alt in app.alternatives"
                    :key="alt"
                    v-show="!hiddenAlternatives.has(alt)">
                  <img
                    :src="getAlternativeIcon(alt)"
                    :alt="alt"
                    class="w-6 h-6 min-w-6 min-h-6 max-w-6 max-h-6  
                      object-contain border border-gray-500 rounded-full"
                    :title="alt"
                    @error="() => hiddenAlternatives.add(alt)"
                  />
                </li>
              </ul>
            </div>
          </div>

      </div>
    </article>
  </div>
</template>

<style scoped></style>
