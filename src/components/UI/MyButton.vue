<template>
  <div>
    <button
      @click.stop="props.click"
      class="bg-teal-600 rounded-md sm:text-md p-1 text-white text-center hover:bg-teal-800 text-sm lg:text-lg sm:p-2"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  click: () => void;
}>();
</script>

<style lang="scss" scoped></style>
