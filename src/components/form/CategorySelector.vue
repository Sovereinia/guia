<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import type { Category } from '@/types';
import { categories } from '@/data/categories';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

function updateCategory(value: string) {
  emit('update:modelValue', value);
}

// Use Left/Right arrows to move between categories
function handleKeyDown(event: KeyboardEvent, category: Category) {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    const currentIndex = categories.findIndex(c => c.id === category.id);
    let newIndex;
    
    if (event.key === 'ArrowRight') {
      newIndex = currentIndex === categories.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? categories.length - 1 : currentIndex - 1;
    }
    
    const nextCategory = categories[newIndex];
    updateCategory(nextCategory.id);
    // Focus the next button
    const buttons = document.querySelectorAll('[role="tab"]');
    (buttons[newIndex] as HTMLElement).focus();
  }
}

// Responsividade
const windowWidth = ref(window.innerWidth);
const updateWindowWidth = () => (windowWidth.value = window.innerWidth);

onMounted(() => window.addEventListener('resize', updateWindowWidth));
onUnmounted(() => window.removeEventListener('resize', updateWindowWidth));

const { t } = useI18n();

// Label adaptável internacionalizado (name/short/icon)
const getCategoryLabel = (category: Category) => {
  if (windowWidth.value > 850) return t('category.' + category.id + '.name');
  return t('category.' + category.id + '.short');
};
</script>

<template>
  <div class="flex justify-center">
    <div 
      v-if="windowWidth > 430" 
      class="inline-flex rounded-full overflow-hidden border border-base-content/30"
      role="tablist"
      aria-label="Category filters"
    >
      <button
        v-for="category in categories"
        :key="category.id"
        role="tab"
        :aria-selected="modelValue === category.id"
        :aria-controls="'tab-panel-' + category.id"
        :id="'tab-' + category.id"
        :tabindex="modelValue === category.id ? 0 : -1"
        class="cursor-pointer px-4 text-sm transition-colors duration-200 border-r border-base-content/20 py-2 font-medium last:border-r-0 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
        :class="[
          modelValue === category.id
            ? 'bg-[var(--color-selected-radio)] text-gray-100'
            : 'bg-base-100 text-base-content hover:bg-base-content/10'
        ]"
        @click="updateCategory(category.id)"
        @keydown="handleKeyDown($event, category)"
      >
        {{ getCategoryLabel(category) }}
      </button>
    </div>
    <div 
      v-else 
      class="flex flex-wrap justify-center gap-2"
      role="tablist"
      aria-label="Category filters"
    >
      <button
        v-for="category in categories"
        :key="category.id"
        role="tab"
        :aria-selected="modelValue === category.id"
        :aria-controls="'tab-panel-' + category.id"
        :id="'tab-' + category.id"
        :tabindex="modelValue === category.id ? 0 : -1"
        class="px-3 py-1 text-sm rounded-full border transition-colors duration-200 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        :class="modelValue === category.id
          ? 'bg-[var(--color-selected-radio)] text-gray-100 border-transparent'
          : 'bg-base-100 text-base-content border-base-content/30 hover:bg-base-content/10'"
        @click="updateCategory(category.id)"
        @keydown="handleKeyDown($event, category)"
      >
        {{ getCategoryLabel(category) }}
      </button>
    </div>
  </div>
</template>
