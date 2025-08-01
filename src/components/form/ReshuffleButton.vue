<template>
  <button
    @click="handleReshuffle"
    class="btn btn-primary btn-md rounded-full flex items-center gap-1 sm:gap-2 transition-all duration-300 whitespace-nowrap"
    :title="tooltip"
  >
    <span class="text-base sm:text-lg">🔀</span>
    <span class="text-sm sm:text-base hidden md:block">{{ buttonText }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useGlobalStore } from '@/stores/global';

const { t } = useI18n();
const globalStore = useGlobalStore();

const buttonText = computed(() => t('reshuffle.shuffle'));

const tooltip = computed(() => t('reshuffle.tooltip.shuffle'));

const handleReshuffle = () => {
  globalStore.toggleReshuffle();
};
</script>