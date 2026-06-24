<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  applyDocumentLang,
  isSupportedLocale,
  writeStoredLocale,
  type SupportedLocale,
} from '@/utils/localePreference'

const { locale } = useI18n()
const currentLocale = ref(locale.value)

const changeLanguage = () => {
  const next = currentLocale.value
  locale.value = next
  if (isSupportedLocale(next)) {
    writeStoredLocale(next as SupportedLocale)
  }
  applyDocumentLang(String(next))
}

// Keep select in sync; persist + <html lang> when locale changes.
watch(
  locale,
  (val) => {
    currentLocale.value = val
    if (isSupportedLocale(val)) writeStoredLocale(val)
    applyDocumentLang(String(val))
  },
  { immediate: true },
)
</script>

<template>
  <div class="language-switcher">
    <label for="language-select" class="sr-only">{{ $t('common.select_language') }}</label>
    <select 
      id="language-select"
      v-model="currentLocale" 
      @change="changeLanguage" 
      class="bg-transparent appearance-none text-sm hover:opacity-80 transition-opacity focus:ring-2 focus:ring-primary focus:outline-none rounded"
      :aria-label="$t('common.select_language')"
      data-testid="language-select"
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
