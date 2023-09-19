<template>
  <div class="bg-white w-full mt-3 p-4">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 flex flex-col">
      <table class="min-w-fit divide-y divide-gray-300 m-5">
        <thead class=" ">
          <tr>
            <th
              v-for="header in table.tbData"
              :key="header.id"
              class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 min-w-200px"
            >
              {{ header.name }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr>
            <td
              class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 min-w-200px"
              v-for="rowData in table.tbData"
              :key="rowData.id"
            >
              <TableRow :rowData="rowData" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex gap-3">
      <MyButton :click="tableStore.update">Update</MyButton>
      <router-link
        class="p-2 bg-teal-600 rounded-md text-white text-center hover:bg-teal-800"
        :to="{ name: 'TableHeder', params: { id: route.params.id } }"
        >Change Headers</router-link
      >
    </div>
    <button @click="addRow">addRow</button>
  </div>
</template>

<script setup>
import MyButton from "./UI/MyButton.vue";
import TableRow from "./TableRow.vue";
import { ref, onMounted, watch, onUpdated, toRef } from "vue";
import { useTableStore } from "../stores/counter";
import { useRoute } from "vue-router";

const tableStore = useTableStore();
const { setTable, currentTable, update } = tableStore;

const table = ref({});
const route = useRoute();
function addRow() {
  console.log(table);
  const row = {};
  table.value.tbData.forEach((el) => {
    row[el.name] = null;
  });
  console.log(row);
}
function updateTable() {
  update(table.value.id);
}
onMounted(() => {
  console.log("mounted");
  console.log(route.params.id);
  setTable(route.params.id);
});
watch(
  () => route.params.id,
  (id) => {
    setTable(id);
  },
  { immediate: true }
);

watch(
  () => tableStore.currentTable,
  (newTable, oldTable) => {
    table.value = newTable;
  },
  { deep: true }
);
</script>

<style lang="scss" scoped></style>
