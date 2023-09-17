<script setup>
import { useTableStore } from "./stores/counter.ts";
import { mapStores } from "pinia";
import { ref } from "vue";
</script>

<template>
  <div>
    <router-view />
  </div>
</template>

<style></style>
