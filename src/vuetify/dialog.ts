import Vue, { VueConstructor } from "vue";

import ConfirmDialog from "./ConfirmDialog.vue";
import Vuetify from "vuetify";
import { IDialogResult } from "../vue/dialogMixin";
import { deepClone } from "../clone";

let DEFAULT_VUETIFY = new Vuetify();

/**
 * Set the vuetify instance to be used as default on the dialogs
 *
 * @param vuetify The Vuetify instance to be used as default for dialogs
 */
export const setDefaultVuetify = (vuetify: Vuetify) => {
  DEFAULT_VUETIFY = vuetify;
};

/**
 * Config object for ConfirmDialog
 */
export interface IConfirmDialog {
  /**
   * Optional: Title of confirm dialog
   */
  title?: string;
  /**
   * Optional: Message within the confirm dialog
   */
  message?: string;
  /**
   * Optional: The text to be in the confirm button
   */
  confirmText?: string;
  /**
   * Optional: The text to be in the cancel button
   */
  cancelText?: string;
  /**
   * Optional: Confirmfunction to be run when the user clicks confirm. This function
   * is awaited so if you provide a promise, the button will load until the promise
   * fulfills. If the promise fails, the confirm dialog will not close.
   */
  confirmFunction?: () => void;
  /**
   * Optional: Specific vuetify instance to provide for the ConfirmDialog
   */
  vuetify?: Vuetify;
}

/**
 * Config object for openDialog
 */
export interface IDialog {
  /**
   * A Vue instance that implements the DialogMixin
   */
  dialog: VueConstructor<Vue>;
  /**
   * Optional: Properties to pass to the dialog instance. Will be deepCloned
   */
  properties?: Record<string, unknown>;
  /**
   * Optional: Parent where to mount the dialog
   */
  parent?: HTMLElement;
  /**
   * Optional: Specific vuetify instance to provide for the ConfirmDialog
   */
  vuetify?: Vuetify;
}

/**
 * Trigger a simple confirm dialog in the UI. The method will automatically mount
 * and dismount a dialog based on given configuration.
 *
 * @param confirmDialogConfiguration Parameters for triggering a Confirm Dialog
 * @returns A promise that will either resolve or reject based on
 * dialog results
 */
export const triggerConfirmDialog = async ({
  cancelText = "Cancel",
  confirmText = "Confirm",
  message = "Please confirm your action",
  title = "Confirm your choice",
  confirmFunction = async () => {
    return Promise.resolve();
  },
  vuetify = DEFAULT_VUETIFY,
}: IConfirmDialog = {}): Promise<boolean> => {
  const confirmDialog = new ConfirmDialog({
    vuetify,
    propsData: {
      active: true,
      dialog: {
        title,
        message,
        cancelText,
        confirmText,
        confirmFunction,
      },
    },
  });

  confirmDialog.$mount();

  document.body.appendChild(confirmDialog.$el);

  return new Promise((res) => {
    confirmDialog.$on("confirm", (confirm: boolean) => {
      res(confirm);
      document.body.removeChild(confirmDialog.$el);
      confirmDialog.$destroy();
    });
  });
};

/**
 * Trigger a dialog in the UI. The method will automatically mount
 * and dismount a dialog based on given configuration.
 *
 * @param confirmDialogConfiguration Parameters for triggering a generic Dialog
 * @returns A promise that will either resolve or reject based on
 * dialog results
 */
export const openDialog = async <T = unknown>({
  dialog = Vue.extend(),
  properties = {},
  vuetify = DEFAULT_VUETIFY,
  parent = document.body,
}: IDialog): Promise<IDialogResult<T>> => {
  const dialogInstance = new dialog({
    vuetify,
    propsData: {
      active: true,
      ...deepClone(properties),
    },
  });
  dialogInstance.$mount();

  parent.appendChild(dialogInstance.$el);

  return new Promise((res) => {
    dialogInstance.$on("confirm", (result: IDialogResult<T>) => {
      res(result);

      (dialogInstance as any).active = false;

      // Allow for exit animation
      setTimeout(() => {
        parent.removeChild(dialogInstance.$el);
        dialogInstance.$destroy();
      }, 150);
    });
  });
};
