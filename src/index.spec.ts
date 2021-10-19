import * as index from "./index";

describe("Index", () => {
  it("should expose copy", () => {
    expect(index["copyToClipboard"]).toBeDefined();
  });

  it("should expose sleep", () => {
    expect(index["sleep"]).toBeDefined();
  });
});
