<template>
  <div class="flex gap-1 lg:gap-2 items-center overflow-x:scroll">
    <i
      @click="click"
      class="cursor-pointer text-xs md:text-sm m-0 p-0 opacity-30 hover:opacity-100 duration-300 text-red-600 font-bold"
      >-</i
    >

    <div class="flex flex-col">
      <input
        class="bg-gray-50 p-0 md:p-1 mt-2 placeholder:text-red-600 text-xs md:text-sm w-28"
        :type="header.type"
        :placeholder="errMessage"
        :value="rowData[header.id]"
        @input="change"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Row, TableHeader } from "../stores/counter";

interface Props {
  rowData: Row;
  header: TableHeader;
}

const { rowData, header } = defineProps<Props>();

const emit = defineEmits(["rowchange", "removeRow"]);

const errMessage = ref<string>("");
function click(): void {
  emit("removeRow", rowData.id);
}
function change(e: Event): void {
  const value = (e.target as HTMLInputElement).value;

  emit("rowchange", value, header.id, rowData.id);
  header.nullable || value
    ? (errMessage.value = "")
    : (errMessage.value = "Field is required");
}

onMounted(() => {
  if (!rowData[header.name] && !header.nullable) {
    errMessage.value = "Field is required";
  }
});
</script>

<style lang="scss" scoped></style>
../stores
