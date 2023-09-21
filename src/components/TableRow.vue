<template>
  <div class="flex gap-2 items-center">
    <i
      @click="click"
      class="cursor-pointer text-sm opacity-0 hover:opacity-100 duration-300 text-red-600"
      >X</i
    >

    <div class="flex flex-col">
      <input
        class="bg-gray-50 p-2 m-0 mt-2 placeholder:text-red-600"
        :type="header.type"
        :placeholder="errMessage"
        :value="rowData[header.name]"
        @input="change"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { TableHeader, Row } from "../stores/counter";

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
  if (header.nullable || value) {
    emit("rowchange", value, header.name, rowData.id);
    errMessage.value = "";
  } else {
    emit("rowchange", value, header.name, rowData.id);
    errMessage.value = "Field is required";
  }
}

onMounted(() => {
  if (!rowData[header.name] && !header.nullable) {
    errMessage.value = "Field is required";
  }
});
</script>

<style lang="scss" scoped></style>
