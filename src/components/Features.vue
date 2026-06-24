<script setup lang="ts">
import Wrapper from './Wrapper.vue';

defineProps<{
  title: string;
  items: {
    id: string;
    label: string;
  }[];
}>();
</script>

<template>
  <Wrapper :title="title">
    <ul class="flex flex-col gap-2">
      <li v-for="item in items" :key="item.id">
        <label class="text-base-content opacity-80">
          <input type="checkbox" class="checkbox checkbox-primary mr-1" />
          {{ item.label }}
        </label>
      </li>
    </ul>
  </Wrapper>
</template>

<style scoped></style>
