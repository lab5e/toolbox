import { deepClone } from "./clone";

describe("Clone", () => {
  it("should clone a new instance of a simple object", () => {
    const simpleObject = { a: 1, test: "123" };

    const clonedObject = deepClone(simpleObject);

    expect(simpleObject).toStrictEqual(clonedObject);
    expect(simpleObject).not.toBe(clonedObject);
  });

  it("should strip functions from objects", () => {
    const functionObject = { a: 1, test: "123", myFunction: () => {} };

    const clonedObject = deepClone(functionObject);

    expect(functionObject).not.toStrictEqual(clonedObject);
    expect(functionObject).not.toBe(clonedObject);
    expect(clonedObject.myFunction).not.toBeDefined();
  });
});
