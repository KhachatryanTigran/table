<template>
  <div>
    <FormKit
      type="password"
      name="password"
      validation="required|length:6|matches:/[^a-zA-Z]/"
      :validation-messages="{
        matches: 'Please include at least one symbol',
      }"
      placeholder="Your password"
    />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
