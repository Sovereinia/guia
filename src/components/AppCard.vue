<script setup lang="ts">
import { sliceText } from '../utils/global';
import { getAlternativeIcon } from '@/utils/global.ts';
import type { App } from '@/types';
import { getProtocolInfo } from '@/utils/global.ts';
import { ref, onMounted, onUnmounted, computed } from 'vue';

const cardRef = ref<HTMLElement | null>(null);
const isMobile = computed(() => windowWidth.value < 640); // sm breakpoint

let idleTimer: ReturnType<typeof setTimeout>;

const triggerBounce = () => {
  if (!cardRef.value || !isMobile.value) return;

  cardRef.value.classList.add('bounce');
  setTimeout(() => {
    cardRef.value?.classList.remove('bounce');
  }, 600); // matches the animation duration
};

const startIdleBounceTimer = () => {
  if (!isMobile.value) return;

  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    triggerBounce();
    startIdleBounceTimer(); // keep repeating every 5s
  }, 5000);
};

onMounted(() => {
  startIdleBounceTimer();
  window.addEventListener('touchstart', resetTimer);
  window.addEventListener('scroll', resetTimer);
});
onUnmounted(() => {
  clearTimeout(idleTimer);
  window.removeEventListener('touchstart', resetTimer);
  window.removeEventListener('scroll', resetTimer);
});

function resetTimer() {
  clearTimeout(idleTimer);
  startIdleBounceTimer();
}


const props = defineProps<{
  app: App;
}>();

const base = import.meta.env.BASE_URL;

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
  <article
    @click="abrirModal"

    ref="cardRef"
    class="card bg-[var(--color-card-primary)] w-full shadow-lg
    rounded-xl sm:rounded-3xl overflow-hidden transform transition-transform duration-200
    hover:scale-[1.03] hover:shadow-xl flex flex-row sm:flex-col cursor-pointer"

    >
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
          <div class="flex flex-col items-end gap-1 max-h-14 overflow-hidden ml-auto">
            <img
              v-for="{ proto, info } in protocolInfos"
              :key="proto"
              v-show="!hiddenProtocols.has(proto)"
              :src="info.src"
              :alt="info.alt"
              class="h-5 object-contain"
              :title="proto"
              @error="() => hiddenProtocols.add(proto)"
            />
          </div>
        </div>

        <!-- descrição -->
        <p class="text-gray-200">
          {{ sliceText(app.description, 220) }}
        </p>

        <div v-if="app.alternatives?.length" class="mt-auto justify-end flex gap-2">
            <img
              v-for="(alt, index) in app.alternatives"
              :key="alt"
              v-show="!hiddenAlternatives.has(alt)"
              :src="getAlternativeIcon(alt)"
              :alt="alt"
              class="w-12 h-12 rounded-full object-contain border border-gray-500"
              :title="alt"
              @error="() => hiddenAlternatives.add(alt)"
            />
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
            <div class="flex pt-2 gap-1 justify-end">
              <img
                v-for="{ proto, info } in protocolInfos"
                :key="proto"
                v-show="!hiddenProtocols.has(proto)"
                :src="info.src"
                :alt="info.alt"
                class="h-3 object-contain"
                :title="proto"
                @error="() => hiddenProtocols.add(proto)"
              />
            </div>
          </div>

          <!-- Lado direito: Alternativas em coluna -->
          <div v-if="app.alternatives?.length" class="flex flex-col gap-2 items-end">
            <img
              v-for="alt in app.alternatives"
              :key="alt"
              v-show="!hiddenAlternatives.has(alt)"
              :src="getAlternativeIcon(alt)"
              :alt="alt"
              class="w-6 h-6 min-w-6 min-h-6 max-w-6 max-h-6
                object-contain border border-gray-500 rounded-full"
              :title="alt"
              @error="() => hiddenAlternatives.add(alt)"
            />
          </div>
        </div>

    </div>
  </article>
</template>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-8px);
  }
  60% {
    transform: translateY(4px);
  }
}

.bounce {
  animation: bounce 0.6s ease-in-out;
}
</style>
