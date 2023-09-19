<template>
  <div class="flex flex-col h-screen">
    <div class="bg-white m-3 p-4 min-w-max h-screen">
      <div v-for="table in tableStore.tables">
        <TableTemplate :table="table" :key="table.id" />
      </div>
      <div class="pt-5 m-2 flex justify-center">
        <router-link class="p-2 hover:text-gray-600 font-bold" to="/"
          >Create new table</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUpdated } from "vue";
import { useTableStore } from "../stores/counter";

import TableTemplate from "./TableTemplate.vue";

const tableStore = useTableStore();

onMounted(() => {});
onUpdated(() => {
  console.log("updated");
});
</script>

<style lang="scss" scoped></style>
