<template>
  <router-link :to="{ name: 'MyTable', params: { id: table.id } }">
    <div class="border-solid border-teal-500 border-2 rounded-md w-40 h-40 m-4">
      <div class="flex justify-center m-4">
        {{ table.name }}
      </div>
    </div></router-link
  >
</template>

<script setup>
import { ref, onMounted, watch, onUpdated, computed } from "vue";
import { useTableStore } from "../stores/counter";
import { v4 as uuid } from "uuid";
const tableStore = useTableStore();

const { table } = defineProps(["table"]);
</script>

<style lang="scss" scoped></style>
