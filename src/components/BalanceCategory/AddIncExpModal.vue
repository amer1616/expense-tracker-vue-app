<template>
  <q-dialog v-model="isModal" @hide="onDialogClose" ref="dialog">
    <q-card style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">Add Income/Expense</div>
      </q-card-section>
      <q-form @submit.prevent="onSubmit" @reset="onReset" ref="myForm">
        <q-card-section class="q-pt-none">
          <q-input
            clearable
            outlined
            label="Enter Item Description "
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
              val =>
                (val > 0 && val < 100000) || 'Please type a real money amount'
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
          <q-btn
            size="20px"
            rounded
            class="q-px-lg qpy-xs"
            color="primary"
            label="Save"
            type="submit"
            auto-close-popup
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { date } from "quasar";
import { mapActions } from "vuex";
export default {
  name: "AddIncExpModal",
  props: {
    modal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      balance: {
        category: "",
        text: "",
        amount: 0,
        dueDate: "" || new Date().toLocaleDateString("en-GB")
      }
    };
  },
  watch: {},
  computed: {
    isModal: {
      get() {
        return this.modal;
      },
      set(val) {
        this.$emit("update:modal", val);
      }
    }
  },
  methods: {
    ...mapActions("budget", ["addBalance"]),
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
      // console.log(this.$refs.myForm);

      this.$refs.myForm.validate().then(suceese => {
        if (suceese) {
          this.submitBalance();
          this.$q.notify({
            color: "primary",
            textColor: "white",
            icon: "cloud_done",
            message: "New Balance Added"
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
        this.addBalance(updBalance);
      } else {
        this.addBalance(this.balance);
      }

      this.balance.text = "";
      this.balance.amount = "";
      this.balance.category = "";
    },
    onReset() {
      this.balance.text = "";
      this.balance.amount = "";
      this.$refs.dialog.hide();
    }
  },
  mounted() {
    console.log(this.dueDate);
  }
};
</script>

<style lang="scss" scoped>
.toggle-btn {
  border: 1px solid #aaa;
}
</style>
