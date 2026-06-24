<script setup lang="ts">
import { useCaseIds } from '@/data/useCases';
import type { UseCaseId } from '@/types';
import { useI18n } from 'vue-i18n';

const model = defineModel<UseCaseId | 'all'>({ required: true });
const { t } = useI18n();
</script>

<template>
  <div class="w-full" data-testid="use-case-filter">
    <label class="block text-sm font-medium mb-2 text-base-content/80">{{ t('useCases.title') }}</label>
    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        class="btn btn-xs sm:btn-sm"
        :class="model === 'all' ? 'btn-primary' : 'btn-outline'"
        data-testid="use-case-all"
        @click="model = 'all'"
      >
        {{ t('useCases.all') }}
      </button>
      <button
        v-for="id in useCaseIds"
        :key="id"
        type="button"
        class="btn btn-xs sm:btn-sm"
        :class="model === id ? 'btn-primary' : 'btn-outline'"
        :data-testid="`use-case-${id}`"
        @click="model = id"
      >
        {{ t(`useCases.items.${id}`) }}
      </button>
    </div>
  </div>
</template>
