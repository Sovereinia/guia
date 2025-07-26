<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, fallbackLocale, messages } = useI18n()
const currentLocale = ref(locale.value)

const changeLanguage = () => {
  locale.value = currentLocale.value
  localStorage.setItem('user-locale', currentLocale.value)
}

// Initialize from localStorage if available, otherwise from browser
const savedLocale = localStorage.getItem('user-locale')
const supportedLocales = Object.keys(messages.value)

if (savedLocale) {
  currentLocale.value = savedLocale
  locale.value = savedLocale
} else {
  const browserLocale = navigator.language.split('-')[0]
  if (supportedLocales.includes(browserLocale)) {
    currentLocale.value = browserLocale
    locale.value = browserLocale
  } else {
    currentLocale.value = fallbackLocale.value as string
    locale.value = fallbackLocale.value as string
  }
}
</script>

<template>
  <div class="language-switcher">
    <label for="language-select" class="sr-only">{{ $t('common.select_language') }}</label>
    <select 
      id="language-select"
      v-model="currentLocale" 
      @change="changeLanguage" 
      class="bg-transparent appearance-none text-sm hover:opacity-80 transition-opacity focus:ring-2 focus:ring-primary focus:outline-none rounded"
      aria-label="{{ $t('common.select_language') }}"
    >
      <option value="pt">{{ $t('common.portuguese') }}</option>
      <option value="en">{{ $t('common.english') }}</option>
      <option value="es">{{ $t('common.spanish') }}</option>
    </select>
  </div>
</template>


<style scoped>
.language-switcher {
  display: inline-block;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style> 