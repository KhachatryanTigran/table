<template>
  <div
    class="bg-slate-50 hover:bg-sky-100 flex-row flex gap-10 border-solid border-teal-600 border-2 m-5 p-1 rounded-md"
  >
    <form
      @submit.prevent="save"
      class="flex flex-row justify-between gap-10 w-full p-0"
    >
      <svg
        @click="addAditionalRow"
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

      <p>{{ index + 1 }}</p>
      <input placeholder="Name" v-model="rowData.name" class="p-3" />
      <textarea
        placeholder="Data"
        name="Text1"
        cols="40"
        rows="2"
        v-model="rowData.data"
      ></textarea>

      <select v-model="rowData.type">
        <option disabled value="">Select Type</option>
        <option v-for="type in selectType" :value="type" :key="type">
          {{ type }}
        </option>
      </select>

      <select v-model="rowData.nullable">
        <option disabled value="">Is Nullable</option>
        <option v-for="type in selectNullable" :value="type" :key="type">
          {{ type }}
        </option>
      </select>

      <div>
        <button v-if="check()">Save</button>
        <button v-if="checkRestore()" @click.stop="restoreData">Restore</button>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6 cursor-pointer text-teal-500"
          @click="remove"
        >
          <path
            fill-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useTableStore } from "../stores/counter";
import { v4 as uuid } from "uuid";
const tableStore = useTableStore();

const { row, index } = defineProps(["row", "index"]);
const rowData = ref({
  name: row.name,
  data: row.data,
  type: row.type,
  nullable: row.nullable,
});
const selectType = ref(["String", "Number", "Boolean"]);
const selectNullable = ref(["Yes", "No"]);
function remove() {
  tableStore.remove(row.id);
}
function addAditionalRow() {
  tableStore.addNext(index);
}
function restoreData() {
  const getRow = tableStore.getOldData;
  const restoredData = getRow(index);
  rowData.value = { ...restoredData };
}
function check() {
  const asd =
    rowData.value.name === row.name &&
    rowData.value.data === row.data &&
    rowData.value.type === row.type
      ? false
      : true;
  console.log(asd);
  return asd;
}
function checkRestore(e) {
  const currentRow = tableStore.currentTable.rows[index];

  return tableStore.checkInStore(currentRow, index);
}
function save(e) {
  const newData = {
    ...row,
    name: rowData.value.name,
    data: rowData.value.data,
    type: rowData.value.type,
  };
  tableStore.save(newData);
}

onMounted(() => {});
</script>

<style lang="scss" scoped></style>
