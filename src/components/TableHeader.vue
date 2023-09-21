<template>
  <div class="flex flex-col bg-white mt-3 p-4 w-full items-center">
    <h2 class="text-center text-3xl font-bold text-teal-800 m-2">
      {{ table?.name ? table.name.toUpperCase() : "No Name" }}
    </h2>
    <div class="w-full">
      <HeaderForm
        v-for="(header, index) in table?.tbData"
        :key="header.id"
        :header="header"
        :index="index"
      />

      <div class="flex flex-row justify-end gap-3 m-5">
        <MyButton :click="addNewHeader"> Add Header </MyButton>
        <MyButton :click="updateTable"> Update </MyButton>
      </div>
      <div class="text-lg text-sky-800 p-2">{{ message }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, RouteLocationNormalizedLoaded } from "vue-router";
import { ref, onMounted, watch, onUpdated, Ref } from "vue";
import { useTableStore, Table } from "../stores/counter";

import MyButton from "./UI/MyButton.vue";
import HeaderForm from "./HeaderForm.vue";

const route: RouteLocationNormalizedLoaded = useRoute();

const { setTable, addHeader, update } = useTableStore();
const tableStore = useTableStore();
const tableId: string = route.params.id as string;
const message: Ref<string> = ref("");
const table: Ref<Table | undefined> = ref();

function check(data: Table) {
  data.tbData.map((el: any) => {
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

function addNewHeader() {
  addHeader();
}

onMounted(() => {
  setTable(tableId);
});

onUpdated(() => {
  setTimeout(() => {
    message.value = "";
  }, 2000);
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
