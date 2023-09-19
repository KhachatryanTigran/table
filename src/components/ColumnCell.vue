<template>
  <div>
    <input
      class="border-spacing-1 border-solid border-black p-4"
      :type="type"
      placeholder="data"
      :value="data.value"
      :key="data.id"
      @input.prevent.stop="cellChange"
    />

    <div class="text-xs text-red-600 m-1">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { v4 as uuid } from "uuid";
import { ref, onMounted, watch, onUpdated } from "vue";
import { useTableStore } from "../stores/counter";
const emit = defineEmits(["chang"]);
const { data, nullable, type } = defineProps(["data", "nullable", "type"]);
const message = ref(null);
function cellChange(e) {
  const value = e.target.value;

  if (!nullable && !value.trim()) {
    message.value = "required non nullable";
  } else {
    message.value = null;

    emit("change", value, data.id);
  }
}
onMounted(() => {
  if (!data.value) {
    message.value = "required non nullable";
  }
});
onUpdated(() => {}), watch();
// () => rowData,
// (newTable, oldTable) => {
//   console.log("type data");
//   columnData.value = rowData.data;
// },
// { deep: true }
</script>

<style lang="scss" scoped></style>
