<template>
  <div>
    <button
      @click.stop="click"
      class="bg-teal-600 p-2 rounded-md text-white text-center hover:bg-teal-800"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script setup lang="ts">
const { click } = defineProps(["click"]);
</script>

<style lang="scss" scoped></style>
