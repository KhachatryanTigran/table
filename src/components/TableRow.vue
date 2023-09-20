<template>
  <div class="flex flex-col">
    <input
      class="bg-gray-50 p-2 m-0 mt-2"
      :type="header.type"
      :value="rowData[header.name]"
      @input="change"
    />
    <div class="text-xs text-red-500 p-0 m-0">{{ errMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import { TableHeader, Row } from "../stores/counter";

interface Props {
  rowData: Row;
  header: TableHeader;
}

const { rowData, header } = defineProps<Props>();

const emit = defineEmits(["rowchange"]);

const errMessage = ref<string>("");

function change(e: Event) {
  const value = (e.target as HTMLInputElement).value;
  if (header.nullable || value) {
    emit("rowchange", value, header.name, rowData.id);
    errMessage.value = "";
  } else {
    emit("rowchange", value, header.name, rowData.id);
    errMessage.value = "Field is required";
  }
}
</script>

<style lang="scss" scoped></style>
