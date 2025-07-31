import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useGlobalStore = defineStore(
  'global',
  () => {
    const html = document.querySelector('html');
    const theme = ref('light');
    const isDark = computed(() => theme.value === 'dark');
    const isReshuffled = ref(false);
    const shuffleTrigger = ref(0);

    const toggleTheme = () => {
      if (!html) return;
      theme.value = theme.value === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', theme.value);

      if (isDark.value) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    };

    const loadTheme = () => {
      if (!html) return;
      html.setAttribute('data-theme', theme.value);
    };

    const toggleReshuffle = () => {
      isReshuffled.value = true;
      shuffleTrigger.value++;
    };

    const resetReshuffle = () => {
      isReshuffled.value = false;
    };

    return { theme, isDark, isReshuffled, shuffleTrigger, toggleTheme, loadTheme, toggleReshuffle, resetReshuffle };
  },
  {
    persist: {
      pick: ['theme'],
      storage: localStorage,
    },
  },
);
