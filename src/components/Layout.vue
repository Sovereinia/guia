<script setup lang="ts">
import Navbar from './Navbar.vue';
import ScrollToTopButton from './ScrollToTopButton.vue';
import { useI18n } from 'vue-i18n';
import { MAIN_CONTENT_ID, focusMainContent, mainContentHref } from '@/utils/skipLink';

const { t } = useI18n();

function onSkipActivate(event: Event) {
  // Let the hash update, then move focus into main.
  event.preventDefault();
  const main = document.getElementById(MAIN_CONTENT_ID);
  if (main) {
    history.replaceState(null, '', mainContentHref());
    focusMainContent();
  }
}
</script>

<template>
  <a
    :href="mainContentHref()"
    class="skip-link"
    data-testid="skip-to-main"
    @click="onSkipActivate"
  >
    {{ t('a11y.skipToMain') }}
  </a>

  <Navbar />

  <main
    :id="MAIN_CONTENT_ID"
    class="flex flex-col items-center min-h-dvh 
    py-2 sm:py-4 md:py-6 lg:py-8 xl:py-10 
    px-2 sm:px-6 md:px-10 lg:px-16 xl:px-20 
    max-w-7xl mx-auto"
    tabindex="-1"
  >
    <slot name="content" />
  </main>

  <ScrollToTopButton />
</template>

<style scoped>
.skip-link {
  position: absolute;
  left: 0.75rem;
  top: 0.75rem;
  z-index: 100;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  background: var(--fallback-p, oklch(var(--p)));
  color: var(--fallback-pc, oklch(var(--pc)));
  font-size: 0.875rem;
  font-weight: 600;
  transform: translateY(-150%);
  transition: transform 0.15s ease;
}
.skip-link:focus {
  transform: translateY(0);
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
</style>
