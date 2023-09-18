<template>
  <div class="flex flex-col p-5 m-4 items-center">
    <h2
      class="text-center text-3xl font-bold tracking-tighter text-rose-500 m-2"
    >
      {{ table.name ? table.name.toUpperCase() : "No Name" }}
    </h2>
    <div class="border-solid border-slate-500 border-2 rounded-md w-full">
      <HeaderForm
        v-for="(header, index) in table?.tbData"
        :key="header.id"
        v-bind:header="header"
        :index="index"
      />

      <div class="flex flex-row justify-end gap-3 m-5">
        <button
          @click.stop="addNewHeader"
          class="bg-emerald-700 p-4 rounded-md text-white"
        >
          Add Header
        </button>
        <button
          @click="updateTable"
          class="bg-emerald-700 p-4 rounded-md text-white"
        >
          Update
        </button>
      </div>
      <div class="text-lg text-sky-800 p-2">{{ message }}</div>
    </div>
    <router-link :to="{ name: 'MyTable', params: { id: table.id } }"
      >Go to table</router-link
    >
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, watch, onUpdated } from "vue";
import { useTableStore } from "../stores/counter";
import { v4 as uuid } from "uuid";

import HeaderForm from "./HeaderForm.vue";
const route = useRoute();

const { setTable, addHeader, update } = useTableStore();
const tableStore = useTableStore();
const tableId = route.params.id;
const message = ref("");
const table = ref({});
function check(data) {
  data.tbData.map((el) => {
    el.name.trim() ? (el.required.name = false) : (el.required.name = true);
    el.type ? (el.required.type = false) : (el.required.type = true);
    el.nullable !== ""
      ? (el.required.nullable = false)
      : (el.required.nullable = true);
  });
}
function updateTable() {
  const isFilled = tableStore.currentTable.tbData.some(
    (el) => el.required.name || el.required.type || el.required.nullable
  );

  if (isFilled) {
    message.value = "Sorry, not all fields are filled out correctly.";
  } else {
    message.value = "Updated successfully";
    update(table.value.id);
  }
}
function addNewHeader() {
  addHeader();
}

onMounted(() => {
  setTable(tableId);
  console.log(tableStore.currentTable, "currentTable");
});
onUpdated(() => {
  setTimeout(() => {
    message.value = "";
  }, 2000);
}),
  watch(
    () => tableStore.currentTable,
    (newTable, oldTable) => {
      table.value = newTable;
      console.log("type");
      check(newTable);
    },
    { deep: true }
  );
</script>

<style></style>
