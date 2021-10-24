import Vue, { VueConstructor } from "vue";

import ConfirmDialog from "./ConfirmDialog.vue";
import Vuetify from "vuetify";
import { IDialogResult } from "../vue/dialogMixin";
import { deepClone } from "../clone";

const DEFAULT_VUETIFY = new Vuetify();

export interface IConfirmDialog {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  confirmFunction?: () => void;
  vuetify?: Vuetify;
}

export interface IDialog {
  dialog: VueConstructor<Vue>;
  properties?: Record<string, unknown>;
  parent?: HTMLElement;
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
