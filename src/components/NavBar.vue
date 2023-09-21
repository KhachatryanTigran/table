<template>
  <div class="flex flex-col h-screen">
    <div class="bg-white m-3 p-4 min-w-max h-screen">
      <div v-for="table in tables">
        <TableTemplate :table="table" :key="table.id" />
        <!-- <button class="flex self-end">X</button> -->
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
import { useTableStore } from "../stores/counter";
import { ref, watch } from "vue";
import TableTemplate from "./TableTemplate.vue";

const tableStore = useTableStore();

const tables = ref(tableStore.tables);
watch(
  () => tableStore.tables,
  (newTables) => {
    tables.value = newTables;
  }
);
</script>

<style lang="scss" scoped></style>
