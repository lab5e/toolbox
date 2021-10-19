import { copyToClipboard } from "./copy";

describe("Copy", () => {
  it("should use the clipboard if available", (done) => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });

    copyToClipboard("Copy text").then(() => {
      done();
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("Copy text");
  });

  it("should try to fallback to execCommand if clipboard is not available", (done) => {
    Object.assign(navigator, {
      clipboard: false,
    });
    Object.assign(document, {
      execCommand: jest.fn(),
    });

    copyToClipboard("Copy text").then(() => {
      expect(document.execCommand).toHaveBeenCalledWith("copy");
      done();
    });
  });
});
