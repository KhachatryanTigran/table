<template>
  <div
    class="bg-white w-full mt-3 p-1 md:p-2 lg:p-4 flex flex-col items-center overflow-x-auto"
  >
    <h1
      class="text-center text-md sm:text-lg md:text-xl lg:text-2xl font-semibold sm:font-bold text-teal-600 m-2"
    >
      {{ table.name }}
    </h1>
    <div class="flex gap-1 lg:gap-3 overflow-x-auto">
      <div v-for="header in table.tbData" :key="header.id">
        <div
          class="px-1 lg:px-3 py-3.5 text-left text-sm font-semibold text-gray-900 min-w-200px flex flex-col items-center"
        >
          {{ header.name }}

          <div v-for="rowData in table.rowsData" :key="rowData.id">
            <TableRow
              :rowData="rowData"
              :header="header"
              @rowchange="rowchange"
              @removeRow="removeRow"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex gap-3">
      <MyButton @btnclick="addRow">AddRow</MyButton>
      <MyButton @btnclick="updateTable">Update</MyButton>
      <router-link
        class="bg-teal-600 rounded-md sm:text-md p-1 text-white text-center hover:bg-teal-800 text-sm lg:text-lg sm:p-2"
        :to="{ name: ROUTES.TableHeader.NAME, params: { id: route.params.id } }"
        >Change Headers</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuid } from "uuid";
import { Ref, onMounted, ref, watch } from "vue";
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";
import ROUTES from "../constants/routeConstants.ts";
import { TableHeader, useTableStore } from "../stores/counter";
import TableRow from "./TableRow.vue";
import MyButton from "./UI/MyButton.vue";

interface Row {
  id: string;
  [key: string]: string | number;
}

const tableStore = useTableStore();
const { setTable, updateRow } = tableStore;

const table: Ref<{
  tbData: TableHeader[];
  rowsData: Row[];
  name: string;
  id: string;
}> = ref({
  tbData: [],
  rowsData: [],
  name: "",
  id: "",
});
const route: RouteLocationNormalizedLoaded = useRoute();

function rowchange(data: string | number, headerId: string, id: string) {
  table.value.rowsData.map((row) => {
    if (row.id === id) {
      row[headerId] = data;
    }
  });
}
function removeRow(id: string) {
  table.value.rowsData = table.value.rowsData.filter((tb) => tb.id !== id);
}
function addRow() {
  const row: Row = { id: uuid() };
  table.value.tbData.forEach((el) => {
    if (el.type === "Number") {
      row[el.id] = NaN;
    } else {
      row[el.id] = "";
    }
  });
  table.value.rowsData.push(row);
}

function updateTable() {
  let check = true;
  const nonNullables = table.value.tbData.filter((header) => !header.nullable);

  table.value.rowsData.forEach((row) => {
    nonNullables.forEach((el) => {
      if (!row[el.id]) {
        check = false;
      }
    });
  });

  if (check) {
    updateRow(table.value);
  }
}

onMounted(() => {
  setTable(route.params.id as string);
});

watch(
  () => route.params.id as string,
  (id) => {
    setTable(id);
  },
  { immediate: true }
);

watch(
  () => tableStore.currentTable,
  (newTable) => {
    table.value = JSON.parse(JSON.stringify(newTable));
  },
  { deep: true }
);
</script>

<style lang="scss" scoped></style>
../stores/index.ts
