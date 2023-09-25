<template>
  <div class="flex justify-between items-center flex-row">
    <router-link
      :to="{ name: ROUTES.MyTable.NAME, params: { id: props.table.id } }"
    >
      <div
        class="bg-teal-600 p-1 rounded-md text-white text-center hover:bg-teal-800 m-1 px-5 text-md lg:text-lg"
      >
        <div class="flex justify-center">
          {{ props.table.name }}
        </div>
      </div>
    </router-link>
    <RemoveIcon @remove="remove" />
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import ROUTES from "../constants/routeConstants.ts";
import { Table, useTableStore } from "../stores/counter";
import RemoveIcon from "./UI/RemoveIcon.vue";

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
../stores/index.ts
