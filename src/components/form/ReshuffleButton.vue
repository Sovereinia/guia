<template>
  <button
    @click="handleReshuffle"
    class="btn btn-outline btn-sm flex items-center gap-2 hover:btn-primary transition-colors"
    :title="tooltip"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
    <span class="hidden sm:inline">{{ buttonText }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useGlobalStore } from '@/stores/global';

const { t } = useI18n();
const globalStore = useGlobalStore();

const buttonText = computed(() => 
  globalStore.isReshuffled ? t('reshuffle.reset') : t('reshuffle.shuffle')
);

const tooltip = computed(() => 
  globalStore.isReshuffled 
    ? t('reshuffle.tooltip.reset') 
    : t('reshuffle.tooltip.shuffle')
);

const handleReshuffle = () => {
  globalStore.toggleReshuffle();
};
</script>