<template>
  <div>
    <button
      @click.stop="props.click"
      class="bg-teal-600 p-2 rounded-md text-white text-center hover:bg-teal-800"
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
