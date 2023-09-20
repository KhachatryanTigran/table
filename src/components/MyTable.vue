<template>
  <div class="bg-white w-full mt-3 p-4">
    <div class="flex gap-3">
      <div v-for="header in table.tbData" :key="header.id">
        <div
          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 min-w-200px"
        >
          {{ header.name }}
          <div v-for="rowData in table.rowsData">
            <TableRow
              :rowData="rowData"
              :header="header"
              @rowchange="rowchange"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex gap-3">
      <MyButton :click="addRow">AddRow</MyButton>
      <MyButton :click="updateTable">Update</MyButton>
      <router-link
        class="p-2 bg-teal-600 rounded-md text-white text-center hover:bg-teal-800"
        :to="{ name: 'TableHeder', params: { id: route.params.id } }"
        >Change Headers</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import MyButton from "./UI/MyButton.vue";
import TableRow from "./TableRow.vue";
import { v4 as uuid } from "uuid";
import { ref, onMounted, watch, Ref } from "vue";
import { useTableStore, TableHeader } from "../stores/counter";
import { useRoute, RouteLocationNormalizedLoaded } from "vue-router";

interface Row {
  id: string;
  [key: string]: string | number;
}

const tableStore = useTableStore();
const { setTable, updateRow } = tableStore;

const table: Ref<{
  tbData: Array<TableHeader>;
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

function rowchange(data: string | number, headerName: string, id: string) {
  table.value.rowsData.map((row) => {
    if (row.id === id) {
      row[headerName] = data;
    }
  });
}

function addRow() {
  const row: Row = { id: uuid() };
  table.value.tbData.forEach((el) => {
    if (el.type === "Number") {
      row[el.name] = 0;
    } else {
      row[el.name] = "";
    }
  });
  table.value.rowsData.push(row);
}

function updateTable() {
  let check = true;
  const nonNullables = table.value.tbData.filter((header) => !header.nullable);

  table.value.rowsData.forEach((row) => {
    nonNullables.forEach((el) => {
      if (!row[el.name]) {
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
