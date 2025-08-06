<script setup lang="ts">
// 🔁 Reactive state from Vue
import { ref } from 'vue'

// 🧮 Step counter for the wizard (starts at 0)
const step = ref(0)
const totalSteps = 3

// 📝 Answers collected from the user across steps
const answers = ref({
  category: '',              // Step 1: What category the user wants
  beginnerFriendly: false,   // Step 2: Is beginner-friendliness a factor?
  selfHostingLevel: 1,       // Step 3: Comfort with self-hosting (1–5 scale)
})

// 📡 Emit an event to the parent component with user answers
const emit = defineEmits<{
  (e: 'recommend', answers: typeof answers.value): void
}>()

// ✅ Called when the wizard finishes (Step 3 -> emit)
const finish = () => {
  console.log('Collected Answers:', answers.value)
  emit('recommend', answers.value)
}

// 🔄 Reset the wizard to initial state (also used by restart button)
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
  <!-- 🌟 Main Container: Centered, responsive, styled box -->
  <div
    class="recommendation-wizard w-full max-w-xl mx-auto p-4 sm:p-6 space-y-6 rounded-xl shadow-md transition-colors duration-300 ease-in-out"
    style="background-color: var(--color-card-primary); color: var(--color-text)"
  >
    <!-- 🔢 Step indicator -->
    <h2 class="text-lg sm:text-xl font-bold text-center sm:text-left">
      Step {{ step + 1 }} of {{ totalSteps }}
    </h2>

    <!-- 🥇 Step 1: Select a category -->
    <div v-if="step === 0">
      <label class="font-medium mb-2 block">What kind of tool are you looking for?</label>
      <select
        v-model="answers.category"
        class="w-full p-2 rounded border text-sm sm:text-base"
        style="background-color: var(--base-100); color: var(--color-text); border-color: var(--color-muted)"
      >
        <option value="" disabled>Select a category</option>
        <option value="social">Social</option>
        <option value="messaging">Messaging</option>
        <option value="tools">Tools</option>
        <option value="protocols">Protocols</option>
        <option value="all">All</option>
      </select>
    </div>

    <!-- 🥈 Step 2: Beginner-friendliness -->
    <div v-else-if="step === 1">
      <label class="font-medium block mb-4">Is beginner-friendliness important?</label>
      <div class="flex flex-col sm:flex-row gap-4">
        <!-- ✅ Yes option -->
        <label class="cursor-pointer flex items-center gap-2">
          <input type="radio" v-model="answers.beginnerFriendly" :value="true" />
          Yes
        </label>
        <!-- ❌ No option -->
        <label class="cursor-pointer flex items-center gap-2">
          <input type="radio" v-model="answers.beginnerFriendly" :value="false" />
          Nope
        </label>
      </div>
    </div>

    <!-- 🥉 Step 3: Self-hosting level -->
    <div v-else-if="step === 2">
      <label class="font-medium block mb-4">How comfortable are you with self-hosting?</label>
      <input
        type="range"
        min="1"
        max="5"
        step="1"
        v-model.number="answers.selfHostingLevel"
        class="w-full"
        style="accent-color: var(--color-ring)"
      />
      <div class="text-sm mt-2 text-muted">
        {{
          ['No experience', 'Beginner', 'Somewhat confident', 'Experienced', 'Pro'][
            answers.selfHostingLevel - 1
          ]
        }}
      </div>
    </div>

    <!-- 🧭 Navigation buttons: Back / Next / Finish -->
    <div class="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2 sm:gap-4 pt-4">
      <!-- 🔙 Back button -->
      <button
        v-if="step > 0"
        @click="step--"
        class="w-full sm:w-auto py-2 px-4 rounded bg-gray-300 hover:bg-gray-400 text-black"
      >
        Back
      </button>

      <!-- 📏 Spacer for alignment -->
      <div class="flex-1 hidden sm:block"></div>

      <!-- ⏭️ Next button: disabled if category isn't selected yet -->
      <button
        v-if="step < totalSteps - 1"
        @click="step++"
        :disabled="step === 0 && !answers.category"
        class="w-full sm:w-auto py-2 px-4 rounded text-white"
        style="background-color: var(--color-brand)"
      >
        Next
      </button>

      <!-- 🎉 Final submit button -->
      <button
        v-else
        @click="finish"
        class="w-full sm:w-auto py-2 px-4 rounded text-white cursor-pointer"
        style="background-color: var(--color-brand)"
      >
        Show Recommendations
      </button>
    </div>

    <!-- 🔁 Optional restart link -->
    <div class="text-center pt-4">
      <button @click="reset" class="text-sm text-muted underline">Restart Wizard</button>
    </div>
  </div>
</template>

