import Vue from "vue";

export const EventBus = new Vue();

export const newEventBus = (): Vue => {
  return new Vue();
};
