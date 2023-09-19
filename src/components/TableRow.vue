<template>
  <div class="flex flex-col">
    <div v-for="data in columnData" :key="data.id" class="gap-2">
      <ColumnCell
        :data="data"
        @change="change"
        :nullable="rowData.nullable"
        :type="rowData.type"
      />
    </div>
    <div class="m-2">
      <svg
        @click="addRow"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6 cursor-pointer text-gray-500"
      >
        <path
          fill-rule="evenodd"
          d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { v4 as uuid } from "uuid";
import ColumnCell from "./ColumnCell.vue";
import { ref, onMounted, watch, onUpdated } from "vue";
import { useTableStore } from "../stores/counter";
import MyButton from "./UI/MyButton.vue";
const { rowData } = defineProps(["rowData"]);

const columnData = ref([...rowData.data]);
const tableStore = useTableStore();
const type = ref("");

function change(value, id) {
  if (id) {
    columnData.value.find((el) => el.id === id).value = value;
    const isEmptyFilled = columnData.value.some((el) => !!el.value === false);
    if (!isEmptyFilled) {
      tableStore.updateHeader(columnData.value, rowData.id);
    }
  }
}
// function change2(e, id) {
//   const value = e.target.value;
//   console.log(value, "value");
//   if (!rowData.nullable && !value) {
//     message.value = "required non nullable";
//     console.log("nullable");
//   } else {
//     message.value = null;
//   }

//   if (value.length || rowData.type === "Number") {
//     columnData.value.find((el) => el.id === id).value = value;
//   } else {
//   }
// }
function addRow(e) {
  columnData.value.push({
    value: null,
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
