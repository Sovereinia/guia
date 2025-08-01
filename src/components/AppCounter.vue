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
    <div
      class="text-sm text-base-content/70 font-medium px-3 py-1 rounded-full transition-all duration-200"
      :class="{
        'bg-base-200/50': hasActiveFilters,
        'text-base-content/50': !hasActiveFilters,
      }"
    >
      <span class="inline-flex items-center gap-1">
        <svg
          v-if="hasActiveFilters"
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
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        {{ displayText }}
      </span>
    </div>
  </div>
</template>
