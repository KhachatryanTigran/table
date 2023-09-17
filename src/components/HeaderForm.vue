<template>
  <div
    class="bg-slate-50 hover:bg-sky-100 flex-row flex gap-10 border-solid border-teal-600 border-2 m-5 p-1 rounded-md"
  >
    <form
      @submit.prevent="save"
      class="flex flex-row justify-between gap-10 w-full p-0"
    >
      <svg
        @click="addAditionalHeader"
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

      <div>
        <input placeholder="Name" v-model="header.name" class="p-3" />
        <div v-if="header.required.name" class="text-red-600 text-sm">
          Name is required
        </div>
      </div>
      <div>
        <select v-model="header.type">
          <option disabled value="">Select Type</option>
          <option v-for="type in selectType" :value="type" :key="type">
            {{ type }}
          </option>
        </select>
        <div v-if="header.required.type" class="text-red-600 text-sm">
          Type is required
        </div>
      </div>
      <div>
        <select v-model="header.nullable">
          <option disabled value="">Is Nullable</option>
          <option v-for="type in selectNullable" :value="type" :key="type">
            {{ type }}
          </option>
        </select>
        <div v-if="header.required.nullable" class="text-red-600 text-sm">
          Nullable is required
        </div>
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
import { ref, onMounted, watch, onUpdated, computed } from "vue";
import { useTableStore } from "../stores/counter";
import { v4 as uuid } from "uuid";
const tableStore = useTableStore();
const { header, index } = defineProps(["header", "index"]);

// const emit = defineEmits(["update:header"]);

// const value = computed({
//   get() {
//     return header;
//   },
//   set(value) {
//     if (!value.name.length) {
//       alert("fff");
//     }
//     emit("update:header", value);
//   },
// });

const headerData = ref({
  name: header.name,
  type: header.type,
  nullable: header.nullable,
});
const errMessage = ref("");
const selectType = ref(["String", "Number"]);
const selectNullable = ref(["Yes", "No"]);
function remove(e) {
  e.preventDefault();
  e.stopPropagation();

  console.log(header);
  tableStore.remove(header.id);
}
function addAditionalHeader() {
  tableStore.addNext(index);
}

onMounted(() => {});
onUpdated(() => {});
</script>

<style lang="scss" scoped></style>
