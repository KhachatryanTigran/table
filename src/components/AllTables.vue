<template>
  <div>
    <div class="flex justify-start">
      <div v-for="table in tableStore.tables">
        <TableTemplate :table="table" :key="table.id" />
      </div>
    </div>
    <router-link to="/">Home</router-link>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, watch, onUpdated } from "vue";
import { useTableStore } from "../stores/counter";
import { v4 as uuid } from "uuid";
import TableTemplate from "./TableTemplate.vue";
const tableStore = useTableStore();
onMounted(() => {});
onUpdated(() => {}), watch();
</script>

<style lang="scss" scoped></style>
