<template>
  <q-page class="bg-grey-2 column items-center">
    <!-- <h5 class="q-mt-none">Budget</h5> -->
    <ExpIncomeShow />
    <q-list class="q-mb-md" bordered separator style="width: 80%">
      <NoItemBanner v-if="!balances.length" />
      <BalanceRecords
        v-else
        v-for="balance in balances"
        :key="balance.id"
        :balance="balance"
      />
    </q-list>
    <AddIncExpModal :modal.sync="showModal" />

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab
        icon="add"
        direction="up"
        color="primary"
        @click="showModal = true"
      >
        <!-- <q-fab-action @click="onClick" color="primary" icon="person_add" />
        <q-fab-action @click="onClick" color="primary" icon="mail" /> -->
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
import ExpIncomeShow from "components/ExpIncomeShow";
import BalanceRecords from "components/BalanceRecords";
import AddIncExpModal from "components/BalanceCategory/AddIncExpModal";
import NoItemBanner from "components/shared/NoItemBanner";

export default {
  name: "Budget",
  components: {
    ExpIncomeShow,
    BalanceRecords,
    AddIncExpModal,
    NoItemBanner
  },
  data() {
    return {
      showModal: false
    };
  },
  computed: {
    balances() {
      return this.$store.state.budget.balance;
    }
  },
  methods: {
    closeModal() {
      this.showModal = !this.showModal;
    },
    openEditModal(item) {
      //console.log(item);
      this.balance = { ...item };
      this.showEditModal = !this.showEditModal;
    }
  },
  mounted() {}
};
</script>
