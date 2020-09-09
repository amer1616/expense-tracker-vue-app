/* eslint-disable vue/no-side-effects-in-computed-properties */
<template>
  <q-dialog
    :value="editModal"
    @input="$emit('update:editModal', $event)"
    ref="dialog"
  >
    <q-card style="min-width: 400px">
      <q-card-section>
        <div class="text-h5">Edit Income/Expense</div>
      </q-card-section>
      <q-form @submit.prevent="onSubmit" @reset="onReset" ref="editForm">
        <q-card-section class="q-pt-none">
          <q-input
            clearable
            outlined
            label="Enter Description "
            dense
            v-model="balance.text"
            autofocus
            @keyup.enter="closeModal"
            hint="Enter Text"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            prefix="$"
            clearable
            outlined
            label="Enter money amount"
            type="number"
            dense
            v-model.number="balance.amount"
            @keyup.enter="closeModal"
            lazy-rules
            :rules="[
              val =>
                (val !== null && val !== '') || 'Please type your money amount',
              val => val < 1000000 || 'Please type a real money amount'
            ]"
          />
        </q-card-section>
        <q-card-section class="row justify-center items-center q-pt-none">
          <q-btn-toggle
            v-model="balance.category"
            class="toggle-btn"
            spread
            no-caps
            rounded
            unelevated
            color="white"
            :toggle-color="
              balance.category === 'income' ? 'positive' : 'negative'
            "
            :text-color="
              balance.category === 'income' ? 'negative' : 'positive'
            "
            :options="[
              { label: 'Income', value: 'income' },
              { label: 'Expense', value: 'expense' }
            ]"
          />
          <q-input
            dense
            style="max-width: 180px;"
            class="q-ml-auto"
            outlined
            placeholder="Enter Date"
            v-model="balance.dueDate"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    mask="DD/MM/YYYY"
                    color="primary"
                    today-btn
                    v-model="balance.dueDate"
                    @input="() => $refs.qDateProxy.hide()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="center" class="text-primary">
          <!-- <q-btn flat label="Cancel" type="reset" auto-close-popup /> -->
          <q-btn color="primary" label="Save" type="submit" auto-close-popup />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { date } from "quasar";
import { mapActions } from "vuex";
export default {
  name: "EditIncExpModal",
  props: {
    editModal: {
      type: Boolean,
      default: false
    },
    editedBalance: {
      type: Object
    },
    id: {}
  },
  data() {
    return {
      // editModal: false,
      balance: {}
    };
  },
  watch: {
    selectedType(newVal, oldVal) {
      console.log(newVal, oldVal);
    }
  },
  computed: {
    isSelectedType: {
      get() {
        let selectedType =
          this.balance.amount > 0
            ? // eslint-disable-next-line vue/no-side-effects-in-computed-properties
              (this.selectedType = "income")
            : // eslint-disable-next-line vue/no-side-effects-in-computed-properties
              (this.selectedType = "expense");
        return selectedType;
      },
      set(val) {
        this.selectedType = val;

        //   this.balance.amount > 0
        //     ? // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        //       (this.selectedType = val)
        //     : // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        //       (this.selectedType = val);
      }
    },
    isAbsNumber() {
      return Math.abs(this.balance.amount);
    }
    // isModal: {
    //   get() {
    //     return this.modal;
    //   },
    //   set(val) {
    //     this.$emit("update:modal", val);
    //   }
    // }
  },
  methods: {
    ...mapActions("budget", ["updateBalance"]),
    formatDate(timeStamp) {
      return date.formatDate(timeStamp, "YYYY/M/D");
    },
    onDialogClose(ev) {
      //console.log(ev);
      this.$emit("OK");
    },
    closeModal() {
      this.$emit("update:modal", false);
      console.log("emitted");
    },
    onSubmit() {
      // console.log(this.$refs.editForm);

      this.$refs.editForm.validate().then(suceese => {
        if (suceese) {
          this.submitBalance();
          this.$q.notify({
            color: "primary",
            textColor: "white",
            icon: "cloud_done",
            message: "Balance Category Updated"
          });
          this.$refs.dialog.hide();
        } else {
          this.$q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "You need to check your fields"
          });
        }
      });
    },
    submitBalance() {
      if (this.balance.category === "expense") {
        let updBalance = { ...this.balance, amount: -this.balance.amount };
        this.updateBalance({ id: this.id, updates: updBalance });
      } else {
        this.updateBalance({ id: this.id, updates: this.balance });
      }
    },
    onReset() {
      this.balance.text = "";
      this.balance.amount = "";
      this.balance.dueDate = "";
      this.$refs.dialog.hide();
    }
  },
  mounted() {
    // console.log(this.editedBalance);
    this.balance = Object.assign({}, this.editedBalance);
  }
};
</script>

<style lang="scss" scoped>
.toggle-btn {
  border: 1px solid #aaa;
}
</style>
