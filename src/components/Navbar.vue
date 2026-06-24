<script setup lang="ts">
import { computed } from 'vue';
import ThemeToggler from './ThemeToggler.vue';
import LanguageSwitcher from './LanguageSwitcher.vue';
import { useI18n } from 'vue-i18n';
import { externalLinkAttrs } from '@/utils/externalLink';

const { t } = useI18n();

const homeHref = 'https://sovereinia.org/';
const homeLinkAttrs = externalLinkAttrs(homeHref);

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
        :href="homeHref"
        class="hover:opacity-80 transition-opacity text-2xl font-bold text-color"
        aria-label="Sovereinia homepage"
        v-bind="homeLinkAttrs"
        data-testid="nav-home-link"
      >
        Sovereinia
      </a>
    </div>
    <div class="flex gap-4 items-center">
      <ul class="flex gap-4 items-center">
        <li v-for="option in navOptions" :key="option.link">
          <a 
            :href="option.link" 
            class="hover:opacity-80 transition-opacity"
            v-bind="externalLinkAttrs(option.link)"
            data-testid="nav-external-link"
          >
            {{ option.name }}
          </a>
        </li>
      </ul>
      <LanguageSwitcher />
      <ThemeToggler />
    </div>
  </nav>
</template>
