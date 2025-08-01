<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  count: number;
  searchQuery?: string;
  selectedCategory?: string;
}>();

const { t, locale } = useI18n();

const displayText = computed(() => {
  // Force reactivity on locale changes
  locale.value;

  if (props.count === 0) {
    return t('appCounter.noApps');
  }

  if (props.count === 1) {
    return t('appCounter.oneApp');
  }

  return t('appCounter.multipleApps', { count: props.count });
});

const hasActiveFilters = computed(() => {
  return (
    (props.searchQuery && props.searchQuery.trim().length > 0) ||
    (props.selectedCategory && props.selectedCategory !== 'all')
  );
});
</script>

<template>
  <div class="flex items-center justify-center mb-4">
    <div class="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 shadow-lg border border-slate-200/50 dark:border-slate-600/50 transition-all duration-300 hover:shadow-xl hover:scale-105">

      <!-- Icon -->
      <div class="flex items-center justify-center">
        <svg
          v-if="hasActiveFilters"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-blue-600 dark:text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-emerald-600 dark:text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      </div>

      <!-- Count Badge -->
      <div
        class="inline-flex items-center justify-center min-w-[2.5rem] h-8 px-3 rounded-full font-bold text-sm shadow-md transition-all duration-300"
        :class="{
          'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/30': hasActiveFilters,
          'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-emerald-500/30': !hasActiveFilters && props.count > 0,
          'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-500/30': props.count === 0
        }"
      >
        {{ props.count }}
      </div>

      <!-- Text Label -->
      <span
        class="font-medium text-slate-700 dark:text-slate-200"
        :class="{
          'text-blue-700 dark:text-blue-300': hasActiveFilters,
          'text-emerald-700 dark:text-emerald-300': !hasActiveFilters && props.count > 0,
          'text-red-700 dark:text-red-300': props.count === 0
        }"
      >
        {{ displayText }}
      </span>

      <!-- Filter indicator dot -->
      <div
        v-if="hasActiveFilters"
        class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"
      ></div>
    </div>
  </div>
</template>
