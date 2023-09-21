<script setup lang="ts">
import NavBar from "./components/NavBar.vue";

import { onMounted, watch } from "vue";
import { useTableStore, Table } from "./stores/counter";
const tableStore = useTableStore();

onMounted(() => {
  const savedTablesJson = localStorage.getItem("tables");
  if (savedTablesJson) {
    try {
      const savedTables: Table[] = JSON.parse(savedTablesJson);
      tableStore.setTableFromStorage(savedTables);
    } catch (error) {
      console.error("Error parsing saved tables:", error);
    }
  }
});

watch(
  () => tableStore.tables,
  (newTable) => {
    localStorage.setItem("tables", JSON.stringify(newTable));
  },
  { deep: true }
);
</script>

<template>
  <div class="flex bg-gray-200">
    <NavBar />
    <router-view />
  </div>
</template>

<style></style>
