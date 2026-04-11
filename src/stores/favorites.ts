import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore(
  'favorites',
  () => {
    const starred = ref<string[]>([]);

    const isStarred = (appName: string) => starred.value.includes(appName);

    const toggleStar = (appName: string) => {
      const index = starred.value.indexOf(appName);
      if (index === -1) {
        starred.value.push(appName);
      } else {
        starred.value.splice(index, 1);
      }
    };

    const count = computed(() => starred.value.length);

    return { starred, isStarred, toggleStar, count };
  },
  {
    persist: {
      pick: ['starred'],
      storage: localStorage,
    },
  },
);
