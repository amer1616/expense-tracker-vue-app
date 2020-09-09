<template>
  <div>
    <q-item dense class="q-my-sm" clickable v-ripple>
      <q-item-section side>
        <q-fab
          label="Actions"
          label-position="right"
          external-label
          :color="balance.amount > 0 ? 'positive' : 'negative'"
          icon="keyboard_arrow_up"
          direction="up"
          padding="xs"
        >
          <q-fab-action
            padding="5px"
            external-label
            label-position="right"
            color="negative"
            @click.stop="onRemove(balance.id)"
            icon="remove"
            label="Remove"
          />
          <q-fab-action
            padding="5px"
            external-label
            label-position="right"
            color="primary"
            @click="showEditModal = true"
            icon="edit"
            label="Edit"
          />
        </q-fab>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-subtitle1">{{ balance.text }}</q-item-label>
        <q-item-label
          lines="1"
          :class="balance.amount > 0 ? 'text-positive' : 'text-negative'"
          >{{ balance.amount }}</q-item-label
        >
      </q-item-section>

      <q-item-section side>
        <q-item-label>{{ formatDate(balance.dueDate) }}</q-item-label>
      </q-item-section>
    </q-item>
    <EditIncExpModal
      :editModal.sync="showEditModal"
      :editedBalance="balance"
      :id="balance.id"
    />
  </div>
  <!-- <q-separator spaced inset /> -->
</template>

<script>
import EditIncExpModal from "components/BalanceCategory/EditIncExpModal";
import { mapActions } from "vuex";
import { date } from "quasar";
export default {
  name: "BalanceRecords",
  components: { EditIncExpModal },
  props: ["balance"],

  data() {
    return {
      fab1: false,
      showEditModal: false
    };
  },
  methods: {
    ...mapActions("budget", ["deleteBalance"]),
    formatDate(timeStamp) {
      return date.formatDate(timeStamp, "dddd D MMMM");
    },
    onRemove(index) {
      console.log("removed");
      this.$q
        .dialog({
          title: "Confirm",
          message: "Really delete it?!",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          // console.log('>>>> OK')
          this.deleteBalance(index);
          this.$q.notify("Balance is deleted!");
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },

    onEdit() {
      console.log("on edit");
    }
  },
  mounted() {
    // console.log(Object.keys(this.balance));
  }
};
</script>

<style lang="scss" scoped>
.plus {
  color: $positive;
}
.minus {
  color: $negative;
}
</style>
