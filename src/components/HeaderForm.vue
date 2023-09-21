<template>
  <div
    class="bg-slate-50 hover:bg-slate-200 hover:shadow-xl shadow-md gap-10 m-5 p-1 rounded-md"
  >
    <form class="flex flex-row justify-between items-center w-full p-2">
      <svg
        @click="addAdditionalHeader"
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

      <div class="flex gap-2 items-center">
        <p>{{ index + 1 }}</p>
        <input
          :placeholder="!header.name ? ` Field is required` : `Name`"
          v-model="header.name"
          class="p-3 placeholder:text-red-600 placeholder:text-sm placeholder:font-mono font-mono rounded-md"
        />
      </div>
      <div>
        <select v-model="header.type" class="p-1 rounded-md">
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
        <select v-model="header.nullable" class="p-1 rounded-md">
          <option disabled value="">Is Nullable</option>
          <option
            v-for="option in selectNullable"
            :value="option.value"
            :key="option.label"
          >
            {{ option.label }}
          </option>
        </select>
        <div v-if="header.required.nullable" class="text-red-600 text-sm">
          Nullable is required
        </div>
      </div>

      <div>
        <RemoveIcon :remove="remove" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTableStore, TableHeader } from "../stores/counter";
import RemoveIcon from "./UI/RemoveIcon.vue";
const tableStore = useTableStore();
interface Props {
  header: TableHeader;
  index: number;
}

const { header, index } = defineProps<Props>();

const selectType = ref<string[]>(["String", "Number"]);
const selectNullable = ref<{ value: boolean; label: string }[]>([
  { value: true, label: "Yes" },
  { value: false, label: "No" },
]);

function remove(e: MouseEvent) {
  e.preventDefault();
  e.stopPropagation();

  tableStore.remove(header.id);
}

function addAdditionalHeader() {
  tableStore.addNext(index);
}
</script>

<style lang="scss" scoped></style>
