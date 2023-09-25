<template>
  <input
    v-model="value"
    class="p-3 focus:border-4 border-solid border-red-500 rounded-md text-md"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<style scoped></style>
