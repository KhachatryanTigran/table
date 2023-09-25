<template>
  <div class="flex flex-col">
    <div class="bg-white m-3 min-w-max sm:p-3 sm:m-3 h-screen p-1">
      <TransitionGroup
        name="list"
        tag="ul"
        class="flex flex-col min-h-full w-auto"
      >
        <svg
          @click.stop.prevent="() => (show = !show)"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 m-1 self-end"
          key="uniqkey"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
          />
        </svg>

        <div v-if="show" class="min-w-[150px]" key="uniqkey">
          <div v-for="table in tables">
            <TableTemplate :table="table" :key="table.id" />
          </div>
          <div class="pt-5 m-2 flex justify-center">
            <router-link
              @click.stop.prevent
              class="p-1 hover:text-gray-600 font-bold text-sm md:text-md md:p-2"
              to="/"
              >Add New</router-link
            >
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useTableStore } from "../stores/counter";
import TableTemplate from "./TableTemplate.vue";
const show = ref(window.innerWidth > 640);
const tableStore = useTableStore();

const tables = ref(tableStore.tables);

const innerWidth = ref(window.innerWidth);

function handleResize() {
  innerWidth.value = window.innerWidth;
}
onMounted(() => {
  window.addEventListener("resize", handleResize);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

watch(
  () => innerWidth.value,
  (newVal) => {
    show.value = newVal > 640;
  },
  { deep: true }
);
watch(
  () => tableStore.tables,
  (newTables) => {
    tables.value = newTables;
  }
);
</script>

<style lang="scss" scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
../stores
