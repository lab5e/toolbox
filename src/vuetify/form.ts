/**
 * SelectValue is a generic type representing a Vuetify select value
 */
export interface SelectValue<SelectValueType> {
  header?: string;
  disabled?: boolean;
  divider?: boolean;
  text?: string | number | Record<string, unknown>;
  value?: SelectValueType;
}

/**
 * VForm is the representation of a Vuetify Form element which has
 * a validate function
 */
export interface VForm extends HTMLFormElement {
  validate(): boolean;
}
