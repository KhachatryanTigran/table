<template>
  <div class="flex flex-col p-5 m-4 items-center">
    <h2
      class="text-center text-3xl font-bold tracking-tighter text-rose-500 m-2"
    >
      {{ table.name ? table?.name.toUpperCase() : "No Name" }}
    </h2>
    <div class="border-solid border-slate-500 border-2 rounded-md w-full">
      <div v-if="editable">
        <RowForm
          v-for="(row, index) in table?.rows"
          :key="row.id"
          v-bind:row="row"
          :index="index"
        />

        <div class="flex flex-row justify-end gap-3 m-5">
          <button @click="addNewRow">Add Row</button>
          <button @click="updateTable">Update</button>
        </div>
      </div>
      <div v-else v-click.double="editData">
        <div class="flex flex-row justify-between p-10">
          <div>Name</div>
          <div>Data</div>
          <div>Type</div>
          <div>Is Nullable</div>
        </div>
        <TableRow
          v-for="(row, index) in table?.rows"
          :key="row.id"
          v-bind:row="row"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, watch, onUpdated } from "vue";
import { useTableStore } from "../stores/counter";
import { v4 as uuid } from "uuid";
import TableRow from "./TableRow.vue";
import RowForm from "./RowForm.vue";
const route = useRoute();

const { getTableByid, setTable, currentTable, addRow, getData, update } =
  useTableStore();
const tableStore = useTableStore();
const tableId = route.params.id;

const table = ref({});
const editable = ref(false);

function editData() {
  editable.value = true;
}

function updateTable() {
  update(table.value.id);
  editable.value = !editable.value;
}
function addNewRow() {
  addRow(table.value.id);
}

onMounted(() => {
  setTimeout(() => {
    setTable(tableId);
  }, 0);
});
onUpdated(() => {}),
  watch(
    () => tableStore.currentTable,
    (newTable, oldTable) => {
      table.value = newTable;
    },
    { deep: true }
  );
</script>

<style></style>
