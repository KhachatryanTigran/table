<template>
  <router-link :to="{ name: 'MyTable', params: { id: props.table.id } }">
    <div
      class="bg-teal-600 p-2 rounded-md text-white text-center hover:bg-teal-800 m-2"
    >
      <div class="flex justify-center">
        {{ props.table.name }}
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { ref, onMounted, watch, onUpdated, computed } from "vue";
import { useTableStore } from "../stores/counter";
import { v4 as uuid } from "uuid";
const tableStore = useTableStore();

const props = defineProps(["table"]);
</script>

<style lang="scss" scoped></style>
