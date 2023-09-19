<script setup>
import { useTableStore } from "./stores/counter.ts";
import { mapStores } from "pinia";
import { ref } from "vue";
import NavBar from "./components/NavBar.vue";
import Home from "./components//Home.vue";
</script>

<template>
  <div class="flex bg-gray-200">
    <NavBar />
    <router-view />
  </div>
</template>

<style></style>
