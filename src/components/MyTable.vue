<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  v-for="header in table.tbData"
                  :key="header.id"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  {{ header.name }}
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr>
                <td
                  class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                  v-for="rowData in table.tbData"
                  :key="rowData.id"
                >
                  <DataRow :rowData="rowData" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DataRow from "./DataRow.vue";
import { ref, onMounted, watch, onUpdated } from "vue";
import { useTableStore } from "../stores/counter";
import { useRoute } from "vue-router";
const tableStore = useTableStore();
const { getTableByid, setTable, currentTable, update } = tableStore;
const getTable = getTableByid;
const table = ref({});
const route = useRoute();
const tableId = route.params.id;
const editable = ref(false);

function editData() {
  editable.value = true;
}
function updateTable() {
  update(table.value.id);
  editable.value = !editable.value;
}
onMounted(() => {
  setTable(tableId);
});
watch(
  () => tableStore.currentTable,
  (newTable, oldTable) => {
    table.value = newTable;
  },
  { deep: true }
);
</script>

<style lang="scss" scoped></style>
