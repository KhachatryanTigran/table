<template>
  <div
    className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100"
  >
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h2
        className="m-6 text-center text-3xl font-bold tracking-tighter text-gray-900"
      >
        Create new Table
      </h2>
    </div>

    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        className="bg-white px-4 py-8 dhadow sm:rounded-lg sm:px-10 flex flex-col gap-3"
      >
        <input type="text" placeholder="Name" v-model="data.name" class="p-2" />

        <input
          type="number"
          placeholder="Count of rows"
          v-model="data.count"
          class="p-2"
        />
        <button
          @click="create"
          class="bg-emerald-700 p-4 rounded-md text-white"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "../router/index";
import { ref, onMounted, watch } from "vue";
import { useTableStore } from "../stores/counter";
import { v4 as uuid } from "uuid";
const { createNewTable } = useTableStore();
const data = ref({
  name: "",
  count: "",
  id: uuid(),
});
function create() {
  createNewTable({
    name: data.value.name,
    count: data.value.count,
    id: data.value.id,
  });
  router.push(`/table/${data.value.id}`);
}
</script>

<style scoped></style>
