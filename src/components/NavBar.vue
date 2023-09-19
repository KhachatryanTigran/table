<template>
  <div class="flex flex-col">
    <div class="bg-white m-3 p-4 min-w-max">
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

<script setup>
import Home from "./Home.vue";
import MyTable from "./MyTable.vue";
import { useRoute } from "vue-router";
import { ref, onMounted, watch, onUpdated } from "vue";
import { useTableStore } from "../stores/counter";
import { v4 as uuid } from "uuid";
import TableTemplate from "./TableTemplate.vue";

const tableStore = useTableStore();

onMounted(() => {});
onUpdated(() => {
  console.log("updated");
}),
  watch();
</script>

<style lang="scss" scoped></style>
