<template>
  <div>
    <div v-for="data in rowData.data" :key="data.id" class="gap-2">
      <input
        :type="type"
        placeholder="data"
        :value="data.value"
        :key="data.id"
        @change="change"
      />
    </div>
    <div class="m-2"><button @click="addRow" class="text-lg">+</button></div>
  </div>
</template>

<script setup>
import { v4 as uuid } from "uuid";
import { ref, onMounted, watch, onUpdated } from "vue";
import { useTableStore } from "../stores/counter";
const { rowData } = defineProps(["rowData"]);
const tableStore = useTableStore();
const type = ref("");
function change(e) {
  const value = e.target.value;
  if (value.length > 3 || rowData.type === "Number") {
    rowData.value = value;
  } else {
    alert("to short");
  }
}
function addRow(e) {
  rowData.data.push({
    value: rowData.type === "String" ? "" : 0,
    id: uuid(),
  });
}

onMounted(() => {});
onUpdated(() => {
  console.log(rowData);
  rowData.type === "String" ? (type.value = "text") : (type.value = "number");
}),
  watch();
// () => tableStore.currentTable,
// (newTable, oldTable) => {
//   table.value = newTable;
//   console.log("type");
//   check(newTable);
// },
// { deep: true }
</script>

<style lang="scss" scoped></style>
