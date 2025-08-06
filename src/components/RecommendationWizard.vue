<!-- <template>
  <div class="recommendation-wizard space-y-6 p-6 bg-white rounded-xl shadow-md max-w-xl mx-auto">
    <h2 class="text-2xl font-bold">Find your perfect self-hosted app</h2>

    <div v-if="step === 1">
      <h3 class="text-lg font-semibold mb-2">1️⃣ What category are you interested in?</h3>
      <div class="space-y-2">
        <label v-for="option in categories" :key="option.value" class="flex items-center gap-2">
          <input type="radio" v-model="answers.category" :value="option.value" />
          {{ option.label }}
        </label>
      </div>
    </div>

    <div v-else-if="step === 2">
      <h3 class="text-lg font-semibold mb-2">2️⃣ Should it be beginner friendly?</h3>
      <div class="space-y-2">
        <label class="flex items-center gap-2">
          <input type="radio" v-model="answers.beginnerFriendly" :value="true" />
          Yes
        </label>
        <label class="flex items-center gap-2">
          <input type="radio" v-model="answers.beginnerFriendly" :value="false" />
          Nope
        </label>
      </div>
    </div>

    <div v-else-if="step === 3">
      <h3 class="text-lg font-semibold mb-2">3️⃣ How advanced are you with self-hosting?</h3>
      <div class="space-y-2">
        <label class="flex items-center gap-2">
          <input type="radio" v-model="answers.selfHostingLevel" :value="1" />
          🟢 Easy
        </label>
        <label class="flex items-center gap-2">
          <input type="radio" v-model="answers.selfHostingLevel" :value="2" />
          🟡 Intermediate
        </label>
        <label class="flex items-center gap-2">
          <input type="radio" v-model="answers.selfHostingLevel" :value="3" />
          🔴 Advanced
        </label>
      </div>
    </div>

    <div class="flex justify-between pt-4">
      <button
        v-if="step > 1"
        @click="step--"
        class="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
      >
        ⬅ Back
      </button>
      <button
        v-if="step < 3"
        @click="step++"
        :disabled="!isStepValid"
        class="ml-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Next ➡
      </button>
      <button
        v-else
        @click="finish"
        :disabled="!isStepValid"
        class="ml-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        🎯 Show Recommendations
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CategoryId } from '@/types'

const step = ref(1)

const answers = ref<{
  category: CategoryId | null
  beginnerFriendly: boolean | null
  selfHostingLevel: 1 | 2 | 3 | null
}>({
  category: null,
  beginnerFriendly: null,
  selfHostingLevel: null,
})

const emit = defineEmits<{
  (e: 'recommend', answers: typeof answers.value): void
}>()

const finish = () => {
  emit('recommend', answers.value)
}

// Basic validation per step
const isStepValid = computed(() => {
  if (step.value === 1) return answers.value.category !== null
  if (step.value === 2) return answers.value.beginnerFriendly !== null
  if (step.value === 3) return answers.value.selfHostingLevel !== null
  return false
})

const categories = [
  { value: 'social', label: 'Social' },
  { value: 'messaging', label: 'Messaging' },
  { value: 'tools', label: 'Tools' },
  { value: 'protocols', label: 'Protocols' },
  { value: 'all', label: 'All' },
]
</script>

<style scoped>
input[type="radio"] {
  accent-color: #2563eb;
}
</style> -->


<script setup lang="ts">
import { ref } from 'vue'

const step = ref(0)
const totalSteps = 3

const answers = ref({
  category: '',
  beginnerFriendly: false,
  selfHostingLevel: 1,
})

const emit = defineEmits<{
  (e: 'recommend', answers: typeof answers.value): void
}>()

const finish = () => {
  console.log('Collected Answers:', answers.value)
  emit('recommend', answers.value)
}

const reset = () => {
  step.value = 0
  answers.value = {
    category: '',
    beginnerFriendly: false,
    selfHostingLevel: 1,
  }
}
</script>

<template>
  <div
    class="recommendation-wizard max-w-xl mx-auto p-6 space-y-6 rounded-xl shadow-md transition-colors duration-300 ease-in-out"
    style="background-color: var(--color-card-primary); color: var(--color-text)"
  >
    <h2 class="text-xl font-bold">Step {{ step + 1 }} of {{ totalSteps }}</h2>

    <!-- Step 1 -->
    <div v-if="step === 0">
      <label class="font-medium mb-2 block">What kind of tool are you looking for?</label>
      <select
        v-model="answers.category"
        class="w-full p-2 rounded border"
        style="background-color: var(--base-100); color: var(--color-text); border-color: var(--color-muted)"
      >
        <option value="" disabled>Select a category</option>
        <option value="social">Social</option>
        <option value="productivity">Productivity</option>
        <option value="media">Media</option>
        <option value="file-sharing">File Sharing</option>
      </select>
    </div>

    <!-- Step 2 -->
    <div v-else-if="step === 1">
      <label class="font-medium block mb-4">Is beginner-friendliness important?</label>
      <div class="flex gap-4">
        <label class="cursor-pointer flex items-center gap-2">
          <input
            type="radio"
            v-model="answers.beginnerFriendly"
            :value="true"
            class="radio"
          />
          Yes
        </label>
        <label class="cursor-pointer flex items-center gap-2">
          <input
            type="radio"
            v-model="answers.beginnerFriendly"
            :value="false"
            class="radio"
          />
          Nope
        </label>
      </div>
    </div>

    <!-- Step 3 -->
    <div v-else-if="step === 2">
      <label class="font-medium block mb-4">How comfortable are you with self-hosting?</label>
      <input
        type="range"
        min="1"
        max="5"
        step="1"
        v-model.number="answers.selfHostingLevel"
        class="range"
        style="accent-color: var(--color-ring)"
      />
      <div class="text-sm mt-2 text-muted">
        {{ ['No experience', 'Beginner', 'Somewhat confident', 'Experienced', 'Pro'][answers.selfHostingLevel - 1] }}
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex justify-between pt-4">
      <button
        v-if="step > 0"
        @click="step--"
        class="py-2 px-4 rounded bg-gray-300 hover:bg-gray-400 text-black"
      >
        Back
      </button>

      <div class="flex-1"></div>

      <button
        v-if="step < totalSteps - 1"
        @click="step++"
        :disabled="step === 0 && !answers.category"
        class="py-2 px-4 rounded text-white"
        style="background-color: var(--color-brand)"
      >
        Next
      </button>

      <button
        v-else
        @click="finish"
        class="py-2 px-4 rounded text-white"
        style="background-color: var(--color-brand)"
      >
        Show Recommendations
      </button>
    </div>

    <!-- Reset -->
    <div class="text-center pt-4">
      <button
        @click="reset"
        class="text-sm text-muted underline"
      >
        Restart Wizard
      </button>
    </div>
  </div>
</template>
