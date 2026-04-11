<script setup lang="ts">
import type { UseCaseId } from '@/types';
import { useCases } from '@/data/useCases';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  modelValue: UseCaseId[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: UseCaseId[]): void;
}>();

const { t } = useI18n();

function toggleUseCase(id: UseCaseId) {
  const current = [...props.modelValue];
  const index = current.indexOf(id);
  if (index >= 0) {
    current.splice(index, 1);
  } else {
    current.push(id);
  }
  emit('update:modelValue', current);
}

function clearAll() {
  emit('update:modelValue', []);
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex flex-wrap gap-2 justify-center">
      <button
        v-for="useCase in useCases"
        :key="useCase.id"
        type="button"
        class="px-3 py-1 text-xs rounded-full border transition-colors duration-200 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
        :class="modelValue.includes(useCase.id)
          ? 'bg-[var(--color-selected-radio)] text-gray-100 border-transparent'
          : 'bg-base-100 text-base-content border-base-content/30 hover:bg-base-content/10'"
        :aria-pressed="modelValue.includes(useCase.id)"
        @click="toggleUseCase(useCase.id)"
      >
        {{ t('useCase.' + useCase.id) }}
      </button>
      <button
        v-if="modelValue.length > 0"
        type="button"
        class="px-3 py-1 text-xs rounded-full border border-error/50 text-error bg-base-100 hover:bg-error/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-1"
        @click="clearAll"
      >
        {{ t('useCase.clearAll') }}
      </button>
    </div>
  </div>
</template>
