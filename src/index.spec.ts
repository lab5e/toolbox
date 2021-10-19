import * as index from "./index";

describe("Index", () => {
  it("should expose copy", () => {
    expect(index["copyToClipboard"]).toBeDefined();
  });

  it("should expose sleep", () => {
    expect(index["sleep"]).toBeDefined();
  });

  it("should expose clone", () => {
    expect(index["deepClone"]).toBeDefined();
  });

  it("should expose validation", () => {
    expect(index["validation"]).toBeDefined();
  });
});
