<script setup lang="ts">
import { ref } from 'vue';
import type { App } from '@/types';
import { useI18n } from 'vue-i18n';
import { pickRandomItem } from '@/utils/pickRandom';

const { t } = useI18n();

const props = defineProps<{
  apps: App[];
}>();

const emit = defineEmits<{
  surprise: [app: App];
}>();

const isAnimating = ref(false);

function surpriseMe() {
  if (isAnimating.value) return;
  const randomApp = pickRandomItem(props.apps);
  if (!randomApp) return;

  isAnimating.value = true;
  setTimeout(() => {
    isAnimating.value = false;
    emit('surprise', randomApp);
  }, 300);
}
</script>

<template>
  <button
    type="button"
    data-testid="surprise-me"
    @click="surpriseMe"
    :disabled="isAnimating || !apps.length"
    class="btn btn-primary btn-md rounded-full flex items-center gap-1 sm:gap-2 transition-all duration-300 whitespace-nowrap"
    :class="{
      'animate-pulse': isAnimating,
      'scale-95': isAnimating
    }"
  >
    <span class="text-base sm:text-lg" aria-hidden="true">🎲</span>
    <span class="text-sm sm:text-base hidden md:block">{{ t('surpriseMe.button', 'Surprise me!') }}</span>
  </button>
</template>
