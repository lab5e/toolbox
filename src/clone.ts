/**
 * Utility function to clone an object without Symbols/Proxy/reactivity from Vue.
 *
 * Note, clears all functions as well.
 *
 * @param object Object to be cloned
 * @returns Cloned object
 */
export const deepClone = <ObjectType>(object: ObjectType): ObjectType => {
  return JSON.parse(JSON.stringify(object));
};
