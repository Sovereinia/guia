<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { scrollWindowToTop, shouldShowScrollToTop } from '@/utils/scrollToTop';

const { t } = useI18n();
const visible = ref(false);

function onScroll() {
  visible.value = shouldShowScrollToTop(window.scrollY || window.pageYOffset || 0);
}

function onClick() {
  scrollWindowToTop('smooth');
}

onMounted(() => {
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <button
    v-show="visible"
    type="button"
    class="btn btn-circle btn-primary btn-sm fixed bottom-4 right-4 z-50 shadow-lg"
    data-testid="scroll-to-top"
    :aria-label="t('a11y.scrollToTop')"
    @click="onClick"
  >
    ↑
  </button>
</template>
