<template>
  <div
    class="flex flex-col bg-white mt-3 p-1 sm:p-2 lg:p-4 w-full items-center"
  >
    <h1
      class="text-center text-md sm:text-lg md:text-xl lg:text-2xl font-semibold sm:font-bold text-teal-600 m-2"
    >
      {{ table?.name ? table.name.toUpperCase() : "No Name" }}
    </h1>
    <div class="w-full">
      <HeaderForm
        v-for="(header, index) in table?.tbData"
        :key="header.id"
        :header="header"
        :index="index"
      />

      <div class="flex flex-row justify-end gap-3 m-5">
        <MyButton @btnclick="addHeader()"> Add Header </MyButton>
        <MyButton @btnclick="updateTable"> Update </MyButton>
      </div>
      <div class="text-lg text-sky-800 p-2">{{ message }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, onMounted, onUpdated, ref, watch, watchEffect } from "vue";
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";
import { Table, TableHeader, useTableStore } from "../stores/counter";

import HeaderForm from "./HeaderForm.vue";
import MyButton from "./UI/MyButton.vue";

const route: RouteLocationNormalizedLoaded = useRoute();

const { setTable, addHeader, update } = useTableStore();
const tableStore = useTableStore();
const tableId: string = route.params.id as string;
const message: Ref<string> = ref("");
const table: Ref<Table | undefined> = ref();

function check(data: Table) {
  data.tbData.map((el: TableHeader) => {
    el.name.trim() ? (el.required.name = false) : (el.required.name = true);
    el.type ? (el.required.type = false) : (el.required.type = true);
    el.nullable !== null
      ? (el.required.nullable = false)
      : (el.required.nullable = true);
  });
}

function updateTable() {
  const isFilled = tableStore.currentTable.tbData.some(
    (el: any) => el.required.name || el.required.type || el.required.nullable
  );

  if (isFilled) {
    message.value = "Sorry, not all fields are filled out correctly.";
  } else {
    message.value = "Updated successfully";
    update();
  }
}

onMounted(() => {
  setTable(tableId);
});
let timeoutId: number | null = null;
onUpdated(() => {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }

  timeoutId = setTimeout(() => {
    message.value = "";
  }, 2000);
});
watchEffect(() => {
  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };
});
watch(
  () => tableStore.currentTable,
  (newTable) => {
    table.value = newTable;

    check(newTable);
  },
  { deep: true }
);
</script>

<style></style>
../stores
