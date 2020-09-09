<template>
  <q-banner class="flex flex-center bg-indigo-1" style="min-height:300px;">
    <template v-slot:avatar>
      <q-icon name="account_balance" color="primary" />
    </template>
    <span class="text-h6"
      >You have no balance category, please add new balance category.</span
    >
  </q-banner>
</template>

<script>
export default {
  name: "NoItemBanner"
};
</script>

<style></style>
