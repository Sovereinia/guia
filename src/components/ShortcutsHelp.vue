<script setup lang="ts">
import { useI18n } from 'vue-i18n';

defineProps<{ open: boolean }>();
const emit = defineEmits<{ close: [] }>();
const { t } = useI18n();

const rows = [
  { keys: '/', labelKey: 'shortcuts.search' },
  { keys: '←', labelKey: 'shortcuts.modalPrev' },
  { keys: '→', labelKey: 'shortcuts.modalNext' },
  { keys: 'Esc', labelKey: 'shortcuts.escape' },
  { keys: '?', labelKey: 'shortcuts.title' },
];
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40"
    data-testid="shortcuts-overlay"
    role="dialog"
    aria-modal="true"
    :aria-label="t('shortcuts.title')"
    @click.self="emit('close')"
  >
    <div class="bg-base-100 text-base-content rounded-2xl shadow-xl max-w-md w-full p-5 border border-base-300">
      <div class="flex justify-between items-center mb-3">
        <h2 class="text-lg font-semibold">{{ t('shortcuts.title') }}</h2>
        <button type="button" class="btn btn-ghost btn-sm" :aria-label="t('shortcuts.close')" @click="emit('close')">✕</button>
      </div>
      <ul class="space-y-2 text-sm">
        <li v-for="row in rows" :key="row.labelKey" class="flex justify-between gap-4 border-b border-base-200 py-1.5">
          <kbd class="font-mono bg-base-200 px-2 py-0.5 rounded">{{ row.keys }}</kbd>
          <span class="text-right text-base-content/80">{{ t(row.labelKey) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
