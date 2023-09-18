<template>
  <div class="flex flex-col">
    <div v-for="data in columnData" :key="data.id" class="gap-2">
      <input
        class="border-spacing-1 border-solid border-black p-4"
        :type="type"
        placeholder="data"
        :value="data.value"
        :key="data.id"
        @input="change($event, data.id)"
      />
      <div class="">{{ message }}</div>
    </div>
    <div class="m-2">
      <button @click="addRow" class="text-lg bg-red-500">+</button>
    </div>
  </div>
</template>

<script setup>
import { v4 as uuid } from "uuid";
import { ref, onMounted, watch, onUpdated } from "vue";
import { useTableStore } from "../stores/counter";
const { rowData } = defineProps(["rowData"]);
console.log(rowData, "rowData");

const columnData = ref([...rowData.data]);
const tableStore = useTableStore();
const type = ref("");
const message = ref(null);

function change(e, id) {
  const value = e.target.value;
  console.log(value, "value");
  if (!rowData.nullable && !value) {
    message.value = "required non nullable";
    console.log("nullable");
  } else {
    message.value = null;
  }

  if (value.length || rowData.type === "Number") {
    columnData.value.find((el) => el.id === id).value = value;
  } else {
  }
}
function addRow(e) {
  columnData.value.push({
    value: rowData.type === "String" ? "" : 0,
    id: uuid(),
  });
}

onMounted(() => {});
onUpdated(() => {
  rowData.type === "String" ? (type.value = "text") : (type.value = "number");
}),
  watch(
    () => rowData,
    (newTable, oldTable) => {
      console.log("type data");
      columnData.value = rowData.data;
    },
    { deep: true }
  );
</script>

<style lang="scss" scoped></style>
