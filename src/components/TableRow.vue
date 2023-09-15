<template>
  <div
    class="bg-slate-50 hover:bg-teal-50 flex-row flex gap-10 border-solid border-teal-600 border-4 m-3 p-3 rounded-md justify-between"
  >
    <span>{{ row.name }}</span>
    <span>{{ row.data }}</span>
    <span>{{ row.type }}</span>
    <span>{{ row.nullable }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabled: true,
    };
  },

  props: {
    row: Object,
  },

  methods: {},
};
</script>

<style lang="scss" scoped></style>
