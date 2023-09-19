<template>
  <div class="bg-white w-full m-3 flex justify-start flex-col p-20">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 className="m-1 text-center text-xl font-bold   text-gray-900">
        Create new Table
      </h2>
    </div>

    <div
      className="bg-white       sm:rounded-lg sm:px-10 flex flex-col items-center gap-3 "
    >
      <input type="text" placeholder="Name" v-model="data.name" class="p-2" />
      <div class="self-center">
        <MyButton :click="create"> Create </MyButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import MyInput from "./UI/MyInput.vue";
import MyButton from "./UI/MyButton.vue";
import router from "../router/index";
import { ref, onMounted, watch } from "vue";
import { useTableStore } from "../stores/counter";
import { v4 as uuid } from "uuid";
const { createNewTable } = useTableStore();
const data = ref({
  name: "",
  id: uuid(),
});
function create() {
  createNewTable({
    name: data.value.name,

    id: data.value.id,
  });
  router.push(`/table/${data.value.id}`);
}
</script>

<style scoped></style>
