<template>
  <div class="q-pa-md row items-center q-gutter-md">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6 text-green-5 text-uppercase">Incomes</div>
        <div class="text-h6 text-green-5">+${{ incomeTotal }}</div>
      </q-card-section>
    </q-card>
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6 text-red-5 text-uppercase">Expenses</div>
        <div class="text-h6 text-red-5">-${{ expenseTotal }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { expenseTotal } from "../store/module-budget/getters";

export default {
  name: "ExpIncomeShow",
  computed: {
    ...mapGetters("budget", ["incomeTotal", "expenseTotal"])
  }
};
</script>

<style>
.my-card {
  height: 100%;
  text-align: center;
  min-width: 200px;
}
</style>
