<script setup lang="ts">
import { ref } from 'vue';
import type { App } from '@/types';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  apps: App[];
}>();

const emit = defineEmits<{
  surprise: [app: App];
}>();

const isAnimating = ref(false);

function surpriseMe() {
  if (isAnimating.value || !props.apps.length) return;
  
  const randomIndex = Math.floor(Math.random() * props.apps.length);
  const randomApp = props.apps[randomIndex];
  
  // Add some animation feedback
  isAnimating.value = true;
  setTimeout(() => {
    isAnimating.value = false;
    emit('surprise', randomApp);
  }, 300);
}
</script>

<template>
  <button
    @click="surpriseMe"
    :disabled="isAnimating"
    class="btn btn-primary btn-md rounded-full flex items-center gap-1 sm:gap-2 transition-all duration-300 whitespace-nowrap"
    :class="{
      'animate-pulse': isAnimating,
      'scale-95': isAnimating
    }"
  >
    <span class="text-base sm:text-lg">🎲</span>
    <span class="text-sm sm:text-base hidden md:block">{{ t('surpriseMe.button', 'Surprise me!') }}</span>
  </button>
</template>