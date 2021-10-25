<template>
  <v-dialog persistent :value="active" max-width="320">
    <v-card class="d-flex flex-column">
      <v-card-title class="text-h5">{{ dialog.title }}</v-card-title>
      <v-card-text
        ><p style="white-space: pre-line;">{{ dialog.message }}</p></v-card-text
      >
      <v-card-actions
        ><v-spacer></v-spacer><v-btn text @click="cancel()">{{ dialog.cancelText }}</v-btn
        ><v-btn :loading="isLoading" color="primary" @click="confirm()">{{
          dialog.confirmText
        }}</v-btn></v-card-actions
      >
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";

import { IConfirmDialog } from "./dialog";

export default Vue.extend({
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    dialog: {
      type: Object as () => IConfirmDialog,
      required: true,
    },
  },
  data(): { isLoading: boolean } {
    return {
      isLoading: false,
    };
  },
  methods: {
    cancel() {
      this.$emit("confirm", false);
      this.$emit("update:active", false);
    },
    async confirm() {
      if (this.dialog.confirmFunction) {
        this.isLoading = true;
        await Promise.resolve(this.dialog.confirmFunction())
          .then(() => {
            this.$emit("confirm", true);
          })
          .catch(() => {
            this.$emit("confirm", false);
          })
          .finally(() => {
            this.isLoading = false;
            this.$emit("update:active", false);
          });
      } else {
        this.$emit("confirm", true);
      }
    },
  },
});
</script>
