<script setup lang="ts">
import { computed } from 'vue';
import ThemeToggler from './ThemeToggler.vue';
import LanguageSwitcher from './LanguageSwitcher.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const navOptions = computed(() => [
  {
    name: t('navigation.blog'),
    link: 'https://sovereinia.org/',
  },
]);
</script>

<template>
  <nav class="navbar px-8" role="navigation" aria-label="Main navigation">
    <div class="flex-1">
      <a
        href="https://sovereinia.org/"
        class="hover:opacity-80 transition-opacity text-2xl font-bold text-color"
        aria-label="Sovereinia homepage"
      >
        Sovereinia
      </a>
    </div>
    <ul class="flex gap-4 items-center" role="menubar">
      <li v-for="option in navOptions" :key="option.link" role="none">
        <a 
          :href="option.link" 
          class="hover:opacity-80 transition-opacity"
          role="menuitem"
        >
          {{ option.name }}
        </a>
      </li>
      <li role="none">
        <LanguageSwitcher />
      </li>
      <li role="none">
        <ThemeToggler />
      </li>
    </ul>
  </nav>
</template>
