<script setup>
import MyTable from "./components/MyTable.vue";
import { useTableStore } from "./stores/counter.ts";
import { mapStores } from "pinia";
import { ref } from "vue";
const count = ref(0);
function increment() {
  count.value++;
}
</script>

<template>
  <div>
    <router-view />
  </div>
</template>

<style></style>
