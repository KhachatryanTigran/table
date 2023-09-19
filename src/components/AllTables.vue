<template>
  <div>
    <div class="flex justify-start">
      <div v-for="table in tableStore.tables" :key="table.id">
        <TableTemplate :table="table" />
      </div>
    </div>
    <MyTable v-if="tableId" :id="tableId" />
  </div>
</template>

<script setup lang="ts">
import MyTable from "./MyTable.vue";

import { ref, onMounted, onUpdated } from "vue";
import { useTableStore } from "../stores/counter";

import TableTemplate from "./TableTemplate.vue";

const tableId = ref<string>("");
const tableStore = useTableStore();

onMounted(() => {});
onUpdated(() => {
  console.log("updated");
});
</script>

<style lang="scss" scoped></style>
