import Vue, { VueConstructor } from "vue";

/**
 * This will simply help TypeScript to know that a Vue view model has a mixin
 *
 * Pulled from https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/util/mixins.ts
 */

/**
 * Helper function to ensure proper typings on the Vue instance.
 *
 * @param args The mixins to use for the Vue instance
 */
export function mixins<T extends VueConstructor[]>(
  ...args: T
): ExtractVue<T> extends infer V ? (V extends Vue ? VueConstructor<V> : never) : never;
export default function mixins<T extends Vue>(...args: VueConstructor[]): VueConstructor<T>;
export default function mixins(...args: VueConstructor[]): VueConstructor {
  return Vue.extend({ mixins: args });
}
/**
 * Returns the instance type from a VueConstructor
 * Useful for adding types when using mixins().extend()
 */
export type ExtractVue<T extends VueConstructor | VueConstructor[]> = T extends (infer U)[]
  ? UnionToIntersection<U extends VueConstructor<infer V> ? V : never>
  : T extends VueConstructor<infer V>
  ? V
  : never;

type UnionToIntersection<U> = (U extends unknown
? (k: U) => void
: never) extends (k: infer I) => void
  ? I
  : never;
