<template>
  <div class="flex justify-between items-center">
    <router-link :to="{ name: 'MyTable', params: { id: props.table.id } }">
      <div
        class="bg-teal-600 p-2 rounded-md text-white text-center hover:bg-teal-800 m-2"
      >
        <div class="flex justify-center">
          {{ props.table.name }}
        </div>
      </div>
    </router-link>
    <i
      @click="remove"
      class="cursor-pointer font-bold text-xl text-teal-600 hover:tect-teal-800 p-0"
      >X</i
    >
  </div>
</template>

<script setup lang="ts">
import { useTableStore, Table } from "../stores/counter";
import { defineProps, PropType } from "vue";

const props = defineProps({
  table: {
    type: Object as PropType<Table>,
    required: true,
  },
});

const tableStore = useTableStore();

function remove(): void {
  tableStore.removeTable(props.table.id);
}
</script>

<style lang="scss" scoped></style>
