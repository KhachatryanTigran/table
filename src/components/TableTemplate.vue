<template>
  <div class="flex justify-between items-center">
    <router-link :to="{ name: 'MyTable', params: { id: props.table.id } }">
      <div
        class="bg-teal-600 p-1 px-5 rounded-md text-white text-center hover:bg-teal-800 m-1"
      >
        <div class="flex justify-center">
          {{ props.table.name }}
        </div>
      </div>
    </router-link>
    <RemoveIcon :remove="remove" />
  </div>
</template>

<script setup lang="ts">
import { useTableStore, Table } from "../stores/counter";
import RemoveIcon from "./UI/RemoveIcon.vue";
import { PropType } from "vue";

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
