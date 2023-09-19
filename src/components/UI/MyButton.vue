<template>
  <div>
    <button
      @click.stop="addNewHeader"
      class="bg-emerald-700 p-4 rounded-md text-white"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
