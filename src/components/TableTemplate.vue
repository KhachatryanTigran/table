<template>
  <router-link :to="{ name: 'MyTable', params: { id: props.table.id } }">
    <div
      class="bg-teal-600 p-2 rounded-md text-white text-center hover:bg-teal-800 m-2"
    >
      <div class="flex justify-center">
        {{ props.table.name }}
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
const props = defineProps(["table"]);
</script>

<style lang="scss" scoped></style>
