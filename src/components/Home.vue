<template>
  <div
    class="bg-white w-full m-3 flex justify-start flex-col py-20 px-5 sm:px-10 md:px-20"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2
        class="m-1 text-center text-md font-bold text-gray-900 lg:text-xl sm:text-lg"
      >
        Create new Table
      </h2>
    </div>

    <div
      class="bg-white sm:rounded-lg sm:px-10 flex flex-col items-center gap-3"
    >
      <input
        type="text"
        placeholder="Name"
        v-model="data.name"
        class="p-1 text-sm lg:text-lg sm:text-md md:p-2"
      />
      <div class="self-center">
        <MyButton @btnclick="create"> Create </MyButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuid } from "uuid";
import { ref } from "vue";
import router from "../router/index";
import { useTableStore } from "../stores/counter";
import MyButton from "./UI/MyButton.vue";
interface TableData {
  name: string;
  id: string;
}

const { createNewTable } = useTableStore();
const data = ref<TableData>({
  name: "",
  id: uuid(),
});

function create() {
  const newTableData: TableData = {
    name: data.value.name,
    id: data.value.id,
  };
  createNewTable(newTableData);
  router.push(`/table/${data.value.id}`);
}
</script>

<style scoped></style>
../stores
