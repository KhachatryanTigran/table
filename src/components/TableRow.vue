<script setup>
import { ref } from "vue";
import test from "./Test.vue";
const submitted = ref(false);
const submitHandler = async () => {
  // Let's pretend this is an ajax request:
  await new Promise((r) => setTimeout(r, 1000));
  submitted.value = true;
};
const asd = ref([1, 2, 3, 4, 5, 6]);
</script>

<template>
  <FormKit
    type="form"
    id="registration-example"
    :form-class="submitted ? 'hide' : 'show'"
    submit-label="Register"
    @submit="submitHandler"
    :actions="false"
    #default="{ value }"
  >
    <h1>Register!</h1>

    <FormKit type="submit" label="Register" />
  </FormKit>
  <div v-if="submitted"></div>
</template>
