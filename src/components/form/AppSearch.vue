<script setup lang="ts">
import { computed, defineEmits, defineProps, ref, watch } from 'vue';

// Props e emits
const props = defineProps<{
  modelValue: string;
  suggestions: string[];
  placeholder?: string;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'click', event: MouseEvent): void;
}>();

const activeIndex = ref(-1);
const showSuggestions = ref(false);
const searchTimeout = ref<number | null>(null);

// Atualiza o input e aplica debounce
function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
  activeIndex.value = -1;
  showSuggestions.value = true;

  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }

  searchTimeout.value = setTimeout(() => {
    emit('update:modelValue', target.value);
  }, 300);
}

function selectSuggestion(suggestion: string) {
  emit('update:modelValue', suggestion);
  activeIndex.value = -1;
  showSuggestions.value = false;
}

// Filtra sugestões
const filteredSuggestions = computed(() => {
  const query = props.modelValue.trim().toLowerCase();
  if (!query) return [];

  const uniqueSuggestions = [...new Set(props.suggestions)];

  return uniqueSuggestions
    .filter((s) => s.toLowerCase().includes(query))
    .sort((a, b) => {
      const aLower = a.toLowerCase();
      const bLower = b.toLowerCase();

      const aStarts = aLower.startsWith(query);
      const bStarts = bLower.startsWith(query);

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      return aLower.localeCompare(bLower); // fallback alfabético
    });
});

// Navegação pelo teclado
function onKeyDown(event: KeyboardEvent) {
  if (!filteredSuggestions.value.length) return;

  if (event.key === 'ArrowDown') {
    event.preventDefault();
    activeIndex.value = (activeIndex.value + 1) % filteredSuggestions.value.length;
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    activeIndex.value =
      (activeIndex.value - 1 + filteredSuggestions.value.length) % filteredSuggestions.value.length;
  } else if (event.key === 'Enter') {
    event.preventDefault();
    if (activeIndex.value >= 0) {
      selectSuggestion(filteredSuggestions.value[activeIndex.value]);
    }
  } else if (event.key === 'Escape') {
    event.preventDefault();
    showSuggestions.value = false;
  }
}

function onFocus(event: FocusEvent) {
  emit('focus', event);
}

function onClick(event: MouseEvent) {
  emit('click', event);
}

// Watch para controle de exibição
watch(
  () => props.modelValue,
  (newValue) => {
    if (!newValue.trim()) {
      activeIndex.value = -1;
      showSuggestions.value = false;
    }
  },
);
</script>

<template>
  <div class="mb-8 relative">
    <label for="app-search" class="sr-only">{{
      props.placeholder || 'Pesquise por seu app favorito'
    }}</label>
    <div class="relative">
      <input
        id="app-search"
        :value="modelValue"
        @input="onInput"
        @keydown="onKeyDown"
        @focus="onFocus"
        @click="onClick"
        type="text"
        :placeholder="
          props.placeholder || 'Pesquise por seu app favorito, ex: Instagram, Google Drive...'
        "
        class="input focus:border-transparent pl-11 w-full bg-base-100 text-base-content placeholder:opacity-80 rounded-full pr-12 focus:outline-none focus:ring-1 focus:shadow-md focus:ring-[var(--color-ring)]"
        aria-label="Campo de busca para termos"
        aria-autocomplete="list"
        role="combobox"
        :aria-expanded="showSuggestions"
        aria-controls="suggestions-list"
        :aria-activedescendant="activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined"
      />

      <div
        class="absolute left-3 top-1/2 pointer-events-none z-10 transform -translate-y-1/2 text-base-content opacity-70"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-4.35-4.35M7.5 10a7.5 7.5 0 1015 0 7.5 7.5 0 00-15 0z"
          />
        </svg>
      </div>
    </div>

    <!-- Lista de sugestões -->
    <ul
      v-if="filteredSuggestions.length && showSuggestions"
      id="suggestions-list"
      class="absolute mt-2 z-10 max-h-60 overflow-auto rounded-xl border border-base-content/20 bg-base-100 shadow-xl ring-1 ring-base-content/10 transition-all duration-200 w-auto max-w-full divide-y divide-base-content/10"
      role="listbox"
      aria-label="Sugestões de busca"
    >
      <li
        v-for="(suggestion, index) in filteredSuggestions"
        :key="index"
        @click="selectSuggestion(suggestion)"
        class="px-4 py-2 text-sm cursor-pointer transition-colors duration-150 whitespace-nowrap"
        :class="{
          'bg-base-200': index === activeIndex,
          'hover:bg-base-100/70': index !== activeIndex,
        }"
        role="option"
        :id="'suggestion-' + index"
        :aria-selected="index === activeIndex"
      >
        {{ suggestion }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Se quiser adicionar alguma estilização extra aqui */
</style>
