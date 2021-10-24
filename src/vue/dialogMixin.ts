import Vue from "vue";
import { EventBus } from "./eventBus";

/**
 * The return value returned from an activated dialog
 */
export interface IDialogResult<T> {
  /**
   * Confirmed is true if the user clicked or initiated a confirm action in the dialog
   */
  confirmed: boolean;
  /**
   * The payload of the dialog confirm action
   */
  payload?: T;
}

export default Vue.extend({
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    closeOnNavigate: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    EventBus.$on("global:navigate", this.navigateCallback);
  },
  destroyed() {
    EventBus.$off("global:navigate", this.navigateCallback);
  },
  methods: {
    navigateCallback() {
      if (this.closeOnNavigate && this.active) {
        this.cancel();
      }
    },
    /**
     * Confirm that the dialog has been processed and accepted. Closes the dialog and
     * accepts an optional object to pass to the returned promise.
     *
     * @param confirmObject Optional object to pass as part of confirm
     */
    confirm(confirmObject?: unknown) {
      const returnObject: IDialogResult<unknown> = {
        confirmed: true,
        payload: confirmObject,
      };
      this.$emit("confirm", returnObject);
      this.$emit("active:update", false);
    },
    /**
     * Cancel and close the dialog.
     */
    cancel() {
      const returnObject: IDialogResult<unknown> = {
        confirmed: false,
      };

      this.$emit("confirm", returnObject);
      this.$emit("active:update", false);
    },
  },
});
