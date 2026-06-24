<script setup lang="ts">
import type { App, UseCaseId } from '@/types';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

defineProps<{ apps: App[] }>();
const emit = defineEmits<{
  apply: [payload: { useCase: UseCaseId | 'all'; beginnersOnly: boolean; federatedOnly: boolean }];
  close: [];
}>();

const { t } = useI18n();
const step = ref(0);
const need = ref<'social' | 'chat' | 'storage' | 'devops' | 'docs' | ''>('');
const skill = ref<'beginner' | 'advanced' | ''>('');
const fed = ref<'yes' | 'no' | ''>('');

const totalSteps = 3;

const canNext = computed(() => {
  if (step.value === 0) return !!need.value;
  if (step.value === 1) return !!skill.value;
  if (step.value === 2) return !!fed.value;
  return true;
});

function needToUseCase(): UseCaseId | 'all' {
  const map: Record<string, UseCaseId> = {
    social: 'social',
    chat: 'chat',
    storage: 'storage',
    devops: 'devops',
    docs: 'docs',
  };
  return need.value ? map[need.value] : 'all';
}

function finish() {
  emit('apply', {
    useCase: needToUseCase(),
    beginnersOnly: skill.value === 'beginner',
    federatedOnly: fed.value === 'yes',
  });
}

function restart() {
  step.value = 0;
  need.value = '';
  skill.value = '';
  fed.value = '';
}
</script>

<template>
  <div
    class="rounded-2xl border border-base-300 bg-base-100 p-4 sm:p-5 shadow-md mb-4"
    data-testid="recommendation-wizard"
    role="region"
    :aria-label="t('wizard.title')"
  >
    <div class="flex items-start justify-between gap-2 mb-3">
      <h2 class="text-lg font-semibold">{{ t('wizard.title') }}</h2>
      <button type="button" class="btn btn-ghost btn-xs" :aria-label="t('wizard.close')" @click="emit('close')">✕</button>
    </div>

    <p class="text-sm text-base-content/70 mb-3">{{ step + 1 }} / {{ totalSteps }}</p>

    <div v-if="step === 0" class="flex flex-col gap-2">
      <p class="font-medium mb-1">{{ t('wizard.q1') }}</p>
      <label v-for="opt in (['social','chat','storage','devops','docs'] as const)" :key="opt" class="label cursor-pointer justify-start gap-2">
        <input v-model="need" type="radio" class="radio radio-sm" :value="opt" />
        <span class="label-text">{{ t(`wizard.opt_${opt}`) }}</span>
      </label>
    </div>

    <div v-else-if="step === 1" class="flex flex-col gap-2">
      <p class="font-medium mb-1">{{ t('wizard.q2') }}</p>
      <label class="label cursor-pointer justify-start gap-2">
        <input v-model="skill" type="radio" class="radio radio-sm" value="beginner" />
        <span class="label-text">{{ t('wizard.opt_beginner') }}</span>
      </label>
      <label class="label cursor-pointer justify-start gap-2">
        <input v-model="skill" type="radio" class="radio radio-sm" value="advanced" />
        <span class="label-text">{{ t('wizard.opt_advanced') }}</span>
      </label>
    </div>

    <div v-else class="flex flex-col gap-2">
      <p class="font-medium mb-1">{{ t('wizard.q3') }}</p>
      <label class="label cursor-pointer justify-start gap-2">
        <input v-model="fed" type="radio" class="radio radio-sm" value="yes" />
        <span class="label-text">{{ t('wizard.opt_yes_fed') }}</span>
      </label>
      <label class="label cursor-pointer justify-start gap-2">
        <input v-model="fed" type="radio" class="radio radio-sm" value="no" />
        <span class="label-text">{{ t('wizard.opt_no_fed') }}</span>
      </label>
    </div>

    <div class="flex flex-wrap gap-2 mt-4">
      <button v-if="step > 0" type="button" class="btn btn-outline btn-sm" @click="step--">{{ t('wizard.back') }}</button>
      <button
        v-if="step < totalSteps - 1"
        type="button"
        class="btn btn-primary btn-sm"
        :disabled="!canNext"
        data-testid="wizard-next"
        @click="step++"
      >
        {{ t('wizard.next') }}
      </button>
      <button
        v-else
        type="button"
        class="btn btn-primary btn-sm"
        :disabled="!canNext"
        data-testid="wizard-finish"
        @click="finish"
      >
        {{ t('wizard.finish') }}
      </button>
      <button type="button" class="btn btn-ghost btn-sm" @click="restart">{{ t('wizard.restart') }}</button>
    </div>
  </div>
</template>
